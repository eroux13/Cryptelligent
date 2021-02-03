

var submitCoin = document.querySelector('#magnify')

function getApi() {
    var requestURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
    var searchField = submitCoin.value
    console.log(searchField)


    $.ajax({
        url: requestURL,
        method: 'GET',
    })
        .then(function (data) {
            console.log(data);
            const match = data.indexOf(index => searchField === index.symbol)
            console.log(match)
            for (var i = 0; i < 10; i++) {
                var searchHistory = document.createElement('h3');
                searchHistory.textContent = data[i].name;
                var test = document.querySelector(".card-content")
                test.appendChild(searchHistory);



            }
        });
}
submitCoin.addEventListener('click', getApi);

    // submitCoin.on('click', function (event) {
    //     console.log(event);
    //     event.preventDefault();
    // });













