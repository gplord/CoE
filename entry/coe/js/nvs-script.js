var CarouselState = null;
var currentDoc = null;
var cid = 0;
var selAnchor = null;
var notesSchema = [{"kind":"fusiontables#column","columnId":0,"name":"timestamp","type":"DATETIME"},{"kind":"fusiontables#column","columnId":1,"name":"line","type":"STRING"},{"kind":"fusiontables#column","columnId":2,"name":"label","type":"STRING"},{"kind":"fusiontables#column","columnId":3,"name":"lemma","type":"STRING"},{"kind":"fusiontables#column","columnId":4,"name":"value","type":"STRING"}];


	  


var token = "";
function captureScroll(){
	x = $(".imgBox").scrollLeft();
	
	y = $(".imgBox").scrollTop();
	console.log(currentPage+" "+x+" "+y);
	old = $("#coords").val();
	$("#coords").val(old+"{'page':"+currentPage+"','y':'"+y+"','x':'"+x+"'},");
	
}
$(document).ready(function(){
	//$("#annotations").html("<textarea rows=100 cols=100 id='coords'></textarea>")
	
	
	_.each(sceneIndex,function(val,key){
		actsc = val.scene;
		act = val.scene.substring("Act".length,val.scene.indexOf("Scene"));
		scene = val.scene.substring(val.scene.indexOf("Scene")+"scene".length);
		actsc = "act"+act+"_+"+scene;
		if (key<sceneIndex.length-1){
		$("#progress_line").append("<li id='act"+actsc+"'><a class='progress_marker'><p>Act "+act+", Scene "+scene+"</p></a></li>")
		
		len = parseInt(sceneIndex[key+1].page)-parseInt(val.page);
		console.log("len "+len);
		percent = parseInt((len/pages.length)*100);
		console.log(percent);
		$("#progress ul li#"+actsc).width(percent+"%");
		}
	
	}	);
		
		
	$("#progress ul li").hover(
			function() {
				$(window).mousemove(mouseProgressPreview);
				percent = parseFloat($('#progress_seek').width())/parseFloat($("#progress").width());
				aPage = parseInt(percent*pages.length);
				console.log("prev page "+aPage);
				p = pages[parseInt(aPage)-1];
				console.log("P SCENE "+p.scene);
				act = p.scene.substring("Act".length,p.scene.indexOf("Scene"));
				scene = p.scene.substring(p.scene.indexOf("Scene")+"scene".length);
				console.log(act+"  "+scene);
				previewStuff = $(p.html).text().substring(0,50);
				$("#progress_preview").html("<h3>Act "+act+", Scene "+scene+"</h3>"+previewStuff);
			

				$('#progress_preview').show();
				$('#progress_seek').show();
			
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
					
					aPage = parseInt(percent*pages.length);
					goToPage(aPage);
				});

		

	lineIndex=new Object;
	
	listNotes(commentaryNotes);
	locstr = (window.location)+"";

	locstr = locstr.substring(locstr.indexOf("&access_token=")+"&access_token=".length);
	token = locstr.substring(0,locstr.indexOf("&token"));

	$("#page").mouseup(function(){
		if ($('.editNoteOpts').size()>0){
		$(".editNoteOpts").replaceWith("<span id='addNote'>Add</span>");
		$("#addNote").unbind();
		
		$("#addNote").click(function(){
    		addNote();
    	  
    	});
		}
		sel = rangy.getSelection();
		selPrev = sel.toString();
		selAnchor = getLineAnchor(sel.focusNode);
		
		if (selPrev.length>15){
			selPrev = selPrev.substring(0,selPrev.indexOf(" "))+"..."+selPrev.substring(selPrev.lastIndexOf(" "));
		}
		$("#textSelectionPrev").html("<strong>"+selPrev+"</strong>");
	});
	$("#annotations_login").click(function(){
		  var config = {
			      'client_id': '591726924587.apps.googleusercontent.com',
			      'scope': ['https://www.googleapis.com/auth/drive',"https://www.googleapis.com/auth/fusiontables"]
			    };
			    gapi.auth.authorize(config, function() {
			     $(".login").html("Logout");	
			      //token = gapi.auth.getToken();
				  login();	
			    });

	
	});

	goToPage(1);
	$(".pageLink").click(function(){
		scrollToLink();
	});
	$("#next").click(function(){
		nextPage();
	})
	$("#pageflip").click(function(){
		nextPage();
	})
		$("#prev").click(function(){
		prevPage();
	})
});
function mouseProgressPreview(e) {
	var progress = $('#progress').offset();
	$('#progress_preview').css({ cursor: 'move', left: e.pageX-progress.left-100});
	$('#progress_seek').css({ cursor: 'move', width: e.pageX-progress.left+'px'});
	return;
}
function scrollToLink(){
	carousel = $('#mycarousel').data('jcarousel');
	num = carousel.first;
	
	img = imageList[(parseInt(num)-1)]["n"];
	line = _.find(folioImages,function(value,key){
		return value.image==img;
	});
	scrollText(line.id);
}
function showImage(id){
	console.log(id);
	if (id.toLowerCase()=="front"){
		num=0
	}
	else{
	n = _.find(folioImages,function(value,key){
		return value.id==id;
	})
	console.log(id+" "+n);
	num = parseInt(n.image);
	}
	console.log(num);
	url = imageList[num].url;
	
	$("#frame_tab_book").html("<div class='imgBox'><a rel='pageImage' class='pageImage' href='"+url+"'><img src='"+url+"'/></a></div>");
	$(".pageImage").fancybox({
		'transitionIn'		: 'none',
		'transitionOut'		: 'none'
	});
	
}
function login(){

	$(".annoContent").show()

    gapi.client.load('drive', 'v2', function() {
        var request = gapi.client.drive.files.list({
          'q': "mimeType = 'application/vnd.google-apps.folder' and title='nvs_notes_folder'"
        });
        request.execute(function(resp) {
 	     console.log(JSON.stringify(resp));
         if (resp.items==null){

        	 finalreq = gapi.client.request({
        	        'path': '/drive/v2/files',
        	        'method': 'POST',
        	        'body':{
        	            "title" : "nvs_notes_folder",
        	            "mimeType": "application/vnd.google-apps.folder",
        	            "description" : "Shakespeare notes folder"
        	         }});

     		 
     		 finalreq.execute(function(json){
     			 console.log(json);
     			 console.log(json.items[0].id);
     			selectDefaultNotes(json)
     		
     		 });
     		
     		
     		
     	}
         else{
        	 selectDefaultNotes(resp);
         }

       
        });
      });
	

}
function selectDefaultNotes(container){
	gapi.client.load('drive', 'v2', function() {
	console.log(container.items[0].id);
	parentId = container.items[0].id;
	$(".annoContent")
	var request = gapi.client.drive.files.list({
        'q': "'"+container.items[0].id+"' in parents and trashed=false"
      });
	 
      request.execute(function(resp) {
    	  
    	  if ((resp.items!=null)){
    		  
    		  currentDoc = resp.items[0];
    		  cid = currentDoc.id;
    		  sql="SELECT ROWID, 'line', 'label', 'lemma', 'value' FROM "+cid
    		  insertsql = gapi.client.request({
    				
    		       'path': '/fusiontables/v1/query?sql='+encodeURIComponent(sql),
    		    		   
    		        'method': 'POST'});
    		insertsql.execute(function(resp){
    			
    			 console.log(JSON.stringify(resp));
    			 rows = resp.rows;
    			 console.log(rows.length);
    			 for (i=0;i<rows.length;i++){
    				
    				noteObj = {"id":"un_"+rows[i][0],"line":rows[i][1],"label":rows[i][2],"lemma":rows[i][3],"value":rows[i][4],"type":"userNote"};
    				console.log("NOTEOBJ: "+JSON.stringify(noteObj))
    				newpos = _.sortedIndex(commentaryNotes,noteObj,function(val){
    					return val.line
    				});
    				commentaryNotes.splice(newpos,0,noteObj);
    				
    			 }
    			 listNotes(commentaryNotes);
    			 
    	  });
    		}
    	  else{
    		  gapi.client.load('fusiontables', 'v1', function() {
    
    	    		 var filereq = gapi.client.request({
    	      	        'path': '/fusiontables/v1/tables',
    	      	        'method': 'POST',
    	      	        'body':
    	      	        	{
    	      		          'columns': notesSchema, 
    	      		        /*	  
    	      		        	  [{"kind":"fusiontables#column","columnId":1,"name":"timestamp",
    	      		        	  			"type":"DATETIME"},
    	      		        	  			{"kind":"fusiontables#column","columnId":2,"name":"anchorId",
    	      		        	  				"type":"STRING"},
    	      		        	  				{"kind":"fusiontables#column","columnId":3,"name":"noteText",
    	      		        	  				 "type":"STRING"}
    	      		        	  			
    	      		        	  			],*/
    	      		        	'name': "Default notes",
    	      		        	'isExportable':true,
    	      		        	'parents':[{'id':parentId}]
    	      		          }
    	      	         });      
   

   		 
   		 filereq.execute(function(json){
   			 console.log("Created "+JSON.stringify(json));
   			gapi.client.load('drive', 'v2', function() {
   			parentreq = gapi.client.request({
      	        'path': '/drive/v2/files/'+json.tableId+"/parents",
      	        'method': 'POST',
      	        'body':{
      	          
      	        "id":parentId
      	         }});
   			parentreq.execute(function(newjson){
   				console.log("Parented "+JSON.stringify(newjson));
   				cid = json.tableId;
   			
   				});
   			});
   			});
   		 
   			 
   		 
   		 });
    		  }
    	  });
    	  $(".annomenu").html("<span><a href='#'>Select Notes File</a></span>");
    	  
    	  $(".annoContent").html("");
    	$(".annoContent").html('<span id="textSelectionPrev"></span></span><textarea id="UserNoteBox"></textarea>');
    	$("#annotations_login").replaceWith("<a class='button' id='addNode'>Save</a>")
    	$("#addNote").unbind();
    	
    	$("#addNote").click(function(){
    		
    		addNote();
    	  
    	});
    	
      
	});
}
function addNote(){
	
    lineabbrev = $("#textSelectionPrev").text();
    note = $("#UserNoteBox").val();
    prev=selAnchor;
    while ((prev!=null)&&(prev.nodeName.toLowerCase()!="a")){
		
		if (next.nodeType==3){
	
			
			prev = $(prev).parent();
		}


		prev = $(prev)[0].previousSibling;
		
	}
    lineStart = parseInt(prev.id.lastIndexOf("_"))+1;
 
    lineNum = parseInt(prev.id.substring(lineStart));

	saveNote({"line":prev.id,"label":lineNum,"lemma":lineabbrev,"value":note});
}
function saveNote(noteObj){
	
	$("#UserNoteBox").val("");
	console.log(JSON.stringify(noteObj));
	
	

	ts = new Date().getTime();
	//cid = "1OPeTUyTlVTFmxJqVM5sV0lutzFduYcDXElcINbA";
	sql = "INSERT INTO "+cid+" ('timestamp',";
	_.each(noteObj,function(value,key){
		sql = sql+"'"+key+"',"
	});		
	sql = sql.substring(0,sql.length-1)+")";
	sql=sql+"VALUES ('"+ts+"',";
	_.each(noteObj,function(value){
		sql = sql+"'"+value+"',"
	});
	sql = sql.substring(0,sql.length-1)+")";
	
	insertsql = gapi.client.request({
		
        'path': '/fusiontables/v1/query?sql='+encodeURIComponent(sql),
        'method': 'POST'});
insertsql.execute(function(resp){
	 console.log(resp);
	 noteObj.type="userNote";
	 noteObj.id="un_"+ts;
		newpos = _.sortedIndex(commentaryNotes,noteObj,function(val){
			return val.line
		});
		commentaryNotes.splice(newpos,0,noteObj);
		listNotes(commentaryNotes);
 });
}
function checkTableValidity(id){
	finalreq = gapi.client.request({
	        'path': '/fusiontables/v1/tables/'+id,
	        'method': 'GET'});
	 finalreq.execute(function(resp){
		 return (JSON.stringify(resp.columns)==JSON.stringify(notesSchema));
	 });
}
function JSONreturned(data){
	
	callDocApi("files","checkDocList",encodeURIComponent("mimeType = 'application/vnd.google-apps.folder' and title='nvs_notes_folder'"));
}


