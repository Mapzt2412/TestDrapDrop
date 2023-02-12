import React, { useMemo, useState } from "react";
import Point from "./Point";
import Sharp from "./Sharp.tsx";

const initPosition = {
  A: { x: 0, y: 0 },
  B: { x: 200, y: 0 },
  C: { x: 200, y: 100 },
  D: { x: 0, y: 100 },
};
const OuterBox = () => {
  const [position, setPosition] = useState(initPosition);
  const Scale = useMemo(() => {
    return (
      (initPosition.C.x - initPosition.A.x) /
      (initPosition.C.y - initPosition.A.y)
    );
  }, []);
  console.log(Scale);
  const renderPoint = () => {
    const ListPosition = [];
    for (let i = 0; i < 8; i++) {
      if (i === 0) {
        ListPosition.push({
          top: position.A.x,
          left: position.A.y,
          type: "a",
        });
      }
      if (i === 1) {
        ListPosition.push({
          top: position.B.y,
          left: position.B.x,
          type: "b",
        });
      }
      if (i === 2) {
        ListPosition.push({
          top: position.C.y,
          left: position.C.x,
          type: "c",
        });
      }
      if (i === 3) {
        ListPosition.push({
          top: position.D.y,
          left: position.D.x,
          type: "d",
        });
      }
      // if (i === 4) {
      //   position.push({
      //     top: initPosition.A.x,
      //     left: initPosition.A.y,
      //   });
      // }
      // if (i === 5) {
      //   position.push({
      //     top: initPosition.A.x,
      //     left: initPosition.A.y,
      //   });
      // }
      // if (i === 6) {
      //   position.push({
      //     top: initPosition.A.x,
      //     left: initPosition.A.y,
      //   });
      // }
      // if (i === 7) {
      //   position.push({
      //     top: initPosition.A.x,
      //     left: initPosition.A.y,
      //   });
      // }
    }
    return ListPosition;
  };
  console.log(renderPoint());
  function allowDrop(ev) {
    ev.preventDefault();
  }
  return (
    <>
      <svg
        className="outerStroke"
        id="outerStroke"
        style={{
          left: 50,
          top: 50,
          width: 1000,
          height: 1000,
          position: "absolute",
        }}
        onDragOver={allowDrop}
      >
        <polygon
          points={`${position.A.x},${position.A.y} ${position.B.x},${position.B.y} ${position.C.x},${position.C.y} ${position.D.x},${position.D.y}`}
          stroke="red"
          fill="none"
        />
      </svg>
      {renderPoint().map((value, index) => (
        <Point
          top={value.top}
          left={value.left}
          key={index}
          type={value.type}
          position={position}
          setPosition={setPosition}
          Scale={Scale}
        />
      ))}
      <Sharp />
    </>
  );
};
export default OuterBox;
