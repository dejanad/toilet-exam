var socket;
var colorPicker;
var slider;


//load typeface+pngs+sound
let camptonMedium;
let herefor24;//idea is to refresh websocket every 24hours 
let dej;
var publicLoo;

function preload(){
  herefor24 = loadImage('herefor24.png');
  dej = loadImage('dej.png');
  camptonMedium = loadFont ('Campton-Medium.otf');
  soundFormats('mp3');
  publicLoo = loadSound ('publicLoo.mp3')
}

function setup() {
  createCanvas(displayWidth, displayHeight,WEBGL);
  // createCanvas(windowWidth, windowHeight,WEBGL);
  background(220);
  
  //lights
  ambientMaterial(250);
    pointLight(171, 213, 225, 0, 0, 400);
  ambientLight("lightblue");

  
  colorPicker = createColorPicker('orange');//first colour it loads
  colorPicker.position(13,60);
  slider = createSlider(5,70,10);//first slider it loads
  slider.position(10,120);
   
  socket = io.connect('http://localhost:3000');
  socket.on('mouse',newDrawing);

  
  noStroke();
  //door
  push();
  translate(-20, 0, 0);
  plane(550, 890);
  pop();
  //side of door
  push();
  translate(277, 0, 0);
plane(40, 890);
pop();

// door lock
 push();
strokeWeight(0.5);
stroke(169);
fill(80);
ellipse(225,0,20,20);
rect(235,-5,40,10);
noFill();

arc(225, 0, 100, 100, PI + HALF_PI, TWO_PI);
pop();

  fill('grey');
  push();
  
  //left wall
  translate(-300, 0, 300);
   rotateY((90 * PI) / 180);
plane(600, 900);
  pop();
  
  //right wall
  push();
    translate(300, 0, 300);
  rotateY((90 * PI) / 180);
  plane(600, 900);
  pop();

   // Bottom wall
  push();
  fill(220);
  translate(0, 520, 300);
  rotateX((90 * PI) / 180);
  plane(690, 900);
  pop();

  publicLoo.play();
  
}


//DATA BEING SENT OUT
function newDrawing(data){
noStroke();
fill(data.fill);
ellipse(data.x, data.y,data.ellipseR,data.ellipseR);
}


function mouseDragged(){
console.log('Sending: '+ mouseX+','+mouseY);
//content of message. object with data in it  
var data ={
x: mouseX-width/2,//repositions mouse
y: mouseY-height/2,//repostions mouse 
fill: colorPicker.value(),
ellipseR: slider.value()
}
//name the message
socket.emit('mouse',data);

//assign colours to mouse
fill(colorPicker.color());
noStroke();
ellipse(mouseX-width/2, mouseY-height/2,slider.value(),slider.value());
}

//BUTTONS+NAMES
function draw() {
  

  //labels of drawing tools 
  // textFont(camptonMedium);
  // textSize(20);
  // fill(0);
  // text('colour',10,50);
  // text('size',10,110);

  //drag to move the world.
  // orbitControl();//doesn't work ??
  image(dej,110,220);
  image(herefor24,-250,-440);
 
}

