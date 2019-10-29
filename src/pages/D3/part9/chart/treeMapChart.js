import * as d3 from "d3";

const treeMapChart = () => {
  const _chart = {};

  let _width = 1600,
    _height = 800,
    _colors = d3.scaleOrdinal(d3.schemeCategory20c),
    _svg,
    _selector,
    _nodes,
    _valueAccessor,
    _treemap,
    _bodyG;

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

    renderBody();
  };

  const renderBody = () => {
    if (!_bodyG) {
      _bodyG = _svg.append("g").attr("class", "body");

      _treemap = d3
        .treemap()
        .size([_width, _height])
        .round(true)
        .padding(1);
    }

    const root = d3
      .hierarchy(_nodes)
      .sum(_valueAccessor)
      .sort((a, b) => b.value - a.value);

    _treemap(root);

    var cells = _bodyG.selectAll("g").data(root.leaves(), d => {
      return d.data.name;
    });

    renderCells(cells);
  };

  const renderCells = cells => {
    const cellEnter = cells
      .enter()
      .append("g")
      .merge(cells)
      .attr("class", "cell")
      .attr("transform", d => `translate(${d.x0},${d.y0})`);

    renderRect(cellEnter, cells);
    renderText(cellEnter, cells);

    cells.exit().remove();
  };

  const renderRect = (cellEnter, cells) => {
    cellEnter.append("rect");

    cellEnter
      .merge(cells)
      .transition()
      .select("rect")
      .attr("width", d => d.x1 - d.x0)
      .attr("height", d => d.y1 - d.y0)
      .style("fill", d => {
        return _colors(d.parent.data.name);
      });
  };

  const renderText = (cellEnter, cells) => {
    cellEnter.append("text");

    cellEnter
      .merge(cells)
      .select("text")
      .style("font-size", 11)
      .attr("x", d => (d.x1 - d.x0) / 2)
      .attr("y", d => (d.y1 - d.y0) / 2)
      .attr("text-anchor", "middle")
      .text(d => d.data.name)
      .style("opacity", function(d) {
        d.w = this.getComputedTextLength();
        return d.w < d.x1 - d.x0 ? 1 : 0;
      });
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

  _chart.colors = c => {
    if (c === undefined) {
      return _colors;
    }
    _colors = c;
    return _chart;
  };

  _chart.nodes = n => {
    if (n === undefined) {
      return _nodes;
    }
    _nodes = n;
    return _chart;
  };

  _chart.valueAccessor = a => {
    if (a === undefined) {
      return _valueAccessor;
    }
    _valueAccessor = a;
    return _chart;
  };

  return _chart;
};

export default treeMapChart;
