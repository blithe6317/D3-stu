function createSimpleSVGWithPath() {
  var xmlns = "http://www.w3.org/2000/svg";
  var svgElem = document.createElementNS(xmlns, "svg");
  svgElem.setAttributeNS(null, "width", 100);
  svgElem.setAttributeNS(null, "height", 100);
  svgElem.innerHTML = '<path d="M5,5 C5,45 45,45 45,5" />';
  return svgElem;
}

function isGetTotalLengthSupported(el) {
  try {
    var svgElem = createSimpleSVGWithPath();
    svgElem.children[0].getTotalLength();
    return true;
  } catch (err) {
    // getTotalLength() API is not supported
  }
  return false;
}

if (!isGetTotalLengthSupported()) {
  var svgProto = SVGPathElement.prototype;

  svgProto.getTotalLength = function() {
    var d = this.getAttribute("d");
    if (d) {
      try {
        var p = pathProperties(d);
        return p.getTotalLength();
      } catch (err) {}
    }
    return 0;
  };

  svgProto.getPointAtLength = function(fractionLength) {
    var d = this.getAttribute("d");
    if (d) {
      try {
        var p = pathProperties(d);
        return p.getPointAtLength(fractionLength);
      } catch (err) {}
    }
    return { x: 0, y: 0 };
  };

  svgProto.getTangentAtLength = function(fractionLength) {
    var d = this.getAttribute("d");
    if (d) {
      try {
        var p = pathProperties(d);
        return p.getTangentAtLength(fractionLength);
      } catch (err) {}
    }
    return { x: 0, y: 0 };
  };
}

var length = { a: 7, c: 6, h: 1, l: 2, m: 2, q: 4, s: 4, t: 2, v: 1, z: 0 };
var segment = /([astvzqmhlc])([^astvzqmhlc]*)/gi;

function parse(path) {
  var data = [];
  path.replace(segment, function(_, command, args) {
    var type = command.toLowerCase();
    args = parseValues(args);

    // overloaded moveTo
    if (type === "m" && args.length > 2) {
      data.push([command].concat(args.splice(0, 2)));
      type = "l";
      command = command === "m" ? "l" : "L";
    }

    while (args.length >= 0) {
      if (args.length === length[type]) {
        args.unshift(command);
        return data.push(args);
      }
      if (args.length < length[type]) {
        throw new Error("malformed path data");
      }
      data.push([command].concat(args.splice(0, length[type])));
    }
  });
  return data;
}

var number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/gi;

function parseValues(args) {
  var numbers = args.match(number);
  return numbers ? numbers.map(Number) : [];
}

function Arc(x0, y0, rx, ry, xAxisRotate, LargeArcFlag, SweepFlag, x, y) {
  return new Arc$1(x0, y0, rx, ry, xAxisRotate, LargeArcFlag, SweepFlag, x, y);
}

function Arc$1(x0, y0, rx, ry, xAxisRotate, LargeArcFlag, SweepFlag, x1, y1) {
  this.x0 = x0;
  this.y0 = y0;
  this.rx = rx;
  this.ry = ry;
  this.xAxisRotate = xAxisRotate;
  this.LargeArcFlag = LargeArcFlag;
  this.SweepFlag = SweepFlag;
  this.x1 = x1;
  this.y1 = y1;

  var lengthProperties = approximateArcLengthOfCurve(300, function(t) {
    return pointOnEllipticalArc(
      { x: x0, y: y0 },
      rx,
      ry,
      xAxisRotate,
      LargeArcFlag,
      SweepFlag,
      { x: x1, y: y1 },
      t
    );
  });

  this.length = lengthProperties.arcLength;
}

Arc$1.prototype = {
  constructor: Arc$1,
  init: function() {},

  getTotalLength: function() {
    return this.length;
  },
  getPointAtLength: function(fractionLength) {
    if (fractionLength < 0) {
      fractionLength = 0;
    } else if (fractionLength > this.length) {
      fractionLength = this.length;
    }

    var position = pointOnEllipticalArc(
      { x: this.x0, y: this.y0 },
      this.rx,
      this.ry,
      this.xAxisRotate,
      this.LargeArcFlag,
      this.SweepFlag,
      { x: this.x1, y: this.y1 },
      fractionLength / this.length
    );

    return { x: position.x, y: position.y };
  },
  getTangentAtLength: function(fractionLength) {
    if (fractionLength < 0) {
      fractionLength = 0;
    } else if (fractionLength > this.length) {
      fractionLength = this.length;
    }
    var position = pointOnEllipticalArc(
      { x: this.x0, y: this.y0 },
      this.rx,
      this.ry,
      this.xAxisRotate,
      this.LargeArcFlag,
      this.SweepFlag,
      { x: this.x1, y: this.y1 },
      fractionLength / this.length
    );

    return { x: position.x, y: position.y };
  },
  getPropertiesAtLength: function(fractionLength) {
    var tangent = this.getTangentAtLength(fractionLength);
    var point = this.getPointAtLength(fractionLength);
    return { x: point.x, y: point.y, tangentX: tangent.x, tangentY: tangent.y };
  }
};

