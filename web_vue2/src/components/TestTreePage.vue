<template>
  <div class="testTreePage">
    <!-- 测试 d3 树 页面 -->
    <svg id="treeSvg"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  data() {
    return {
      moduleId: "1111",
      treeData: {},
    };
  },
  created() {
    this.initTree();
  },
  methods: {
    async initTree() {
      let treeDataOri = await this.$api.testTreeData.getTreeData();
      // this.treeData = treeDataOri;
      this.treeRender(treeDataOri.data);
    },
    treeRender(data) {
      console.log("---data", data);
      const diagonal = d3
        .linkHorizontal()
        .x((d) => d.y)
        .y((d) => d.x);

      let dx = 30; // 上下距离
      let dy = 100; // 左右距离
      const margin = { top: 10, right: 120, bottom: 10, left: 40 };
      const width = dy * 6;
      const root = d3.hierarchy(data);

      let rectHeight = 22;
      let rectWidth = 80;

      let boxWidthy = rectWidth;
      let boxWidthx = rectHeight / 2;
      let linkWidthx = rectWidth;

      let circleR = 6;

      root.x0 = dy / 2;
      root.y0 = 0;
      root.descendants().forEach((d, i) => {
        d.id = i;
        d._children = d.children;
        // if (d.depth && d.data.name.length !== 7) d.children = null;
      });

      const svg = d3
        .select("#treeSvg")
        // .attr("viewBox", [-margin.left, -margin.top, width, dx])
        .attr("width", "100vm")
        .attr("height", "100vh")
        .style("font", "10px sans-serif")
        .style("user-select", "none");

      const gLink = svg
        .append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5);

      const gNode = svg
        .append("g")
        .attr("cursor", "pointer")
        .attr("pointer-events", "all");

      function update(source) {
        const duration = d3.event && d3.event.altKey ? 2500 : 250;
        const nodes = root.descendants().reverse();
        const links = root.links();

        // Compute the new tree layout.
        d3.tree().nodeSize([dx, dy])(root);

        let left = root;
        let right = root;
        root.eachBefore((node) => {
          if (node.x < left.x) left = node;
          if (node.x > right.x) right = node;
        });

        const height = right.x - left.x + margin.top + margin.bottom;

        const transition = svg
          .transition()
          .duration(duration)
          .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
          .tween(
            "resize",
            window.ResizeObserver ? null : () => () => svg.dispatch("toggle")
          );

        // Update the nodes…
        const node = gNode.selectAll("g").data(nodes, (d) => d.id);

        // Enter any new nodes at the parent's previous position.
        const nodeEnter = node
          .enter()
          .append("g")
          // .attr("transform", (d) => `translate(${source.y0},${source.x0})`)
          .attr("transform", (d) => {
            console.log("source.y0, source.x0", source.y0, source.x0);
            return `translate(${source.y0},${source.x0})`;
          })
          .attr("fill-opacity", 0)
          .attr("stroke-opacity", 0);
        // .on("click", (event, d) => {
        //   d.children = d.children ? null : d._children;
        //   update(d);
        // });

        nodeEnter
          .append("rect")
          // .attr("r", 2.5)
          .attr("width", rectWidth + "px")
          .attr("height", rectHeight + "px")
          // .attr("fill", (d) => (d._children ? "#555" : "#999"))
          .attr("fill", "#f47920")
          .attr("stroke-width", 1)
          .attr("stroke", "#999")
          .attr("rx", 5);

        nodeEnter
          .append("text")
          // .attr("dy", "0.31em")
          .attr("dx", "12")
          .attr("dy", "12")
          .attr("x", (d) => (d._children ? 0 : 0))
          .attr("text-anchor", (d) => (d._children ? "start" : "start"))
          .text((d) => d.data.name)
          .clone(true)
          .lower()
          .attr("stroke-linejoin", "round")
          .attr("stroke-width", 3)
          .attr("stroke", "white");

        nodeEnter
          .append("circle")
          .attr("r", (d) => (d.children ? circleR : 0))
          .attr("fill", (d) => (d._children ? "#555" : "#999"))
          .attr("stroke-width", 10)
          .attr(
            "transform",
            (d) => `translate(${boxWidthy + circleR / 2},${boxWidthx})`
          )
          .on("click", (event, d) => {
            d.children = d.children ? null : d._children;
            update(d);
          });
        // Transition nodes to their new position.
        const nodeUpdate = node
          .merge(nodeEnter)
          .transition(transition)
          .attr(
            "transform",
            (d) => `translate(${d.y + boxWidthy * d.depth},${d.x - boxWidthx})`
          )
          .attr("fill-opacity", 1)
          .attr("stroke-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        const nodeExit = node
          .exit()
          .transition(transition)
          .remove()
          .attr("transform", (d) => `translate(${source.y},${source.x})`)
          .attr("fill-opacity", 0)
          .attr("stroke-opacity", 0);

        // Update the links…
        const link = gLink.selectAll("path").data(links, (d) => d.target.id);

        // Enter any new links at the parent's previous position.
        const linkEnter = link
          .enter()
          .append("path")
          .attr("d", (d) => {
            const o = { x: source.x0, y: source.y0 };
            return diagonal({ source: o, target: o });
          });

        // Transition links to their new position.
        link
          .merge(linkEnter)
          .attr(
            "transform",
            (d) => `translate(${(d.source.depth + 1) * linkWidthx},0)`
          )
          .transition(transition)
          .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link
          .exit()
          .transition(transition)
          .remove()
          .attr("d", (d) => {
            const o = { x: source.x, y: source.y };
            return diagonal({ source: o, target: o });
          });

        // Stash the old positions for transition.
        root.eachBefore((d) => {
          d.x0 = d.x;
          d.y0 = d.y;
        });
      }

      update(root);

      return svg.node();
    },
  },
};
</script>
