function supportstorage() {
		return (typeof window.localStorage === 'object');
}

function handleSaveLayout() {
	let e = $(".demo").html();
	if (!stopsave && e !== window.demoHtml) {
		stopsave++;
		window.demoHtml = e;
		saveLayout();
		stopsave--;
	}
}

let layouthistory;
let downLay = $("#download-layout");
let layCon = $(".demo");
function saveLayout() {
	let data = layouthistory;
	if (!data) {
		data = {};
		data.count = 0;
		data.list = [];
	}
	if (data.list.length > data.count) {
		for (let i = data.count; i < data.list.length; i++)
			data.list[i] = null;
	}
	data.list[data.count] = window.demoHtml;
	data.count++;
	if (supportstorage()) {
		localStorage.setItem("layoutdata", JSON.stringify(data));
	}
	layouthistory = data;
	//console.log(data);
}

function downloadLayout() {
	$.ajax({
		type: "POST",
		url: "/build/downloadLayout",
		data: { layout: downLay.html() },
		success: function () { window.location.href = '/build/download'; }
	});
}

function downloadHtmlLayout() {
	$.ajax({
		type: "POST",
		url: "/build/downloadLayout",
		data: { layout: downLay.html() },
		success: function () { window.location.href = '/build/downloadHtml'; }
	});
}

function undoLayout() {
	let data = layouthistory;
	//console.log(data);
	if (data) {
		if (data.count < 2) return false;
		window.demoHtml = data.list[data.count - 2];
		data.count--;
    layCon.html(window.demoHtml);
		if (supportstorage()) {
			localStorage.setItem("layoutdata", JSON.stringify(data));
		}
		return true;
	}
	return false;
}

function redoLayout() {
  let data = layouthistory;
	if (data) {
		if (data.list[data.count]) {
			window.demoHtml = data.list[data.count];
			data.count++;
      layCon.html(window.demoHtml);
			if (supportstorage()) {
				localStorage.setItem("layoutdata", JSON.stringify(data));
			}
			return true;
		}
	}
	return false;
}

