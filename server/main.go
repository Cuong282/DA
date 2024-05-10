package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"database/sql"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"

	_ "github.com/go-sql-driver/mysql"
)

type Response struct {
	ID          int    `db:"id"`
	Name        string `db:"name"`
	Description string `db:"description"`
	Code        string `json:"code"`
	Message     string `json:"message"`
	Data        []API  `json:"data"`
}
type Response1 struct {
	ID          int       `db:"id"`
	Name        string    `db:"name"`
	Description string    `db:"description"`
	Code        string    `json:"code"`
	Message     string    `json:"message"`
	Data        []GetList `json:"data"`
}

type API struct {
	StockNo     string  `json:"stockNo,omitempty"`
	AvgPrice    float32 `json:"AvgPrice,omitempty"`
	Best1Bid    int     `json:"best1Bid,omitempty"`
	Best1BidVol int     `json:"best1BidVol,omitempty"`
	Best2Bid    int     `json:"best2Bid,omitempty"`
	Best2BidVol int     `json:"best2BidVol,omitempty"`
	Best3Bid    int     `json:"best3Bid,omitempty"`
	Best3BidVol int     `json:"best3BidVol,omitempty"`
	// CorporateEvents    int     `json:"corporateEvents,omitempty"`
	// CaStatus           int     `json:"caStatus,omitempty"`
	// CoveredWarrantType int     `json:"coveredWarrantType,omitempty"`
	Exchange      string `json:"exchange,omitempty"`
	ExercisePrice int    `json:"exercisePrice,omitempty"`
	// ExerciseRatio      int     `json:"exerciseRatio,omitempty"`
	Floor int `json:"floor,omitempty"`
	// IssuerName         int    `json:"issuerName,omitempty"`
	Lowest             int    `json:"lowest,omitempty"`
	LastTradingDate    string `json:"lastTradingDate,omitempty"`
	LastVol            int    `json:"lastVol,omitempty"`
	MaturityDate       string `json:"maturityDate,omitempty"`
	MatchedPrice       int    `json:"matchedPrice,omitempty"`
	NmTotalTradedValue int    `json:"nmTotalTradedValue,omitempty"`
	OpenPrice          int    `json:"openPrice,omitempty"`
	Best1Offer         int    `json:"best1Offer,omitempty"`
	Best1OfferVol      int    `json:"best1OfferVol,omitempty"`
	Best2Offer         int    `json:"best2Offer,omitempty"`
	Best2OfferVol      int    `json:"best2OfferVol,omitempty"`
	Best3Offer         int    `json:"best3Offer,omitempty"`
	Best3OfferVol      int    `json:"best3OfferVol,omitempty"`
	PriorClosePrice    int    `json:"priorClosePrice,omitempty"`
	RefPrice           int    `json:"refPrice,omitempty"`
	SecurityName       string `json:"securityName,omitempty"`
	StockSymbol        string `json:"stockSymbol,omitempty"`
	StockType          string `json:"stockType,omitempty"`
	// TradingStatus      string  `json:"tradingStatus,omitempty"`
	TotalShare  int `json:"totalShare,omitempty"`
	TradingUnit int `json:"tradingUnit,omitempty"`
	// UnderlyingSymbol   string  `json:"underlyingSymbol,omitempty"`
	CompanyNameEn int `json:"stockSycompanyNameEnmbol,omitempty"`
}

type GetList struct {
	IndexId        string  `json:"indexId,omitempty"`
	IndexValue     float32 `json:"indexValue,omitempty"`
	PrevIndexValue float32 `json:"PrevIndexValue,omitempty"`
	Time           int     `json:"Time,omitempty"`
	Change         float32 `json:"Change,omitempty"`
	ChangePercent  float32 `json:"ChangePercent,omitempty"`
	ChartOpen      float32 `json:"ChartOpen,omitempty"`
	Advances       int     `json:"Advances,omitempty"`
	AllQty         int     `json:"AllQty,omitempty"`
	AllValue       int     `json:"AllValue,omitempty"`
	Ceiling        int     `json:"Ceiling,omitempty"`
	ChartHigh      float32 `json:"ChartHigh,omitempty"`
	ChartLowf      float32 `json:"ChartLowf,omitempty"`
	Declines       int     `json:"Declines,omitempty"`
	Floor          int     `json:"Floor,omitempty"`
	Nochanges      int     `json:"Nochanges,omitempty"`
	TimeMaker      int     `json:"TimeMaker,omitempty"`
	TotalQtty      int     `json:"TotalQtty,omitempty"`
	TotalValue     int     `json:"TotalValue,omitempty"`
	Label          string  `json:"Label,omitempty"`
	ExchangeLabel  string  `json:"ExchangeLabel,omitempty"`
}

var Get1 Response

var Get2 Response1

