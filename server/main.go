package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
)

type Response struct {
	Code    string `json:"code"`
	Message string `json:"message"`
	Data    []API  `json:"data"`
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

func main() {

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
	var Get1 Response
	err = json.Unmarshal([]byte(body), &Get1)
	fmt.Println(err)
	fmt.Println(Get1.Data[4])
	// var Get2 Response
	// err = json.Unmarshal([]byte(body), &Get2)
	// fmt.Println(err)
	// fmt.Println(Get2.Message)

	// var res Response
	// err := json.Unmarshal([]byte(`
	// {
	// 	"code": "SUCCESS",
	// 	"message": "Call API /stock/group/VNIndex successful",
	// 	"data": [
	// 		{
	// 			"id": 1,
	// 			"name": "manhnx"
	// 		},
	// 		{
	// 			"id": 2,
	// 			"name": "cuongnt"
	// 		}
	// 	]
	// }`), &res)
	// fmt.Println(err)
	// fmt.Println(res.Data[0].ID)
}