function handleJsIds() {
	handleModalIds();
	handleAccordionIds();
	handleCarouselIds();
	handleTabsIds()
}
function handleAccordionIds() {
  let e = $(".demo #myAccordion");
  let t = randomNumber();
  let n = "accordion-" + t;
  let r;
	e.attr("id", n);
	e.find(".accordion-group").each(function (e, t) {
		r = "accordion-element-" + randomNumber();
		$(t).find(".accordion-toggle").each(function (e, t) {
			$(t).attr("data-parent", "#" + n);
			$(t).attr("href", "#" + r)
		});
		$(t).find(".accordion-body").each(function (e, t) {
			$(t).attr("id", r)
		})
	})
}
function handleCarouselIds() {
  let e = $(".demo #myCarousel");
  let t = randomNumber();
  let n = "carousel-" + t;
	e.attr("id", n);
	e.find(".carousel-indicators li").each(function (e, t) {
		$(t).attr("data-target", "#" + n)
	});
	e.find(".left").attr("href", "#" + n);
	e.find(".right").attr("href", "#" + n)
}
function handleModalIds() {
  let e = $(".demo #myModalLink");
  let t = randomNumber();
  let n = "modal-container-" + t;
  let r = "modal-" + t;
	e.attr("id", r);
	e.attr("href", "#" + n);
	e.next().attr("id", n)
}
function handleTabsIds() {
  let e = $(".demo #myTabs");
  let t = randomNumber();
  let n = "tabs-" + t;
	e.attr("id", n);
	e.find(".tab-pane").each(function (e, t) {
    let n = $(t).attr("id");
    let r = "panel-" + randomNumber();
		$(t).attr("id", r);
		$(t).parent().parent().find("a[href=#" + n + "]").attr("href", "#" + r)
	})
}
function randomNumber() {
	return randomFromInterval(1, 1e6)
}
function randomFromInterval(e, t) {
	return Math.floor(Math.random() * (t - e + 1) + e)
}
function gridSystemGenerator() {
	$(".lyrow .preview input").bind("keyup", function () {
		let e = 0;
		let t = "";
		let n = $(this).val().split(" ", 12);
		$.each(n, function (n, r) {
			e = e + parseInt(r);
			t += '<div class="span' + r + ' column"></div>'
		});
		if (e === 12) {
			$(this).parent().next().children().html(t);
			$(this).parent().prev().show()
		} else {
			$(this).parent().prev().hide()
		}
	})
}
function configurationElm() {
  layCon.delegate(".configuration > a", "click", function (e) {
		e.preventDefault();
		let t = $(this).parent().next().next().children();
		$(this).toggleClass("active");
		t.toggleClass($(this).attr("rel"))
	});
  layCon.delegate(".configuration .dropdown-menu a", "click", function (e) {
		e.preventDefault();
		let t = $(this).parent().parent();
		let n = t.parent().parent().next().next().children();
		t.find("li").removeClass("active");
		$(this).parent().addClass("active");
		let r = "";
		t.find("a").each(function () {
			r += $(this).attr("rel") + " "
		});
		t.parent().removeClass("open");
		n.removeClass(r);
		n.addClass($(this).attr("rel"))
	})
}
function removeElm() {
  layCon.delegate(".remove", "click", function (e) {
		e.preventDefault();
		$(this).parent().remove();
		if (!layCon.find(".lyrow").length > 0) {
			clearDemo()
		}
	})
}
function clearDemo() {
	$(".demo").empty();
	layouthistory = null;
	if (supportstorage())
		localStorage.removeItem("layoutdata");
}
function removeMenuClasses() {
	$("#menu-layoutit").find("li button").removeClass("active")
}
function changeStructure(e, t) {
	$("#download-layout ." + e).removeClass(e).addClass(t)
}
function cleanHtml(e) {
	$(e).parent().append($(e).children().html())
}
function downloadLayoutSrc() {
  downLay.children().html($(".demo").html());
	let t = downLay.children();
	t.find(".preview, .configuration, .drag, .remove").remove();
	t.find(".lyrow").addClass("removeClean");
	t.find(".box-element").addClass("removeClean");
	t.find(".lyrow .lyrow .lyrow .lyrow .lyrow .removeClean").each(function () {
		cleanHtml(this)
	});
	t.find(".lyrow .lyrow .lyrow .lyrow .removeClean").each(function () {
		cleanHtml(this)
	});
	t.find(".lyrow .lyrow .lyrow .removeClean").each(function () {
		cleanHtml(this)
	});
	t.find(".lyrow .lyrow .removeClean").each(function () {
		cleanHtml(this)
	});
	t.find(".lyrow .removeClean").each(function () {
		cleanHtml(this)
	});
	t.find(".removeClean").each(function () {
		cleanHtml(this)
	});
	t.find(".removeClean").remove();
  downLay.find(".column").removeClass("ui-sortable");
  downLay.find(".row-fluid").removeClass("clearfix").children().removeClass("column");
	if (downLay.find(".container").length > 0) {
		changeStructure("row-fluid", "row")
	}
	formatSrc = $.htmlClean(downLay.html(), {
		format: true,
		allowedAttributes: [
			["id"],
			["class"],
			["data-toggle"],
			["data-target"],
			["data-parent"],
			["role"],
			["data-dismiss"],
			["aria-labelledby"],
			["aria-hidden"],
			["data-slide-to"],
			["data-slide"]
		]
	});
  downLay.html(formatSrc);
  downLay.find("textarea").empty();
  downLay.find("textarea").val(formatSrc)
}

let timerSave = 1000;
let stopsave = 0;
let startdrag = 0;
let currenteditor = null;
$(window).resize(function () {
	$("body").css("min-height", $(window).height() - 90);
	$(".demo").css("min-height", $(window).height() - 160)
});

function restoreData() {
	if (supportstorage()) {
		layouthistory = JSON.parse(localStorage.getItem("layoutdata"));
		if (!layouthistory) return false;
		window.demoHtml = layouthistory.list[layouthistory.count - 1];
		if (window.demoHtml) $(".demo").html(window.demoHtml);
	}
}