function getLineAnchor(node){
		while ((node!=null)&&(node.nodeName.toLowerCase()!="a")){
		if (node.previousSibling==null){
		
			node=$(node).parent()[0];
		}
		else{
		node = node.previousSibling;
		}
	}
	return node;
		
}


function showNote(notes,id){
	console.log(id);
	
	thisnote = _.find(notes,function(note){
		return note.id == id;
	});
	console.log(JSON.stringify(thisnote));
	if (thisnote.line.indexOf(" ")>0){
	textline = thisnote.line.substring(0,thisnote.line.indexOf(" "));
	}
	else{
		textline = thisnote.line;
	}
	newPageIndex = _.find(noteIndex,function(num){
		return num.id==textline;
	});
	goToPage(parseInt(newPageIndex.page))
	
	scrollText(textline);
	highlightLine(textline);
	$("#footnotes").append("<a id='footnotes_back' class='button'>&laquo; Back</a>");
	if ($("#"+id).hasClass("userNote")){
		$("#footnotes").append("<div class='button' id='editNote'>Edit</span>");
	}
	
	$("#footnotes_list").html("<div class='noteViewBody'>"+thisnote.label+" "+thisnote.lemma+" ] "+thisnote.value+"</div>");
	$("#annoView").scrollTop(0);
	$("#footnotes_back").click(function(){
		$("#footnotes_back").remove();
		$("#editNote").remove();
		listNotes(notes,id);
		
	});
	$("#footnotes_back").click(function(){
		editNote(notes,id);
	});
}
function goToPage(id){
	currentPage = id;
	console.log("Going to page: "+id);
	/*imgId = _.find(pageImages,function(num){
		return num.page == id;
	})*/
	imgId = pages[(id-1)].fol;
	$("#page_number").text(id);
	$("#total_pages").text(pages.length);
	percent = id/pages.length;
	
	$("#progress_bar").width(""+parseInt(percent*100)+"%");
	console.log(imgId);
	showImage(imgId)
	$("#page").html(pages[(id-1)].html);
	pageCord = _.find(imagePositions,function(val){
		console.log(val);
		return parseInt(val.page)==currentPage;
	});

	
	$(".imgBox").scrollTop(pageCord.y);
	$(".imgBox").scrollLeft(pageCord.x);
}
function editNote(notes,id){
	thisnote = _.find(notes,function(note){
		return note.id == id;
	});
	$("#textSelectionPrev").html("<strong>"+thisnote.lemma+"</strong>");
	$("#UserNoteBox").val(thisnote.value);
	$("#addNote").replaceWith("<div class='editNoteOpts'><span class='saveEdit'>Save</span> <span class='deleteNote'>Delete</span></div>");
	$(".saveEdit").click(function(){
		saveEdit(notes,thisnote, $("#UserNoteBox").val());
	});
	$(".deleteNote").click(function(){
		deleteNote(notes,thisnote);
	});
	
}
function deleteNote(notes,dnote){
	$("#textSelectionPrev").html("");
	$("#UserNoteBox").val("");
	did = dnote.id.substring("un_".length);
	console.log("deleted "+did);
	
	sql = "DELETE FROM "+cid+" WHERE ROWID = '"+did+"'";
	
	insertsql = gapi.client.request({
		
        'path': '/fusiontables/v1/query?sql='+encodeURIComponent(sql),
        'method': 'POST'});
insertsql.execute(function(resp){
	 console.log(resp);
	 index = _.indexOf(notes,dnote);
	 notes.splice(index,1);
	 listNotes(notes);});
}
function saveEdit(notes,thisnote,newtext){
	deleteNote(notes,thisnote);
	saveNote({"line":thisnote.line,"label":thisnote.label,"lemma":thisnote.lemma,"value":newtext});

	console.log("edited");
}
function listNotes(notes,topNote){
	$("#footnotes_list").html("<table><tbody></tbody></table>");
	
	_.each(notes,function(value,key){
		var txtNote= value.value.replace(/\<[^\>]*\>/g,"");
		if (value.type=="userNote"){
		colorNum = 2;
		}
		else
			{
			colorNum=1;
			}
			noteHTML = "<tr id='"+value.id+"' class='footnote'><td class='notemediatype'></td><td class='noteNum'><a class='footnote_color tag"+colorNum+"'>"+value.label+"</a></td><td class='noteLemma'>"+value.lemma+"</td></tr>";
		
		$("#footnotes_list>table>tbody").append(noteHTML);
	
	});
	$(".footnote").click(function(){
		showNote(notes,$(this).attr("id"));
		
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
			$("#page").scrollTop((parseFloat(loff.top+$("#page").scrollTop())-$("#page").offset().top));
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
	
	var scrollPos = parseInt($("#page").scrollTop())+$("#page").css("lineheight");
	while ((_.isUndefined(lineIndex[""+scrollPos]))&&(scrollPos<$("#page").height)){
		scrollPos++;
	}
	sel=lineIndex[""+scrollPos];
	if (!(_.isUndefined(sel))){
	$.each(sel,function(key,value){
		
		$("#page").trigger({"type":value.type,"id":value.id});
	});
	}

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

	next=null;
	console.log(line);
	if ($("#"+line)[0]){
	next = $("#"+line)[0].nextSibling;
	}
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
currentPage = 1;
function nextPage(){
	currentPage++;
	goToPage(currentPage);
//	$("#page").html(pages[currentPage].html);
}
function prevPage(){
	currentPage--;
	goToPage(currentPage);
	//$("#page").html(pages[currentPage].html);
}