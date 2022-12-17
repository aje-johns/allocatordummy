"use strict";
let inputUMR = [
  "Pencil",
  "Binder",
  "Pencil",
  "Pen",
  "Pencil",
  "Binder",
  "Pencil",
  "Pencil",
  "Pencil",
  "Binder",
  "Pencil",
  "Binder",
  "Binder",
  "Pencil",
  "Desk",
  "Pen Set",
  "Binder",
  "Pen",
  "Pen",
  "Pen Set",
  "Pencil",
  "Pen Set",
  "Binder",
  "Binder",
  "Binder",
  "Binder",
  "Pen Set",
  "Pencil",
  "Pen",
  "Pencil",
  "Binder",
  "Desk",
  "Pen Set",
  "Pen Set",
  "Pen Set",
  "Desk",
  "Pencil",
  "Pen",
  "Binder",
  "Pencil",
  "Binder",
  "Binder",
  "Binder",
];
const userArray = ["user1", "user2"];

function removeBrokerCode(umr, index) {
  //if the index is 5 Then the broker code can be removedon the acutal data
  let umrWitNoBrokerCode = [];
  umr.forEach((element) => {
    let umrWithBrokerRemoved = element.slice(index);
    umrWitNoBrokerCode.push(umrWithBrokerRemoved);
  });
  return umrWitNoBrokerCode;
}

const umrWitNoBrokerCode = removeBrokerCode(inputUMR, 2);

function getRepetetion(umrWitNoBrokerCode) {
  let umrAndCount = [];

  umrWitNoBrokerCode.forEach((umr) => {
    umrAndCount[umr] = umrAndCount[umr] ? umrAndCount[umr] + 1 : 1;
  });

  let umrObjectArray = [];
  Object.entries(umrAndCount).forEach((umrArray) => {
    //we have to create the umr Objects inside the foreach loop
    //and then push it into an array
    let umrObject = { umr: umrArray[0], duplicateEntries: umrArray[1] };
    umrObjectArray.push(umrObject);
  });
  return umrObjectArray;
}
const umrAndDupicate = getRepetetion(umrWitNoBrokerCode);

//////////////////////////////////
//////////////////Allocate () ////
//////////////////////////////////
//////////////////////////////////

const userObj = createUserObj(userArray);

function allocate(umrAndDupicate, userObj) {
  let remainingSignings = umrAndDupicate.slice();
  remainingSignings.sort(function (a, b) {
    return a.duplicateEntries - b.duplicateEntries;
  });
  function printInfo() {
    console.log("the User List");
    userObj.forEach((user) => {
      console.log(user);
    });
    console.log("the UMR List");
    umrAndDupicate.forEach((item) => {
      console.log(item);
    });
  }
  printInfo();

  let length = umrAndDupicate.length;
  for (let i = 0; i < length; i++) {
    //after a certain nuumber of pop, our array will become undefined and that is causing the error

    userObj.forEach((user) => {
      if (remainingSignings != undefined) {
        let onStage = remainingSignings.pop();
        let count;

        count = onStage.duplicateEntries;

        user.allocatedUMR.push(onStage);
        user.totalCount = user.totalCount + count;
      }
    });
  }
  console.log(userObj);
} //End of Allocate

allocate(umrAndDupicate, userObj);

function createUserObj(userArray) {
  let userObjectArray = [];
  userArray.forEach((item) => {
    let userObj = {
      userName: item,
      allocatedUMR: [],
      totalCount: 0,
    };
    userObjectArray.push(userObj);
  });
  return userObjectArray;
}
