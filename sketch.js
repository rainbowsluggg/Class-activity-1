let particles = [];
let isMousePressed = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  // Draw and update particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].display();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }

  // Create explosion at mouse position if mouse is pressed
  if (isMousePressed) {
    let explosionPosition = createVector(mouseX, mouseY);
    let explosionColor = color(random(255), random(255), random(255));
    for (let i = 0; i < 10; i++) {
      let angle = random(TWO_PI);
      let magnitude = random(2, 8);
      let velocity = p5.Vector.fromAngle(angle).mult(magnitude);
      particles.push(new Particle(explosionPosition, velocity, explosionColor));
    }
  }
}

function mousePressed() {
  isMousePressed = true;
}

function mouseReleased() {
  isMousePressed = false;
}

class Particle {
  constructor(position, velocity, color) {
    this.position = position.copy();
    this.velocity = velocity.copy();
    this.color = color;
    this.alpha = 255;
    this.size = random(2, 8);
    this.gravity = createVector(0, 0.1);
  }

  update() {
    this.velocity.add(this.gravity);
    this.position.add(this.velocity);
    this.alpha -= 5;
  }

  display() {
    noStroke();
    fill(this.color.levels[0], this.color.levels[1], this.color.levels[2], this.alpha);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }

  finished() {
    return this.alpha <= 0;
  }
}
