const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// 1. Create the map image object
const mapImage = new Image();
// Replace this with the exact folder path from your unzipped folder! 
// Example: 'Maps/TheSkeld.png' or whatever the file is named.
mapImage.src = 'https://raw.githubusercontent.com/AlvajoyAsante/among-us-assets/main/Maps/The%20Skeld/The_Skeld_map.png'; 

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
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
    if (keys.w || keys.ArrowUp) player.y -= player.speed;
    if (keys.s || keys.ArrowDown) player.y += player.speed;
    if (keys.a || keys.ArrowLeft) player.x -= player.speed;
    if (keys.d || keys.ArrowRight) player.x += player.speed;

    if (player.x < 0) player.x = 0;
    if (player.y < 0) player.y = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
}

function draw() {
    // 2. Clear the background first
    ctx.fillStyle = '#0b0c10';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 3. Draw the map ONLY if it has finished loading from your folder
    if (mapImage.complete) {
        // This draws the map starting at the top-left corner (0, 0)
        ctx.drawImage(mapImage, 0, 0); 
    }

    // 4. Draw the player on top
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

gameLoop();
