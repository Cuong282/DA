package Signup

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/golang-jwt/jwt/v5"
	"github.com/jmoiron/sqlx"
	"golang.org/x/crypto/bcrypt"
)

var (
	db    *sqlx.DB
	errDb error
)

func SignUp() {

	db, errDb = sqlx.Open("mysql", "root:123456@tcp(127.0.0.1:3306)/database")
	fmt.Println("connect seccest", db, errDb)
	if errDb != nil {
		panic("Failed to connect to login")
	}
	defer db.Close()
	fmt.Println("db: ", db)
	http.HandleFunc("/signup", signup)
	// http.HandleFunc("/signupp", SignUp)
	http.HandleFunc("/signin", signin)
	http.HandleFunc("/welcome", welcome)
	http.HandleFunc("/refresh", Refresh)
	http.HandleFunc("/logout", Logout)
	fmt.Println("Server is running on port 8000")

}

var jwtKey = []byte("secret_key")

// Create a struct that models the structure of a user, both in the request body, and in the DB
type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type Claims struct {
	Email string `json:"email"`
	jwt.RegisteredClaims
}

type User struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

var users = map[string]User{}

func signup(w http.ResponseWriter, r *http.Request) {
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
		fmt.Println("loi~ emal")
		http.Error(w, "Email must be a Gmail address", http.StatusBadRequest)
		return
	}

	// Check if the email is already in use
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

	// Hash the password
	hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	user.Password = string(hash)
	fmt.Println("hash:", hash)

	fmt.Println("userrrrr:", user)
	email := user.Email
	fmt.Println("email:", email)
	password := user.Password
	fmt.Println("password:", password)
	fmt.Println("db", db)

	query := `INSERT INTO user (email, password) VALUES (?,?)`
	fmt.Println("query:", query)
	fmt.Println("values:", user.Email, user.Password)

	result, err := db.Exec(query, user.Email, user.Password)
	if err != nil {
		fmt.Println("error:", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	id, err := result.LastInsertId()
	fmt.Printf("id inserted: %d, err: %v\n", id, err)

	w.WriteHeader(http.StatusOK)
	fmt.Fprint(w, "User created successfully!")
}

func signin(w http.ResponseWriter, r *http.Request) {
	var creds Credentials

	err := json.NewDecoder(r.Body).Decode(&creds)
	if err != nil {
		// Nếu có lỗi khi giải mã request body, trả về mã lỗi HTTP 400 Bad Request
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	var userEmail string
	err = db.QueryRow("SELECT email FROM user WHERE email =?", creds.Email).Scan(&userEmail)
	if err != nil {
		if err == sql.ErrNoRows {
			http.Error(w, "Invalid email or password", http.StatusUnauthorized)
			return
		}
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if userEmail == creds.Email {
		var user User
		err = db.QueryRow("SELECT password FROM user WHERE email =?", creds.Email).Scan(&user.Password)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		fmt.Println("user:", user)
		err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(creds.Password))
		if err != nil {
			http.Error(w, "Invalid email or password", http.StatusUnauthorized)
			return
		}
		fmt.Println("err:", err)

	}

	expirationTime := time.Now().Add(5 * time.Minute)
	claims := &Claims{
		Email: creds.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	http.SetCookie(w, &http.Cookie{
		Name:     "token",
		Value:    tokenString,
		Expires:  expirationTime,
		HttpOnly: true,
	})

}

func welcome(w http.ResponseWriter, r *http.Request) {
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
}
