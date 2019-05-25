class Particle {
	constructor(name,path,r,v){
		this.centerX = window.innerWidth/2;
		this.centerY = window.innerHeight/2;
		this.x;
		this.y;
		this.radius = r;
    this.pathRadius = path;
		this.velocity = 0.01 / v;
    this.posInRadians = Math.random()*Math.PI*2;
		this.alpha = 1;
		this.planetColorDefault = "rgba(255,255,255,"+this.alpha+")";
		this.planetColorMouseOver = "red";
		this.planetColor = this.planetColorDefault;
		this.name = name;
		this.showInfo = false;
	}
	update(){
		// If sun
		if (this.pathRadius == 0){
			this.x = this.centerX;
			this.y = this.centerY;
			this.drawPlanet();
			return
		}
		// Update Positions
		this.posInRadians += this.velocity;
		this.x = this.centerX + (this.pathRadius * (Math.cos(this.posInRadians)));
		this.y = this.centerY + (this.pathRadius * (Math.sin(this.posInRadians)) * .2);
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
		var textY = this.y - this.radius - 10;
		c.beginPath();
		c.fillStyle = "white";
		c.textAlign = "center";
		c.font = "12px Helvetica";
		c.fillText(this.name,this.x,textY);
		c.closePath();
	}
	checkMouseHit(mouseX,mouseY){
		if (mouseX>(this.x-10-this.radius) && mouseX<(this.x+10+this.radius) && mouseY>(this.y-10-this.radius) && mouseY<(this.y+10+this.radius)) {
			this.planetColor = this.planetColorMouseOver;
			this.showInfo = true;
		}
		else{
			this.planetColor = this.planetColorDefault;
			this.showInfo = false;
		}
	}
}
function init(){
	var orbitRadiusScale = (window.innerWidth*0.9)/18;
  planets.push(new Particle("Sun",0,20,0));
  planets.push(new Particle("Mercury",orbitRadiusScale,3,0.2));
  planets.push(new Particle("Venus",2*orbitRadiusScale,4,0.6));
  planets.push(new Particle("Earth",3*orbitRadiusScale,5,1));
  planets.push(new Particle("Mars",4*orbitRadiusScale,5,1.9));
  planets.push(new Particle("Jupiter",5*orbitRadiusScale,15,11.9));
  planets.push(new Particle("Saturn",6*orbitRadiusScale,10,29.5));
  planets.push(new Particle("Uranus",7*orbitRadiusScale,7,84));
  planets.push(new Particle("Neptune",8*orbitRadiusScale,6,164.8));
  planets.push(new Particle("Pluto",9*orbitRadiusScale,2,248));
	update();
}
function update(){
	c.clearRect(0,0,window.innerWidth,window.innerHeight);
	for (var i = 0; i < planets.length; i++){
		p = planets[i];
		p.update();
	}
	// footer
	var footer = "By: Shuen Yasui";
	c.beginPath();
	c.fillStyle = "rgb(50,50,50)";
	c.textAlign = "right";
	c.font = "12px Helvetica";
	c.fillText(footer,window.innerWidth*0.95,window.innerHeight*0.75);
	c.closePath();
	requestAnimationFrame(update);
}
function onMouseMove(e) {
	mouseX = e.clientX;
	mouseY = e.clientY;
	for (var i = 0; i < planets.length; i++) {
		planets[i].checkMouseHit(mouseX,mouseY);
	}
}
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext('2d');
var planets = [];
document.addEventListener("mousemove", onMouseMove);
init();
