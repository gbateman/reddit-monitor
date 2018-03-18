// ************** Styling **************
var container = document.createElement('div');
var text = document.createElement('div');
document.body.appendChild(container);
container.appendChild(text);

container.id = 'reddit-timer';
container.style.position = 'fixed';
container.style.padding = '5px';
container.style.bottom = '0';
container.style.left = '50%';
container.style.transform = 'translateX(-50%)';
container.style.background = 'rgba(127, 127, 127, 0.5)';
container.style.color = 'white';

text.innerHTML = '00:00';

// ************** Logic **************
var startDate = sessionStorage.getItem('reddit-monitor-start-date');
if (startDate == null) {
  startDate = Date.now();
}

var paused = false;
var pausedTime = 0;
var pauseStartTime = null;

function updateClock() {
  if (!paused) {
    var elapsed = Date.now() - startDate - pausedTime;
    var hours = Math.floor(elapsed/3600000).toFixed(0);
    var minutes = Math.floor(elapsed%3600000/60000).toFixed(0);
    var seconds = Math.floor(elapsed%60000/1000).toFixed(0);
    text.innerHTML = ('0' + minutes).substring(minutes.length - 1) + ':'
      + ('0' + seconds).substring(seconds.length - 1);
    if(hours > 0) {
      text.innerHTML = hours + ':' + text.innerHTML;
    }

    if(minutes % 5 == 0 && seconds == 0 && minutes != 0) {
      alert('You have spent ' + (60*hours + minutes) + ' minutes on reddit');
    }
  }
}

updateClock();
setInterval(updateClock, 1000);

document.addEventListener("visibilitychange", function() {
  if (document.hidden) {
    pauseStartTime = Date.now();
    paused = true;
  } else {
    pausedTime += Date.now() - pauseStartTime;
    paused = false;
  }
});

window.onbeforeunload = function(e) {
  sessionStorage.setItem('reddit-monitor-start-date', startDate);
}
