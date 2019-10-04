class Folder {
    constructor(name, children) {
        this.name = name;
        this.children = children;
    }
}

class TestCase {
    constructor(name, children) {
        this.name = name;
        this.children = children;
    }
}

class TestPoint {
    constructor(name) {
        this.name = name;
    }
}

let tp1 = new TestPoint("test point 1");
let tp2 = new TestPoint("test point 2");
let tp3 = new TestPoint("test point 3");
let tp4 = new TestPoint("test point 4");
let tp5 = new TestPoint("test point 5");

let tc1 = new TestCase("TestCase 1", [tp1, tp2]);
let tc2 = new TestCase("TestCase 2", [tp3, tp4, tp1]);
let tc3 = new TestCase("TestCase 3", [tp2, tp3]);
let tc4 = new TestCase("TestCase 4", [tp3, tp4, tp1]);
let tc5 = new TestCase("TestCase 5", [tp3, tp4, tp1]);

let f1 = new Folder("Folder #1", [tc1, tc2, tc3, tc4]);
let f2 = new Folder("Folder #2", [tc1, tc2, tc3, tc4]);
let f3 = new Folder("Folder #3", [tc1, tc2, tc3, tc4]);
let f4 = new Folder("Folder #4", [tc1, tc2, tc3, tc4]);
let f5 = new Folder("Folder #5", [tc1, tc2, tc3, tc4]);
let f6 = new Folder("Folder #6", [f5, f4, tc4]);
let root = new Folder("Root", [f1, f2, f3, f4, f5, f6]);

var treeNode = document.getElementById("tree-node");

function toggleList() {
    listItem = this.parentElement;
    let folderIcon = listItem.getElementsByTagName("i")[0];
    folderIcon.className = (folderIcon.className === "fas fa-folder-open") ?
                        "fas fa-folder-plus" : "fas fa-folder-open";
    childitems = listItem.children;
    for(i=1; i<childitems.length; i++) {
        childitems[i].style.display = (childitems[i].style.display === 'none') ? "" : 'none';
    }
};

function toggleTestCase() {
    testCase = this.parentElement;
    let icon = testCase.getElementsByTagName("i")[0];
    // icon.className = (icon.className === "fas fa-caret-right") ?
    //                     "fas fa-caret-down" : "fas fa-caret-right";
    icon.className = (icon.className === "fas fa-plus") ?
                        "fas fa-minus" : "fas fa-plus";
    childitems = testCase.children;
    for(i=1; i<childitems.length; i++) {
        childitems[i].style.display = (childitems[i].style.display === 'none') ? "" : 'none';
    }
};

function expandTestCase(testcase) {
    let newUL = document.createElement("ul");
    let newLabel = document.createElement("label");
    newUL.classList = "testcase";
    newLabel.onclick = toggleTestCase;
    newLabel.innerHTML = `<i class="fas fa-minus"></i><span>${testcase.name}</span>`;
    newUL.appendChild(newLabel);
    testcase.children.forEach(testpoint => {
        newNode = document.createElement("li");
        newNode.classList = "testpoint";
        newNode.innerHTML = `<i class="far fa-file-code"></i></i><span>${testpoint.name}</span>`;
        newUL.appendChild(newNode);
    });
    return newUL;
};

function expandFolder(root) {
    let newUL = document.createElement("ul");
    newUL.classList = "list-group folder";
    let newLabel = document.createElement("label");
    newLabel.onclick = toggleList;
    // newUL.addEventListener("click", toggleList, true);
    newLabel.innerHTML = `<i class="fas fa-folder-open"></i><span>${root.name}</span>`;
    newUL.appendChild(newLabel);
    // for each children
    root.children.forEach(element => {
        let newNode;
        // if it is folder should do recursive call
        if(element.constructor.name === "Folder") {
            newNode = expandFolder(element);
        } else {
            // if it is testCase
            newNode = expandTestCase(element);
        }
        newUL.appendChild(newNode);
    })
    return newUL;
};

function expandFileSystem(root) {
    root.children.forEach(folder => {
        let currentFolder = "";
    });
};
treeNode.appendChild(expandFolder(root));