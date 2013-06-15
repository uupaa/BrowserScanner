addEventListener("load", function() {
    Test().spec("WebGL",
                "http://www.khronos.org/registry/webgl/specs/latest/");
    Test().spec("Canvas",
                "http://www.w3.org/TR/2dcontext2/#canvasrenderingcontext2d");
    Test().spec("Canvas Path",
                "http://www.w3.org/TR/2dcontext2/#canvasrenderingcontext2d");

    var mapWebGL = {
            "Canvas#getContext('webgl')": false,
            "Canvas#getContext('experimental-webgl')": false
        };
    var mapCanvas = {
            "document.getCSSCanvasContext": !!document.getCSSCanvasContext,
            "window.HTMLCanvasElement": !!window.HTMLCanvasElement,
            "Canvas#getContext('2d')": !!window.CanvasRenderingContext2D,
            "Canvas#supportsContext()": false,
            "Canvas#setContext()": false,
            "Canvas#transferControlToProxy()": false,
            "Canvas#toDataURL()": false,
            "Canvas#toDataURLHD()": false,
            "Canvas#toBlob()": false,
            "Canvas#toBlobHD()": false,
            "CanvasRenderingContext2D#arc": false,
            "CanvasRenderingContext2D#arcTo": false,
            "CanvasRenderingContext2D#beginPath": false,
            "CanvasRenderingContext2D#bezierCurveTo": false,
            "CanvasRenderingContext2D#clearRect": false,
            "CanvasRenderingContext2D#clip": false,
            "CanvasRenderingContext2D#closePath": false,
            "CanvasRenderingContext2D#createImageData": false,
            "CanvasRenderingContext2D#createLinearGradient": false,
            "CanvasRenderingContext2D#createPattern": false,
            "CanvasRenderingContext2D#createRadialGradient": false,
            "CanvasRenderingContext2D#drawImage": false,
            "CanvasRenderingContext2D#fill": false,
            "CanvasRenderingContext2D#fillRect": false,
            "CanvasRenderingContext2D#fillText": false,
            "CanvasRenderingContext2D#getImageData": false,
            "CanvasRenderingContext2D#getImageDataHD": false,
            "CanvasRenderingContext2D#isPointInPath": false,
            "CanvasRenderingContext2D#lineTo": false,
            "CanvasRenderingContext2D#measureText": false,
            "CanvasRenderingContext2D#moveTo": false,
            "CanvasRenderingContext2D#putImageData": false,
            "CanvasRenderingContext2D#quadraticCurveTo": false,
            "CanvasRenderingContext2D#rect": false,
            "CanvasRenderingContext2D#restore": false,
            "CanvasRenderingContext2D#rotate": false,
            "CanvasRenderingContext2D#save": false,
            "CanvasRenderingContext2D#scale": false,
            "CanvasRenderingContext2D#setTransform": false,
            "CanvasRenderingContext2D#stroke": false,
            "CanvasRenderingContext2D#strokeRect": false,
            "CanvasRenderingContext2D#strokeText": false,
            "CanvasRenderingContext2D#transform": false,
            "CanvasRenderingContext2D#translate": false,
            "CanvasRenderingContext2D#canvas": false,
            "CanvasRenderingContext2D#fillStyle": false,
            "CanvasRenderingContext2D#font": false,
            "CanvasRenderingContext2D#globalAlpha": false,
            "CanvasRenderingContext2D#globalCompositeOperation": false,
            "CanvasRenderingContext2D#lineCap": false,
            "CanvasRenderingContext2D#lineJoin": false,
            "CanvasRenderingContext2D#lineWidth": false,
            "CanvasRenderingContext2D#miterLimit": false,
            "CanvasRenderingContext2D#shadowBlur": false,
            "CanvasRenderingContext2D#shadowColor": false,
            "CanvasRenderingContext2D#shadowOffsetX": false,
            "CanvasRenderingContext2D#shadowOffsetY": false,
            "CanvasRenderingContext2D#strokeStyle": false,
            "CanvasRenderingContext2D#textAlign": false,
            "CanvasRenderingContext2D#textBaseline": false,
            "CanvasRenderingContext2D#clearShadow": false,
            "CanvasRenderingContext2D#drawImageFromRect": false,
            "CanvasRenderingContext2D#setAlpha": false,
            "CanvasRenderingContext2D#setCompositeOperation": false,
            "CanvasRenderingContext2D#setLineWidth": false,
            "CanvasRenderingContext2D#setLineCap": false,
            "CanvasRenderingContext2D#setLineJoin": false,
            "CanvasRenderingContext2D#setMiterLimit": false,
            "CanvasRenderingContext2D#setStrokeColor": false,
            "CanvasRenderingContext2D#setFillColor": false,
            "CanvasRenderingContext2D#setShadow": false,
            "CanvasRenderingContext2D#lineDash": false,
            "CanvasRenderingContext2D#lineDashOffset": false,
            "CanvasRenderingContext2D#drawSystemFocusRing": false,
            "CanvasRenderingContext2D#drawCustomFocusRing": false,
            "CanvasRenderingContext2D#isPointInStroke": false,
            "CanvasRenderingContext2D#scrollPathIntoView": false,
            "CanvasRenderingContext2D#fill(Path)": false,
            "CanvasRenderingContext2D#ellipse": false,
            "CanvasRenderingContext2D#imageSmoothingEnabled": false,
            "CanvasRenderingContext2D#addHitRegion": false,
            "CanvasRenderingContext2D#removeHitRegion": false,
            "CanvasRenderingContext2D#setLineDash": false,
            "CanvasRenderingContext2D#getLineDash": false,
            "CanvasRenderingContext2D#lineDashOffset": false,
            "TextMetrics#actualBoundingBoxLeft": false,
            "TextMetrics#actualBoundingBoxRight": false,
            "TextMetrics#fontBoundingBoxAscent": false,
            "TextMetrics#fontBoundingBoxDescent": false,
            "TextMetrics#actualBoundingBoxAscent": false,
            "TextMetrics#actualBoundingBoxDescent": false,
            "TextMetrics#emHeightAscent": false,
            "TextMetrics#emHeightDescent": false,
            "TextMetrics#hangingBaseline": false,
            "TextMetrics#alphabeticBaseline": false,
            "TextMetrics#ideographicBaseline": false
        };
    var mapCanvasPath = {
            "window.Path": false,
            "Path#addPath": false,
            "Path#addText": false,
            "Path#addPathByStrokingPath": false,
            "Path#addPathByStrokingText": false
        };

    if (window.HTMLCanvasElement) {
        var canvas  = document.createElement("canvas");
        var ctx     = canvas.getContext("2d");

        mix(mapWebGL, {
            "Canvas#getContext('webgl')": !!canvas.getContext('webgl'),
            "Canvas#getContext('experimental-webgl')": !!canvas.getContext('experimental-webgl')
        });
        mix(mapCanvas, {
            "Canvas#supportsContext()": !!canvas.supportsContext,
            "Canvas#setContext()": !!canvas.setContext,
            "Canvas#transferControlToProxy()": !!canvas.transferControlToProxy,
            "Canvas#toDataURL()": !!canvas.toDataURL,
            "Canvas#toDataURLHD()": !!canvas.toDataURLHD,
            "Canvas#toBlob()": !!canvas.toBlob,
            "Canvas#toBlobHD()": !!canvas.toBlobHD,
            "CanvasRenderingContext2D#arc": !!ctx.arc,
            "CanvasRenderingContext2D#arcTo": !!ctx.arcTo,
            "CanvasRenderingContext2D#beginPath": !!ctx.beginPath,
            "CanvasRenderingContext2D#bezierCurveTo": !!ctx.bezierCurveTo,
            "CanvasRenderingContext2D#clearRect": !!ctx.clearRect,
            "CanvasRenderingContext2D#clip": !!ctx.clip,
            "CanvasRenderingContext2D#closePath": !!ctx.closePath,
            "CanvasRenderingContext2D#createImageData": !!ctx.createImageData,
            "CanvasRenderingContext2D#createLinearGradient": !!ctx.createLinearGradient,
            "CanvasRenderingContext2D#createPattern": !!ctx.createPattern,
            "CanvasRenderingContext2D#createRadialGradient": !!ctx.createRadialGradient,
            "CanvasRenderingContext2D#drawImage": !!ctx.drawImage,
            "CanvasRenderingContext2D#fill": !!ctx.fill,
            "CanvasRenderingContext2D#fillRect": !!ctx.fillRect,
            "CanvasRenderingContext2D#fillText": !!ctx.fillText,
            "CanvasRenderingContext2D#getImageData": !!ctx.getImageData,
            "CanvasRenderingContext2D#getImageDataHD": !!ctx.getImageDataHD,
            "CanvasRenderingContext2D#isPointInPath": !!ctx.isPointInPath,
            "CanvasRenderingContext2D#lineTo": !!ctx.lineTo,
            "CanvasRenderingContext2D#measureText": !!ctx.measureText,
            "CanvasRenderingContext2D#moveTo": !!ctx.moveTo,
            "CanvasRenderingContext2D#putImageData": !!ctx.putImageData,
            "CanvasRenderingContext2D#quadraticCurveTo": !!ctx.quadraticCurveTo,
            "CanvasRenderingContext2D#rect": !!ctx.rect,
            "CanvasRenderingContext2D#restore": !!ctx.restore,
            "CanvasRenderingContext2D#rotate": !!ctx.rotate,
            "CanvasRenderingContext2D#save": !!ctx.save,
            "CanvasRenderingContext2D#scale": !!ctx.scale,
            "CanvasRenderingContext2D#setTransform": !!ctx.setTransform,
            "CanvasRenderingContext2D#stroke": !!ctx.stroke,
            "CanvasRenderingContext2D#strokeRect": !!ctx.strokeRect,
            "CanvasRenderingContext2D#strokeText": !!ctx.strokeText,
            "CanvasRenderingContext2D#transform": !!ctx.transform,
            "CanvasRenderingContext2D#translate": !!ctx.translate,
            "CanvasRenderingContext2D#canvas": !!ctx.canvas,
            "CanvasRenderingContext2D#fillStyle": !!ctx.fillStyle,
            "CanvasRenderingContext2D#font": !!ctx.font,
            "CanvasRenderingContext2D#globalAlpha": !!ctx.globalAlpha,
            "CanvasRenderingContext2D#globalCompositeOperation": !!ctx.globalCompositeOperation,
            "CanvasRenderingContext2D#lineCap": !!ctx.lineCap,
            "CanvasRenderingContext2D#lineJoin": !!ctx.lineJoin,
            "CanvasRenderingContext2D#lineWidth": !!ctx.lineWidth,
            "CanvasRenderingContext2D#miterLimit": !!ctx.miterLimit,
            "CanvasRenderingContext2D#shadowBlur": "shadowBlur" in ctx,
            "CanvasRenderingContext2D#shadowColor": !!ctx.shadowColor,
            "CanvasRenderingContext2D#shadowOffsetX": "shadowOffsetX" in ctx,
            "CanvasRenderingContext2D#shadowOffsetY": "shadowOffsetY" in ctx,
            "CanvasRenderingContext2D#strokeStyle": !!ctx.strokeStyle,
            "CanvasRenderingContext2D#textAlign": !!ctx.textAlign,
            "CanvasRenderingContext2D#textBaseline": "textBaseline" in ctx,
            "CanvasRenderingContext2D#clearShadow": !!ctx.clearShadow,
            "CanvasRenderingContext2D#drawImageFromRect": !!ctx.drawImageFromRect,
            "CanvasRenderingContext2D#setAlpha": !!ctx.setAlpha,
            "CanvasRenderingContext2D#setCompositeOperation": !!ctx.setCompositeOperation,
            "CanvasRenderingContext2D#setLineWidth": !!ctx.setLineWidth,
            "CanvasRenderingContext2D#setLineCap": !!ctx.setLineCap,
            "CanvasRenderingContext2D#setLineJoin": !!ctx.setLineJoin,
            "CanvasRenderingContext2D#setMiterLimit": !!ctx.setMiterLimit,
            "CanvasRenderingContext2D#setStrokeColor": !!ctx.setStrokeColor,
            "CanvasRenderingContext2D#setFillColor": !!ctx.setFillColor,
            "CanvasRenderingContext2D#setShadow": !!ctx.setShadow,
            "CanvasRenderingContext2D#lineDash": ctx.lineDash ? true : ctx.webkitLineDash ? "webkitLineDash" : false,
            "CanvasRenderingContext2D#lineDashOffset": ctx.lineDashOffset ? true : ctx.webkitLineDashOffset ? "webkitLineDashOffset" : false,
            "CanvasRenderingContext2D#drawSystemFocusRing": !!ctx.drawSystemFocusRing,
            "CanvasRenderingContext2D#drawCustomFocusRing": !!ctx.drawCustomFocusRing,
            "CanvasRenderingContext2D#isPointInStroke": !!ctx.isPointInStroke,
            "CanvasRenderingContext2D#scrollPathIntoView": !!ctx.scrollPathIntoView,
            "CanvasRenderingContext2D#fill(Path)": !!(ctx.fill && window.Path),
            "CanvasRenderingContext2D#ellipse": !!ctx.ellipse,
            "CanvasRenderingContext2D#imageSmoothingEnabled": !!ctx.imageSmoothingEnabled,
            "CanvasRenderingContext2D#addHitRegion": !!ctx.addHitRegion,
            "CanvasRenderingContext2D#removeHitRegion": !!ctx.removeHitRegion,
            "CanvasRenderingContext2D#setLineDash": !!ctx.setLineDash,
            "CanvasRenderingContext2D#getLineDash": !!ctx.getLineDash,
            "CanvasRenderingContext2D#lineDashOffset": !!ctx.lineDashOffset
        });
        if (ctx.measureText) {
            var metrics = ctx.measureText("WOW");
            mix(mapCanvas, {
                "TextMetrics#actualBoundingBoxLeft": !!ctx.actualBoundingBoxLeft,
                "TextMetrics#actualBoundingBoxRight": !!ctx.actualBoundingBoxRight,
                "TextMetrics#fontBoundingBoxAscent": !!ctx.fontBoundingBoxAscent,
                "TextMetrics#fontBoundingBoxDescent": !!ctx.fontBoundingBoxDescent,
                "TextMetrics#actualBoundingBoxAscent": !!ctx.actualBoundingBoxAscent,
                "TextMetrics#actualBoundingBoxDescent": !!ctx.actualBoundingBoxDescent,
                "TextMetrics#emHeightAscent": !!ctx.emHeightAscent,
                "TextMetrics#emHeightDescent": !!ctx.emHeightDescent,
                "TextMetrics#hangingBaseline": !!ctx.hangingBaseline,
                "TextMetrics#alphabeticBaseline": !!ctx.alphabeticBaseline,
                "TextMetrics#ideographicBaseline": !!ctx.ideographicBaseline
            });
        }
        if (window.Path) {
            var path = new Path();
            mix(mapCanvasPath, {
                "window.Path": !!window.Path,
                "Path#addPath": !!path.addPath,
                "Path#addText": !!path.addText,
                "Path#addPathByStrokingPath": !!path.addPathByStrokingPath,
                "Path#addPathByStrokingText": !!path.addPathByStrokingText
            });
        }
    }

    for (var id in mapWebGL) {
        Test().add({ Category: "Canvas", Class: "WebGL", id: id, state: mapWebGL[id] });
    }
    for (var id in mapCanvas) {
        Test().add({ Category: "Canvas", Class: "Canvas 2D", id: id, state: mapCanvas[id] });
    }
    for (var id in mapCanvasPath) {
        Test().add({ Category: "Canvas", Class: "Canvas 2D Path", id: id, state: mapCanvasPath[id] });
    }
    View().update();

    function mix(base, extend) {
        for (var key in extend) { base[key] = extend[key]; }
        return base;
    }
});

