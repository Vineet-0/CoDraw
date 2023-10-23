import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Canvas from "./Canvas";
import { RiPencilLine } from 'react-icons/ri';
import { BsSlashLg } from 'react-icons/bs';
import { BiUndo, BiRedo } from 'react-icons/bi';
import { BiRectangle } from 'react-icons/bi';
import openSideBar from './Sidebar.jsx'
import 'react-toastify/dist/ReactToastify.css';

import { FiUsers } from 'react-icons/fi';
import { AiOutlineDown } from 'react-icons/ai';


const Room = ({ userNo, socket, setUsers, setUserNo }) => {
  const canvasRef = useRef(null);
  const ctx = useRef(null);

  const [color, setColor] = useState("#000000");
  const [color1, setColor1] = useState('#000000');
  const [color2, setColor2] = useState('#ff0000');
  const [color3, setColor3] = useState('#0000ff');

  const handleColorChange = (color) => {
    setColor(color);
  };

  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [tool, setTool] = useState("pencil");
  // const [openUserTab, setUserTab] = useState(false);

  useEffect(() => {
    socket.on("message", (data) => {
      toast.info(data.message);
    });
  }, []);
  useEffect(() => {
    socket.on("users", (data) => {
      setUsers(data);
      setUserNo(data.length);
    });
  }, []);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    setElements([]);
  };

  const undo = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      elements[elements.length - 1],
    ]);
    setElements((prevElements) =>
      prevElements.filter((ele, index) => index !== elements.length - 1)
    );
  };
  const redo = () => {
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) =>
      prevHistory.filter((ele, index) => index !== history.length - 1)
    );
  };
  return (
    <div className="container-fluid">
      <div className="flex flex-row justify-between items-center text-[#0C356A] px-10 py-4 w-full bg-[#40F8FF]">
          <div className="w-1/4">

          </div>
          <div className="flex flex-row justify-center gap-2">
              <button
                  style={
                      { color: tool === 'pencil' ? '#0C356A' : '#279EFF'}
                  }
                  className="form-check-input"
                  onClick={() => setTool("pencil")}
                  disabled={tool === "pencil"}
                >
                    <RiPencilLine className="text-[25px]" />
              </button>
              <button
                  style={
                      { color: tool === 'line' ? '#0C356A' : '#279EFF'}
                  }
                  className="form-check-input"
                  onClick={() => setTool("line")}
                  disabled={tool === "line"}
                >
                    <BsSlashLg className="text-[25px]" />
              </button>
              <button
                  style={
                      { color: tool === 'rect' ? '#0C356A' : '#279EFF'}
                  }
                  className="form-check-input"
                  onClick={() => setTool("rect")}
                  disabled={tool === "rect"}
                >
                    <BiRectangle className="text-[25px]" />
              </button>
          </div>

          <div className="flex flex-row gap-2">
            <div>
              <input
                className="border-0 rounded-full"
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                onClick={() => handleColorChange(color1)}
                style={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          appearance: 'none',
                          backgroundColor: color1,
                          width: '20px',
                          height: '20px',
                          border: 'none',
                }}
              />
              {/* <AiOutlineDown className="fixed text-white top-8 left-150"/> */}
            </div>
            <div>
              <input
                className="border-0 rounded-full"
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                onClick={() => handleColorChange(color2)}
                style={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          appearance: 'none',
                          backgroundColor: color2,
                          width: '20px',
                          height: '20px',
                          border: 'none',
                }}
              />
            </div>
            <div>
              <input
                className="border-0 rounded-full"
                type="color"
                value={color3}
                onChange={(e) => setColor3(e.target.value)}
                onClick={() => handleColorChange(color3)}
                style={{
                          WebkitAppearance: 'none',
                          MozAppearance: 'none',
                          appearance: 'none',
                          backgroundColor: color3,
                          width: '20px',
                          height: '20px',
                          border: 'none',
                }}
              />
            </div>
          </div>

          <div className="flex flex-row justify-center">
              <button
                type="button"
                className="py-1 text-[#0C356A]"
                disabled={elements.length === 0}
                onClick={() => undo()}
              >
                  <BiUndo className="text-[35px]" />
              </button>
              &nbsp;&nbsp;
              <button
                type="button"
                className="py-1 text-[#0C356A]"
                disabled={history.length < 1}
                onClick={() => redo()}
              >
                  <BiRedo className="text-[35px]" />
              </button>
          </div>
          <div className="flex felx-row justify-center items-center text-[#0C356A]">
              <FiUsers size={25} />
              &nbsp;&nbsp;
              <h1>
                {userNo}
              </h1>
          </div>
          <div className="bg-red-500 text-white font-bold px-3 py-1 rounded-md">
              <input
                type="button"
                className="btn btn-danger"
                value="Clear Canvas"
                onClick={clearCanvas}
              />
          </div>
      </div>
      <div className="">
        <Canvas
          canvasRef={canvasRef}
          ctx={ctx}
          color={color}
          setElements={setElements}
          elements={elements}
          tool={tool}
          socket={socket}
        />
      </div>
    </div>
  );
};

export default Room;