const http = require('node:http');
const hostname = '127.0.0.1';
const port = 3001;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function getIndexmuntichart() {
    let url ="https://iboard-query.ssi.com.vn/exchange-index/VNINDEX?hasHistory=true"
    return  ApiClient.post(url, {
          indexIds: [
            "VNINDEX","VN30","HNX30","HNXUpcomIndex","HNXIndex","VNXALL",
          ]
      });
  }