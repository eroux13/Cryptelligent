

var submitCoin = document.querySelector('#magnify')

function getApi() {
    var requestURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
    var searchField = $("#search").val();

    console.log(searchField);


    $.ajax({
        url: requestURL,
        method: 'GET',
    })
        .then(function (data) {

            const match = data.find(coin => searchField === coin.symbol)
            //console.log("test2");
            console.log(match);

            $(match);



            //Trading Volume

            var tradeVol = data[0].total_volume;
            var volTag = $("<li>");
            volTag.addClass("span");
            //volTag.attr("href", tradeVol);
            volTag.html(" Trading Volume ");


            //name of crypto

            var coinName = data[0].name;
            var cryptoName = $("<li>");
            cryptoName.addClass("span");
            cryptoName.html(coinName);

            //current price
            var searchHistory = data[0].current_price;
            var marketCap = data[0].market_cap;
            var newList = $("<ul>");
            newList.addClass("form")
            $("#container").append(newList);
            var listItem = $("<li>");
            listItem.addClass("span");
            listItem.html(" Market Price: " + searchHistory);




            //market cap
            var newItem2 = $("<li>");
            newItem2.addClass("form");
            newItem2.html(" Market Cap: " + marketCap);



            newList.append(coinName);
            newList.append(newItem2);
            newList.append(listItem);
            console.log(volTag.html)
            newList.append(tradeVol);









            //debugger;

            //console.log("test3");



        });
};

submitCoin.addEventListener('click', getApi);




















