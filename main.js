
document.addEventListener("DOMContentLoaded", () => {


    var datesMissing = []; 
    var daysFilledCount = 0;

    var awardsCount = 0;
    var awardsArray = [];
    var emojiCount = 0;
    var distanceCount = 0;
    var elevationCount = 0;
    var bikeCount = 0;
    var sunCount = 0;
    var globeCount = 0;
    var earthCount = 0;
    var fireCount = 0;
    var windCount = 0;
    var waterCount = 0;

    var marchChallengeCount = 0;


    const keys = document.querySelectorAll("#login-button");

    var storedId = localStorage.getItem('id');
    console.log("storedId ddd= ", storedId);
    if (storedId !== "" && storedId !== null) {
        login(storedId, "loginBtn");
    } 

    /*variables from goals page*/
    /*check console and you'll see the values*/
    var goalContainer = document.getElementById("goals-button-container");

    
    var Cgoal = localStorage.getItem("info");
    if (Cgoal !== null) {
        var cGoal = '<p class="legend">' + Cgoal + '</p> <progress value="0" max="100"></progress>  <span class="goal-rank">0/100 miles</span></br>';
        goalContainer.insertAdjacentHTML('afterend', cGoal);
        console.log(Cgoal);
    }

    
    
    var SMG1 = localStorage.getItem("SMG1");
    if (SMG1 !== null) {
        var smg1Goal = '<p class="legend">' + SMG1 + '</p> <progress value="20" max="100"></progress>  <span class="goal-rank">20/100 miles</span></br>';
        goalContainer.insertAdjacentHTML('afterend', smg1Goal);
        console.log(SMG1);
    }
    var SMG2 = localStorage.getItem("SMG2");
    if (SMG2 !== null) {
        var smg2Goal = '<p class="legend">' + SMG2 + '</p> <progress value="50" max="100"></progress>  <span class="goal-rank">1,250/2,500 feet</span></br>';
        goalContainer.insertAdjacentHTML('afterend', smg2Goal);
        console.log(SMG2);

    }
    var SMG3 = localStorage.getItem("SMG3");
    if (SMG3 !== null) {
        var smg3Goal = '<p class="legend">' + SMG3 + '</p> <progress value="0" max="100"></progress>  <span class="goal-rank">30 miles</span></br>';
        goalContainer.insertAdjacentHTML('afterend', smg3Goal);
        console.log(SMG3);

    }
    var SMG4 = localStorage.getItem("SMG4");
    if (SMG4 !== null) {
        var smg4Goal = '<p class="legend">' + SMG4 + '</p> <progress value="70" max="100"></progress>  <span class="goal-rank">7/10 days</span></br>';
        goalContainer.insertAdjacentHTML('afterend', smg4Goal);
        console.log(SMG4);
    }
    
    var SMG5 = localStorage.getItem("SMG5");
    if (SMG5 !== null) {
        var smg5Goal = '<p class="legend">' + SMG5 + '</p> <progress value="0" max="100"></progress>  <span class="goal-rank">0/24.9 miles</span></br>';
        goalContainer.insertAdjacentHTML('afterend', smg5Goal);
        console.log(SMG5);
    }
    


    //login("25", "loginBtn");

    var climbing_button=document.getElementById("elevation-button");
    climbing_button.addEventListener("click",()=>{
        location.href="leaderboard.html#2MFeet";
    });
    var distance_button=document.getElementById("distance-button");
    distance_button.addEventListener("click",()=>{
        location.href="leaderboard.html#40KMiles"
    });
    var centuries_button=document.getElementById("century-button");
    centuries_button.addEventListener("click",()=>{
        location.href="leaderboard.html#50cents"
    });
    

    for (let i = 0; i < keys.length; i++) {
		keys[i].onclick = (event) => {
            const keyValue = event.target.textContent;
            if (keyValue === "Login") {
                var id = document.getElementById("initial-login-input").value;
                verifyLogin(id, "loginBtn");
                return;
            }
            if (keyValue === "Search") {
                var id = document.getElementById("another-login-input").value;
                verifyLogin(id, "anotherLoginBtn");
                return;
            }
			return;
		
		};
	}

    function verifyLogin(id, type) {
        document.getElementById('login-error-message').style.visibility = "hidden";
        document.getElementById('another-error-message').style.visibility = "hidden";

		if (id == "") {
            if (type === "loginBtn") {
                document.getElementById('login-error-message').innerHTML = "Please enter a valid Id. Numbers only.";
                document.getElementById('login-error-message').style.visibility = "visible";
            } else if (type === "anotherLoginBtn") {
                document.getElementById('another-error-message').innerHTML = "Please enter a valid Id. Numbers only.";
                document.getElementById('another-error-message').style.visibility = "visible";
            }
            
			return;
		} else {
            login(id, type);
            return;

        }
    }

    async function login(id, type) {
        console.log("login function id = ", id);
        localStorage.setItem('id', id);
        console.log("localStorge item = ", localStorage.getItem('id'));
        let myResponse = await fetch("home.php?id=" + id);
		let result = await myResponse.json();
        console.log("Recieved from server ", result);
        if (result === "Incorrect id.") {
            if (type === "loginBtn") {
                document.getElementById('login-error-message').innerHTML = "User not found.";
                document.getElementById('login-error-message').style.visibility = "visible";
            } else if (type === "anotherLoginBtn") {
                document.getElementById('another-error-message').innerHTML = "User not found.";
                document.getElementById('another-error-message').style.visibility = "visible";
            }

        } else { 
            // split name to get first and last name
            let name = result.name;
            localStorage.setItem("strava_id", result.stravaId);
            console.log("localStorge strava_id item = ", localStorage.getItem('strava_id'));
            console.log(name);
            const splitName = name.split(" ");
            let firstName = splitName[0];
            document.getElementById('profile-login-name').innerHTML = "Hello, " + firstName;
            challengeEmojis(result.AprilDistance, result.AprilGain, result.AprilDays, result.AprilNumThirty, result.AprilGroupQual);
            emojiDays(result.AprilEarthDay, result.AprilFireDay, result.AprilWindDay, result.AprilWaterDay);
            if (result.EDIMDUOteam !== 0) {
                popDUOMayData(result.name, result.EDIMBasePoints, result.EDIMBonusPoints, result.EDIMDUOteam, result.MayDistance, result.MayGain, result.teammateDays, result.teammateName, result.teammateDistance);
                mayCalendarEmojis(result);
            } else {
                popIndividualMayData(result.name, result.EDIMBasePoints, result.EDIMBonusPoints, result.MayDistance, result.MayGain);
                mayCalendarEmojis(result);
            }
            
            popMarchData(result.GetGOingPoints, result.MarchDays, result.MarchDistance, result.MarchElevation, result.MarchNum20, result.MarchNum1500, result.MarchPointsHTDay);

            if (id === "25") {
                document.getElementById('profile-picture').src = "https://dgalywyr863hv.cloudfront.net/pictures/athletes/2521816/1435496/2/large.jpg";
            } else {
                document.getElementById('profile-picture').src = "account-icon.png";
            }



            if (result.ldRank === 1) {
                document.getElementById('distance-legend').style.color = "orange";
                document.getElementById('distance-fieldset').style.border = "2px solid orange";

            } else {
                document.getElementById('distance-legend').style.color = "black";
                document.getElementById('distance-fieldset').style.border = "";
            }
            if (result.lgRank === 1) {
                document.getElementById('elevation-legend').style.color = "orange";
                document.getElementById('elevation-fieldset').style.border = "2px solid orange";
            } else {
                document.getElementById('elevation-legend').style.color = "black";
                document.getElementById('elevation-fieldset').style.border = "";
            }
            if (result.centuryRank === 1) {
                document.getElementById('century-legend').style.color = "orange";
                document.getElementById('century-fieldset').style.border = "2px solid orange";
            } else {
                document.getElementById('century-legend').style.color = "black";
                document.getElementById('century-fieldset').style.border = "";
            }
            if (result.pointsRank === 1) {
                document.getElementById('points-legend').style.color = "orange";
                document.getElementById('points-fieldset').style.border = "2px solid orange";
            } else {
                document.getElementById('points-legend').style.color = "black";
                document.getElementById('points-fieldset').style.border = "";
            }
            

            
            if (result.lifetimeDistance >= 40000) {
                document.getElementById('distance-club-label').innerHTML = "40,000 miles club";
            } else if (result.lifetimeDistance >= 30000) {
                document.getElementById('distance-club-label').innerHTML = "30,000 miles club";
            } else if (result.lifetimeDistance >= 20000) {
                document.getElementById('distance-club-label').innerHTML = "20,000 miles club";
            } else if (result.lifetimeDistance >= 10000) {
                document.getElementById('distance-club-label').innerHTML = "10,000 miles club";
            } else if (result.lifetimeDistance >= 5000) {
                document.getElementById('distance-club-label').innerHTML = "5,000 miles club";
            } else if (result.lifetimeDistance >= 1000) {
                document.getElementById('distance-club-label').innerHTML = "1,000 miles club";
            } else {
                document.getElementById('distance-club-label').innerHTML = "<1,000 miles club";
            }

            if (result.lifetimeElevation >= 2000000) {
                document.getElementById('elevation-club-label').innerHTML = "2 million feet club";
            } else if (result.lifetimeElevation >= 1000000) {
                document.getElementById('elevation-club-label').innerHTML = "1 million feet club";
            } else if (result.lifetimeElevation >= 500000) {
                document.getElementById('elevation-club-label').innerHTML = "500,000 feet club";
            } else if (result.lifetimeElevation >= 250000) {
                document.getElementById('elevation-club-label').innerHTML = "250,000 feet club";
            } else if (result.lifetimeElevation >= 100000) {
                document.getElementById('elevation-club-label').innerHTML = "100,000 feet club";
            } else {
                document.getElementById('elevation-club-label').innerHTML = "<100,000 feet club";
            }

            if (result.numberOfCenturies >= 50) {
                document.getElementById('centuries-club-label').innerHTML = "50 centuries club";
            } else if (result.numberOfCenturies >= 20) {
                document.getElementById('centuries-club-label').innerHTML = "20 centuries club";
            } else if (result.numberOfCenturies >= 10) {
                document.getElementById('centuries-club-label').innerHTML = "10 centuries club";
            } else if (result.numberOfCenturies >= 5) {
                document.getElementById('centuries-club-label').innerHTML = "5 centuries club";
            } else if (result.numberOfCenturies >= 1) {
                document.getElementById('centuries-club-label').innerHTML = "1 century club";
            } else {
                document.getElementById('centuries-club-label').innerHTML = "No centuries";
                document.getElementById('centuries-rank').innerHTML = "";
            }




            //document.getElementById('profile-content').style.visibility = "visible";
            document.getElementById('profile-content').style.display = "block";
            document.getElementById('page-content').style.visibility = "visible";
            document.getElementById('page-content').style.display = "block";
            document.getElementById('login-section').style.display = "none";
            document.getElementById('profile-info').innerHTML = "Id Number: " + result.gercRiderID;
            document.getElementById('name').innerHTML = result.name;
            document.getElementById('logo').scrollIntoView();
            document.getElementById('month-group-distance').innerHTML = numberWithCommas(result.GroupGOGODistance) + " mi";
            document.getElementById('month-distance').innerHTML = numberWithCommas(result.AprilDistance) + " mi";
            document.getElementById('month-elevation').innerHTML = numberWithCommas(result.AprilGain) + " ft";
            document.getElementById('month-points').innerHTML = result.AprilPoints;           
            document.getElementById('lifetime-distance').innerHTML = numberWithCommas(Math.trunc(result.lifetimeDistance)) + " mi";
            document.getElementById('distance-rank').innerHTML = " - Top " + Math.trunc((result.ldRank/result.GERCRiderCount) * 100) + "% - Rank " + result.ldRank + "/" + result.GERCRiderCount;
            document.getElementById('lifetime-elevation').innerHTML = numberWithCommas(Math.trunc(result.lifetimeElevation)) + " ft";
            document.getElementById('elevation-rank').innerHTML = " - Top " + Math.trunc((result.lgRank/result.GERCRiderCount) * 100) + "% - Rank " + result.lgRank + "/" + result.GERCRiderCount;
            document.getElementById('centuries').innerHTML = result.numberOfCenturies + " Centuries";
            
            if (result.numberOfCenturies !== 0 ){
                document.getElementById('centuries-rank').innerHTML = " - Top " + Math.trunc((result.centuryRank/result.GOGORiderCount) * 100) + "% - Rank " + result.centuryRank + "/" + result.GERCRiderCount;
            }
            
            document.getElementById('points').innerHTML = result.points + " Points";
            document.getElementById('points-rank').innerHTML = "Top " + Math.trunc((result.pointsRank/result.GOGORiderCount) * 100) + "% - Rank " + result.pointsRank + "/" + result.GOGORiderCount;

            const distanceRank = Math.trunc((result.ldRank/result.GERCRiderCount) * 100);
            const elevationRank = Math.trunc((result.lgRank/result.GERCRiderCount) * 100);
            const centuryRank = Math.trunc((result.centuryRank/result.GOGORiderCount) * 100);
            const pointsRank = Math.trunc((result.pointsRank/result.GOGORiderCount) * 100);
            if (distanceRank < 1) {
                document.getElementById('distance-rank').innerHTML = " - Top <1% - Rank " + result.ldRank + "/" + result.GERCRiderCount;
            }
            if (elevationRank < 1) {
                document.getElementById('elevation-rank').innerHTML = " - Top <1% - Rank " + result.lgRank + "/" + result.GERCRiderCount;
            }
            if (centuryRank < 1) {
                document.getElementById('centuries-rank').innerHTML = " - Top <1% - Rank " + result.centuryRank + "/" + result.GOGORiderCount;
            }
            if (pointsRank < 1) {
                document.getElementById('points-rank').innerHTML = "Top <1% - Rank " + result.pointsRank + "/" + result.GOGORiderCount;
            }
            
        }                                                              
        return;
    }

    function mayCalendarEmojis(result) {
        // populate calendar with emojis
        if (daysFilledCount !== 0) {
            for (let i=0; i<daysFilledCount; i++ ) {
                console.log("for loop datesMissing[i] = ",datesMissing[i]);
                var element = document.getElementById("calendarEmojiElement");
                element.remove();
                document.getElementById(datesMissing[i]).innerHTML= datesMissing[i];
            }
        }
        daysFilledCount = 0;
        datesMissing = [];
        for (let i=0; i<31; i++ ) {
            if (result[i].completed !== 0) {
                var image = new Image();
                image.id = "calendarEmojiElement";
                image.className = "emoji emojis-may";
                image.alt = "✅";
                image.src = "https://s.w.org/images/core/emoji/11/svg/2705.svg";
                document.getElementById(result[i].day).innerHTML= "";
                document.getElementById(result[i].day).appendChild(image);
                datesMissing.push(result[i].day);
                daysFilledCount += 1;
            }

        }


        const calendarPoints = daysFilledCount * 5;
        document.getElementById('calendar-days-filled').innerHTML = calendarPoints;

    }

    function challengeEmojis(distance, elevation, numRideDays, thirtyMileDay, globe) {
        //console.log(distance, elevation, numRideDays, thirtyMileDay, globe);
        const emojiChallengeArray = [];


        if (distance !== 0 || distanceCount !== 0) {
            var distanceDays = Math.floor(distance / 100);
            if (distanceCount !== 0) {
                for (let i=0; i<distanceCount; i++ ) {
                    var element = document.getElementById("distanceEmojiElement");
                    element.remove();
                }
            }
            for (let i=0; i<distanceDays; i++ ) {
                var image = new Image();
                image.id = "distanceEmojiElement" 
                image.className = "emoji emojis-earned"
                image.src = "https://s.w.org/images/core/emoji/11/svg/1f6e3.svg"
                document.getElementById("distance").appendChild(image); 
                emojiChallengeArray.push("🛣");
                emojiChallengeArray.push("https://s.w.org/images/core/emoji/11/svg/1f6e3.svg");

            }
            document.getElementById('distance-points').innerHTML = distanceDays * 20;
            distanceCount = distanceDays;
            if (distanceDays >= 1){
                emojiCount += 1;
            }
        }

        if (elevation !== 0 || elevationCount !== 0) {
            var elevationDays = Math.floor(elevation / 2500);
            if (elevationCount !== 0) {
                for (let i=0; i<elevationCount; i++ ) {
                    var element = document.getElementById("elevationEmojiElement");
                    element.remove();
                }
            }
            for (let i=0; i<elevationDays; i++ ) {
                var image = new Image();
                image.id = "elevationEmojiElement" 
                image.className = "emoji emojis-earned"
                image.src = "https://s.w.org/images/core/emoji/11/svg/26f0.svg"
                document.getElementById("elevation").appendChild(image); 
                emojiChallengeArray.push("⛰");
                emojiChallengeArray.push("https://s.w.org/images/core/emoji/11/svg/26f0.svg");

            }
            document.getElementById('elevation-points').innerHTML = elevationDays * 10;
            elevationCount = elevationDays;
            if (elevationDays >= 1){
                emojiCount += 1;
            }
        }

        if (thirtyMileDay !== 0 || bikeCount !== 0) {
            if (bikeCount !== 0) {
                for (let i=0; i<bikeCount; i++ ) {
                    var element = document.getElementById("bikeEmojiElement");
                    element.remove();
                }
            }
            for (let i=0; i<thirtyMileDay; i++ ) {
                var image = new Image();
                image.id = "bikeEmojiElement" 
                image.className = "emoji emojis-earned"
                image.src = "https://s.w.org/images/core/emoji/11/svg/1f6b4.svg"
                document.getElementById("bike").appendChild(image); 
                emojiChallengeArray.push("🚴");
                emojiChallengeArray.push("https://s.w.org/images/core/emoji/11/svg/1f6b4.svg");

            }
            document.getElementById('bike-points').innerHTML = thirtyMileDay * 10;
            bikeCount = thirtyMileDay;
            if (thirtyMileDay >= 1){
                emojiCount += 1;
            }
        } 

        if (numRideDays !== 0 || sunCount !== 0) {
            var sunDays = Math.floor(numRideDays / 10);
            if (sunCount !== 0) {
                for (let i=0; i<sunCount; i++ ) {
                    var element = document.getElementById("sunEmojiElement");
                    element.remove();
                }
            }
            for (let i=0; i<sunDays; i++ ) {
                var image = new Image();
                image.id = "sunEmojiElement" 
                image.className = "emoji emojis-earned"
                image.src = "https://s.w.org/images/core/emoji/11/svg/2600.svg"
                document.getElementById("sun").appendChild(image); 
                emojiChallengeArray.push("☀");
                emojiChallengeArray.push("https://s.w.org/images/core/emoji/11/svg/2600.svg");

            }
            document.getElementById('sun-points').innerHTML = sunDays * 10;
            sunCount = sunDays;
            if (sunDays >= 1){
                emojiCount += 1;
            }
        }
        
        if (globeCount === 1) {
            var element = document.getElementById("globeEmojiElement");
            element.remove();
            globeCount = 0;
        }
        if (distance >= 24.9) {
            var image = new Image();
            image.id = "globeEmojiElement" 
            image.className = "emoji emojis-earned"
            image.src = "https://s.w.org/images/core/emoji/11/svg/1f310.svg"
            document.getElementById("globe").appendChild(image); 
            emojiChallengeArray.unshift("https://s.w.org/images/core/emoji/11/svg/1f310.svg");
            emojiChallengeArray.unshift("🌐");
            
            globeCount = 1;
            emojiCount += 1;
        }

        awardsArray = emojiChallengeArray;

    }


    function emojiDays(earthDays, fireDays, windDays, waterDays) {
        const emojiDaysArray = [];

        // earthDays
        if (earthCount !== 0) {
            var element = document.getElementById("earthEmojiElement");
            element.remove();
            document.getElementById('earth-points').innerHTML = "0";
            earthCount = 0;
        } else {
            document.getElementById('earth-points').innerHTML = "0";
        }

        if (earthDays !== 0) {
            for (let i=0; i<earthCount; i++ ) {
                var element = document.getElementById("earthEmojiElement");
                element.remove();
            }
            var image = new Image();
            image.id = "earthEmojiElement" 
            image.className = "emoji emojis-earned"
            image.src = "https://s.w.org/images/core/emoji/11/svg/1f30e.svg"
            document.getElementById("earth").appendChild(image); 
            document.getElementById('earth-points').innerHTML = "5";

            emojiDaysArray.push("🌎");
            emojiDaysArray.push("https://s.w.org/images/core/emoji/11/svg/1f30e.svg");
            earthCount = earthDays;
            emojiCount += 1;
        } 
        

        // windDays
        if (windCount !== 0) {
            var element = document.getElementById("windEmojiElement");
            element.remove();
            document.getElementById('wind-points').innerHTML = "0";
            windCount = 0;
        } else {
            document.getElementById('wind-points').innerHTML = "0";
        }

        if (windDays !== 0) {
            for (let i=0; i<windCount; i++ ) {
                var element = document.getElementById("windEmojiElement");
                element.remove();
            }
            var image = new Image();
            image.id = "windEmojiElement" 
            image.className = "emoji emojis-earned"
            image.src = "https://s.w.org/images/core/emoji/11/svg/1f32c.svg"
            document.getElementById("wind").appendChild(image); 
            document.getElementById('wind-points').innerHTML = "5";
            emojiDaysArray.push("🌬");
            emojiDaysArray.push("https://s.w.org/images/core/emoji/11/svg/1f32c.svg");
            windCount = windDays;
            emojiCount += 1;
        }
        

        // fireDays

        if (fireCount !== 0) {
            var element = document.getElementById("fireEmojiElement");
            element.remove();
            document.getElementById('fire-points').innerHTML = "0";
            fireCount = 0;
        } else {
            document.getElementById('fire-points').innerHTML = "0";
        }

        if (fireDays !== 0) {
            for (let i=0; i<fireCount; i++ ) {
                var element = document.getElementById("fireEmojiElement");
                element.remove();
            }
            var image = new Image();
            image.id = "fireEmojiElement" 
            image.className = "emoji emojis-earned"
            image.src = "https://s.w.org/images/core/emoji/11/svg/1f525.svg"
            document.getElementById("fire").appendChild(image); 
            document.getElementById('fire-points').innerHTML = "5";

            emojiDaysArray.push("🔥");
            emojiDaysArray.push("https://s.w.org/images/core/emoji/11/svg/1f525.svg");
            fireCount = fireDays;
            emojiCount += 1;
        }

        // waterDays
        if (waterCount !== 0) {
            var element = document.getElementById("waterEmojiElement");
            element.remove();
            document.getElementById('water-points').innerHTML = "0";
            waterCount = 0;
        } else {
            document.getElementById('water-points').innerHTML = "0";
        }
        if (waterDays !== 0) {
            for (let i=0; i<waterCount; i++ ) {
                var element = document.getElementById("waterEmojiElement");
                element.remove();
            }
            var image = new Image();
            image.id = "waterEmojiElement" 
            image.className = "emoji emojis-earned"
            image.src = "https://s.w.org/images/core/emoji/11/svg/1f30a.svg"
            document.getElementById("water").appendChild(image); 
            document.getElementById('water-points').innerHTML = "5";

            emojiDaysArray.push("🌊");
            emojiDaysArray.push("https://s.w.org/images/core/emoji/11/svg/1f30a.svg");
            waterCount = waterDays;
            emojiCount += 1;
        }
        

        for (let i=0; i<emojiDaysArray.length; i++ ) {
            awardsArray.push(emojiDaysArray[i]);

        }
        //console.log("emojiCount = ", emojiCount);
        if (emojiCount === 9) {
            document.getElementById('month-points').style.color = "orange";
            awardsArray.unshift("https://s.w.org/images/core/emoji/11/svg/1f3c6.svg");
            awardsArray.unshift("🏆");
            emojiCount = 0;
        } else {
            document.getElementById('month-points').style.color = "black";
            emojiCount = 0;
        }
        popMyAwards(awardsArray);
        
    }

    function popMyAwards(awards) {
        //console.log("awardsArray = ", awardsArray);
        for (let i=0; i<awardsCount; i++ ) {
            var element = document.getElementById("awardEmojiElement");
            element.remove();
            console.log('removed');
        }
        for (let i=1; i<awards.length; i+=2 ) {
            var image = new Image();
            image.id = "awardEmojiElement" 
            image.className = "emoji"
            image.src = awards[i];
            document.getElementById("my-awards").appendChild(image);

        }
        awardsCount = awards.length/2;

    }

    document.getElementById("april-archive-button").onclick = function() {aprilArchive()};

    function aprilArchive() {
        console.log("april archive button clicked");

    }

    function popDUOMayData(name, EDIMBasePoints, EDIMBonusPoints, EDIMDUOteam, MayDistance, MayGain, teammateDays, teammateName, teammateDistance) {
        // console.log("team points = ", EDIMBasePoints);
        // console.log("bonus points = ", EDIMBonusPoints);
        // console.log("DUO team id = ", EDIMDUOteam);
        // console.log("my individual distance = ", MayDistance); // MayDistance is individual distance
        // console.log("days rode in May more than a mile = ", MayGain); // MayGain is number of days in may rider rode more than 1 mile
        // console.log("teammate name = ", teammateName);
        // console.log("teammate distance = ", teammateDistance);
        // console.log("teammate days rode in May more than a mile = ", teammateDays);

        document.getElementById('may-challenge-label').innerHTML = "DUO Challenge Participant";

        if (MayDistance >= 25) {
            document.getElementById('may-eligibility').innerHTML = "Eligible for points";
            document.getElementById('may-eligibility').style.color = "green";
        } else {
            document.getElementById('may-eligibility').innerHTML = "Not eligible for points (25 miles required)";
            document.getElementById('may-eligibility').style.color = "red";
        }

        document.getElementById('teammate-label').innerHTML = "Teammate";
        document.getElementById('may-name').innerHTML = name;
        document.getElementById('may-distance').innerHTML = numberWithCommas(MayDistance) + " mi";
        document.getElementById('may-days').innerHTML = MayGain;

        document.getElementById('may-teammate-name').innerHTML = teammateName;
        document.getElementById('may-teammate-distance').innerHTML = numberWithCommas(teammateDistance) + " mi";
        document.getElementById('may-teammate-days').innerHTML = teammateDays;

        document.getElementById('may-team-points-label').innerHTML = "Team Points";
        document.getElementById('may-team-points').innerHTML = EDIMBasePoints;
        document.getElementById('may-team-points-max').innerHTML = "/165";
        document.getElementById('may-my-points').innerHTML = EDIMBonusPoints + EDIMBasePoints;

        document.getElementById('participate-in-duo').innerHTML = "5";



        if (EDIMBasePoints === 165) {
            document.getElementById('complete-calendar').innerHTML = "10";
            document.getElementById('may-my-points').style.color = "orange";
        } else {
            document.getElementById('complete-calendar').innerHTML = "0";
            document.getElementById('may-my-points').style.color = "black";
        }

        if (MayGain >= 31) {
            if (MayDistance >= 496) {
                document.getElementById('edim-bonus').innerHTML = "40";
            } else if (MayDistance >= 248) {
                document.getElementById('edim-bonus').innerHTML = "25";
            } else if (MayDistance >= 62) {
                document.getElementById('edim-bonus').innerHTML = "10";
            }
        } else {
            document.getElementById('edim-bonus').innerHTML = "0";
        }

        


    }

    function popIndividualMayData(name, EDIMBasePoints, EDIMBonusPoints, MayDistance, MayGain) {
        // console.log("team points = ", EDIMBasePoints);
        // console.log("bonus points = ", EDIMBonusPoints);
        console.log("my individual distance = ", MayDistance); // MayDistance is individual distance
        console.log("days rode in May more than a mile = ", MayGain); // MayGain is number of days in may rider rode more than 1 mile

        document.getElementById('may-challenge-label').innerHTML = "Individual Challenge Participant";

        if (MayDistance >= 25) {
            document.getElementById('may-eligibility').innerHTML = "Eligible for points";
            document.getElementById('may-eligibility').style.color = "green";
        } else {
            document.getElementById('may-eligibility').innerHTML = "Not eligible for points (25 miles required)";
            document.getElementById('may-eligibility').style.color = "red";
        }

        document.getElementById('may-name').innerHTML = name;
        document.getElementById('teammate-label').innerHTML = "Name";
        document.getElementById('may-distance').innerHTML = numberWithCommas(MayDistance) + " mi";
        document.getElementById('may-days').innerHTML = MayGain;

        document.getElementById('may-teammate-name').innerHTML = "";
        document.getElementById('may-teammate-distance').innerHTML = "";
        document.getElementById('may-teammate-days').innerHTML = "";


        document.getElementById('may-team-points-label').innerHTML = "";
        document.getElementById('may-team-points').innerHTML = "";
        document.getElementById('may-team-points-max').innerHTML = "";
        document.getElementById('may-my-points').innerHTML = EDIMBonusPoints + EDIMBasePoints;

        document.getElementById('participate-in-duo').innerHTML = "0";


        if (EDIMBasePoints === 165) {
            document.getElementById('complete-calendar').innerHTML = "10";
        } else {
            document.getElementById('complete-calendar').innerHTML = "0";
        }

        if (MayGain >= 31) {
            if (MayDistance >= 496) {
                document.getElementById('edim-bonus').innerHTML = "40";
            } else if (MayDistance >= 248) {
                document.getElementById('edim-bonus').innerHTML = "25";
            } else if (MayDistance >= 62) {
                document.getElementById('edim-bonus').innerHTML = "10";
            }
        } else {
            document.getElementById('edim-bonus').innerHTML = "0";
        }

    


    }

    function popMarchData(GetGOingPoints, MarchDays, MarchDistance, MarchElevation, MarchNum20, MarchNum1500, MarchPointsHTDay) {
        marchChallengeCount = 0;
        document.getElementById('march-distance').innerHTML = numberWithCommas(MarchDistance) + " mi";
        document.getElementById('march-elevation').innerHTML = numberWithCommas(MarchElevation) + " ft";
        document.getElementById('march-total-points').innerHTML = GetGOingPoints; 
        var rideDays = Math.floor(MarchDays / 5);
        if (rideDays * 5 >= 5) {
            marchChallengeCount += 1;
        }
        document.getElementById('march-days-points').innerHTML = rideDays * 5; 
        var distanceDays = Math.floor(MarchDistance / 25);
        if (distanceDays * 5 >= 5) {
            marchChallengeCount += 1;
        }
        document.getElementById('march-distance-points').innerHTML = distanceDays * 5; 
        var elevationDays = Math.floor(MarchElevation / 1500);
        if (elevationDays * 5 >= 5) {
            marchChallengeCount += 1;
        }
        document.getElementById('march-elevation-gain-points').innerHTML = elevationDays * 5; 
        if (MarchNum20 > 0) {
            marchChallengeCount += 1;
        }
        document.getElementById('march-20ride-points').innerHTML = MarchNum20 * 10; 
        if (MarchNum1500 > 0) {
            marchChallengeCount += 1;
        }
        document.getElementById('march-1500elevation-points').innerHTML = MarchNum1500 * 10; 
        if (MarchPointsHTDay > 0) {
            marchChallengeCount += 1;
            document.getElementById('march-hashtag').innerHTML = "5"; 
        } else {
            document.getElementById('march-hashtag').innerHTML = "0"; 
        }
        if (marchChallengeCount === 6) {
            document.getElementById('march-total-points').style.color = "orange";
        } else {
            document.getElementById('march-total-points').style.color = "black";
        }
    }














    /* ----- website animations/styles ----- */ 


    // accordian section
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
            } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
    }

    /* ---- utilities ----- */

    function numberWithCommas(n) {
        return n.toString().replace(/\B(?!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      }

});