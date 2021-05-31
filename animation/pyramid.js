document.addEventListener('DOMContentLoaded', repeat())


function repeat(){
setInterval( function(){
    var canvas = document.getElementById('canvas');
        if (canvas.getContext) {
        var context = canvas.getContext('2d');
        
        // clear the canvas for this loop's animation
        context.clearRect(0,0,1280,610);
        
        canvas.width  = 1280; // sets the width to a static predefined window width
        canvas.height = 610;

        var sWidth = canvas.width; 
        var sHeight = canvas.height; 

        var textKnowledge = "Knowledge";
        var textInformation = "Information";
        var textData = "Data";

     


        setTimeout(function(){ 
            // the triangle
            context.beginPath();
            context.moveTo(canvas.width/2, 50);
            context.lineTo(canvas.width/2 - 100, 180);
            context.lineTo(canvas.width/2 + 100, 180);
            context.closePath();
            // the outline
            context.lineWidth = 1;
            context.strokeStyle = '#25b1ea';
            context.stroke();
            // the fill color
            context.fillStyle = "#25b1ea";
            context.fill();
            context.fillStyle = "rgba(255, 255, 255)";
            context.font = "20px serif";
            context.fillText(textKnowledge, canvas.width/2 - 45, 140);
        }, 900);

        setTimeout(function(){ 
            // the first rectangle 
            context.beginPath();
            context.moveTo(canvas.width/2 - 110, 200);
            context.lineTo(canvas.width/2 - 205, 330);
            context.lineTo(canvas.width/2 + 205, 330);
            context.lineTo(canvas.width/2 + 110, 200);
            context.closePath();
            context.strokeStyle = '#5181f5';
            context.stroke();
            context.fillStyle = "#5181f5";
            context.fill();
            context.fillStyle = "rgba(255, 255, 255)";
            context.font = "30px serif";
            context.fillText(textInformation, canvas.width/2 - 70, 270);
        }, 600);

        setTimeout(function(){ 
            // the second rectangle 
            context.beginPath();
            context.moveTo(canvas.width/2 - 215, 350);
            context.lineTo(canvas.width/2 - 305, 480);
            context.lineTo(canvas.width/2 + 305,  480);
            context.lineTo(canvas.width/2 + 215, 350);
            context.closePath();
            context.strokeStyle = '#6d63fb';
            context.stroke();
            context.fillStyle = "#6d63fb";
            context.fill();
            context.fillStyle = "rgba(255, 255, 255)";
            context.font = "40px serif";
            context.fillText(textData, canvas.width/2 - 40,  420);
        }, 300);      

    }





}, 1500)

}
//}

