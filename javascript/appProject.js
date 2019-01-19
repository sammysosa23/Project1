$(document).ready(function() {

    // INITIALIZE FIREBASE - USER NAME - EMAIL
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
        $(".lightbox").delay(500).fadeIn(2000);

        // LIGHTBOX - SUBMIT BUTTON ON CLICK EVENT 
        $(".submitButton").on("click", function(event) {
            event.preventDefault();
            // SUBMIT BUTTON IS CLICKED LIGHTBOX WILL HIDE 
            $(".lightbox").hide();
            // alert("you clicked me");
            $(".display-3").fadeOut(2500);
            $(".paragraph").fadeOut(2500);

            // if ( !name || !email ) return; THIS WILL JUST LET THE USER ACCESS THE PAGE WITHOUT INPUTING THE REQUIRED INFO  

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
    // CONTACT US FORM FUNCTION //
    // $(function() {
        // ON CLICK FUNCTION WILL TRIGGER FORM //
    //     $(".contactUsLightBox").on("click", function(event) {
    //         event.preventDefault();
    //         alert("clicked");
    //         CONTACT BUTTON IS CLICKED - LIGHTBOX WILL DISPLAY
    //         $(".contactUsLightBox").show();

    //             $(".contactUsSubmitButton").on("click", function(event) {
    //                 $(".contactForm").unbind("submit").hide();
    //         })
            
    //         // GRABBING USERS INPUT IN CONTACT US FORM
    //         var contactUsName = $(".name").val().trim();
    //         var contactUsEmail = $(".email").val().trim();
    //         var contactUsMessage = $(".message").val().trim();

    //         databasebase.ref().push( {
    //             contactUsName: contactUsName,
    //             contactUsEmail: contactUsEmail,
    //             contactUsMessage: contactUsMessage
    //         }); 
    //     });
    // });
    
    // SEARCH FORM BUTTON - MAGNIFYING GLASS 
    $(function() {
        $(".searchImage").on("click", function(event) {
            
        });
    });
});

// EMPTY DOM TO BE POPULATED BY THE GOOGLE API
// googleTargetDiv.textContent = "TEST";    TESTING TO MAKE SURE IT WORKED CORRECTLY AND IN THE CORRECT SPOT / NEED TO DELETE THIS
$("#emptyGoogleDiv").html(" ");










