// Sample Media Player using HTML5's Media API
// 
// Ian Devlin (c) 2012
// http://iandevlin.com
// http://twitter.com/iandevlin
//
// This was written as part of an article for the February 2013 edition of .net magazine (http://netmagazine.com/)

// Wait for the DOM to be loaded before initialising the media player
document.addEventListener("DOMContentLoaded", function() { initialiseMediaPlayer(); }, false);


// Variables to store handles to various required elements
var mediaPlayer;
var playPauseBtn;
var muteBtn;
var progressBar;
var progress;



function initialiseMediaPlayer() {
	// Get a handle to the player
	mediaPlayer = document.getElementById('media-video');
	
	// Get handles to each of the buttons and required elements
	playPauseBtn = document.getElementById('play-pause-button');
	muteBtn = document.getElementById('mute-button');
	progressBar = document.getElementById('progress-bar');
	progress=document.getElementById('progress');

	// Hide the browser's default controls
	 mediaPlayer.controls = false;
	
	// Add a listener for the timeupdate event so we can update the progress bar
	mediaPlayer.addEventListener('timeupdate', updateProgressBar, false);
	
	// Add a listener for the play and pause events so the buttons state can be updated
	mediaPlayer.addEventListener('play', function() {
		// Change the button to be a pause button
		changeButtonType(playPauseBtn, 'pause');
	}, false);
	mediaPlayer.addEventListener('pause', function() {
		// Change the button to be a play button
		changeButtonType(playPauseBtn, 'play');
	}, false);
	
	// need to work on this one more...how to know it's muted?
	mediaPlayer.addEventListener('volumechange', function(e) { 
		// Update the button to be mute/unmute
		if (mediaPlayer.muted) changeButtonType(muteBtn, 'unmute');
		else changeButtonType(muteBtn, 'mute');
	}, false);	
	mediaPlayer.addEventListener('ended', function() { this.pause(); }, false);	

	mediaPlayer.addEventListener('loadeddata',segment_buttons);

	 // var svg = d3.select('progress-bar')
  //                   .append('svg');
  //    svg.append('rect')
  //       .attr('x',50)
  //       .attr('y',220)
  //       .attr('width',15)
  //       .attr('height',15)
  //       .attr('fill','red');

}

function togglePlayPause() {
	// If the mediaPlayer is currently paused or has ended
	if (mediaPlayer.paused || mediaPlayer.ended) {
		// Change the button to be a pause button
		changeButtonType(playPauseBtn, 'pause');
		// Play the media
		mediaPlayer.play();
	}
	// Otherwise it must currently be playing
	else {
		// Change the button to be a play button
		changeButtonType(playPauseBtn, 'play');
		// Pause the media
		mediaPlayer.pause();
	}
}

function changePos(event) {

video= document.getElementById('media-video');
var X=event.clientX;
var Y=event.clientY;
console.log(Y);
var left=document.getElementById('progress-bar').offsetLeft;
var P_left=document.getElementById('progress-bar').offsetParent.offsetLeft;
var width=document.getElementById('progress-bar').offsetWidth;
var pos = (X+1 -(left)) / width;
video.currentTime = (pos*video.duration);


}

// Stop the current media from playing, and return it to the start position
function stopPlayer() {
	mediaPlayer.pause();
	mediaPlayer.currentTime = 0;
}

// Changes the volume on the media player
function changeVolume(direction) {
	if (direction === '+') mediaPlayer.volume += mediaPlayer.volume == 1 ? 0 : 0.1;
	else mediaPlayer.volume -= (mediaPlayer.volume == 0 ? 0 : 0.1);
	mediaPlayer.volume = parseFloat(mediaPlayer.volume).toFixed(1);
}

// Toggles the media player's mute and unmute status
function toggleMute() {
	if (mediaPlayer.muted) {
		// Change the cutton to be a mute button
		changeButtonType(muteBtn, 'mute');
		// Unmute the media player
		mediaPlayer.muted = false;
	}
	else {
		// Change the button to be an unmute button
		changeButtonType(muteBtn, 'unmute');
		// Mute the media player
		mediaPlayer.muted = true;
	}
}

// Replays the media currently loaded in the player
function replayMedia() {
	resetPlayer();
	mediaPlayer.play();
}

