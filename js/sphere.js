const container = document.getElementById("sphereContainer");

/* ---------- THREE SETUP ---------- */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
camera.position.z = 420;

const renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
container.appendChild(renderer.domElement);

/* ---------- PARTICLES ---------- */
const group = new THREE.Group();
scene.add(group);

const COUNT = 900;
const radius = 160;
const particles = [];

const texCanvas = document.createElement("canvas");
texCanvas.width = texCanvas.height = 64;
const tctx = texCanvas.getContext("2d");
tctx.textAlign = "center";
tctx.textBaseline = "middle";
tctx.font = "32px monospace";

function makeTexture(char){
  tctx.clearRect(0,0,64,64);
  tctx.fillStyle="#6bff8e";
  tctx.fillText(char,32,32);
  return new THREE.CanvasTexture(texCanvas);
}

for(let i=0;i<COUNT;i++){
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: makeTexture("</>"), transparent:true })
  );
  sprite.scale.set(8,8,1);
  sprite.userData = {
    target: new THREE.Vector3(),
    velocity: new THREE.Vector3()
  };
  group.add(sprite);
  particles.push(sprite);
}

/* ---------- SHAPES ---------- */
function sphereShape(){
  return particles.map(()=> {
    const t=Math.random()*Math.PI*2;
    const p=Math.acos(2*Math.random()-1);
    return new THREE.Vector3(
      Math.sin(p)*Math.cos(t)*radius,
      Math.sin(p)*Math.sin(t)*radius,
      Math.cos(p)*radius
    );
  });
}

function textShape(text){
  const padding = 40;
  let fontSize = 120;

  // -------- SPLIT INTO LINES --------
  let lines = [text];

  // split long phrases into two lines
  if (text.includes(" ")) {
    const words = text.split(" ");
    if (words.length >= 2 && text.length > 8) {
      const mid = Math.ceil(words.length / 2);
      lines = [
        words.slice(0, mid).join(" "),
        words.slice(mid).join(" ")
      ];
    }
  }

  // -------- MEASURE TEXT --------
  const measureCanvas = document.createElement("canvas");
  const mctx = measureCanvas.getContext("2d");
  mctx.font = `bold ${fontSize}px Poppins`;

  let maxLineWidth = Math.max(
    ...lines.map(line => mctx.measureText(line).width)
  );

  const maxWidth = 520;
  if (maxLineWidth > maxWidth) {
    fontSize = Math.floor(fontSize * (maxWidth / maxLineWidth));
    mctx.font = `bold ${fontSize}px Poppins`;
    maxLineWidth = Math.max(
      ...lines.map(line => mctx.measureText(line).width)
    );
  }

  const lineHeight = fontSize * 1.2;
  const canvasWidth = Math.ceil(maxLineWidth + padding * 2);
  const canvasHeight = Math.ceil(lines.length * lineHeight + padding * 2);

  // -------- DRAW TEXT --------
  const c = document.createElement("canvas");
  c.width = canvasWidth;
  c.height = canvasHeight;
  const ctx = c.getContext("2d");

  ctx.fillStyle = "white";
  ctx.font = `bold ${fontSize}px Poppins`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  lines.forEach((line, i) => {
    const y =
      canvasHeight / 2 -
      (lines.length - 1) * lineHeight / 2 +
      i * lineHeight;

    ctx.fillText(line, canvasWidth / 2, y);
  });

  // -------- EXTRACT POINTS --------
  const img = ctx.getImageData(0, 0, canvasWidth, canvasHeight).data;
  const points = [];

  for (let y = 0; y < canvasHeight; y += 6) {
    for (let x = 0; x < canvasWidth; x += 6) {
      const i = (y * canvasWidth + x) * 4;
      if (img[i + 3] > 128) {
        points.push(
          new THREE.Vector3(
            x - canvasWidth / 2,
            canvasHeight / 2 - y,
            0
          )
        );
      }
    }
  }

  // -------- SCALE TO FIT SPHERE --------
  const box = new THREE.Box3().setFromPoints(points);
  const size = new THREE.Vector3();
  box.getSize(size);

  const maxVisualSize = radius * 1.4;
  const scale = Math.min(
    maxVisualSize / size.x,
    maxVisualSize / size.y
  );

  points.forEach(p => p.multiplyScalar(scale));

  return points;
}



/* ---------- SEQUENCE ---------- */
const sequence=[
  {t:"sphere"},
  {t:"text",v:"CTC"},
  {t:"sphere"},
  {t:"text",v:"AI / ML"},
  {t:"sphere"},
  {t:"text",v:"APP DEVELOPMENT"},
  {t:"sphere"},
  {t:"text",v:"WEB DEVELOPMENT"},
  {t:"sphere"},
  {t:"text",v:"CYBER SECURITY"},
  {t:"sphere"},
  {t:"text",v:"BLOCK CHAIN"},
  {t:"sphere"},
  {t:"text",v:"DEVOPS"},
  {t:"sphere"}
];

let idx=0;
let isText=false;

function applyShape(entry){
  const pts = entry.t==="sphere" ? sphereShape() : textShape(entry.v);
  isText = entry.t==="text";
  if(isText) group.rotation.y = 0;

  particles.forEach((p,i)=>{
    p.userData.target.copy(pts[i % pts.length]);
  });
}

applyShape(sequence[0]);
setInterval(()=>{
  idx=(idx+1)%sequence.length;
  applyShape(sequence[idx]);
},6000);

/* ---------- INTERACTION ---------- */
let mouse=new THREE.Vector3(999,999,0);
container.addEventListener("mousemove",e=>{
  const r=container.getBoundingClientRect();
  mouse.x=((e.clientX-r.left)/r.width-0.5)*2;
  mouse.y=-((e.clientY-r.top)/r.height-0.5)*2;
});
container.addEventListener("mouseleave",()=>mouse.set(999,999,0));

/* ---------- ANIMATE ---------- */
function animate(){
  requestAnimationFrame(animate);

  if(!isText) group.rotation.y+=0.002;

  particles.forEach(p=>{
    const dir=p.position.clone().sub(mouse.clone().multiplyScalar(200));
    const d=dir.length();
    if(d<200){
      dir.normalize().multiplyScalar((1-d/200)*4);
      p.userData.velocity.add(dir);
    }
    p.userData.velocity.multiplyScalar(0.85);
    p.position.add(p.userData.velocity);
    p.position.lerp(p.userData.target,0.08);
  });

  renderer.render(scene,camera);
}
animate();

/* ---------- RESIZE ---------- */
window.addEventListener("resize",()=>{
  const w=container.clientWidth;
  const h=container.clientHeight;
  renderer.setSize(w,h);
  camera.aspect=w/h;
  camera.updateProjectionMatrix();
});