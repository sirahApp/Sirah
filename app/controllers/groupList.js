var args = arguments[0] || {};


Alloy.Collections.groups.fetch();
Alloy.Collections.sirah.fetch();
Alloy.Collections.sirah2.fetch();

var courseNumber=args.crsNumber;

Alloy.Globals.score=0;


if (Ti.Platform.name === 'iPhone OS')
{
	$.groupList.applyProperties({statusBarStyle:Titanium.UI.iPhone.StatusBar.LIGHT_CONTENT });
}



if(courseNumber==1){
 		
$.btn18.visible='false';
$.btn19.visible='false';
$.btn20.visible='false';

$.img_profile.visible='false';
$.backArrow.visible='true';

		

}
else if (courseNumber==2)
{
	$.backArrow.visible='false';
	$.img_profile.visible='true';
		
};


function openDetails(e){
	
 	var btnId =e.source.id;
 	var groupNumber= btnId.substring(3);
 	e.source.backgroundColor="#CD9365";
 	
 	if(courseNumber==1){
 		
 	    var win = Alloy.createController('player', {
		sirah: Alloy.Collections.sirah.at(((groupNumber-1)*6)), // get the first question
		group: Alloy.Collections.groups.at(groupNumber-1),
		courseNumber:courseNumber 
		});	
 		
		win.getView().open();
		
 	} else if(courseNumber==2){
 		
 	    var win = Alloy.createController('player', {
		sirah: Alloy.Collections.sirah2.at(((groupNumber-1)*5),courseNumber), // get the first question
		group: Alloy.Collections.groups.at(groupNumber-1),
		courseNumber:courseNumber
		
});
	win.getView().open();
 		
 	}
 	

	
		
		$.groupList.close();
}



//function onImg_homebtnClicked()
//{
//	$.groupList.close();	
	
//}



function onImg_profile(){
	
	var profileView=Alloy.createController('profile',{prvWindowID:'groupList'}).getView();
	profileView.open();

	
	
}


var pWidth1 = Ti.Platform.displayCaps.platformWidth*0.11;
var pWidth2 = Ti.Platform.displayCaps.platformWidth*0.44;
var pWidth3 = Ti.Platform.displayCaps.platformWidth*0.66;
var pWidth4 = Ti.Platform.displayCaps.platformWidth*0.88;


var heightofBtn=Ti.Platform.displayCaps.platformWidth*0.125;



function backArrowbtn()
{
	$.groupList.close();	
	
}



$.groupList.open();
