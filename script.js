$(document).ready(function () {

    var submitCoin = document.querySelector('#magnify')

    var storedSearch = JSON.parse(localStorage.getItem("search")) || [];
    var recentCoin = "";

    function getApi() {
        var requestURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
        var searchField = $("#search").val();
        $('#container').empty();






        console.log(searchField);
        storedSearch.push(searchField);
        console.log("storedSearch = ", storedSearch);

        var recent = $("#recent");
        var inputValue = $("<h4>");
        inputValue.addClass("value");

        recent.append(inputValue);
        inputValue.text(searchField);

        $.ajax({
            url: requestURL,
            method: 'GET',
        }).then(function (data) {

            const match = data.find(coin => searchField === coin.symbol)
            //console.log("test2");
            console.log(match);

            $(match);
            //debugger;
            console.log(data)
            for (var i = 0; i < data.length; i++) {

                if (searchField.toLowerCase() === data[i].id || searchField.toLowerCase() === data[i].symbol) {
                    searchField = recentCoin;



                    //Trading Volume
                    var volDef = "https://www.investopedia.com/terms/v/volume.asp"
                    var tradeVol = data[i].total_volume;
                    var volTag = $("<li>");
                    var volTagStacked = $("<a>");
                    volTag.append(volTagStacked);
                    volTagStacked.attr("href", volDef);
                    volTag.addClass("span");
                    volTagStacked.html(" Trading Volume: " + tradeVol);


                    //name of crypto

                    var coinName = data[i].name;
                    var cryptoName = $("<li>");
                    cryptoName.addClass("span");
                    // cryptoName.attr("id", "target");
                    //cryptoName.html(" Name " + coinName);

                    //current search name
                    var searchHistory = data[i].current_price;
                    var newList = $("<ul>");
                    newList.addClass("form");
                    var bitcoinName = $("<h3>");
                    bitcoinName.attr("id", "bitcoin");
                    bitcoinName.append(coinName);
                    newList.append(bitcoinName);

                    //current price
                    var mktDef = "https://www.investopedia.com/terms/m/market-price.asp"
                    $("#container").append(newList);
                    var curPrice = $("<li>");
                    var curPriceStacked = $("<a>");
                    curPrice.append(curPriceStacked)
                    curPriceStacked.attr("href", mktDef);
                    curPrice.addClass("span");
                    curPriceStacked.html(" Market Price: " + searchHistory);


                    //market cap
                    var defLink = "https://www.investopedia.com/terms/m/marketcapitalization.asp"
                    var marketCap = data[i].market_cap;
                    var mktCap = $("<li>");
                    mktCap.attr("id", "mktCap")
                    var mktCapStacked = $("<a>");
                    mktCap.append(mktCapStacked);
                    mktCapStacked.attr("href", defLink);


                    mktCap.addClass("span");
                    mktCapStacked.html(" Market Cap: " + marketCap);



                    // crypto img
                    var cryptoImg = data[i].image;
                    var cryptoImgItem = $("<img>");
                    cryptoImgItem.attr("src", cryptoImg);
                    cryptoImgItem.attr("id", "cryptoImg")
                    $("#container").prepend(cryptoImgItem);



                    newList.append(mktCap);
                    //console.log(newItem2);
                    newList.append(curPrice);
                    //console.log(volTag.html)
                    newList.append(volTag);





                }


            }





        });
        console.log(storedSearch);
        localStorage.setItem("search", JSON.stringify(storedSearch));
        $("#search").val("");


    };

    $('body').on('click', '.value', function () {
        console.log($(this).text())
        recentCoin = $(this).text()
        getApi()
    })


    submitCoin.addEventListener('click', getApi);

    // submitCoin.on('click', function (event) {
    //     console.log(event);
    //     event.preventDefault();
    // });

    // Bloomberg News API 
    // Commented out for now since we hit the API Call limit (500/month for the free tier)
    // const settings = {
    //     "async": true,
    //     "crossDomain": true,
    //     "url": "https://bloomberg-market-and-financial-news.p.rapidapi.com/news/list?id=cryptocurrencies",
    //     "method": "GET",
    //     "headers": {
    //         "x-rapidapi-key": "eafa0d1954mshd8afb1575ec2c58p1ab9adjsn0d8a873b3855",
    //         "x-rapidapi-host": "bloomberg-market-and-financial-news.p.rapidapi.com"
    //     }
    // };

    // $.ajax(settings).done(function (response) {
    //     console.log(response);

    //     // Store the length of the array in a variable for cleaner use
    //     var storiesArr = response.modules[11].stories.length;

    //     // Loop through all of the stories in the array
    //     for (var i = 0; i < storiesArr; i++) {

    //         // Store the needed information from API in varibales
    //         var storyTitle = response.modules[11].stories[i].title;
    //         var storyAuthor = response.modules[11].stories[i].byline;
    //         var storySummary = response.modules[11].stories[i].autoGeneratedSummary;
    //         var storyLink = response.modules[11].stories[i].longURL;
    //         var storyImage = response.modules[11].stories[i].thumbnailImage;

    //         // Dynamically create elements for the stories
    //         var newCard = $("<div>");
    //         newCard.addClass("card horizontal hoverable");
    //         $("#storyContainer").append(newCard);
    //         var newCardStacked = $("<div>");
    //         newCardStacked.addClass("card-stacked row");
    //         newCardStacked.attr("id", "flexDirection");
    //         newCard.append(newCardStacked);

    //         // 1/3 of the row will be the img the other 2/3 will be story content
    //         var imgCardContent = $("<div>");
    //         imgCardContent.addClass("card-content col l4");
    //         newCardStacked.append(imgCardContent);
    //         var newCardContent = $("<div>");
    //         newCardContent.addClass("card-content col l8");
    //         newCardStacked.append(newCardContent);

    //         // Dynamically create img thumbnails that correspond to its story
    //         var imgThumbnail = $("<img>");
    //         imgThumbnail.addClass("responsive-img");
    //         imgThumbnail.attr("src", storyImage);
    //         imgCardContent.append(imgThumbnail);

    //         // Dynamically create story title
    //         var newStoryTitle = $("<h5>")
    //         newStoryTitle.addClass("storyTitle");
    //         newCardContent.append(newStoryTitle);

    //         // Link story title to the full article and have it open in a new tab
    //         var newStoryLink = $("<a>");
    //         newStoryLink.attr("id", "storyLink");
    //         newStoryLink.html(storyTitle);
    //         newStoryLink.attr("href", storyLink);
    //         newStoryLink.attr("target", "_blank");
    //         newStoryTitle.append(newStoryLink);

    //         // Dynamically create story author
    //         var newStoryAuthor = $("<h6>");
    //         newStoryAuthor.addClass("storyAuthor");
    //         newStoryAuthor.html("Author: " + storyAuthor);
    //         newCardContent.append(newStoryAuthor);

    //         // Dynamically create story summary
    //         var newStorySummary = $("<p>");
    //         newStorySummary.addClass("storySummary");
    //         newStorySummary.html(storySummary);
    //         newCardContent.append(newStorySummary);
    //     }
    // });
});