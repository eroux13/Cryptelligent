

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
            var searchHistory = data[0].current_price;
            var marketCap = data[0].market_cap;
            console.log(marketCap)
            var lowDayPrice = data[0].low_24hr
            console.log(lowDayPrice);
            $("#btc").append(searchHistory);

            //console.log("test3");
            console.log(searchHistory);


        });
};

submitCoin.addEventListener('click', getApi);




















