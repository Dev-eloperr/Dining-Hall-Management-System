$(document).ready(function() {

    const loginform = document.getElementById("loginform");
    if (loginform) {
        loginform.addEventListener('submit', function (e) {
            e.preventDefault();
            var email = loginform.email.value;
            var password = loginform.pass.value;
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                alert(error.message);
            });
            
            if (loginform.signedIn.checked === true){
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
                    .then(function() {
                        // Existing and future Auth states are now persisted in the current
                        // session only. Closing the window would clear any existing state even
                        // if a user forgets to sign out.
                        // ...
                        // New sign-in will be persisted with session persistence.
                        return firebase.auth().signInWithEmailAndPassword(email, password);
                    })
                    .catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                    });

            } else{
                firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
                    .then(function() {
                        // Existing and future Auth states are now persisted in the current
                        // session only. Closing the window would clear any existing state even
                        // if a user forgets to sign out.
                        // ...
                        // New sign-in will be persisted with session persistence.
                        return firebase.auth().signInWithEmailAndPassword(email, password);
                    })
                    .catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                    });
            }

            
            
        });
    }

    function disableAll() {
        $('.nav-link').addClass('disabled');
    }

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            $('#replace-login').addClass('d-none');
            $('#replace').removeClass("d-none");
            $('#user-email').html(user.email);
            if (user.email === 'admin@dhms.com'){
                $('.nav-link').removeClass('disabled');
            }
            else {
                window.location.replace('./index.html');
                $('.nav-link').removeClass('disabled');
                $('#adminbtn').addClass('disabled');
            }
        } else {
            $('#replace-login').removeClass('d-none');
            $('#replace').addClass("d-none");
            disableAll();
        }
    });

    // Sign out user
    $('#signout').click(function signOut() {
        firebase.auth().signOut().then(function() {
            console.log('Signed Out');
        }, function(error) {
            console.error('Sign Out Error', error);
        });
    });

});


