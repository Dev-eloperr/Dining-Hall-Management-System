$(document).ready(function() {

    disableAll();

    const loginform = document.getElementById("loginform");
    if (loginform) {
        loginform.addEventListener('submit', function (e) {
            e.preventDefault();
            alert("btn pressed");
            var email = loginform.email.value;
            var password = loginform.pass.value;
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                alert(error.message);
            });
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in.
                    var displayName = user.displayName;
                    console.log(displayName);
                    if (email === 'admin@dhms.com')
                        $('#adminbtn').removeClass('disabled');
                    else {
                        $('.nav-link').removeClass('disabled');
                        $('#adminbtn').addClass('disabled');

                    }
                } else {
                    disableAll();
                }
            });
        });
    }

    function disableAll() {
        $('.nav-link').addClass('disabled');
    }


/*



// Sign out user
    firebase.auth().signOut()
        .catch(function (err) {
            // Handle errors
        });
*/
});


