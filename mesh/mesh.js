const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlesArray = [];
const numberOfParticles = 10;
var buttonclicked = false;
var requestId;
var requestIdT;
//var start;
//var startmovingtocenter;

//get mouse position
let mouse = {
    x: null,
    y: null,
    // radius is the size of the area in which the particles react to the mouse
    radius: (canvas.height/80) * (canvas.width/80)
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
})


// this class below is for the randomly moving particles we need two different particle classes because
// they have different constructors
class Particle2 {
    constructor(x, y, directionX, directionY, size, color){
        this.x = x; // all this means is that we tell the constructor that this x coordinate of this new particle that we are creating equals to the x value of the cinstructor parameter
        this.y = y; 
        this.directionX = directionX; // it's like a wind force on x axis whereas weight is the gravity force
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }
    draw2(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false); // 0 is the 'start angle' argument and 'Math.PI * 2' is the 'end angle' which gives us a value of 360 degrees which is a full circle angle!
        ctx.fillStyle = '#8C5523';
        ctx.fill();
     //   ctx.closePath();
    }
    update2(){
        if(this.x > canvas.width || this.x < 0){
            this.directionX = -this.directionX; // check if particle reaches full width so to bounce it back
        }
        if(this.y > canvas.height || this.y < 0){
            this.directionY = -this.directionY;
        }
        //check collision detection - mouse position  /  particle position
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx + dy*dy);
        if(distance < mouse.radius + this.size){ // if the distance between the mouse radius and the size of the particle is less than the sum of these 2 numbers then we have a collision of the particle and the mouse and then inside the nested if which follows we check if the position of the mouse is lower than the position of the particle so we push the particle to the right...
            if(mouse.x < this.x && this.x < canvas.width - this.size * 10){
                this.x += 10;
            }
            if(mouse.x > this.x && this.x > this.size * 10){
                this.x -= 10;
            }
            if(mouse.y < this.y && this.y < canvas.height - this.size * 10){
                this.y += 10;
            }
            if(mouse.y > this.y && this.y > this.size * 10){
                this.y -= 10;
            }
        }
        // move particle
        this.x -= this.directionX;
        this.y -= this.directionY;
        // draw particle
        this.draw2();
    }
    moveToCenter() {
        if((this.x < canvas.width/2 ) && this.x != canvas.width/2){
            this.x  += 10;
        }
        if((this.x > canvas.width/2) && this.x != canvas.width/2){
            this.x -= 10;
        }
        if((this.y < 300 ) && this.y != 300){
            this.y += 5;
        }
        if((this.y > 300 ) && this.y != 300){
            this.y -= 5;
        }
        this.draw2();
    }
}
function init2(){
    particlesArray.length = 0;
    let numberOfParticles2 = (canvas.height * canvas.width) / 9000;
    for(let i = 0; i < numberOfParticles2; i++){
        let size = (Math.random() * 5) + 1;
        let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 5) - 2.5;
        let directionY = (Math.random() * 5) - 2.5;
        let color = '#8C5523';

        particlesArray.push(new Particle2(x, y, directionX, directionY, size, color))

    }
}

// animates the random particles
// every method with the number 2 in its signature is actually for the random particles
function animate2(){ // calls everything we need to run for every animation frame ... it will be calling them over and over creating our animation loop!!!!
    requestId = requestAnimationFrame(animate2);
    ctx.clearRect(0, 0, innerWidth, innerHeight); // clears the previous paint of previous frames so we see no trails behind and see only one particle falling or moving
   // particle1.update(); // it will move down the particle according to its weight
    //particle1.draw();
    for(let i = 0; i < particlesArray.length; i++){
     
        if(buttonclicked){
        //    startmovingtocenter = setTimeout(function(){
                particlesArray[i].moveToCenter();
        //    }, 0.1)
        } else {
            particlesArray[i].update2();
        }
        //particlesArray[i].draw();
    }
   
    connect2();
}


