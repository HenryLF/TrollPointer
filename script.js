const trollDiv = document.getElementById("troll");
const container = document.getElementById("container");

const mousePos = {
  x: undefined,
  y: undefined,
};
container.onmousemove = (e) => {
  mousePos.x = e.pageX;
  mousePos.y = e.pageY;
};
trollDiv.onmouseover = () => {
  trollDiv.src = "./trolling_face.png";
};
// trollDiv.onmouseleave = ()=>{
//     trollDiv.src = "./trollface.png";
// }
const randomSeed = Math.random();
const trollIdleSpeed = 5;
const trollRunSpeed = 10;

let trollDir = {
  x: Math.cos(randomSeed),
  y: Math.sin(randomSeed),
};

function mouseDistance(rect) {
    let x = rect.left + rect.width / 2;
    let y = rect.top + rect.height / 2;
    return { x: x - mousePos.x, y: y - mousePos.y };
  }
  

function getTrollDir() {
  let trollRect = trollDiv.getBoundingClientRect();
  let areaRect = container.getBoundingClientRect();
  let vect = mouseDistance(trollRect);
  let dist = Math.hypot(vect.x, vect.y);
  let trollSpeed = trollIdleSpeed;
  if (dist < trollRect.width) {
    trollDir = {
      x: vect.x / dist,
      y: vect.y / dist,
    };
    trollSpeed = Math.pow(trollRect.width - dist, 1);
    trollDiv.className = "running";
    container.style.background = "#CE0E0E4D"
  } else {
    trollDiv.className ="";
    container.style.background = "transparent"
  }
  //get bound
  if (
    trollRect.top + trollSpeed * trollDir.y < areaRect.top ||
    trollRect.bottom + trollSpeed * trollDir.y > areaRect.bottom
  ) {
    trollDir = { x: trollDir.x, y: -trollDir.y };
  }
  if (
    trollRect.left + trollSpeed * trollDir.x < areaRect.left ||
    trollRect.right + trollSpeed * trollDir.x > areaRect.right
  ) {
    trollDir = { x: -trollDir.x, y: trollDir.y };
  }
  return trollSpeed
}

function moveTroll() {
  let trollSpeed = getTrollDir();
  console.log(trollSpeed)
  trollDiv.style.left = `${Math.round(
    trollDiv.offsetLeft + trollSpeed * trollDir.x
  )}px`;
  trollDiv.style.top = `${Math.round(
    trollDiv.offsetTop+ trollSpeed * trollDir.y
  )}px`;
}


let raf;
function loop() {
  moveTroll();
  raf = requestAnimationFrame(loop);
}
loop();
