document.addEventListener('DOMContentLoaded', function() {
    const nodesContainer = document.querySelector('.nodes');
    const numberOfNodes = 30;  // Increase this number to add more nodes

    for (let i = 0; i < numberOfNodes; i++) {
        const node = document.createElement('div');
        node.classList.add('node');
        nodesContainer.appendChild(node);
    }

    const nodes = document.querySelectorAll('.node');
    nodes.forEach(node => {
        const randomX = Math.floor(Math.random() * window.innerWidth);
        const randomY = Math.floor(Math.random() * window.innerHeight);
        const randomDuration = Math.random() * 10 + 5;  // Reduce this value for faster movement
        node.style.left = `${randomX}px`;
        node.style.top = `${randomY}px`;
        node.style.animationDuration = `${randomDuration}s`;
        const randomDirection = Math.random() < 0.5 ? 1 : -1;
        node.style.animationDirection = randomDirection === 1 ? 'normal' : 'reverse';
    });
});
