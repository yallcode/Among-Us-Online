const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 1. Auto-resize canvas to match window dimensions
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// 2. Load the map image
const mapImage = new Image();
// Replace with your local relative file path (e.g., 'The_Skeld_map.png') 
// or a reliable hosted image URL.
mapImage.src = 'https://raw.githubusercontent.com/AlvajoyAsante/among-us-assets/main/Maps/The%20Skeld/The_Skeld_map.png';

// 3. Define Player state (World Coordinates)
const player = {
    x: 1000, // Starting position inside the map space
    y: 1000,
    width: 40,
    height: 50,
    color: '#ff0000', // Red crewmate placeholder
    speed: 6
};

// 4. Input Tracking
const keys = {};

window.addEventListener('keydown', (e) => {
    keys[e.key.toLowerCase()] = true;
    keys[e.key] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.key.toLowerCase()] = false;
    keys[e.key] = false;
});

// 5. Update logic (Movement)
function update() {
    if (keys.w || keys.ArrowUp) player.y -= player.speed;
    if (keys.s || keys.ArrowDown) player.y += player.speed;
    if (keys.a || keys.ArrowLeft) player.x -= player.speed;
    if (keys.d || keys.ArrowRight) player.x += player.speed;
}

// 6. Rendering logic
function draw() {
    // Clear screen with space color
    ctx.fillStyle = '#0b0c10';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate camera offsets to center the player on screen
    const cameraX = player.x - canvas.width / 2;
    const cameraY = player.y - canvas.height / 2;

    ctx.save();
    // Shift canvas origin according to camera position
    ctx.translate(-cameraX, -cameraY);

    // Draw map safely (naturalWidth prevents crashes if the image fails)
    if (mapImage.complete && mapImage.naturalWidth !== 0) {
        ctx.drawImage(mapImage, 0, 0);
    }

    // Draw Player centered on its world coordinates
    ctx.fillStyle = player.color;
    ctx.fillRect(
        player.x - player.width / 2,
        player.y - player.height / 2,
        player.width,
        player.height
    );

    ctx.restore();
}

// 7. Core Game Loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Launch game
gameLoop();
