// pre. getRandom
function getRandom(x, y) {
  return Math.random() * (y - x) + x;
}

// 1. 写一个函数，在可视区域内，随机大小，随机位置，长生n个雪花。
function createSnows(n) {
  for (var i = 0; i < n; i++) {
    var img = document.createElement('img');
    img.src = './snow.png';

    // 随机
    // 1. size  30~60
    // 定宽不定高或者定高不定宽
    var size = getRandom(30, 60);
    img.style.width = size + 'px';

    // 2. position
    img.style.position = 'absolute';
    // 需要记录每个元素的初始left值
    var left = getRandom(0, window.innerWidth) - size;
    leftArr[i] = left;//???????????
    img.style.left = left + 'px';
    img.style.top = getRandom(0, window.innerHeight) + 'px';

    // 3. 透明度
    img.style.opacity = getRandom(0.4, 1);
    weightArr[i] = getRandom(0, 6.28);
    document.body.appendChild(img);
  }
}

// 2. 让雪花运动
// 运动函数， 让所有雪花运动
function snowRun() {
  // 1. 获取所有元素
  var imgs = document.getElementsByTagName('img');
  // 2. 遍历每隔元素，让每个元素运动
  setInterval(function () {
    for(var i=0; i<imgs.length; i++) {
      // img代表每个元素
      var img = imgs[i];
      var top = parseInt(getComputedStyle(img).top);
      // var left = leftArr[i];
      
      top++;
      img.style.top = top + 'px';
      var left = leftArr[i] + Math.sin(top*0.01 - weightArr[i]) * 100;
      img.style.left = left + 'px'; 

      // 废物利用， 到地下的元素，在放到上面
      if (top >= window.innerHeight) {
        img.style.top = -parseInt(getComputedStyle(img).height) + 1 + 'px';
        // 左右位置重新生成。
        var left = getRandom(0, window.innerWidth);
        leftArr[i] = left;
        img.style.left = left + 'px';
      }
    }
  }, 60);
}
// document.getElementsByClassName();
// document.getElementsByTagName(); 通过标签名返回类数组。
var leftArr= [];
// 偏移量数组 左加右减
var weightArr = [];
createSnows(200);
snowRun();
