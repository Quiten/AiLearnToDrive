function newGen(){
    let chosen = savedCars[bestCarFitness()];
    let newCar = new car(chosen.brain, chosen.startPos.x, chosen.startPos.y);
    newCar.mutate(.18);
    return newCar;
}

function bestCarFitness(){
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

function vorigeBest(){
    let pastCar = savedCars[bestCarFitness()];
    return pastCar.brain;
}

function nextGeneration() {
    for (let i = 0; i < total; i++){
        cars[i] = newGen();
    }
    cars[total - 1] = new car(vorigeBest(), savedCars[bestCarFitness()].startPos.x, savedCars[bestCarFitness()].startPos.y);
    cars[total - 1].color = color(255, 100, 0);
    generation += 1;
    savedCars = [];
}
