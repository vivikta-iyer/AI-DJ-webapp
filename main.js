song="";
function preload(){
song=loadSound("music.mp3");
}
scoreRightWrist=0;
scoreLeftWrist=0;

RightWristX=0;
LefttWristX=0;
RightWristY=0;
LefttWristY=0;

    

function setup(){
    canvas=createCanvas(550,550);
    canvas.center()
    video=createCapture(VIDEO);
    video.size(550,500);
    video.hide();
poseNet=ml5.poseNet(video,modelLoaded);
poseNet.on('pose',gotPoses);

}
function modelLoaded(){
    console.log('poseNet is initialised');
}

function gotPoses(){
    if(results.length>0)
    {
scoreRightWrist=results[0].pose.keypoints[10].score;
scoreLeftWrist=results[0].pose.keypoints[9].score;

RightWristX=results[0].pose.rightWrist.x;
RightWristY=results[0].pose.rightWrist.y;
LeftWristX=results[0].pose.leftWrist.x;
LeftWristY=results[0].pose.leftWrist.y;
    }
}
function draw(){
    image(video,0,0,600,500);
    
    fill("ff0000");
    stroke("ff0900");
if(scoreRightWrist>0.2){
circle(RightWristX,RightWristY,20);
if(RightWristY>0 && RightWristY<=100){
    document.getElementById("speed").innerHTML="Speed = 0.5x";
    song.rate(0.5);
}
 else if(RightWristY>100 && RightWristY<=200){
    document.getElementById("speed").innerHTML="Speed = 1x";
    song.rate(1);
}
else if(RightWristY>200 && RightWristY<=300){
    document.getElementById("speed").innerHTML="Speed = 1.5x";
    song.rate(1.5);
}
else if(RightWristY>300 && RightWristY<=400){
    document.getElementById("speed").innerHTML="Speed = 2x";
    song.rate(2);
}
else if(RightWristY>400){
    document.getElementById("speed").innerHTML="Speed = 2.5x";
    song.rate(2.5);
}

}
if (scoreLeftWrist>0.2){
circle(LeftWristX,LeftWristY,20);
inNumberLeftWristY=Number(LeftWristY);
remove_decimal=floor(inNumberLeftWristY);
volume=remove_decimal/500;
document.getElementById("volume").innerHTML="Volume = " + volume;
song.setVolume(volume);


}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}