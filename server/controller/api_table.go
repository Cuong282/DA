package controller

import (
	"fmt"
	"io/ioutil"
	"net/http"
)

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
	fmt.Println(string(body))

	// err = json.Unmarshal([]byte(body), &common.Response1)
	// fmt.Println(err)

	// json.NewEncoder(w).Encode(common.Response)

}
