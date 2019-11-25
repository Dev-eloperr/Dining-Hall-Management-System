
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
    db_ref.orderBy('timeStamp').onSnapshot(function(querySnapshot) {
        var orders= [];

        querySnapshot.docChanges().forEach(function(change) {
            orders.push(change.doc.data());
            if(change.type === "added") {
                document.getElementById('orders-wrapper').insertAdjacentHTML('beforeend', '<tr id="' + change.doc.data().name + '' + change.doc.data().userID + '">' +
                    '<th class="count"></th>' +
                    '<th>' + change.doc.data().name + '</th><th>' + change.doc.data().quantity + '</th><th>' + change.doc.data().userID + '</th></tr>');
                count=count+1;
                if (count===1)
                    document.getElementById('spin').remove();
            }else if (change.type === "removed") {
                document.getElementById(change.doc.data().name + '' + change.doc.data().userID).remove();
                count=count-1;
            }
            reset_count();
        });
        console.log(orders);

    });
    function reset_count(){
        let i=1;
        document.querySelectorAll('.count').forEach(function(element) {
            element.innerHTML=i;
            i=i+1;
        });
        i=1;
    }
});