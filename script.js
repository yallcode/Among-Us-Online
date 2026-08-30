const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mapImage = new Image();
// Using the Skeld map from the assets repository
mapImage.src = 'https://raw.githubusercontent.com/AlvajoyAsante/among-us-assets/main/Maps/The%20Skeld/The_Skeld_map.png'; 

// The player's coordinates in the WORLD, not just on the screen
const player = {
    x: 1000, // Starting deeper inside the map
    y: 1000,
    width: 40,
    height: 50,
    color: '#ff0000',
    speed: 6
};

const keys = {
    w: false, a: false, s: false, d: false,
    ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false
};

window.addEventListener('keydown', (e) => { 
    if (keys.hasOwnProperty(e.key)) keys[e.key] = true; 
});
window.addEventListener('keyup', (e) => { 
    if (keys.hasOwnProperty(e.key)) keys[e.key] = false; 
});
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function update() {
    // Move the player's world coordinates
    if (keys.w || keys.ArrowUp) player.y -= player.speed;
    if (keys.s || keys.ArrowDown) player.y += player.speed;
    if (keys.a || keys.ArrowLeft) player.x -= player.speed;
    if (keys.d || keys.ArrowRight) player.x += player.speed;
}

function draw() {
    // 1. Clear the screen
    ctx.fillStyle = '#0b0c10';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Calculate the camera offset to keep the player centered
    const cameraX = player.x - canvas.width / 2;
    const cameraY = player.y - canvas.height / 2;

    // 3. Save the default canvas view
    ctx.save(); 
    
    // 4. Shift the entire canvas view by the camera offset
    ctx.translate(-cameraX, -cameraY); 

    // 5. Draw the map (it will automatically shift based on the translate above)
    if (mapImage.complete) {
        ctx.drawImage(mapImage, 0, 0); 
    }

    // 6. Draw the player at their actual world coordinates
    ctx.fillStyle = player.color;
    // Centering the rectangle on the player's exact X/Y point
    ctx.fillRect(player.x - player.width / 2, player.y - player.height / 2, player.width, player.height);

    // 7. Restore the canvas view so the next frame starts fresh
    ctx.restore(); 
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
