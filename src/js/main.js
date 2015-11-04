var genArray = function(m = 10) {
  var arr = [];
  var n = 0;

  while (n !== m) {
    arr.push(n);
    n+=1;
  }
  return arr;
};

var arr = genArray();

var i = 0;
var timer = window.setInterval(() => {
  var div = document.createElement("div");
  div.innerHTML = arr[i];
  document.body.appendChild(div);
  if (i === arr.length-1) {
    window.clearInterval(timer);
    return false;
  }
  i+=1;
}, 1000);
