
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










    // function handleHistory(value) {
//     var tempHistory = JSON.parse(window.localStorage.getItem("history"));
//     console.log(tempHistory)
//     if (tempHistory === null) {
//         window.localStorage.setItem("history", JSON.stringify([]));
//         tempHistory = [];
//         tempHistory.push({
//             city: value,
//             date: new Date().getTime()
//         });
//         window.localStorage.setItem("history", JSON.stringify(tempHistory));



//     }
// }










        //         })
        //         .then(function (data) {
        //             console.log(data)
        //             for (var i = 0; i < data.length; i++) {
        //                 var createTableRow = document.createElement('tr');
        //                 var tableData = document.createElement('td');
        //                 var link = document.createElement('a');

        //                 link.textContent = data[i].html_url;
        //                 link.href = data[i].html_url;

        //                 tableData.appendChild(link);
        //                 createTableRow.appendChild(tableData);
        //                 tableBody.appendChild(createTableRow);
        //             }

        //         })

        //})

        // var urlRequest = "https://coingecko.p.rapidapi.com/simple/price?ids=%3CREQUIRED%3E&vs_currencies=%3CREQUIRED%3E"


        // const settings = {
        //     "async": true,
        //     "crossDomain": true,
        //     "url": urlRequest,
        //     "method": "GET",
        //     "headers": {
        //         "x-rapidapi-key": "e2c463bd64mshff24e0c193a1aa8p1bc812jsn52c41784298e",
        //         "x-rapidapi-host": "coingecko.p.rapidapi.com"
        //     }
        // };


        // $.ajax(settings).done(function (response) {
        //     console.log(response);
        // });


