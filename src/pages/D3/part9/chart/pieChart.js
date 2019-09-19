import * as d3 from "d3";

const pieChart = () => {
  const _chart = {};

  let _selector,
    _svg,
    _width = 500,
    _height = 500,
    _data,
    _colors = d3.scaleOrdinal(d3.schemeCategory10),
    _bodyG,
    _pieG,
    _radius = 200,
    _innerRadius = 100,
    _duration = 1000;

  _chart.renderTo = selector => {
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
    _chart.renderBody();
    return _chart;
  };

  _chart.renderBody = () => {
    if (!_bodyG) {
      _bodyG = _svg.append("g").attr("class", "body");
    }
    _chart.renderPie();
    return _chart;
  };

  _chart.renderPie = () => {
    const pie = d3
      .pie()
      .sort(d => d.id)
      .value(d => d.value);

    const arc = d3
      .arc()
      .outerRadius(_radius)
      .innerRadius(_innerRadius);

    if (!_pieG) {
      _pieG = _bodyG
        .append("g")
        .attr("class", "pie")
        .attr("transform", `translate(${_radius},${_radius})`);
    }
    _chart.data();
    _chart.renderSlices(pie, arc);
    _chart.renderLabels(pie, arc);
    return _chart;
  };

  _chart.data = data => {
    if (!data) {
      data = randomData();
    }
    _data = data;
    return _chart;
  };
  _chart.renderSlices = (pie, arc) => {
    const slices = _pieG.selectAll("path.arc").data(pie(_data));

    slices
      .enter()
      .append("path")
      .merge(slices)
      .attr("class", "arc")
      .attr("fill", (d, i) => _colors(i))
      .transition()
      .duration(_duration)
      .attrTween("d", function(d) {
        var currentArc = this.__current__;

        if (!currentArc) {
          currentArc = { startAngle: 0, endAngle: 0 };
        }

        const interpolate = d3.interpolate(currentArc, d);

        this.__current__ = interpolate(1);

        return function(t) {
          return arc(interpolate(t));
        };
      });
    return _chart;
  };

  _chart.renderLabels = (pie, arc) => {
    const labels = _pieG.selectAll("text.label").data(pie(_data));

    labels
      .enter()
      .append("text")
      .merge(labels)
      .attr("class", "label")
      .transition()
      .duration(_duration)
      .attr("transform", d => `translate(${arc.centroid(d)})`)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(d => d.data.id);
  };

  _chart.update = data => {
    _chart.renderPie();
  };
  return _chart;
};

const randomData = () => {
  return d3.range(6).map(i => ({
    id: i,
    value: Math.random() * 9 + 1
  }));
};
export default pieChart;
