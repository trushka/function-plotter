/**
 * Created by madjack on 18.12.14.
 */
function isNumber(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}
function reshixSVGRecorder() {
	this.width = null;
	this.height = null;
	this.font = "";
	this.textAlign = "";
	this.svgHeader = "";
	this.svgBody = "";
	this.svgFooter = "";
	this.lineWidth = 1;
	this.strokeStyle = "#000000";
	this.fillStyle = "#ffffff";
	this.x = 0;
	this.y = 0;
	this.path_d = "";
	this.moveToX = null;
	this.moveToY = null;
	this.clear = function() {
		this.svgBody = ""
	};
	this.fillText = function(e, t, n) {
		var r = "start";
		if (this.textAlign == "center") r = "middle";
		if (this.textAlign == "right") r = "end";
		this.svgBody += '<text x="' + t + '" y="' + n + '" text-anchor="' + r + '" style="font:' + this.font + ";stroke:none;fill:" + this.fillStyle + '">' + e + "</text>"
	};
	this.beginPath = function() {
		this.path_d = ""
	};
	this.moveTo = function(e, t) {
		if (!isNaN(e) && !isNaN(t)) {
			this.moveToX = e.toFixed(2);
			this.moveToY = t.toFixed(2)
		}
	};
	this.lineTo = function(e, t) {
		if (this.moveToX) {
			this.path_d += "M" + this.moveToX + " " + this.moveToY + " ";
			this.moveToX = null;
			this.moveToY = null
		}
		this.path_d += "L" + e.toFixed(2) + " " + t.toFixed(2) + " "
	};
	this.stroke = function() {
		this.svgBody += '<path d="' + this.path_d + '" style="fill:none;stroke:' + this.strokeStyle + ";stroke-width:" + this.lineWidth + ';" />';
		this.path_d = ""
	};
	this.fillRect = function(e, t, n, r) {
		this.svgBody += '<rect x="' + e.toFixed(2) + '" y="' + t.toFixed(2) + '" width="' + n.toFixed(2) + '" height="' + r.toFixed(2) + '" style="fill:' + this.fillStyle + ';stroke:none;" />'
	};
	this.getSVG = function() {
		var e = "";
		e += '<?xml version="1.0" standalone="no"?>';
		e += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
		e += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + this.width + " " + this.height + '" version="1.1">';
		e += '<clipPath id="box"><rect x="0" y="0" width="' + this.width + '" height="' + this.height + '" style="fill:none;stroke:none;" /></clipPath>';
		e += '<g clip-path="url(#box)">';
		e += this.svgBody;
		e += "</g></svg>";
		return e
	}
}

