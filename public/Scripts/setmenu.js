
$(document).ready(function() {
/*
    $("#myModal").find('#spllunch').on('hidden', function (e) {
        //e.preventDefault();
        e.stopPropagation();
        console.log('blocked propagation!');
    });

 */


    console.log("set menu script running");


    const db=firebase.firestore();
    db.settings({ timestampsInSnapshots: true });


    //form submit
    const form1 = document.getElementById("myform");
    if (form1) {
        let flag=0;
        form1.addEventListener('submit', function (e) {
            e.preventDefault();

            //Breakfast

            db.collection('Menu').doc('Breakfast').collection('Buffet').doc('Item').update({
                description: form1.bb.value,
                isVeg: true,
                price: "30",
                //name: "buffet",

            })
                .then(function() {
                console.log("Document successfully written!");
            })
                .catch(function() {
                    flag=1;
                });

            form1.bb.value='';


            //Lunch veg


            db.collection('Menu').doc('Lunch').collection('Buffet').doc('Veg').update({
                description: form1.lbv.value,
                isVeg: true,
                price: "50",
                //name:"Buffet"

            })
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function() {
                    flag=1;
                });


            form1.lbv.value = '';

            //Lunch non veg


            db.collection('Menu').doc('Lunch').collection('Buffet').doc('Non Veg').update({
                description: form1.lbnv.value,
                isVeg: false,
                price: "80",
                //name: "",

            })
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function() {
                    flag=1;
                });


            form1.lbnv.value = '';


            //Lunch special


            db.collection('Menu').doc('Lunch').collection('Buffet').doc('Special').update({
                description: form1.lbsdesc.value,
                isVeg: form1.lbsveg.checked,
                price: form1.lbsprice.value,
                name: form1.lbsname.value,

            })
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function() {
                    flag=1;
                });




            //Dinner veg


            db.collection('Menu').doc('Dinner').collection('Buffet').doc('Veg').update({
                description: form1.dbv.value,
                isVeg: true,
                price: "50",
                //name: "",

            })
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function() {
                    flag=1;
                });


            form1.dbv.value = '';

            //Dinner non veg


            db.collection('Menu').doc('Dinner').collection('Buffet').doc('Non Veg').update({
                description: form1.dbnv.value,
                isVeg: false,
                price: "80",
                //name: "",

            })
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function() {
                    flag=1;
                });


            form1.dbnv.value = '';

            //Dinner special


            db.collection('Menu').doc('Dinner').collection('Buffet').doc('Special').update({
                description: form1.dbsdesc.value,
                isVeg: form1.dbsveg.checked,
                price: form1.dbsprice.value,
                name: form1.dbsname.value,

            })
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function() {
                    flag=1;
                });





            if (flag===1)
                alert("Error in connecting to data base database...");
            else
                alert("Menu set successfully");

        });
    } else console.log(form1+'error in finding form 1');
//form submit ends
});