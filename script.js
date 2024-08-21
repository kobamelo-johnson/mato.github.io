// script.js

const canvas = document.getElementById('floatingNodes');
const ctx = canvas.getContext('2d');
const nodes = [];
const numNodes = 50;
const nodeSize = 5; // Smaller size
const nodeColor = 'rgba(0, 255, 0, 0.6)'; // Slightly lighter green
const lineColor = 'rgba(0, 255, 0, 0.2)'; // Lighter line color
const lineWidth = 1; // Thinner lines
const flashFrequency = 0.05; // Increased frequency of flashes
const flashIntensity = 3; // Increased flash intensity
const flashDuration = 500; // Duration of flash in ms

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createNodes() {
    for (let i = 0; i < numNodes; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            isFlashing: Math.random() < flashFrequency, // Randomly set flashing state
            flashEndTime: Date.now() + (Math.random() * flashDuration) // Set end time for flash
        });
    }
}

function updateNodes() {
    for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Manage flashing state
        if (node.isFlashing) {
            if (Date.now() > node.flashEndTime) {
                node.isFlashing = false; // Stop flashing
            }
        } else if (Math.random() < flashFrequency) {
            node.isFlashing = true;
            node.flashEndTime = Date.now() + flashDuration; // Set new flash end time
        }
    }
}

function drawNodes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw glowing nodes
    for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
        ctx.fillStyle = node.isFlashing ? 'rgba(0, 255, 0, 1)' : nodeColor; // Bright flash effect
        ctx.shadowColor = node.isFlashing ? 'rgba(0, 255, 0, 1)' : 'rgba(0, 255, 0, 0.6)';
        ctx.shadowBlur = node.isFlashing ? 150 : 30; // Increased blur during flash
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    // Draw glowing lines
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;
    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.beginPath();
                ctx.moveTo(nodes[i].x, nodes[i].y);
                ctx.lineTo(nodes[j].x, nodes[j].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    updateNodes();
    drawNodes();
    requestAnimationFrame(animate);
}

createNodes();
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
});

