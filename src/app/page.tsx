"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { GraphPreview } from "@/components/graphPreview";
import { GraphForm } from "@/components/graphForm";
import "primereact/resources/themes/tailwind-light/theme.css";
import "primereact/resources/primereact.min.css";
import { useState } from "react";
import { Generator } from "@/components/generator";
import { VisEdge } from "@/types/visEdge";
import { SccPreview } from "@/components/sccPreview";
import { BridgePreview } from "@/components/bridgePreview";

export default function Home() {
  const [graphData, setGraphData] = useState<string[][]>();
  const [sccData, setSccData] = useState<string[][]>();
  const [bridgeData, setBridgeData] = useState<string[][]>();

  return (
    <main className={styles.main}>
      <GraphForm onSave={setGraphData} />
      <Generator
        graphData={graphData}
        onSccChange={setSccData}
        onBridgeChange={setBridgeData}
      />
      <GraphPreview title="Graph Preview" graphData={graphData} />
      <SccPreview graphData={graphData} sccData={sccData} />
      <BridgePreview graphData={graphData} bridgeData={bridgeData} />
    </main>
  );
}
