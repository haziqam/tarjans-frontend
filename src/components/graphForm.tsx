"use client";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { Panel } from "primereact/panel";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { showError, showSuccess } from "./toastFunctions";
import { panelPt } from "./panelStyle";
import styles from "./components.module.css";

export function GraphForm(props: {
  onSave: Dispatch<SetStateAction<string[][] | undefined>>;
}) {
  const [graphInput, setGraphInput] = useState("");
  const toastRef = useRef<Toast>(null);

  const handleSave = () => {
    try {
      validateGraphInput(graphInput);
      const graphData = getGraphData(graphInput);
      console.log(graphData);
      props.onSave(graphData);
      showSuccess(toastRef, "Graph has been saved");
    } catch (error) {
      showError(toastRef, (error as Error).message);
      props.onSave(undefined);
    }
  };

  return (
    <Panel header="Insert Graph Data" pt={panelPt}>
      <Toast ref={toastRef} position="bottom-right" />
      <form>
        <InputTextarea
          pt={{
            root: {
              className: styles.inputTextArea,
            },
          }}
          id="description"
          value={graphInput}
          onChange={(e) => setGraphInput(e.target.value)}
          rows={10}
          cols={36}
        />
        <div
          style={{ display: "flex", justifyContent: "end", marginTop: "16px" }}
        >
          <Button
            label="Save"
            onClick={(e) => {
              e.preventDefault();
              handleSave();
            }}
          />
        </div>
      </form>
    </Panel>
  );
}

function validateGraphInput(input: string): boolean {
  if (input.trim() === "") {
    throw new Error("Cannot insert empty string");
  }
  const lines = input.split("\n");
  lines.forEach((line, i) => {
    if (line.trim().split(" ").length !== 2) {
      throw new Error(`Invalid input at line ${i + 1}`);
    }
  });
  return true;
}

function getGraphData(input: string): string[][] {
  const lines = input.split("\n");
  const graphData: string[][] = [];
  for (const line of lines) {
    const tokens = line.trim().split(" ");
    graphData.push(tokens);
  }
  return graphData;
}