function pointOnEllipticalArc(
  p0,
  rx,
  ry,
  xAxisRotation,
  largeArcFlag,
  sweepFlag,
  p1,
  t
) {
  rx = Math.abs(rx);
  ry = Math.abs(ry);
  xAxisRotation = mod(xAxisRotation, 360);
  var xAxisRotationRadians = toRadians(xAxisRotation);
  if (p0.x === p1.x && p0.y === p1.y) {
    return p0;
  }

  if (rx === 0 || ry === 0) {
    return this.pointOnLine(p0, p1, t);
  }

  var dx = (p0.x - p1.x) / 2;
  var dy = (p0.y - p1.y) / 2;
  var transformedPoint = {
    x:
      Math.cos(xAxisRotationRadians) * dx + Math.sin(xAxisRotationRadians) * dy,
    y:
      -Math.sin(xAxisRotationRadians) * dx + Math.cos(xAxisRotationRadians) * dy
  };
  var radiiCheck =
    Math.pow(transformedPoint.x, 2) / Math.pow(rx, 2) +
    Math.pow(transformedPoint.y, 2) / Math.pow(ry, 2);
  if (radiiCheck > 1) {
    rx = Math.sqrt(radiiCheck) * rx;
    ry = Math.sqrt(radiiCheck) * ry;
  }

  var cSquareNumerator =
    Math.pow(rx, 2) * Math.pow(ry, 2) -
    Math.pow(rx, 2) * Math.pow(transformedPoint.y, 2) -
    Math.pow(ry, 2) * Math.pow(transformedPoint.x, 2);
  var cSquareRootDenom =
    Math.pow(rx, 2) * Math.pow(transformedPoint.y, 2) +
    Math.pow(ry, 2) * Math.pow(transformedPoint.x, 2);
  var cRadicand = cSquareNumerator / cSquareRootDenom;
  cRadicand = cRadicand < 0 ? 0 : cRadicand;
  var cCoef = (largeArcFlag !== sweepFlag ? 1 : -1) * Math.sqrt(cRadicand);
  var transformedCenter = {
    x: cCoef * ((rx * transformedPoint.y) / ry),
    y: cCoef * (-(ry * transformedPoint.x) / rx)
  };

  var center = {
    x:
      Math.cos(xAxisRotationRadians) * transformedCenter.x -
      Math.sin(xAxisRotationRadians) * transformedCenter.y +
      (p0.x + p1.x) / 2,
    y:
      Math.sin(xAxisRotationRadians) * transformedCenter.x +
      Math.cos(xAxisRotationRadians) * transformedCenter.y +
      (p0.y + p1.y) / 2
  };

  var startVector = {
    x: (transformedPoint.x - transformedCenter.x) / rx,
    y: (transformedPoint.y - transformedCenter.y) / ry
  };
  var startAngle = angleBetween(
    {
      x: 1,
      y: 0
    },
    startVector
  );

  var endVector = {
    x: (-transformedPoint.x - transformedCenter.x) / rx,
    y: (-transformedPoint.y - transformedCenter.y) / ry
  };
  var sweepAngle = angleBetween(startVector, endVector);

  if (!sweepFlag && sweepAngle > 0) {
    sweepAngle -= 2 * Math.PI;
  } else if (sweepFlag && sweepAngle < 0) {
    sweepAngle += 2 * Math.PI;
  }
  sweepAngle %= 2 * Math.PI;

  var angle = startAngle + sweepAngle * t;
  var ellipseComponentX = rx * Math.cos(angle);
  var ellipseComponentY = ry * Math.sin(angle);

  var point = {
    x:
      Math.cos(xAxisRotationRadians) * ellipseComponentX -
      Math.sin(xAxisRotationRadians) * ellipseComponentY +
      center.x,
    y:
      Math.sin(xAxisRotationRadians) * ellipseComponentX +
      Math.cos(xAxisRotationRadians) * ellipseComponentY +
      center.y
  };

  point.ellipticalArcStartAngle = startAngle;
  point.ellipticalArcEndAngle = startAngle + sweepAngle;
  point.ellipticalArcAngle = angle;

  point.ellipticalArcCenter = center;
  point.resultantRx = rx;
  point.resultantRy = ry;

  return point;
}

