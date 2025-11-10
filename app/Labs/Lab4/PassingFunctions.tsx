"use client"

export default function PassingFunctions(
  { theFunction }: { theFunction: () => void }
) {
  return (
    <div id="wd-passing-functions">
      <h2>Passing Functions</h2>
      <button onClick={theFunction} className="btn btn-primary">
        Invoke the Function
      </button>
      <hr/>
    </div>
  );
}