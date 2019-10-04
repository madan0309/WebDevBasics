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
    constructor(name, children) {
        this.name = name;
        this.children = children;
    }
}

let tc1 = new TestCase("TestCase 1", []);
let tc2 = new TestCase("TestCase 2", []);
let tc3 = new TestCase("TestCase 3", []);
let tc4 = new TestCase("TestCase 4", []);
let tc5 = new TestCase("TestCase 5", []);

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

function expandFolder(root) {
    let newUL = document.createElement("ul");
    newUL.classList = "list-group-item";
    newUL.setAttribute('data-toggle', "collapse");
    // newUL.setAttribute('aria-controls', "collapseExample");
    // newUL.setAttribute('href', "collapseExample");
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
            newNode = document.createElement("li");
            newNode.setAttribute('id', "collapseExample");
            newNode.setAttribute('class', "list-group-item");
            // newNode.classList = "collapseExample";
            newNode.innerHTML = `<i class="fas fa-caret-right"></i><span>${element.name}</span>`;
        }
        newUL.appendChild(newNode);
    })
    return newUL;
}

function expandTestCase(testCase) {

}

function expandFileSystem(root) {
    root.children.forEach(folder => {
        let currentFolder = "";
    });
}
treeNode.appendChild(expandFolder(root));