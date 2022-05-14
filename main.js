function setup(){
    canvas=createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifycanvas);
    synth=window.speechSynthesis;
}
function preload(){
    classifier=ml5.imageClassifier("DoddleNet");
}
function clearCanvas(){
    background("white");
}
function draw(){
    strokeWeight(12);
    stroke("red");
    if(mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}
function classifycanvas(){
    classifier.classify(canvas,gotResults);
}
function gotResults(error,results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        document.getElementById("label").innerHTML="Label : "+results[0].label;
        document.getElementById("confidence").innerHTML="Confidence : "+Math.round(results[0].confidence*100)+"%";
        utterThis=new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }

}