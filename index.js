const carsAmount = 500;
let total;

let mainWalls = [];
let walls = [];

let cars = [];
let savedCars = [];
let generation = 1;
let repeat = 1;

let points = [];
let trackBuild = [];

let slider;
let saveButton;
let loadButton;
let raysButton;
var vision = false; 

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('#main');
    saveButton = select('#save');
    loadButton = select('#load');
    raysButton = select('#rays');

    saveButton.mousePressed( saveTrack );
    loadButton.mousePressed( loadTrack );
    raysButton.mousePressed( showRays );

    slider = createSlider(1, 100, 1);

    for (let i = 0; i < carsAmount; i++){
        cars.push(new car (0, 150, 100));
    }
    for (let i = 0; i < carsAmount; i++){
        cars[i].carForward = false;
    }
    generation = 1;
    total = cars.length;

    mainWalls.push(new wall(0, height, 0, 0, 0));
    mainWalls.push(new wall(width, height, width, 0, 0));
    mainWalls.push(new wall(0, 0, width, 0, 0));
    mainWalls.push(new wall(0, height, width, height, 0));
}

function draw() {
    background(220);

    drawing();
    keyBoardFunctions();

    readTrackFile();
    generationViewer(generation);
    carAmountViewer(cars.length);

    for (let point of points){
        trackBuilding();
    }
    wallPush();

    for (let wall of walls){
        wall.showWall();
    }
    for (let wall of mainWalls){
        if (wall.type == 0) {
            wall.showWall();
        } else if (wall.type == 1){
            wall.showCheckpoint();
        }
    }

    for (let r = 0; r < slider.value(); r++){

        for (let j = 0;  j <  cars.length; j++){
            let car = cars[j];
            car.carDie(j);
            car.look(mainWalls); 
            car.think();
            car.rotate();
            car.movement();  
            
            car.typeCollision(car, j);
        }
        if (cars.length === 0){
            nextGeneration();
            resetTimer();
        }
    }
    for (let i = 0; i < cars.length; i++){
        cars[i].showCar();
    }
}
