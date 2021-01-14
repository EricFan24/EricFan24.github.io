function setup() {
	createCanvas(600,600); 
	angleMode(DEGREES);
}

function draw() {
	background(50);
	var s = second();
  	var m = minute();
  	var h = hour() % 12;

    // Testing min state
 	// var s = 0;
    // var m = 0;
    // var h = 0;
    // Testing max state
    // var s = 60;
    // var m = 60;
    // var h = 24;

    translate(300,300);

    var secPosition = map(s, 0, 60, 0, 360);
    var minPosition = map(m, 0, 60, 0, 360);
    var hrPosition = map(h, 0, 12, 0, 360);

    rotate(-90);
    noFill();

    strokeWeight(50);
    stroke(192, 57, 43);
    arc(0, 0, 300, 300, 0, hrPosition);
    stroke(255, 255, 255, 30);
    arc(0, 0, 300, 300, 0, 360);

    strokeWeight(27);
    stroke(30, 100, 150);
    arc(0, 0, 300, 300, 0, minPosition);
    stroke(255, 255, 255, 40);
    arc(0, 0, 300, 300, 0, 360);

    strokeWeight(10);
    stroke(248, 196, 113);
    arc(0, 0, 300, 300, 0, secPosition);
    stroke(255, 255, 255, 50);
    arc(0, 0, 300, 300, 0, 360);


    print(minute());
}
