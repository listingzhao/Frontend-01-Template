const http = require('http');

const server = http.createServer((req, res) => {
    console.log('request receiced');
    console.log(req.headers);
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`<html maaa=a >
  <head>
      <style>
  body div #myid{
      width:100px;
      background-color: #ff5000;
  }
  body div img{
      width:30px;
      background-color: #ff1111;
  }
  .b {
    width:30px;
    background-color: #ff1111;
  }
  body > div {
    width:30px;
    background-color: red;
  }
  #aid.a[title=aa] {
    width:30px;
    background-color: red;
  }
      </style>
  </head>
  <body>
      <div>
          <img id="myid"/>
          <img class="b a"/>
          <img id="aid" class="a" title="aa"/>
          <img />
      </div>
  </body>
  </html>`);
});

server.listen(8088);
