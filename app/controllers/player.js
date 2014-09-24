
var args = arguments[0] || {};

if (Ti.Platform.name === 'iPhone OS')
{
	$.player.applyProperties({statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT });
}
var epindex=args.sirah.get('id');
var audionum=args.sirah.get('audionumber'); 
$.audioTextLbl.text = args.sirah.get('audiotext');
$.groupTextLbl.text = args.group.get('title');

var pageNumber= epindex%6;
if (pageNumber == 0)
{
	pageNumber = "٦/٦";
}
else if (pageNumber == 1)
{
	pageNumber = "٦/١";
}
else if (pageNumber == 2)
{
	pageNumber = "٦/٢";
}
else if (pageNumber == 3)
{
	pageNumber = "٦/٣";
}
else if (pageNumber == 4)
{
	pageNumber = "٦/٤";
}
else if (pageNumber == 5)
{
	pageNumber = "٦/٥";
}  

$.pageNumber.text = pageNumber ;

var q={
	question:args.sirah.get('questiontext'),
	ch1:args.sirah.get('ch1'),
	ch2:args.sirah.get('ch2'),
	ch3:args.sirah.get('ch3'),
	correct:args.sirah.get('correct'),
	groupid:args.sirah.get('groupid'),
	id:args.sirah.get('id')
};

var audioPlayer = Ti.Media.createAudioPlayer({ 
    url: "http://nadialnourain.com/sirah/"+audionum+".mp3",
    allowBackground: false
});  


 audioPlayer.addEventListener('change',function(e)
{	
	if (e.description ==  "waiting_for_queue" || e.description == "waiting_for_data" || e.description == "buffering" ||e.description == "starting" )
		{
			$.waiting.setText("جاري التحميل .. ");
			}
			else
			{
				$.waiting.setText(" ");
			}
 
 });

function playtrack () 
{	
	if (Titanium.Network.online == false )
    	{   		
    		$.btn_Playpausebtn.backgroundImage= "/images/playPauseBtn_normal.png";
    		customAlert();
    	}else{
    		
    		 if (audioPlayer.playing)
    		 {
    		 	$.btn_Playpausebtn.backgroundImage= "/images/playPauseBtn_normal.png";
    		 	audioPlayer.pause();
    		 	}else{
    		 		$.btn_Playpausebtn.backgroundImage= "/images/playPauseBtn_pressed.png";
    		 		audioPlayer.start();
    		  }         
    	 }
     };

function stopTrack() 
{	
	$.btn_Playpausebtn.backgroundImage= "/images/playPauseBtn_normal.png";	
	audioPlayer.stop();     
    if (Ti.Platform.name === 'android')
    {
    	audioPlayer.release();
    	$.duration.setText("00:00 : 00:00");
    	$.timeProgress.applyProperties({width: "0" });
    	audioPlayer.setTime(0);
    }          
}

audioPlayer.addEventListener('complete',function(e) 
{
	$.timeProgress.applyProperties({width: "100%" });
	$.duration.setText(formatTime(Math.round(audioPlayer.duration/1000))+"/"+formatTime(Math.round(audioPlayer.duration/1000)));	
});


Titanium.Network.addEventListener('change', function(e){
	if (e.online == false)
		{ 
			stopTrack();
			$.btn_Playpausebtn.backgroundImage= "/images/playPauseBtn_normal.png";
    	}
	});

audioPlayer.addEventListener('progress',function(e) 
{
  var value=0;
     if (Ti.Platform.name === 'android')
        { 
        	var playedTime=formatTime(Math.round(audioPlayer.time/1000))+"/"+formatTime(Math.round(audioPlayer.duration/1000));
        	if (audioPlayer.time > 0) 
        	{
        		value = Math.floor((100 / audioPlayer.duration) * audioPlayer.time);
   		    }   
        }else{			
        	
        	var playedTime=formatTime(Math.round(audioPlayer.progress/1000))+"/"+formatTime(Math.round(audioPlayer.duration/1000));
        	if (audioPlayer.progress > 0) 
        	{
        		value = Math.floor((100 / audioPlayer.duration) * audioPlayer.progress);
   		    }
		}          
   $.duration.setText(playedTime); 
   $.timeProgress.applyProperties({width: value + "%" });    
});

function formatTime(totalSeconds)
{   
    var minutes =  parseInt(totalSeconds / 60 % 60);
    var seconds = parseInt(totalSeconds % 60);
    return (minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds);
};

$.timeBar.addEventListener('click',function(e){
     if (Ti.Platform.name === 'android')
     {
     	var Xdp=Math.round(e.x / (Titanium.Platform.displayCaps.dpi / 160));    	
     	var timePercent=Xdp / parseInt($.timeBar.width);
   		var newTime =timePercent*audioPlayer.duration;
	    audioPlayer.pause();
	    audioPlayer.setTime(newTime);
	    audioPlayer.start();
     	$.btn_Playpausebtn.backgroundImage= "/images/playPauseBtn_pressed.png";
     }
});
        
        
 function onBtn_showquestionClicked() {
 	var questionWin=Alloy.createController('question',{question:q,index:epindex}).getView().open();
    $.btn_Playpausebtn.backgroundImage= "/images/playPauseBtn_normal.png";
	audioPlayer.stop(); 
	if (Ti.Platform.name === 'android')
	{
		audioPlayer.release();
	} 
    $.player.close();
};


function onImg_homebtnClicked()
{	
	var dialog = Ti.UI.createAlertDialog({
		title :'تنبيه ',
		message: 'بالعودة للقائمة الرئيسية ستفقد جميع المعلومات و لن يتم اعتبار الاجابات، هل أنت متأكد بأنك تريد العودة للقائمة الرئيسية ؟',
		buttonNames: ['نعم','لا']
	});	
	dialog.addEventListener('click',function(e){
		if(e.index==0)
		{
			$.btn_Playpausebtn.backgroundImage= "/images/playPauseBtn_normal.png";
			audioPlayer.stop(); 
			if (Ti.Platform.name === 'android')
			{
				audioPlayer.release();
				}  
				$.player.close();
				}	
	});
	dialog.show();	
}

function customAlert()
	{	
		var dialog = Ti.UI.createAlertDialog({
		title :'تنبيه',
		message: 'فضلا تحقق من الاتصال',
		buttonNames: ['موافق']
	});
	dialog.show();
	
}