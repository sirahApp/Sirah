function onBtn_openlistClicked(e){
	var win = Alloy.createController('groupList', {crsNumber:1}).getView();
	win.open();
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
	
	
function onBtn_signInClicked(e)
{
	var winInfo = Alloy.createController('login').getView();
	winInfo.open();
	};	

//$.img_Bg.setScaleType(ScaleType.FIT_XY);

$.index.open();