function reshix(container, options) {
	RESHIX_INSTANCES.push(this);
	this.container = container;
	this.container.style.overflow = "hidden";
	this.container.style.position = "relative";
	this.container.style.webkitUserSelect = "none";
	this.container.style.MozUserSelect = "none";
	this.container.style.userSelect = "none";
	if (RESHIX_MSIE) this.container.unselectable = true;
	this.container.style.cursor = "default";
	this.cover = document.createElement("div");
	this.cover.style.position = "absolute";
	this.cover.style.width = "100%";
	this.cover.style.height = "100%";
	this.container.style.webkitUserSelect = "none";
	this.container.style.MozUserSelect = "none";
	if (RESHIX_MSIE) this.cover.unselectable = true;
	//this.cover.style.zIndex = 100;
	this.cover.style.background = "#ffffff";
	this.cover.style.filter = "alpha(opacity=0)";
	this.cover.style.opacity = 0;
	this.container.appendChild(this.cover);
	this.subcontainer = document.createElement("div");
	this.subcontainer.style.position = "absolute";
	this.subcontainer.style.zIndex = "1";
	this.subcontainer.style.webkitUserSelect = "none";
	this.subcontainer.style.userSelect = "none";
	if (RESHIX_MSIE) this.subcontainer.unselectable = true;
	this.container.appendChild(this.subcontainer);
	this.recorder = new reshixSVGRecorder;
	this.toolcontainer = document.createElement("div");
	this.toolcontainer.style.position = "absolute";
	this.toolcontainer.style.top = "0";
	this.toolcontainer.style.left = "75%";
	this.toolcontainer.style.zIndex = "200";
	this.toolcontainer.style.opacity = .7;
	//this.toolcontainer.style.marginTop = "-60px";
	//this.toolcontainer.style.marginLeft = "10px";
	this.toolcontainer.style.padding = "10px";
	this.toolcontainer.style.height = "32px";
	this.toolcontainer.style.webkitBorderRadius = "5px";
	//this.toolcontainer.style.visibility = "hidden";
	this.container.appendChild(this.toolcontainer);
	this.addToolSeparator = function() {
		var e = document.createElement("div");
		e.style.display = "inline";
		e.style.width = "32px";
		e.style.height = "1px";
		e.style.border = "0px";
		e.style.padding = "0px";
		e.style.marginRight = "15px";
		this.toolcontainer.appendChild(e)
	};
	this.addToolButton = function(e, t, n, r) {
		var s = document.createElement("button");
		s.className = "reshix-tool";
		s.style.width = "32px";
		if (r) s.title = r;
		s.style.background = e;
		s.style.position = "relative";
		s.style.height = "32px";
		s.style.border = "0px";
		s.style.padding = "0px";
		s.style.marginRight = "15px";
		s.style.cursor = "pointer";
		if (!n) {
			s.onmousedown = function() {
				this.style.opacity = .7;
			};
			s.onmouseup = function() {
				this.style.opacity = 1;
			};
			s.onmouseout = function() {
				this.style.opacity = 1;
			};
			s.onclick = t
		} else {
			s.onclick = function() {
				for (i in RESHIX_INSTANCES)
					if (this.parentNode == RESHIX_INSTANCES[i].toolcontainer) var e = RESHIX_INSTANCES[i];
				e.selectMode(this)
			};
			this.toolsMode.push({
				tool: s,
				id: n
			})
		}
		this.toolcontainer.appendChild(s);
		return s
	};
	this.hideIntersection = function() {
		this.intersectionPoint.style.visibility = "hidden";
		this.intersectionDisplay.style.visibility = "hidden"
	};
	this.hideTrace = function() {
		this.tracePoint.style.visibility = "hidden";
		this.traceDisplay.style.visibility = "hidden"
	};
	this.toolsMode = [];
	this.selectedMode = RESHIX_MODE_MOVE;
	this.selectMode = function(e) {
		this.hideIntersection();
		this.hideTrace();
		for (i in this.toolsMode) {
			if (this.toolsMode[i].tool == e || this.toolsMode[i].id == e) {
				this.selectedMode = this.toolsMode[i].id;
				this.toolsMode[i].tool.style.opacity = .7;
				this.toolsMode[i].tool.style.filter = "alpha(opacity=70)"
			} else {
				this.toolsMode[i].tool.style.opacity = 1;
				this.toolsMode[i].tool.style.filter = ""
			}
		}
	};
	this.zoomTimeout = null;
	this.zoomSelf = null;
	this.zoomPendingFactor = 1;
	this.zoom = function(e) {
		if (this.zoomTimeout) window.clearTimeout(this.zoomTimeout);
		if (RESHIX_TRANSITIONS && this.canvas && this.canvas.style && e != 1) {
			this.canvas.style.OTransition = "-o-transform 0.4s ease";
			this.canvas.style.webkitTransition = "-webkit-transform 0.4s ease";
			this.canvas.style.MozTransition = "-moz-transform 0.4s ease";
			this.canvas.style.msTransition = "-webkit-transform 0.4s ease";
			this.canvas.style.webkitTransform += "scale(" + e + ")";
			this.canvas.style.MozTransform += "scale(" + e + ")";
			this.canvas.style.msTransform += "scale(" + e + ")";
			this.canvas.style.OTransform += "scale(" + e + ")"
		}
		this.hideIntersection();
		this.hideTrace();
		this.zoomSelf = this;
		this.zoomPendingFactor *= e;
		this.zoomTimeout = window.setTimeout(function(e) {
			if (!e)
				for (i in RESHIX_INSTANCES)
					if (RESHIX_INSTANCES[i].zoomSelf) var e = RESHIX_INSTANCES[i].zoomSelf;
			var t = (e.xmax + e.xmin) / 2;
			var n = (e.ymax + e.ymin) / 2;
			e.xmax = (e.xmax - t) / e.zoomPendingFactor + t;
			e.xmin = (e.xmin - t) / e.zoomPendingFactor + t;
			e.ymax = (e.ymax - n) / e.zoomPendingFactor + n;
			e.ymin = (e.ymin - n) / e.zoomPendingFactor + n;
			e.zoomPendingFactor = 1;
			e.reDraw();
			e.canvas.style.OTransition = "color 0 ease";
			e.canvas.style.webkitTransition = "";
			e.canvas.style.MozTransition = "";
			e.canvas.style.msTransition = "";
			e.canvas.style.webkitTransform = "";
			e.canvas.style.MozTransform = "";
			e.canvas.style.msTransform += "";
			e.canvas.style.OTransform = "";
			e.onWindowChange([e.xmin, e.xmax, e.ymin, e.ymax]);
			e.zoomTimeout = null;
			e.zoomSelf = null
		}, RESHIX_TRANSITIONS ? 450 : 0, this)
	};
	this.toolZoomIn = this.addToolButton("url('data:image/gif;base64,R0lGODlhIAAgAIABAAAAAP///yH+CVJlc2hpeC5ydQAh+QQBCgABACwAAAAAIAAgAAACTIyPqcvt/4CcsM4LasRSO955DJiJC2meYKqgLOK+RgyRtp3c+nrsPtX7+WDCHbF4OyJpgSXzw5M1o7JnymrCirQersZroVYx0rKZUQAAOw==')", function() {
		for (i in RESHIX_INSTANCES)
			if (this.parentNode == RESHIX_INSTANCES[i].toolcontainer) var e = RESHIX_INSTANCES[i];
		e.zoom(2)
	}, null, "Увеличить");
	this.toolZoomOut = this.addToolButton("url('data:image/gif;base64,R0lGODlhIAAgAIABAAAAAP///yH+CVJlc2hpeC5ydQAh+QQBCgABACwAAAAAIAAgAAACNIyPqcvtD6OctNqLs968+98A4kiWZpmc6koi7Hu68CzKNGzfbK6rae8DCYfEovGITCqXmwIAOw==')", function() {
		for (i in RESHIX_INSTANCES)
			if (this.parentNode == RESHIX_INSTANCES[i].toolcontainer) var e = RESHIX_INSTANCES[i];
		e.zoom(.5)
	}, null, "Уменьшить");
	this.addToolSeparator();

	/*
	this.toolZoomBox = this.addToolButton("url('data:image/gif;base64,R0lGODlhIAAgAIABAAAAAP///yH+CVJlc2hpeC5ydQAh+QQBCgABACwAAAAAIAAgAAACXYyPqcvtD6OctNqLLdi8+88xQBaMC4imImkqbfKt5/lu843Y8GvwB69zAWW/XA1G7P1CylyytAwOcc3e0UmFiqauHa2bLQF9WrDX+izSmOHqhSxOydmkuv2Oz+stBQA7')", function() {
		$.post("/wp-admin/admin-ajax.php", {
			action: "graphnew",
			func: $('#plots .equation').val(),
			tags: findTagsFromFunc(),
			url: document.getElementsByTagName("canvas")[0].toDataURL()
		}, function(data) {
			if(data != '')
				top.location = data;
		});
		return false;
	}, null, "Сделать скриншот");*/
	//this.toolTrace = this.addToolButton("url('data:image/gif;base64,R0lGODlhIAAgAIABAAAAAP///yH+CVJlc2hpeC5ydQAh+QQBCgABACwAAAAAIAAgAAACUoyPqcvtD6OctNqLs94SAO4dIReM5vKJqGGmZZKeiNvOKkvf+G67q1+KAV+PYa3nGAZ5LN2IqDhCm8spTEiFNZUibDHyfGbEpLL5jE6r1+z2pgAAOw==')", null, RESHIX_MODE_TRACE, "Показать координаты");
	//this.toolIntersection = this.addToolButton("url('data:image/gif;base64,R0lGODlhIAAgAIABAAAAAP///yH+CVJlc2hpeC5ydQAh+QQBCgABACwAAAAAIAAgAAACXIyPeaDtHxiMs8l366pZd/tBoTI6ZXKimiEBaYpkrrmy5F3PuF1TtN8ruWA7EDE2GQaTrOMLyVEtdNOQEsUYarfcbrfZuWI/uhMZwxNBe2ggG3N8y+f0uv2Oz+sLADs=')", null, RESHIX_MODE_INTERSECTION, "Найти пересечения и корни");
	//this.toolMove = this.addToolButton("url('data:image/gif;base64,R0lGODlhIAAgAIABAAAAAP///yH+CVJlc2hpeC5ydQAh+QQBCgABACwAAAAAIAAgAAACXoyPCZDtf9aC9ElZs7lXU855DgiKCEmaSqo2aMucbFRNcilD2B3eIwp88YLEXaCIDCWXzObEWYxAhdJpx2Wr9qq6mPYqra1wNBW19TXCkOgo+gh8p7NyOLi+UePzogIAOw==')", null, RESHIX_MODE_MOVE, "Вернуться в режим перемещения");
	this.zoomboxBox = document.createElement("div");
	this.zoomboxBox.style.position = "absolute";
	this.zoomboxBox.style.visibility = "hidden";
	this.zoomboxBox.style.width = "1px";
	this.zoomboxBox.style.height = "1px";
	this.zoomboxBox.style.top = "-1px";
	this.zoomboxBox.style.left = "-1px";
	this.zoomboxBox.style.border = "1px solid #ff8000";
	this.zoomboxBox.style.background = "#ffa000";
	this.zoomboxBox.style.opacity = .5;
	this.zoomboxBox.style.filter = "alpha(opacity=50)";
	this.zoomboxBox.style.zIndex = 50;
	this.container.appendChild(this.zoomboxBox);
	this.tracePoint = document.createElement("div");
	this.tracePoint.style.position = "absolute";
	this.tracePoint.style.visibility = "hidden";
	this.tracePoint.style.width = "5px";
	this.tracePoint.style.height = "5px";
	this.tracePoint.style.top = "-1px";
	this.tracePoint.style.left = "-1px";
	this.tracePoint.style.border = "1px solid #ffffff";
	this.tracePoint.style.background = "#ff8000";
	this.tracePoint.style.zIndex = 50;
	this.container.appendChild(this.tracePoint);
	this.traceDisplay = document.createElement("div");
	this.traceDisplayText = document.createTextNode("");
	this.traceDisplay.style.position = "absolute";
	this.traceDisplay.style.visibility = "hidden";
	this.traceDisplay.style.height = "20px";
	this.traceDisplay.style.padding = "4px";
	this.traceDisplay.style.top = "-1px";
	this.traceDisplay.style.left = "-1px";
	this.traceDisplay.style.border = "1px solid #a0a0a0";
	this.traceDisplay.style.background = "#ffffff";
	this.traceDisplay.style.webkitBoxShadow = "5px 5px 5px #808080";
	this.traceDisplay.style.MozBoxShadow = "5px 5px 5px #808080";
	this.traceDisplay.style.OBoxShadow = "5px 5px 5px #808080";
	this.traceDisplay.style.msBoxShadow = "5px 5px 5px #808080";
	this.traceDisplay.style.boxShadow = "5px 5px 5px #808080";
	this.traceDisplay.style.zIndex = 50;
	this.traceDisplay.appendChild(this.traceDisplayText);
	this.container.appendChild(this.traceDisplay);
	this.intersectionPoint = document.createElement("div");
	this.intersectionPoint.style.position = "absolute";
	this.intersectionPoint.style.visibility = "hidden";
	this.intersectionPoint.style.width = "5px";
	this.intersectionPoint.style.height = "5px";
	this.intersectionPoint.style.top = "-1px";
	this.intersectionPoint.style.left = "-1px";
	this.intersectionPoint.style.border = "1px solid #ffffff";
	this.intersectionPoint.style.background = "#ff8000";
	this.intersectionPoint.style.zIndex = 50;
	this.container.appendChild(this.intersectionPoint);
	this.intersectionDisplay = document.createElement("div");
	this.intersectionDisplayText = document.createTextNode("");
	this.intersectionDisplay.style.position = "absolute";
	this.intersectionDisplay.style.visibility = "hidden";
	this.intersectionDisplay.style.height = "20px";
	this.intersectionDisplay.style.padding = "4px";
	this.intersectionDisplay.style.top = "-1px";
	this.intersectionDisplay.style.left = "-1px";
	this.intersectionDisplay.style.border = "1px solid #a0a0a0";
	this.intersectionDisplay.style.background = "#ffffff";
	this.intersectionDisplay.style.webkitBoxShadow = "5px 5px 5px #808080";
	this.intersectionDisplay.style.MozBoxShadow = "5px 5px 5px #808080";
	this.intersectionDisplay.style.OBoxShadow = "5px 5px 5px #808080";
	this.intersectionDisplay.style.msBoxShadow = "5px 5px 5px #808080";
	this.intersectionDisplay.style.boxShadow = "5px 5px 5px #808080";
	this.intersectionDisplay.style.zIndex = 50;
	this.intersectionDisplay.appendChild(this.intersectionDisplayText);
	this.container.appendChild(this.intersectionDisplay);
	this.selectMode(RESHIX_MODE_MOVE);
	this.canvas = false;
	this.context = false;
	this.vars = {
		pi: 3.141592653589793,
		e: 2.718281828459045,
		s: 0,
		t: 0,
		x: 0,
		theta: 0
	};
	this.plots = [];
	this.plotlastid = 0;
	this.width = false;
	this.height = false;
	this.xmin = -5;
	this.xmax = 5;
	this.ymin = -5;
	this.ymax = 5;
	this.xgrid = "";
	this.ygrid = "";
	this.xgridunits = null;
	this.ygridunits = null;
	this.showGrid = true;
	this.showAxes = true;
	this.showTicks = true;
	this.showLabels = true;
	this.gridColor = "#D0D0D0";
	this.axesColor = "#606060";
	this.labelsColor = "#606060";
	this.backgroundColor = "#FFFFFF";
	this.setSize = function() {
		this.width = this.container.offsetWidth;
		this.height = this.container.offsetHeight;
		this.canvas.setAttribute("width", this.width);
		this.canvas.setAttribute("height", this.height);
		this.recorder.width = this.width;
		this.recorder.height = this.height
		return this;
	};
	this.canvas = document.createElement("canvas");
	try {
		if (RESHIX_MSIE) {
			G_vmlCanvasManager.initElement(this.canvas)
		}
	} catch (error) {}
	this.subcontainer.appendChild(this.canvas);
	this.setSize();
	this.canvas.style.webkitBackfaceVisibility = "hidden";
	this.canvas.style.webkitTransform = "translate3d(0,0,0)";
	this.canvas.style.MozTransform = "translate3d(0,0,0)";
	this.context = this.canvas.getContext("2d");
	this.getRealGrid = function() {
		if (parseFloat(this.xgrid)) {
			realxgrid = this.xgrid
		} else {
			orderfull = -.9 + Math.log(this.xmax - this.xmin) / Math.log(10);
			order = Math.floor(orderfull);
			rem = orderfull - order;
			realxgrid = Math.pow(10, order);
			if (rem > .7) realxgrid *= 5;
			else if (rem > .3) realxgrid *= 2
		}
		if (parseFloat(this.ygrid)) {
			realygrid = this.ygrid
		} else {
			orderfull = -.9 + Math.log(this.width / this.height * (this.ymax - this.ymin)) / Math.log(10);
			order = Math.floor(orderfull);
			rem = orderfull - order;
			realygrid = Math.pow(10, order);
			if (rem > .7) realygrid *= 5;
			else if (rem > .3) realygrid *= 2
		}
		return [realxgrid, realygrid]
	};
	this.drawGrid = function() {
		var e, t, n, r, i, s, o, u, a;
		a = this.getRealGrid();
		i = a[0];
		s = a[1];
		if ((this.ymax - this.ymin) / s > this.height / 2 || (this.xmax - this.xmin) / i > this.width / 2) {
			this.context.fillRect(0, 0, this.width, this.height)
		} else {
			this.context.beginPath();
			for (r = Math.ceil(this.ymin / s) * s; r <= this.ymax; r += s) {
				t = (1 - (r - this.ymin) / (this.ymax - this.ymin)) * this.height;
				this.context.moveTo(0, Math.floor(t));
				this.context.lineTo(this.width, Math.floor(t))
			}
			for (n = Math.ceil(this.xmin / i) * i; n <= this.xmax; n += i) {
				e = (n - this.xmin) / (this.xmax - this.xmin) * this.width;
				this.context.moveTo(Math.floor(e), 0);
				this.context.lineTo(Math.floor(e), this.height)
			}
			this.context.stroke()
		}
	};
	this.drawLabels = function() {
		var e, t, n, r, i, s;
		g = this.getRealGrid();
		i = g[0];
		s = g[1];
		var o = Math.pow(10, 2 - Math.floor(Math.log(this.xmax - this.xmin) / Math.log(10)));
		var u = Math.pow(10, 2 - Math.floor(Math.log(this.ymax - this.ymin) / Math.log(10)));
		this.context.font = "10px Droid Sans,Trebuchet MS,Arial,Helvetica,sans-serif";
		e = (0 - this.xmin) / (this.xmax - this.xmin) * this.width;
		this.context.textAlign = "left";
		if (e < 0) e = 0;
		if (e > this.width - this.width / 80 - 16) {
			if (this.xmax > 0) e -= 20;
			else e = this.width - this.width / 100 - 18;
			this.context.textAlign = "right"
		}
		if ((this.ymax - this.ymin) / s < this.height / 6) {
			for (r = Math.floor(this.ymin / s) * s; r <= this.ymax; r += s) {
				t = (this.ymax - r) / (this.ymax - this.ymin) * this.height;
				if (this.ygridunits == RESHIX_UNITS_PI) {
					printy = this.tryToMakeFraction(r / this.vars.pi) + "ПЂ"
				} else if (this.ygridunits == RESHIX_UNITS_E) {
					printy = this.tryToMakeFraction(r / this.vars.e) + "e"
				} else {
					printy = parseFloat(Math.round(r * u) / u)
				}
				if (t > 8 && t < this.height - 8) this.context.fillText(printy, e + this.width / 80, t + 2.5)
			}
		}
		this.context.textAlign = "center";
		t = this.ymax / (this.ymax - this.ymin) * this.height;
		if (t < 0) t = 0;
		if (t > this.height - 16 - this.width / 80) {
			if (this.ymin < 0) t -= 22;
			else t = this.height - 20 - this.width / 100
		}
		if ((this.xmax - this.xmin) / i < this.width / 6) {
			for (n = Math.floor(this.xmin / i) * i; n <= this.xmax; n += i) {
				e = (n - this.xmin) / (this.xmax - this.xmin) * this.width;
				if (this.xgridunits == RESHIX_UNITS_PI) {
					printx = this.tryToMakeFraction(n / this.vars.pi) + "ПЂ"
				} else if (this.xgridunits == RESHIX_UNITS_E) {
					printx = this.tryToMakeFraction(n / this.vars.e) + "e"
				} else {
					printx = parseFloat(Math.round(n * o) / o)
				}
				if (e > 8 && e < this.width - 8) this.context.fillText(printx, e, t + this.width / 80 + 8)
			}
		}
	};
	this.drawAxes = function() {
		var e, t, n, r, i, s;
		g = this.getRealGrid();
		i = g[0];
		s = g[1];
		if (this.xmin < 0 && this.xmax > 0) {
			e = (0 - this.xmin) / (this.xmax - this.xmin) * this.width
		} else if (this.xmin >= 0) {
			e = 0
		} else if (this.xmax <= 0) {
			e = this.width
		}
		this.context.beginPath();
		this.context.moveTo(e, 0);
		this.context.lineTo(e, this.height);
		this.context.stroke();
		if (this.showTicks) {
			if ((this.ymax - this.ymin) / s > this.height / 2) {
				this.context.fillRect(e - this.width / 100, 0, this.width / 50, this.height)
			} else {
				this.context.beginPath();
				for (r = Math.floor(this.ymin / s) * s; r <= this.ymax; r += s) {
					t = (this.ymax - r) / (this.ymax - this.ymin) * this.height;
					this.context.moveTo(e - this.width / 100, t);
					this.context.lineTo(e + this.width / 100, t)
				}
				this.context.stroke()
			}
		}
		if (this.ymin < 0 && this.ymax > 0) {
			t = (1 - (0 - this.ymin) / (this.ymax - this.ymin)) * this.height
		} else if (this.ymin >= 0) {
			t = this.height
		} else if (this.ymax <= 0) {
			t = 0
		}
		this.context.beginPath();
		this.context.moveTo(0, t);
		this.context.lineTo(this.width, t);
		this.context.stroke();
		if (this.showTicks) {
			if ((this.xmax - this.xmin) / i > this.width / 2) {
				this.context.fillRect(0, t - this.width / 100, this.width, this.width / 50)
			} else {
				this.context.beginPath();
				for (n = Math.floor(this.xmin / i) * i; n <= this.xmax; n += i) {
					e = (n - this.xmin) / (this.xmax - this.xmin) * this.width;
					this.context.moveTo(e, t - this.width / 100);
					this.context.lineTo(e, t + this.width / 100)
				}
				this.context.stroke()
			}
		}
	};
	this.clear = function() {
		if (this.context != this.recorder) {
			this.canvas.width = this.canvas.width
		}
		if (this.context.clear) {
			this.context.clear()
		}
		this.context.fillStyle = this.backgroundColor;
		this.context.fillRect(0, 0, this.width, this.height)
	};
	this.isMouseDown = 0;
	this.dragInitX = 0;
	this.dragInitY = 0;
	this.dpx = 0;
	this.dpy = 0;
	this.container.onmousemove = function(e) {
		if (e == null) e = window.event;
		for (i in RESHIX_INSTANCES)
			if (this == RESHIX_INSTANCES[i].container) var t = RESHIX_INSTANCES[i];
		if (e && e.preventDefault) e.preventDefault();
		if (e && (e.srcElement ? e.srcElement : e.target).className == "reshix-tool") return null;
		if (t.zoomTimeout) return null;
		var n = t.container.offsetLeft;
		var r = t.container.offsetTop;
		if (t.container.parentNode) {
			n += t.container.parentNode.offsetLeft;
			r += t.container.parentNode.offsetTop
		}
		var s = (!RESHIX_MSIE ? e.pageX : document.body.scrollLeft + event.clientX) - n;
		var o = (!RESHIX_MSIE ? e.pageY : document.body.scrollTop + event.clientY) - r;
		if (t.isMouseDown) {
			t.dpx = s - t.dragInitX;
			t.dpy = o - t.dragInitY;
			switch (t.selectedMode) {
				case RESHIX_MODE_MOVE:
					t.subcontainer.style.left = t.dpx + "px";
					t.subcontainer.style.top = t.dpy + "px";
					break;
				case RESHIX_MODE_ZOOMBOX:
					t.zoomboxBox.style.width = t.dpx + "px";
					t.zoomboxBox.style.height = t.dpy + "px";
					break;
				case RESHIX_MODE_TRACE:
					var u = s / t.width * (t.xmax - t.xmin) + t.xmin;
					var a = Math.pow(10, 2 - Math.floor(Math.log(t.xmax - t.xmin) / Math.log(10)));
					var u = parseFloat(Math.floor(u * a) / a);
					var f = (1 - o / t.height) * (t.ymax - t.ymin) + t.ymin;
					t.showTrace(u, f);
					break
			}
		}
	};
	this.container.onmouseover = function(e) {
		if (e == null) e = window.event;
		for (i in RESHIX_INSTANCES)
			if (this == RESHIX_INSTANCES[i].container) var t = RESHIX_INSTANCES[i];
		if (e && e.preventDefault) e.preventDefault();
		//t.toolcontainer.style.visibility = "visible";
		if (e && (e.srcElement ? e.srcElement : e.target).className == "reshix-tool") return null
	};
	this.container.onmouseout = function(e) {
		if (e == null) e = window.event;
		for (i in RESHIX_INSTANCES)
			if (this == RESHIX_INSTANCES[i].container) var t = RESHIX_INSTANCES[i];
		if (e && e.preventDefault) e.preventDefault();
		//t.toolcontainer.style.visibility = "hidden";
		if (e && (e.srcElement ? e.srcElement : e.target).className == "reshix-tool") return null;
		this.onmouseup(e)
	};
	this.container.onmousedown = function(e) {
		if (e == null) e = window.event;
		for (i in RESHIX_INSTANCES)
			if (this == RESHIX_INSTANCES[i].container) var t = RESHIX_INSTANCES[i];
		if (e && e.preventDefault) e.preventDefault();
		if (e && (e.srcElement ? e.srcElement : e.target).className == "reshix-tool") return null;
		if (t.zoomTimeout) return null;
		var n = t.container.offsetLeft;
		var r = t.container.offsetTop;
		if (t.container.parentNode) {
			n += t.container.parentNode.offsetLeft;
			r += t.container.parentNode.offsetTop
		}
		var s = (!RESHIX_MSIE ? e.pageX : document.body.scrollLeft + event.clientX) - n;
		var o = (!RESHIX_MSIE ? e.pageY : document.body.scrollTop + event.clientY) - r;
		t.dragInitX = s;
		t.dragInitY = o;
		t.isMouseDown = true;
		switch (t.selectedMode) {
			case RESHIX_MODE_ZOOMBOX:
				t.zoomboxBox.style.left = s + "px";
				t.zoomboxBox.style.top = o + "px";
				t.zoomboxBox.style.width = "0px";
				t.zoomboxBox.style.height = "0px";
				t.zoomboxBox.style.visibility = "visible";
				break
		}
	};
	this.container.onmouseup = function(e) {
		if (e == null) e = window.event;
		if (e && e.preventDefault) e.preventDefault();
		for (i in RESHIX_INSTANCES)
			if (this == RESHIX_INSTANCES[i].container) var t = RESHIX_INSTANCES[i];
		var n = t.container.offsetLeft;
		var r = t.container.offsetTop;
		if (t.container.parentNode) {
			n += t.container.parentNode.offsetLeft;
			r += t.container.parentNode.offsetTop
		}
		var s = (!RESHIX_MSIE ? e.pageX : document.body.scrollLeft + event.clientX) - n;
		var o = (!RESHIX_MSIE ? e.pageY : document.body.scrollTop + event.clientY) - r;
		if (t.isMouseDown) {
			t.isMouseDown = false;
			switch (t.selectedMode) {
				case RESHIX_MODE_MOVE:
					if (t.zoomTimeout) return null;
					var u = t.dpx / t.width * (t.xmax - t.xmin);
					var a = t.dpy / t.height * (t.ymax - t.ymin);
					t.xmin -= u;
					t.xmax -= u;
					t.ymin += a;
					t.ymax += a;
					t.dpx = 0;
					t.dpy = 0;
					t.subcontainer.style.left = "0px";
					t.subcontainer.style.top = "0px";
					t.reDraw();
					t.onWindowChange([t.xmin, t.xmax, t.ymin, t.ymax]);
					break;
				case RESHIX_MODE_ZOOMBOX:
					t.zoomboxBox.style.visibility = "hidden";
					t.selectMode(RESHIX_MODE_MOVE);
					if (parseInt(t.zoomboxBox.style.width) > 5 && parseInt(t.zoomboxBox.style.height) > 5) {
						var f = parseInt(t.zoomboxBox.style.left) / t.width * (t.xmax - t.xmin) + t.xmin;
						var l = t.ymax - parseInt(t.zoomboxBox.style.top) / t.height * (t.ymax - t.ymin);
						var c = (parseInt(t.zoomboxBox.style.left) + parseInt(t.zoomboxBox.style.width)) / t.width * (t.xmax - t.xmin) + t.xmin;
						var h = t.ymax - (parseInt(t.zoomboxBox.style.top) + parseInt(t.zoomboxBox.style.height)) / t.height * (t.ymax - t.ymin);
						t.xmin = f;
						t.xmax = c;
						t.ymin = h;
						t.ymax = l;
						t.reDraw();
						t.onWindowChange([t.xmin, t.xmax, t.ymin, t.ymax])
					}
					break;
				case RESHIX_MODE_INTERSECTION:
					t.showIntersection(t.dragInitX / t.width * (t.xmax - t.xmin) + t.xmin);
					break;
				case RESHIX_MODE_TRACE:
					var p = s / t.width * (t.xmax - t.xmin) + t.xmin;
					var d = Math.pow(10, 2 - Math.floor(Math.log(t.xmax - t.xmin) / Math.log(10)));
					var p = parseFloat(Math.floor(p * d) / d);
					var v = (1 - o / t.height) * (t.ymax - t.ymin) + t.ymin;
					t.showTrace(p, v);
					break
			}
		}
	};
	this.lastTouch = null;
	this.container.ontouchmove = function(e) {
		e.preventDefault();
		for (i in RESHIX_INSTANCES)
			if (this == RESHIX_INSTANCES[i].container) var t = RESHIX_INSTANCES[i];
		if (e.touches.length >= 1) {
			var n = e.touches[0];
			t.lastTouch = n;
			this.mousemove(n)
		} else {
			t.lastTouch = null
		}
	};
	this.container.ontouchstart = function(e) {
		e.preventDefault();
		for (i in RESHIX_INSTANCES)
			if (this == RESHIX_INSTANCES[i].container) var t = RESHIX_INSTANCES[i];
		if (e.touches.length >= 1) {
			var n = e.touches[0];
			t.lastTouch = n;
			this.mousedown(n)
		} else {
			t.lastTouch = null
		}
	};
	this.container.ontouchend = function(e) {
		e.preventDefault();
		for (i in RESHIX_INSTANCES)
			if (this == RESHIX_INSTANCES[i].container) var t = RESHIX_INSTANCES[i];
		if (e.touches.length == 0) {
			this.mouseup(t.lastTouch);
			t.lastTouch = null
		}
	};
	this.onmousewheel = function(e) {
		if (e == null) e = window.event;
		for (i in RESHIX_INSTANCES)
			if (this == RESHIX_INSTANCES[i].container) var t = RESHIX_INSTANCES[i];
		if (e && e.preventDefault) e.preventDefault();
		else e.returnValue = false;
		if (e && (e.srcElement ? e.srcElement : e.target).className == "reshix-tool") return null;
		var n = 0;
		if (e.wheelDelta) {
			n = e.wheelDelta / 120
		} else if (e.detail) {
			n = -e.detail / 3
		}
		if (n > 0 && t.zoomPendingFactor <= 8) t.zoom(1.25);
		else if (n < 0 && t.zoomPendingFactor >= .125) t.zoom(.8);
		else if (n) t.zoom(1)
	};
	this.container.onmousewheel = this.onmousewheel;
	if (this.container.addEventListener) {
		this.container.addEventListener("DOMMouseScroll", this.onmousewheel, false)
	}
	this.drawPoints = function(e) {
		if (e.length) {
			for (i in e) {
				if (e[i].length == 2) {
					px = (e[i][0] - this.xmin) / (this.xmax - this.xmin) * this.width;
					py = (this.ymax - e[i][1]) / (this.ymax - this.ymin) * this.height;
					if (!isNaN(px) && !isNaN(py) && 0 <= px && px <= this.width && 0 <= py && py <= this.height) {
						this.context.fillRect(px - 2, py - 2, 5, 5)
					}
				}
			}
		}
	};
	this.drawFunction = function(e) {
		var t, n, r, i = false,
			s, o = false,
			u, a, f, l, c, h = false;
		this.context.beginPath();
		var p = false;
		var d = RESHIX_MSIE ? 1 : .25;
		this.context.moveTo(-10, this.height / 2);
		for (t = 0; t < this.width; t += d) {
			this.vars.x = t / this.width * (this.xmax - this.xmin) + this.xmin;
			r = e(this.vars);
			if (isNaN(r)) {
				if (!o) {
					if (c > 0 && l > 0) this.context.lineTo(a, 0);
					else if (c < 0 && l < 0) this.context.lineTo(a, this.height)
				}
				u = false;
				i = true
			} else {
				n = (this.ymax - r) / (this.ymax - this.ymin) * this.height;
				u = n >= 0 && n <= this.height;
				if (n > this.height + 100) n = this.height + 100;
				if (n < -100) n = -100;
				i = false
			}
			if (d > .001 && u && !s) {
				t -= d;
				d /= 10
			} else {
				if (!(o || i) && (s || u)) {
					this.context.lineTo(t, n)
				} else {
					if (!o && !i && l * r < 0 && l * r > Math.min(-10, this.ymin - this.ymax)) {
						this.context.lineTo(t, n)
					} else {
						this.context.moveTo(t, n)
					}
				}
				if (u) d = d / Math.abs(f - n);
				else d = 1;
				if (d > 2) d = 2;
				else if (d < .001) d = .001;
				else if (isNaN(d)) d = 1;
				a = t;
				f = n;
				l = r;
				s = u;
				o = i
			}
		}
		this.context.stroke()
	};
	this.drawPolar = function(e, t, n, r) {
		var i, s, o, u, a, f, l;
		this.context.beginPath();
		var c = "";
		var h = false;
		for (t; t <= n; t += r) {
			this.vars.t=t;
			a = e(this.vars);
			o = a * Math.cos(t);
			u = a * Math.sin(t);
			if (isNaN(u) || isNaN(o)) l = false;
			else {
				i = (o - this.xmin) / (this.xmax - this.xmin) * this.width;
				s = (this.ymax - u) / (this.ymax - this.ymin) * this.height;
				if (!h) {
					h = true;
					this.context.moveTo(i, s)
				}
				l = i > 0 && i < this.width && s > 0 && s < this.height;
				if (f || l) {
					this.context.lineTo(i, s)
				} else {
					this.context.moveTo(i, s)
				}
			}
			f = l
		}
		this.context.stroke()
	};
	this.drawParametric = function(ex, ey, t, r, i) {
		var s, o, u, a, f, l;
		var c = false;
		this.context.beginPath();
		for (t; t <= r; t += i) {
			this.vars.t=t;
			u = ex(this.vars);
			a = ey(this.vars);
			if (isNaN(a) || isNaN(u)) l = false;
			else {
				s = (u - this.xmin) / (this.xmax - this.xmin) * this.width;
				o = (this.ymax - a) / (this.ymax - this.ymin) * this.height;
				if (!c) {
					c = true;
					this.context.moveTo(s, o)
				}
				l = s > 0 && s < this.width && o > 0 && o < this.height;
				if (f || l) {
					this.context.lineTo(s, o)
				} else {
					this.context.moveTo(s, o)
				}
			}
			f = l
		}
		this.context.stroke()
	};
	this.findIntersection = function(e, t, n) {
		var r, i, s, o, u, a = 1e-10;
		var f = 0;
		if (e == null) return 0;
		if (t == null) {
			t = function() {
				return 0
			}
		}
		this.vars.x = n;
		i = e(this.vars);
		s = t(this.vars);
		o = i - s;
		while (f < 100) {
			f++;
			i = e(this.vars);
			s = t(this.vars);
			o = i - s;
			this.vars.x += a;
			i = e(this.vars);
			s = t(this.vars);
			u = i - s;
			if (o - u != 0) {
				this.vars.x += o * a / (o - u)
			}
		}
		i = e(this.vars);
		s = t(this.vars);
		o = i - s;
		if (isNaN(this.vars.x)) return null;
		if (Math.abs(o) > 1e-9) return null;
		else return parseFloat(this.vars.x.toFixed(9))
	};
	this.showTrace = function(e, t) {
		var n, r, i = 1e10,
			s = null,
			o = null;
		this.vars.x = e;
		for (n in this.plots) {
			if (this.plots[n]["type"] == RESHIX_TYPE_FUNCTION) {
				r = this.plots[n].jeq(this.vars);
				if (Math.abs(r - t) < i) {
					i = Math.abs(r - t);
					s = n;
					o = r
				}
			}
		}
		if (s === null) return null;
		px = (e - this.xmin) / (this.xmax - this.xmin) * this.width;
		py = (this.ymax - o) / (this.ymax - this.ymin) * this.height;
		this.tracePoint.style.visibility = "";
		this.tracePoint.style.left = px - 3 + "px";
		this.tracePoint.style.top = py - 3 + "px";
		this.traceDisplay.style.visibility = "";
		this.traceDisplay.style.left = px + "px";
		this.traceDisplay.style.top = py + 8 - (py > this.height / 2 ? 48 : 0) + "px";
		this.traceDisplayText.nodeValue = "(" + parseFloat(e.toFixed(9)) + "," + parseFloat(o.toFixed(9)) + ")"
	};
	this.showIntersection = function(e) {
		this.vars.x = e;
		var t, n, r, i, s = 1e10,
			o = null;
		this.plotstmp = this.plots.slice(0);
		this.plotstmp.unshift({
			type: RESHIX_TYPE_FUNCTION,
			jeq: function() {
				return 0
			}
		});
		for (t in this.plotstmp) {
			if (this.plotstmp[t]["type"] == RESHIX_TYPE_FUNCTION) {
				for (n in this.plotstmp) {
					if (t != n && this.plotstmp[n]["type"] == RESHIX_TYPE_FUNCTION) {
						r = this.plotstmp[t].jeq(this.vars);
						i = this.plotstmp[n].jeq(this.vars);
						if (Math.abs(r - i) < s) {
							s = Math.abs(r - i);
							o = [t, n]
						}
					}
				}
			}
		}
		if (o === null) return null;
		xroot = this.findIntersection(this.plotstmp[o[0]].jeq, this.plotstmp[o[1]].jeq, e);
		y = this.plotstmp[o[0]].jeq(this.vars);
		y = parseFloat(y.toFixed(9));
		px = (xroot - this.xmin) / (this.xmax - this.xmin) * this.width;
		py = (this.ymax - y) / (this.ymax - this.ymin) * this.height;
		if (xroot != null) {
			this.intersectionPoint.style.visibility = "";
			this.intersectionPoint.style.left = px - 3 + "px";
			this.intersectionPoint.style.top = py - 3 + "px";
			this.intersectionDisplay.style.visibility = "";
			this.intersectionDisplay.style.left = px + "px";
			this.intersectionDisplay.style.top = py + 8 - (py > this.height / 2 ? 48 : 0) + "px";
			this.intersectionDisplayText.nodeValue = "(" + xroot + "," + y + ")"
		}
	};
	this.tryToMakeFraction = function(e) {
		var t, n;
		for (var n = 1; n < 16; n++) {
			t = (e * n).toFixed(9);
			if (t.indexOf(".000000000") != -1) return parseFloat(t) + (n == 1 ? "" : "/" + n)
		}
		return parseFloat(e.toFixed(9)).toString()
	};
	this.parseEquationError = "";
	this.parseEquationHasElement = function(e, t) {
		for (var n = 0; n < e.length; n++)
			if (e[n] == t) return true;
		return false
	};
	this.parseEquationFixPowers = function(e) {
		if (e == null) {
			this.parseEquationError ? null : this.parseEquationError = "syntax error";
			return null
		}
		for (t = 0; t < e.length; t++) {
			if (this.parseEquationIsArray(e[t])) {
				e[t] = this.parseEquationFixPowers(e[t]);
				if (e[t] == null) {
					this.parseEquationError ? null : this.parseEquationError = "syntax error";
					return null
				}
			}
		}
		for (var t = 0; t < e.length; t++) {
			if (e[t] == "^") {
				if (e[t - 1] == null || e[t + 1] == null) {
					this.parseEquationError = "^ requires two arguments, for example x^2 or (x+1)^(x+2).";
					return null
				}
				e.splice(t - 1, 3, new Array("Math.pow", new Array("(", e[t - 1], ",", e[t + 1], ")")));
				t -= 2
			}
		}
		return e
	};
	this.parseEquationFixFunctions = function(e) {
		if (e == null) {
			this.parseEquationError ? null : this.parseEquationError = "syntax error";
			return null
		}
		for (t = 0; t < e.length; t++) {
			if (this.parseEquationIsArray(e[t])) {
				e[t] = this.parseEquationFixFunctions(e[t]);
				if (e[t] == null) {
					this.parseEquationError ? null : this.parseEquationError = "syntax error";
					return null
				}
			}
		}
		for (var t = 0; t < e.length; t++) {
			if (!this.parseEquationIsArray(e[t])) {
				if (RESHIX_MATH[e[t]] != undefined) {
					if (e[t + 1] == null) {
						this.parseEquationEror = "function " + e[t] + " requires an argument.";
						return null
					}
					e[t] = "RESHIX_MATH." + e[t].toLowerCase();
					e.splice(t, 2, new Array("(", e[t], e[t + 1], ")"));
					t--
				}
			}
		}
		return e
	};
	this.parseEquationIsArray = function(e) {
		if (e == null) {
			return 0
		}
		if (e.constructor.toString().indexOf("Array") == -1) return false;
		return true
	};
	this.parseEquationJoinArray = function(e) {
		var t = "";
		for (var n = 0; n < e.length; n++) {
			if (this.parseEquationIsArray(e[n])) {
				t += this.parseEquationJoinArray(e[n])
			} else {
				t += e[n]
			}
		}
		return t
	};
	this.parseEquation = function(eq, vars) {
		var jeq = null;
		var tokens;
		var e, i;
		var pstart = -1,
			pend;
		if (!vars) vars = this.vars;
		jeq_error = "";
		e = eq.replace(/\s/g, "");
		e = e.replace(/([0-9])([a-df-z]|[a-z][a-z]|\()/ig, "$1*$2");
		e = e.replace(/(\))([0-9a-df-z]|[a-z][a-z]|\()/ig, "$1*$2");
		e = e.replace(/([a-z0-9\.])([^a-z0-9\.])/ig, "$1 $2");
		e = e.replace(/([^a-z0-9\.])([a-z0-9\.])/ig, "$1 $2");
		e = e.replace(/(\-|\)|\()/g, " $1 ");
		tokens = e.split(/ +/);
		for (i = 0; i < tokens.length; i++) {
			tokens[i] = tokens[i].replace(/ /g, "");
			tokens[i] = tokens[i].replace(/_/g, ".");
			//Показать княпку сохранить график
			$('#save_button').show();

			if (tokens[i] == "") {
				tokens.splice(i, 1);
				i--
			} else if (tokens[i].match(/^[a-z][a-z0-9]*$/i) && (tokens[i] in vars)) {
				tokens[i] = "vars." + tokens[i].replace(/theta|s/, 't')
			} else if (tokens[i].length > 0 && tokens[i].match(/^[a-z][a-z0-9]*$/i) && !(tokens[i] in RESHIX_MATH)) {
				this.parseEquationError = "invalid variable or function: " + tokens[i];
				$('#save_button').hide();
				return null
			}
		}
		while (this.parseEquationHasElement(tokens, "(") || this.parseEquationHasElement(tokens, ")")) {
			pstart = -1;
			for (i = 0; i < tokens.length; i++) {
				if (tokens[i] == "(") pstart = i;
				if (tokens[i] == ")" && pstart == -1) {
					this.parseEquationError = "unmatched right parenthesis )";
					return null
				}
				if (tokens[i] == ")" && pstart != -1) {
					tokens.splice(pstart, i - pstart + 1, tokens.slice(pstart, i + 1));
					i = -1;
					pstart = -1
				}
			}
			if (pstart != -1) {
				this.parseEquationError = "unmatched left parenthesis (";
				return null
			}
		}
		tokens = this.parseEquationFixFunctions(tokens);
		if (tokens == null) {
			return null
		}
		tokens = this.parseEquationFixPowers(tokens);
		if (tokens == null) {
			return null
		}
		console.log(this.parseEquationJoinArray(tokens))
		eval("jeq=function(vars) { return " + this.parseEquationJoinArray(tokens) + "; }");
		return jeq
	};
	this.parseConst = function(e) {
		var t = {
			pi: this.vars.pi,
			e: this.vars.e
		};
		var n = this.parseEquation(e, t);
		if (n) return parseFloat(n(t));
		else {
			//alert(this.parseEquationError);
			return 0
		}
	};
	this.reDraw = function() {
		this.hideIntersection();
		this.hideTrace();
		this.clear();
		if (this.showGrid) {
			this.context.strokeStyle = this.gridColor;
			this.context.fillStyle = this.gridColor;
			this.drawGrid()
		}
		if (this.showAxes) {
			this.context.strokeStyle = this.axesColor;
			this.context.fillStyle = this.axesColor;
			this.drawAxes()
		}
		if (this.showLabels) {
			this.context.fillStyle = this.labelsColor;
			this.drawLabels()
		}
		this.plots.forEach((plot, i)=>{
			if (plot.invalid) return;
			this.context.strokeStyle = plot.color;
			switch (plot.type) {
				case RESHIX_TYPE_FUNCTION:
					this.drawFunction(plot.jeq);
					break;
				case RESHIX_TYPE_POLAR:
					this.drawPolar(plot.jeq, plot.jmin, plot.jmax, plot.jstep);
					break;
				case RESHIX_TYPE_PARAMETRIC:
					this.drawParametric(plot.jeqx, plot.jeqy, plot.jmin, plot.jmax, plot.jstep);
					break;
				case RESHIX_TYPE_POINTS:
					this.context.fillStyle = plot.color;
					this.drawPoints(plot.points);
					break
			}
		})
		if (RESHIX_MSIE) {
			this.context.beginPath();
			this.context.moveTo(0, -1);
			this.context.lineTo(-1, -1);
			this.context.stroke()
		}
		return this;
	};
	this.addPlot = function(form) {
		if (!form) return;


		const t = form.dataset.type || 0;
		const plot = {
			id: this.plotlastid++,
			type: t,
			setEq: ({name, value, classList})=>{
				plot[name]=value
			}

		}
		if (!n) n = {};
		if (!n.color) n.color = "#000000";
		if (!n.width) n.width = 1;
		switch (t) {
			case RESHIX_TYPE_FUNCTION:
				var r = this.parseEquation(e);
				if (!r) {
					alert(this.parseEquationError);
					return null
				}
				this.plots.push({
					eq: e,
					jeq: r,
					options: n
				});
				break;
			case RESHIX_TYPE_POLAR:
				var r = this.parseEquation(e);
				if (!r) {
					alert(this.parseEquationError);
					return null
				}
				n["min"] = n["min"] ? this.parseConst(n["min"]) : 0;
				n["max"] = n["max"] ? this.parseConst(n["max"]) : 2 * this.vars.pi;
				n["step"] = n["step"] ? this.parseConst(n["step"]) : .01;
				if (n["step"] <= 0) n["step"] = .01;
				this.plots.push({
					id: this.plotlastid++,
					type: t,
					eq: e,
					jeq: r,
					options: n
				});
				break;
			case RESHIX_TYPE_PARAMETRIC:
				var i = this.parseEquation(e[0]);
				if (!i) {
					alert(this.parseEquationError);
					return null
				}
				var s = this.parseEquation(e[1]);
				if (!s) {
					alert(this.parseEquationError);
					return null
				}
				n["min"] = n["min"] ? this.parseConst(n["min"]) : 0;
				n["max"] = n["max"] ? this.parseConst(n["max"]) : 10;
				n["step"] = n["step"] ? this.parseConst(n["step"]) : .01;
				this.plots.push({
					id: this.plotlastid++,
					type: t,
					eq: e,
					jeqx: i,
					jeqy: s,
					options: n
				});
				break;
			case RESHIX_TYPE_POINTS:
				if (e.length == null) return null;
				this.plots.push({
					id: this.plotlastid++,
					type: t,
					eq: e,
					options: n
				});
				break;
			default:
				alert("Error: invalid plot type")
		}
		return this.plots.size
	};
	this.deletePlot = function(e) {};
	this.deleteAllPlots = function() {
		this.plots = []
	};
	this.getGrid = function() {
		return [this.xgrid, this.ygrid]
	};
	this.setGrid = function(e) {
		e[0] = e[0].replace(" ", "");
		if (e[0]) {
			e[0] = this.parseConst(e[0]);
			if (e[0] <= 0) e[0] = 1;
			this.xgrid = e[0];
			if ((720 * e[0] / this.vars.pi).toFixed(6).match(/0000$/) !== null) {
				this.xgridunits = RESHIX_UNITS_PI
			} else if ((720 * e[0] / this.vars.e).toFixed(6).match(/0000$/) !== null) {
				this.xgridunits = RESHIX_UNITS_E
			} else {
				this.xgridunits = null
			}
		} else {
			this.xgrid = null;
			this.xgridunits = null
		}
		e[1] = e[1].replace(" ", "");
		if (e[1]) {
			e[1] = this.parseConst(e[1]);
			if (e[1] <= 0) e[1] = 1;
			this.ygrid = e[1];
			if ((720 * e[1] / this.vars.pi).toFixed(6).match(/0000$/) !== null) {
				this.ygridunits = RESHIX_UNITS_PI
			} else if ((720 * e[1] / this.vars.e).toFixed(6).match(/0000$/) !== null) {
				this.ygridunits = RESHIX_UNITS_E
			} else {
				this.ygridunits = null
			}
		} else {
			this.ygrid = null;
			this.ygridunits = null
		}
	};
	this.getWindow = function() {
		return [this.xmin, this.xmax, this.ymin, this.ymax]
	};
	this.setWindow = function(e) {
		e[0] = this.parseConst(e[0]);
		e[1] = this.parseConst(e[1]);
		e[2] = this.parseConst(e[2]);
		e[3] = this.parseConst(e[3]);
		if (e[1] > e[0] && e[3] > e[2]) {
			this.xmin = e[0];
			this.xmax = e[1];
			this.ymin = e[2];
			this.ymax = e[3]
		} else {}
	};
	this.setBackgroundColor = function(e) {
		this.backgroundColor = e;
		this.container.style.background = e;
		this.subcontainer.style.background = e
	};
	this.setLabelsColor = function(e) {
		this.labelsColor = e
	};
	this.setAxesColor = function(e) {
		this.axesColor = e
	};
	this.setGridColor = function(e) {
		this.gridColor = e
	};
	this.setShowAxes = function(e) {
		this.showAxes = e
	};
	this.setShowTicks = function(e) {
		this.showTicks = e
	};
	this.setShowLabels = function(e) {
		this.showLabels = e
	};
	this.setShowGrid = function(e) {
		this.showGrid = e
	};
	this.getSVG = function() {
		this.context = this.recorder;
		this.reDraw();
		this.context = this.canvas.getContext("2d");
		return this.recorder.getSVG()
	};
	this.onWindowChange = function(e) {}

	$win.resize(e=>{
		this.setSize().reDraw()
	})
}
var RESHIX_TYPE_FUNCTION = 0;
var RESHIX_TYPE_POLAR = 1;
var RESHIX_TYPE_PARAMETRIC = 2;
var RESHIX_TYPE_POINTS = 3;
var RESHIX_MODE_MOVE = 1;
var RESHIX_MODE_ZOOMBOX = 2;
var RESHIX_MODE_INTERSECTION = 3;
var RESHIX_MODE_TRACE = 4;
var RESHIX_UNITS_PI = 1;
var RESHIX_UNITS_E = 2;
var RESHIX_INSTANCES = [];

RESHIX_MATH = {
	_prop: function pr(prop) {
		if (prop in this) return 'RESHIX_MATH.'+prop
		else return pr(prop.toUpperCase())
	},
	__proto__: Math
};
RESHIX_MATH.sec = function(e) {
	return 1 / Math.cos(e)
};
RESHIX_MATH.csc = function(e) {
	return 1 / Math.sin(e)
};
RESHIX_MATH.tg = Math.tan;
RESHIX_MATH.cot = RESHIX_MATH.ctg = function(e) {
	return 1 / Math.tan(e)
};
RESHIX_MATH.asec = function(e) {
	return Math.acos(1 / e)
};
RESHIX_MATH.acsc = function(e) {
	return Math.asin(1 / e)
};
RESHIX_MATH.acot = function(e) {
	return Math.atan(1 / e)
};
RESHIX_MATH.ln = Math.log;
RESHIX_MATH.log = function(x, base) {
	if (base===undefined) return Math.log(x);
	if (x<0 || base<0) return NaN;
	if (+x==1) return 0;
	if (base==0) return Math.sign(x-1)*Infinity;
	return Math.log(x) / Math.log(base)
};
RESHIX_MATH.lg=Math.log10;
RESHIX_MATH.sech = function(e) {
	return 2 / (Math.exp(e) + Math.exp(-e))
};
RESHIX_MATH.csch = function(e) {
	return 2 / (Math.exp(e) - Math.exp(-e))
};
RESHIX_MATH.coth = function(e) {
	return (Math.exp(e) + Math.exp(-e)) / (Math.exp(e) - Math.exp(-e))
};
RESHIX_MATH.asech = function(e) {
	return Math.log(1 / e + Math.sqrt(1 / e / e - 1))
};
RESHIX_MATH.acsch = function(e) {
	return Math.log(1 / e + Math.sqrt(1 / e / e + 1))
};
RESHIX_MATH.acoth = function(e) {
	return .5 * Math.log((1 + e) / (1 - e))
};
RESHIX_MATH.u = function(e) {
	return e >= 0
};
var RESHIX_MSIE = navigator.userAgent.toLowerCase().indexOf("msie") != -1;
var RESHIX_TRANSITIONS = function() {
	var e = document.body || document.documentElement;
	var t = e.style;
	var n = "transition";
	if (typeof t[n] == "string") {
		return true
	}
	v = ["Moz", "Webkit", "Khtml", "O", "ms"], n = n.charAt(0).toUpperCase() + n.substr(1);
	for (var r = 0; r < v.length; r++) {
		if (typeof t[v[r] + n] == "string") {
			return true
		}
	}
	return false
}()

function StringBuffer() {
	this.buffer = []
}

function Utf8EncodeEnumerator(e) {
	this._input = e;
	this._index = -1;
	this._buffer = []
}

function Base64DecodeEnumerator(e) {
	this._input = e;
	this._index = -1;
	this._buffer = []
}
StringBuffer.prototype.append = function(t) {
	this.buffer.push(t);
	return this
};
StringBuffer.prototype.toString = function e() {
	return this.buffer.join("")
};
var Base64 = {
	codex: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789._-",
	encode: function(e) {
		var t = new StringBuffer;
		var n = new Utf8EncodeEnumerator(e);
		while (n.moveNext()) {
			var r = n.current;
			n.moveNext();
			var i = n.current;
			n.moveNext();
			var s = n.current;
			var o = r >> 2;
			var u = (r & 3) << 4 | i >> 4;
			var a = (i & 15) << 2 | s >> 6;
			var f = s & 63;
			if (isNaN(i)) {
				a = f = 64
			} else if (isNaN(s)) {
				f = 64
			}
			t.append(this.codex.charAt(o) + this.codex.charAt(u) + this.codex.charAt(a) + this.codex.charAt(f))
		}
		return t.toString()
	},
	decode: function(e) {
		var t = new StringBuffer;
		var n = new Base64DecodeEnumerator(e);
		while (n.moveNext()) {
			var r = n.current;
			if (r < 128) t.append(String.fromCharCode(r));
			else if (r > 191 && r < 224) {
				n.moveNext();
				var i = n.current;
				t.append(String.fromCharCode((r & 31) << 6 | i & 63))
			} else {
				n.moveNext();
				var i = n.current;
				n.moveNext();
				var s = n.current;
				t.append(String.fromCharCode((r & 15) << 12 | (i & 63) << 6 | s & 63))
			}
		}
		return t.toString()
	}
};
Utf8EncodeEnumerator.prototype = {
	current: Number.NaN,
	moveNext: function() {
		if (this._buffer.length > 0) {
			this.current = this._buffer.shift();
			return true
		} else if (this._index >= this._input.length - 1) {
			this.current = Number.NaN;
			return false
		} else {
			var e = this._input.charCodeAt(++this._index);
			if (e == 13 && this._input.charCodeAt(this._index + 1) == 10) {
				e = 10;
				this._index += 2
			}
			if (e < 128) {
				this.current = e
			} else if (e > 127 && e < 2048) {
				this.current = e >> 6 | 192;
				this._buffer.push(e & 63 | 128)
			} else {
				this.current = e >> 12 | 224;
				this._buffer.push(e >> 6 & 63 | 128);
				this._buffer.push(e & 63 | 128)
			}
			return true
		}
	}
};
Base64DecodeEnumerator.prototype = {
	current: 64,
	moveNext: function() {
		if (this._buffer.length > 0) {
			this.current = this._buffer.shift();
			return true
		} else if (this._index >= this._input.length - 1) {
			this.current = 64;
			return false
		} else {
			var e = Base64.codex.indexOf(this._input.charAt(++this._index));
			var t = Base64.codex.indexOf(this._input.charAt(++this._index));
			var n = Base64.codex.indexOf(this._input.charAt(++this._index));
			var r = Base64.codex.indexOf(this._input.charAt(++this._index));
			var i = e << 2 | t >> 4;
			var s = (t & 15) << 4 | n >> 2;
			var o = (n & 3) << 6 | r;
			this.current = i;
			if (n != 64) this._buffer.push(s);
			if (r != 64) this._buffer.push(o);
			return true
		}
	}
}

function changeColorTimeout() {
	if (changeColorTimeout_t) {
		window.clearTimeout(changeColorTimeout_t);
		changeColorTimeout_t = null
	}
	changeColorTimeout_t = window.setTimeout(function() {
		writeState();
		doPlot()
	}, 500)
}

function makeWindowSquare() {
	var e = (theplot.ymax + theplot.ymin) / 2;
	var t = (theplot.xmax - theplot.xmin) / 2;
	var n = theplot.height / theplot.width;
	$("#options-ymax").val(e + t * n);
	$("#options-ymin").val(e - t * n);
	writeState();
	doPlot()
}

var tmp_fn_names;

function doPermalink() {
	jQuery.post("link-create", "data=" + escape(JSON.stringify(plotState)).replace(/\+/g, "%2B"), function(e, t, n) {
		$("#dialog-permalink").html('<div style="padding-top:15px;padding-bottom:15px;">Permalink to this graph:<br><a href="http://reshix.com/plot/' + e + '"><b>http://reshix.com/plot/' + e + "</b></a></div>").dialog({
			modal: true,
			width: 500,
			title: "Permalink"
		})
	})
}

function rgb2hex(e) {
	if (e == undefined || !e.indexOf) return "#000000";
	if (e.indexOf("#") == 0) return e;
	e = e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
	return "#" + ("0" + parseInt(e[1], 10).toString(16)).slice(-2) + ("0" + parseInt(e[2], 10).toString(16)).slice(-2) + ("0" + parseInt(e[3], 10).toString(16)).slice(-2)
}

function writeState() {

	if (_readingFromHash) return

	_ignoreHashChange = true;
	console.log(location.hash = JSON.stringify(theplot.plots, 'type color eq eqx eqy min max step'.split(' '))
		 .replace(/%/g, '%25').replace(/(\s*\\n\s*)+/g, '\\n'));
	_ignoreHashChange = false;

	// t = {
	//     type: 1e3
	// };
	// var n = [-4, 4, -3, 3];
	// if (n[0] != -4 || n[1] != 4 || n[2] != -3 || n[3] != 3) t["window"] = n;
	// var r = ["", ""];
	// if (r[0] != "" || r[1] != "") t["grid"] = r;
	// var s = [parseInt($("#reshix-frame").css("width")), parseInt($("#reshix-frame").css("height"))];
	// if (s[0] != 720 || s[1] != 540) t["size"] = s;
	// t["showgrid"] = true;
	// t["showaxes"] = true;
	// t["showticks"] = true;
	// t["showlabels"] = true;
	// t["bgcolor"] = "#FFFFFF";
	// t["axescolor"] = "#000000";
	// t["labelscolor"] = "#000000";
	// t["gridcolor"] = "#D0D0D0";
	// e.push(t);
}

function _readState() {
	$("#plots").children("form").remove();
	for (let i in plotState) {
		const type = parseInt(plotState[i]["type"])
		if (/^[0-3]$/.test(type)) addGraph(type, plotState[i]);

		else if (type == 1e3) {
			if (plotState[i]["size"] === undefined) plotState[i]["size"] = [720, 540];
			$("#reshix-frame").css("width", plotState[i]["size"][0] + "px");
			$("#reshix-frame").css("height", plotState[i]["size"][1] + "px");
			theplot.setSize();
			if (plotState[i]["window"] === undefined) plotState[i]["window"] = [-4, 4, -3, 3];
			$("#options-xmin").val(plotState[i]["window"][0]);
			$("#options-xmax").val(plotState[i]["window"][1]);
			$("#options-ymin").val(plotState[i]["window"][2]);
			$("#options-ymax").val(plotState[i]["window"][3]);
			if (plotState[i]["grid"] === undefined) plotState[i]["grid"] = ["", ""];
			$("#options-xgrid").val(plotState[i]["grid"][0]);
			$("#options-ygrid").val(plotState[i]["grid"][1]);
			if (plotState[i]["showgrid"] === undefined) plotState[i]["showgrid"] = true;
			$("#options-showgrid").attr("checked", plotState[i]["showgrid"] ? true : false);
			if (plotState[i]["showaxes"] === undefined) plotState[i]["showaxes"] = true;
			$("#options-showaxes").attr("checked", plotState[i]["showaxes"] ? true : false);
			if (plotState[i]["showticks"] === undefined) plotState[i]["showticks"] = true;
			$("#options-showticks").attr("checked", plotState[i]["showticks"] ? true : false);
			if (plotState[i]["showlabels"] === undefined) plotState[i]["showlabels"] = true;
			$("#options-showlabels").attr("checked", plotState[i]["showlabels"] ? true : false);
			if (plotState[i]["bgcolor"] === undefined) plotState[i]["bgcolor"] = "#FFFFFF";
			$("#options-bgcolor").val(plotState[i]["bgcolor"]).miniColors("value", plotState[i]["bgcolor"]);
			if (plotState[i]["gridcolor"] === undefined) plotState[i]["gridcolor"] = "#D0D0D0";
			$("#options-gridcolor").val(plotState[i]["gridcolor"]).miniColors("value", plotState[i]["gridcolor"]);
			if (plotState[i]["labelscolor"] === undefined) plotState[i]["labelscolor"] = "#000000";
			$("#options-labelscolor").val(plotState[i]["labelscolor"]).miniColors("value", plotState[i]["labelscolor"]);
			if (plotState[i]["axescolor"] === undefined) plotState[i]["axescolor"] = "#000000";
			$("#options-axescolor").val(plotState[i]["axescolor"]).miniColors("value", plotState[i]["axescolor"])
		}
	}
}

function readState() {

	if (_ignoreHashChange || location.hash.length<4) return;

	_readingFromHash=true;

	const hash = location.hash.substring(1)		
		.replace(/^e?q=(.*)$/, '[{"type":"0","color":"","eq":"$1"}]');

	try {
		var plots=JSON.parse(/^%5B|\[/.test(hash) ? decodeURI(hash) : Base64.decode(hash));

		if (Array.isArray(plots) && plots[0]) theplot.plots=plots;
		else return;

		$plots.children('form').remove();

		theplot.plots.forEach(addGraph);
		refreshPlots();

	} catch (e) {theplot.plots=[]}

	_readingFromHash = 0

	return theplot.plots[0]
}

function refreshPlots() {
	theplot.plots.length=0;
	$plots.children().each((i,el)=>{
		if (el._plot) theplot.plots.push(el._plot)
	});
	theplot.reDraw();
	writeState()
}

const PLOTS = [
	{eq: 'x^2'},
	{eq: 'theta/2', min: 0, max: '2pi', step: .01}, //polar
	{eqx: 'cos(5t)', eqy: 'sin(3t)', min: 0, max: '2pi', step: .01}, //parametric
	{eq: '0, 0\n1, 1\n2, 2\n3, 1\n4, 2.5'}, // points
]

function addGraph(plot = {
	type: +$('#plots_add_type').val()||0,
	color: '#000000'
}) {
	Object.setPrototypeOf(plot, PLOTS[plot.type])

	const {type, color, eq, eqx, eqy, min, max, step} = plot,

		inp = (val, name) => `<input name=${name} type=text value="${val}">`,

		eqHTML = (eq, char)=>`<label class="equation">${char} = <textarea name=${eq}>${plot[eq]}</textarea></label>`;

	let html = `<form class="plot" data-type=${type}>
			<button type=button class="plot-close">⨉</button>
			<span class="plottitle">
			 <input type=color name=color value=${color}>
			 ${'Function y(x), Polar r(theta), Parametric, By points'.split(',')[type]}
			</span>`;
		
	if (type < 2) html += eqHTML('eq', 'yr'[type]);

	if (type == 2) html += eqHTML('eqx', 'x') + eqHTML('eqy', 'y') ;

	if (type % 3) html +=
		`<div class="plot-options">
			${inp(min, 'min')} &lt; t &lt ${inp(max, 'max')}
			step = ${inp(step, 'step')}
		<div>`.replace(/\s+/g, ' ');

	if (type == 3) html += `<textarea name=eq rows=5>${eq}</textarea>`;

	const $plot = $(html).hide()
		.prop({_plot: plot})
		.insertBefore('#plots_add')
		.on('click', '.plot-close', e=>{
			delete $plot[0]._plot;
			$plot.slideUp(e=>$plot.remove());
			refreshPlots();
		})
		.on('change', refreshPlots)
		.on('submit', e=>false)
		.on('keypress', 'textarea', checkEnter)
		 [_readingFromHash?'show':'slideDown']();

	$('input, textarea', $plot).on('change', parseInputs).each(parseInputs)

	if (!_readingFromHash) refreshPlots();
}

function parseInputs() {

	const {name} = this, 
		plot=this.form._plot, {type}=plot,
		getErr = ()=> theplot.parseEquationError;
	let value = this.value.trim();

	theplot.parseEquationError = '';

	if (/eq/.test(name) && type<3) {
		const eq = theplot.parseEquation(value);
		if (eq) plot['j'+name] = eq;
	} 

	if (/min|max|step/.test(name)) {
		 parsed=theplot.parseConst(value||'0');

		if (!getErr()){
			if (name=='step' && parsed <= 0) parsed=.01;
			plot['j'+name] = parsed;
			if (+value==0) this.value = value = parsed;
		}
	}
	if (type==3 && name=='eq') { //plots

		let points = plot.points = [], errors = [], point;
		value.trim().replace(/,$/, '').split(/[\s,]+/).forEach((el, i)=>{

			theplot.parseEquationError = '';

			if (!(i%2)) points.push(point=[]);

			point.push(theplot.parseConst(el));

			if (getErr()) errors.push(`point[${parseInt(i/2)}].${'yx'[i%2]}: getErr())`)
		})
		if (point.length==1) errors.push('Given an odd number of coordinates')
		theplot.parseEquationError = errors.join('\n');
		console.log(errors, getErr())
	}
	plot[name]=value;

	if (plot.invalid=getErr()) {
		this.classList.add('invalid');
		alert(getErr());
	}
}

function checkEnter(e) {
	if (!/^(10|13)$/.test(e.which)) return
	if (e.shiftKey || this.form._plot.type==3 && e.which==13) return
	$(this).change();
	e.preventDefault()
}

var theplot, $plots;
$(initGraph);

function initGraph() {
	if (theplot) return;
	if (!$('#reshix-frame')[0]) return;

	$(".nodrag").mousedown(function(e) {
		e.preventDefault()
	})

	$plots = $("#plots").sortable({
		items: '> form',
		//tolerance: 'pointer',
		stop: refreshPlots
	});

	$(".button-makewindowsquare").button({
		icons: {
			primary: "ui-icon-arrowthick-1-s"
		}
	}).css({
		width: "32px",
		"padding-top": "3px",
		"padding-bottom": "3px"
	});
	$(".selectmenu").selectmenu();
	theplot = new reshix($("#reshix-frame")[0]);
	theplot.settngsChanged=1;
	//theplot.reDraw();
	theplot.onWindowChange = function(e) {
		$("#options-xmin").val(e[0]);
		$("#options-xmax").val(e[1]);
		$("#options-ymin").val(e[2]);
		$("#options-ymax").val(e[3]);
		writeState()
	};

	$win.on('pointerdown', e=>{
		rect=$plots[0].getBoundingClientRect();
		if ($plots.hasClass('swiped')) {
			if (!$(e.target).closest('#plots, #plots_add_type-menu')[0]){
				$plots.removeClass('swiped').css('transform', '')
			}
		} else if (rect.left - e.pageX < 20) {
			$plots.addClass('swiped')
			.css('transform', `translateX(${Math.min($win.width() - rect.right, 0)}px)`)
		}
	})

	$('.graph-content').on('touchstart', function(e){
		const touch0=e.changedTouches[0],
		 x0=touch0.clientX,
		 y0=touch0.clientY

		$win.on('touchmove', move).on('touchend touchcancel', function off(e){
			$win.off('touchmove', move).off('touchend touchcancel', off)
		})

		function move(e) {

		}
	})

	readState() || addGraph()
};
var changeColorTimeout_t = null;
var _ignoreHashChange, _readingFromHash;
var plotState = []

/************************
 MADJACK CODE BELLOW
************************/

function isValidLetter(l){
	var valid_letter = "1234567890abcdefghijklmnopqrstuvwxyzABCDIFGHIJKLMNOPQRSTUVWXYZ*-+()/^ ";
	for(var i=0; i<valid_letter.length; i++){
		if(l == valid_letter[i]){
			return true;
		}
	}
	return false;
}

function isValidTagLetter(l){
	var valid_letter = "1234567890abcdefghijklmnopqrstuvwxyzABCDIFGHIJKLMNOPQRSTUVWXYZ";
	for(var i=0; i<valid_letter.length; i++){
		if(l == valid_letter[i]){
			return true;
		}
	}
	return false;
}

function filterKeys(obj){
	var val = obj.value;

	var new_val = "";
	for(var i=0; i<val.length; i++){
		if(isValidLetter(val[i])){
			new_val += val[i];
		}
	}
	obj.value = new_val;
	return false;
}

function findTagsFromFunc(){
	console.log("TMP FN NAMES: " + tmp_fn_names);
	var tmp = "";
	var white_spaced = false;
	for(var i=0; i<tmp_fn_names.length; i++){
		if(isValidTagLetter(tmp_fn_names[i])){
			tmp += tmp_fn_names[i];
			white_spaced = false;
		}else{
			if(!white_spaced) {
				tmp += " ";
				white_spaced = true;
			}
		}
	}
	tmp = tmp.trim();
	var ytag = "y";
	var xtag = "";
	var all_tags = "";
	var count=0;
	var i=0;
	while(i<tmp.length){
		var word = "";
		while(i<tmp.length && tmp[i] != ' '){
			word += tmp[i++];
		}
		ytag += " " + word;
		xtag += " " + word;
		ytag = ytag.trim();
		xtag = xtag.trim();

		if(all_tags.length > 0){
			all_tags += ",";
		}
		all_tags += ytag + "," + xtag;
		if(count++ >= 7){
			break;
		}
		i++;
	}
	console.log(all_tags);
	return all_tags;
}

