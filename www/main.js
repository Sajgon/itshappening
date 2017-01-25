// Create som new rest entitites
// (also see rest-entity.class.js)
var Kitten = new RestEntity('kitten');
var Owner = new RestEntity('owner');

// Test communication with the server
// through the Kitten and Owner objects

var mem = {}, tests = [
  // Clean the database
  () => {
    Kitten.delete('find/{name:/Pelle.*/}',next);
  },
  () => {
    Owner.delete('find/{name:/Kalle.*/}',next);
  },
  // Tests with Kitten
  () => {
    Kitten.create({name:"Pelle Svanslös",age:8},next);
  },
  (kitten) => {
    console.log('Kitten created',kitten);
    Kitten.find('find/{name:/Pelle.*/}',next);
  },
  (kittens) => {
    console.log('All kittens named Pelle',kittens);
    mem.kitten = kittens[0];
    Kitten.update(kittens[0]._id,{age:11},next);
  },
  (result) => {
    console.log("Updating kitten Pelle", result);
    Kitten.find(mem.kitten._id,next);
  },
  (kitten) => {
    console.log("The updated Pelle",kitten);
    next();
  },
  // Test with owner
  () => {
    Owner.create({
      name:"Kalle Kattälskare",
      age:75,
      phoneNumber:'+46-040-312255',
      kittens:[mem.kitten._id],
    },next);
  },
  (owner) => {
    console.log('Owner created',owner);
    Kitten.update(mem.kitten._id,{owner:owner._id},next);
  },
  (result) => {
    console.log("Added the owner to Pelle...",result);
    Kitten.find(mem.kitten._id,next);
  },
  (kitten) => {
    console.log("Now Pelle knows about his owners",kitten);
    Owner.find('find/{name:/Kalle.*/}',next);
  },
  (owners) => {
    console.log('All owners named Kalle',owners);
    mem.owner = owners[0];
    Owner.update(owners[0]._id,{age:80},next);
  },
  (result) => {
    console.log("Updating owner Kalle", result);
    Owner.find(mem.owner._id,next);
  },
  (owner) => {
    console.log("The updated Kalle",owner);
    Owner.delete(owner._id,next);
  },
  (result) => {
    console.log("Deleting owner Kalle",result);
    Kitten.delete(mem.kitten._id,next);
  },
  (result) => {
    console.log("Deleting kitten Pelle",result);
  }
];

// Run all tests
function next(data){
  if(!tests.length){return;}
  tests.shift()(data);
}
next();


// Display the console.log on screen
// - just for fun and a more human friendly output
(function(){
  var org = console.log;
  console.log = function(explanation,result){
    $('body').append(
      '<h2>' + explanation + '</h2><pre><code class="json">' +
      JSON.stringify(result,'','  ') + '</code></pre>'
    );
    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });
    return org.apply(console,arguments);
  };
})();
