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

$("#progress ul li").hover(
	function() {
		$('#progress_preview').show();
		$('#progress_seek').show();
		$(window).mousemove(mouseProgressPreview);
	},
	function() {
		$('#progress_preview').hide();
		$('#progress_seek').hide();
		$(window).unbind('mousemove', mouseProgressPreview);
	}
);
$("#progress ul li").click(
		function(){
			
			percent = parseFloat($('#progress_seek').width())/parseFloat($("#progress").width());
			alert(percent);
			aPage = parseInt(percent*pages.length);
			goToPage(aPage);
		});

function mouseProgressPreview(e) {
	var progress = $('#progress').offset();
	$('#progress_preview').css({ cursor: 'move', left: e.pageX-progress.left-100});
	$('#progress_seek').css({ cursor: 'move', width: e.pageX-progress.left+'px'});
}


$('#footnotes_back').click(function() {
	
	disableTab('tab_audio');
	// FOOTNOTES BACK BUTTON CODE HERE

});
$('#annotations_save').click(function() {
	
	// ANNOTATIONS SAVE BUTTON CODE HERE

});
$('#annotations_delete').click(function() {
	
	// ANNOTATIONS DELETE BUTTON CODE HERE

});