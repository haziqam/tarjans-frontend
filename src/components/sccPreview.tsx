import { Panel } from "primereact/panel";
import { useEffect, useRef } from "react";
import styles from "./components.module.css";
import vis from "vis-network";
import { colorArray } from "./colors";
import { visData } from "@/types/visData";
import { getGraphVisData } from "./graphPreview";

export function SccPreview(props: {
  graphData: string[][] | undefined;
  sccData: string[][] | undefined;
}) {
  const graphImgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = graphImgRef.current;
    console.log(props.graphData);
    let network: vis.Network;
    if (!props.graphData || !props.sccData) {
      network = new vis.Network(container!, {}, {});
      return;
    }

    const data = getGraphVisData(props.graphData, true);
    displaySccOnGraphVis(data, props.sccData);
    const options = {};
    network = new vis.Network(container!, data, options);
  }, [props.sccData]);

  return (
    <Panel header="SCC Preview">
      <div ref={graphImgRef} className={styles.graphImg}></div>
    </Panel>
  );
}

function displaySccOnGraphVis(data: visData, sccData: string[][]) {
  let sccIndex = 0;
  for (const scc of sccData) {
    for (const nodeName of scc) {
      const currentNode = data.nodes.find((el) => el.label === nodeName);
      currentNode!.color = colorArray[sccIndex];
    }
    sccIndex++;
  }
}
