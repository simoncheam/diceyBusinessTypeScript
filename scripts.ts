import Swal from "sweetalert2";


// setup container div
const container = document.createElement('div'); //create div
container.className = 'header-container';  // create class name for div

//button div -- Do I need this?
const buttonDiv = document.createElement('div'); //create div for button

// dice div
const diceDiv = document.createElement('div'); //create div for dice
diceDiv.id = 'diceDivId'; // create ID for dice div

container.appendChild(buttonDiv);
container.appendChild(diceDiv);
document.body.appendChild(container);

let myButtonsDiv = document.getElementById('myButtonsDiv');

// create button elements:
let newDie = <HTMLElement>document.getElementById('newDie'); // new
let rollDie = <HTMLElement>document.getElementById('rollDie'); //roll
let sumDie = <HTMLElement>document.getElementById('sumDie'); // sum

const globalArr: Array<Die> = [];
const dieArr = ["\u2680", "\u2681", "\u2682", "\u2683", "\u2684", "\u2685"];

let divCounter = 1; 

// Sweet Alert code
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })


class Die {

    div: HTMLDivElement;
    value!: number;
    
    constructor() {
        
        
        this.div  = <HTMLDivElement>document.createElement('div');
        this.div.className = 'die';
        this.div.id = divCounter.toString(); 
        diceDiv.appendChild(this.div);

        globalArr.push(this);
        
        this.addEvents(); 
        
        this.roll();
    }
    
    
    
    //random num generator
    randoNum() :number {
        let randoNum = Math.floor(Math.random()*6);
        return randoNum+1;
    }
    
    // this is the roll method
    //value: number;
    
    roll()  {

        this.value = this.randoNum();

       //  this.div.textContent = this.value;  //original - used for regular die text

       this.div.textContent = dieArr[this.value-1];

        Toast.fire({
            icon: 'success',
            title: 'Dice Rolled Successfully'
          })


    }

    addEvents(){
        
         //  Die (Click Event) ------------------------------
        this.div.addEventListener('click', () => this.roll()) 

        // Double click = REMOVE CHILD
        this.div.addEventListener('dblclick', () => {  
            
            let dieIndex = globalArr.indexOf(this);
            globalArr.splice(dieIndex,1);
            diceDiv.removeChild(this.div);

            //globalArr.pop(this.value);
            console.log(this.div);
            console.log(globalArr);

            Toast.fire({
                icon: 'success',
                title: 'Dice Removed Successfully'
              })

        });
    }     
}


newDie.addEventListener('click', () =>{  
    new Die ();
    
console.log(globalArr);
console.log(divCounter);
divCounter += 1;  
});

rollDie.addEventListener('click', () => globalArr.forEach((die) =>die.roll()));

// loops through die array and finds sum
sumDie.addEventListener('click', () =>{  
    let result = 0; 
    for (let i = 0; i<globalArr.length; i++){
       result += globalArr[i].value; 
       console.log(globalArr);

    }
    console.log(`Sum Die! ${result}`);
    // alert( `Sum of dice is = ${result}`);

    Swal.fire({
        title: `Sum of dice is = ${result}`,
        width: 600,
        padding: '3em',
        // background: '#fff url(/images/trees.png)',
        // backdrop: `
        //   rgba(0,0,123,0.4)
        //   url("/images/nyan-cat.gif")
        //   left top
        //   no-repeat
        // `
      })

    return result;
    });



