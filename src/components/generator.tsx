import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import "primeicons/primeicons.css";
import { showError, showSuccess, showInfo } from "./toastFunctions";

export function Generator(props: {
  graphData?: string[][];
  onSccChange: Dispatch<SetStateAction<string[][] | undefined>>;
  onBridgeChange: Dispatch<SetStateAction<string[][] | undefined>>;
}) {
  const [isFetching, setIsFetching] = useState(false);
  const [isSccSolved, setIsSccSolved] = useState(false);
  const [isBridgeSolved, setIsBridgeSolved] = useState(false);
  const toastRef = useRef<Toast>(null);

  useEffect(() => {
    setIsSccSolved(false);
    props.onSccChange(undefined);
    setIsBridgeSolved(false);
    props.onSccChange(undefined);
  }, [props.graphData]);

  const handleSccSolve = async () => {
    solveProblem(
      "SCC",
      isSccSolved,
      setIsSccSolved,
      setIsFetching,
      props.onSccChange,
      toastRef,
      props.graphData!
    );
  };

  const handleBridgeSolve = async () => {
    solveProblem(
      "Bridge",
      isBridgeSolved,
      setIsBridgeSolved,
      setIsFetching,
      props.onBridgeChange,
      toastRef,
      props.graphData!
    );
  };

  return (
    <Card>
      <Toast ref={toastRef} position="bottom-right" />
      {isFetching && (
        <i className="pi pi-spin pi-spinner" style={{ fontSize: "2rem" }}>
          aaa
        </i>
      )}
      <Button
        label="Generate SCC"
        disabled={isFetching || !props.graphData}
        onClick={async (e) => {
          e.preventDefault();
          handleSccSolve();
        }}
      />
      <Button
        label="Generate Bridges"
        disabled={isFetching || !props.graphData}
        onClick={async (e) => {
          e.preventDefault();
          handleBridgeSolve();
        }}
      />
    </Card>
  );
}

async function solveProblem(
  problemType: "SCC" | "Bridge",
  isSolvedState: boolean,
  setIsSolved: Dispatch<React.SetStateAction<boolean>>,
  setIsFetching: Dispatch<React.SetStateAction<boolean>>,
  onResultChange: Dispatch<SetStateAction<string[][] | undefined>>,
  toastRef: React.RefObject<Toast>,
  graphData: string[][]
) {
  if (isSolvedState) {
    showInfo(toastRef, `${problemType} already found`);
    return;
  }

  setIsFetching(true);
  const response = await fetchResult(graphData, problemType);
  setIsFetching(false);

  if (!response.success) {
    showError(
      toastRef,
      `An error occurred. ${response.errorMsg} Please try again`
    );
    return;
  }

  onResultChange(response.result);
  showSuccess(toastRef, `${problemType} found successfully`);
  setIsSolved(true);
  console.log(response.result);
}

async function fetchResult(
  graphData: string[][],
  toFind: "SCC" | "Bridge"
): Promise<{ success: boolean; result?: string[][]; errorMsg?: string }> {
  try {
    const url = "http://localhost:5000/find" + toFind;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphData),
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, result: result };
    } else {
      const errorMsg = await response.text();
      return { success: false, errorMsg: errorMsg };
    }
  } catch (error) {
    console.error("POST request error:", error);
    return { success: false, errorMsg: (error as Error).message };
  }
}
