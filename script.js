// A sample of raw image URLs from the GitHub repo you provided[cite: 1]
const assetUrls = [
    'https://raw.githubusercontent.com/AlvajoyAsante/among-us-assets/main/Accessories%20%26%20Pets/Astro-sharedassets0.assets-120.png',
    'https://raw.githubusercontent.com/AlvajoyAsante/among-us-assets/main/Accessories%20%26%20Pets/Capt-sharedassets0.assets-77.png',
    'https://raw.githubusercontent.com/AlvajoyAsante/among-us-assets/main/Accessories%20%26%20Pets/Archae-sharedassets0.assets-140.png'
];

const gameBoard = document.getElementById('game-board');

function spawnAsset() {
    const img = document.createElement('img');
    
    // Pick a random asset from the array
    const randomAsset = assetUrls[Math.floor(Math.random() * assetUrls.length)];
    img.src = randomAsset;
    img.classList.add('asset');

    // Calculate a random X and Y position on the screen
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    
    img.style.left = `${x}px`;
    img.style.top = `${y}px`;

    gameBoard.appendChild(img);
}

// Spawn 15 assets to start
for (let i = 0; i < 15; i++) {
    spawnAsset();
}
