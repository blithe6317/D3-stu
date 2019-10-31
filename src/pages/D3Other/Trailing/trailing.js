import * as d3 from "d3";

import pathPolyfill from "./svg-path-polyfill";

const trailing = () => {
  const _chart = {};
  let _width = 1000,
    _height = 800,
    _margin = { top: 30, bottom: 30, right: 30, left: 30 },
    _svg,
    _bodyG,
    _speed = 5000,
    _data,
    _x = d3
      .scaleLinear()
      .range([_margin.left, _width - _margin.right - _margin.left])
      .domain([0, 10]),
    _y = d3
      .scaleLinear()
      .range([_height - _margin.top - _margin.bottom, _margin.bottom])
      .domain([0, 10]),
    _colors = d3.scaleOrdinal(d3.schemeCategory10);

  _chart.data = d => {
    if (d === undefined) {
      return _data;
    }
    _data = d;
    return _chart;
  };

  _chart.render = selector => {
    window.d3 = d3;
    if (!_svg) {
      _svg = d3
        .select(selector)
        .append("svg")
        .attr("class", "trailing")
        .attr("width", _width)
        .attr("height", _height);
    }

    renderAxes(_svg);
    renderDots(_svg);
  };

  function renderAxes(svg) {
    const xScale = d3.axisBottom().scale(_x);
    const yScale = d3.axisLeft().scale(_y);

    const g = svg.append("g").attr("class", "axes");

    g.append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${_height - _margin.top})`)
      .call(xScale);
    g.selectAll("g.x-axis g.tick").each(function(index) {
      if (index !== 0) {
        d3.select(this)
          .append("line")
          .attr("class", "grid-line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", 0)
          .attr("y2", -(_height - _margin.bottom - _margin.top * 2));
      }
    });

    g.append("g")
      .attr("class", "y-axis")
      .attr("transform", `translate(${_margin.left},${_margin.top})`)
      .call(yScale);
    g.selectAll("g.y-axis g.tick").each(function(index) {
      if (index !== 0) {
        d3.select(this)
          .append("line")
          .attr("class", "grid-line")
          .attr("x1", 0)
          .attr("y1", 0)
          .attr("x2", _width - _margin.right - _margin.top * 2)
          .attr("y2", 0);
      }
    });
  }
  function renderDots(svg) {
    _data.forEach((item, index) => {
      const start = { x: _x(item[0].x), y: _y(item[0].y) };
      const end = { x: _x(item[1].x), y: _y(item[1].y) };
      const g = svg.append("g").attr("class", "dots");

      const minR = 3;

      const path = g
        .append("path")
        .attr("class", "path")
        .attr("d", getEllipsePath(start, end))
        .attr("fill", "none")
        .attr("stroke", "#f97a00");

      pathAnimation(path);

      const dotG = g
        .selectAll("g.dots")
        .data(item)
        .enter()
        .append("g")
        .attr("class", "dot");

      const point = dotG
        .append("circle")
        .attr("class", "dot")
        .attr("cx", d => _x(d.x))
        .attr("cy", d => _y(d.y))
        .style("fill", "#f97a00")
        .style("stroke", "none")
        .attr("r", 4.5);

      const dot = dotG
        .append("circle")
        .attr("class", "dotout")
        .attr("cx", d => _x(d.x))
        .attr("cy", d => _y(d.y))
        .style("fill", "none")
        .style("stroke", "#f97a00")
        .style("stroke-width", 3)
        .attr("r", minR);

      const dot1 = dotG
        .append("circle")
        .attr("class", "dotout1")
        .attr("cx", d => _x(d.x))
        .attr("cy", d => _y(d.y))
        .style("fill", "none")
        .style("stroke", "#f97a00")
        .style("stroke-width", 3)
        .attr("r", minR);

      const dot2 = dotG
        .append("circle")
        .attr("class", "dotout2")
        .attr("cx", d => _x(d.x))
        .attr("cy", d => _y(d.y))
        .style("fill", "none")
        .style("stroke", "#f97a00")
        .style("stroke-width", 3)
        .attr("r", minR);

      const maxTime = 50;
      let count = 0;
      let count1 = -maxTime / 3;
      let count2 = (-maxTime / 3) * 2;
      const maxR = 18;
      const scaleR = d3
        .scaleLinear()
        .range([minR, maxR])
        .domain([0, maxTime]);

      const scaleW = d3
        .scaleLinear()
        .range([3, 0.1])
        .domain([0, maxTime]);

      const scaleO = d3
        .scaleLinear()
        .range([1, 0])
        .domain([0, maxTime]);

      const dotAnimation = () => {
        if (count >= maxTime) {
          count = 0;
        }
        if (count1 >= maxTime) {
          count1 = 0;
        }
        if (count2 >= maxTime) {
          count2 = 0;
        }
        dot
          .attr("r", scaleR(count))
          .style("stroke-width", scaleW(count))
          .style("stroke-opacity", scaleO(count));
        if (count1 >= 0) {
          dot1
            .attr("r", scaleR(count1))
            .style("stroke-width", scaleW(count1))
            .style("stroke-opacity", scaleO(count1));
        }
        if (count2 >= 0) {
          dot2
            .attr("r", scaleR(count2))
            .style("stroke-width", scaleW(count2))
            .style("stroke-opacity", scaleO(count2));
        }
        count++;
        count1++;
        count2++;
      };

      const timer = d3.timer(dotAnimation, 60);

      dotG
        .on("mouseover", function() {
          timer.stop();
          dotG.style("background-color", "rgba(0,0,0,0.3)");
          point.style("fill", "#fff");
          dot.style("stroke", "#fff");
          dot1.style("stroke", "#fff");
          dot2.style("stroke", "#fff");
        })
        .on("mouseout", function() {
          timer.restart(dotAnimation, 60);
          dotG.style("background-color", "rgba(0,0,0,0)");
          point.style("fill", "#f97a00");
          dot.style("stroke", "#f97a00");
          dot1.style("stroke", "#f97a00");
          dot2.style("stroke", "#f97a00");
        });
    });
  }

  const pathAnimation = path => {
    const maxRadius = 2;
    const minRadius = 0.5;
    const circleCount = 20;
    const node = path.node();
    var totalLen = node.getTotalLength();

    const pointData = getPathData(path);
    const g = d3
      .select(path.node().parentNode)
      .append("g")
      .attr("class", "path-animation");

    var scale = d3
      .scaleLinear()
      .range([minRadius, maxRadius])
      .domain([0, circleCount - 1]);

    const points = g
      .selectAll("circle")
      .data(d3.range(circleCount).reverse())
      .enter()
      .append("circle")
      .style("fill", "#fff")
      .style(
        "stroke",
        (_, i) => `rgba(255,255,255,${(1 / circleCount) * circleCount - i})`
      )
      .attr("cx", d => pointData[0].x)
      .attr("cy", d => pointData[0].y)
      .attr("r", d => {
        return scale(d);
      });

    animation();

    function animation() {
      points
        .transition()
        .delay(function(_, i) {
          return i * 13;
        })
        .duration(totalLen * 5)
        .ease(d3.easeLinear)
        .attrTween("cx", () => attrTween("x"))
        .attrTween("cy", () => attrTween("y"))
        .on("end", function() {
          d3.select(this)
            .attr("cx", d => pointData[0].x)
            .attr("cy", d => pointData[0].y);
          animation();
        });
    }

    function attrTween(type) {
      var interpolate = d3
        .scaleQuantize()
        .domain([0, 1])
        .range(pointData);

      return function(t) {
        const data = interpolate(t);
        return data[type];
      };
    }
  };

  const getEllipsePath = (start, end) => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const dr = Math.sqrt(dx * dx + dy * dy);

    return `M ${start.x} ${start.y} A ${dr} ${dr} 0 0 1 ${end.x} ${end.y}`;
  };

  const getPathData = path => {
    const node = path.node();
    const nextLen = 1;
    var totalLen = node.getTotalLength();

    const len = Math.ceil(totalLen / nextLen) + 1;
    return d3.range(len).map(i => {
      var l = i * nextLen;
      if (l >= totalLen) {
        l = totalLen;
      }
      return node.getPointAtLength(l);
    });
  };
  return _chart;
};

export default trailing;
