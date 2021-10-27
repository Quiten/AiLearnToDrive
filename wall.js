class wall{
    constructor(xpos1, ypos1, xpos2, ypos2, type){
        this.a = createVector(xpos1, ypos1);
        this.b = createVector(xpos2, ypos2);
        this.type = type;
    }

    showWall(){
        fill(0);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
    }

    showCheckpoint(){
        stroke(255, 90, 90);
        line(this.a.x, this.a.y, this.b.x, this.b.y);
        stroke(0);
    }

}
