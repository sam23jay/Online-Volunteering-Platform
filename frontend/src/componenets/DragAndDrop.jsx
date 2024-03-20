import React from "react";

const DragAndDrop = () => {
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedItemId = e.dataTransfer.getData("text/plain");
    const droppedItem = document.getElementById(droppedItemId);
    e.target.appendChild(droppedItem);
  };

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          width: "300px",
          height: "300px",
          border: "2px dashed #ccc",
        }}
      >
        Drop items here
      </div>

      <div
        id="item1"
        draggable
        onDragStart={(e) => handleDragStart(e, "item1")}
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "red",
          margin: "10px",
        }}
      >
        Item 1
      </div>

      <div
        id="item2"
        draggable
        onDragStart={(e) => handleDragStart(e, "item2")}
        style={{
          width: "50px",
          height: "50px",
          backgroundColor: "blue",
          margin: "10px",
        }}
      >
        Item 2
      </div>
    </div>
  );
};

export default DragAndDrop;
