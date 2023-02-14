import React, { useMemo, useState } from "react";
import Point from "./Point";
import Sharp from "./Sharp.tsx";
import Icon from "./icon";

const initPosition = {
  A: { x: 0, y: 0 },
  B: { x: 200, y: 0 },
  C: { x: 200, y: 100 },
  D: { x: 0, y: 100 },
};
const OuterBox = () => {
  const [position, setPosition] = useState(initPosition);
  const [boxPosition, setBoxPosition] = useState({
    x: 250,
    y: 250,
  });
  const [transformType, setTransformType] = useState("init");
  const Scale = useMemo(() => {
    return (
      (initPosition.C.x - initPosition.A.x) /
      (initPosition.C.y - initPosition.A.y)
    );
  }, []);
  console.log(position)
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

  const handleDrag = (e) => {
    if (e.clientX) {
      setBoxPosition({
        x: e.clientX,
        y: e.clientY,
      });
    }
  };
  return (
    <>
      <div
        className={'outerStroke ' + transformType}
        id="outerStroke"
        style={{
          left: boxPosition.x,
          top: boxPosition.y,
          width: Math.abs(position.B.x - position.A.x),
          height: Math.abs(position.D.y - position.A.y),
          position: "absolute",
        }}
        onDrag={handleDrag}
        onDragStart={(e) => console.log(e)}
        draggable="true"
      >
        <div>
          <Icon
            width={Math.abs(position.B.x - position.A.x)}
            height={Math.abs(position.D.y - position.A.y)}
          />
        </div>
      </div>
      {renderPoint().map((value, index) => (
        <Point
          top={value.top}
          left={value.left}
          key={index}
          type={value.type}
          position={position}
          setPosition={setPosition}
          Scale={Scale}
          boxPosition={boxPosition}
          setTransformType={setTransformType}
          transformType={transformType}
        />
      ))}
    </>
  );
};
export default OuterBox;
