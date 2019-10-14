// import { Cell } from "./cell.js";
class Maze {
    constructor(width, height, toughness) {
        this.width = width || 4;
        this.height = height || 4;
        this.toughness = toughness || 0.5;
        // this.maze = this._initializeMaze();
        // this._refineMaze();
        // this._blockEdges();
        this.maze = this._generateRandomMaze();
        this.drawMaze()
    }
    // initialize maze cells
    _initializeMaze() {
        let dummyMaze = new Array(this.width);
        let i = 0, j=0;
        for(i; i< this.width; i++) {
            dummyMaze[i] = new Array(this.height);
            for(j=0; j< this.height; j++) {
                dummyMaze[i][j] = new Cell();
                dummyMaze[i][j].x = i;
                dummyMaze[i][j].y = j;
            }
        }
        return dummyMaze;
    }

    //generate random maze
    _generateRandomMaze() {
        this.maze = this._initializeMaze();
        this._refineMaze();
        this._blockEdges();
        if(this.isMazeValid()) {
            return this.maze;
        } else {
            return this._generateRandomMaze();
        }
    }

    // generate paths
    // easy - 0.5
    // medium - 0.6
    // hard - 0.63
    _refineMaze() {
        let i = 0, j=0;
        for(i; i< this.width; i++) {
            for(j=0; j< this.height; j++) {
                // only update right and bottom of each cell
                // if true, passing is allowed
                if(Math.random() >= this.toughness) {
                    this.maze[i][j].right = true;
                    if(j+1 < this.height) {
                        this.maze[i][j+1].left = true;
                    }
                }
                if(Math.random() >= this.toughness) {
                    this.maze[i][j].bottom = true;
                    if(i+1 < this.width) {
                        this.maze[i+1][j].top = true;
                    }
                }
            }
        }
    }

    // generate random cell
    _generateRandomCell() {
        let tempCell = new Cell();
        for(let edge in tempCell) {
            if(Math.random() > 0.5) {
                tempCell[edge] = true;
            }
        }
        return tempCell;
    }

    // the edges of maze must be blocked
    _blockEdges() {
        let i=0, j=0;
        // horizontal edges; top and bottom
        for(i; i<this.height; i++) {
            this.maze[0][i].top = false;
            this.maze[this.width-1][i].bottom = false;
        }
        // vertical edges; left and right
        for(j=0; j<this.width; j++) {
            this.maze[j][0].left = false;
            this.maze[j][this.height-1].right = false;
        }
    }

    drawMaze() {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        let i = 0, j=0;
        ctx.lineCap = "square";
        let cellsize = canvas.width/this.width;
        ctx.beginPath();
        for(i; i< this.width; i++) {
            for(j=0; j< this.height; j++) {
                if(!this.maze[i][j].right) {
                    ctx.moveTo((j+1)*cellsize, (i)*cellsize);
                    ctx.lineTo((j+1)*cellsize, (i+1)*cellsize);
                    ctx.stroke();
                }
                if(!this.maze[i][j].bottom) {
                    ctx.moveTo((j)*cellsize, (i+1)*cellsize);
                    ctx.lineTo((j+1)*cellsize, (i+1)*cellsize);
                    ctx.stroke();
                }
            }
        }
    }

    // get neighbours
    _getNeighbors(cell) {
        let x = cell.x;
        let y = cell.y;
        let neighbours = [];
        if(cell.right == true) {
            neighbours.push(this.maze[x][y+1]);
        }
        if(cell.bottom == true) {
            neighbours.push(this.maze[x+1][y]);
        }
        if(cell.left == true) {
            neighbours.push(this.maze[x][y-1]);
        }
        if(cell.top == true) {
            neighbours.push(this.maze[x-1][y]);
        }
        return neighbours;
    }

    // check if it is valid maze
    isMazeValid() {
        let q = new Queue();
        q.put(this.maze[0][0]);
        let current = this.maze[0][0];
        let target = this.maze[this.width-1][this.height-1];
        
        while(!q.isEmpty() && current!==target) {
            current = q.get();
            current.visited = true;
            if(current === target) {
                return true;
            }
            this._getNeighbors(current).forEach( function(neighbor) {
                if(! neighbor.visited) {
                    q.put(neighbor);
                }
            })
        }
        if(q.isEmpty()) {
            return false;
        }
        return true;
    }
};

