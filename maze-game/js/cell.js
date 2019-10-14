class Cell {
    constructor(top, right, bottom, left) {
        this.top = top || false;
        this.right = right || false;
        this.bottom = bottom || false;
        this.left = left || false;
        this.x = undefined;
        this.y = undefined;
    };
};