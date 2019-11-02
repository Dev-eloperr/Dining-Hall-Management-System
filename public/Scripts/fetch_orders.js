
$(document).ready(function() {
    console.log("fetching...");
    var count=0;
    const db=firebase.firestore();
    let doc_name;
    console.log(window.location.toString());
    if ( window.location.toString().includes("alacarte") ) {
        //Code here
        doc_name = 'Ala-Carte';
    }
    else if ( window.location.toString().includes("bakery") ) {
        //Code here
        doc_name = 'Bakery';
    }else {
        doc_name = 'Roll Maal';
    }

    const db_ref = db.collection('Orders').doc(doc_name).collection('Orders');
    db_ref.orderBy('orderId').onSnapshot(function(querySnapshot) {
        var orders= [];

        querySnapshot.docChanges().forEach(function(change) {
            orders.push(change.doc.data());
            count=count+1;
            document.getElementById('orders-wrapper').insertAdjacentHTML('beforeend','<tr><th>'+count+'</th>' +
                '<th>'+change.doc.data().desc+'</th><th>'+change.doc.data().quantity+'</th><th>'+change.doc.data().orderId+'</th></tr>');
        });
        console.log(orders);

    });
});