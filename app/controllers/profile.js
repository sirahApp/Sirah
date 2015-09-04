var args = arguments[0] || {};


var Cloud = require('ti.cloud');


if (Ti.Platform.name === 'iPhone OS')
{
	$.profile.applyProperties({statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT });
}




function show_profile(){

Cloud.Users.showMe(function (e) {
    if (e.success) {
        var user = e.users[0];
//$.txtFld_Idnumber.text=user.Username;
//$.txtFld_Uniname.text=user.custom_fields.uni;
//$.txtFld_Fullname.text=user.custom_fields.name;
//$.txtFld_Phonenumber.text=Ti.App.Properties.getString('phone');
          

            
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});


$.txtFld_Idnumber.text=Ti.App.Properties.getString('ID');
$.txtFld_Uniname.text=Ti.App.Properties.getString('uni');
$.txtFld_Fullname.text=Ti.App.Properties.getString('Name');
$.txtFld_Phonenumber.text=Ti.App.Properties.getString('phone');

}



function backArrowbtn(){

	$.profile.close();

	
}


function onBtn_SignOutClicked(){
		var dialog = Ti.UI.createAlertDialog({
		title :'تنبيه ',
		message: 'هل أنت متأكد من أنك تود تسجيل الخروج؟',
		buttonNames: ['نعم','إلغاء']
	});	
	dialog.addEventListener('click',function(e){
		
		Cloud.Users.logout(function (e) {
    if (e.success) {
        customAlert('تم تسجيل خروجك بنجاح');
        $.profile.close();
		
		var indexView=Alloy.createController('index').getView();
		indexView.open();
	
        
        
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});
	
		$.profile.close();
		Ti.App.Properties.removeProperty('ID');
		Ti.App.Properties.removeProperty('uni');		
		Ti.App.Properties.removeProperty('Name');
		Ti.App.Properties.removeProperty('phone');
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
