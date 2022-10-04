var strava_id = parseInt(window.localStorage.getItem("strava_id"));

function createTable(array, id) {
	var table = document.getElementById(id);
	if (array.length > 0) {
		for (let row of array) {
			table.insertRow();
			row[1] = row[1].concat(" " + row[2]);
			row.splice(2, 1);
			for (let cell of row) {
				let newCell = table.rows[table.rows.length - 1].insertCell();
				newCell.textContent = cell;
				if (cell === strava_id) {
					table.rows[table.rows.length - 1].setAttribute("style", "background-color: yellow");
				}
			}
		}
	}
}

async function getLeaderBoard(command, strava_id) {
    let myResponse = await fetch(`leaderboard.php?${command}=${strava_id}`);
    let result = await myResponse.json();
    console.log(result);
	if (command === "distance") {
		var array40k = [];
		var array30k = [];
		var array20k = [];
		var array10k = [];
		var array5k = [];
		var array1k = [];

		distanceArray = Object.values(result);
		distanceArray.forEach(object => {
			let distance = object["lifetimeDistance"];
			if (distance > 40000) {
				array40k.push(Object.values(object));
			} else if (distance >= 30000) { 
				array30k.push(Object.values(object));
			} else if (distance >= 20000) {
				array20k.push(Object.values(object));
			} else if (distance >= 10000) {
				array10k.push(Object.values(object));
			} else if (distance >= 5000) {
				array5k.push(Object.values(object));
			} else if (distance >= 1000) {
				array1k.push(Object.values(object))
			}
		});
		//console.log(array40k);
		createTable(array40k, "40KMtable");
		createTable(array30k, "30KMtable");
		createTable(array20k, "20KMtable");
		createTable(array10k, "10KMtable");
		createTable(array5k, "5KMtable");
		createTable(array1k, "1KMtable");

	} else if (command === "gain") {
		var array2mil = [];
		var array1mil = [];
		var array500ft = [];
		var array250ft = [];
		var array100ft = [];

		gainArray = Object.values(result);
		gainArray.forEach(object => {
			let elevation = object["lifetimeElevation"];
			if (elevation >= 2000000) {
				array2mil.push(Object.values(object));
			} else if (elevation >= 1000000) {
				array1mil.push(Object.values(object));
			} else if (elevation >= 500000) {
				array500ft.push(Object.values(object));
			} else if (elevation >= 250000) {
				array250ft.push(Object.values(object));
			} else if (elevation >= 100000) {
				array100ft.push(Object.values(object));
			}
		});
		createTable(array2mil, "gain2m");
		createTable(array1mil, "gain1m");
		createTable(array500ft, "gain500k");
		createTable(array250ft, "gain250k");
		createTable(array100ft, "gain100k");

	} else if (command === "points") {
		var array50cent = [];
		var array20cent = [];
		var array10cent = [];
		var array5cent = [];
		var array1cent = [];

		centuryArray = Object.values(result);
		centuryArray.forEach(object => {
			let centuries = object["numberOfCenturies"];
			if (centuries >= 50) {
				array50cent.push(Object.values(object));
			} else if (centuries >= 20) {
				array20cent.push(Object.values(object));
			} else if (centuries >= 10) {
				array10cent.push(Object.values(object));
			} else if (centuries >= 5) {
				array5cent.push(Object.values(object));
			} else if (centuries >= 1) {
				array1cent.push(Object.values(object));
			}
		});
		createTable(array50cent, "50centstable");
		createTable(array20cent, "20centstable");
		createTable(array10cent, "10centstable");
		createTable(array5cent, "5centstable");
		createTable(array1cent, "1centstable");
	}
}

document.addEventListener("DOMContentLoaded", () => {
	getLeaderBoard("distance", "all");
	getLeaderBoard("gain", "all");
	getLeaderBoard("points", "all");
	console.log("localStorge leaderboard.js item = ", localStorage.getItem('id'));
	
});