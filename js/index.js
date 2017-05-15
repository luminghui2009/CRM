(function () {
    let userList=document.getElementById("userList");
    function getInitData(callBack) {
        $.ajax({
            url: "./getAllUsers",
            type: "GET",
            dataType: "json",
            success: function (result) {
                if (result && result.error === 0) {
                    typeof callBack === "function" ? callBack(result["data"]) : null;
                }
            }
        });
    }
    getInitData(bindData);
    function bindData(data) {
        let str='';
        for(let i=0;i<data.length;i++){
             let curData=data[i];
            str += `
                <li>
                <span>${curData.id}</span>
                <span>${curData.name}</span>
                <span>${curData.tel}</span>
                <span><a href="../temp/update.html?uid=${curData.id}">修改</a><a href="javascript:;" class="removeBtn" data-rid=${curData.id}>删除</a></span>
                </li>
            `
           }
        userList.innerHTML = str;
        let removeBtn=document.getElementsByClassName("removeBtn");
        for(i=0;i<removeBtn.length;i++){
            removeBtn[i].onclick=removeInfo;
        }
        function removeInfo(){
            let rid=this.getAttribute("data-rid");
            let flag=window.confirm("是否删除用户信息");
            let that=this;
            if(!flag) return;
            $.ajax({
                url:"/removeUserInfo",
                data:{
                    rid:rid
                },
                dataType:"json",
                success:function(result){
                  if(result&&result.error===0){
                      userList.removeChild(that.parentNode.parentNode);
                      alert(result.msg);
                  }
                }
            });
        }
       
    }
})()