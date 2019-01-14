$(document).ready(function() {

    // INITIALIZE FIREBASE
    var config = {
        apiKey: "AIzaSyCtHL7f2YUS9l46Rdo3ilu9v8VJLbMOMPo",
        authDomain: "projectonelightbox.firebaseapp.com",
        databaseURL: "https://projectonelightbox.firebaseio.com",
        projectId: "projectonelightbox",
        storageBucket: "",
        messagingSenderId: "369764684225"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    // LIGHTBOX FUNCTION //
    $(function() {
        $(".lightbox").delay(500).fadeIn(1000);

        // LIGHTBOX - SUBMIT BUTTON ON CLICK EVENT 
        $(".submitButton").on("click", function(event) {
            event.preventDefault();
            // SUBMIT BUTTON IS CLICKED LIGHTBOX WILL HIDE 
            $(".lightbox").hide();
            // alert("you clicked me");

            // GRABBING USERS INPUT IN FORM
            var submitName = $(".name").val().trim();
            var submitEmail = $(".email").val().trim();

            // PUSH INFO OF USER TO DATABASE
            database.ref().push( {
                submitName: submitName,
                submitEmail: submitEmail
            });
        });
    });
});

// EMPTY DOM TO BE POPULATED BY THE GOOGLE API
// googleTargetDiv.textContent = "TEST";    TESTING TO MAKE SURE IT WORKED CORRECTLY AND IN THE CORRECT SPOT / NEED TO DELETE THIS
$("#emptyGoogleDiv").html(" ");










