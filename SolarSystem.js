class Particle {
	constructor(name,path,r){
		this.centerX = window.innerWidth/2;
		this.centerY = window.innerHeight/2;
		this.x;
		this.y;
		this.couple;
		this.radius = r;
    this.pathRadius = path;
		this.vel = 0.01;
    this.radians = 0;
		this.alpha = 1;
	}
	update(){
    // Loc
    // Update Positions
		this.radians += this.vel;
		this.x = this.centerX + (this.pathRadius * (Math.cos(this.radians)));
		this.y = this.centerY + (this.pathRadius * (Math.sin(this.radians)) * .2);
    // Path
    c.beginPath();
    c.arc(this.centerX,this.centerY,this.pathRadius,0,Math.PI * 2,false);
    c.strokeStyle = "white";
    c.stroke();
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
  particles.push(new Particle("Sun",0,20));
  particles.push(new Particle("Mercury",100,10));
  particles.push(new Particle("Venus",150,10));
  particles.push(new Particle("Earth",200,10));
  particles.push(new Particle("Mars",250,10));
  particles.push(new Particle("Jupiter",300,10));
  particles.push(new Particle("Saturn",350,10));
  particles.push(new Particle("Uranus",400,10));
  particles.push(new Particle("Neptune",450,10));
  particles.push(new Particle("Pluto",500,10));
	update();
}
function update(){
	c.fillStyle = 'rgba(0,0,0,0.2)';
	c.fillRect(0,0,innerWidth,innerHeight);
	c.closePath();
	for (var i = 0; i < particles.length; i++){
		p = particles[i];
		p.update();
	}
	requestAnimationFrame(update);
}
