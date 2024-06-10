// const pencil = document.querySelector("#pencil");
// const eraser = document.querySelector("#eraser");
// const sticky = document.querySelector("#sticky");
// const upload = document.querySelector("#upload");
// const download = document.querySelector("#download");
// const redo = document.querySelector("#redo");
// const undo = document.querySelector("#undo");
// const canvas = document.querySelector("#canvas");
const toolbar = document.querySelector(".toolbar");
/**Tool selector logic */
let toolArray = document.querySelectorAll(".tool");
let tool = canvas.getContext("2d");
console.log(tool);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

for (let i = 0; i < toolArray.length; i++) {
  toolArray[i].addEventListener("click", () => {
    let toolA = toolArray[i].id; // Using e.target.id to get the id of the clicked element

    if (toolA === "pencil") {
      toolA = "pencil";
      tool.strokeStyle = "red";
      // Set other tool properties for pencil
    } else if (toolA === "eraser") {
      tool.strokeStyle = "white";
      tool.lineWidth = 5;
      // Set other tool properties for eraser
    } else if (toolA === "redo") {
      // Implement redo functionality
      toolA = "redo";
      redoFunction();
    } else if (toolA === "undo") {
      // Implement undo functionality
      toolA = "undo";
      undoFunction();
      console.log("clicked on undo");
    } else if (toolA === "sticky") {
      createSticky();
      // Implement sticky note functionality
      toolA = "sticky";
    } else if (toolA === "download") {
      // Implement download functionality
      toolA = "download";
      downloadFile();
    } else if (toolA === "upload") {
      // Implement upload functionality
      toolA = "upload";
      console.log("upload clicked");
      uploadFile();
    }
  });
}

//Draw something on canvas:-

// //Starting point of drawing:-
// tool.beginPath();

// //Moove the pencil to a drwaing:-
// tool.moveTo(150, 50);
// //move the epncil to point:-
// tool.lineTo(300, 150);
// tool.moveTo(300, 50);
// tool.lineTo(100, 450);
// tool.stroke();
// //color change:-
// tool.strokeStyle = "red";
// tool.lineWidth = 4;
// tool.closePath();
// tool.beginPath();
// tool.moveTo(300, 150);
// tool.lineTo(100, 350);
// tool.stroke();

//pencil implement:-
//move, ncanvas -> press
// move, canvas -> left
let drawingFlag = false;
let undoStack = [];
let redoStack = [];
//*****Drawing Something On Cnavas */
canvas.addEventListener("mousedown", (e) => {
  let sideX = e.clientX;
  let sideY = e.clientY;
  let h = getDetail();

  tool.beginPath();
  tool.moveTo(sideX, sideY - h);
  drawingFlag = true;
  console.log("mouse down", e);
  let pointDesc = {
    x: sideX,
    y: sideY - h,
    desc: "md",
  };
  //add last
  undoStack.push(pointDesc);
});

canvas.addEventListener("mouseup", (e) => {
  drawingFlag = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (drawingFlag == false) {
    return;
  }
  let sideX = e.clientX;
  let sideY = e.clientY;
  let h = getDetail();
  tool.lineTo(sideX, sideY - h);
  tool.stroke();
  console.log("mouse up", e);
  console.log("X", e.clientX);
  console.log("Y", e.clientY);
  let pointDesc = {
    x: sideX,
    y: sideY - h,
    desc: "mm",
  };
  undoStack.push(pointDesc);
});

function getDetail() {
  let height = toolbar.getBoundingClientRect().height;
  console.log(toolbar.getBoundingClientRect());
  return height;
}

//craete SticyFunction:-
//static version
//how it will added to your ui
//how the functionality add:-

