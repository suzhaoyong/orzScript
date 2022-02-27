// [rule: 小爱?]
//[disable: false]是否禁用
function main() {
    var input1 = param(1)
    var content = request({
    url: "http://api.klizi.cn/API/other/xiaoai.php?data=&msg="+input1,
    method: "get", //请求方法
    dataType: "json", //这里接口直接返回文本，所以不需要指定json类型数据
    });
    content = JSON.stringify(content)
    content = JSON.parse(content) 
    if (content.text) {
        sendText(content.text) 
    } else {
        sendText("不理解该意思，换个询问方式吧。")
    }
}
main()