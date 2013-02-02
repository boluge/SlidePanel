;(function ( $, window, document, undefined ) {

  var pluginName = 'slideParam',
		defaults = {
			id: 'slide',
			position: 'left',
			speed:'350'
		};

	function Plugin( element, options ) {
		this.element = element;

		this.options = $.extend( {}, defaults, options );

		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype = {

		init: function(options) {
			var id = this.options.id;
			var position = this.options.position;
			var speed = this.options.speed;
			var body = $('body');
			var select = $('#'+id);

			var largeur = $('#'+id).outerWidth();
			
			switch (position){
				case 'left':
					select.css({
						'left':-largeur,
						'top': 0,
						'bottom': 0,
						'position': 'absolute',
						'display' : 'block'
					});
					body.css({'margin-left':0});
					break;
				case 'right':
					select.css({
						'right':-largeur,
						'top': 0,
						'bottom': 0,
						'position': 'absolute',
						'display' : 'block'
					});
					body.css({'margin-right':0});
					break;
			}
			body.addClass('close');
			select.addClass('close');
			
			$("a[href|='#"+id+"']").click(function(){
				var state = select.attr('class');
				switch (position){
					case 'left':
						switch (state) { 
							case 'close': 
								select.animate({ 'left':0 },speed).removeClass('close').addClass('open');
								body.animate({'margin-left':largeur},speed).removeClass('close').addClass('open');
								break;
							case 'open': 
								select.animate({ 'left':-largeur },speed).removeClass('open').addClass('close');
								body.animate({'margin-left':0},speed).removeClass('open').addClass('close');
								break; 
						}
						break;
					case 'right':
						switch (state) { 
							case 'close': 
								select.animate({ 'right':0 },speed).removeClass('close').addClass('open');
								body.animate({'margin-right':largeur},speed).removeClass('close').addClass('open');
								break;
							case 'open': 
								select.animate({ 'right':-largeur },speed).removeClass('open').addClass('close');
								body.animate({'margin-right':0},speed).removeClass('open').addClass('close');
								break; 
						}
						break;
				}
				return false;
			});
		}
	};

	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin( this, options ));
			}
		});
	};

})( jQuery, window, document );
