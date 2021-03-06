$(document).ready(function() {
    console.log('security script running...');
    $('#adminbtn').addClass('disabled');
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            if (user.email === 'admin@dhms.com'){
                $('.nav-link').removeClass('disabled');
            }
            else if(window.location.toString().includes("admin")){
                console.log(user.email);
                $('.nav-link').removeClass('disabled');
                $('#adminbtn').addClass('disabled');
                window.location.replace('./index.html');
            }
        } else {
            window.location.replace('./index.html');
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