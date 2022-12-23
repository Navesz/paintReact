import React, { useState } from 'react';
import './App.css';

function App() {
  const [ciclePos, setCiclePos] = useState([]);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  function handleMouseDown(event) {
    setIsDrawing(true);
    const x = event.clientX;
    const y = event.clientY;
    setCiclePos((prevPos) => {
      setUndoStack((prevUndo) => [...prevUndo, [...prevPos]]);
      setRedoStack([]);
      return [...prevPos, [x, y]];
    });
  }

  function handleMouseMove(event) {
    if (!isDrawing) return;
    const x = event.clientX;
    const y = event.clientY;
    setCiclePos((prevPos) => {
      setUndoStack((prevUndo) => [...prevUndo, [...prevPos]]);
      setRedoStack([]);
      return [...prevPos, [x, y]];
    });
  }

  function handleMouseUp() {
    setIsDrawing(false);
  }

  function handleUndo() {
    if (undoStack.length === 0) return;
    const prevPos = undoStack.pop();
    setRedoStack((prevRedo) => [...prevRedo, [...ciclePos]]);
    setCiclePos([...prevPos]);
  }

  function handleRedo() {
    if (redoStack.length === 0) return;
    const nextPos = redoStack.pop();
    setUndoStack((prevUndo) => [...prevUndo, [...ciclePos]]);
    setCiclePos([...nextPos]);
  }

  return (
    <div className="App">
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>

      <div
        className="clickArea"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {ciclePos.map((element, index) => (
          <h1
            key={index}
            style={{
              position: 'absolute',
              left: `${element[0] - 3}px`,
              top: `${element[1] - 27}px`,
              userSelect: 'none',
            }}
          >
            .
          </h1>
        ))}
      </div>
    </div>
  );
}

export default App;
