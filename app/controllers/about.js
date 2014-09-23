var args = arguments[0] || {};

function onImg_homebtnClicked()
{
	$.about.close();
}

if (Ti.Platform.name === 'iPhone OS')
{
	$.about.applyProperties({statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT });
}

function openTwitter()
{
	var link ='https://twitter.com/Nourainclub';
	Titanium.Platform.openURL(link); 
}

function openFacebook()
{
	var link ='https://www.facebook.com/NourainClubDU';
	Titanium.Platform.openURL(link); 
}

function openBlog()
{
	var link ='http://nadialnourain.com';
	Titanium.Platform.openURL(link); 
}

function openYouTube()
{
	var link ='http://www.youtube.com/user/NourainClub';
	Titanium.Platform.openURL(link); 
}

