//7 SEG CREDIT http://www.3quarks.com/en/SegmentDisplay/#sourceCode

var timeDisplay = new SegmentDisplay("timeDisplay");
var homeDisplay = new SegmentDisplay("homeDisplay");
var awayDisplay = new SegmentDisplay("awayDisplay");

function resize(){
  let timeEl = document.getElementById('timeDisplay');
  timeEl.width = window.innerWidth * 0.432;
  timeEl.height = window.innerHeight * 0.25;
  timeEl.style.width = 'unset';
  timeEl.style.height = 'unset';
  timeDisplay.pattern         = "##:##";
  timeDisplay.displayAngle    = 0;
  timeDisplay.digitHeight     = 20;
  timeDisplay.digitWidth      = 12;
  timeDisplay.digitDistance   = 2.5;
  timeDisplay.segmentWidth    = 2;
  timeDisplay.segmentDistance = 0.3;
  timeDisplay.segmentCount    = 7;
  timeDisplay.cornerType      = 1;
  timeDisplay.colorOn         = "#ed903b";
  timeDisplay.colorOff        = "#202020";
  timeDisplay.draw();

  let awayEl = document.getElementById('awayDisplay');
  awayEl.width = window.innerWidth * 0.27;
  awayEl.height = window.innerHeight * 0.37;
  awayEl.style.width = 'unset';
  awayEl.style.height = 'unset';
  awayDisplay.pattern         = "##";
  awayDisplay.displayAngle    = 0;
  awayDisplay.digitHeight     = 20;
  awayDisplay.digitWidth      = 12;
  awayDisplay.digitDistance   = 2.5;
  awayDisplay.segmentWidth    = 2;
  awayDisplay.segmentDistance = 0.3;
  awayDisplay.segmentCount    = 7;
  awayDisplay.cornerType      = 1;
  awayDisplay.colorOn         = "#de3f25";
  awayDisplay.colorOff        = "#202020";
  awayDisplay.draw();

  let homeEl = document.getElementById('homeDisplay');
  homeEl.width = window.innerWidth * 0.27;
  homeEl.height = window.innerHeight * 0.37;
  homeEl.style.width = 'unset';
  homeEl.style.height = 'unset';
  homeDisplay.pattern         = "##";
  homeDisplay.displayAngle    = 0;
  homeDisplay.digitHeight     = 20;
  homeDisplay.digitWidth      = 12;
  homeDisplay.digitDistance   = 2.5;
  homeDisplay.segmentWidth    = 2;
  homeDisplay.segmentDistance = 0.3;
  homeDisplay.segmentCount    = 7;
  homeDisplay.cornerType      = 1;
  homeDisplay.colorOn         = "#de3f25";
  homeDisplay.colorOff        = "#202020";
  homeDisplay.draw();
}
timeDisplay.setValue('10:00');
awayDisplay.setValue('00');
homeDisplay.setValue('00');

function hideSettings(){
  document.getElementById('settings').style.display = 'none';
}
function showSettings(){
  document.getElementById('settings').style.display = 'unset';
}

var awayScore = 0;
var homeScore = 0;
var timeValue = 600; //sec
var timerOn = false;
function onload(){
  let testers = document.getElementsByClassName('testButton');
  let pairs = document.getElementsByClassName('pairButton');
  for(let i = 0; i < testers.length; i++){
    let button = testers[i], pair = pairs[i];
    button.addEventListener('click',e => {
      handleOpperation(i);
    });
    pair.addEventListener('click',e => {
      console.log(pair.id);
    });
  }
  resetClock();
  redrawTime();
  setInterval(()=>{
    if(timerOn){
      if(timeValue == 1){
        sound(0);
        resetClock();
        timerOn = false;
      }
      else{
        timeValue--;
        redrawTime();
      }
    }
  },1000);
}
function handleOpperation(i){
  switch(i){
    case 0:
    case 1:
    case 2:
      incrament(1,i+1);
      break;
    case 3:
      set0(1);
      break;
    case 4:
    case 5:
    case 6:
      incrament(0,i-3);
      break;
    case 7:
      set0(0);
      break;
    case 8:
      startClock();
      break;
    case 9:
      pauseClock();
      break;
    case 10:
      resetClock();
      break;
    case 11:
      sound(0);
      break;
    case 12:
      sound(1);
      break;
    case 13:
      sound(parseInt(Math.random(0,4)));
      break;
  }
}
//team 1 = away, team 0 = home
function incrament(team,value){
  console.log(team,value);
  if(team == 1){
    awayScore+=value;
  }
  else{
    homeScore+=value;
  }
  redrawScores();
}
function set0(team){
  if(team == 1){
    awayScore = 0;
  }
  else{
    homeScore = 0;
  }
  redrawScores();
}
function redrawScores(){
  awayDisplay.setValue(awayScore>99?'99':(awayScore<10?(' '+awayScore):(awayScore+'')));
  homeDisplay.setValue(homeScore>99?'99':(homeScore<10?(' '+homeScore):(homeScore+'')));
}
function startClock(){
  console.log('starting');
  timerOn = true;
}
function pauseClock(){
  console.log('pauseing');
  timerOn = false;
}
function resetClock(){
  console.log('reseting');
  timeValue = parseInt(document.getElementById('clockTime').value);
  timeValue = (timeValue>99?5940:(timeValue<1?60:timeValue*60));
  timerOn = false;
  redrawTime();
}
function redrawTime(){
  let min = Math.floor(parseInt(timeValue)/60);
  let sec = parseInt(timeValue) % 60;
  if(min>99){
    min='99';
    sec='59';
  }else{
    sec = (sec<10?('0'+sec):(sec+''));
    min = (min<10?(' '+min):(min+''));
  }
  timeDisplay.setValue(min+':'+sec);
}
function sound(i){
  console.log('playing sound',i);
  if(i == 0){
    document.getElementById('buzzer').play();
  }
}

function clickPortCon(){
  openPort();
}
async function openPort(){
  var port = await navigator.serial.requestPort();
  await port.open({ baudRate: 9600 });
  const reader = port.readable.getReader();
  // Listen to data coming from the serial device.
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      reader.releaseLock();
      break;
    }
    console.log(value);
  }
}
