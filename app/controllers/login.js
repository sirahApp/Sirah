var args = arguments[0] || {};

var Cloud = require('ti.cloud');


//Cloud.debug = true;


if (Ti.Platform.name === 'iPhone OS')
{
	$.login.applyProperties({statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT });
}

var first = true;


function onTxtUsr_focus()
{
	if(first){
        first = false;
    }else{
       $.usrNameHint.visible=false;
    }
	
	
}


function onTxtUsr_blur()

{
	
	if($.txtFld_Usrname.value == "")
	{		
	$.usrNameHint.visible=true;
	}	
}
	
	
function onTxtPass_focus()
{
	$.passwordHint.visible=false;
}


function onTxtPass_blur()

{
	if($.txtFld_Pass.value == "")
	{
	$.passwordHint.visible=true;	
	}	

}



function skip_login_btn(){
	
	var win = Alloy.createController('groupList', {crsNumber:1}).getView();
	win.open();
	
}


	
function onBtn_loginClicked(){
	
	//Cloud.Users.login({
			//  login  : 'admin',
		//	  password: 'password',
	//		}, function(e) {
		//	  $.sendinglbl.setText(" جاري تسجيل الدخول ...");	
	//		  if (e.success)   
		//	  {
						$.sendinglbl.setText(" جاري تسجيل الدخول ...");		    
						Cloud.Users.login({
		
						login:$.txtFld_Usrname.getValue(),
						password:$.txtFld_Pass.getValue()
					     //	 login:'admin',
						  //   password:'password'
						}, function (e) {
						//	$.sendinglbl.setText(" جاري تسجيل الدخول ...");
						    if (e.success) {
						        var user = e.users[0];
						      //  alert('Success:\n' +
						        //    'id: ' + user.id + '\n' +
						          //  'sessionId: ' + Cloud.sessionId + '\n' +
						          //  'first name: ' + user.first_name + '\n' +
						          // 'last name: ' + user.last_name);
						     //alert(user);
						    Ti.App.Properties.setString('ID',$.txtFld_Usrname.value);
						    Ti.App.Properties.setString('Name',user.custom_fields.name);
						    Ti.App.Properties.setString('phone',user.custom_fields.phone_number);
						    Ti.App.Properties.setString('uni',user.custom_fields.uni);
   
					
						   
							var win = Alloy.createController('groupList',{crsNumber:2}).getView();
							win.open();
							$.login.close();
							 
						          
						    } else {
						    	$.sendinglbl.setText("");
						      //  alert('Error:\n' + ((e.error && e.message) || JSON.stringify(e)));
						           customAlert();
						    }
					});
						
											

			   
			                 
			//  } else {
				
				
			
		  } 
		//	});	
		



//}


function onBtn_SignUpClicked() {
	
	var winReg = Alloy.createController('register').getView();
	winReg.open();
	$.login.close();		
}

function backArrowbtn()
{
	$.login.close();		
}

function customAlert()
	{	
		var dialog = Ti.UI.createAlertDialog({
		title :'تنبيه',
        message: 'خطأ في الرقم الجامعي/ كلمة المرور',
		buttonNames: ['موافق']
	});
	dialog.show();
	
}


