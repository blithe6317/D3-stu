import * as d3 from "d3";

const pack = () => {
  const _chart = {};

  var _width = 1200,
    _height = 800,
    _selector,
    _svg,
    _nodes,
    _bodyG,
    _valueAccessor;

  _chart.render = selector => {
    if (selector) {
      _selector = selector;
    }
    if (!_svg) {
      _svg = d3
        .select(_selector)
        .append("svg")
        .attr("height", _height)
        .attr("width", _width);
    }

    renderBody(_svg);
  };

  const renderBody = svg => {
    if (!_bodyG) {
      _bodyG = svg.append("g").attr("class", "body");
    }

    var pack = d3.pack().size([_width, _height]);

    var root = d3
      .hierarchy(_nodes)
      .sum(_valueAccessor)
      .sort((a, b) => b.value - a.value);

    pack(root);

    renderCircles(root.descendants());
    renderLabels(root.descendants());
  };

  const renderCircles = nodes => {
    var circles = _bodyG.selectAll("circle").data(nodes);

    circles
      .enter()
      .append("circle")
      .merge(circles)
      .transition()
      .attr("class", d => (d.children ? "parent" : "child"))
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", d => d.r);

    circles
      .exit()
      .transition()
      .attr("r", 0)
      .remove();
  };

  const renderLabels = nodes => {
    var labels = _bodyG.selectAll("text").data(nodes);

    labels
      .enter()
      .append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .merge(labels)
      .transition()
      .attr("class", d => (d.children ? "parent" : "child"))
      .attr("x", d => d.x)
      .attr("y", d => d.y)
      .text(d => d.data.name);

    labels.exit().remove();
  };

  _chart.width = w => {
    if (w === undefined) {
      return _width;
    }
    _width = w;
    return _chart;
  };

  _chart.height = h => {
    if (h === undefined) {
      return _height;
    }
    _height = h;
    return _chart;
  };

  _chart.nodes = n => {
    if (n === undefined) {
      return _nodes;
    }
    _nodes = n;
    return _chart;
  };

  _chart.valueAccessor = v => {
    if (v === undefined) {
      return _valueAccessor;
    }
    _valueAccessor = v;
    return _chart;
  };

  return _chart;
};

export default pack;
