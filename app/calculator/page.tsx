import React from "react";

export default function Calculator() {
  const [num1, setNum1] = React.useState(0);
  const [num2, setNum2] = React.useState(0);
  const [hasil, setHasil] = React.useState(0);

  React.useEffect(() => {
    setHasil(num1 + num2);
  }, [num1, num2]);
  return (
    <div>
      <form>
        <input
          type="text"
          name="num1"
          placeholder="First Number"
          onChange={(e) => setNum1(Number(e.target.value))}
        />
        <input
          type="text"
          name="num2"
          placeholder="Second Number"
          onChange={(e) => setNum2(Number(e.target.value))}
        />
        <button type="button" onClick={() => setHasil(num1 + num2)}>
          Calculate
        </button>
        <p>Hasil: {hasil}</p>
      </form>
    </div>
  );
}
