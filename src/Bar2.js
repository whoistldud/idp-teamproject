import * as d3 from "d3";
import "./App.css";
import "./Bar2.css";

function Bar2(){
const margin = {top: 40, bottom: 10, left: 120, right: 20};
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Creates sources <svg> element
const svg = d3.select('body').append('svg')
.attr('width', width+margin.left+margin.right)
.attr('height', height+margin.top+margin.bottom);

// Group used to enforce margin
const g = svg.append('g')
.attr('transform', `translate(${margin.left},${margin.top})`);

// Global variable for all data
let data;

// Scales setup
const xscale = d3.scaleLinear().range([0, width]);
const yscale = d3.scaleBand().rangeRound([0, height]).paddingInner(0.1);

// Axis setup
const xaxis = d3.axisTop().scale(xscale);
const g_xaxis = g.append('g').attr('class','x axis');
const yaxis = d3.axisLeft().scale(yscale);
const g_yaxis = g.append('g').attr('class','y axis');

/////////////////////////
// TODO use animated transtion between filtering changes

d3.json('https://raw.githubusercontent.com/mlnzlk/data/main/hos_%EB%85%B8%EC%9B%902.json').then((json) => {
  data = json;

  update(data);
});

function update(new_data) {
  //update the scales
  xscale.domain([0, d3.max(new_data, (d) => d.병상수)]);
  yscale.domain(new_data.map((d) => d.사업장명));
  //render the axis
  g_xaxis.call(xaxis);
  g_yaxis.call(yaxis);


  // Render the chart with new data

  // DATA JOIN use the key argument for ensurign that the same DOM element is bound to the same data-item
  const rect = g.selectAll('rect').data(new_data, (d) => d.사업장명).join(
    // ENTER 
    // new elements
    (enter) => {
      const rect_enter = enter.append('rect').attr('x', 0);
      rect_enter.append('title');
      return rect_enter;
    },
    // UPDATE
    // update existing elements
    (update) => update,
    // EXIT
    // elements that aren't associated with data
    (exit) => exit.remove()
  );

  // ENTER + UPDATE
  // both old and new elements
  rect
    .attr('height', yscale.bandwidth())
    .attr('width', (d) => xscale(d.병상수))
    .attr('y', (d) => yscale(d.사업장명));

  rect.select('title').text((d) => d.사업장명);
}

d3.select('#filter-us-only').on('change', function() {
  // This will be triggered when the user selects or unselects the checkbox
  const checked = d3.select(this).property('checked');
  if (checked === true) {
    // Checkbox was just checked

    // Keep only data element whose country is US
    const filtered_data = data.filter((d) => d.업태구분명 === '종합병원');

    update(filtered_data);  // Update the chart with the filtered data
  } else {
    // Checkbox was just unchecked
    update(data);  // Update the chart with all the data we have
  }
});
}
export default Bar2;