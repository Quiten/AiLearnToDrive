function nextGeneration () {
    calculateFitness();

    cars[0] = new car (pastBest());
    for (let i = 1; i < total; i++){
        cars[i] = newGen();
    }
    generation += 1;
    savedCars = [];
}

function newGen(){
    // let index = 0;
    // let r = random(1);
    // while (r > 0){
    //     r = r - savedCars[index].score;
    //     index++;
    // }
    // index--;

    // let chosen = savedCars[index];
    let chosen = savedCars[bestCarFitness()];
    let newCar = new car(chosen.brain);
    newCar.mutate(.1);
    return newCar;
}

function bestCarFitness () {
    let fitnessTemp = savedCars[0].fitness;
    let carTemp = 0;
    for (let i = 1; i < savedCars.length; i++){
        if (savedCars[i].fitness >= fitnessTemp){
            fitnessTemp = savedCars[i].fitness;
            carTemp = i;
        }
    }
    return carTemp;
}

function calculateFitness(){
    for (let car of savedCars){
        car.score = (car.fitness / total);
    }
}

function pastBest () {
    let pastCar = savedCars[bestCarFitness()];
    return pastCar.brain;
}