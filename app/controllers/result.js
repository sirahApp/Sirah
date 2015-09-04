var args = arguments[0] || {};


var userScore=Alloy.Globals.score;



if (Ti.Platform.name === 'iPhone OS')
{
	$.result.applyProperties({statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT });
}


$.btn_result.title=" نتيجة هذه المجموعة:" + userScore;


function onImg_homebtnClicked()
{
	$.result.close();
	
		
	
}

function onImg_register()
{
	var loginView=Alloy.createController('login').getView();
	loginView.open();	
	$.result.close();
	
}
