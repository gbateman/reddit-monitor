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

var startDate = Date.now();

setInterval(function() {
  var elapsed = Date.now() - startDate;
  var hours = Math.floor(elapsed/3600000).toFixed(0);
  var minutes = Math.floor(elapsed%3600000/60000).toFixed(0);
  var seconds = Math.floor(elapsed%60000/1000).toFixed(0);
  text.innerHTML = ('0' + minutes).substring(minutes.length - 1) + ':'
    + ('0' + seconds).substring(seconds.length - 1);
  if(hours > 0) {
    text.innerHTML = hours + ':' + text.innerHTML;
  }

  if(minutes % 5 == 0 && seconds == 0) {
    alert('You have spent ' + minutes + ' minutes on reddit');
  }
}, 1000);
