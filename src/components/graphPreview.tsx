"use client";
import vis from "vis-network";
import { useRef, useEffect } from "react";
import { Panel } from "primereact/panel";
import { VisNode } from "@/types/visNode";
import { VisEdge } from "@/types/visEdge";
import { visData } from "@/types/visData";
import { colorArray } from "./colors";
import styles from "./components.module.css";

export function GraphPreview(props: {
  title: string;
  graphData: string[][] | undefined;
}) {
  const graphImgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = graphImgRef.current;
    console.log(props.graphData);
    let network: vis.Network;
    if (!props.graphData) {
      network = new vis.Network(container!, {}, {});
      return;
    }

    const data = getGraphVisData(props.graphData, true);
    const options = {};
    network = new vis.Network(container!, data, options);
  }, [props.graphData]);

  return (
    <Panel header={props.title}>
      <div ref={graphImgRef} className={styles.graphImg}></div>
    </Panel>
  );
}

export function getGraphVisData(
  graphData: string[][],
  isDirected: boolean
): visData {
  const nodes: VisNode[] = [];
  const edges: VisEdge[] = [];

  const nodeNames = [...new Set<string>(graphData.flat(2))];
  nodeNames.forEach((nodeName, i) => {
    nodes.push({ id: i, label: nodeName });
  });
  // console.log(nodes);

  for (const pair of graphData) {
    const from = nodes.findIndex((el) => el.label === pair[0]);
    const to = nodes.findIndex((el) => el.label === pair[1]);
    const edge: VisEdge = { from, to };
    if (isDirected) edge.arrows = "to";
    edges.push(edge);
  }

  return { nodes, edges };
}

// TODO: hapus

// yg pake color
// const nodes = [
//   { id: 1, label: "html color", color: "lime" },
//   { id: 2, label: "rgb color", color: "rgb(255,168,7)" },
//   { id: 3, label: "hex color", color: "#7BE141" },
//   { id: 4, label: "rgba color", color: "rgba(97,195,238,0.5)" },
//   {
//     id: 5,
//     label: "colorObject",
//     color: { background: "pink", border: "purple" },
//   },
//   {
//     id: 6,
//     label: "colorObject + highlight",
//     color: {
//       background: "#F03967",
//       border: "#713E7F",
//       highlight: { background: "red", border: "black" },
//     },
//   },
//   {
//     id: 7,
//     label: "colorObject + highlight + hover",
//     color: {
//       background: "cyan",
//       border: "blue",
//       highlight: { background: "red", border: "blue" },
//       hover: { background: "white", border: "red" },
//     },
//   },
// ];
// const edges = [
//   { from: 1, to: 3 },
//   { from: 1, to: 2 },
//   { from: 2, to: 4 },
//   { from: 2, to: 5 },
//   { from: 2, to: 6 },
//   { from: 4, to: 7 },
// ];

// const data = {
//   nodes: nodes,
//   edges: edges,
// };
// const options = {};
// const network = new vis.Network(container!, data, options);
