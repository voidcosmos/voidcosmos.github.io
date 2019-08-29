(function() {
  let canvas;
  let ctx;

  const layers = [[{ id: 0, x: 300, y: 700, size: 1 }]];
  let speed = 20;
  const finalSpeed = 0.2;

  let isFinalSpeed = false;

  initializeCanvas();
  populateStars();
  nextFrame();
  addListeners();

  function initializeCanvas() {
    canvas = document.createElement('canvas');
    canvas.id = 'starsCanvas';
    canvas.style.zIndex = -50;
    canvas.style.position = 'fixed';
    canvas.style.opacity = '0.3';
    canvas.style.top = '0';
    canvas.style.left = '0';

    ctx = canvas.getContext('2d');
    const body = document.getElementsByTagName('body')[0];
    body.appendChild(canvas);
    resizeCanvas();
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function addListeners() {
    window.addEventListener('resize', resizeCanvas);
    const teamBtn = document.getElementById('theTeamBtn');
    teamBtn.addEventListener('click', () => speedPulse());
  }

  function speedPulse() {
    console.log('lala');
    speed = 20;
  }

  function refresh() {
    clearCanvas();
    checkSpeed();
    layers.map(layer => {
      drawLayer(layer);
      calculatePositions(layer);
    });
    nextFrame();
  }

  function checkSpeed() {
    if (speed > finalSpeed) {
      speed = speed * 0.97;
      isFinalSpeed = false;
    } else {
      speed = finalSpeed;
      isFinalSpeed = true;
    }
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawLayer(layer) {
    ctx.fillStyle = 'white';
    layer.map(element => {
      ctx.fillRect(element.x, element.y, element.size, element.size);
    });
  }

  function calculatePositions(layer) {
    layer.map(element => {
      element.y -= speed * element.size;
      if (element.y < 300) deleteElementFromLayer(layer, element);
    });
  }

  function deleteElementFromLayer(layer, element) {
    layer = layer.filter(object => object.id !== element.id);
  }

  function populateStars() {
    const starsAmount = isFinalSpeed ? 7 : 12;

    const starSizes = [1, 1, 1, 2, 2, 3, 3, 4, 5, 6];

    for (let i = 0; i < starsAmount; ++i) {
      let star = {};
      star.id = getRandomInt(0, 500000);
      star.size = starSizes[getRandomInt(0, starSizes.length)];
      star.x = getRandomInt(0, canvas.width);
      star.y = canvas.height;
      layers[0].push(star);
    }

    setTimeout(() => populateStars(), getRandomInt(500, 2000) / (speed + 0.9));
  }

  function nextFrame() {
    window.requestAnimationFrame(refresh);
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
})();
