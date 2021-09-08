"use strict";
exports.__esModule = true;
var sweetalert2_1 = require("sweetalert2");
// setup container div
var container = document.createElement('div'); //create div
container.className = 'header-container'; // create class name for div
//button div -- Do I need this?
var buttonDiv = document.createElement('div'); //create div for button
// dice div
var diceDiv = document.createElement('div'); //create div for dice
diceDiv.id = 'diceDivId'; // create ID for dice div
container.appendChild(buttonDiv);
container.appendChild(diceDiv);
document.body.appendChild(container);
var myButtonsDiv = document.getElementById('myButtonsDiv');
// create button elements:
var newDie = document.getElementById('newDie'); // new
var rollDie = document.getElementById('rollDie'); //roll
var sumDie = document.getElementById('sumDie'); // sum
var globalArr = [];
var dieArr = ["\u2680", "\u2681", "\u2682", "\u2683", "\u2684", "\u2685"];
var divCounter = 1;
// Sweet Alert code
var Toast = sweetalert2_1["default"].mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: function (toast) {
        toast.addEventListener('mouseenter', sweetalert2_1["default"].stopTimer);
        toast.addEventListener('mouseleave', sweetalert2_1["default"].resumeTimer);
    }
});
var Die = /** @class */ (function () {
    function Die() {
        this.div = document.createElement('div');
        this.div.className = 'die';
        this.div.id = divCounter.toString();
        diceDiv.appendChild(this.div);
        globalArr.push(this);
        this.addEvents();
        this.roll();
    }
    //random num generator
    Die.prototype.randoNum = function () {
        var randoNum = Math.floor(Math.random() * 6);
        return randoNum + 1;
    };
    // this is the roll method
    //value: number;
    Die.prototype.roll = function () {
        this.value = this.randoNum();
        //  this.div.textContent = this.value;  //original - used for regular die text
        this.div.textContent = dieArr[this.value - 1];
        Toast.fire({
            icon: 'success',
            title: 'Dice Rolled Successfully'
        });
    };
    Die.prototype.addEvents = function () {
        var _this = this;
        //  Die (Click Event) ------------------------------
        this.div.addEventListener('click', function () { return _this.roll(); });
        // Double click = REMOVE CHILD
        this.div.addEventListener('dblclick', function () {
            var dieIndex = globalArr.indexOf(_this);
            globalArr.splice(dieIndex, 1);
            diceDiv.removeChild(_this.div);
            //globalArr.pop(this.value);
            console.log(_this.div);
            console.log(globalArr);
            Toast.fire({
                icon: 'success',
                title: 'Dice Removed Successfully'
            });
        });
    };
    return Die;
}());
newDie.addEventListener('click', function () {
    new Die();
    console.log(globalArr);
    console.log(divCounter);
    divCounter += 1;
});
rollDie.addEventListener('click', function () { return globalArr.forEach(function (die) { return die.roll(); }); });
// loops through die array and finds sum
sumDie.addEventListener('click', function () {
    var result = 0;
    for (var i = 0; i < globalArr.length; i++) {
        result += globalArr[i].value;
        console.log(globalArr);
    }
    console.log("Sum Die! " + result);
    // alert( `Sum of dice is = ${result}`);
    sweetalert2_1["default"].fire({
        title: "Sum of dice is = " + result,
        width: 600,
        padding: '3em'
    });
    return result;
});
