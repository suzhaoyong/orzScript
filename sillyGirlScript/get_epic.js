// [rule: epic]
// [rule: Epic]
// [cron: 30 11 * * *]
/* 获取 epic 免费游戏 更多信息请查看 https://github.com/suzhaoyong/orzScript */
request('https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=zh-CN&country=CN&allowCountries=CN', function (error, response, body) {
    var data = JSON.parse(body)
    var games = data.data.Catalog.searchStore.elements

    for (i = 0; i < games.length - 1; i++) {
        var game = games[i]
        if (!game.promotions) continue;
        var offer = game.promotions
        var promotionalOffers = offer.promotionalOffers[0]
        if (!promotionalOffers) continue;
        var discountType = promotionalOffers.promotionalOffers[0]
        if (!discountType) continue;
        var discountPercentage = discountType.discountSetting.discountPercentage
        if (discountPercentage == 0) {
            var title = game.title
            var description = game.description
            var coverImg = game.keyImages[1].url
            var shopUrl = "https://www.epicgames.com/store/zh-CN/p/" + game.productSlug
            var endDate = time_js(discountType.endDate).format('MM-DD HH:mm')
            sendText("今日限免：" + title + "n" + description + "\n" + "截止日期：" + endDate + "\n" + "领取地址：" + shopUrl + "\n" +image(coverImg))
        }
    }

})


function time_js(date) {
    if (typeof date === 'string') date = new Date(date);
    return ({
        format: function (fmt) {
            let ret;
            const opt = {
                "Y+": date.getFullYear().toString(),        // 年
                "M+": (date.getMonth() + 1).toString(),     // 月
                "D+": date.getDate().toString(),            // 日
                "H+": date.getHours().toString(),           // 时
                "m+": date.getMinutes().toString(),         // 分
                "S+": date.getSeconds().toString()          // 秒
                // 有其他格式化字符需求可以继续添加，必须转化成字符串
            };
            for (let k in opt) {
                ret = new RegExp("(" + k + ")").exec(fmt);
                if (ret) {
                    fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                };
            };
            return fmt;
        }
    })
}