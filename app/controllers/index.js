function onBtn_openlistClicked(e){
	//console.log('item Clicked '+ e.index);
var winList = Alloy.createController('groupList').getView();

	};
	
function onBtn_openaboutClicked(e){
	//console.log('item Clicked '+ e.index);
var winAbout = Alloy.createController('about').getView();
	winAbout.open();
	};	

function onBtn_openinfoClicked(e){
	var winInfo = Alloy.createController('info').getView();
	winInfo.open();
	};

	
$.index.open();
