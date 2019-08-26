// Declartions
let wins = 0;
let losses = 0;
let magic = 0;
let btns = [];
let tempArray = [];
let tempSum = 0;


function genRand(lower, upper){
    let rand = (Math.floor(Math.random() * upper +1));
        if (rand <= lower){ 
            console.log("Random# is lower than input. Re-generating");   
            genRand(lower, upper);
        }
    return rand;   
}

function createMagic(){
    magic = genRand(19,120); //generate magic number between 19 & 120 per requirements
    console.log("Magic number: " + magic);
    $("#number").html("Magic Number: " + magic);
    tempSum=0;
    return magic;
}

function check(x,y){
    if(x === y){
        wins++;
        alert("You win!!");
        console.log("wins: " +wins);
        DOMuWL(wins,losses);
        tempSum=0;
        DOMuNum(tempSum);
        createMagic();
        console.log("Magic number after win: "+magic);
        console.log("tempsum in check: "+tempSum);
        buttons();
    }
    if(x > y){
        losses++;
        console.log("losses: " +losses);       
        DOMuWL(wins,losses);
        alert("Magic number exceeded!! You lose." );
        tempSum=0;
        DOMuNum(tempSum);
        createMagic();
        console.log("Magic number after loss: "+magic);
        console.log("tempsum in check: "+tempSum);
        buttons();  
    }

}

function DOMuNum(x){
    $("#yourNum").html("Your Number: " + x);
}

function DOMuWL(wins,losses){
    $("#wins").html("Wins: " + wins);
    $("#losses").html("Losses: " + losses);
}

function buttons(){ //function to assign values to buttons
    btns.length = 0; // setting array lengths to 0 in case it gets called again
    tempArray.length = 0;
    for (let i=0; i<=3; i++){
        tempArray[i] = genRand(1,12); // loop to populate 4 cell temp array with random numbers 
    }
    console.log("unsorted tempArray: " + tempArray);
    tempArray.sort(); // sorts temp array **ascii sort only - learn to fix**
    console.log("sorted tempArray: " + tempArray);

    for (let i=0; i<=3; i++){ //once sorted, if there is a duplicate, it will be in next array cell
        if (tempArray[i] === tempArray[i+1]){
            console.log("Duplicate number found. Re-generating");
            buttons(); // recursively calls function to start over if duplicate found
        } else {
            btns[i] = tempArray[i]; // writes tempArray values to btns array
        }
    }
    console.log("Buttons array: " + btns)

    function arraySum(total, num) { // declaration of function that must be used in reduce method below
        return total + num;
      }
        let buttonSum = 0;  
        buttonSum = btns.reduce(arraySum);
        console.log("Sum of button values: " + buttonSum + " Magic#: " + magic)
        if (buttonSum > magic){
            console.log("Button sum exceeds magic number. Regenerating");
            buttons();
        }    
    };
    
    function play(btns,tempSum){
        $("#green").on("click", function(event){
            tempSum += btns[0]; //add button value btns[0] to tempSum when green crystal clicked
            console.log("green: " +btns[0] + " Your Number: " + tempSum );
            DOMuNum(tempSum);
            check(tempSum,magic);
        })
        $("#red").on("click", function(event){
            tempSum += btns[1]; //add button value btns[1] to tempSum when red crystal clicked
            console.log("red: " +btns[1] + " Your Number: " + tempSum );
            DOMuNum(tempSum);
            check(tempSum,magic);
        })
        $("#yellow").on("click", function(event){
            tempSum += btns[2]; //add button value btns[2] to tempSum when yellow crystal clicked
            console.log("yellow: " +btns[2] + " Your Number: " + tempSum );
            DOMuNum(tempSum);
            check(tempSum,magic);
        })
        $("#blue").on("click", function(event){
            tempSum += btns[3]; //add button value btns[3] to tempSum when blue crystal clicked
            console.log("blue: " +btns[3] + " Your Number: " + tempSum );
            DOMuNum(tempSum);
            check(tempSum,magic);
        })
        
    }

// Main code section


createMagic();
buttons();
play(btns,tempSum);
check(tempSum, magic);



// pseudocode flow
// 1. Generate magic Number - done
// 2. Generate random numbers for buttons - done
// 3. Check for valid numbers in button selections - done
// 4. On click crystal add value to total. Will assign values to each when function is fired. - done
// 6. Compare total to magic# Continue unless matches or exceeds - done
//     a. if matches, fire "winning" function and increments wins counter - done
//     b. if exceeds, fire "losing" function and increments loss counter - done
// 7. regenerates magic number, button values for next game

