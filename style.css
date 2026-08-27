const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Size the canvas to the browser window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Define the player character
const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 40,
    height: 50,
    color: '#ff0000', // Red crewmate placeholder
    speed: 6
};

// Track which keys are currently pressed
const keys = {
    w: false, a: false, s: false, d: false,
    ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false
};

// Listen for keydown and keyup events
window.addEventListener('keydown', (e) => { 
    if (keys.hasOwnProperty(e.key)) keys[e.key] = true; 
});
window.addEventListener('keyup', (e) => { 
    if (keys.hasOwnProperty(e.key)) keys[e.key] = false; 
});

// Handle window resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

function update() {
    // Move the player based on active keys
    if (keys.w || keys.ArrowUp) player.y -= player.speed;
    if (keys.s || keys.ArrowDown) player.y += player.speed;
    if (keys.a || keys.ArrowLeft) player.x -= player.speed;
    if (keys.d || keys.ArrowRight) player.x += player.speed;

    // Collision detection: keep the player inside the canvas bounds
    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function draw() {
    // 1. Clear the previous frame (Deep space background)
    ctx.fillStyle = '#0b0c10';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw the player
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function gameLoop() {
    update(); // Calculate new positions
    draw();   // Render the visuals
    requestAnimationFrame(gameLoop); // Call the loop again for the next frame
}

// Start the engine
gameLoop();