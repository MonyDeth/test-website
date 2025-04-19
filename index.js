export function initCanvasGrid() {
    const container = document.querySelector(".events-bg");
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    container.appendChild(canvas);

    let cols, rows, cellSize, grid, lastHoveredIndex = null;
    const colors = ["#EC973C", "#D86C36", "#AB2340", "#812A61"];

    function setupGrid() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;

        const isMobile = window.innerWidth < 768;
        cols = isMobile ? 7 : 30;
        cellSize = canvas.width / cols;
        rows = Math.ceil(canvas.height / cellSize);

        grid = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                grid.push({
                    x: x * cellSize,
                    y: y * cellSize,
                    color: "#3F031E",
                    alpha: 1
                });
            }
        }
    }

    function drawGrid() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        grid.forEach(cell => {
            ctx.fillStyle = cell.color;
            ctx.globalAlpha = cell.alpha;
            ctx.fillRect(cell.x, cell.y, cellSize, cellSize);

            ctx.globalAlpha = 1;
            ctx.strokeStyle = "#590E30";
            ctx.lineWidth = 2;
            ctx.strokeRect(cell.x, cell.y, cellSize, cellSize);
        });

        requestAnimationFrame(drawGrid);
    }

    function handleMouseMove(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        let hoveredIndex = grid.findIndex(cell =>
            mouseX >= cell.x && mouseX < cell.x + cellSize &&
            mouseY >= cell.y && mouseY < cell.y + cellSize
        );

        if (hoveredIndex !== -1 && hoveredIndex !== lastHoveredIndex) {
            let cell = grid[hoveredIndex];
            cell.color = colors[Math.floor(Math.random() * colors.length)];

            gsap.to(cell, { alpha: 1, duration: 0.1 });
            gsap.to(cell, { alpha: 0, duration: 1, delay: 0.5 });

            lastHoveredIndex = hoveredIndex;
        }
    }

    function handleClick(event) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        let clickedIndex = grid.findIndex(cell =>
            mouseX >= cell.x && mouseX < cell.x + cellSize &&
            mouseY >= cell.y && mouseY < cell.y + cellSize
        );

        if (clickedIndex !== -1) {
            triggerTileExplosion(clickedIndex);
        }
    }

    function triggerTileExplosion(centerIndex) {
        let centerCell = grid[centerIndex];
        let explosionColors = colors[Math.floor(Math.random() * colors.length)];

        let radius = Math.floor(Math.random() * 2) + 1; // Randomly 1 or 2
        let affectedTiles = [];

        // Get tiles in a circular pattern
        for (let dy = -radius; dy <= radius; dy++) {
            for (let dx = -radius; dx <= radius; dx++) {
                let x = (centerCell.x / cellSize) + dx;
                let y = (centerCell.y / cellSize) + dy;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance <= radius) {
                    let tileIndex = grid.findIndex(cell =>
                        Math.floor(cell.x / cellSize) === x && Math.floor(cell.y / cellSize) === y
                    );

                    if (tileIndex !== -1) {
                        affectedTiles.push({ index: tileIndex, delay: distance * 0.1 });
                    }
                }
            }
        }

        // Animate each tile in sequence
        affectedTiles.forEach(({ index, delay }) => {
            let cell = grid[index];

            gsap.to(cell, {
                color: explosionColors,
                alpha: 1,
                duration: 0.2,
                delay: delay
            });

            gsap.to(cell, {
                alpha: 0,
                duration: 1,
                delay: delay + 0.5
            });
        });
    }

    function triggerRandomExplosion() {
        const randomIndex = Math.floor(Math.random() * grid.length);
        triggerTileExplosion(randomIndex);
    }

    window.addEventListener("resize", setupGrid);
    // canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("click", handleClick);

    setupGrid();
    drawGrid();

    // Start automatic explosions every 1.5 seconds
    setInterval(triggerRandomExplosion, 1500);
}
