const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const mapImage = new Image();
// Replace with your uploaded map filename (e.g., 'The_Skeld_map.png')
mapImage.src = 'https://raw.githubusercontent.com/AlvajoyAsante/among-us-assets/main/Maps/The%20Skeld/The_Skeld_map.png';

const player = {
    x: 1000,
    y: 1000,
    width: 40,
    height: 50,
    color: '#ff0000',
    speed: 7
};

const keys = {};

window.addEventListener('keydown', (e) => { keys[e.key.toLowerCase()] = true; keys[e.key] = true; });
window.addEventListener('keyup', (e) => { keys[e.key.toLowerCase()] = false; keys[e.key] = false; });

function update() {
    if (keys.w || keys.ArrowUp) player.y -= player.speed;
    if (keys.s || keys.ArrowDown) player.y += player.speed;
    if (keys.a || keys.ArrowLeft) player.x -= player.speed;
    if (keys.d || keys.ArrowRight) player.x += player.speed;
}

function drawGrid(cameraX, cameraY) {
    ctx.strokeStyle = '#1a1d24';
    ctx.lineWidth = 2;
    const gridSize = 100;
    
    const startX = Math.floor(cameraX / gridSize) * gridSize;
    const endX = startX + canvas.width + gridSize;
    const startY = Math.floor(cameraY / gridSize) * gridSize;
    const endY = startY + canvas.height + gridSize;

    for (let x = startX; x < endX; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, startY);
        ctx.lineTo(x, endY);
        ctx.stroke();
    }
    for (let y = startY; y < endY; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(startX, y);
        ctx.lineTo(endX, y);
        ctx.stroke();
    }
}

function draw() {
    ctx.fillStyle = '#0b0c10';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cameraX = player.x - canvas.width / 2;
    const cameraY = player.y - canvas.height / 2;

    ctx.save();
    ctx.translate(-cameraX, -cameraY);

    // Draws temporary background grid so movement is visible
    drawGrid(cameraX, cameraY);

    // Draws map if loaded correctly
    if (mapImage.complete && mapImage.naturalWidth !== 0) {
        ctx.drawImage(mapImage, 0, 0);
    }

    // Draws player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x - player.width / 2, player.y - player.height / 2, player.width, player.height);

    ctx.restore();
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
