"use client";
import { useState } from "react";
import { GraphForm } from "@/components/graphForm";
import { GraphPreview } from "@/components/graphPreview";
import { Generator } from "@/components/generator";
import { SccPreview } from "@/components/sccPreview";
import { BridgePreview } from "@/components/bridgePreview";
import "primereact/resources/themes/tailwind-light/theme.css";
import "primereact/resources/primereact.min.css";
import styles from "./page.module.css";

export default function Home() {
  const [graphData, setGraphData] = useState<string[][]>();
  const [sccData, setSccData] = useState<string[][]>();
  const [bridgeData, setBridgeData] = useState<string[][]>();

  return (
    <main className={styles.main}>
      <h1>SCC and Bridge Finder</h1>
      <div style={{ display: "flex", gap: "32px", marginBottom: "32px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <GraphForm onSave={setGraphData} />
          <Generator
            graphData={graphData}
            onSccChange={setSccData}
            onBridgeChange={setBridgeData}
          />
        </div>
        <GraphPreview title="Graph Preview" graphData={graphData} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        <SccPreview graphData={graphData} sccData={sccData} />
        <BridgePreview graphData={graphData} bridgeData={bridgeData} />
      </div>
    </main>
  );
}
