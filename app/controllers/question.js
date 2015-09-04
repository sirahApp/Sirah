var args = arguments[0] || {};
var Cloud = require('ti.cloud');
Alloy.Collections.groups.fetch();
Alloy.Collections.sirah.fetch();
Alloy.Collections.sirah2.fetch();


var userScore=Alloy.Globals.score;
var IdProp=Ti.App.Properties.getString('ID');
var phoneProp = Ti.App.Properties.getString('phone');
var name = Ti.App.Properties.getString('Name');
var uni= Ti.App.Properties.getString('uni');

if (Ti.Platform.name === 'iPhone OS')
{
	$.question.applyProperties({statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT });
}

$.questiontxt.text=args.question.question;
$.ch1Txt.text=args.question.ch1;
$.ch2Txt.text=args.question.ch2;
$.ch3Txt.text=args.question.ch3;
var correctAnswer=args.question.correct;
var grpid=args.question.groupid;
var id = args.question.id;
var epindex=args.index;
var answer;
var courseNumber=args.courseNumber;

if(courseNumber==1)
	{
	$.img_profile.visible='false';	
	var pageNumber= epindex%6;
	if (pageNumber == 0)
	{
		pageNumber = "٦/٦";
		$.btn_Nxtaudiobtn.title="إنهاء";
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

}

else if(courseNumber==2){
	$.img_profile.visible='true';
	var pageNumber= epindex%5;
	if (pageNumber == 0)
	{
		pageNumber = "٥/٥";
		$.btn_Nxtaudiobtn.title="إنهاء";
	}
	else if (pageNumber == 1)
	{
		pageNumber = "٥/١";
	}
	else if (pageNumber == 2)
	{
		pageNumber = "٥/٢";
	}
	else if (pageNumber == 3)
	{
		pageNumber = "٥/٣";
	}
	else if (pageNumber == 4)
	{
		pageNumber = "٥/٤";
	}
		
}

$.pageNumber.text = pageNumber ;



function onBtn_nxtaudiobtnClicked()
	{   
		if( $.ch1.value==false && $.ch2.value==false && $.ch3.value==false)
		{
			customAlert('فضلا اختر إجابة');
	
		}else{
		
		checkAnswer();
		
		if(courseNumber==1){
				if (id%6==0)
				{
				var win = Alloy.createController('result').getView();
					win.open();
				$.question.close();
				
				}
				else
				{
					var win = Alloy.createController('player', {
					sirah: Alloy.Collections.sirah.at(args.index),
					group: Alloy.Collections.groups.at(grpid-1),
					courseNumber:courseNumber
					}).getView();
					win.open();
					$.question.close();
				}
				
		} else if(courseNumber==2){
			Ti.API.info("Score "+userScore);
			if (id%5==0)
				{
								
						var dialog = Ti.UI.createAlertDialog({
				        title :' تنبيه',
			         	message: 'هل تود إرسال إجابات هذه المجموعة؟',
				        buttonNames: ['إرسال','إلغاء']
			});	
					dialog.addEventListener('click',function(e)
						{
							if(e.index==0)
							{
								//	Ti.API.info("Score "+userScore);		
									sendToACS();
									$.question.close();
									var win = Alloy.createController('index').getView();
									win.open();
											
							}	
						});
						
								dialog.show();	
				

				}
				else
				{
					var win = Alloy.createController('player', {
					sirah: Alloy.Collections.sirah2.at(args.index),
					group: Alloy.Collections.groups.at(grpid-1)
					,courseNumber:courseNumber
					}).getView();
					win.open();
					$.question.close();
				}			
					
		}
			}
	}

function checkAnswer()
	{
		if (correctAnswer==answer)
		{

			Alloy.Globals.score++;	
			userScore=Alloy.Globals.score;
			Ti.API.info("Global "+Alloy.Globals.score);
		}
	}
	
 function checked(e) 
 	{
	    $.ch1.value=$.ch2.value=$.ch3.value=false;
	    $.img_ch1img.image=$.img_ch2img.image=$.img_ch3img.image="/images/ch1img_image.png";
	    $.ch1.backgroundColor=$.ch2.backgroundColor=$.ch3.backgroundColor="Transparent";
	    this.value = true;

	    if(this.number==$.img_ch1img.number)
	    {
	  	  $.img_ch1img.image="/images/ch_checked_image.png";		
	    }
	    else if(this.number==$.img_ch2img.number)
	    {	    	
	    	 $.img_ch2img.image="/images/ch_checked_image.png";
	    }
	    else if (this.number==$.img_ch3img.number)
	    {
	    	$.img_ch3img.image="/images/ch_checked_image.png";
	    }
	    
	    answer=this.id;	    
	}

function onImg_homebtnClicked()
{
	if(courseNumber==1){ // we don't need to alert the user if he/she is just listening
		
		$.question.close();
		
	}
	else {  // alert the user
		var dialog = Ti.UI.createAlertDialog({
		title :' تنبيه',
		message: 'بالعودة للقائمة الرئيسية ستفقد جميع المعلومات و لن يتم اعتبار الاجابات، هل أنت متأكد بأنك تريد العودة للقائمة الرئيسية ؟',
		buttonNames: ['نعم','لا']
	});	
	dialog.addEventListener('click',function(e)
		{
			if(e.index==0)
			{
			$.question.close();
			}	
		});
	dialog.show();	
	
	}
}




function customAlert(msg)
{	
		var dialog = Ti.UI.createAlertDialog({
		title :'تنبيه',
		message: msg,
		buttonNames: ['موافق']
	});
	dialog.show();	
}








function sendToACS(){
	
	
	
	Cloud.Users.login({
			  login  : 'admin',
			  password: 'password',
			}, function(e) {
			  if (e.success)   
			  {
			    Cloud.Objects.create({
			      classname : 'sirah',
			      fields : {
				    name : name,
			        score : userScore,
			        group_id : grpid,
			        id_number:  IdProp,
			        phone_number: phoneProp, 
			        uni:uni
			      }
			    }, function(e) {
			      if(e.success) {
			  //  	$.sendinglbl.setText(""); 	
			        customAlert("تم إرسال إجابتك");
			    //    $.register.close();
			        
			      } else {
			  //  $.sendinglbl.setText("");	
			       customAlert("خطأ في الإرسال");
			      }
			    }); 
			                 
			  } else {
		//	  $.sendinglbl.setText("");	
			    alert('Login Error:' +((e.error && e.message) || JSON.stringify(e)));
			  } 
			});	
			

				
}


function onImg_profile(){
	
	var profileView=Alloy.createController('profile',{prvWindowID:'question'}).getView();
	profileView.open();
	
}
