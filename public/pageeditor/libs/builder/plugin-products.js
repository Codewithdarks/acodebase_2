var ProductInput = $.extend({}, ProductInput, {

    events: [
        ["click", "onClick", "button"],
	 ],

	setValue: function(value) {
		console.log("plugin value: ", value)
		// if (value.indexOf("data:image") == -1 && value != "none")
		// {
		// 		$('input[type="text"]', this.element).val(value);
		// 		$('img', this.element).attr("src",value);
		// }
	},

    onChange: function(e, node) {
		//set initial relative path
		let src = this.value;
		console.log("WEO onchange:", WEO)
		
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
		console.log("WEO-----", WEO)
		// if (!WEO.ProductModal) {
		// 	WEO.ProductModal = new ProductModal(true);
		// 	WEO.ProductModal.mediaPath = window.mediaPath;
		// }
		
		// WEO.ProductModal.open(this);        
    },
    
	init: function(data) {
		return this.render("productinput", data);
	},
  }
);
