let controller = {

        captureFormFields: () => {
            $('body').on("click", ".button-add", () => {
                event.preventDefault();


                userName = $('#user-Name').val().trim();
                userEmail = $('#Email-Address').val().trim();



                controller.nextArrival();
                controller.minutesAway();

                $('.form-control').val("");

                model.pushName();
                model.pushEmail();


            });
        },