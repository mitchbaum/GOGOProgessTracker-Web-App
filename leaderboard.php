<?php
function exchangeIds($id) {
    $gercdb2022 = new SQLite3('db/gercdb2022Mar31.db');
    $query = "SELECT stravaID FROM rider WHERE id = '$id'";
    $queryResult = $gercdb2022->querySingle($query, true);
    if (count($queryResult) === 0) {
        return "Incorrect id";
    } else {
        return $queryResult;
    }
}

function leaderBoard($argument, $strava_id) {
    //open a database connection
    $gogoDb = new SQLite3('db/gercstats.db');
    // create query
    // want the rider's name, distance, gain, and points from  gogo table where the rider id matches the id you are providing
    if($argument === "distance"){
        if ($strava_id === "all") {
            $query = "SELECT riderStravaId, riderFirstName, riderLastName, lifetimeDistance FROM individualBests ORDER BY lifetimeDistance DESC";
            $results = $gogoDb->query($query);
            $array = [];
            $i = 0;
            $row = $results->fetchArray(SQLITE3_ASSOC);
            while ($row) {
                $array[$i] = $row;
                $row = $results->fetchArray(SQLITE3_ASSOC);
                $i++;
            }
            return $array;
        } else {
            $query="SELECT lifetimeDistance FROM individualBests WHERE riderStravaId ='$strava_id'";
            $queryResult = $gogoDb->querySingle($query, true);
            error_log(print_r($queryResult, true));
            if (count($queryResult) === 0) {
                $result = "Incorrect id.";
            }else {
                $result = $queryResult;
            }
            return $result;
        }

    } elseif ($argument === "gain") {
        if ($strava_id === "all") {
            $query = "SELECT riderStravaId, riderFirstName, riderLastName, lifetimeElevation FROM individualBests ORDER BY lifetimeElevation DESC";
            $results = $gogoDb->query($query);
            $array = [];
            $i = 0;
            $row = $results->fetchArray(SQLITE3_ASSOC);
            while ($row) {
                $array[$i] = $row;
                $row = $results->fetchArray(SQLITE3_ASSOC);
                $i++;
            }
            return $array;
        } else {
            $query = "SELECT lifetimeElevation FROM individualBests WHERE riderStravaId ='$strava_id'";
            $queryResult = $gogoDb->querySingle($query, true);
            error_log(print_r($queryResult, true));
            if (count($queryResult) === 0) {
                $result = "Incorrect id.";
            } else {
                $result = $queryResult;
            }
            return $result;
        }

    } else if ($argument === "points") {
        if ($strava_id === "all") {
            $query = "SELECT riderStravaId, riderFirstName, riderLastName, numberOfCenturies FROM individualBests ORDER BY numberOfCenturies DESC";
            $results = $gogoDb->query($query);
            $array = [];
            $i = 0;
            $row = $results->fetchArray(SQLITE3_ASSOC);
            while ($row) {
                $array[$i] = $row;
                $row = $results->fetchArray(SQLITE3_ASSOC);
                $i++;
            }
            return $array;
        } else {
        $query = "SELECT numberOfCenturies FROM individualBests WHERE riderStravaId ='$strava_id'";
        $queryResult = $gogoDb->querySingle($query, true);
        error_log(print_r($queryResult, true));
        
            if (count($queryResult) === 0) {
                $result = "Incorrect id.";
            } else {
                $result = $queryResult;
                return $queryResult;
            }
        }
    }
}

if (($_SERVER['REQUEST_METHOD'] === 'GET') && (isset($_GET["id"]))) {
    $id = $_GET["id"];
    error_log("recieved id " . $id . " from client");
    // countGOGODb();

    // exchange gerc id for strava id
    $strava_id = exchangeIds($id);
    //error_log(print_r($strava_id, TRUE));

    $gogo22db = new SQLite3('db/gogo22.db');
    $query = "SELECT gercRiderID, name, points FROM gogo WHERE gercRiderID = '$id'";
    $queryResult = $gogo22db->querySingle($query, true);
    if (count($queryResult) === 0) {
        $result = "incorrect id.";
     } else {
        $result = $queryResult;
     }
     
    error_log($strava_id["stravaId"]);
    $result["strava_id"] = $strava_id["stravaId"];

    //error_log("sending value: " . $result);
    echo json_encode($result);

} else if ((isset($_GET["distance"]))) {
    $strava_id = $_GET["distance"];
    $data=leaderBoard("distance", $strava_id);
    echo json_encode($data);

} else if ((isset($_GET["gain"]))) {
    $strava_id = $_GET["gain"];
    $data=leaderBoard("gain", $strava_id);
    echo json_encode($data);

} else if ((isset($_GET["points"]))) {
    $strava_id = $_GET["points"];
    $data=leaderBoard("points", $strava_id);
    echo json_encode($data);

} else {
    error_log("error recieving id");
    return;
}

function countGOGODb() {
    $gogo22db = new SQLite3('db/gogo22.db');
    $query = "SELECT COUNT(points) FROM gogo";
    $queryResult = $gogo22db->querySingle($query, true);
    error_log(print_r($queryResult, true));
    return $queryResult;

}

function rankGOGODb($id) {
    $gogo22db = new SQLite3('db/gogo22.db');
    $query = "WITH MyTable AS ( SELECT name OVER ( ORDER BY points ) AS 'Point_Rank' FROM gogo ) SELECT Point_Rank, name FROM MyTable WHERE gercRiderID = '25'";
    $queryResult = $gogo22db->query($query);
    error_log(print_r($queryResult, true));


}

?>