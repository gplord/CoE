//  All objects for view

//  Application 

//  EditionView

//  PlayText

//  TextList

//  TextNote

var Note = Backbone.Model.extend({
	// Default attributes for the todo item.
    defaults: function() {
      return {
        type: "text",
        id: 0,
        lemma: "",
        line: 0,
      	value: ""
      };
    },
    initialize: function() {
     
    },
    // Remove this Todo from *localStorage* and delete its view.
    clear: function() {
      this.destroy();
    }
})

NoteView = Backbone.View.extend({
	tagName: "div";
	template: _.template($('#NoteView-template').html()),	
	events:{
		"click" : ""
	}
});

//  MediaListView

//  MediaNoteView




/*
var noteCollection = Backbone.Collection.extend({
	   defaults: function() {
	      return {
	        type: "text",
	        line: 0,
	      	value: ""
	        order: Todos.nextOrder(),
	      };
	    },
		initialize: function(){
			
		},
	    // Reference to this collection's model.
	    model: note,

	    // We keep the Todos in sequential order, despite being saved by unordered
	    // GUID in the database. This generates the next order number for new items.
	    nextOrder: function() {
	      if (!this.length) return 1;
	      return this.last().get('order') + 1;
	    },

	    // Todos are sorted by their original insertion order.
	    comparator: function(todo) {
	      return todo.get('order');
	    }
 });



*/
var lineIndex=new Object;

$(document).ready(function(){
	
	var compiled = _.template($("#textView-template").html());
	$("#textView").html(compiled({"id":"txt123","Title": "A Comedy of Errors", "textBody":"./views/ComedyOfErrors.html"}));
	
	$(".textBody").scroll(handleScroll);
});
function registerLines()
{
	var currentPosition = $(".textBody").scrollTop();

	$.each($("a.ref_line"),function(key,value){

		elpos =$(value).offset().top;
		setPos = parseInt(elpos+currentPosition);

		lineIndex[""+setPos]=$(value).attr("id");
		$(value).mouseover(function(obj){
			
		
			pingLine($(this).attr("id"));
		
		});
	});
	
	
	
	listNotes(commentaryNotes);
	return;
	
}

function showNote(notes,id){
	
	thisnote = _.find(notes,function(note){
		return note.line == id.substring("fn_".length);
	});
	scrollText(thisnote.line);
	highlightLine(thisnote.line);
	
	$("#annoView").html("<div class='noteViewNav'>Back</div><div class='noteViewBody'>"+thisnote.value+"</div>");
	$("#annoView").scrollTop(0);
	$(".noteViewNav").click(function(){
		listNotes(notes,id);
		
	});
}
function listNotes(notes,topNote){
	$("#annoView").html("");
	_.each(notes,function(value,key){
		var txtNote= value.value.replace(/\<[^\>]*\>/g,"");
		txtNote = txtNote.substring(0,txtNote.indexOf("]")+1);
		$("#annoView").append("<div id='fn_"+value.line+"' class='footnote'>"+txtNote+"</div>");
		
	});
	$(".footnote").click(function(){
		showNote(notes,$(this).attr("id").substring("fn_"+length));
		
	});	
	$(".footnote").mouseover(function(){
		$(".selectedLine").removeClass("selectedLine");
		$(this).addClass("selectedLine");	
	});
	
	var loff = $("#"+topNote).offset();
	
	if (loff!=null){
		
		$("#annoView").scrollTop((parseFloat(loff.top+$("#annoView").scrollTop())-$("#annoView").offset().top));
	}
	unhighlight();
	return;
}
function scrollText(line){
	if (line){
		
		loff= $("#"+line).offset();
		if (loff!=null){
			$(".textBody").scrollTop((parseFloat(loff.top+$(".textBody").scrollTop())-$(".textBody").offset().top));
		}

	}
	return;
	
}
function pingLine(line){
	if (line){
		
		loff= $("#fn_"+line).offset();
		if (loff!=null){
			$("#annoView").scrollTop((parseFloat(loff.top+$("#annoView").scrollTop())-$("#annoView").offset().top));
		}

	}
	return;
}

function handleScroll(){
	
	var scrollPos = parseInt($(".textBody").scrollTop())+$(".textBody").css("lineheight");
	while ((_.isUndefined(lineIndex[""+scrollPos]))&&(scrollPos<$(".textBody").height)){
		scrollPos++;
	}
	sel=lineIndex[""+scrollPos];
	pingLine(sel);	
}

function getTextNodesIn(node, includeWhitespaceNodes) {
// http://stackoverflow.com/questions/298750/how-do-i-select-text-nodes-with-jquery
	var textNodes = [], whitespace = /^\s*$/;

    function getTextNodes(node) {
        if (node.nodeType == 3) {
            if (includeWhitespaceNodes || !whitespace.test(node.nodeValue)) {
                textNodes.push(node);
            }
        } else {
            for (var i = 0, len = node.childNodes.length; i < len; ++i) {
            	 if (node.childNodes[i].nodeName.toLowerCase()=="a"){
                	break;
                }
            	getTextNodes(node.childNodes[i]);
            }
        }
    }

    getTextNodes(node);
    return textNodes;
}

function highlightLine(line){
	
	next = $("#"+line)[0].nextSibling;

	while ((next!=null)&&(next.nodeName.toLowerCase()!="a")){
		
		if (next.nodeType==3){
	
			$(next).wrap("<span class='highlight'/>");
			next = $(next).parent();
		}
		else{
			tns = getTextNodesIn(next);
			for (var i=0;i<tns.length;i++){
				$(tns[i]).wrap("<span class='highlight'/>");
			}
		}

		next = $(next)[0].nextSibling;
		
	}

}
function unhighlight(){
	
	$(".highlight").each(function(key,value){

		$(value).contents().unwrap();
	});
	
}