function connect2(){
    let opacityValue = 1;
     for(let i = 0; i < particlesArray.length; i++){
         for(let j = i; j < particlesArray.length; j++){
             let distance = ((particlesArray[i].x - particlesArray[j].x)
             * (particlesArray[i].x - particlesArray[j].x))
             + ((particlesArray[i].y - particlesArray[j].y)
             * (particlesArray[i].y - particlesArray[j].y));
             if(distance <= (canvas.width/7) * (canvas.height/7)){
                 opacityValue = 1 - (distance / 20000);
                 ctx.strokeStyle = 'rgba(140,85,31,' + opacityValue +')';
                 ctx.lineWidth = 1;
                 ctx.beginPath();
                 ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                 ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                 ctx.stroke();
 
             }
         }
     }
 }

 //window.addEventListener('DOMContentLoaded', (event) => {
//start = setTimeout(function(){ // starts the random particles animation
     //   init2();
     //   animate2();
  //   },100);
//});
init2();
animate2();





class Particle {
    constructor(x, y, endwidth, endheight){ // the coordinates of a particle when it is painted on canvas before it starts moving are these x and y values here...
        this.x = x; // all this means is that we tell the constructor that this x coordinate of this new particle that we are creating equals to the x value of the cinstructor parameter
        this.y = y; 
        this.size = 5;
        this.weight = 10; // this will affect how fast our particles will fall or bounce or move because of their weight...
        this.directionX = 2; // it's like a wind force on x axis whereas weight is the gravity force
        this.directionY = 2;
        this.endwidth = endwidth;
        this.endheight = endheight;
    }// lines 9-12 are our particle's blueprint !!!!
    
    // below method updates the position of our particle for every frame of animation !!!
    update(){  
        // x and y represent the starting point which is the center point and endwidth and endheight represent the end positions
        if(this.x === this.endwidth && this.y > this.endheight){
            this.weight += 0.01; // the longer they go the heavier they get so they stop moving at some point, this also determines the speed they have
            //this.y += this.weight; // we add gravity here to the particle
            this.x = this.endwidth; // we add wind here to the particle
            this.y -= this.directionY;
        }
        else if (this.x > this.endwidth && this.y > this.endheight){
            this.weight += 0.01;
            this.x -= this.directionX;
            this.y -= this.directionY;
        }
        else if (this.x < this.endwidth && this.y > this.endheight){
            this.weight += 0.01;
            this.x += this.directionX;
            this.y -= this.directionY;
        }
        else if (this.x > this.endwidth && this.y === 300){
            this.weight += 0.01;
            this.x -= this.directionX;
            this.y += this.directionY;
        }
        else if (this.x === this.endwidth && this.y === 300){ // center point doesn't move!
            this.x = this.endwidth;
            this.y = this.endheight;
        }
        else if (this.x < this.endwidth && this.y === 300){
            this.weight += 0.01;
            this.x += this.directionX;
            this.y += this.directionY;
        }
  
 
  
        else if (this.x > this.endwidth) {
            if(this.endwidth === canvas.width/2 - 80){
                this.x -= this.directionX;
                this.y = 440;
            } else{
                this.weight += 0.01;
                this.x -= this.directionX;
                this.y += this.directionY;
            }
        }
        else if (this.x < this.endwidth) {
            if(this.endwidth === canvas.width/2 + 80){
                this.x += this.directionX;
                this.y = 440;
            } else {
                this.weight += 0.01;
                this.x += this.directionX;
                this.y += this.directionY;
            }
        }


    }
    // below method actually draws the particle with a circle
    draw(){
        ctx.fillStyle = 'rgba(140,85,31,1)';
        // we start drawing the circle here 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2) // 0 is the 'start angle' argument and 'Math.PI * 2' is the 'end angle' which gives us a value of 360 degrees which is a full circle angle!
        ctx.closePath();
        ctx.fill();
    }
    /*
    glow(){
        ctx.shadowColor = 'rgba(37,234,108,1)' // string
        //Color of the shadow;  RGB, RGBA, HSL, HEX, and other inputs are valid.
        ctx.shadowOffsetX = 0; // integer
        //Horizontal distance of the shadow, in relation to the text.
        ctx.shadowOffsetY = 0; // integer
        //Vertical distance of the shadow, in relation to the text.
        ctx.shadowBlur = 10; // integer
        //Blurring effect to the shadow, the larger the value, the greater the blur.
    }
    stop_glow(){
        ctx.shadowColor = '' 
        ctx.shadowOffsetX = 0; 
        ctx.shadowOffsetY = 0; 
        ctx.shadowBlur = 0;
    }
    */
    
}


