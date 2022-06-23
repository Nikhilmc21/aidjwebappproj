music1="";
music2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist="";
scoreRightWrist="";
music1status="";
music2status="";

function preload(){
    music1=loadSound("music.mp3");
    music2=loadSound("HariPuttar.mp3");
}

function setup(){
    canvas=createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet is Initialized!')
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreRightWrist=results[0].pose.keypoints[10].score;
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist ="+scoreLeftWrist+"scoreLeftWrist ="+scoreLeftWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.x;
        console.log("leftWristX ="+leftWristX+"leftWristY ="+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("rightWristX="+rightWristX+"rightWristY="+rightWristY);
    }
}

function draw(){
    image(video, 0, 0, 600, 500);
    music1status=music1.isPlaying();
    music2status=music2.isPlaying();
    fill("#FF000");
    stroke("#FF000");
    if(scoreRightWrist > 0.1){
        circle(rightWristX, rightWristY, 20);
        music2.stop();
        if(music1status=="false"){
            music1.play();
            document.getElementById("songname").innerHTML="Harry Potter";
        }
    }
        if(scoreLeftWrist > 0.1){
        circle(leftWristX, leftWristY, 20);
        music1.stop();
        if(music2status=="false"){
            music2.play();
            document.getElementById("songname").innerHTML="Harry Potter but better";
        }
    }
}

function play(){
    music1.play();
    music1.setVolume(1);
    music1.rate(1);
}
