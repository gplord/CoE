var activeTab;
function activateTab(id) {
	if (activeTab) {
		$('#'+activeTab).removeClass('active').addClass('inactive');
		$('#frame_'+activeTab).hide();
	}	
	activeTab = id;
	$('#'+id).removeClass('inactive').addClass('active');
	
	// CODE TO LOAD TAB CONTENTS HERE
	$('#frame_'+id).show();
	
}
function enableTab(id) {
	$('#'+id).removeClass('disabled').addClass('inactive');
}
function disableTab(id) {
	$('#'+id).removeClass('active inactive').addClass('disabled');
}


$('#testtabs').click(function() {
	populateTabs({'image':1,'audio':1,'video':5,'3d':1,'map':1});
});

// Accepts input as associative object in the following format (in any order):
// { 'images':1,'audio':0,'video':5,'3d':1,'map':0 }
// where the value determines the active/inactive state and displayed number of the tab

function populateTabs(obj) {
	$.each(obj, function(key, value) {
		$('#tab_'+key+' span').html(value);
		if (value) {
			enableTab('tab_'+key);
		} else {
			disableTab('tab_'+key);;
		}
	});
	activateTab('tab_book');
}

// Begin page state with Book tab active
activateTab('tab_book');

$('.tab').click(function() {
	if (!$(this).hasClass('disabled')) {
		var id = $(this).attr('id');
		activateTab(id);
	}
});

$('#footnotes_back').click(function() {
	disableTab('tab_audio');
});
$('#annotations_save').click(function() {});
$('#annotations_delete').click(function() {});

$('#testFade').click(function() {
	$('#logo').fadeOut('slow', function() {});
});
