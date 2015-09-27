var args = arguments[0] || {};
function backArrowbtn()
{
	$.info.close();	
}

if (Ti.Platform.name === 'iPhone OS')
{
	$.info.applyProperties({statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT });
}

function onImg_logoClicked()
{
	$.info.close();	
}


function onBtn_resultClicked()
{
	var link ='https://twitter.com/Nourainclub';
	Titanium.Platform.openURL(link); 
	
}
