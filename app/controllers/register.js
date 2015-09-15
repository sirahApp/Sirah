var args = arguments[0] || {};
var Cloud = require('ti.cloud');
//Cloud.debug = true;  // optional; if you add this line, set it to false for production

if (Ti.Platform.name === 'android')
{
	$.register.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
}


var userScore=Alloy.Globals.score;


var first = true;
function fullname_focus()
{	
		if(first){
        first = false;
        $.txtFld_Fullname.setColor("transparent");
    }else{
       $.usrNameHint.visible=false;
       $.txtFld_Fullname.setColor("#fff");
       
    }
}


function fullname_blur()

{
	if($.txtFld_Fullname.value == "")
	{
	$.usrNameHint.visible=true;
	}	
}


function Idnumber_focus()
{
	
	$.IdnumberHint.visible=false;
}


function Idnumber_blur()

{
	if($.txtFld_Idnumber.value == "")
	{
	$.IdnumberHint.visible=true;
	}	
}

function Password_focus()
{
	
	$.passwordHint.visible=false;
}


function Password_blur()

{
	if($.txtFld_Password.value == "")
	{
	$.passwordHint.visible=true;
	}	
}

function Passwordcon_focus()
{
	
	$.passwordconHint.visible=false;
}


function Passwordcon_blur()

{
	if($.txtFld_PasswordConfirmation.value == "")
	{
	$.passwordconHint.visible=true;
	}	
}


function Uniname_focus()
{
	
	$.uninameHint.visible=false;
}


function Uniname_blur()

{
	if($.txtFld_Uniname.value == "")
	{
	$.uninameHint.visible=true;
	}	
}


function Phonenumber_focus()
{
	
	$.phoneHint.visible=false;
}


function Phonenumber_blur()

{
	if($.txtFld_Phonenumber.value == "")
	{
	$.phoneHint.visible=true;
	}	
}



if (Ti.Platform.name === 'android')
{

}

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
				$.sendinglbl.setText(" جاري الإرسال ...");
				sendToACS();							 	
		} 
	
	}

function checkID()
{
	Cloud.Users.query({
    classname: 'sirah',
    where: {
    //    group_id : args.groupid,
		id_number:$.txtFld_Idnumber.value
    }
}, function (e) {
    if (e.success) {
    	if(e.sirah.length){
    				$.sendinglbl.setText("");
    		       customAlert("لقد قمت بالإجابة على هذه المجموعة مسبقاً");	
    	}
    	else
    	{
    				sendToACS();
    	}
    	
    } else {
    	$.sendinglbl.setText("");
        customAlert("خطأ في الإرسال");
    }
});}



function sendToACS(){
	
	Cloud.Users.login({
			  login  : 'admin',
			  password: 'password',
			}, function(e) {
			  if (e.success)   
			  {
			    Cloud.Users.create({

			        username:$.txtFld_Idnumber.value,			    	
			    	password: $.txtFld_Password.value,
    			 password_confirmation: $.txtFld_PasswordConfirmation.value,
			     //   score : userScore,
			     //   group_id : args.groupid,
			custom_fields:{
					name : $.txtFld_Fullname.value, 	
				phone_number:$.txtFld_Phonenumber.value,
			        uni:$.txtFld_Uniname.value	
				 },
				 

			    }, function(e) {
			      if(e.success) {
			     	$.sendinglbl.setText(""); 	
			        customAlert("تم التسجيل");
			        
        			        
			var win = Alloy.createController('groupList', {crsNumber:2}).getView();
			win.open();
			        $.register.close();
			        
						    Ti.App.Properties.setString('ID',$.txtFld_Idnumber.value);
						    Ti.App.Properties.setString('Name',$.txtFld_Fullname.value);
						    Ti.App.Properties.setString('phone',$.txtFld_Phonenumber.value);
						    Ti.App.Properties.setString('uni',$.txtFld_Uniname.value);
   			        
			        

					        
			        
			      } else {
			      	
			      //if($.txtFld_Password.value == $.txtFld_PasswordConfirmation.value){
			      		//  $.sendinglbl.setText("");	
			      	//	   customAlert("كلمة المرور غير متطابقة");	
			      //	}
			    //  	else {
			    	
			    	
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
            
			       $.sendinglbl.setText("");	
			  //     customAlert("خطأ في التسجيل");
			      //}
			      }
			    }); 
			                 
			  } else {
			 	$.sendinglbl.setText("");	
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
		var dialoginfo = Ti.UI.createAlertDialog({
		title :'شروط المسابقة',
		message:' -يجب أن تكون بيانات المشارِكة  كاملة و صحيحة، علماً بأن أي نقص أو خطأ فيها قد يحجب عن الفائزة الجائزة \n \n  - أن تتسلم المشاركة جائزتها خلال العام الدراسي ١٤٣٦-١٤٣٧هـ وتلغى الجائزة في حال التأخر عن استلامها\n\n - في حال تساوي عدد الإجابات الصحيحة لعدد من المشاركات فسيتم اختيار الفائزة بالقرعة' ,
		buttonNames: ['موافق']
	});
	dialoginfo.show();

	//if (Ti.Platform.name === 'android')
   //{
   //	$.infoView.visible=true;
   //	}
   	//else 
   	//{
	//$.infoView.show();
//	}
	
   
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




$.txtFld_Fullname.addEventListener('return', function(e){
        $.txtFld_Idnumber.focus();
    });
    

$.txtFld_Idnumber.addEventListener('return', function(e){
        $.txtFld_Uniname.focus();
    });
    
$.txtFld_Uniname.addEventListener('return', function(e){
        $.txtFld_Phonenumber.focus();
    });
    
    
$.img_Logo.addEventListener('Click', function(e){


	
			$.txtFld_Fullname.blur();	
	 		$.txtFld_Idnumber.blur();	
	        $.txtFld_Uniname.blur();	
	        $.txtFld_Phonenumber.blur();

        
    });    
    
    
    
function backArrowbtn(){
	
	var winInfo = Alloy.createController('login').getView();
	winInfo.open();
	$.register.close();
	
	
}

function onImg_homebtnClicked()
{
	$.register.close();

	
}
