function keyBoardFunctions(){
    trackPrep();
    wallPush();
    makeCheckpoint();
    placeCar();
    undoButton();
    deleteWalls();
    start();
    changeStartPosition();
}

function trackBuilding(){
    walls = [];
    for (let i = 0; i < trackBuild.length; i++){
        if (i != 0 && i != trackBuild.length-1){
            walls.push(new wall(trackBuild[i-1].x, trackBuild[i-1].y, trackBuild[i].x, trackBuild[i].y, 0));
        } else if ((i == (trackBuild.length-1)) && (trackBuild.length > 1)){
            walls.push(new wall(trackBuild[0].x, trackBuild[0].y, trackBuild[i].x, trackBuild[i].y, 0));
        }
    }
}

function trackPrep(point) {
    // spacebar
    if (keyIsDown(32)) {
        point = new screenPoint(mouseX, mouseY);
        trackBuild.push(createVector(point.pos.x, point.pos.y));
    }
}

function wallPush () {
    // q
    if (keyIsDown(81)) {
        for (let i = 0; i < (walls.length); i++){
            walls[i].type = 0;
            mainWalls.push(walls[i]);
        }
        trackBuild = [];
    }
}

function makeCheckpoint(){
    // w
    if (keyIsDown(87)){
        for (let i = 0; i < walls.length; i++){
            walls[i].type = 1;
            mainWalls.push(walls[i]);
        }
        trackBuild = [];
    }
}

function placeCar () {
    // r 
    if (keyIsDown(82)){
        total += 1; 
        cars.push(new car(0, mouseX, mouseY));
    }
}

function start(){
    // e 
    if (keyIsDown(69)){
        startTimer();
        for (let i = 0; i < cars.length; i++){
            cars[i].carForward = true;
        }
    }
}

function changeStartPosition(){
    // a 
    if (keyIsDown(65)){
        for (let i = 0; i < cars.length; i++){
            cars[i].pos.x = mouseX;
            cars[i].pos.y = mouseY;
            cars[i].startPos.x = mouseX;
            cars[i].startPos.y = mouseY;
        }
    }
}

function deleteWalls(){
    // s
    if (keyIsDown(83)){
        ellipse(mouseX, mouseY, 10);
    }
}

function undoButton(){
    // z 
    if (keyIsDown(90)){
        if (walls.length > 0){
            console.log(walls.length);
            walls.splice(walls.length, 1);
        }
    }
}

function showRays () {
    if (vision == false){
        vision = true;
        document.getElementById('rays').textContent = "Hide Rays";
    } else {
        vision = false;
        document.getElementById('rays').textContent = "Show Rays";
    }
}

function saveTrack(mainWalls){
    let jsonFile = JSON.stringify( trackConverter() );
    let nameFile = prompt("Enter track name:", "");
    if (nameFile == "" || nameFile == null) {
        alert("Error #1");
    } else {
        saveJSON(jsonFile, nameFile);
    }
}

function loadTrack(){
    console.log("loading");
    const jsonFile = readTrackFile();
    const ConvMainWalls = JSON.parse(jsonFile);
    const wallParse= JSON.parse(ConvMainWalls);
    mainWalls = trackConverterArray(wallParse);

}

function readTrackFile(){
    document.getElementById('inputfile').addEventListener('change', function() {
        var fr=new FileReader();
        fr.onload=function(){
            document.getElementById('output').textContent=fr.result;
        }
        fr.readAsText(this.files[0]);
    })
    return document.getElementById('output').textContent;
}

function generationViewer(generation){
    document.getElementById('generationViewer').textContent = "Generation: " + generation;
}

function carAmountViewer(amount){
    document.getElementById('carAmountViewer').textContent = "Cars: " + amount;
}

function trackConverter(){
    let convertedTrack = [];
    let convWall;
    for (let i = 0; i < mainWalls.length; i++){
        convWall = new wallJSON(mainWalls[i].a.x, mainWalls[i].a.y, mainWalls[i].b.x, mainWalls[i].b.y, mainWalls[i].type);
        convertedTrack.push(convWall);
    }
    console.log(convertedTrack);
    return convertedTrack;
}

function trackConverterArray(ConvMainWalls){
    let convertedTrack = [];
    let convWall;
    for (let i = 0; i < ConvMainWalls.length; i++){
        convWall = new wall(ConvMainWalls[i].x1, ConvMainWalls[i].y1, ConvMainWalls[i].x2, ConvMainWalls[i].y2, ConvMainWalls[i].type)
        convertedTrack.push(convWall);
    }
    return convertedTrack;
}

function pastBest(hr, minutes, sec){
    document.getElementById("bestTime").textContent = hr + ":" + minutes + ":" + sec;
}

