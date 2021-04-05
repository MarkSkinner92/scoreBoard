//7 SEG CREDIT http://www.3quarks.com/en/SegmentDisplay/#sourceCode

var settingsOpen = false;

var timeDisplay = new SegmentDisplay("timeDisplay");
var homeDisplay = new SegmentDisplay("homeDisplay");
var awayDisplay = new SegmentDisplay("awayDisplay");
let nrs = 2; //next random sound
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

function hideSettings(){
  document.getElementById('settings').style.display = 'none';
  writeCookies();
  settingsOpen=false;
}
function showSettings(){
  document.getElementById('settings').style.display = 'unset';
  settingsOpen=true;
  openFullscreen();
}

var awayScore = 0;
var homeScore = 0;
var timeValue = 600; //sec
var timerOn = false;
var latestSerial = '';

function onload(){
  resize();
  redrawTime();
  redrawScores();
  let testers = document.getElementsByClassName('testButton');
  let pairs = document.getElementsByClassName('pairButton');
  for(let i = 0; i < testers.length; i++){
    let button = testers[i], pair = pairs[i];
    button.addEventListener('click',e => {
      e.preventDefault();
      handleOpperation(i);
    });
    pair.addEventListener('click',e => {
      e.preventDefault();
      pairButton(pair);
    });
  }
  getCookies();
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
      score();
      break;
    case 3:
      set0(1);
      break;
    case 4:
    case 5:
    case 6:
      incrament(0,i-3);
      score();
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
      playRandomSound();
      break;
    case 14:
      stopAllSounds();
      break;
  }
}
function score(){
  if(Math.random()*100 > 100-parseInt(document.getElementById('soundProb').value)){
    playRandomSound();
  }
}
function playRandomSound(){
  sound(nrs);
  nrs++;
  if(nrs == 9) nrs = 1;
}
//team 1 = away, team 0 = home
function incrament(team,value){
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
  stopAllSounds();
  console.log('playing sound',i);
  switch(i){
    case 0:
      document.getElementById('buzzer').play();
      break;
    case 1:
      document.getElementById('swish').play();
      break;
    case 2:
      document.getElementById('yeet').play();
      break;
    case 3:
      document.getElementById('gotem').play();
      break;
    case 4:
      document.getElementById('wide').play();
      break;
    case 5:
      document.getElementById('wow').play();
      break;
    case 6:
      document.getElementById('bruh').play();
      break;
    case 7:
      document.getElementById('airhorn').play();
      break;
    case 8:
      document.getElementById('run').play();
      break;
  }
}

function stopAllSounds(){
  var sounds = document.getElementsByTagName('audio');
  for(i=0; i<sounds.length; i++){
    sounds[i].currentTime=0;
    sounds[i].pause();
  }
}
function clickPortCon(){
  openPort();
}

function pairButton(button){
  if(button.getAttribute('data-state') == 1 || button.getAttribute('data-state') == 3){
    button.innerText = 'Link';
    button.setAttribute('data-key',undefined);
    button.setAttribute('data-state',0);
  }
  else{
    button.innerText = 'Waiting for signal...';
    button.setAttribute('data-state',1);
  }
}

async function openPort(){
  var que = [];
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
    for(let i = 0; i < value.length; i++){
      if(value[i] == 10){
        let ascii = new Uint8Array(que);
        latestSerial = btoa(String.fromCharCode.apply(null, ascii));
        console.log(latestSerial);
        gotSerial(latestSerial);
        que=[];
      }else{
        que.push(value[i]);
      }
    }
  }
}
function gotSerial(key){
  let pairs = document.getElementsByClassName('pairButton');
  for(let i = 0; i < pairs.length; i++){
    pair = pairs[i];
    let useToggle = pairs[9].getAttribute('data-key') == pairs[8].getAttribute('data-key') && pairs[8].getAttribute('data-state') == 3;
    if(!settingsOpen && pair.getAttribute('data-state') == 3){
      if(pair.getAttribute('data-key') == key){
        if(i == 8 && useToggle){ //if both start and stop are paired to the same key, toggle
          toggleClock();
        }else{
          if(!(i == 9 && useToggle)){
            handleOpperation(i);
          }
        }
      }
    }

    if(pair.getAttribute('data-state') == 1){
      pair.innerText = `Paired to ${key}`;
      pair.setAttribute('data-state',3);
      pair.setAttribute('data-key',key);
    }
  }
}
function toggleClock(){
  if(timerOn){
    pauseClock();
  }else{
    startClock();
  }
}
document.addEventListener('keypress',e=>{
  switch(e.key){
    case 'Enter':
      hideSettings();
    break;
    case ' ':
      gotSerial('space');
    break;
    default:
      gotSerial(e.key);
    break;
  }
});
function clearAllLinks(){
  let pairs = document.getElementsByClassName('pairButton');
  for(let i = 0; i < pairs.length; i++){
    pairs[i].innerText = 'Link';
    pairs[i].setAttribute('data-key',undefined);
    pairs[i].setAttribute('data-state',0);
  }
}
function writeCookies(){
  let cookies = [];
  let pairs = document.getElementsByClassName('pairButton');
  for(let i = 0; i < pairs.length; i++){
    let v = pairs[i].getAttribute('data-key');
    if(pairs[i].getAttribute('data-state') == 3){
      setCookie('button'+i,v+'');
    }else{
      setCookie('button'+i,'');
    }
  }
  setCookie('time',document.getElementById('clockTime').value);
  setCookie('chance',document.getElementById('soundProb').value);
}
function setCookie(cname, cvalue) {
  var d = new Date();
  d.setTime(d.getTime() + (265 * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
function getCookies(){
  let pairs = document.getElementsByClassName('pairButton');
  for(let i = 0; i < pairs.length; i++){
    let v = getCookie('button'+i);
    if(v){
      pairs[i].setAttribute('data-state',3);
      pairs[i].setAttribute('data-key',v);
      pairs[i].innerText = `Paired to ${v}`;
    }
  }
  document.getElementById('clockTime').value = getCookie('time') || 10;
  document.getElementById('soundProb').value = getCookie('chance') || 0;
}
/* View in fullscreen */
function openFullscreen() {
  elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}
