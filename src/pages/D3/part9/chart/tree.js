import * as d3 from "d3";

const tree = () => {
  const _tree = {};

  let _svg,
    _selector,
    _width = 1000,
    _height = 1600,
    _margins = { top: 30, left: 120, right: 30, bottom: 30 },
    _nodes,
    _i = 0,
    _duration = 300,
    _bodyG,
    _root;

  _tree.render = selector => {
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
    return _tree;
  };

  const renderBody = svg => {
    if (!_bodyG) {
      _bodyG = svg
        .append("g")
        .attr("class", "body")
        .attr("transform", `translate(${_margins.left},${_margins.top})`);
    }

    _root = d3.hierarchy(_nodes);

    render(_root);
  };

  const render = root => {
    var tree = d3
      .tree()
      .size([
        _height - _margins.top - _margins.bottom,
        _width - _margins.left - _margins.right
      ]);

    tree(root);

    renderNodes(root);
    renderLinks(root);
  };

  const renderNodes = root => {
    var nodes = root.descendants();

    var nodeElements = _bodyG.selectAll("g.node").data(nodes, function(d) {
      return d.id || (d.id = ++_i);
    });

    var nodeEnter = nodeElements
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.y},${d.x})`)
      .on("click", d => {
        toggle(d);
        render(_root);
      });

    nodeEnter.append("circle").attr("r", 4);

    var nodeUpdate = nodeEnter
      .merge(nodeElements)
      .transition()
      .duration(_duration)
      .attr("transform", d => `translate(${d.y},${d.x})`);

    nodeUpdate
      .select("circle")
      .style("fill", d => (d._children ? "lightsteelblue" : "#fff"));

    var nodeExit = nodeElements
      .exit()
      .transition()
      .duration(_duration)
      .attr("transform", d => `translate(${d.y},${d.x})`)
      .remove();

    nodeExit
      .select("circle")
      .attr("r", 1e-6)
      .remove();

    renderLabels(nodeEnter, nodeUpdate, nodeExit);
  };

  const renderLabels = (nodeEnter, nodeUpdate, nodeExit) => {
    nodeEnter
      .append("text")
      .attr("x", d => (d.children || d._children ? -10 : 10))
      .attr("dy", ".35em")
      .attr("text-anchor", d => (d.children || d._children ? "end" : "start"))
      .text(d => d.data.name)
      .style("fill-opacity", 1e-6);

    nodeUpdate.select("text").style("fill-opacity", 1);
    nodeExit
      .select("text")
      .style("fill-opacity", 1e-6)
      .remove();
  };

  const renderLinks = root => {
    var nodes = root.descendants().slice(1);

    var link = _bodyG
      .selectAll("path.link")
      .data(nodes, d => d.id || (d.id = ++_i));

    link
      .enter()
      .insert("path", "g")
      .attr("class", "link")
      .merge(link)
      .transition()
      .duration(_duration)
      .attr("d", d => generateLinkPath(d, d.parent));

    link.exit().remove();
  };

  const generateLinkPath = (target, source) => {
    var path = d3.path();
    path.moveTo(target.y, target.x);
    path.bezierCurveTo(
      (target.y + source.y) / 2,
      target.x,
      (target.y + source.y) / 2,
      source.x,
      source.y,
      source.x
    );
    return path.toString();
  };

  const toggle = d => {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
  };

  _tree.width = w => {
    if (w === undefined) {
      return _width;
    }
    _width = w;
    return _tree;
  };

  _tree.height = h => {
    if (h === undefined) {
      return _height;
    }
    _height = h;
    return _tree;
  };

  _tree.margins = m => {
    if (m === undefined) {
      return _margins;
    }
    _margins = m;
    return _tree;
  };

  _tree.nodes = nodes => {
    if (nodes === undefined) {
      return _nodes;
    }
    _nodes = nodes;
    return _tree;
  };
  return _tree;
};

export default tree;
