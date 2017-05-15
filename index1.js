(function(){
    let $$ = (ele)=>document.querySelector(ele);
    let userList = $$('#userList');
    function getInitData(callBack){
        $.ajax({
            url: './getAllUsers',
            type: 'GET',
            dataType: 'json',
            success: function (result) {
                if(result && result.error === 0) {
                    typeof callBack === 'function'? callBack(result['data']) : null;
                }
            }
        });
        console.log(666);
    }
    getInitData(bindData);
    function bindData(data) {
        let str = '';
        for (let i = 0; i < data.length; i++) {
            console.log(data);
            let curData = data[i];
            console.log(curData);
            str += `
                <li>
                <span>${curData.id}</span>
                <span>${curData.name}</span>
                <span>${curData.tel}</span>
                <span><a href="">修改</a> <a href="">删除</a></span>
                <>
              `
        }
        userList.innerHTML = str;
    }
})();

















