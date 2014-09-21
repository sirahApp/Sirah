var args = arguments[0] || {};
function onImg_homebtnClicked(){

$.info.close();
	
}

if (Ti.Platform.name === 'iPhone OS')
{
$.info.applyProperties({statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT });
}

function onImg_logoClicked(){

$.info.close();
	
}


