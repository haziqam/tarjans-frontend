"use client";
import vis from "vis-network";
import { useRef, useEffect } from "react";
import { Panel } from "primereact/panel";
import { VisNode } from "@/types/visNode";
import { VisEdge } from "@/types/visEdge";
import { visData } from "@/types/visData";
import { panelPt } from "./panelStyle";
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
    <Panel header={props.title} pt={panelPt}>
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

  for (const pair of graphData) {
    const from = nodes.findIndex((el) => el.label === pair[0]);
    const to = nodes.findIndex((el) => el.label === pair[1]);
    const edge: VisEdge = { from, to };
    if (isDirected) edge.arrows = "to";
    edges.push(edge);
  }

  return { nodes, edges };
}
