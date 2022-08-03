var ImageInput = $.extend({}, ImageInput, {

    events: [
        ["change", "onChange", "input[type=text]"],
        ["click", "onClick", "button"],
        ["click", "onClick", "img"],
	 ],

	setValue: function(value) {
		if (value.indexOf("data:image") == -1 && value != "none")
		{
				$('input[type="text"]', this.element).val(value);
				$('img', this.element).attr("src",value);
		}
	},

    onChange: function(e, node) {
		//set initial relative path
		let src = this.value;
		
		delay(() => { 
			//get full image path
			let img = $("img", e.data.element).get(0);
			
			if (img.src) {
				src = img.src;
			}
			
			if (src) {
			    e.data.element.trigger('propertyChange', [src, this]);
			}
		}, 500);
		
		//e.data.element.trigger('propertyChange', [src, this]);
		
		//reselect image after loading to adjust highlight box size
		WEO.Builder.selectedEl.get(0).onload = function () {
				if (WEO.Builder.selectedEl) {
					WEO.Builder.selectedEl.click();
				}
		};
	},
		
    
    onClick: function(e, element) {
		if (!WEO.MediaModal) {
			WEO.MediaModal = new MediaModal(true);
			WEO.MediaModal.mediaPath = window.mediaPath;
		}
		console.log("WEO media:", WEO)
		WEO.MediaModal.open(this);        
    },
    
	init: function(data) {
		return this.render("imageinput-gallery", data);
	},
  }
);