function initContainer() {
	$(".demo, .demo .column").sortable({
		connectWith: ".column",
		opacity: .35,
		handle: ".drag",
		start: function (e, t) {
			if (!startdrag) stopsave++;
			startdrag = 1;
		},
		stop: function (e, t) {
			if (stopsave > 0) stopsave--;
			startdrag = 0;
		}
	});
	configurationElm();
}
$(document).ready(function () {
	CKEDITOR.disableAutoInline = true;
	restoreData();
	let contenthandle = CKEDITOR.replace('contenteditor', {
		language: 'zh-cn',
		contentsCss: ['css/bootstrap-combined.min.css'],
		allowedContent: true
	});
	let body = $("body");
	body.css("min-height", $(window).height() - 90);
  layCon.css("min-height", $(window).height() - 160);

  let sidebar = $(".sidebar-nav");
  sidebar.find(".lyrow").draggable({
		connectToSortable: ".demo",
		helper: "clone",
		handle: ".drag",
		start: function (e, t) {
			if (!startdrag) stopsave++;
			startdrag = 1;
		},
		drag: function (e, t) {
			t.helper.width(400)
		},
		stop: function (e, t) {
			layCon.find(".column").sortable({
				opacity: .35,
				connectWith: ".column",
				start: function (e, t) {
					if (!startdrag) stopsave++;
					startdrag = 1;
				},
				stop: function (e, t) {
					if (stopsave > 0) stopsave--;
					startdrag = 0;
				}
			});
			if (stopsave > 0) stopsave--;
			startdrag = 0;
		}
	});
  sidebar.find(".box").draggable({
		connectToSortable: ".column",
		helper: "clone",
		handle: ".drag",
		start: function () {
			if (!startdrag) stopsave++;
			startdrag = 1;
		},
		drag: function (e, t) {
			t.helper.width(400)
		},
		stop: function () {
			handleJsIds();
			if (stopsave > 0) stopsave--;
			startdrag = 0;
		}
	});
	initContainer();
	$('body.edit .demo').on("click", "[data-target=#editorModal]", function (e) {
		e.preventDefault();
		currenteditor = $(this).parent().parent().find('.view');
		let eText = currenteditor.html();
		contenthandle.setData(eText);
	});
	$("#savecontent").click(function (e) {
		e.preventDefault();
		currenteditor.html(contenthandle.getData());
	});
	$("[data-target=#downloadModal]").click(function (e) {
		e.preventDefault();
		downloadLayoutSrc();
	});
	$("[data-target=#sourceModal]").click(function (e) {
		e.preventDefault();
		$('#sourceeditor').val(layCon.html());
	});
	$("#savesource").click(function () {
    layCon.html($('#sourceeditor').val());
		initContainer();
	});
	$("[data-target=#shareModal]").click(function (e) {
		e.preventDefault();
		handleSaveLayout();
	});
	$("#download").click(function () {
		downloadLayout();
		return false;
	});
	$("#downloadhtml").click(function () {
		downloadHtmlLayout();
		return false
	});
	$("#edit").click(function () {
		body.removeClass("devpreview sourcepreview");
		body.addClass("edit");
		removeMenuClasses();
		$(this).addClass("active");
		return false
	});
	$("#clear").click(function (e) {
		e.preventDefault();
		clearDemo()
	});
	$("#devpreview").click(function () {
		body.removeClass("edit sourcepreview");
		body.addClass("devpreview");
		removeMenuClasses();
		$(this).addClass("active");
		return false
	});
	$("#sourcepreview").click(function () {
		body.removeClass("edit");
		body.addClass("devpreview sourcepreview");
		removeMenuClasses();
		$(this).addClass("active");
		return false
	});
	$("#fluidPage").click(function (e) {
		e.preventDefault();
		changeStructure("container", "container-fluid");
		$("#fixedPage").removeClass("active");
		$(this).addClass("active");
		downloadLayoutSrc()
	});
	$("#fixedPage").click(function (e) {
		e.preventDefault();
		changeStructure("container-fluid", "container");
		$("#fluidPage").removeClass("active");
		$(this).addClass("active");
		downloadLayoutSrc()
	});
	$(".nav-header").click(function () {
		$(".sidebar-nav .boxes, .sidebar-nav .rows").hide();
		$(this).next().slideDown()
	});
	$('#undo').click(function () {
		stopsave++;
		if (undoLayout()) initContainer();
		stopsave--;
	});
	$('#redo').click(function () {
		stopsave++;
		if (redoLayout()) initContainer();
		stopsave--;
	});
	removeElm();
	gridSystemGenerator();
	setInterval(function () {
		handleSaveLayout()
	}, timerSave)
});
