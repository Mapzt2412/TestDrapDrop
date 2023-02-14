import { useState, useEffect } from "react";
const initPosition = {
  top: 250,
  left: 250,
};
const Point = ({
  top,
  left,
  type,
  setPosition,
  Scale,
  boxPosition,
  setTransformType,
  transformType,
}) => {
  const [topP, setTop] = useState(top);
  const [leftP, setLeft] = useState(left);
  //   const handleDragStart = (e) => {
  //     if (e.clientX) {
  //       setTop(e.clientY - initPosition.top);
  //       setLeft(e.clientX - initPosition.left + 50);
  //     }
  //   };

  //   useEffect(() => {
  //     if(type === 'c'){
  //         setPosition({
  //             A: { x: 0, y: 0 },
  //             B: { x: leftP, y: 0 },
  //             C: { x: leftP, y: topP },
  //             D: { x: 0, y: topP },
  //         })
  //     }
  //   }, [topP, leftP, type, setPosition]);
  const handleDragStart = (e) => {
    if (e.clientX) {
      if (e.clientX <= boxPosition.x && e.clientY <= boxPosition.y) {
        setTransformType("left-top");
      } else if (e.clientY <= boxPosition.y) {
        setTransformType("top");
      } else if (e.clientX <= boxPosition.x) {
        setTransformType("left");
      } else {
        setTransformType("init");
      }
      if (e.clientY - topP > e.clientX - leftP) {
        setLeft(leftP + (e.clientY - boxPosition.y - topP) * Scale);
        setTop(e.clientY - boxPosition.y);
      } else {
        setTop(topP + (e.clientX - boxPosition.x - leftP) / Scale);
        setLeft(e.clientX - boxPosition.x);
      }
    }
  };
  useEffect(() => {
    if (type === "c") {
      setPosition({
        A: { x: 0, y: 0 },
        B: { x: leftP, y: 0 },
        C: { x: leftP, y: topP },
        D: { x: 0, y: topP },
      });
    }
  }, [topP, leftP, type, setPosition]);
  return (
    <>
      {transformType === "left-top" ? (
        <div
          className="point"
          style={{
            top: boxPosition?.y - topP,
            left: boxPosition?.x - leftP,
            position: "absolute",
          }}
          onDrag={handleDragStart}
        ></div>
      ) : (
        <div
          className="point"
          style={{
            top:
              transformType === "top"
                ? boxPosition?.y - topP
                : topP + boxPosition?.y,
            left:
              transformType === "left"
                ? boxPosition?.x - leftP
                : leftP + boxPosition?.x,
            position: "absolute",
          }}
          onDrag={handleDragStart}
        ></div>
      )}
    </>
  );
};
export default Point;
