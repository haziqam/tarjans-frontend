const graphData = [
  ["A", "B"],
  ["B", "A"],
  ["C", "A"],
  ["D", "D"],
  ["A", "D"],
  ["A", "C"],
];

const pairEqual = (a: string[], b: string[]) =>
  (a[0] === b[0] && a[1] === b[1]) || (a[0] === b[1] && a[1] === b[0]);

const uniqueEdgeData: string[][] = [];
graphData.forEach((el) => {
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
