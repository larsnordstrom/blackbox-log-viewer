'use strict';

/**
 * Configuration
 * 
 * Handle loading and display of configuration file
 * 
 */


function Configuration(file, showConfigFile) {

	// Private Variables
	var that = this; 	  // generic pointer back to this function
	var fileData; 		  // configuration file information
	var fileLinesArray;	  // Store the contents of the file globally	

	function renderFileContentList(configurationList, filter) {
		var li;

		// Clear the contents of the list
		$('li',configurationList).remove();

		for(var i=0; i<fileLinesArray.length; i++) {
			if(!filter || filter.length<1) { //Everything
				li = $('<li class="configuration-row">' + fileLinesArray[i] + '</li>');
				configurationList.append(li);	
			} else {
				var regFilter = new RegExp('(.*)(' + filter + ')(.*)','i');
				var highLight = fileLinesArray[i].match(regFilter);
				if(highLight!=null) { // dont include blank lines
					li = $('<li class="configuration-row">' + highLight[1] + '<b>' + highLight[2] + '</b>' + highLight[3] + '</li>');
					configurationList.append(li);	
				}
			}
		}
	}

	function renderFileContents(filter) {

		var
		configurationElem  = ('.configuration-file'), // point to the actual element in index.html 
		configurationDiv   = $('<div class="configuration-file">' 
							  +		'<div class="configuration-header">' 
							  + 		'<h3>' + file.name
							  + 			'<span class="configuration-close glyphicon glyphicon-remove"></span>'
							  + 		'</h3>'
							  +     	'<input type="text" class="form-control configuration-filter" placeholder="Enter filter" size="5"/>'
							  + 	'</div>'
							  +		'<div><ul class="list-unstyled configuration-list"></ul></div>'
							  +'</div>'),
		configurationTitle = $('h3', configurationDiv),
		li;

		// now replace the element in the index.html with the loaded file information
		$(configurationElem).replaceWith(configurationDiv);

		var configurationList  = $('.configuration-list');
		renderFileContentList(configurationList, null);
		
		//configurationTitle.text(file.name);
		$("#status-bar .configuration-file-name").text(file.name);

		// now replace the element in the index.html with the loaded file information
		$(configurationElem).replaceWith(configurationDiv);


		// Add close icon
		$(".configuration-close").click(function() {
			if(showConfigFile) showConfigFile(false); // hide the config file
		});


	}
	
	function loadFile(file) {

        var reader = new FileReader();
    	fileData = file; 				// Store the data locally;
 
    
        reader.onload = function(e) {
        	
        	var data = e.target.result;	  			// all the data
	    	
	    	fileLinesArray = data.split('\n'); 		// separated into lines

        	renderFileContents();

        	// Add user configurable file filter
	        $(".configuration-filter").keyup(function() {

	        	var newFilter = $(".configuration-filter").val();

				var configurationList  = $('.configuration-list');
				renderFileContentList(configurationList, newFilter);
	        	
	        });

        };
     
        reader.readAsText(file);
    }

    // Public variables and functions
	this.getFile = function() {
		return fileData;
		};

    loadFile(file); // configuration file loaded
	
    // Add filter 
    
}