function createOuter() {
  // Create elements
  let stickyDiv = document.createElement("div");
  let navDiv = document.createElement("div");
  let closeDiv = document.createElement("div");
  let minimizeDiv = document.createElement("div");

  // Set attributes
  stickyDiv.classList.add("sticky");
  navDiv.classList.add("nav");
  closeDiv.classList.add("close");
  minimizeDiv.classList.add("minimize");

  // Set inner text for close and minimize divs
  closeDiv.textContent = "X";
  minimizeDiv.textContent = "-";

  // Build structure
  stickyDiv.appendChild(navDiv);
  // stickyDiv.appendChild(textDiv);
  navDiv.appendChild(closeDiv);
  navDiv.appendChild(minimizeDiv);

  // Append to body

  closeDiv.addEventListener("click", () => {
    stickyDiv.remove();
  });

  let isminimized = false;
  minimizeDiv.addEventListener("click", () => {
    textDiv.style.display = isminimized ? "block" : "none";
    isminimized = !isminimized;

    if (isminimized) {
      stickyDiv.style.height = "20%";
    } else {
      stickyDiv.style.height = "100%";
    }
  });

  //navbar -> mouse down, mouse up, mouse mousemove
  let initialX = null;
  let initialY = null;
  let isStickyDown = false;

  // added move sticky logic
  navDiv.addEventListener("mousedown", function (e) {
    initialX = e.clientX;
    initialY = e.clientY;
    isStickyDown = true;
  });

  navDiv.addEventListener("mousemove", function (e) {
    if (isStickyDown == true) {
      let finalX = e.clientX;
      let finalY = e.clientY;

      let diffX = finalX - initialX;
      let diffY = finalY - initialY;

      let { top, left } = stickyDiv.getBoundingClientRect();

      stickyDiv.style.top = top + diffY + "px";
      stickyDiv.style.left = left + diffX + "px";

      initialX = finalX;
      initialY = finalY;
    }
  });
  // sticky => mouseup
  navDiv.addEventListener("mouseup", function () {
    isStickyDown = false;
  });
  // pointer => moved off sticky
  navDiv.addEventListener("mouseleave", function () {
    isStickyDown = false;
  });

  document.body.appendChild(stickyDiv);
  return stickyDiv;
}
function createSticky() {
  let stickydiv = createOuter();
  let textDiv = document.createElement("textarea");

  textDiv.setAttribute("id", "text-area");
  stickydiv.appendChild(textDiv);
}

function uploadFile() {
  // //create input tag with file type:-(hide)
  // //click on image icon4//file read
  // input.click();
  // input.addEventListener("change", () => {
  //   console.log(input.files);
  //   let data = input.files[0];
  //   //add the ui:-

  //   let img = document.createElement("img");
  //   let url = URL.createObjectURL(data);
  //   img.src = url;
  //   img.setAttribute("class", "upload-img");

  //   //add to body
  //   let stickydiv = createOuter();
  //   stickydiv.appendChild(img);
  // });

  // console.log("upload file");

  // Create input element with file type and hide it
  let input = document.createElement("input");
  input.type = "file";
  input.style.display = "none";
  document.body.appendChild(input);

  // Trigger click on the input element
  input.click();

  // Event listener for file change
  input.addEventListener("change", () => {
    console.log(input.files);
    let data = input.files[0];

    // Create image element
    let img = document.createElement("img");
    let url = URL.createObjectURL(data);
    img.src = url;
    img.setAttribute("class", "upload-img");

    // Add image to body
    let stickydiv = createOuter();
    stickydiv.appendChild(img);
  });

  console.log("upload file");
}

function downloadFile() {
  //anchor button:-
  let anchor = document.createElement("a");
  anchor.download = "file.png";
  //href canvas->url
  let url = canvas.toDataURL("image/jpeg:base64");
  anchor.href = url;
  //anchor click:-
  anchor.click();
  //anchor remove:-
  anchor.remove();
  //download:-
}

//undo function:-
function undoFunction() {
  if (undoStack.length > 0) {
    tool.clearRect(0, 0, canvas.width, canvas.height);

    //last removal:-
    redoStack.push(undoStack.pop());

    // redraw:-
    for (let i = 0; i < undoStack.length; i++) {
      let { x, y, desc } = undoStack[i];
      if (desc == "md") {
        tool.beginPath();
        tool.moveTo(x, y);
      } else if (desc == "mm") {
        tool.lineTo(x, y);
        tool.stroke();
      }
    }
  }
}

function redoFunction() {
  if (redoStack.length > 1) {
    tool.clearRect(0, 0, canvas.width, canvas.height);
    undoStack.push(redoStack.pop());
    // redraw:-
    for (let i = 0; i < undoStack.length; i++) {
      let { x, y, desc } = undoStack[i];
      if (desc == "md") {
        tool.beginPath();
        tool.moveTo(x, y);
      } else if (desc == "mm") {
        tool.lineTo(x, y);
        tool.stroke();
      }
    }
  }
}
