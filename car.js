class car {
    constructor (brain, startX, startY){
        this.startPos = createVector(startX, startY);
        this.pos = createVector(this.startPos.x, this.startPos.y);
        this.width = 20; 
        this.height = 7;
        this.speed = 2;
        this.angle = 0;
        this.heading = 0;
        this.longest = ((this.width / 2) ** 2) + ((this.height / 2) ** 2);
        this.rays = [];
        this.color = 51;
        this.turningRate = .1;

        this.passedCheckpoints = [];
        this.fitness = 1;
        this.countdown = 120;
        this.inputs = [];
        this.carForward = true; 
        this.alive = true;
        this.carTurning;
        this.score;
        
        if (brain){
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(9, 9, 1); 
        }

        for (let a = -80; a < 100; a += 20){
            this.rays.push(new ray(this.pos, radians(a)));
        }
    }
    
    rotate(){
        if (this.carForward == true){
            for (let i = 0; i < this.rays.length; i += 1) {
                this.rays[i].setAngle((radians(i*20) + 80) + this.angle);
            }
        }
    };

    look(walls){
        const scene = [];
        for (let i = 0; i < this.rays.length; i++){
            const ray = this.rays[i];
            let closest = null; 
            let record = Infinity;
            for (let i = 0; i < walls.length; i++){
                    if (walls[i].type == 0){
                    const pt = ray.cast(walls[i]);
                    if (pt){
                        const distance = p5.Vector.dist(this.pos, pt);
                        if (distance < record){
                            record = distance; 
                            closest = pt;
                        }
                    }
                }
            }
            if (closest) {
                this.inputs[i] = dist(this.pos.x, this.pos.y, closest.x, closest.y);
                if (vision == true) {
                    line(this.pos.x, this.pos.y, closest.x, closest.y);
                    ellipse(closest.x, closest.y, 8, 8);
                }
            }
            else {
                this.inputs[i] = 0;
            }
            scene[i] = record; 
        }
        return scene; 
    }

    think(){
        let output = this.brain.predict(this.inputs);
        this.carTurning = output[0];
    }

    carDie(i){
        if (this.countdown === 0){
            savedCars.push(cars[i]);
            cars.splice(i, 1);
        }
        if (this.carForward == true){
            this.countdown -= 1;
        }
    }

    fitnessPoint(checkpoint){
        if (checkpoint === this.passedCheckpoints[0] && this.passedCheckpoints.length > 2){
            this.passedCheckpoints = [];
        }
        for (let i = 0; i < this.passedCheckpoints.length; i++){
            if (checkpoint === this.passedCheckpoints[i]){
                return;
            }
        }
        this.countdown = 120;
        this.fitness += 1;
        this.passedCheckpoints.push(checkpoint);
    }

    showCar(){
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        rectMode(CENTER);
        fill(this.color);
        rect(0, 0, this.width, this.height);
        fill(0,200,255);
        rect(this.width - 12 , 0, 5, 7);
        pop();
    }

    movement() {
        if (this.carForward == true){
            this.pos.x += cos(this.angle)* this.speed;
            this.pos.y += sin(this.angle)* this.speed;
            if (this.carTurning >= .66){
                this.angle += this.turningRate;
            } else if (this.carTurning <= .33){
                this.angle -= this.turningRate;
            }
        }
    }

    update(){
        this.pos.x += cos(this.angle);
        this.pos.y += sin(this.angle);
        this.angle += random(-1 ,1);
    }

    mutate(value){
        this.brain.mutate(value);
    }

    typeCollision(car, j){
        //mainwalls, cars, savedCars
        for (let i = 0; i < mainWalls.length; i++){
            if (cars.length > 0 && i < mainWalls.length && car.collision(mainWalls[i]) == true){
                //collision with ...
                if (mainWalls[i].type == 0){
                    savedCars.push(car);
                    cars.splice(j, 1);
                } else if (mainWalls[i].type == 1){
                    car.fitnessPoint(mainWalls[i]);
                } 
            }
        }
    }

    collision(wall){
        if (this.alive == true){
            const x1 = wall.a.x;
            const y1 = wall.a.y;
            const x2 = wall.b.x;
            const y2 = wall.b.y;

            const x3 = this.pos.x + cos(this.angle + atan(this.height/this.width)) * sqrt(this.longest);
            const y3 = this.pos.y + sin(this.angle + atan(this.height/this.width)) * sqrt(this.longest);

            const x4 = this.pos.x - cos(this.angle - atan(this.height/this.width)) * sqrt(this.longest);
            const y4 = this.pos.y - sin(this.angle - atan(this.height/this.width)) * sqrt(this.longest);

            const x5 = this.pos.x - cos(this.angle + atan(this.height/this.width)) * sqrt(this.longest);
            const y5 = this.pos.y - sin(this.angle + atan(this.height/this.width)) * sqrt(this.longest);

            const x6 = this.pos.x + cos(this.angle - atan(this.height/this.width)) * sqrt(this.longest);
            const y6 = this.pos.y + sin(this.angle - atan(this.height/this.width)) * sqrt(this.longest);

            // stroke(255, 0 ,0);
            // line(x3, y3, x4, y4);
            // line(x5, y5, x6, y6);
            // stroke(0);

            // textSize(10);
            // let text1 = this.fitness;
            // text(text1, x3 + 5, y3 - 10);
            // fill(0);


            const den1 = ((x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4));
            const den2 = ((x1 - x2) * (y5 - y6) - (y1 - y2) * (x5 - x6));

            if (den1 == 0 || den2 == 0){
                return;
            }

            const t1 = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den1;
            const u1 = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / den1;

            const t2 = ((x1 - x5) * (y5 - y6) - (y1 - y5) * (x5 - x6)) / den2;
            const u2 = ((x2 - x1) * (y1 - y5) - (y2 - y1) * (x1 - x5)) / den2;

            if ((t1 < 1 && t1 > 0 && u1 > 0 && u1 < 1) || (t2 < 1 && t2 > 0 && u2 > 0 && u2 < 1)) {
                return true;
            } else {
                return;
            }
        } else {
            return;
        }

    }
}