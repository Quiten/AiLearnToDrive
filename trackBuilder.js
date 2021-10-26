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
    if (keyIsDown(81)) {
        for (let i = 0; i < (walls.length); i++){
            mainWalls.push(walls[i]);
        }
        trackBuild = [];
    }
}

function makeCheckpoint(){
    if (keyIsDown(87)){
        for (let i = 0; i < walls.length; i++){
            checkpoints.push(walls[i]);
        }
        trackBuild = [];
    }
}

function placeCar () {
    if (keyIsDown(82)){
        total += 1; 
        cars.push(new car());
    }
}

function start(){
    if (keyIsDown(69)){
        for (let i = 0; i < cars.length; i++){
            cars[i].carForward = true;
        }
    }
}

function saveTrack(){
    let jsonFile = JSON.stringify( trackConverter(0, mainWalls) );
    let nameFile = prompt("Enter track name:", "");
    if (nameFile == "" || nameFile == null) {
        alert("Error #1");
    } else {
        // console.log("saved: " + nameFile + ", " + jsonFile);
        saveJSON(jsonFile, nameFile);
    }
}

function loadTrack(){
    console.log("loading");
    const jsonFile = readTrackFile();
    const ConvMainWalls = JSON.parse(jsonFile);
    const wallParse= JSON.parse(ConvMainWalls);
    mainWalls = trackConverter(1, wallParse);

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
    document.getElementById('generationViewer').textContent = generation;
}

function trackConverter(option, ConvMainWalls){
    let convertedTrack = [];
    let convWall;
    if (option = 0){
        for (let i = 0; i < mainWalls.length; i++){
            convWall = new wallJSON(mainWalls[i].a.x, mainWalls[i].a.y, mainWalls[i].b.x, mainWalls[i].b.y);
            convertedTrack.push(convWall);
        }
    } else if (option = 1){
        for (let i = 0; i < ConvMainWalls.length; i++){
            convWall = new wall(ConvMainWalls[i].x1, ConvMainWalls[i].y1, ConvMainWalls[i].x2, ConvMainWalls[i].y2)
            convertedTrack.push(convWall);
        }
    }
    else {
        console.log("error #111")
        return;
    }
    return convertedTrack;
}

