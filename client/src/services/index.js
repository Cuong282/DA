const axios = require('axios');
const { json } = require('stream/consumers');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://iboard-query.ssi.com.vn/stock/group/VNIndex',
  headers: { 
    'authority': 'iboard-query.ssi.com.vn', 
    'accept': '*/*', 
    'accept-language': 'vi,vi-VN;q=0.9,en;q=0.8', 
    'access-control-request-headers': 'device-id,newrelic,traceparent,tracestate', 
    'access-control-request-method': 'GET', 
    'origin': 'https://iboard.ssi.com.vn', 
    'referer': 'https://iboard.ssi.com.vn/', 
    'sec-fetch-dest': 'empty', 
    'sec-fetch-mode': 'cors', 
    'sec-fetch-site': 'same-site', 
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36', 
    'Cookie': '__cf_bm=hWxCm352h5KKJc6Qb6M.Tu30Nhb7rf3xR9IkQA67sls-1713104672-1.0.1.1-dLTgKQHzZLpvs_T_dhSDpP379bvWgyas89f5oCJBNUcrm4ekQ9slQsJP2sfAu0lPrhMk.qfmuDBSxTTikGZs8w; _cfuvid=IWS0L0v2S58PEP_VEEjuTDqtcpX6Y_B_g7ln93BhfFE-1713104672607-0.0.1.1-604800000'
  }
};

axios.request(config)
.then((response) => {
  // let dataConv = JSON.stringify(response.data)
  // console.log(JSON.stringify(response.data));
  console.log(response.data.data[0].stockNo);
})
.catch((error) => {
  console.log(error);
});
