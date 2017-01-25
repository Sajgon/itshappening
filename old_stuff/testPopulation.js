module.exports = function(Kitten,Owner){

  var k1 = new Kitten({name:"Pelle Svanslös",age:1});
  var k2 = new Kitten({name:"Maja Gräddnos", age:1});
  var k3 = new Kitten({name:"Måns", age:3});

  var owner = new Owner({name:"Svante",age:40,phoneNumber:"123"});

  owner.save(saveKittens);

  function saveKittens(err,owner){
    k1.owner = owner._id;
    k2.owner = owner._id;
    var kittenIds = [];
    function runWhenBothSaved(err,savedKitten){
      kittenIds.push(savedKitten._id);
      if(kittenIds.length == 3){updateOwner(kittenIds);}
    }
    k1.save(runWhenBothSaved);
    k2.save(runWhenBothSaved);
    k3.save(runWhenBothSaved);
  }

  function updateOwner(kittenIds){
    // remove måns
    kittenIds.pop();
    owner.kittens = kittenIds;
    owner.save(logAndLook);
  }

  function logAndLook(){
    console.log("The owner",owner);
    console.log("\nThe kittens",k1,k2);

    Owner
    .findOne({_id:owner._id})
    .populate('kittens')
    .exec(function(err,populatedOwner){
      console.log("\n\nThe owner, populated", populatedOwner);

      // Remove a kitten... Maja
      populatedOwner.kittens.pop();
      // Add Måns
      populatedOwner.kittens.push(k3);

      // Trying to save a populated object to the db
      populatedOwner.save(function(err,owner){
        console.log("\nSaved populated owner",owner);

        // Let's get that owner from scratch
        Owner.findOne({_id:owner._id},function(err,ownerAgain){
          console.log("The owner, freshly found",ownerAgain);
        });
      });

    });

    Kitten
    .find({_id:{$in:[k1._id,k2._id]}})
    .populate('owner')
    .exec(function(err,populatedKittens){
      console.log("\nThe kittens, populated", populatedKittens);
    });

  }

};
