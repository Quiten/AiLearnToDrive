function trackPrep() {
    if (keyIsDown(32)) {
        point = new screenPoint(mouseX, mouseY);
        trackBuild.push(createVector(point.pos.x, point.pos.y));
    }
}

function trackBuilding(){
    walls = [];
    for (let i = 0; i < trackBuild.length; i++){
        if (i != 0 && i != trackBuild.length-1){
            walls.push(new wall(trackBuild[i-1].x, trackBuild[i-1].y, trackBuild[i].x, trackBuild[i].y));
        } else if ((i == (trackBuild.length-1)) && (trackBuild.length > 1)){
            walls.push(new wall(trackBuild[0].x, trackBuild[0].y, trackBuild[i].x, trackBuild[i].y));
        }
    }
}

function wallPush () {
    if (keyIsDown(37)) {
        for (let i = 0; i < (walls.length); i++){
            mainWalls.push(walls[i]);
        }
        trackBuild = [];
    }
}

function makeCheckpoint(){
    if (keyIsDown(39)){
        for (let i = 0; i < walls.length; i++){
            checkpoints.push(walls[i]);
        }
        trackBuild = [];
    }
}

function placeCar () {
    if (keyIsDown(38)){
        total += 1; 
        cars.push(new car());
    }
}

function start(){
    if (keyIsDown(40)){
        for (let i = 0; i < cars.length; i++){
            cars[i].carForward = true;
        }
    }
}

function saveTrack(){
    let jsonFile = JSON.stringify( trackConverter() );
    let nameFile = prompt("Enter track name:", "");
    if (nameFile == "" || nameFile == null) {
        alert("Error #1");
    } else {
        // console.log("saved: " + nameFile + ", " + jsonFile);
        saveJSON(jsonFile, nameFile);
    }
}

function loadTrack(filename){
    // console.log("loaded");
    let fileName = prompt("Enter track name: ", "");
    mainWalls = JSON.parse(fileName);
}

function test(){
    console.log("test");
}

function trackConverter(){
    let convertedTrack = [];
    for (let i = 0; i < mainWalls.length; i++){
        let convWall = new wallJSON(mainWalls[i].a.x, mainWalls[i].a.y, mainWalls[i].b.x, mainWalls[i].b.y);
        convertedTrack.push(convWall);
    }
    return convertedTrack;
}

