class Particle {
	constructor(name,path,r,vel){
		this.centerX = window.innerWidth/2;
		this.centerY = window.innerHeight/2;
		this.x;
		this.y;
		this.couple;
		this.radius = r;
    this.pathRadius = path;
		this.vel = 0.01 / vel;
    this.radians = Math.random()*Math.PI*2;
		this.alpha = 1;
		this.planetColorDefault = "rgba(255,255,255,"+this.alpha+")";
		this.planetColorMouseOver = "red";
		this.planetColor = this.planetColorDefault;
		this.name = name;
		this.showInfo = false;
	}
	update(){
		// If sun draw
		if (this.pathRadius == 0){
			this.x = this.centerX;
			this.y = this.centerY;
			this.drawPlanet();
			return
		}
		// Update Positions
		this.radians += this.vel;
		this.x = this.centerX + (this.pathRadius * (Math.cos(this.radians)));
		this.y = this.centerY + (this.pathRadius * (Math.sin(this.radians)) * .2);
    // Draw Path
    var pRadi = 0
    var pX = 0
    var pY = 0
		var orbit = 64*(this.pathRadius/500);
    while (pRadi < Math.PI * 2){
			c.beginPath();
      pX = this.centerX + (this.pathRadius * (Math.cos(pRadi)));
  		pY = this.centerY + (this.pathRadius * (Math.sin(pRadi)) * .2)
      c.arc(pX,pY,0.5,0,Math.PI * 2,false);
      c.strokeStyle = 'rgb(50,50,50)';
      c.stroke();
      pRadi += (Math.PI/(16+orbit));
			c.closePath();
    }
    this.drawPlanet();
	}
	drawPlanet(){
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
    c.strokeStyle = this.planetColor;
    c.stroke();
    c.fillStyle = "black";
    c.fill();
    c.closePath();
		if (this.showInfo) {
			this.drawInfo();
		}
	}
	drawInfo(){
		c.beginPath();
		c.fillStyle = "white";
		c.fillText(this.name,this.x,this.y);
		c.closePath();
	}
	checkMouseHit(mouseX,mouseY){
		if (mouseX>(this.x-10-this.radius) && mouseX<(this.x+10+this.radius)) {
			if (mouseY>(this.y-10-this.radius) && mouseY<(this.y+10+this.radius)) {
				this.planetColor = this.planetColorMouseOver;
				this.showInfo = true;
			}
		}
		else{
			this.planetColor = this.planetColorDefault;
			this.showInfo = false;
		}
	}
}

var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var particles = [];
document.addEventListener("mousemove", onMouseMove);
//canvas.style.cursor = "crosshair";
init();

function init(){
	var orbitRadiusScale = (window.innerWidth*0.9)/18;
  particles.push(new Particle("Sun",0,20,0));
  particles.push(new Particle("Mercury",orbitRadiusScale,3,0.2));
  particles.push(new Particle("Venus",2*orbitRadiusScale,4,0.6));
  particles.push(new Particle("Earth",3*orbitRadiusScale,5,1));
  particles.push(new Particle("Mars",4*orbitRadiusScale,5,1.9));
  particles.push(new Particle("Jupiter",5*orbitRadiusScale,15,11.9));
  particles.push(new Particle("Saturn",6*orbitRadiusScale,10,29.5));
  particles.push(new Particle("Uranus",7*orbitRadiusScale,7,84));
  particles.push(new Particle("Neptune",8*orbitRadiusScale,6,164.8));
  particles.push(new Particle("Pluto",9*orbitRadiusScale,2,248));
	update();
}
function update(){
	//c.fillStyle = 'rgba(0,0,0,0.2)';
	//c.fillRect(0,0,innerWidth,innerHeight);
	//c.closePath();
	c.clearRect(0,0,window.innerWidth,window.innerHeight);
	for (var i = 0; i < particles.length; i++){
		p = particles[i];
		p.update();
	}
	requestAnimationFrame(update);
}
function onMouseMove(e) {
	mouseX = e.clientX;
	mouseY = e.clientY;
	for (var i = 0; i < particles.length; i++) {
		particles[i].checkMouseHit(mouseX,mouseY);
	}
}
