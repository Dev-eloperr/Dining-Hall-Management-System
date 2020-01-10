
$(document).ready(function() {
    console.log("fetching...");
    var count=0;
    const db=firebase.firestore();
    let doc_name;
    console.log(window.location.toString());
    if ( window.location.toString().includes("alacarte") ) {
        doc_name = 'Ala-Carte';
    }
    else if ( window.location.toString().includes("bakery") ) {
        doc_name = 'Bakery';
    }else {
        doc_name = 'Roll Maal';
    }

    const db_ref = db.collection('Orders').doc(doc_name).collection('Orders');
    let orders= [];
    db_ref.orderBy('name').onSnapshot(function(querySnapshot) {


        querySnapshot.docChanges().forEach(function(change) {

            if(change.type === "added") {
                orders.push(change.doc.data());
                document.getElementById('orders-wrapper').insertAdjacentHTML('beforeend', '<tr id="' + change.doc.data().name + '' + change.doc.data().userID + '">' +
                    '<th class="count"></th>' +
                    '<th>' + change.doc.data().name + '</th><th>' + change.doc.data().quantity + '</th><th>' + change.doc.data().userID + '</th>' +
                    '</tr>');
                count=count+1;
                if (count===1)
                    document.getElementById('spin').remove();
            }else if (change.type === "removed") {
                document.getElementById(change.doc.data().name + '' + change.doc.data().userID).remove();
                let index = orders.indexOf(change.doc.data());
                if (index > -1) {
                    orders.splice(index, 1);
                }
                count=count-1;
            }

            reset_count();
        });
        console.log(orders);
        if (doc_name === 'Ala-Carte')
            setTable2();
    });



    function reset_count(){
        let i=1;
        document.querySelectorAll('.count').forEach(function(element) {
            element.innerHTML=i;
            i=i+1;
        });
        i=1;
    }
    function reset_count2(){
        let i=1;
        document.querySelectorAll('.count2').forEach(function(element) {
            element.innerHTML=i;
            i=i+1;
        });
        i=1;
    }
    
    function setTable2() {

        document.getElementById('spin2').remove();
        //reset_count2();
        let orderscopy = [...orders];
        //console.log(orderscopy);
        let timestamp;
        let userid;
        for (let i=0; i<orderscopy.length;i++){
            console.log(orderscopy);
            timestamp = orderscopy[i].timeStamp.seconds;
            userid    = orderscopy[i].userID;
            //orders2[i][k] = orderscopy[i];
            document.getElementById('orders-wrapper2').insertAdjacentHTML('beforeend', '<tr id="' + i+'1'+ '">' +
                '<th class="count2"></th>' +
                '<th>' + orderscopy[i].name + '</th><th>' + orderscopy[i].quantity + '</th><th>' + orderscopy[i].userID + '</th>' +
                '<th>' + '<input type="text" class="input-form-control"> <button class="btn-sm bg-light">Set</button> ' + '</th><th>' + '<button class="btn-sm bg-light">Done?</button> ' + '</th>' +
                '</tr>');
            /*
            let index = orderscopy.indexOf(orderscopy[i]);
            if (index > -1) {
                orderscopy.splice(index, 1);
            }

             */
            orderscopy[i]=0;
            console.log(timestamp);
            for (let j=i+1; j<orderscopy.length;j++){
                if ((orderscopy[j].timeStamp.seconds === timestamp) && (orderscopy[j].userID === userid)){
                    document.getElementById('orders-wrapper2').insertAdjacentHTML('beforeend', '<tr>' +
                        '<th></th>' +
                        '<th>' + orderscopy[j].name + '</th><th>' + orderscopy[j].quantity + '</th>' +
                        '</tr>');

                    let index = orderscopy.indexOf(orderscopy[j]);
                    if (index > -1) {
                        orderscopy.splice(index, 1);
                    }



                }

            }
        }
        reset_count2();
    }




});


