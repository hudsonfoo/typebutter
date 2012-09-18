/* 
* TYPEBUTTER v1.2
* Developed by David Hudson  (@_davidhudson)
* Website design and default font kerning by Joel Richardson (@richardson_joel)
* This work is licensed under a Creative Commons Attribution-ShareAlike 3.0 Unported License: http://creativecommons.org/licenses/by-sa/3.0/
 */
 
(function( jQuery ){
	var typeButterLibrary;
	
	jQuery.fn.typeButterReset = function() {
		typeButterLibrary = null;
	}
	
	// Extend TypeButter with your own library. Sweet!
	jQuery.fn.typeButterExtend = function( newLibrary ) {
		typeButterLibrary = jQuery.extend( newLibrary, typeButterLibrary );
	}
	
	jQuery.fn.typeButter = function( options ) {
		// Create some defaults, extending them with any options that were provided
		var that = this,
			settings = jQuery.extend( {
				'default-spacing'	: '0em', // Set default spacing to 0 if the user hasn't set it at all
				'elementName'		: 'kern' // Default element name. This name doesn't currently exist in HTML5 so if you want to use something that does, change away.
			}, options);
		
		recurseThroughNodes = function (currentNode, copyNode) {
			jQuery(copyNode).contents().each(function () {
				var nextCopy,
				thisNode = jQuery(this),
				thisNodeText = (currentNode.css('text-transform').toLowerCase() == 'uppercase') ? thisNode.text().toUpperCase() : thisNode.text(),
				thisNodeTextCopy = [''];

				if (this.nodeType == 3) {// If this is a text node move it to the original element
					// Get font weight and style information
					var fontWeight 	= currentNode.css('fontWeight').toLowerCase(),
						fontStyle 		= currentNode.css('fontStyle').toLowerCase(),
						fontFamily 		= currentNode.css('font-family').toLowerCase();

					// Set known font weights and styles
					var weightArray	= new Array('normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900'),
						styleArray		= new Array('normal', 'italic', 'oblique');
					
					// Check for and fix expected and unexpected issues with font family, weight and style
					fontFamily = fontFamily.split(','); // Split multiple font familes and assume the top family is the one the browser chose to use (maybe use getComputedStyle to resolve?)
					fontFamily = fontFamily[0].replace(/[^\w\s]/gi, '').replace(/ /g, '-'); // Remove special characters like quotes from font name. Replace spaces with dashes for javascript array compatibility
					if (!jQuery.inArray(fontWeight, weightArray) || fontWeight == '400') fontWeight = 'normal'; // If the font weight isn't recognized or if it's at 400, set it to normal.
					if (!jQuery.inArray(fontStyle, styleArray)) fontStyle = 'normal';
					if (fontWeight == '700') fontWeight = 'bold'; // If font weight is 700 (bold), set it to bold
					
					if (typeButterLibrary[fontFamily] != undefined && typeButterLibrary[fontFamily][fontWeight + '-' + fontStyle] != undefined) { // If the library exists
							for (i = 0; i < thisNodeText.length; i++) {// Search text for error prone text and wrap text with kerning element and modify kerning
								if (typeButterLibrary[fontFamily][fontWeight + '-' + fontStyle][thisNodeText.substring(i, i+2)] != undefined) {
									var kerning = typeButterLibrary[fontFamily][fontWeight + '-' + fontStyle][thisNodeText.substring(i, i+2)];
									kerning = (parseFloat(kerning) + parseFloat(settings['default-spacing'])) + 'em'; // Add default spacing to kern
									thisNodeTextCopy.push('<' + settings.elementName + ' style="letter-spacing:' + kerning + '">' + thisNodeText.substring(i, i+1) + '</' + settings.elementName + '>');
								} else {
									thisNodeTextCopy.push(thisNodeText.substring(i, i+1));
								}
							}
						jQuery(currentNode).append(thisNodeTextCopy.join(''));
					} else { // Library not found for this font/weight/style combination
						jQuery(currentNode).append(thisNode);
						console.log('library not found for ' + fontFamily);
					}
				} else { // Not a text node
					nextCopy = jQuery(this).clone().empty().appendTo(currentNode);
					recurseThroughNodes(nextCopy, this); // Skip to the next node
				}				
			});
		};
		
		return that.each(function(index, node) {
			var el = jQuery(this),
				clone = el.clone();
			el.empty();			
			el.css('letter-spacing', settings['default-spacing']);
			recurseThroughNodes(el, clone);
			
			// If this was the last element that needed kerning, call any callback the user may have specified in the options.
			if (that.length == (index+1) && typeof settings.callback == "function") {
				settings.callback();
			}
		});
	};
})( jQuery ); 