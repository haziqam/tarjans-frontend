import vis from "vis-network";
import { useEffect, useRef } from "react";
import { Panel } from "primereact/panel";
import { visData } from "@/types/visData";
import { getGraphVisData } from "./graphPreview";
import { panelPt } from "./panelStyle";
import styles from "./components.module.css";

export function BridgePreview(props: {
  graphData: string[][] | undefined;
  bridgeData: string[][] | undefined;
}) {
  const graphImgRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = graphImgRef.current;
    console.log(props.graphData);
    let network: vis.Network;
    if (!props.graphData || !props.bridgeData) {
      network = new vis.Network(container!, {}, {});
      return;
    }

    const uniqueEdgeData: string[][] = [];
    props.graphData.forEach((el) => {
      const pair1 = [el[0], el[1]];
      const pair2 = [el[1], el[0]];
      if (
        uniqueEdgeData.findIndex((val) => pairEqual(pair1, val)) === -1 &&
        uniqueEdgeData.findIndex((val) => pairEqual(pair2, val)) === -1
      ) {
        uniqueEdgeData.push(pair1);
      }
    });

    console.log(uniqueEdgeData);
    const data = getGraphVisData(uniqueEdgeData, false);
    displayBridgeOnGraphVis(data, props.bridgeData);
    const options = {};
    network = new vis.Network(container!, data, options);
  }, [props.bridgeData]);

  return (
    <Panel
      header="Bridge Preview (bridges will be shown as dashed edges)"
      pt={panelPt}
    >
      <div ref={graphImgRef} className={styles.graphImg}></div>
    </Panel>
  );
}

function displayBridgeOnGraphVis(data: visData, bridgeData: string[][]) {
  for (const bridge of bridgeData) {
    const firstId = data.nodes.find((el) => el.label === bridge[0])!.id;
    const secondId = data.nodes.find((el) => el.label === bridge[1])!.id;
    for (const edge of data.edges) {
      if (
        pairEqual(
          [firstId.toString(), secondId.toString()],
          [edge.from.toString(), edge.to.toString()]
        )
      ) {
        edge.dashes = true;
      }
    }
  }
}

function pairEqual(a: string[], b: string[]) {
  return (a[0] === b[0] && a[1] === b[1]) || (a[0] === b[1] && a[1] === b[0]);
}
