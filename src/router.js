import React from "react";
import { Menu } from "antd";

import { Switch, Route, Redirect, Link } from "react-router-dom";
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
import Part8 from "./pages/D3/part8";
import Part9 from "./pages/D3/part9";
import Part10 from "./pages/D3/part10";
import Part11 from "./pages/D3/part11";
import Part12 from "./pages/D3/part12";

import Swiper from "./pages/Other/Swiper/index";

export const routerConfig = {
  children: [
    {
      path: "/bizchart",
      name: "BizChart",
      children: [
        {
          path: "/bar-chart",
          name: "柱状图",
          component: BarChart
        },
        {
          path: "/line-chart",
          name: "折线图",
          component: LineChart
        },
        {
          path: "/pie-chart",
          name: "饼图",
          component: PieChart
        }
      ]
    },
    {
      path: "/d3",
      name: "D3",
      children: [
        {
          path: "/part1",
          name: "part1",
          component: Part1
        },
        {
          path: "/part2",
          name: "part2",
          component: Part2
        },
        {
          path: "/part3",
          name: "part3",
          component: Part3
        },
        {
          path: "/part4",
          name: "part4",
          component: Part4
        },
        {
          path: "/part5",
          name: "part5",
          component: Part5
        },
        {
          path: "/part6",
          name: "part6",
          component: Part6
        },
        {
          path: "/part7",
          name: "part7",
          component: Part7
        },
        {
          path: "/part8",
          name: "part8",
          component: Part8
        },
        {
          path: "/part9",
          name: "part9",
          component: Part9
        },
        {
          path: "/part10",
          name: "part10",
          component: Part10
        },
        {
          path: "/part11",
          name: "part11",
          component: Part11
        },
        {
          path: "/part12",
          name: "part12",
          component: Part12
        }
      ]
    },
    {
      path: "/d3-api",
      name: "D3Api",
      children: []
    },
    {
      path: "/rx",
      name: "RX"
    },
    {
      path: "/other",
      name: "Other",
      children: [
        {
          path: "/swiper",
          name: "swiper",
          component: Swiper
        }
      ]
    }
  ]
};

export const MenuComponent = props => {
  const activeKey = props.activeKey || "/line-chart";
  return (
    <>
      <Menu
        style={{ height: "100%", borderRight: 0 }}
        defaultSelectedKeys={[activeKey]}
        mode="inline"
      >
        {routerConfig.children &&
          routerConfig.children.map(rout => {
            return (
              <Menu.SubMenu key={rout.path} title={<span>{rout.name}</span>}>
                {rout.children &&
                  rout.children.map(ro => {
                    return (
                      <Menu.Item key={rout.path + ro.path}>
                        <Link to={rout.path + ro.path}>
                          <span>{ro.name}</span>
                        </Link>
                      </Menu.Item>
                    );
                  })}
              </Menu.SubMenu>
            );
          })}
      </Menu>
    </>
  );
};

export const switchPathObj = () => {
  let routes = [];
  routerConfig.children.forEach(item => {
    const { path, children } = item;
    if (children && children.length > 0) {
      children.forEach(child => {
        const it = {
          path: path + child.path,
          name: child.name,
          component: child.component
        };
        routes.push(it);
      });
    } else {
      routes.push(item);
    }
  });
  return routes;
};

export const SwitchComponent = () => {
  const routes = switchPathObj();
  return (
    <>
      <Switch>
        {routes.map((child, index) => {
          return (
            <Route
              key={child.path}
              path={child.path}
              exact={index === 0}
              component={child.component}
            />
          );
        })}
        <Redirect to={routes[0].path} />
      </Switch>
    </>
  );
};