func DoList(w http.ResponseWriter, r *http.Request) {
	url := "https://iboard-query.ssi.com.vn/stock/group/VNIndex"
	method := "GET"

	client := &http.Client{}
	req, err := http.NewRequest(method, url, nil)

	if err != nil {
		fmt.Println(err)
		return
	}
	req.Header.Add("authority", "iboard-query.ssi.com.vn")
	req.Header.Add("accept", "*/*")
	req.Header.Add("accept-language", "vi,vi-VN;q=0.9,en;q=0.8")
	req.Header.Add("access-control-request-headers", "device-id,newrelic,traceparent,tracestate")
	req.Header.Add("access-control-request-method", "GET")
	req.Header.Add("origin", "https://iboard.ssi.com.vn")
	req.Header.Add("referer", "https://iboard.ssi.com.vn/")
	req.Header.Add("sec-fetch-dest", "empty")
	req.Header.Add("sec-fetch-mode", "cors")
	req.Header.Add("sec-fetch-site", "same-site")
	req.Header.Add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36")
	req.Header.Add("Cookie", "__cf_bm=hWxCm352h5KKJc6Qb6M.Tu30Nhb7rf3xR9IkQA67sls-1713104672-1.0.1.1-dLTgKQHzZLpvs_T_dhSDpP379bvWgyas89f5oCJBNUcrm4ekQ9slQsJP2sfAu0lPrhMk.qfmuDBSxTTikGZs8w; _cfuvid=IWS0L0v2S58PEP_VEEjuTDqtcpX6Y_B_g7ln93BhfFE-1713104672607-0.0.1.1-604800000")

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return
	}
	// fmt.Println(string(body))

	err = json.Unmarshal([]byte(body), &Get1)
	fmt.Println(err)
	fmt.Println(Get1)
	json.NewEncoder(w).Encode(Get1)

}

func GroupList(w http.ResponseWriter, r *http.Request) {
	url := "https://iboard-query.ssi.com.vn/exchange-index/multiple"
	method := "POST"

	payload := strings.NewReader(`{"indexIds":["VNINDEX","VN30","HNX30","VNXALL","HNXIndex","HNXUpcomIndex"]}`)

	client := &http.Client{}
	req, err := http.NewRequest(method, url, payload)

	if err != nil {
		fmt.Println(err)
		return
	}
	req.Header.Add("authority", "iboard-query.ssi.com.vn")
	req.Header.Add("accept", "application/json, text/plain, */*")
	req.Header.Add("accept-language", "vi")
	req.Header.Add("content-type", "application/json")
	req.Header.Add("device-id", "033E6CF4-0EB1-4BA9-832E-E226CA3EF1D8")
	req.Header.Add("origin", "https://iboard.ssi.com.vn")
	req.Header.Add("referer", "https://iboard.ssi.com.vn/")
	req.Header.Add("sec-ch-ua", "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"")
	req.Header.Add("sec-ch-ua-mobile", "?0")
	req.Header.Add("sec-ch-ua-platform", "\"Windows\"")
	req.Header.Add("sec-fetch-dest", "empty")
	req.Header.Add("sec-fetch-mode", "cors")
	req.Header.Add("sec-fetch-site", "same-site")
	req.Header.Add("user-agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36")
	req.Header.Add("Cookie", "__cf_bm=nmZwV37AVdzWd6riHESnpupAvZVpUIcXx0aeJr.gc5s-1713757927-1.0.1.1-Kvi6XjFnyPksmwu6UcrTZLIk3w9IuXxMqF77XWLu2LfhT.S3D.2fXKcnrSGWHiQ44CF0YLnwa0Pjq4Yuis7zsA; _cfuvid=STvJwsfbcBnL7XDk1aH97ZfPHOfYyl1q8cVHgbR0gmk-1713749532313-0.0.1.1-604800000")

	res, err := client.Do(req)
	if err != nil {
		fmt.Println(err)
		return
	}
	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(string(body))
	err = json.Unmarshal([]byte(body), &Get2)
	fmt.Println(err)
	json.NewEncoder(w).Encode(Get2)

}

func GetListAPI(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(Get2)
}

type Controller struct {
	x *sql.DB
}

func NewController(db *sql.DB) *Controller {
	return &Controller{
		x: db,
	}
}
func (c *Controller) GetTodo(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(Get1)
	// var db *sql.DB
	fmt.Println("111:", c.x)
}
func accessControlMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS,PUT")
		w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type")

		if r.Method == "OPTIONS" {
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	db, err := sqlx.Connect("mysql", "root:123456@tcp(127.0.0.1:3306)/todo")
	fmt.Printf("db: %v, err: %v\n", db, err)
	if err != nil {
		panic("Failed to connect to API_iboard")
	}
	defer db.Close()
	rows, err := db.Queryx("SELECT id, name, description FROM todo")
	if err != nil {
		panic(err)
	}
	var values []Response
	for rows.Next() {
		v := Response{}
		err := rows.StructScan(&v)
		if err != nil {
			panic(err)
		}
		fmt.Printf("v :%v\n", v)
		values = append(values, v)
	}

	fmt.Printf("todo: %v", values)

	router := mux.NewRouter()
	router.Use(accessControlMiddleware)
	router.HandleFunc("/todo", DoList).Methods("GET")
	router.HandleFunc("/GroupList", GroupList).Methods("POST")
	router.HandleFunc("/GetListAPI", GetListAPI).Methods("GET")
	log.Fatal(http.ListenAndServe(":3001", router))

}
