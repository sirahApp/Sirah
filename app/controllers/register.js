var args = arguments[0] || {};
var Cloud = require('ti.cloud');
Cloud.debug = true;  // optional; if you add this line, set it to false for production

var userScore=Alloy.Globals.score;


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
	var alertText="فضلا أدخل";
		    if (($.txtFld_Fullname.value==" " ) || (! $.txtFld_Fullname.hasText()) )
		{
			alertText+=" الاسم الرباعي ..";
			} 
		  
		    if (( $.txtFld_Idnumber.value==" ") || (!$.txtFld_Idnumber.hasText()))
		{
			alertText+=(" الرقم الجامعي .. ");
			}
			
			if ( ( $.txtFld_Uniname.value==" ") || (! $.txtFld_Uniname.hasText()) )
		{
			alertText+=" اسم الجامعة ..";
			} 
			
			if ( ( $.txtFld_Phonenumber.value==" ") || (! $.txtFld_Phonenumber.hasText()) )
		{
			alertText+= " رقم الجوال ..";
			} 
			return alertText;
}

function sendScore()
	{
		alertText = setAlertText();
		
		if (($.txtFld_Fullname.value==" " ) || (! $.txtFld_Fullname.hasText()) ||( $.txtFld_Idnumber.value==" ") || (!$.txtFld_Idnumber.hasText()) || ( $.txtFld_Uniname.value==" ") || (! $.txtFld_Uniname.hasText()) || ( $.txtFld_Phonenumber.value==" ") || (! $.txtFld_Phonenumber.hasText()))
		{
				alert(alertText);
				
		}
		
		else if (checkIndex != 1)
				{
					alert("الرجاء الموافقة على التعهد بالشروط");
					}
		else
		{
			Cloud.Users.create({
    first_name: $.fullName.value,
    password: "password",
    password_confirmation: "password",
    username: $.IdNumber.value,
    custom_fields:'{
 					 "score": userScore,
 					 "phone_number": $.phoneNumber.value
 					 "university":$.uniName.value}'
 					 }
 					, function (e) {
 		checkFields(first_name, username, phone_number,university);
    if (e.success) {
     console.log("user created successfully");
    } else {
     console.log("oops, something went wrong");// 
    }
});	
		} 
	
	}

//$.grptxt.text=args.groupid;
//$.scoretxt.text="Your Score  "+ Alloy.Globals.score;

console.log("Score" + Alloy.Globals.score);

function onImg_homebtnClicked()
	{
		var dialog = Ti.UI.createAlertDialog({
		title :' العودة للقائمة الرئيسية',
		message: 'بالعودة للقائمة الرئيسية ستفقد جميع المعلومات و لن يتم اعتبار الاجابات، هل أنت متأكد بأنك تريد العودة للقائمة الرئيسية ؟',
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