function approximateArcLengthOfCurve(resolution, pointOnCurveFunc) {
  resolution = resolution ? resolution : 500;

  var resultantArcLength = 0;
  var arcLengthMap = [];
  var approximationLines = [];

  var prevPoint = pointOnCurveFunc(0);
  var nextPoint;
  for (var i = 0; i < resolution; i++) {
    var t = clamp(i * (1 / resolution), 0, 1);
    nextPoint = pointOnCurveFunc(t);
    resultantArcLength += distance(prevPoint, nextPoint);
    approximationLines.push([prevPoint, nextPoint]);

    arcLengthMap.push({
      t: t,
      arcLength: resultantArcLength
    });

    prevPoint = nextPoint;
  }
  nextPoint = pointOnCurveFunc(1);
  approximationLines.push([prevPoint, nextPoint]);
  resultantArcLength += distance(prevPoint, nextPoint);
  arcLengthMap.push({
    t: 1,
    arcLength: resultantArcLength
  });

  return {
    arcLength: resultantArcLength,
    arcLengthMap: arcLengthMap,
    approximationLines: approximationLines
  };
}

function mod(x, m) {
  return ((x % m) + m) % m;
}

function toRadians(angle) {
  return angle * (Math.PI / 180);
}

function distance(p0, p1) {
  return Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));
}

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function angleBetween(v0, v1) {
  var p = v0.x * v1.x + v0.y * v1.y;
  var n = Math.sqrt(
    (Math.pow(v0.x, 2) + Math.pow(v0.y, 2)) *
      (Math.pow(v1.x, 2) + Math.pow(v1.y, 2))
  );
  var sign = v0.x * v1.y - v0.y * v1.x < 0 ? -1 : 1;
  var angle = sign * Math.acos(p / n);

  return angle;
}

function pathProperties(svgString) {
  var length = 0;
  var partial_lengths = [];
  var functions = [];

  function svgProperties(string) {
    if (!string) {
      return null;
    }
    var parsed = parse(string);
    var cur = [0, 0];
    var curve;
    var ringStart;
    for (var i = 0; i < parsed.length; i++) {
      //moveTo
      if (parsed[i][0] === "M") {
        cur = [parsed[i][1], parsed[i][2]];
        ringStart = [cur[0], cur[1]];
        functions.push(null);
      } else if (parsed[i][0] === "m") {
        cur = [parsed[i][1] + cur[0], parsed[i][2] + cur[1]];
        ringStart = [cur[0], cur[1]];
        functions.push(null);
      } else if (parsed[i][0] === "A") {
        curve = new Arc(
          cur[0],
          cur[1],
          parsed[i][1],
          parsed[i][2],
          parsed[i][3],
          parsed[i][4],
          parsed[i][5],
          parsed[i][6],
          parsed[i][7]
        );

        length = length + curve.getTotalLength();
        cur = [parsed[i][6], parsed[i][7]];
        functions.push(curve);
      } else if (parsed[i][0] === "a") {
        curve = new Arc(
          cur[0],
          cur[1],
          parsed[i][1],
          parsed[i][2],
          parsed[i][3],
          parsed[i][4],
          parsed[i][5],
          cur[0] + parsed[i][6],
          cur[1] + parsed[i][7]
        );

        length = length + curve.getTotalLength();
        cur = [cur[0] + parsed[i][6], cur[1] + parsed[i][7]];
        functions.push(curve);
      }
      partial_lengths.push(length);
    }
    return svgProperties;
  }

  svgProperties.getTotalLength = function() {
    return length;
  };

  svgProperties.getPointAtLength = function(fractionLength) {
    var fractionPart = getPartAtLength(fractionLength);
    return functions[fractionPart.i].getPointAtLength(fractionPart.fraction);
  };

  svgProperties.getTangentAtLength = function(fractionLength) {
    var fractionPart = getPartAtLength(fractionLength);
    return functions[fractionPart.i].getTangentAtLength(fractionPart.fraction);
  };

  svgProperties.getPropertiesAtLength = function(fractionLength) {
    var fractionPart = getPartAtLength(fractionLength);
    return functions[fractionPart.i].getPropertiesAtLength(
      fractionPart.fraction
    );
  };

  svgProperties.getParts = function() {
    var parts = [];
    for (var i = 0; i < functions.length; i++) {
      if (functions[i] != null) {
        var properties = {};
        properties["start"] = functions[i].getPointAtLength(0);
        properties["end"] = functions[i].getPointAtLength(
          partial_lengths[i] - partial_lengths[i - 1]
        );
        properties["length"] = partial_lengths[i] - partial_lengths[i - 1];
        (function(func) {
          properties["getPointAtLength"] = function(d) {
            return func.getPointAtLength(d);
          };
          properties["getTangentAtLength"] = function(d) {
            return func.getTangentAtLength(d);
          };
          properties["getPropertiesAtLength"] = function(d) {
            return func.getPropertiesAtLength(d);
          };
        })(functions[i]);

        parts.push(properties);
      }
    }

    return parts;
  };

  var getPartAtLength = function(fractionLength) {
    if (fractionLength < 0) {
      fractionLength = 0;
    } else if (fractionLength > length) {
      fractionLength = length;
    }

    var i = partial_lengths.length - 1;

    while (partial_lengths[i] >= fractionLength && partial_lengths[i] > 0) {
      i--;
    }
    i++;
    return { fraction: fractionLength - partial_lengths[i - 1], i: i };
  };

  return svgProperties(svgString);
}
