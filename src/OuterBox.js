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
  const [initRotate, setInitRotate] = useState(0);
  const Scale = useMemo(() => {
    return (
      (initPosition.C.x - initPosition.A.x) /
      (initPosition.C.y - initPosition.A.y)
    );
  }, []);

  const pointCenter = useMemo(
    () => ({
      x:
        (position.A.x + position.B.x + position.C.x + position.D.x) / 4 +
        boxPosition.x,
      y:
        (position.A.y + position.B.y + position.C.y + position.D.y) / 4 +
        boxPosition.y,
    }),
    [boxPosition, position]
  );

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
  let drag = "180";
  const handleRotate = (e) => {
    if (e.clientX) {
      const vector = {
        x: e.clientX - pointCenter.x,
        y: e.clientY - pointCenter.y,
      };
      console.log(
        pointCenter.x -
          (position.A.x + boxPosition.x) * pointCenter.x -
          e.clientX
      );

      const angle =
        Math.acos(
          vector.y / Math.sqrt(vector.x * vector.x + vector.y * vector.y)
        ) *
        (180 / Math.PI);
      if (
        (pointCenter.x -
          (position.A.x + boxPosition.x)) * (pointCenter.x - e.clientX) <
        0
      ) {
        setInitRotate(180 +(180 - angle) );
        return;
      }
      setInitRotate(angle);
    }
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
      <div>Góc đã quay {Math.floor(initRotate)}</div>
      <div
        className={"outerStroke " + transformType}
        id="outerStroke"
        style={{
          left: boxPosition.x,
          top: boxPosition.y,
          width: Math.abs(position.B.x - position.A.x),
          height: Math.abs(position.D.y - position.A.y),
          position: "absolute",
          transform: `rotate(${initRotate}deg)`,
        }}
        // onDrag={handleDrag}
        onDragStart={(e) => console.log(e)}
        draggable="true"
      >
        <div>
          <Icon
            width={Math.abs(position.B.x - position.A.x)}
            height={Math.abs(position.D.y - position.A.y)}
          />
        </div>
        <div onDrag={handleRotate} draggable="true">
          Cầm cái này để quay
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
