import { useEffect, useRef, useState } from "react";

const Demo2 = () => {
  const [y, setY] = useState(0);
  let x = 10;
  const ref = useRef(null);
  let i = useRef(0);

  useEffect(() => {
    //  i = setInterval(()=> {
    //   console.log("hi"+Math.random());
    // },1000)
  });

  // ref is not ref=0 ,it's a object like ref={current: 0}

  return (
    <div className="m-4 p-2 bg-slate-50 border border-black w-96 h-96">
      <div>
        <button
          className="bg-green-50 p-2 m-4"
          onClick={() => {
            x = x + 1;
            console.log(x, "normal js declaration");
          }}
        >
          INCREASE xu
        </button>
        <span className="font-bold text-xl">Let = {x}</span>
      </div>
      <div>
        <button
          className="bg-green-50 p-2 m-4"
          onClick={() => {
            setY(y + 1);
            console.log(y, "usestate");
          }}
        >
          INCREASE Y
        </button>
        <span className="font-bold text-xl">Let = Y{y}</span>
      </div>
      <div>
        <button
          className="bg-green-50 p-2 m-4"
          onClick={() => {
            ref.current += 1;
            console.log(ref.current, "ref");
          }}
        >
          INCREASE Y
        </button>
        <span className="font-bold text-xl">Let = Y{ref.current}</span>
      </div>
      {console.log("rendreing")}
      <button onClick={() => clearInterval(i)}>STOP</button>
    </div>
  );
};

export default Demo2;