// Update the progress bar
function updateProgressBar() {
	// Work out how much of the media has played via the duration and currentTime parameters
	var percentage = Math.floor((100 / mediaPlayer.duration) * mediaPlayer.currentTime);
	// Update the progress bar's value
	progressBar.value = percentage;
	// Update the progress bar's text (for browsers that don't support the progress element)
	// progressBar.innerHTML = percentage + '% played';
	$("#dynamic")
      .css("width", percentage + "%")
      .attr("aria-valuenow", percentage);
      // .text(percentage + "% Complete");

}

// Updates a button's title, innerHTML and CSS class to a certain value
function changeButtonType(btn, value) {
	btn.title = value;
	btn.innerHTML = value;
	btn.className = value;
}

// Loads a video item into the media player
function loadVideo() {
	for (var i = 0; i < arguments.length; i++) {
		var file = arguments[i].split('.');
		var ext = file[file.length - 1];
		// Check if this media can be played
		if (canPlayVideo(ext)) {
			// Reset the player, change the source file and load it
			resetPlayer();
			mediaPlayer.src = arguments[i];
			mediaPlayer.load();
			break;
		}
	}
}

// Checks if the browser can play this particular type of file or not
function canPlayVideo(ext) {
	var ableToPlay = mediaPlayer.canPlayType('video/' + ext);
	if (ableToPlay == '') return false;
	else return true;
}

// Resets the media player
function resetPlayer() {
	// Reset the progress bar to 0
	progressBar.value = 0;
	// Move the media back to the start
	mediaPlayer.currentTime = 0;
	// Ensure that the play pause button is set as 'play'
	changeButtonType(playPauseBtn, 'play');
}

function segment_buttons()
{


 var start=[0.15,0.80,0.50];
 var end=[0.25,0.99,0.70];
 var data=[];
 var position=[];
 var	mPlayer = document.getElementById("media-video");
 console.log(mPlayer.duration);

for(var i=0;i<start.length;i++){

	var obj={};

	// var bar = document.getElementById('progress-bar'),
 //    new_mark = document.createElement('div');   //create a div
 //    new_mark.id = 'newid'+i;   
 //    bar.appendChild(new_mark);                 //append to the doc.body                    
	// var new_id = document.getElementById('newid'+i);
	// console.log(new_id);
	// var x=(end[i]-start[i])*5;
    var percentage = Math.floor((100 / mPlayer.duration) * (start[i]*100));
    position[i]=(percentage/100)*220;
    console.log(position[i]);
    percentage = Math.floor((100 / mPlayer.duration) * (end[i]*100));
    temp=(percentage/100)*220;
    width=temp-position[i];

    obj.pos=position[i];
    obj.width=width;
    obj.start=start[i];
    obj.end=end[i];
    data.push(obj);
	// new_id.setAttribute('style', 'width:'+ x +'px; height: 20px; position: absolute; background: #f0ad4e;right:'+percentage+5+'%');
	// new_id.setAttribute('style', 'width:'+ x +'px; height: 16px; position: absolute; background: #f0ad4e;right:40%');
}

            var w= 220;
            var h= 20;
            var svg= d3.select("#segment")
                        .append("svg")
                        .attr("width",w)
                        .attr("height",h)



            //container for all buttons
            var allButtons= svg.append("g")
                                .attr("id","allButtons") 

            //fontawesome button labels and 
            // var labels= ['\uf017','\uf200','\uf183'];
        
            //colors for different button states 
            var defaultColor= "#7777BB"
            var hoverColor= "#4d4d99"
            var pressedColor= "#e5801b"
            var doubleColor="#80002a"

;


   

            //groups for each button (which will hold a rect and text)
            var buttonGroups= allButtons.selectAll("g.button")
                                    .data(data)
                                    .enter()
                                    .append("g")
                                    .attr("class","button")
                                    .style("cursor","pointer")
                                    .on("click",function(d,i) {
                                        updateButtonColors(d3.select(this), d3.select(this.parentNode));
                                        change_segment(d.start,d.end);
                                        // d3.select("#numberToggle").text(i+1)
                                    })
                                    .on("mouseover", function() {
                                        if ((d3.select(this).select("rect").attr("fill") != pressedColor)&&(d3.select(this).select("rect").attr("fill") != doubleColor)){
                                            d3.select(this)
                                                .select("rect")
                                                .attr("fill",hoverColor);
                                        }
                                    })
                                    .on("mouseout", function() {
                                        if ((d3.select(this).select("rect").attr("fill") != pressedColor)&&(d3.select(this).select("rect").attr("fill") != doubleColor)) {
                                            d3.select(this)
                                                .select("rect")
                                                .attr("fill",defaultColor);
                                        }
                                    })
                                    .on("dblclick",function(d,i){
                                        
                                        updateButtonColors2(d3.select(this), d3.select(this.parentNode)); 
                                        for(var i=0;i<5;i++)
                                        {                               
                                        loop_segment(d.start,d.end);
                                        }


                                    })



            var bWidth= 20; //button width
            var bHeight= 10; //button height
            var bSpace= 10; //space between buttons
            var x0= 20; //x offset
            var y0= 0; //y offset


           //  buttonGroups.append("defs")
           // .append("pattern")
           // .attr("id", "bg")
           // .append("image")
           // .attr("xlink:href", "unlock.png")
           // .attr("width",function(d){return d.width;})
           // .attr("height",10)
           // .attr("x",0)
           // .attr("y",0);
            //adding a rect to each toggle button group
            //rx and ry give the rect rounded corner
            var Rect_buttons=buttonGroups.append("rect")
                        .attr("class","buttonRect")
                        .attr("width",function(d){return d.width;})
                        .attr("height",bHeight)
                        .attr("x",function(d) {return d.pos;})
                        .attr("y",y0)
                        .attr("rx",3) //rx and ry give the buttons rounded corners
                        .attr("ry",3)
                        .attr("fill",defaultColor);
               



                     
                     
           //  Rect_buttons.append("i")
           // .attr("class", function(d){ 
           // return "icon fa fa-refresh fa-spin fa-3x fa-fw";
           // })
           // .attr("x",0)
           // .attr("y",0)
           // .attr("width",function(d){return d.width;})
           // .attr("height", bHeight);

            function updateButtonColors(button, parent) {
                parent.selectAll("rect")
                        .attr("fill",defaultColor)

                button.select("rect")
                        .attr("fill",pressedColor)
            }

            function updateButtonColors2(button, parent) {
                parent.selectAll("rect")
                        .attr("fill",defaultColor)

                button.select("rect")
                        .attr("fill",doubleColor)
            }
        
}

