function onBtn_openlistClicked(e){
	var winList = Alloy.createController('groupList').getView();
};

if (Ti.Platform.name === 'iPhone OS')
{
	$.index.applyProperties({statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT });
}

function onBtn_openaboutClicked(e)
{
	var winAbout = Alloy.createController('about').getView();
	winAbout.open();
	};	

function onBtn_openinfoClicked(e)
{
	var winInfo = Alloy.createController('info').getView();
	winInfo.open();
	};

$.index.open();