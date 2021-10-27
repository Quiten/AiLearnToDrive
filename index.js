const carsAmount = 500;
let total;

let mainWalls = [];
let checkpoints = [];
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
var vision = false; 

function setup() {
    let canvas = createCanvas(800, 600);
    canvas.parent('#main');

    slider = createSlider(1, 100, 1);

    saveButton = select('#save');
    loadButton = select('#load');
    raysButton = select('#rays');
    saveButton.mousePressed( saveTrack );
    loadButton.mousePressed( loadTrack );
    raysButton.mousePressed( showRays );

    for (let i = 0; i < carsAmount; i++){
        cars.push(new car (0, 150, 100));
    }
    for (let i = 0; i < carsAmount; i++){
        cars[i].carForward = false;
    }
    generation = 0;
    total = cars.length;

    // mainWalls.push(new wall(100, 100, 700, 100));
    // mainWalls.push(new wall(100, 350, 700, 350));
    // mainWalls.push(new wall(100, 100, 100, 350));
    // mainWalls.push(new wall(700, 100, 700, 350));

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

    // for (let wall of checkpoints){
    //     wall.showCheckpoint();
    // }

    for (let r = 0; r < slider.value(); r++){

        for (let j = 0;  j <  cars.length; j++){
            let car = cars[j];
            car.look(mainWalls); 
            car.think();
            car.rotate();
            car.movement();  

            for (let i = 0; i < mainWalls.length + checkpoints.length; i++){
                if (cars.length > 0){
                    if (i < mainWalls.length){
                        if (car.collision(mainWalls[i]) == true){
                            if (mainWalls[i].type == 0){
                                savedCars.push(car);
                                cars.splice(j, 1);
                            } else if (mainWalls[i].type == 1){
                                car.fitnessPoint();
                            } else {
                                console.log("?!");
                            }
                        }
                    } 
                    // else if (i >= mainWalls.length && i < checkpoints.length){
                    //     if (cars.length > 0){
                    //         if (car.collision(checkpoints[i]) == true){
                    //             car.fitnessPoint();
                    //         }
                    //     }
                    // }
                }
            }
        }
        if (cars.length === 0){
            nextGeneration();
        }
    }
    for (let car of cars){
        car.showCar();
    }
}


