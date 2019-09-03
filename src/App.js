import React from "react";
import { Switch, Route, Redirect, withRouter, Link } from "react-router-dom";
import BarChart from "./pages/BizChart/BarChart";
import LineChart from "./pages/BizChart/LineChart";
import PieChart from "./pages/BizChart/PieChart";
import Part1 from "./pages/D3/part1";
import Part2 from "./pages/D3/part2";
import Part3 from "./pages/D3/part3";
import Part4 from "./pages/D3/part4";
import Part5 from "./pages/D3/part5";
import Part6 from "./pages/D3/part6";
import Part7 from "./pages/D3/part7";
import { Menu, Icon, Layout } from "antd";
import "./App.css";

const App = props => {
  const { Content, Sider } = Layout;
  const bodyHeight = document.body.height;
  const activeKey = props.location.pathname || "/line-chart";
  return (
    <Layout style={{ height: "100%" }}>
      <Sider width={200} height={bodyHeight}>
        <Menu
          style={{ height: "100%", borderRight: 0 }}
          defaultSelectedKeys={[activeKey]}
          mode="inline"
        >
          <Menu.SubMenu key="bizchart" title={<span>BizChart</span>}>
            <Menu.Item key="/bar-chart">
              <Link to="/bar-chart">
                <Icon type="bar-chart" />
                <span>柱状图</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/line-chart">
              <Link to="/line-chart">
                <Icon type="line-chart" />
                <span>折线图</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/pie-chart">
              <Link to="/pie-chart">
                <Icon type="pie-chart" />
                <span>饼图</span>
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="d3" title={<span>D3</span>}>
            <Menu.Item key="/d3-test/part1">
              <Link to="/d3-test/part1">
                <span>第一章</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/d3-test/part2">
              <Link to="/d3-test/part2">
                <span>第二章</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/d3-test/part3">
              <Link to="/d3-test/part3">
                <span>第三章</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/d3-test/part4">
              <Link to="/d3-test/part4">
                <span>第四章</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/d3-test/part5">
              <Link to="/d3-test/part5">
                <span>第五章</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/d3-test/part6">
              <Link to="/d3-test/part6">
                <span>第六章</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/d3-test/part7">
              <Link to="/d3-test/part7">
                <span>第七章</span>
              </Link>
            </Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="rx" title={<span>RX</span>} />
        </Menu>
      </Sider>
      <Content style={{ padding: "10px" }}>
        <Switch>
          <Route path="/bar-chart" exact component={BarChart} />
          <Route path="/line-chart" component={LineChart} />
          <Route path="/pie-chart" component={PieChart} />
          <Route path="/d3-test/part1" component={Part1} />
          <Route path="/d3-test/part2" component={Part2} />
          <Route path="/d3-test/part3" component={Part3} />
          <Route path="/d3-test/part4" component={Part4} />
          <Route path="/d3-test/part5" component={Part5} />
          <Route path="/d3-test/part6" component={Part6} />
          <Route path="/d3-test/part7" component={Part7} />
          <Redirect to="/bar-chart" />
        </Switch>
      </Content>
    </Layout>
  );
};

export default withRouter(App);
