db.open(function(err,db){ // <------everything wrapped inside this function
      db.collection('quotees', function(err, collection) {
           collection.find({'category':'age'}).toArray(function(err, items) {
               console.log(items);
              res.send(items);
           });
        });
   });