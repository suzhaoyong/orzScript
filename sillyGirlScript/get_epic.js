// [rule: epic]
// [rule: Epic]
// [cron: 30 11 * * *]
/* 获取 epic 免费游戏 更多信息请查看 https://github.com/suzhaoyong/orzScript */
request('https://store-site-backend-static-ipv4.ak.epicgames.com/freeGamesPromotions?locale=zh-CN&;;country=CN&allowCountries=CN', function (error, response, body) {
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
            var desp = game.description
            var coverImg = game.keyImages[1].url
            var shopUrl = "https://www.epicgames.com/store/zh-CN/p/" + game.productSlug
            sendText("今日限免：" + title + "n" + desp + "n" + "领取地址：" + shopUrl + image(coverImg))
        }
    }

})