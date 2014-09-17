var args = arguments[0] || {};

Alloy.Collections.groups.fetch();
Alloy.Collections.sirah.fetch();



$.questiontxt.text=args.question.question;
$.ch1Txt.text=args.question.ch1;
$.ch2Txt.text=args.question.ch2;
$.ch3Txt.text=args.question.ch3;
var correctAnswer=args.question.correct;
var grpid=args.question.groupid;
var id = args.question.id;


var answer;

var pageNumber= id%6;
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





function onBtn_nxtaudiobtnClicked()

	{   
		if( $.ch1.value==false && $.ch2.value==false && $.ch3.value==false)
		{
			customAlert();
	
		}else{
		
		checkAnswer();
	
				if (id%6==0)
				{
					var winRegister = Alloy.createController('register', {groupid:grpid}).getView();
					winRegister.open();
					$.question.close();
				}
				else
				{
					var win = Alloy.createController('player', {
					sirah: Alloy.Collections.sirah.at(args.index),
					group: Alloy.Collections.groups.at(grpid-1)
					}).getView();
					win.open();
					$.question.close();
				}
			}
	}




function checkAnswer()
	{
		if (correctAnswer==answer)
		{
			Alloy.Globals.score++;
			console.log("Correct !");
			console.log("Score "+ Alloy.Globals.score);			
		}else{
		
			console.log("Wrong :( ");
			console.log("Score "+ Alloy.Globals.score);	
		}
	}
	


 function checked (e) 
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
	    
	    
	    this.backgroundColor = '#aaa';
	    this.highlightedColor='yellow';
	    answer=this.id;
	    
	}

function onImg_homebtnClicked()
	{

	
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

function customAlert()
	{	
		var dialog = Ti.UI.createAlertDialog({
		title :'تنبيه',
		message: 'فضلاً اختر إجابة',
		buttonNames: ['موافق']
	});
	dialog.show();
	
}

