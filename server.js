let http=require("http");
let fs=require("fs");
let url=require("url");
let mime=require("mime");
let reqResult={"error":0,"msg":"用户添加成功"};
http.createServer(function(req,res){
    let {pathname,query}=url.parse(req.url,true);
    //处理首页请求
    if(pathname==="/"){
        res.setHeader("Content-Type","text/html;charset=utf-8");
        let resHtml=fs.readFileSync("./index.html");
        res.end(resHtml);
        return;
    }
    let users=JSON.parse(fs.readFileSync("./users.json","utf8"));
  
    //获取用户数据
    if(pathname==="/getAllUsers"){
        res.setHeader("Content-Type","applycation/json;charset=utf-8");
        let resJson=fs.readFileSync("./users.json");
        res.end(resJson);
        return;
    }

    //增加用户数据
    if(pathname==="/addUserInfo"){
        
        let str='';
        let userObj;
        req.on("data",function(data){
            str+=data;
        });
        req.on("end",function(){
            userObj = JSON.parse(str);
            let lastInd = users.data.length - 1;
            userObj["id"] = users.data[lastInd].id + 1;
            users.data.push(userObj);
            reqResult.msg = "用户添加成功";
            fs.writeFileSync("./users.json", JSON.stringify(users));
            res.setHeader("Content-Type", "application/json;charset=utf-8");
            res.end(JSON.stringify(reqResult));
        });

        return;
    }

    //用户数据修改时获取单个用户的数据
    if(pathname==="/getUserInfo"){
        let uid=Number(query.uid);
        for(let i=0;i<users.data.length;i++){
            let curData=users.data[i];
            if(curData.id===uid){
                reqResult.data=curData;
                break;
            }
        }
        res.setHeader("Content-Type","application/json;charset=utf-8");
        res.end(JSON.stringify(reqResult));
        return;
    }

    //用户数据修改
    if(pathname==="/updateUserInfo"){
        let str="";
        let obj;
        req.on("data",function(data){
            str+=data;
        });
        req.on("end",function(){
         obj=JSON.parse(str);
         let usersData=users.data;
         for(let i=0;i<usersData.length;i++){
             if(usersData[i].id===Number(obj.id)){
                 usersData[i].name=obj.name;
                 usersData[i].tel=obj.tel;
                 break;
             }
         }
        res.setHeader("Content-Type", "application/json;charset=utf-8");
        fs.writeFileSync("./users.json", JSON.stringify(users));
        reqResult.msg="用户信息修改成功";
        res.end(JSON.stringify(reqResult));
    });
        return;
    }


    //删除用户信息
    if(pathname==="/removeUserInfo"){
       let rid=Number(query.rid);
       let usersData=users.data;
       for(let i=0;i<usersData.length;i++){
           if(usersData[i].id===rid){
               usersData.splice(i,1);
               break;
           }
       }
        fs.writeFileSync("./users.json",JSON.stringify(users));
        res.setHeader("Content-Type","application/json;charset=utf-8");
        reqResult.msg="用户删除成功";
        res.end(JSON.stringify(reqResult));
        return;
    }


    //处理静态资源请求
    let flag=fs.existsSync("."+pathname);
    if(flag){
        res.setHeader("Content-Type",mime.lookup(pathname)+";charset=utf-8");
        let resContext=fs.readFileSync("."+pathname);
        res.end(resContext);
    }else {
        res.statusCode=404;
        res.end("404 NOT FOUND");
    }
   
}).listen(8000,function(){
    console.log("监听8000端口");
 
});