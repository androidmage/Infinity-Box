let w = 800 + 1, h = 800 + 1;
let size = 20;
let cols = w / size, rows = h / size;
let socket = io();

let snake_x = cols / 2;
let snake_y = rows / 2;
let dir = 0;

function setup() {
    createCanvas(w, h);
    socket.on("change", function (data) {
       console.log(`New Dir: ${data['dir']}`);
       setDir(data['dir']);
    });
}

function draw() {
    background(0);
    stroke(0);
    for (let i = 0; i < cols; i++) {
        line(i * size, 0, i * size, height);
    }
    for (let j = 0; j < rows; j++) {
        line(0, j * size, width, j * size);
    }
    fill(255, 0 , 0);
    rect(snake_x * size, snake_y * size, size, size);

    if (frameCount % 8 === 0) {
        if (dir === 0) {
            // left
            snake_x--;
        } else if (dir === 1) {
            // right
            snake_x++;
        } else if (dir == 2) {
            // up
            snake_y--;
        } else if (dir == 3) {
            // down
            snake_y++;
        }
    }
    if (snake_x > rows) snake_x = 0;
    if (snake_x < 0) snake_x = rows;
    if (snake_y > cols) snake_y = 0;
    if (snake_y < 0) snake_y = cols;
}

function setDir(new_dir) {
    if (new_dir === 0 && dir !== 1) dir = new_dir;
    if (new_dir === 1 && dir !== 0) dir = new_dir;
    if (new_dir === 2 && dir !== 3) dir = new_dir;
    if (new_dir === 3 && dir !== 2) dir = new_dir;
}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        setDir(0);
    } else if (keyCode === RIGHT_ARROW) {
        setDir(1);
    } else if (keyCode === UP_ARROW) {
        setDir(2);
    } else if (keyCode === DOWN_ARROW) {
        setDir(3)
    }
}
