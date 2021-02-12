$(document).ready(function () {

    //Slider script //
    $('.slider').slider();

    $('.modal').modal();

    var submitCoin = document.querySelector('#magnify')

    var storedSearch = JSON.parse(localStorage.getItem("search")) || [];
    var recentCoin = "";
    var found = false;

    // Hide recent searches
    $("#highlight").hide();

    // CoinGecko API
    function getApi() {
        var requestURL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd";
        // Bug #3 Explanation: So this newly added conditional will check to see if the container is already populated. If it is, it will clear its content
        // similar to Line 29 then run the function again. If not, it will run getAPI() like usual.
        if ($('#container').children().length > 0) {

            $('#container').empty();
            getApi();

        }
        else {
            // Bug #1 Explanation (part 1 of 2): Initially searchField will have a value since the user will input either the symbol or name
            // of the crypto. Once the getAPI() function has fully completed its run through the searchField is cleared (Line 134). Conintue to Line 141.
            var searchField = $("#search").val();

            // On page load, these elements will be hidden. Once the user searches for a crypto it will display
            $('.hidden').removeClass("hidden");

            // Hide crypto basics display //
            $("#crypto-basics").hide();
            // Show recent searches //

            // Hide popular crypto display 
            $("#popular-coins").hide();

            // Show recent searches 
            $("#highlight").show();

            // This will clear out the previous search in the container div 
            $('#container').empty();

            console.log(searchField);
            storedSearch.push(searchField);
            console.log("storedSearch = ", storedSearch);

            var recent = $("#recent");
            var inputValue = $("<h4>");
            inputValue.addClass("value");

            // Changed this to prepend so that the most recent searches populate on top
            recent.prepend(inputValue);
            inputValue.text(searchField);

            $.ajax({
                url: requestURL,
                method: 'GET',
            }).then(function (data) {
                // Hide welcome display //
                $("#welcome-display").hide();

                // Bug #2 Explanation: Added another conditional here
                // At first we were comparing symbols so that if a user inputs the correct symbol it would display
                // however when a user inputs the actual name it wouldn't run/display anything on the page
                // this was being bypassed in the for loop below since we declared both a match with the symbol or the name
                const match = data.find(coin => searchField === coin.symbol || searchField === coin.id)

                console.log(match);

                $(match);

                console.log(data)

                // Loop through all the possible cryptos
                for (var i = 0; i < data.length; i++) {

                    // Match the user input to crypto name or symbol
                    if (searchField.toLowerCase() === data[i].id || searchField.toLowerCase() === data[i].symbol) {

                        // Crypto dataset variables
                        searchField = recentCoin;
                        var cryptoImg = data[i].image;
                        var coinName = data[i].name;
                        var searchHistory = data[i].current_price;
                        var marketCap = data[i].market_cap;
                        var tradeVol = data[i].total_volume;
                        var dayHigh = data[i].high_24h;
                        var dayLow = data[i].low_24h;
                        var maxSupply = data[i].max_supply;
                        var circSupply = data[i].circulating_supply;

                        // Function to format monetary value
                        const format = (num) => num.toLocaleString('en-US', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        });

                        // Maximum Supply
                        if (maxSupply === null) {
                            console.log("Maximum Supply is Null");
                        }
                        else {
                            var maxCoin = $("<li>");
                            maxCoin.addClass("span");
                            maxCoin.append(maxSupply);
                            maxCoin.html("Maximum Supply: " + maxSupply.toLocaleString() + " coins");
                            console.log(maxSupply)
                        }

                        //Circulating Supply
                        var recSupply = $("<li>");
                        recSupply.addClass("span");
                        recSupply.append(circSupply);
                        recSupply.html("Circulating Supply: " + circSupply.toLocaleString() + " coins");
                        console.log(recSupply)

                        //Daily Low Price
                        var dayTradeLow = $("<li>");
                        dayTradeLow.addClass("span");
                        dayTradeLow.append(dayLow);
                        dayTradeLow.html("24hr Low Price: $" + format(dayLow));
                        console.log(dayLow);

                        // Daily High Price
                        var dayTradeHigh = $("<li>");
                        dayTradeHigh.addClass("span");
                        dayTradeHigh.append(dayHigh);
                        dayTradeHigh.html("24hr High Price: $" + format(dayHigh));
                        console.log(dayHigh);

                        // Trading Volume
                        var volDef = "https://www.investopedia.com/terms/v/volume.asp"
                        console.log("Trade volume: " + tradeVol);
                        var volTag = $("<li>");
                        var volTagStacked = $("<a>");
                        volTag.append(volTagStacked);
                        volTagStacked.attr("href", volDef);
                        volTag.addClass("span");
                        volTagStacked.html(" Trading Volume: $" + format(tradeVol));

                        // Name of crypto
                        console.log("Crypto : " + coinName);
                        var cryptoName = $("<li>");
                        cryptoName.addClass("span");

                        // Current Price
                        console.log("Current Price: : " + searchHistory);
                        var newList = $("<ul>");
                        newList.addClass("form");
                        var bitcoinName = $("<h3>");
                        bitcoinName.attr("id", "bitcoin");
                        bitcoinName.append(coinName);
                        newList.append(bitcoinName);

                        // Market price
                        var mktDef = "https://www.investopedia.com/terms/m/market-price.asp"
                        $("#container").append(newList);
                        var curPrice = $("<li>");
                        var curPriceStacked = $("<a>");
                        curPrice.attr("id", "curPrice");
                        curPrice.append(curPriceStacked)
                        curPriceStacked.attr("href", mktDef);
                        curPrice.addClass("span");
                        curPriceStacked.html(" Market Price: $" + format(searchHistory));

                        // Market cap
                        var defLink = "https://www.investopedia.com/terms/m/marketcapitalization.asp"
                        console.log("Market Cap: " + marketCap);
                        var mktCap = $("<li>");
                        var mktCapStacked = $("<a>");
                        mktCap.append(mktCapStacked);
                        mktCapStacked.attr("href", defLink);
                        mktCap.addClass("span");
                        mktCapStacked.html(" Market Cap: $" + format(marketCap));

                        // Crypto img
                        var cryptoImgItem = $("<img>");
                        cryptoImgItem.attr("src", cryptoImg);
                        cryptoImgItem.attr("id", "cryptoImg");
                        $("#container").prepend(cryptoImgItem);

                        newList.append(curPrice);
                        newList.append(mktCap);
                        newList.append(volTag);
                        newList.append(dayTradeHigh);
                        newList.append(dayTradeLow);
                        newList.append(maxCoin);
                        newList.append(recSupply);
                        console.log("Enf of if statement");
                        found = true;
                        break;
                    }
                }
                if (found === false) {
                    var errTitle = $("<h3>");
                    errTitle.html("Uh-oh...");
                    var errMsg = $("<p>");
                    errMsg.html("Could not find anything for your search, please try again!");
                    $("#container").append(errTitle, errMsg);
                }
                found = false;
            });
            console.log(storedSearch);
            localStorage.setItem("search", JSON.stringify(storedSearch));
            $("#search").val("");
        }
    };

    // This will make previous searches clickable
    $('body').on('click', '.value', function () {
        console.log($(this).text())
        recentCoin = $(this).text()
        // Bug #1 Explanation (part 2 of 2): Once the crypto is displayed, when you click on another recent search
        // this event listener will run. recentCoin is set to whichever recent search is clicked, however no data is actually being
        // passed back to getAPI(). The reason for this is in Line 14 where we set the searchField = $("#search").val(). When getAPI() is called here
        // it runs through the function without a value since $("#search").val() is cleared after the first run through. It's looking for that user input.
        // Line 146 is what solves that issue. we set $("#search").val() to whichever recent search is clicked on before passing it back to getAPI().
        $("#search").val(recentCoin);
        getApi();
    })

    submitCoin.addEventListener('click', getApi);

    // Event listener for enter/return key pressed
    $("#search").on("keypress", function (event) {
        // Could use keycode but which is more optimal for cross OS/Browser support
        if (event.which === 13) {

            // Disable textbox to prevent multiple submits
            $(this).attr("disabled", "disabled");

            getApi();

            // Re-enable textbox
            $(this).removeAttr("disabled");
        }
    })

    // Bloomberg News API 
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://bloomberg-market-and-financial-news.p.rapidapi.com/news/list?id=cryptocurrencies",
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "00ff810bdamsh6cafd0d251bfd85p1e1d53jsnd43a5739af12",
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
            var storyImage = response.modules[11].stories[i].thumbnailImage;

            // Dynamically create elements for the stories
            var newCard = $("<div>");
            newCard.addClass("card horizontal hoverable");
            $("#storyContainer").append(newCard);
            var newCardStacked = $("<div>");
            newCardStacked.addClass("card-stacked row");
            newCardStacked.attr("id", "flexDirection");
            newCard.append(newCardStacked);

            // 1/3 of the row will be the img the other 2/3 will be story content
            var imgCardContent = $("<div>");
            imgCardContent.addClass("card-content col l4");
            newCardStacked.append(imgCardContent);
            var newCardContent = $("<div>");
            newCardContent.addClass("card-content col l8");
            newCardStacked.append(newCardContent);

            // Dynamically create img thumbnails that correspond to its story
            var imgThumbnail = $("<img>");
            imgThumbnail.addClass("responsive-img");
            imgThumbnail.attr("src", storyImage);
            imgCardContent.append(imgThumbnail);

            // Dynamically create story title
            var newStoryTitle = $("<h5>")
            newStoryTitle.addClass("storyTitle");
            newCardContent.append(newStoryTitle);

            // Link story title to the full article and have it open in a new tab
            var newStoryLink = $("<a>");
            newStoryLink.attr("id", "storyLink");
            newStoryLink.html(storyTitle);
            newStoryLink.attr("href", storyLink);
            newStoryLink.attr("target", "_blank");
            newStoryTitle.append(newStoryLink);

            // Dynamically create story author
            var newStoryAuthor = $("<h6>");
            newStoryAuthor.addClass("storyAuthor");
            newStoryAuthor.html("Author: " + storyAuthor);
            newCardContent.append(newStoryAuthor);

            // Dynamically create story summary
            var newStorySummary = $("<p>");
            newStorySummary.addClass("storySummary");
            newStorySummary.html(storySummary);
            newCardContent.append(newStorySummary);
        }
    });
});