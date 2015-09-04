var args = arguments[0] || {};


if (Ti.Platform.name === 'iPhone OS')
{
	$.courses.applyProperties({statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT });
}

function onBtn_openCourse1(e)
{
	

	var win = Alloy.createController('groupList', {crsNumber:1}).getView();
	win.open();
	$.courses.close();
	};	

function onBtn_openCourse2(e)
{
	var win = Alloy.createController('groupList',{crsNumber:2}).getView();
	win.open();
	$.courses.close();
	};


//function backArrowbtn(){
	
//	$.courses.close();
	
//}

function onImg_homebtnClicked()
{
	$.courses.close();	
	
}
