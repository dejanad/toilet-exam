var socket;
var colorPicker;
var slider;
var rubber;

//load typeface
let camptonMedium;
function preload() {
  camptonMedium = loadFont ('Campton-Medium.otf');
}
function setup() {
  createCanvas(displayWidth, displayHeight, WEBGL);
  background(220);
  colorPicker = createColorPicker('pink');//first colour it loads
  colorPicker.position(13,60);
  slider = createSlider(10,100,47);//first slider it loads
  slider.position(10,120);
  rubber = createButton('rub out');
  rubber.position(10,130);
  

  socket = io.connect('http://localhost:3000');
  socket.on('mouse',newDrawing);
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
x: mouseX,
y: mouseY,
fill: colorPicker.value(),
ellipseR: slider.value()
}
//name the message
socket.emit('mouse',data);

fill(colorPicker.color());
noStroke();
ellipse(mouseX, mouseY,slider.value(),slider.value());
}

//BUTTONS+NAMES
function draw() {
//   textFont(camptonMedium);
//   textSize(20);
//   fill(0);
//   text('colour',10,50);
//   text('size',10,110);

  let radius = width * 1.5;

  //drag to move the world.
  orbitControl();

  normalMaterial();
  translate(0, 0, -600);
  for (let i = 0; i <= 12; i++) {
    for (let j = 0; j <= 12; j++) {
      push();
      let a = (j / 12) * PI;
      let b = (i / 12) * PI;
      translate(
        sin(2 * a) * radius * sin(b),
        (cos(b) * radius) / 2,
        cos(2 * a) * radius * sin(b)
      );
      if (j % 2 === 0) {
        cone(30, 30);
      } else {
        box(30, 30, 30);
      }
      pop();
    }
  }

}