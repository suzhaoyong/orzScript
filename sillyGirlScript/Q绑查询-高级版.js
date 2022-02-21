// Q绑查询 熊猫制作2021-12-10 QQ:1305759960 网站：bbs.xm08.cn
// [rule: 查Q绑 ?]
// [admin: true] 这里默认关闭了、开启true后除管理员账号外、群员不可查
function main() {
    // var userID = GetUserID()
    // var time = (60) //禁言的时间 单位/秒
    var qq = encodeURI(param(1))
    if (qq.length === 11) {
        var phone = qq
        var data = request({
            url: "https://zy.xywlapi.cc/qqcx?phone=" + phone ,
        })
        if (data.status === 200) {
            qq = (data.qq)
            var phonediqu = (data.phonediqu)
            var lol = (data.lol)
            var wb = (data.wb)
            sendText("QQ："+qq + "\n归属地："+phonediqu+"\nLOL："+lol+"\n微博："+wb)
        } else {
            sendText("查无此人")
        }
    }
    /*
    if (qq == 机器人QQ号) {
        sendText("查我？拉出去毙了") //这里设置机器人QQ、触发限制查询机器人QQ
        return
    }
    if (qq == 管理员QQ号) {
        sendText("不能查群主，禁言一分钟作为惩罚") //这里设置群主QQ、触发限制查询群主、并触发禁言1分钟
        sleep(800)
        GroupBan(userID, time)
        return
    }
    */
    var data = request({
        url: "https://zy.xywlapi.cc/qqcx?qq=" + qq ,
    })
    if (data.status === 200) {
        var phone = (data.phone)
        var phonediqu = (data.phonediqu)
        var lol = (data.lol)
        var wb = (data.wb)
        sendText("手机号："+phone+"\n归属地："+phonediqu+"\nLOL："+lol+"\n微博："+wb)
    } else {
        sendText("查无此人")
    }
    
       
}
    
main()