// create number of particles and fill the array of particles with them...
function init(){ // starts the triangle animation
    particlesArray.length = 0;
    const positions = [ {x: canvas.width/2,       y: 50},
                        {x: canvas.width/2 - 80,  y: 180},
                        {x: canvas.width/2 + 80,  y: 180},
                        {x: canvas.width/2 - 160, y: 310},
                        {x: canvas.width/2,       y: 310},
                        {x: canvas.width/2 + 160, y: 310},
                        {x: canvas.width/2 - 240, y: 440},
                        {x: canvas.width/2 - 80,  y: 440},
                        {x: canvas.width/2 + 80,  y: 440},
                        {x: canvas.width/2 + 240, y: 440}
                    ];
    for(let i = 0; i < numberOfParticles; i++){
      //  const x = Math.random() * canvas.width;
      //  const y = Math.random() * canvas.height;
      //const x = canvas.width/2;
      //const y = canvas.height/2;
        particlesArray.push(new Particle(canvas.width/2, 300, positions[i].x, positions[i].y));
    }
}
//init();

function animate(){ // calls everything we need to run for every animation frame ... it will be calling them over and over creating our animation loop!!!!
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clears the previous paint of previous frames so we see no trails behind and see only one particle falling or moving
   // particle1.update(); // it will move down the particle according to its weight
    //particle1.draw();
    for(let i = 0; i < particlesArray.length; i++){
        particlesArray[i].update();
        particlesArray[i].draw();
        connect(i);
    }
 
  //  connect();
  requestIdT =  requestAnimationFrame(animate); // instead of using setInterval this is a better way to loop over our animation by calling this function which only runs once and we pass it its parent function called animate() ... thimizei to fenomeno tis anadromis
}
//animate(); // this will kick of our animation loop !!!


function connect(i){
   // for(let i = 0; i < particlesArray.length; i++){
        for(let j = i; j < particlesArray.length; j++){
            let distance = Math.sqrt(((particlesArray[i].x - particlesArray[j].x)
            * (particlesArray[i].x - particlesArray[j].x))
            + ((particlesArray[i].y - particlesArray[j].y)
            * (particlesArray[i].y - particlesArray[j].y)));
            if(distance <= 170){
                ctx.strokeStyle = 'rgba(140,85,31,0.8)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();

            }
        }
   // }
}
function moveParticlesToTheCenter(){
    buttonclicked = true;
    if (requestIdT) {
        window.cancelAnimationFrame(requestIdT);
        requestIdT = undefined;
     }
   // clearTimeout(start);
   // if(buttonclicked){
        setTimeout(function(){ // cleans the canvas to draw the triangle
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesArray.length = 0;
            if (requestId) {
                window.cancelAnimationFrame(requestId);
                requestId = undefined;
             }
            init();
            animate(); // this will kick of our animation loop !!!
        }, 3000);
  //  }
}

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse.radius = ((canvas.height/80) * (canvas.width/80));
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.length = 0;
   // start = setTimeout(function(){
    if (requestId) {
        window.cancelAnimationFrame(requestId);
        requestId = undefined;
        moveParticlesToTheCenter();
     }
     if (requestIdT) {// requestIdT stands for the request animation frame id of the triangle itself.. we need this check here so if the animation frame loop is running we need to stop it otherwise it'll throw an error saying that the update function or the movetocenter function is not a function
        window.cancelAnimationFrame(requestIdT);
        requestIdT = undefined;
      //  init2();
      //  animate2();
     }
        init2();
        animate2();
      //  moveParticlesToTheCenter();
        
  //   },100);
  //  init();
  //  init2();
});

//mouseout event
window.addEventListener('mouseout', function(){
    mouse.x = undefined;
    mouse.y = undefined;
})