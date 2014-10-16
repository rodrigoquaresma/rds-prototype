(function($){

	var StickyHandler = {

		stickedDataList : [],

		scroll : function(){
			var currentPos = $(this).scrollTop();

			for (var i = 0; i < StickyHandler.stickedDataList.length; i++){

				var data = StickyHandler.stickedDataList[i];
				StickyHandler.verifyAndRepos.apply(data, [currentPos]);

			};

		},

		verifyAndRepos : function (currentPos){
			if (currentPos < this.minPos){
				this.target.css({
					position : 'relative',
					left: 0,
					top: 0
				});

				this.isFixed = false;

			} else if ((currentPos >= this.minPos) && (currentPos < this.maxPos)){
				this.target.css({
					position : 'fixed',
					left: this.offset.left - this.marginLeft,
					top: this.topMargin
				});

				this.isFixed = true;

			} else if (this.isFixed) {
				this.target.css({
					position : 'relative',
					left: 0,
					top: this.maxPos - this.offset.top + this.topMargin
				});

				this.isFixed = false;
			}
		},

		refreshPositions : function(){
			for (var i = 0; i < StickyHandler.stickedDataList.length; i++){
				var jqThis = StickyHandler.stickedDataList[i].target;
				var jqParent = jqThis.parent();

				var containerBottom = jqParent.offset().top + jqParent.height();
				var thisHeight = jqThis.height();
				var thisOffset = jqThis.offset();
				var topMargin = window.parseInt(jqParent.css('paddingTop').replace('px', ''));

				StickyHandler.stickedDataList[i].offset = thisOffset;
				StickyHandler.stickedDataList[i].height = thisHeight;
				StickyHandler.stickedDataList[i].topMargin = topMargin;
				StickyHandler.stickedDataList[i].maxPos = containerBottom - thisHeight;
				StickyHandler.stickedDataList[i].minPos = thisOffset.top - topMargin;
				StickyHandler.stickedDataList[i].isFixed = false;
			}
		}
	}


	$.fn.sticky = function(method){

		if (method == 'refresh'){
			StickyHandler.refreshPositions();
			return this;
		}

		$(window).bind('scroll', StickyHandler.scroll);
		return this.each(function(){
			var jqThis = $(this);
			var jqParent = jqThis.parent();

			var containerBottom = jqParent.offset().top + jqParent.height();
			var thisHeight = jqThis.height();
			var thisOffset = jqThis.offset();
			var topMargin = window.parseInt(jqParent.css('paddingTop').replace('px', ''));
			var marginLeft = window.parseInt(jqThis.css('marginLeft').replace('px', ''));
			var magicNumber = 53;

			StickyHandler.stickedDataList.push({
				target : jqThis,
				offset : thisOffset,
				height : thisHeight,
				topMargin : topMargin + magicNumber,
				maxPos : containerBottom - thisHeight,
				minPos : thisOffset.top - topMargin - magicNumber,
				isFixed : false,
				marginLeft : marginLeft
			});

		//var sidebarOffset = $('#sidebar').offset();
		//var sidebarHeight = $('#sidebar').height()
		// var contentOffset = $('#main-landing_pages').offset();
		// var contentBottom = contentOffset.top + $('#main-landing_pages').height();
		//var minPos = (sidebarOffset.top - topMargin);
		// var maxPos = (contentBottom - sidebarHeight);
		// var isFixed = false;
		//var minPos = 40;

		});

	}

})(jQuery);
