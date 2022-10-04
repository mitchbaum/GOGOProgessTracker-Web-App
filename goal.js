let Di = 0;
let Ti = 0;
let El = 0;

let We = 0;
let Mo = 0;
let Ye = 0;

/*Set Custom Goal Button*/
function SetCGoal() {
    let result = []
    /*DTE to value*/
    if (Di == 1) {
        result.push("Ride a Distance of");
    }
    if (Ti == 1) {
        result.push("Ride a Time of");
    }
    if (El == 1) {
        result.push("Ride an Elevation of");
    }
    
    /*num box to value*/
    let unit = document.getElementById("unit").value;
    unit = unit.toString();
    result.push(unit);
    
    /*unit*/
    if (Di == 1) {
        result.push("Miles");
    }
    if (Ti == 1) {
        result.push("Hours");
    }
    if (El == 1) {
        result.push("Feet");
    }
    
    /*time span to value*/
    if (We == 1) {
        result.push("In a Week");
    }
    if (Mo == 1) {
        result.push("In a Month");
    }
    if (Ye == 1) {
        result.push("In a Year");
    }
    
    
    /*all values together*/
    let EndResult = result;
    EndResult = EndResult.toString();
    EndResult = EndResult.replaceAll(","," ");
    
    var stuff = EndResult;
    localStorage.setItem("info", stuff);
    
    /*console.log(EndResult);*/
    
    /*uncheck checkboxes and reset values*/
    document.getElementById("D").checked = false;
    document.getElementById("T").checked = false;
    document.getElementById("E").checked = false;
    
    document.getElementById("W").checked = false;
    document.getElementById("M").checked = false;
    document.getElementById("Y").checked = false;
    
    Di = 0;
    Ti = 0;
    El = 0;
    
    We = 0;
    Mo = 0;
    Ye = 0;
}

/*DTE Checkbox*/
function DTE() {
    var DTE1 = document.getElementById("D");
    var DTE2 = document.getElementById("T");
    var DTE3 = document.getElementById("E");
    
    if (DTE1.checked == true) {
        Di = 1;
    }
    if (DTE2.checked == true) {
        Ti = 1;
    }
    if (DTE3.checked == true) {
        El = 1;
    }
}

/*WMY Checkbox*/
function WMY() {
    var WMY1 = document.getElementById("W");
    var WMY2 = document.getElementById("M");
    var WMY3 = document.getElementById("Y");
    
    if (WMY1.checked == true) {
        We = 1;
    }
    if (WMY2.checked == true) {
        Mo = 1;
    }
    if (WMY3.checked == true) {
        Ye = 1;
    }
}

/*Monthly E Goals*/
function SetMonthlyGoal1() {
    let SMG1 = "Ride 100 Miles";
    
    var SMG1_2 = SMG1;
    localStorage.setItem("SMG1", SMG1_2);
    
    /*console.log(SMG1);*/
}

function SetMonthlyGoal2() {
    let SMG2 = "Ride 2500 ft Total Elevation";
    
    var SMG2_2 = SMG2;
    localStorage.setItem("SMG2", SMG2_2);
    
    /*console.log(SMG2);*/
}

function SetMonthlyGoal3() {
    let SMG3 = "Single Ride of 30+ Miles";
    
    var SMG3_2 = SMG3;
    localStorage.setItem("SMG3", SMG3_2);
    
    /*console.log(SMG3);*/
}

function SetMonthlyGoal4() {
    let SMG4 = "10 Days of Riding (Minimum of 2 miles)";
    
    var SMG4_2 = SMG4;
    localStorage.setItem("SMG4", SMG4_2);
    
    /*console.log(SMG4);*/
}

function SetMonthlyGoal5() {
    let SMG5 = "First 24.9 Miles Ridden";
    
    var SMG5_2 = SMG5;
    localStorage.setItem("SMG5", SMG5_2);
    
    /*console.log(SMG5);*/
}

/*clear all goals*/
function ClearAll() {
    localStorage.removeItem("info");
    localStorage.removeItem("SMG1");
    localStorage.removeItem("SMG2");
    localStorage.removeItem("SMG3");
    localStorage.removeItem("SMG4");
    localStorage.removeItem("SMG5");
}

document.addEventListener("DOMContentLoaded", () => {
	console.log("localStorge goal.js item = ", localStorage.getItem('id'));
	
});