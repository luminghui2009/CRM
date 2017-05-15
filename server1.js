let http =require('http');
let fs= require('fs');
let mime= require('mime');
let url= require('url');

http.createServer(function(req,res){
    let {pathname,query} = url.parse(req.url,true);
    if(pathname==='/'){
        res.setHeader('Content-Type','textml;charset=utf-8');
        let resHtml = fs.readFileSync('./index.html');
        res.end(resHtml);
        return;
    }
    if(pathname==='/getAllUsers'){
        res.setHeader('Content-Type','application/json;charset=utf-8');
        let resJson = fs.readFileSync('./users.json');
        res.end(resJson);
        return;
    }

    // 静态资源
    let flag = fs.existsSync('.'+pathname);
    if(flag){
        res.setHeader('Content-Type',mime.lookup(pathname)+';charset=utf-8');
        let resContext = fs.readFileSync('.'+pathname);
        res.end(resContext);
    }else{
        res.statusCode=404;
        res.end('404 页面飞走了~')
    }
}).listen(5000,function(){
    console.log('监听5000端口');
});
























