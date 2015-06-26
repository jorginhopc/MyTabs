window.onload = function() {
		var fileInput = document.getElementById('load_file');
		var fileDisplayArea = $('pre');

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					
					fileDisplayArea.empty();
					 var lines = reader.result.split("<br>");
 
					for(var n = 0; n < lines.length; n++) {
						$( "pre" ).append(lines[n] + "\n");
					}
					   $( "pre" ).transpose();
					   chords_drag()
				}

				reader.readAsText(file);	
			} else {
				fileDisplayArea.innerText = "File not supported!";
			}
		});
}