class Player {
    constructor(m, n) {
        this.width = m;
        this.height = n;
        this.x = 0;
        this.y = 0;
        this.setPlayer(0, 0);
        this._setTarget();
    }

    setPlayer(x, y) {
        let canvas = document.getElementById("myCanvas");
        let cellsize = canvas.width/this.width;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(this.y* cellsize +0.2*cellsize, this.x*cellsize + 0.2*cellsize, 
                            0.6*cellsize, 0.6*cellsize);

        this.x = x;
        this.y = y;
        let xoffset = (y + 0.5) * (cellsize);
        let yoffset = (x + 0.5) * (cellsize);

        
        ctx.beginPath();
        ctx.fillStyle = 'green';
        ctx.arc(xoffset, yoffset, cellsize/4, 0, 2 * Math.PI, true);
        ctx.fill();
        // ctx.lineWidth = 1;
        // ctx.strokeStyle = '#003300';
        // ctx.stroke();
    }

    _setTarget() {
        let canvas = document.getElementById("myCanvas");
        let ctx = canvas.getContext("2d");
        let cellsize = canvas.width/this.width;
        let xoffset = (this.width - 0.5) * (cellsize);
        let yoffset = (this.height - 0.5) * (cellsize);
        
        ctx.beginPath();
        ctx.fillStyle = 'red';
        ctx.arc(xoffset, yoffset, cellsize/4, 0, 2 * Math.PI, true);
        ctx.fill();
        // ctx.lineWidth = 1;
        // ctx.strokeStyle = '#003300';
        // ctx.stroke();
    }
}


class Cell {
    constructor(top, right, bottom, left) {
        this.top = top || false;
        this.right = right || false;
        this.bottom = bottom || false;
        this.left = left || false;
        this.visited = false;
    };
};

class Queue {
    constructor() {
        this.queue = [];
        this.size = 0;
    }

    put(key) {
        this.queue.push(key)
        this.size += 1;
        return key
    }

    get() {
        if(this.size) {
            let temp = this.queue.shift();
            this.size -= 1;
            return temp;
        }
    }

    isEmpty() {
        return (this.size===0);
    }
}

function setupTheGame() {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let level = document.getElementById("level").value;
    // hard - 15 x 15
    // medium - 10 x 10
    // easy - 6 x 6
    let mazeCategory  = {
        "1" : {
            "size" : 6,
            "boundaryprob": 0.5
        },
        "2" : {
            "size" : 10,
            "boundaryprob": 0.6
        },
        "3" : {
            "size" : 14,
            "boundaryprob": 0.60
        }
    }
    let size = mazeCategory[level].size;
    let prob = mazeCategory[level].boundaryprob;
    m = new Maze(size,size, prob);
    p = new Player(size, size);
}


window.onload = function() {
    setupTheGame();
    window.addEventListener('keydown', function(evt) {
        // Arrow UP
        if(evt.keyCode == 38) {
            if(m.maze[p.x][p.y].top) {
                p.setPlayer(p.x-1, p.y);
            }
        }
        // Arror RIGHT
        else if(evt.keyCode == 39) {
            if(m.maze[p.x][p.y].right) {
                p.setPlayer(p.x, p.y+1);
            }
        }
        // Arrow DOWN
        else if(evt.keyCode == 40) {
            if(m.maze[p.x][p.y].bottom) {
                p.setPlayer(p.x+1, p.y);
            }
        }
        // Arrow LEFT
        else if(evt.keyCode == 37) {
            if(m.maze[p.x][p.y].left) {
                p.setPlayer(p.x, p.y-1);
            }
        }
    })
    window.addEventListener('keyup', function(evt) {
        if(p.x == m.width-1 && p.y == m.height-1) {
            alert("CONGRATULATIONS");
            setupTheGame();
        }
    })
    let level = document.getElementById("level");
    level.onchange = function() {
        setupTheGame();
    }
}