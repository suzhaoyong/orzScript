// [rule: jingfen]
// [rule: jingfen ?]

function main() {
     if (!isAdmin()) {
          Continue()
          return
     }
     var request = require('request');
     var date = timeFmt("2006-01-02")
     var jd_pt_pin = param(1)
     if (!jd_pt_pin) {
          jd_pt_pin = bucketGet("otto", "jd_pt_pin")
     } else {
          bucketSet("otto", "jd_pt_pin", jd_pt_pin)
     }
     if (!jd_pt_pin) {
          sendText("请输入京东账号ID：")
          jd_pt_pin = input(30000)
          if (!jd_pt_pin) {
               sendText("超时退出。")
               return
          }
          bucketSet("otto", "jd_pt_pin", jd_pt_pin)
     }
     var jd_pt_key = call("getJdPtKey")(jd_pt_pin)
     if (!jd_pt_key) {
          sendText("找不到账号信息，无法进行查询京粉数据。")
          bucketSet("otto", "jd_pt_pin", "")
          return
     }
     var cookie = `pt_key=${jd_pt_key};pt_pin=${jd_pt_pin};`
     var options = {
          'method': 'GET',
          'url': `https://api.m.jd.com/api?appid=unionpc&body={"funName":"querySpreadEffectData","param":{"startDate":"${date}","endDate":"${date}","mediaId":"","proCont":"","promotionId":"","sourceEmt":"","pageNo":1,"pageSize":20}}&functionId=union_report&loginType=2`,
          'headers': {
               'authority': 'api.m.jd.com',
               'origin': 'https://union.jd.com',
               'referer': 'https://union.jd.com/',
               'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
               'cookie': cookie,
          },
          "json": true,
     };
     request(options, function (error, response) {
          if (error) return
          sum = response.body.result.spreadReportInfoSum
          if (sum) {
               id = sendText(`京粉数据(今日)：预估收入：${sum.cosFee}元，有效订单金额：${sum.cosPrice}元，有效订单量：${sum.orderNum}，点击量：${sum.clickNum}。`)
               sleep(5000)
               RecallMessage(id)
               RecallMessage(GetMessageID())
          }
     });
}

main()
