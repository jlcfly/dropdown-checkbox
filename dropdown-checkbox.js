(function($) {
    $.fn.dropdowncheckbox = function(options) {
		var Checkbox = {
			origId: "",
			id: "",
			state: "close",
			width: "",
			containerWidth: 0,

			init: function(id, options) {
				this.origId = "#"+id;
				this.id = "#"+id+"-cblist";

				// ensure original select has the multiple property enabled
				if (!$(this.origId).prop("multiple")) {
					$(this.origId).prop("multiple", "multiple");
				}

				this.width = $(this.origId).width();

				var html = '<div id="'+this.id.substring(1)+'" class="cblist-select" style="width:'+this.width+'px;">';
				html += '<div class="cblist-current-selection" style="float:left;width:'+(this.width-20)+'px;">';
				html += $(this.origId+" option:first-child").text();
				html += '</div>';
				html += '<div class="cblist-drop">&#x25BC;</div>';
				html += '<div style="clear:both;"></div>';
				html += '</div>';

				html += '<div id="'+this.id.substring(1)+'-container" class="cblist-container" style="min-width:'+this.width+'px;'+($(this.origId+" option").length >= 10 ? 'height:200px;' : '')+'">';

				var cbIx = 0;
				var cbId = this.id.substring(1)+"-cb";
				$(this.origId+" option").each(function() {
					html += '<div class="cblist-option'+($(this).prop("selected") ? ' cblist-option-checked' : '')+'">';
					html += '<label>';
					html += '<input id="'+cbId+cbIx+'" type="checkbox" value="'+$(this).val()+'"'+($(this).prop("selected") ? ' checked="checked"' : '')+'/>';
					html += $(this).text();
					html += '</label>';
					html += '</div>';
					cbIx++;
				});

				html += '</div>';	// cblist-container

				// hide the original select
				$(this.origId).css("display","none");

				// show the new select
				$(this.origId).after(html);
			
				if (options) {
					this.options(options);
				}

				$(this.id+"-container").css("width", "");
				this.bindEvents();
			},

			options: function(opts) {
				if (opts.width) {
					this.width = opts.width;
					$(this.id).width(opts.width);
					$(this.id+"-container").css("min-width", opts.width+"px");
					$(this.id + " .cblist-current-selection").css("width", (opts.width-20)+"px");
				}

				if (opts.resize) {
					$(this.id+"-container").css("resize", opts.resize);
				}
			},
			
			bindEvents: function() {
				var self = this;
				$(this.id).on("click", function(e) {
					e.stopPropagation();
					self.toggleDrop();
				});

				$(this.id+"-container").on("click", function(e) {
					e.stopPropagation();
				});

				$(this.id+"-container .cblist-option").on("click", function() {
					self.toggleCheck($(this).find("input"));
					return false;
				});

				$(this.id+'-container .cblist-option input[type="checkbox"]').on("click", function(e) {
					e.stopPropagation();
					self.synchronize();
				});

				$(window).on("click", function(e) {
					self.close();
				});
			},

			close: function() {
				if (this.state == "close") {
					return;
				}
				
				this.toggleDrop();
			},

			toggleDrop: function() {
				if (this.state == "close") {
					$(this.id+" .cblist-drop").html("&#x25B2;");

					var self = this;
					$(this.id+"-container").show("fast", function() {
						self.adjustWidth();
					});

					this.state = "open"
				}
				else {
					$(this.id+"-container").hide("fast");
					$(this.id+" .cblist-drop").html("&#x25BC;");
					this.state = "close";
				}
			},
			
			toggleCheck: function(elem) {
				if ($(elem).prop("checked")) {
					$(elem).removeAttr("checked");
					$(elem).parent().parent().removeClass("cblist-option-checked");
				}
				else {
					$(elem).prop("checked", "checked");
					$(elem).parent().parent().addClass("cblist-option-checked");
				}

				this.synchronize();
			},

			synchronize: function() {
				// synchronize with the original select that this object replaces
				var text = "";
				var count = 0;

				// de-select all in the original
				$(this.origId + " option").prop("selected", false);
			
				var self = this;
				$(this.id+"-container .cblist-option").find('input[type="checkbox"]').each(function() {
					if ($(this).prop("checked")) {
						if (count > 0) {
							text += ", ";
						}
					
						text += $(this).parent().text();

						// select in the original
						$(self.origId + " option[value=" + $(this).prop("value") + "]").prop("selected", true);
						count++;
					}
				});

				if (count == 0) {
					text = $(this.origId+" option:first-child").text();
				}
				else if (count > 4) {
					text = "Selected " + count + " items";
				}

				$(this.id+" .cblist-current-selection").text(text);
			},

			scrollbarWidth: function() {
				// Credit to: http://chris-spittles.co.uk/jquery-calculate-scrollbar-width/
				var $inner = $('<div style="width: 100%; height:200px;">test</div>'),
					$outer = $('<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>').append($inner),
					inner = $inner[0],
					outer = $outer[0];
     
				$('body').append(outer);
				var width1 = inner.offsetWidth;
				$outer.css('overflow', 'scroll');
				var width2 = outer.clientWidth;
				$outer.remove();
 
				return (width1 - width2);
			}, 

			adjustWidth: function() {
				// auto-expanding div width doesn't include scrollbar, so let's nudge it just a bit
				// if we haven't done so already
				if (this.containerWidth == 0) {
					this.containerWidth = $(this.id+"-container").width()
					var elem = $(this.id+"-container").get(0);

					if (elem.scrollHeight > elem.clientHeight) {
						if (elem.scrollWidth > elem.clientWidth) {
							this.containerWidth += this.scrollbarWidth();
							$(this.id+"-container").width(this.containerWidth);
						}
						else if (elem.scrollWidth == elem.clientWidth) {
							this.containerWidth -= this.scrollbarWidth();
							$(this.id+"-container").width(this.containerWidth);
						}
					}
				}
			}
		}

		if (!$(this).is("select")) {
			return false;
		}

		var id = $(this).prop("id");
		if (!id || id == "undefined") {
			return false;
		}

		Checkbox.init(id, options);
    };
})(jQuery);
