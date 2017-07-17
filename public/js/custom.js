$(document).ready(function() {
    $('.search-form').on('submit', function(event) {
        var inputVal = $('.search-input').val().trim();
        event.preventDefault();
        if (inputVal != '' ) {
            getWikiEntries(encodeURIComponent(inputVal));
            return;
        }
        alert('Please enter the search keyword.');
    });
});

const callApi = function(url, callback) {
    $.ajax({
        url: url,
        dataType: 'json',
        type: 'GET'
    })
        .done(callback)
        .fail(function() {
            alert( "GET request failed!" );
        });
};

const getWikiEntries = function(query) {
    var url = 'https://en.wikipedia.org/w/api.php?action=query&origin=*&list=search&format=json&srsearch='+query+'&srlimit=10';
    callApi(url, function(data) {
        $('.search-content').html('');
        $('.search-content').css('display', 'block');
        var arrSearch = data.query.search;
        var link = 'https://en.wikipedia.org/wiki/';
        if (arrSearch.length > 1) {
            for(var i = 0; i < arrSearch.length; i++) {
                $('<p><a class="wiki-title-link" href="'+link+encodeURIComponent(arrSearch[i].title)+'" title="Visit the article on Wikipedia" target="_blank">'+arrSearch[i].title+'</a>&nbsp;&nbsp;&nbsp; <span class="wiki-snippet">'+arrSearch[i].snippet+'<span></p>').appendTo($('.search-content')).fadeIn('slow');
            }
        }
        else {
            $('.search-content').html('There is no search result');
        }
    });
};