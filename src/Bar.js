import React, { useEffect } from "react";
import * as d3 from "d3";
import "./App.css";
import "./bar.css";

function Bar() {
  useEffect(() => {
    d3.csv(
      "https://raw.githubusercontent.com/kimdayeon37/barchart/main/hos_%E1%84%82%E1%85%A9%E1%84%8B%E1%85%AF%E1%86%AB2.csv"
    ).then(function (data) {
      data.forEach(function (d) {
        d.병상수 = +d.병상수;
      });
      drawChart(data);
    });
  });

  const drawChart = (data) => {
    const svg = d3.select("#chartId");

    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const margin = { top: 50, right: 40, bottom: 75, left: 100 };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const chartTitle = "병상수";

    const xValue = (d) => +d.병상수;

    const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, xValue)])
      .range([0, innerWidth]);

    const yScale = d3
      .scaleBand()
      .domain(
        data.map(function (d) {
          return d.사업장명;
        })
      )
      .range([0, innerHeight])
      .padding(0.1);

    const tooltip = d3.select("body").append("div").attr("class", "tooltip");

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`)
      .attr("class", "axis");

    g.append("text")
      .attr("x", innerWidth / 2 - 125)
      .attr("y", 0 - margin.top / 2)
      .attr("class", "chart-title")
      .text(chartTitle);

    const xAxisTickFormat = (number) =>
      d3.format(".3s")(number).replace("G", "B");

    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat(xAxisTickFormat)
      .tickSize(-innerHeight);

    const xAxisG = g
      .append("g")
      .call(xAxis)
      .attr("transform", `translate(0, ${innerHeight})`);

    xAxisG.select(".domain").remove();

    xAxisG
      .append("text")
      .attr("class", "axis-label")
      .attr("y", 50)
      .attr("x", innerWidth / 2)
      .attr("fill", "black")

    const yAxis = d3.axisLeft(yScale);

    const yAxisG = g.append("g").call(yAxis);

    yAxisG.selectAll(".tick text").attr("class", "y-axis-ticks");

    yAxisG.select(".domain").remove();

    g.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "rect")
      .attr("y", function (d) {
        return yScale(d.사업장명) + 5;
      })
      .attr("width", function (d) {
        return xScale(d.병상수);
      })
      .attr("height", yScale.bandwidth() / 2)
      .on("mouseenter", function (event, d) {
        d3.select(this).attr("opacity", 0.5);
      })
      .on("mouseleave", function (event, d) {
        d3.select(this).attr("opacity", 1);
      })
      // Make div appear
      .on("mouseover", function () {
        return tooltip.style("visibility", "visible");
      })
      .on("mousemove", function (event, d) {
        return tooltip
          .style("top", event.pageY + 30 + "px")
          .style("left", event.pageX + 20 + "px")
          .html("병상수: " + d3.format("s")(d.병상수).replace("G", "B"));
      })
      // Make div disappear
      .on("mouseout", function () {
        return tooltip.style("visibility", "hidden");
      });
  };

  return (
    <div className="Bar_chart">
      <div className="container">
        <svg id="chartId" height="450" width="780" className="svg-chart"></svg>
      </div>
    </div>
  );
}

export default Bar;
