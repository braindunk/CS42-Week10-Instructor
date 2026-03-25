// cs42 midterm exam review

// 1 javascript basics

  // variables, data value types

  var x;
  let y; // let is almost identical to var, var is hoisted, but let is not
  x = 1;
  // "hoisted" is not specific a concept on the exam
  // for more on hoisting: https://www.w3schools.com/js/js_hoisting.asp
  x = 2;
  const z = 0; // const is a non-changeable structure, so only set a const value once

  // equals sign means multiple things in different context (how many instances of the symbol)
  // =
  // assignment operator means put a value into a variable
  // ==
  // comparison of equality without concern for the underlying data types
  // fuzzy equality where type doesn't matter
  if (2 == "2") {
    alert("but does it really?");
  }
  // ===
  // exact equality including data type
  if (2 === "2") {
    alert("nope");
  }

  // simple value types: numbers, string, boolean (true/false), 
  // complex compound value type: arrays, object values

  // arrays uses square brackets [] for array notation
  let a = [ 2, 3, 4, 5 ];
  let b = [ 1, 'string here', true, 10 ];
  console.log( a[ 0 ] ); // to retrieve a element from an array provide index # in []
  console.log( b[ 3 ] ); 

  // object values cross-over in other languages to the core object-oriented concept of class
  // in js we use curly braces for two fundamental containers
  // one of those uses is the object value data type/structure
  let q = {
    firstName: "fred",
    lastName: "jones",
    phone: "894-1234",
    age: 12
  };

  // dot notation in javascript is how we navigate object values and their properties to retrieve values
  console.log( q.firstName ); 

  let ugly = {
    prop1: 12,
    prop2: 24,
    prop3: {
      nested1: "here i am",
      nested2: 12,
      nested3: {
        crazy: "wow"
      }
    }
  };

  console.log(ugly.prop3.nested3.crazy);

  // control structures: conditional statements, loops
  if ( 2 == "2" ) {
    // do this in here is true
  } else {
    // do this in here if false
  }

  x = 2;
  while ( x < 100 ) {
    console.log(x);
    x++;
  }

  // for()
  // parameters: 1) var declare 2) condition 3) 
  for( x=2; x < 100; x++ ) {
    // do something
  }

  function myCode(a,b) {
    alert("doing it with " + a);
  }

  myCode(10,12);

// 2 game engine programming concepts (not really code specific) discuss outside this example

  // look at in-class coding examples for weeks 1-9

// 3 phaser engine basics

  // look at in-class coding examples for weeks 1-9