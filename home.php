<?php
if (($_SERVER['REQUEST_METHOD'] === 'GET') && (isset($_GET["id"]))) {
    $id = $_GET["id"];
    error_log("recieved id " . $id . " from client");

    // this gets points from gogo22.db
    $gogo22db = new SQLite3('db/gogo22.db');
    $user = "SELECT name FROM gogo WHERE gercRiderID = '$id'";
    $queryResult = $gogo22db->querySingle($user, true);

    if (count($queryResult) === 0) {
        $jsonToSend = json_encode("Incorrect id.");
     } else {
        $riderData = joinTables($id);
        $marchRiderData = getMarchData($id);
        $mayRiderData = getMayData($id);
        $points = "SELECT points FROM gogo WHERE gercRiderID = '$id'";
        $queryResult = $gogo22db->querySingle($points, true);
        $merge = array_merge($riderData, $marchRiderData, $mayRiderData, $queryResult);
        $jsonToSend = json_encode($merge);
     }
    error_log("sending value: " . $jsonToSend);
    echo $jsonToSend;


} else {
    error_log("error recieving id");
    return;
}

function getMayData($id) {
    $gogo22db = new SQLite3('db/gogo22.db');
    $queryGOGO = "SELECT EDIMDUOteam, MayDistance, MayGain, EDIMBasePoints, EDIMBonusPoints FROM gogo WHERE gercRiderID = '$id'";
    $queryResultGOGO = $gogo22db->querySingle($queryGOGO, true);

    // variable for team id
    list('EDIMDUOteam' => $EDIMDUOteam) = $queryResultGOGO;
    error_log(print_r($EDIMDUOteam, true));

    if ($EDIMDUOteam !== 0) {
        // query db for teammate stats in gogo table
        $queryTeammate = "SELECT name AS teammateName, MayDistance AS teammateDistance, MayGain AS teammateDays FROM gogo WHERE gercRiderID != '$id' AND EDIMDUOteam = '$EDIMDUOteam'";
        $queryResultTeammate = $gogo22db->querySingle($queryTeammate, true);
        error_log(print_r($queryResultTeammate, true));

        // query db for team stats from EDIMDUO table
        $queryDays = "SELECT day, distance AS completed FROM EDIMDUO WHERE teamId = '$EDIMDUOteam'";
        $queryResultDays = $gogo22db->query($queryDays);
        $data = array();
        while ($res = $queryResultDays->fetchArray(1)) {
            array_push($data, $res);
        }
        //error_log("queryResult = ". json_encode($data));
        error_log(print_r($data, true));

        $merge = array_merge($queryResultGOGO, $queryResultTeammate, $data);
        return $merge;

    } else {
        // query db for team stats from EDIMDUO table
        $queryDays = "SELECT day, distance AS completed FROM EDIM WHERE gercRiderId = '$id'";
        $queryResultDays = $gogo22db->query($queryDays);
        $data = array();
        while ($res = $queryResultDays->fetchArray(1)) {
            array_push($data, $res);
        }
        //error_log("queryResult = ". json_encode($data));
        error_log(print_r($data, true));
        $merge = array_merge($queryResultGOGO, $data);
        return $merge;

    }

    


}

function getMarchData($id) {
    $gogo22db = new SQLite3('db/gogo22.db');
    $queryGOGO = "SELECT GetGOingPoints, MarchDistance, MarchElevation, MarchDays, MarchNum20, MarchNum1500, MarchPointsHTDay FROM gogo WHERE gercRiderID = '$id'";
    $queryResultGOGO = $gogo22db->querySingle($queryGOGO, true);

    

    return $queryResultGOGO;

}

function joinTables($id) {
    $gogo22db = new SQLite3('db/gogo22.db');
    $gercStatsdb = new SQLite3('db/gercstats.db');
    $gercdb2022Mar31db = new SQLite3('db/gercdb2022Mar31.db');

    $queryGOGO = "SELECT name, gercRiderId, AprilPoints, AprilDistance, AprilGain, AprilDays, AprilNumThirty, AprilGroupQual, AprilEarthDay, AprilWindDay, AprilFireDay, AprilWaterDay FROM gogo WHERE gercRiderID = '$id'";
    $queryResultGOGO = $gogo22db->querySingle($queryGOGO, true);

    $queryGroupDistance = "SELECT infoValue AS GroupGOGODistance FROM gogoAdmin WHERE infoName = 'aprilMileage'";
    $queryResultGroupDistance = $gogo22db->querySingle($queryGroupDistance, true);

    $queryGercdb2022Mar31db = "SELECT stravaId FROM rider WHERE id = '$id'";
    $queryResultGercdb2022Mar31db = $gercdb2022Mar31db->querySingle($queryGercdb2022Mar31db, true);
    $queryGercdb2022Mar31db = "SELECT stravaId FROM rider WHERE id = '$id'";
    $queryResultGercdb2022Mar31db = $gercdb2022Mar31db->querySingle($queryGercdb2022Mar31db, true);

    list('stravaId' => $stravaId) = $queryResultGercdb2022Mar31db;

    $queryGercStatsdb = "SELECT lifeTimeDistance, ldRank, lifetimeElevation, lgRank, numberOfCenturies FROM individualBests WHERE riderStravaId = '$stravaId'";
    $queryResultGercStatsdb = $gercStatsdb->querySingle($queryGercStatsdb, true);


    $queryGercStatsdbCOUNT = "SELECT COUNT(riderStravaId) AS GERCRiderCount FROM individualBests";
    $queryResultGercStatsdbCOUNT = $gercStatsdb->querySingle($queryGercStatsdbCOUNT, true);

    $merge = array_merge($queryResultGOGO, $queryResultGercdb2022Mar31db, $queryResultGercStatsdbCOUNT, $queryResultGercStatsdb, $queryResultGroupDistance, rankRider($id, $stravaId));
    error_log(print_r($merge, true));
    error_log(print_r($stravaId, true));
    return $merge;

}

function rankRider($id, $stravaId) {
    $gogo22db = new SQLite3('db/gogo22.db');
    $gercStatsdb = new SQLite3('db/gercstats.db');
    $gercdb2022Mar31db = new SQLite3('db/gercdb2022Mar31.db');


    $queryRankCenturies = "SELECT COUNT(*)+1 AS centuryRank FROM individualBests WHERE numberOfCenturies > (SELECT numberOfCenturies FROM individualBests WHERE riderStravaId = '$stravaId')";
    $queryResultRankCenturies = $gercStatsdb->querySingle($queryRankCenturies, true);
    
    $queryRankPoints = "SELECT points, COUNT(*)+1 AS pointsRank FROM gogo WHERE points > (SELECT points FROM gogo WHERE gercRiderID = '$id')";
    $queryResultRankPoints = $gogo22db->querySingle($queryRankPoints, true);

    $queryCountGOGORiders = "SELECT COUNT(*) AS GOGORiderCount FROM gogo";
    $queryResultCountGOGORiders = $gogo22db->querySingle($queryCountGOGORiders, true);

    $merge = array_merge($queryResultRankCenturies, $queryResultRankPoints, $queryResultCountGOGORiders);

    return $merge;


}





?>