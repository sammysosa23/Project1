// LIGHTBOX 
$(document).ready(function() {

        var lightBox = $(".lightbox");

    // LIGHTBOX FUNCTION //
    $(function() {
        $(".lightbox").delay(500).fadeIn(1000);

        $(".enterButton").on("click", function() {
          lightBox.animate({ height: "300px"});
            alert("test");
        });
    });
});