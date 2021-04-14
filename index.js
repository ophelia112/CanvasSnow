/** @type {HTMLCanvasElement} */
var canvas = document.getElementById('snow');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//将画布的中心点移动到100,100
function snow(){
    context.save();//存储原始画布的起始位置，使得最后画完可以恢复
    context.beginPath();
    context.translate(100, 100);
    context.moveTo(-20,0);//从哪里开始画
    context.lineTo(20,0);//画到的位置
    context.strokeStyle = "#fff";
    context.lineWidth = 5;//宽度
    context.lineCap = 'round';//圆角
    var disX = Math.sin(30 * Math.PI / 180) * 20;
    var disY = Math.sin(60 * Math.PI / 180) * 20;

    context.moveTo(-disX, -disY);
    context.lineTo(disX, disY);

    context.moveTo(-disX,disY);
    context.lineTo(disX,-disY);
    context.stroke();//绘制出这条路径
    context.restore();//恢复原始画布的起始位置

    context.save();//存储原始画布的起始位置，使得最后画完可以恢复
    context.beginPath();
    context.translate(50, 50);
    context.scale(.5,.5);
    context.rotate(20 * Math.PI / 180);
    context.moveTo(-20,0);//从哪里开始画
    context.lineTo(20,0);//画到的位置
    context.strokeStyle = "#fff";
    context.lineWidth = 5;//宽度
    context.lineCap = 'round';//圆角
    var disX = Math.sin(30 * Math.PI / 180) * 20;
    var disY = Math.sin(60 * Math.PI / 180) * 20;

    context.moveTo(-disX, -disY);
    context.lineTo(disX, disY);

    context.moveTo(-disX,disY);
    context.lineTo(disX,-disY);
    context.stroke();//绘制出这条路径
    context.restore();//恢复原始画布的起始位置
    
}
// snow();

//最后一个参数是给予旋转角度一个速度，角速度
function Snow(x, y, scale, rotate, speedX, speedY, speedR){
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.rotate = rotate;
    this.speedX = speedX;
    this.speedY = speedY;
    this.speedR = speedR;

}

Snow.prototype.render = function(){
    context.save();//存储原始画布的起始位置，使得最后画完可以恢复
    context.beginPath();
    context.translate(this.x, this.y);//这个值就是雪花的中心点的坐标
    context.scale(this.scale, this.scale);
    context.rotate(this.rotate * Math.PI / 180);
    context.moveTo(-20,0);//从哪里开始画
    context.lineTo(20,0);//画到的位置
    context.strokeStyle = "#fff";
    context.lineWidth = 5;//宽度
    context.lineCap = 'round';//圆角
    var disX = Math.sin(30 * Math.PI / 180) * 20;
    var disY = Math.sin(60 * Math.PI / 180) * 20;

    context.moveTo(-disX, -disY);
    context.lineTo(disX, disY);

    context.moveTo(-disX,disY);
    context.lineTo(disX,-disY);
    context.stroke();//绘制出这条路径
    context.restore();//恢复原始画布的起始位置

}
// var snow = new Snow(100, 100, 1, 10, 10, 10, 10);
// snow.render();

// var snow1 = new Snow(200, 300, 2, 40, 10, 10, 10);
// snow1.render();

var snowArray = [];
function init(){
    var len = 100;
    for(var i = 0; i < len; i++){
        var x = Math.random() * canvas.width;
        var scale = Math.random() + 0.5;
        var rotate = Math.random() * 60;
        var speedX = Math.random() + 1;
        var speedY = Math.random() + 5;
        var speedR = Math.random() * 4 + 2;

        //生成顺序不同因此使用立即执行函数
        (function(x, y, scale, rotate, speedX, speedY, speedR){
            setTimeout(function(){
                var snow = new Snow(x, y, scale, rotate, speedX, speedY, speedR);
                snow.render();
                
                snowArray.push(snow);
            }, Math.random() * 8000);
        })(x, 0, scale, rotate, speedX, speedY, speedR);

    }
    snowing();
}
init();
function snowing(){
    //开启定时器持续不断的画雪花
    setInterval(function(){
        context.clearRect(0,0,canvas.width, canvas.height);
        for(var i = 0; i < snowArray.length; i++){
            // (function(i){
            //     setTimeout(function(){
                   
            //     },30);
            // })(i);
            snowArray[i].x = (snowArray[i].x + snowArray[i].speedX) % canvas.width;
            snowArray[i].y = (snowArray[i].y + snowArray[i].speedY) % canvas.height;
            snowArray[i].rotate = (snowArray[i].rotate + snowArray[i].speedR) % 60;
            snowArray[i].render();
        }
    },50);
}