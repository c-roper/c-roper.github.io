// Constants for canvas dimensions
function setupCanvas() {
    const canvas = d3.select("canvas");
    const width = window.innerWidth;
    const height = window.innerHeight; // Ensures the canvas fills the height of the viewport

    canvas.attr("width", width)
          .attr("height", height)
          .style("background-color", "#f0f8ff");

    const context = canvas.node().getContext("2d");
    return { canvas, context, width, height };
}

// Seeded random number generator function
function seededRandom(seed) {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

// Initialize points for Delaunay triangulation
function initializePoints(width, height, numPoints = 50, seed = 15) {
    return d3.range(numPoints).map((d, i) => {
        return {
            x: seededRandom(seed + i) * width,
            y: seededRandom(seed + i + numPoints) * height,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2
        };
    });
}

// Create a Delaunay triangulation from the points
function createDelaunay(points) {
    return d3.Delaunay.from(points.map(d => [d.x, d.y]));
}

// Draw the Delaunay triangulation
function drawTriangles(context, delaunay, points) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    context.beginPath();
    delaunay.render(context);
    context.strokeStyle = "#ccc";
    context.stroke();

    context.beginPath();
    points.forEach(point => {
        context.moveTo(point.x + 5, point.y);
        context.arc(point.x, point.y, 5, 0, 2 * Math.PI);
    });
    context.fillStyle = "#7baedc";
    context.fill();
}

// Update the position of the points and redraw
function updatePoints(points, delaunay, context) {
    points.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;

        // Reflect off the edges
        if (point.x < 0 || point.x > context.canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > context.canvas.height) point.vy *= -1;
    });

    delaunay = d3.Delaunay.from(points.map(d => [d.x, d.y]));
    drawTriangles(context, delaunay, points);
}

// Handle mouse move to influence the points
function setupInteractions(canvas, points, delaunay, context) {
    canvas.on("mousemove", function(event) {
        const [mx, my] = d3.pointer(event);
        const avoidanceRadius = 100;

        points.forEach(point => {
            const dx = point.x - mx;
            const dy = point.y - my;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < avoidanceRadius) {
                const angle = Math.atan2(dy, dx);
                const pushDistance = avoidanceRadius - distance;
                point.x += Math.cos(angle) * pushDistance * 0.1;
                point.y += Math.sin(angle) * pushDistance * 0.1;
            }
        });

        drawTriangles(context, delaunay, points);
    });
}

// Initialize and start animation
function initialize() {
    const { canvas, context, width, height } = setupCanvas();
    const points = initializePoints(width, height);
    let delaunay = createDelaunay(points);

    setupInteractions(canvas, points, delaunay, context);

    function animate() {
        updatePoints(points, delaunay, context);
        requestAnimationFrame(animate);
    }

    animate();
}

// Form handling functionality
document.addEventListener('DOMContentLoaded', () => {
    initialize();
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        var formData = new FormData(this);

        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert('Thank you for your message!');
                this.reset();
            } else {
                alert('Oops! There was a problem with your submission. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Oops! There was a problem with your submission. Please try again.');
        });
    });
});
