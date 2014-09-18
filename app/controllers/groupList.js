var args = arguments[0] || {};


Alloy.Collections.groups.fetch();
Alloy.Collections.sirah.fetch();
Alloy.Globals.score=0;

if (Ti.Platform.name === 'iPhone OS')
{
$.groupList.applyProperties({statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT });
}
function openDetails(e){
 	var groupNumber=e.itemindex+1;
	console.log('e.itemindex '+ e.itemIndex);
	var win = Alloy.createController('player', {
		sirah: Alloy.Collections.sirah.at(e.itemIndex*6), // get the first question
		group: Alloy.Collections.groups.at(e.itemIndex) 
	});
	
	win.getView().open();
	$.groupList.close();
}



function onImg_homebtnClicked(){

$.groupList.close();
	
}

$.groupList.open();
