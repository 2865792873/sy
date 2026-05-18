
const map = L.map('map', {
  crs: L.CRS.Simple,
  minZoom: -1
});

const bounds = [[0,0],[1000,1800]];

const image = L.imageOverlay('map.jpg', bounds).addTo(map);

map.fitBounds(bounds);

const locations = {

  west:[450,120],
  south:[850,900],
  east:[780,1650],
  north:[120,980],

  sakura:[320,520],
  culture:[700,1450],
  lake:[500,700],
  wetland:[780,980]

};

const facilityData = [
  {
    name:"无障碍卫生间",
    coords:[680,1320],
    color:"red"
  },
  {
    name:"休息服务区",
    coords:[720,980],
    color:"green"
  },
  {
    name:"轮椅租借点",
    coords:[340,620],
    color:"blue"
  }
];

facilityData.forEach(item=>{

  const marker = L.circleMarker(item.coords,{
    radius:10,
    color:item.color,
    fillColor:item.color,
    fillOpacity:0.9
  }).addTo(map);

  marker.bindPopup(item.name);

});

let routeLine = null;

function generateRoute(){

  const start = document.getElementById("start").value;
  const end = document.getElementById("end").value;

  const startCoords = locations[start];
  const endCoords = locations[end];

  if(routeLine){
    map.removeLayer(routeLine);
  }

  const middle = [
    (startCoords[0] + endCoords[0]) / 2,
    (startCoords[1] + endCoords[1]) / 2 + 120
  ];

  routeLine = L.polyline(
    [startCoords, middle, endCoords],
    {
      color:"#1d6fe3",
      weight:8
    }
  ).addTo(map);

  map.fitBounds(routeLine.getBounds(),{
    padding:[50,50]
  });

  document.getElementById("routeInfo").innerHTML = `
    <strong>路线规划成功</strong><br><br>
    推荐模式：无障碍平缓路线<br>
    预计耗时：22分钟<br>
    沿途休息区：3处<br>
    无障碍卫生间：2处<br>
    当前路线已避开台阶与狭窄道路
  `;

}

function playVoice(){

  const text = "前方100米进入平缓步道，即将到达休息区。";

  const speech = new SpeechSynthesisUtterance(text);

  speech.lang = "zh-CN";
  speech.rate = 0.85;

  window.speechSynthesis.speak(speech);

}

function emergency(){

  alert("已向景区服务中心发送求助信息");

}

const modeButtons = document.querySelectorAll(".mode");

modeButtons.forEach(btn=>{
  btn.addEventListener("click",()=>{

    modeButtons.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");

  });
});
