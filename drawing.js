class screenPoint {
    constructor (x, y){
        this.pos = createVector(x, y);
    }

    showPoint(point){
        ellipse(point.pos.x, point.pos.y, 8, 8);
        textSize(16);
        let text1 = "X = " + point.pos.x;
        let text2 = "Y = " + point.pos.y;
        text(text1 , point.pos.x -25, point.pos.y - 10);
        text(text2, point.pos.x -25, point.pos.y - 25);
        fill(0);
    }
}



function drawing(){
    if (keyIsDown(32)) {
        points.push(new screenPoint(mouseX, mouseY));
    }
}

