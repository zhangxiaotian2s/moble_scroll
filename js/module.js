(function($) {
	$.fn.mymodule = function(options) {

		var w_height = $(window).height()

		var Option = {
				allowmove: true,
				c_wrap: "#c_wrap",
				c_module: ".module",
				c_touchbox: ".touch_div", //滑动触摸层
				loadid: "#loading", //初次打开的加载的DIV
				blur: "blur", //模糊滤镜
				c_btnnext: "#btn_next",
				c_btnpre: "#btn_pre",
				height: w_height,
				zindex: 4,
				m_length: 4,
				overtime: 200,
				m_i: 0, //参数
				m_style: function() { //起始设置
					var _this = this;
					$(_this.c_wrap).css("height", _this.height);
					$(_this.c_module).css("height", _this.height);
					_this.m_uptop(0)
					_this.m_hide()
				},
				m_resize: function(h) { //变化传至控制高度
					var _this = this;
					$(_this.c_wrap).css("height", h);
					$(_this.c_module).css("height", h);
				},
				m_hide: function() {
					var _this = this;
					$(_this.c_module).hide()
					$(_this.c_module).first().show()
				},
				m_uptop: function(i) { //设置top
					var _this = this
					$(_this.c_module).css("top", this.height)
					$(_this.c_module).eq(i).css("top", 0)
				},
				m_downtop: function(i) { //设置top
					var _this = this
					$(_this.c_module).css("top", 0)
					$(_this.c_module).eq(i).css("top", -this.height)
				},
				m_zindex: function(i, zero) {
					if (zero != 0) {
						Option.zindex++
							$(Option.c_module).eq(i).css("z-index", Option.zindex)
					} else {
						$(Option.c_module).css("z-index", 0)
					}
				}
			}
			//追加
		$.extend(false, Option, options);
		//滑动处理
		var action_touch = { //向上滑
				m_touchup: function(i) {
					Option.allowmove = false
					var j;
					if (i >= Option.m_length - 1) {
						j = 0
					} else {
						j = i + 1
					}
					Option.m_i = j
					Option.m_zindex(j)
					Option.m_uptop(i)
					$(Option.c_module).eq(j).show().animate({
						"top": '0px'
					}, Option.overtime, 'linear', function() {
						$(Option.c_module).eq(i).hide(Option.overtime + 100)
						Option.allowmove = true
					})

				},
				m_touchdown: function(i) { //向下滑
					Option.allowmove = false
					var j;
					if (i <= 0) {
						j = Option.m_length - 1
					} else {
						j = i - 1
					}
					Option.m_i = j
					Option.m_zindex(j)
					Option.m_downtop(j)
//					$(Option.c_module).eq(j).css('top', -Option.height)
					$(Option.c_module).eq(j).show().animate({
							"top": '0px'
						}, Option.overtime, 'linear', function() {
							$(Option.c_module).eq(i).hide();
							Option.allowmove = true;
						})
						//					$(Option.c_module).eq(j).slideDown(Option.overtime, function() {
						//						$(Option.c_module).eq(i).hide();
						//						Option.allowmove = true;
						//					})
				},
				zepto_index: function(mythis, ClassName) { //类似JQ  index()效果
					var arr = document.getElementsByClassName(ClassName)
					for (i = 0; i < arr.length; i++) {
						if (mythis == arr[i]) {
							return i
						}
					}
				}
			}
			//load 处理
		var O_load = {
				loadid: $(Option.loadid), //初次打开的加载的DIV
				blur: "blur", //模糊滤镜
				remove_load: function() {
					this.loadid.remove();
					$(Option.c_module).first().removeClass(this.blur);
				}
			}
			//阻止默认的滑动效果
		$("body").bind('touchmove', function(e) {
				e.preventDefault()
			})
			//向上滑动处理
		touch.on(Option.c_touchbox, 'swipeup', function() {
				if (Option.allowmove == true) {
					var i = action_touch.zepto_index(this, 'touch_div')
					action_touch.m_touchup(i)
				}
			})
			//向下滑动处理
		touch.on(Option.c_touchbox, 'swipedown', function() {
				if (Option.allowmove == true) {
					var i = action_touch.zepto_index(this, 'touch_div')
					action_touch.m_touchdown(i)
				}
			})
			//click  btn
		$(Option.c_btnnext).click(function() {
			if (Option.allowmove == true) {
				action_touch.m_touchup(Option.m_i);
			}
		})

		$(Option.c_btnpre).click(function() {
				if (Option.allowmove == true) {
					action_touch.m_touchdown(Option.m_i);
				}
			})
			//



		//加载时候执行
		$(document).ready(function() {
				Option.m_style()
			})
			//浏览器窗体变化
		$(window).resize(function() {
			var h = $(window).height();
			Option.m_resize(h)
		})
		window.onload = function() {
			O_load.remove_load()
		}

	}

}(Zepto))