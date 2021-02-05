

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
            console.log(match);

            $(match).appendTo('btc')


        });
};

submitCoin.addEventListener('click', getApi);




















