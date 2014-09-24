var args = arguments[0] || {};
var Cloud = require('ti.cloud');
Cloud.debug = true;  // optional; if you add this line, set it to false for production

var userScore=Alloy.Globals.score;
if (Ti.Platform.name === 'iPhone OS')
{
$.register.applyProperties({statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT });
}

var checkIndex = 0;
function changeCheckbox()
{
	if (checkIndex == 0)
	{
		$.btn_Checkbox.backgroundImage = "/images/checkbox_normal.png";
		checkIndex = 1;
	}
	else
	{
		$.btn_Checkbox.backgroundImage = "/images/checkbox_pressed.png";
		checkIndex = 0;
	}
	
}

function setAlertText()
{
	var alertText="فضلا أدخل:";
		    if (($.txtFld_Fullname.value==" " ) || (! $.txtFld_Fullname.hasText()) )
		{
			alertText+=" \nالاسم الرباعي ";
			} 
		  
		    if (( $.txtFld_Idnumber.value==" ") || (!$.txtFld_Idnumber.hasText()))
		{
			alertText+=(" \nالرقم الجامعي");
			}
			
			if ( ( $.txtFld_Uniname.value==" ") || (! $.txtFld_Uniname.hasText()) )
		{
			alertText+=" \nاسم الجامعة";
			} 
			
			if ( ( $.txtFld_Phonenumber.value==" ") || (! $.txtFld_Phonenumber.hasText()) )
		{
			alertText+= " \nرقم الجوال";
			} 
			return alertText;
}

function sendScore()
	{
		alertText = setAlertText();
		
		if (($.txtFld_Fullname.value==" " ) || (! $.txtFld_Fullname.hasText()) ||( $.txtFld_Idnumber.value==" ") || (!$.txtFld_Idnumber.hasText()) || ( $.txtFld_Uniname.value==" ") || (! $.txtFld_Uniname.hasText()) || ( $.txtFld_Phonenumber.value==" ") || (! $.txtFld_Phonenumber.hasText()))
		{
				customAlert(alertText);
				
		}
		
		else if (checkIndex != 1)
		{
				customAlert("الرجاء الموافقة على التعهد بشروط و قوانين المسابقة");
		}
		else
		{	
				checkID();
				
				 	
		} 
	
	}

function checkID(){
	Cloud.Objects.query({
    classname: 'sirah',
    where: {
        group_id : args.groupid,
		id_number:$.txtFld_Idnumber.value
    }
}, function (e) {
    if (e.success) {
    	if(e.sirah.length){
    		       customAlert("لقد قمت بالإجابة على هذه المجموعة مسبقاً");	
    	}
    	else
    	{
    				sendToACS();
    	}
    	
    } else {
        customAlert("خطأ في الإرسال");
    }
});}


function sendToACS(){
	
	Cloud.Users.login({
			  login  : 'admin',
			  password: 'password',
			}, function(e) {
			  if (e.success)   {
			 
			    Cloud.Objects.create({
			      classname : 'sirah',
			      fields : {
					name : $.txtFld_Fullname.value,
			        score : userScore,
			        group_id : args.groupid,
			        id_number:$.txtFld_Idnumber.value,
			        phone_number:$.txtFld_Phonenumber.value,
			        uni:$.txtFld_Uniname.value
			      }
			    }, function(e) {
			      if(e.success) {
			        customAlert("تم إرسال إجابتك");
			        $.register.close();
			        
			      } else {
			       customAlert("خطأ في الإرسال");
			      }
			    }); 
			                 
			  } else {
			    alert('Login Error:' +((e.error && e.message) || JSON.stringify(e)));
			  } 
			});
	
	
}



function onImg_homebtnClicked()
	{
		var dialog = Ti.UI.createAlertDialog({
		title :' تنبيه',
		message: 'بالعودة للقائمة الرئيسية ستفقد جميع المعلومات و لن يتم اعتبار الاجابات، هل أنت متأكد بأنك تريد العودة للقائمة الرئيسية؟',
		buttonNames: ['نعم','لا']
	});
	
	dialog.addEventListener('click',function(e)
	{
			if(e.index==0)
			{
			$.register.close();
			}	
	});

	dialog.show();
	
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



function showInfo()
{
	if (Ti.Platform.name === 'android')
   {
   	$.infoView.visible=true;
   	}
   	else 
   	{
	$.infoView.show();
	}
	var textValue= " قوانين المسابقة: "
+"\n "+"- يشترط أن تكون المشاركة طالبة في إحدى جامعات المملكة."
+"\n "+"- أن تكون بيانات المشاركة كاملة و صحيحة علماً بأن أي نقص أو خطأ فيها قد يحجب عنها الجائزة." 
+"\n " + "- أن تتسلم المشاركة جائزتها خلال العام الدراسي ١٤٣٥-١٤٣٦هـ وتلغى الجائزة في حال التأخر عن استلامها." 
+ "\n " +" - لن يتيح التطبيق الإجابة على ذات المجموعة أكثر من مرة." 
+"\n "+"- يمكن للمشاركة الإجابة على المجموعة قبل الأسبوع المخصص لها."
+"\n "+" - بعد إعلان أسماء الفائزات لأي مجموعة أسبوعية فإن أي مشاركة ستأتي لاحقاً تدخل في المنافسة على الجائزة الكبرى."
+"\n "+"- يحق للمشاركة الفوز بالجائزة الأسبوعية مرة واحدة فقط وأي مشاركة لاحقا ستزيد فرصتها للفوز بالجائزة الكبرى." 
+"\n"+"- في حال تساوي عدد الإجابات الصحيحة لعدد من المشاركات فسيتم اختيار الفائزة بالقرعه."+"\n ";
   $.infoText.setText(textValue);
   
}


function hideInfo()
{
	if (Ti.Platform.name === 'android')
	{
		$.infoView.visible = false;
		}
	else
	{
		$.infoView.hide();
		}

}
