(function($) {
	$.fn.mymodule = function(options, ArrClass) {
		var Option = {
				allowmove: true,
				wrap: "#wrap",
				m_box: ".module",
				touch_box: ".touch_div", //滑动触摸层
				height: $(window).height(),
				loadid: "#loading", //初次打开的加载的DIV
				blur: "blur", //模糊滤镜
				btn_next: "#btn_next",
				btn_pre: "#btn_pre",
				zindex: 5,
				m_length: 5,
				overtime: 200,
				m_i: 0, //参数
				m_style: function() { //起始设置
					var _this = this;
					$(_this.wrap).css("height", _this.height);
					$(_this.m_box).css("height", _this.height);
					_this.m_top(0)
					_this.m_hide()
				},
				m_resize: function(h) { //变化传至控制高度
					var _this = this;
					$(_this.wrap).css("height", h);
					$(_this.m_box).css("height", h);
				},
				m_hide: function() {
					var _this = this;
					$(_this.m_box).hide()
					$(_this.m_box).first().show()
				},
				m_top: function(i) { //设置top
					var _this = this
					$(_this.m_box).css("top", this.height)
					$(_this.m_box).eq(i).css("top", 0)
				},
				m_zindex: function(i, zero) {
					if (zero != 0) {
						$(Option.m_box).css("z-index", 0)
					} else {
						Option.zindex++
							$(Option.m_box).eq(i).css("z-index", Option.zindex.zindex)
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
					removeClass_ac(arr_addClass, Option.m_i)
					Option.m_i = j
					Option.m_zindex(j)
					Option.m_top(i)
					$(Option.m_box).eq(j).show().animate({
						"top": 0
					}, Option.overtime)
					$(Option.m_box).eq(j).show().animate({"top":0},Option.overtime)
					$(Option.m_box).eq(i).slideUp(Option.overtime+100, function() {
						Option.allowmove = true
						addClass_ac(arr_addClass, Option.m_i)
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
					removeClass_ac(arr_addClass, Option.m_i)
					Option.m_i = j
					Option.m_zindex(j, 0)
					$(Option.m_box).eq(j).css("top", 0)
					$(Option.m_box).eq(j).slideDown(Option.overtime, function() {
						$(Option.m_box).eq(i).hide();
						Option.allowmove = true;
						addClass_ac(arr_addClass, Option.m_i)
					})
				}
			}
			//load 处理
		var O_load = {
				loadid: $(Option.loadid), //初次打开的加载的DIV
				blur: "blur", //模糊滤镜
				remove_load: function() {
					this.loadid.remove();
					$(Option.m_box).first().removeClass(this.blur);
				}
			}
			//class 与 样式 
		var arr_addClass = [
			[
				[],
				[]
			]
		]
		$.extend(true, arr_addClass, ArrClass); //覆盖追加
		//添加css3样式效果
		function addClass_ac(arr, i) {
				var arr_length = arr[i][0].length;
				for (a = 0; a < arr_length; a++) {
					$(arr[i][0][a]).addClass(arr[i][1][a])
				}
			}
			// 移除CSS3 效果

		function removeClass_ac(arr, i) {
			var arr_length = arr[i][0].length;
			for (a = 0; a < arr_length; a++) {
				$(arr[i][0][a]).removeClass(arr[i][1][a])
			}
		}



		//阻止默认的滑动效果
		$("body").bind('touchmove', function(e) {
				e.preventDefault()
			})
			//向上滑动处理
		touch.on(Option.touch_box, 'swipeup', function() {
				if (Option.allowmove == true) {
					var i = $(this).index(Option.touch_box);
					action_touch.m_touchup(i)
				}
			})
			//向下滑动处理
		touch.on(Option.touch_box, 'swipedown', function() {
				if (Option.allowmove == true) {
					var i = $(this).index(Option.touch_box);
					action_touch.m_touchdown(i)
				}
			})
			//click  btn
		$("#btn_next").click(function() {
			if (Option.allowmove == true) {
				action_touch.m_touchup(Option.m_i);
			}
		})

		$("#btn_pre").click(function() {
				if (Option.allowmove == true) {
					action_touch.m_touchdown(Option.m_i);
				}
			})
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

}(jQuery))