function change_segment(time,end)
{

var t1=0;
var t2=0;
var t3=0;
var t4=0;
var t=0;
var timer_return_value=false;
var vid=document.getElementById("media-video");
console.log(vid.currentTime);
console.log(time);
console.log(end);

t1=(time-Math.floor(time))*100;
t2=Math.floor(time)*60;
t2=t2+t1;

console.log(t2);

if(time<1)
{
vid.currentTime=time*100;

}
else
{
  vid.currentTime=t2;

}

  vid.play();


t=d3.timer(timeOut);

 function timeOut(){

  t3=(end-Math.floor(end))*100;
  t4=Math.floor(end)*60;
  t4=t3+t4;

  // var time_temp=vid.currentTime;

  if((vid.currentTime) >= t4){
    // vid.pause();  
    t.stop();
    timer_return_value=true;
  }
   
  return timer_return_value;
};

  // t.restart(timeOut);
}

var flag=false;

function loop_segment(time,end)
{
var t1=0;
var t2=0;
var t3=0;
var t4=0;
var t=0;
var timer_return_value=false;
var vid=document.getElementById("media-video");
console.log(vid.currentTime);
console.log(time);
console.log(end);

t1=(time-Math.floor(time))*100;
t2=Math.floor(time)*60;
t2=t2+t1;

console.log(t2);

if(time<1)
{
vid.currentTime=time*100;

}
else
{
  vid.currentTime=t2;
 
}

 vid.play();

t=d3.timer(timeOut);

 function timeOut(){

  // d3.timerFlush();

  t3=(end-Math.floor(end))*100;
  t4=Math.floor(end)*60;
  t4=t3+t4;

  // var time_temp=vid.currentTime;

  if((vid.currentTime) >= t4){

    // vid.pause();  
    // t.stop();
    vid.currentTime=t2;
    // vid.play();
    // d3.timerFlush();
    // t.restart(timeOut);

    // loop_segment(time,end);
    t.stop();
    // t.restart(timeOut);
    timer_return_value=true;
  }
   
  return timer_return_value;
};

  // t.restart(timeOut);

}