const http=require('http');
const port= 4477;
const app=require('./app');
const server=http.createServer(app);
server.listen(port,()=>{console.log("server is on the air")});
