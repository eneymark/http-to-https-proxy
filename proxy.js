//will use fs to read out file ceritifcates that need to be provided
var fs = require('fs'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createServer({
    target: {
        host: 'INSERT HOST TO BE PROXIED HERE',
        port: 8170//port
    },
    ssl: {
        key: fs.readFileSync('server.key'),//Provide server key
        cert: fs.readFileSync('server.crt')//provide server cert
    }
}).listen(10001);
try {
    proxy.on('proxyRes', function (proxyRes, req, res) {
        res.setHeader('access-control-allow-origin', '*');//allow cross origin
        res.setHeader('access-control-allow-methods', 'GET,PUT,POST,DELETE,OPTIONS'),
        res.setHeader('access-control-allow-headers', 'Comma,separated,list,of,headers,here');

    });
} catch(error) {
    console.log('error from proxy:' + error);
}