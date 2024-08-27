package utils

import (
	"context"
	"da_server/logger"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/jmoiron/sqlx"
	"golang.org/x/crypto/bcrypt"
)

var (
	db    *sqlx.DB
	errDb error
)

func init() {
	db, errDb = sqlx.Open("mysql", "root:123456@tcp(127.0.0.1:3306)/database")
	if errDb != nil {
		log.Fatal("Failed to connect to database: ", errDb)
	}
}

var jwtKey = []byte("secret_key")

type Credentials struct {
	Id       int    `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Claims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

type User struct {
	Id       int    `json:"id"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

var users = map[string]User{}

func Signup(w http.ResponseWriter, r *http.Request) {
	var user User

	err := json.NewDecoder(r.Body).Decode(&user)

	fmt.Println("err:", err)
	fmt.Println("user:", user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Check if the email is valid
	if !strings.HasSuffix(user.Email, "@gmail.com") {
		fmt.Println("loi~ email")
		http.Error(w, "Email must be a Gmail address", http.StatusBadRequest)
		return
	}

	if _, ok := users[user.Email]; ok {
		fmt.Println("email ko ton tai")
		http.Error(w, "Email already in use", http.StatusConflict)
		return
	}

	// Check if the password is strong enough
	if len(user.Password) <= 6 {
		fmt.Println("len:", len(user.Password))
		http.Error(w, "OK", http.StatusBadRequest)
		return
	}
	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	user.Password = string(hash)
	fmt.Println("hash:", hash)

	fmt.Println("user:", user)
	email := user.Email
	fmt.Println("email:", email)
	password := user.Password
	fmt.Println("password:", password)

	_, err = db.Exec("INSERT INTO userr (email, password) VALUES (?,?)", user.Email, user.Password)
	if err != nil {
		fmt.Println("err insert :", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, "User created successfully!")
}
func Signin(w http.ResponseWriter, r *http.Request) {

	var creds Credentials
	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	fmt.Printf("api signIn decode creds: %s\n", logger.JSONDebugDataString(creds))

	var userEmail string
	var user User
	err = db.QueryRowxContext(context.Background(), "SELECT id, email, password FROM userr WHERE Email = ?", creds.Email).StructScan(&user)
	if err != nil {
		fmt.Println("errdb11:", err)
		if err == sql.ErrNoRows {
			http.Error(w, "Invalid email or password", http.StatusUnauthorized)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	fmt.Printf("api signIn userEmail: %s\n", userEmail)
	fmt.Println("user get from db:", user)

	expirationTime := time.Now().Add(1 * time.Minute)
	claims := &Claims{
		Email: creds.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	// fmt.Printf("api signIn succes token: %s\n", tokenString)

	w.Header().Set("Content-Type", "application/json")
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    tokenString,
		Expires:  expirationTime,
		HttpOnly: true,
	})
	// fmt.Fprint(w, "Signed in successfully!")
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	resp := make(map[string]string)
	resp["message"] = "Status Created"
	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}
	w.Write(jsonResp)
	w.WriteHeader(http.StatusOK)
	// w.Write([]byte("Hello, World!"))
	json.NewEncoder(w).Encode(creds)
}

func Welcome(w http.ResponseWriter, r *http.Request) {
	// Lấy cookie tên "token" từ yêu cầu
	c, err := r.Cookie("token")
	fmt.Println("tokéntring:", c)
	fmt.Printf("c: %v, err: %v\n", c, err)
	if err != nil {
		if err == http.ErrNoCookie {
			// Nếu cookie không tồn tại, trả về mã trạng thái 401 (Unauthorized)
			http.Error(w, "401", http.StatusUnauthorized)
			return
		}
		// Nếu có lỗi khác khi lấy cookie, trả về mã trạng thái 400 (Bad Request)
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}

	// Lấy giá trị của token từ cookie
	tknStr := c.Value
	fmt.Printf("tokenStr: %s, err: %v\n", tknStr, err)
	claims := &Claims{}

	// Phân tích JWT và lưu trữ thông tin vào `claims`
	tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (interface{}, error) {
		return jwtKey, nil
	})
	fmt.Printf("tkn: %s, err: %v\n", tknStr, err)
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			http.Error(w, "Unauthorized", http.StatusUnauthorized)
			return
		}
		http.Error(w, "Bad Request", http.StatusBadRequest)
		return
	}
	if !tkn.Valid {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	w.Write([]byte(fmt.Sprintf("Welcome %s!", claims.Email)))
}
func Refresh(w http.ResponseWriter, r *http.Request) {
	c, err := r.Cookie("token")
	if err != nil {
		if err == http.ErrNoCookie {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	tknStr := c.Value
	claims := &Claims{}
	tkn, err := jwt.ParseWithClaims(tknStr, claims, func(token *jwt.Token) (any, error) {
		return jwtKey, nil
	})
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	if time.Until(claims.ExpiresAt.Time) > 30*time.Second {
		w.WriteHeader(http.StatusBadRequest)
		return
	}
	expirationTime := time.Now().Add(5 * time.Minute)
	claims.ExpiresAt = jwt.NewNumericDate(expirationTime)
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})
}
func Logout(w http.ResponseWriter, r *http.Request) {
	// immediately clear the token cookie
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Expires: time.Now(),
	})

	fmt.Println("logout is ok!")
}
