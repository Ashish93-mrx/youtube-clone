import { useEffect, useMemo, useState } from "react";
import { findPrime } from "../utils/helper";

const Demo = () => {
  const [text, setText] = useState(0);
  const [text2, setText2] = useState(0);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  console.log("demo");
  useEffect(() => {
    console.log("inside useeffect");
  }, []);

  const prime = useMemo(() => findPrime(text), [text]);
  console.log("wtf called");

  return (
    <>
      <div>
        <h1>HIII</h1>
        <button onClick={() => setIsDarkTheme(!isDarkTheme)}>
          {isDarkTheme ? "Light" : "Dark"}
        </button>
      </div>
      <div
        className={
          "m-4 p-2 w-96 h-96 border border-black " +
          (isDarkTheme && "bg-gray-900 text-white")
        }
      >
        <div>
          <input
            type="number"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border border-x-black w-72 px-2"
          />
          <input
            type="number"
            value={0}
            onChange={() => setText2(1)}
            className="border border-x-black w-72 px-2"
          />
        </div>
        <div>
          <h1>
            {text}nth Prime : {prime}
          </h1>
        </div>
      </div>
    </>
  );
};

export default Demo;
