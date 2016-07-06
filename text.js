window.onload = function() {
		var fileInput = document.getElementById('load_file');
		var fileDisplayArea = $('pre');

		fileInput.addEventListener('change', function(e) {
			var file = fileInput.files[0];
			var textType = /text.*/;

			if (file.type.match(textType)) {
				var reader = new FileReader();

				reader.onload = function(e) {
					
					new_doc();
			
					fileDisplayArea.empty();
					$(".transpose-keys").remove();
					var lines = reader.result.split("<br>");

					if (lines.length>1)
					{
						if (lines[0].startsWith("<tone>"))
						{
							var tone = lines[0].slice(6,lines[0].length).trim();
							$("#pre").attr("data-key", tone);
						}
						
						for(var n = 1; n < lines.length; n++) {
						if (lines[n].startsWith("<chords>"))
						{
							$("#documento").append("<span class='chord_line'>" + lines[n].slice(9,lines[n].length) + "</span>\n");
							var arr_chords = lines[n].slice(9,lines[n].length).split(" ");
								for(var m = 0; m < arr_chords.length; m++) {
									if (arr_chords[m].trim() != ""){
										add_usados(arr_chords[m]);
									}
								}
						}
						else
						{
							if (lines[n].startsWith("<lyrics>"))
							{
								$("#documento").append("<span class='lyrics'>" + lines[n].slice(9,lines[n].length) + "</span>\n");
							}
							else
							{
								$("#documento").append("<span class='lyrics'>" + lines[n] + "</span>\n");
							}
						}
					}
				
					
					}
					
					
						
					$("#pre").transpose();
					chords_drag()
				}

				reader.readAsText(file);	
			} else {
				fileDisplayArea.innerText = "File not supported!";
			}
		});
}
