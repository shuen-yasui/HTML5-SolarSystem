class Particle {
	constructor(r){
		this.centerX = window.innerWidth/2;
		this.centerY = window.innerHeight/2;
		this.x;
		this.y;
		this.couple;
		this.radius = r;
    this.pathRadius = 200;
		this.vel = 0.01;
    this.radians = 0;
		this.alpha = 1;
	}
	update(){
    // Loc
    // Update Positions
		this.radians += this.vel;
		this.x = this.centerX + (this.pathRadius * (Math.cos(this.radians)));
		this.y = this.centerY + (this.pathRadius * (Math.sin(this.radians)));
    // Path
    c.beginPath();
    c.arc(this.centerX,this.centerY,this.pathRadius,0,Math.PI * 2,false);
    c.strokeStyle = "white";
    c.stroke();
    c.fillStyle = "black";
    c.fill();
    c.closePath();
    // Planet
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
    c.strokeStyle = "rgba(255,255,255,"+this.alpha+")";
    c.stroke();
    c.fillStyle = "black";
    c.fill();
    c.closePath();
	}
}

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var particles = [];
init();

function init(){
  p = new Particle(10);
  particles.push(p);
	update();
}
function update(){
	c.fillStyle = 'rgba(0,0,0,0.5)';
	c.fillRect(0,0,innerWidth,innerHeight);
	c.closePath();
	for (var i = 0; i < particles.length; i++){
		p = particles[i];
		p.update();
	}
	requestAnimationFrame(update);
}
