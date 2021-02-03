var submitCoin = $('#submit-crypto');


var requestURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";

submitCoin.on('click', function (event) {
    console.log(event)
    event.preventDefault();
    var searchInput = $('.form-control').val();

});


$.ajax({
    url: requestURL,
    method: 'GET',
})
    .then(function (data) {
        console.log(data);

    });













