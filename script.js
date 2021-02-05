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

// submitCoin.on('click', function (event) {
//     console.log(event);
//     event.preventDefault();
// });

// Bloomberg News API
const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://bloomberg-market-and-financial-news.p.rapidapi.com/news/list?id=cryptocurrencies",
    "method": "GET",
    "headers": {
        "x-rapidapi-key": "eafa0d1954mshd8afb1575ec2c58p1ab9adjsn0d8a873b3855",
        "x-rapidapi-host": "bloomberg-market-and-financial-news.p.rapidapi.com"
    }
};

$.ajax(settings).done(function (response) {
    console.log(response);
    // Store the length of the array in a variable for cleaner use
    var storiesArr = response.modules[11].stories.length;
    // Loop through all of the stories in the array
    for (var i = 0; i < storiesArr; i++) {
        // Store the needed information from API in varibales
        var storyTitle = response.modules[11].stories[i].title;
        var storyAuthor = response.modules[11].stories[i].byline;
        var storySummary = response.modules[11].stories[i].autoGeneratedSummary;
        var storyLink = response.modules[11].stories[i].longURL;
        // Dynamically create elements for the stories
        var newCard = $("<div>");
        newCard.addClass("card horizontal hoverable");
        $("#storyContainer").append(newCard);
        var newCardStacked = $("<div>");
        newCardStacked.addClass("card-stacked");
        newCard.append(newCardStacked);
        var newCardContent = $("<div>");
        newCardContent.addClass("card-content");
        newCardStacked.append(newCardContent);
        var newStoryTitle = $("<h5>")
        newStoryTitle.addClass("storyTitle");
        newCardContent.append(newStoryTitle);
        var newStoryLink = $("<a>");
        newStoryLink.attr("id", "storyLink");
        newStoryLink.html(storyTitle);
        newStoryLink.attr("href", storyLink);
        newStoryTitle.append(newStoryLink);
        var newStoryAuthor = $("<h6>");
        newStoryAuthor.addClass("storyAuthor");
        newStoryAuthor.html("Author: " + storyAuthor);
        newCardContent.append(newStoryAuthor);
        var newStorySummary = $("<p>");
        newStorySummary.addClass("storySummary");
        newStorySummary.html(storySummary);
        newCardContent.append(newStorySummary);
    }
});












