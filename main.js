function setup()
{
    canvas = createCanvas(665, 350);
    canvas.parent("canvasHolder")
    video = createCapture(VIDEO) ;
    video.hide() ;
    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/SrXkEDKTF/model.json' , modelLoaded) ;
}

function modelLoaded()
{
    console.log('Model is loaded.') ;
}

function draw()
{
    image(video, 0, 0, 700, 600) ;
    classifier.classify(video, gotResult) ;
}

function gotResult(error, results)
{
    if(error) {
        console.error(error) ;
    }
    else {
        console.log(results) ;
        document.getElementById("object-name").innerHTML = results[0].label ;
        if (parseInt(results[0].confidence.toFixed(2) * 100) > 10) {
            document.getElementById("accuracy-value").innerHTML = results[0].confidence.toFixed(2) * 100 + " %";
        }
    }
}