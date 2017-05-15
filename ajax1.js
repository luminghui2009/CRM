+function(){
    function getXhr(){
        let xhr=null;
        let ary=[
            function(){
                return new XMLHttpRequest;
            },function(){
                return new ActiveXObject("Msxml2.XMLHTTP");
            },function(){
                return new ActiveXObjecct("Msxml3.XMLHTTP");
            },
        ];
        for(let i=0;i<ary.length;i++){
            var curFn=ary[i];
            try{
                xhr=curFn();
                getXhr=curFn;
                break;
            }catch(e){}
        }
        if(!xhr){
            throw Error("浏览器版本太低，请升级！");
        }
        return xhr;
    }
    function ajax(options){
        let _defaultOptions={
            url:null,
            type:"GET",
            async:"true",
            cache:"true",
            dataType:"text",
            data:null,
            timeout:null,
            success:null,
            error:null
        };
        //默认参数合并
        for(var key in options){
            if(options.hasOwnProperty(key)){
                _defaultOptions[key]=options[key];
            }
        }

        //get 缓存问题
        if(_defaultOptions.type.toUpperCase()==="GET"){
            if(!_defaultOptions.cache&&_defaultOptions.url.indexOf("?")>-1){
                _defaultOptions.url+="_="+new Date().getTime();
            }else if(!_defaultOptions){
                _defaultOptions.url+="?_="+new Date().getTime();
            }
        }

        //get请求中数据传输问题 需要将数据以URL？name=lu&id=2
        let data=_defaultOptions.data;
        if(data){
            for(var attr in data){
                if(_defaultOptions.url.indexOf("?")>-1){
                    _defaultOptions.url+='&'+attr +'='+ data[attr];
                }else {
                    _defaultOptions.url+='?'+ attr + '=' +data[attr] ;
                }
            }

        }

        //创建ajax对象
        let xhr=getXhr();
        xhr.responseType=_defaultOptions.dataType;//设置响应内容解析类型
        xhr.open(_defaultOptions.type,_defaultOptions.url,_defaultOptions.async);
        
        //超时设置
        xhr.timeout=_defaultOptions.timeout;
        xhr.ontimeout=_defaultOptions.error;
        
        xhr.onreadystatechange=function(){
            if(xhr.readyState===4&&/^2\d{2}$/.test(xhr.status)){
                if(typeof _defaultOptions.success==="function"){
                    _defaultOptions.success.call(_defaultOptions,xhr.response);

                }
            }
        };
        xhr.send(JSON.stringify(_defaultOptions.data));

    }
    window.$={ajax};
}();