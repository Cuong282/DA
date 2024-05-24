package business

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/akhilsharma/todo/entities"
	"github.com/akhilsharma/todo/entities/dataobject"
	"github.com/akhilsharma/todo/storage"
)

var Get2 entities.Response1

type Business struct {
	storage *storage.SQLStorage
}

func NewBusiness(storage *storage.SQLStorage) *Business {
	return &Business{
		storage: storage,
	}
}

func (b *Business) GetGroupList(w http.ResponseWriter, r *http.Request) {
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

type Response struct {
	Ok      bool            `json:"ok"`
	Message string          `json:"message"`
	Status  int             `json:"status"`
	Data    *dataobject.API `json:"data"`
}

// type

func (b *Business) CreateTodo(w http.ResponseWriter, r *http.Request) {
	// r
	// id name description
	todo := &dataobject.API{
		// ID:          1,
		StockNo:  "123",
		Best1Bid: 12,
	}
	b.storage.Insert(todo)
	// if err
	//  w.Write()
	reponse := &Response{
		Ok:      true,
		Message: "create todo success!",
		Status:  1,
		Data:    todo,
	}
	studentsJson, err := json.Marshal(reponse)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Write(studentsJson)

}

func GetListAPI(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(Get2)
}
