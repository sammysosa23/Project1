$.get(
    "https://www.googleapis.com/youtube/v3/channels", {
        part: 'contentDetails',
        forUsername: 'USER_CHANNEL_NAME',
        key: 'AIzaSyCdwC23T8LG-ANlisnBqfODfqoauzfNJO8'
    },
    function(data) {
        $.each(data.items, function(i, item) {
            pid = item.contentDetails.relatedPlaylists.uploads;
            getVids(pid);
        });
    }
);


function getVids(pid) {
    $.get(
        "https://www.googleapis.com/youtube/v3/playlistItems", {
            part: 'snippet',
            maxResults: 20,
            playlistId: pid,
            key: 'AIzaSyCdwC23T8LG-ANlisnBqfODfqoauzfNJO8'
        },
        function(data) {
            var results;
            $.each(data.items, function(i, item) {
                results = '<li>' + item.snippet.title + '</li>';
                $('#results').append(results);
            });
        }
    );
}


<!--In your HTML -->
<
ul id = "results" > < /ul>