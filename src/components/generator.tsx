import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
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
    <Card
      pt={{
        root: {
          style: {
            width: "100%",
            boxShadow: " 0 0 4px 2px #00000033",
            borderRadius: "6px",
          },
        },
        content: {
          style: {
            paddingTop: "0",
            paddingBottom: "0",
          },
        },
      }}
    >
      <Toast ref={toastRef} position="bottom-right" />
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
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
      </div>
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
  console.log(response);
  showSuccess(
    toastRef,
    `${problemType} found successfully in ${response.timeNanoseconds} nanoseconds`
  );
  setIsSolved(true);
  console.log(response.result);
}

async function fetchResult(
  graphData: string[][],
  toFind: "SCC" | "Bridge"
): Promise<{
  success: boolean;
  result?: string[][];
  timeNanoseconds?: number;
  errorMsg?: string;
}> {
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
      const responseJSON = await response.json();
      return {
        success: true,
        result: responseJSON.result,
        timeNanoseconds: responseJSON.timeNanoseconds,
      };
    } else {
      const errorMsg = await response.text();
      return { success: false, errorMsg: errorMsg };
    }
  } catch (error) {
    console.error("POST request error:", error);
    return { success: false, errorMsg: (error as Error).message };
  }
}
