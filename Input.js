var config = {
    apiKey: "AIzaSyCG8yYWv_c7mpSkOsRtuBdQAqj4ODRQl2Q",
    authDomain: "ketchup-471e7.firebaseapp.com",
    databaseURL: "https://ketchup-471e7.firebaseio.com",
    projectId: "ketchup-471e7",
    storageBucket: "ketchup-471e7.appspot.com",
    messagingSenderId: "827847930650"
};
firebase.initializeApp(config);


var database = firebase.database();
var name;
var Email;


var model = {

        pushNewTrain: () => {


            database.ref().push({

                userName: inputName,
                userEmail: inputEmail,
                dateAdded: firebase.database.ServerValue.timestamp

            });

            model.pullChildFromDatabase();

        },

        pullChildFromDatabase: () => {

            var filter = database.ref().orderByChild("dateAdded").limitToLast(1)

            filter.once("child_added", function(childSnapshot) {

                userName = childSnapshot.val().inputName
                userEmail = childSnapshot.val().inputEmail




                view.updateUserdata();
            });

        },