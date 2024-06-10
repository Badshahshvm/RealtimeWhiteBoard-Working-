const pencil = document.querySelector("#pencil");
const eraser = document.querySelector("#eraser");
const sticky = document.querySelector("#sticky");
const upload = document.querySelector("#upload");
const download = document.querySelector("#download");
const redo = document.querySelector("#redo");
const undo = document.querySelector("#undo");
const canvas = document.querySelector("#canvas");
const toolbar = document.querySelector(".toolbar");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//Draw something on canvas:-

let tool = canvas.getContext("2d");
console.log(tool);

let drawingFlag = false;
canvas.addEventListener("mousedown", (e) => {
  let sideX = e.clientX;
  let sideY = e.clientY;
  let h = getDetail();

  tool.beginPath();
  tool.moveTo(sideX, sideY - h);
  drawingFlag = true;
  console.log("mouse down", e);
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
});

function getDetail() {
  let height = toolbar.getBoundingClientRect().height;
  console.log(toolbar.getBoundingClientRect());
  return height;
}
