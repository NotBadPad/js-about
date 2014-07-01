/**************************** 拖拽相关 *****************************/
var currElem = {}

/**
 * 禁用图片默认时间
 */
document.onmousemove = function(e) {
	var ev = e || event;
	ev.cancelBubble = true;
	ev.returnValue = false;
}

/**
 * 按下鼠标
 */
$(document).mousedown(function(e) {
	if (e.button == 0 || e.button == 1) {
		var elem = $(e.target)
		if (elem.attr("class") != "divbar") { //若不是查找上一级
			var parent = elem.parents(".divbar")
			if (parent.length == 0) {
				return
			}
			elem = $(parent[0])
		}

		//获取点击商品的信息
		var data = elem.attr("data").split(";")

		//生成一个div跟随鼠标
		createDiv(data)

		//设置值
		currElem["id"] = data[0]
		currElem["name"] = data[1]
		currElem["url"] = data[2]
		currElem["data"] = elem.attr("data")

		//设置位置
		var moveBar = $("#fellow")
		moveBar.css({
			'left': e.pageX,
			'top': e.pageY
		})
	}
});

/**
 * 移动鼠标
 */
$(document).mousemove(function(e) {
	$("#offsetleft").text(e.pageX)
	$("#offsettop").text(e.pageY)

	//设置位置
	var moveBar = $("#fellow")
	moveBar.css({
		'left': e.pageX,
		'top': e.pageY
	})
});

/**
 * 松开鼠标
 */
$(document).mouseup(function(e) {
	var currX = e.pageX
	var currY = e.pageY
	$(".tgbar").each(function(index, elem) {
		var left = $(elem).offset().left
		var right = $(elem).offset().left + $(elem).width()
		var top = $(elem).offset().top
		var bottom = $(elem).offset().top + $(elem).height()
		if (currX >= left && currX <= right && currY >= top && currY <= bottom) {
			var img = $(elem).find("img")
			var productName = $(elem).find(".productName")
			$(elem).attr("data", currElem.data)
			img.attr("src", currElem.url)
			productName.text(currElem.name)
		}
	})

	currElem = {}
	removeDiv()
});


/**
 * 单击删除对应位置信息
 */
$(document).click(function(e) {
	var elem = e.target
	console.log(elem.id)
	if (elem.id == "bestBtn") {
		bestConfig();
	}
	elem = $(e.target)
	if (elem.attr("class") != "tgbar") {
		var parent = elem.parents(".tgbar")
		if (parent.length == 0) {
			return
		}
		elem = $(parent[0])
	}
	elem.attr("data", currElem.data)
	var img = elem.find("img")
	var productName = elem.find(".productName")
	img.attr("src", "")
	productName.text("")
});

/**
 * 创建一个div，跟随鼠标移动
 */
function createDiv(data) {
	var div = '<div id="fellow" style="witdh:50px;height:50px;position:absolute;z-index:100;cursor:hand;" ><img  src="' + data[2] + '"  width="50" height="50" /> </div>'
	$("body").append(div)
}

/**
 * 删除鼠标移动div
 */
function removeDiv() {
	$("#fellow").remove()
}


/**************************** 配置相关 *****************************/
/**
 * 获取货道配置信息
 */
function getConfigInfo() {
	$(".tgbar").each(function(index, elem) {
		//获取data值
	})
}

/**
 * 按照推荐配置货道信息
 */
function bestConfig() {
	$.get("data.json", function(dataJson) {
		var data = $.parseJSON(dataJson);
		console.log(data)
		$.each(data.data, function(index, elem) {
			console.log(elem.id)

			var tagbar = $("#" + elem.id)
			var img = tagbar.find("img")
			var productName = tagbar.find(".productName")
			img.attr("src", elem.url)
			productName.text(elem.name)
		})
	})
}