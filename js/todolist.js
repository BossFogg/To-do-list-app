initHeader();
initList();


//add listeners to header
function initHeader() {
	//listen for enter key on master input
	$(".master-input").keypress(function(event){
		//if enter key is pressed, and input has a value. add an item to the list
		if(event.which===13 && $("input[name='todo']").val()!=="") {
			addItem();
		}
	});
	//listen for click on save button. This is a secondary way to call addItem()
	$(".save").on("click", function(){
		if($("input[name='todo']").val()!==""){
			addItem();
		}
	});
	//listen for click on expand button
	$(".desc-expand").on("click", function(){
		$(".extra-input").toggleClass("hidden");
	});
	//listen for click on clear all completed button.
	$(".clear").on("click", function(){
		var deleted = $(".done");
		deleteItem(deleted);
	});
};
//add listeners to list
function initList() {
	//listen for clicks to list item content and toggle done
	$("ul").on("click", ".content", function(event){
		$(this).parent().toggleClass("done");
		event.stopPropagation();
	});
	//listen for delete button and delete relevant list item
	$("ul").on("click", ".delete-btn", function(event){
		var deleted = $(this).parent().parent();
		deleteItem(deleted);
		event.stopPropagation();
	});
	//listen for clicking edit button...
	$("ul").on("click", ".edit-btn", function(event){
		//grab content and editor divs...
		var content = $(this).parent().parent().children(".content");
		var editor = $(this).parent().parent().children(".editor");
		if (editor.hasClass("hidden")) {
			//if editor is hidden, toggle visibility and assign current text to input values
			toggleEditor(content, editor);
			editor.children("input[name='todo-edit']").val(content.children(".title").text());
			editor.children("input[name='desc-edit']").val(content.children(".desc").text());
		}
		else {
			//if editor is open, update item
			updateItem(content, editor);
		}
		event.stopPropagation();
	});
	//click enter to update content of item. This is an alternative to clicking the edit button again
	$(".edit-input").keypress(function(event){
		if(event.which===13) {
			var content = $(this).parent().parent().children(".content");
			var editor = $(this).parent().parent().children(".editor");
			updateItem(content, editor);
		}
	});
};
function toggleEditor(content, editor) {
	editor.toggleClass("hidden");
	content.toggleClass("hidden");
};
function updateItem(content, editor) {
	var title = editor.children("input[name='todo-edit']").val();
	var desc = editor.children("input[name='desc-edit']").val();
	toggleEditor(content, editor);
	content.children(".title").text(title);
	content.children(".desc").text(desc);
};
function addItem() {
	var textInput = $("input[name='todo']").val();
	var descInput = $("input[name='desc']").val();
	var editorHTML = "</p></div><div class='editor hidden'><input type='text' class='edit-input' name='todo-edit'><input type='text' class='edit-input' name='desc-edit'></div>";
	var controlsHTML = "<div class='controls'><span class='delete-btn'>(X)</span><span class='edit-btn'>(edit)</span></div></li>";
	$("input[class='master-input']").val("");
	$("ul").append("<li><div class='content'><h2 class='title'>" + textInput + "</h2><hr><p class='desc'>" + descInput + editorHTML + controlsHTML);
};
function deleteItem(deleted) {
	deleted.fadeOut(500, function(){
		$(this).remove();
	})
};