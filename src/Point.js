import { useState, useEffect } from "react";
const initPosition = {
  top: 50,
  left: 50,
};
const Point = ({ top, left, type, setPosition, Scale, position }) => {
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
      if (e.clientY - topP > e.clientX - leftP) {
        console.log("y", e.clientY - 50);
        console.log("x", e.clientX -50);

        setLeft(leftP + (e.clientY - initPosition.top - topP) * Scale);
        setTop(e.clientY - initPosition.top);
      } else {
        console.log("y", e.clientY - 50);
        console.log("x", e.clientX -50);
        setTop(topP + (e.clientX - initPosition.left - leftP) / Scale);
        setLeft(e.clientX - initPosition.left);
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
    <div
      className="point"
      style={{
        top: topP + 50,
        left: leftP + 50,
        position: "absolute",
      }}
      onDrag={handleDragStart}
    ></div>
  );
};
export default Point;
