<template>
  <div class="testTreePage">
    测试 d3 树 页面
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
    // this.testD3();
  },
  methods: {
    async initTree() {
      let treeDataOri = await this.$api.testTreeData.getTreeData();
      this.treeData = treeDataOri;
      this.treeRender(treeDataOri.data);
    },
    testD3() {
      let test1 = d3.select("#treeSvg");
      alert(test1);
    },
    treeRender(data) {
      // console.log("---data", data);
      // let width = window.screen.width;
      let width = 1200;
      let height = 900;

      let dx = 36; // 上下边距
      let dy = 52; // 左右边距

      // let margin = { top: 10, right: 120, bottom: 10, left: 40 };
      const root = d3.hierarchy(data);
      root.x0 = dy / 2;
      root.y0 = 0;
      // console.log('root.descendants()', root.descendants())
      root.descendants().forEach((d, i) => {
        d.id = i;
        d._children = d.children;
        if (d.depth && d.data.name.length !== 7) d.children = null;
      });

      const svg = d3
        .select("#treeSvg")
        // .attr("viewBox", [-margin.left, -margin.top, width, height])
        .attr("viewBox", [0, 0, width, height])
        .style("font", "10px sans-serif");
      // .style("user-select", "none");

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
        console.log("update  root ------ ", root);
        const nodes = root.descendants().reverse();
        const links = root.links();
        console.log("update  root", root);
        console.log("update  nodes", nodes);
        console.log("update  links", links);

        let diagonal = d3
          .linkHorizontal()
          .x((d) => d.y)
          .y((d) => d.x);

        const tree = d3.tree().nodeSize([dx, dy]);
        // Compute the new tree layout.
        tree(root);

        let left = root;
        let right = root;
        root.eachBefore((node) => {
          if (node.x < left.x) left = node;
          if (node.x > right.x) right = node;
        });

        // const height = right.x - left.x + margin.top + margin.bottom;

        const transition = svg
          .transition()
          .duration(duration)
          // .attr("viewBox", [-margin.left, left.x - margin.top, width, height])
          .attr("viewBox", [0, 0, width, height]);
        // .tween(
        //   "resize",
        //   window.ResizeObserver ? null : () => () => svg.dispatch("toggle")
        // );

        // Update the nodes…
        const node = gNode.selectAll("g").data(nodes, (d) => d.id);
        console.log("node", node);
        // Enter any new nodes at the parent's previous position.
        const nodeEnter = node
          .enter()
          .append("g")
          .attr("transform", `translate(${source.y0},${source.x0})`)
          .attr("fill-opacity", 0)
          .attr("stroke-opacity", 0)
          .on("click", (event, d) => {
            console.log(" ---- click");
            d.children = d.children ? null : d._children;
            update(d);
          });

        nodeEnter
          .append("circle")
          .attr("r", 2.5)
          .attr("fill", (d) => (d._children ? "#555" : "#999"))
          .attr("stroke-width", 10);

        nodeEnter
          .append("text")
          .attr("dy", "0.31em")
          .attr("x", (d) => (d._children ? -6 : 6))
          .attr("text-anchor", (d) => (d._children ? "end" : "start"))
          .text((d) => d.data.name)
          .clone(true)
          .lower()
          .attr("stroke-linejoin", "round")
          .attr("stroke-width", 3)
          .attr("stroke", "white");

        // Transition nodes to their new position.
        node
          .merge(nodeEnter)
          .transition(transition)
          .attr("transform", (d) => `translate(${d.y},${d.x})`)
          .attr("fill-opacity", 1)
          .attr("stroke-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        node
          .exit()
          .transition(transition)
          .remove()
          .attr("transform", `translate(${source.y},${source.x})`)
          .attr("fill-opacity", 0)
          .attr("stroke-opacity", 0);

        // Update the links…
        console.log("links", links);
        const link = gLink.selectAll("path").data(links, (d) => d.target.id);

        // Enter any new links at the parent's previous position.
        const linkEnter = link
          .enter()
          .append("path")
          .attr("d", () => {
            const o = { x: source.x0, y: source.y0 };
            return diagonal({ source: o, target: o });
          });

        // Transition links to their new position.
        link.merge(linkEnter).transition(transition).attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link
          .exit()
          .transition(transition)
          .remove()
          .attr("d", () => {
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
      // document.appendChild(svg);
    },
  },
};
</script>
