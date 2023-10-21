import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";

import { v4 as uuid } from 'uuid';


const JoinCreateRoom = ({ uuid, setUser, setRoomJoined }) => {
    const [roomId, setRoomId] = useState(uuid());
    const [name, setName] = useState("");
    const [joinName, setJoinName] = useState("");
    const [joinRoomId, setJoinRoomId] = useState("");

    const [showCreateRoom, setShowCreateRoom] = useState(false);
    const [showJoinRoom, setShowJoinRoom] = useState(true);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!name) return toast.dark("Please enter your name!");

    setUser({
      roomId,
      userId: uuid(),
      userName: name,
      host: true,
      presenter: true,
    });
    setRoomJoined(true);
  };
  const handleJoinSubmit = (e) => {
    e.preventDefault();
    if (!joinName) return toast.dark("Please enter your name!");

    setUser({
      roomId: joinRoomId,
      userId: uuid(),
      userName: joinName,
      host: false,
      presenter: false,
    });
    setRoomJoined(true);
  };

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-center items-center h-[100px] my-[20px] ">
          <h1 className="text-[40px] font-bold">
            Welcome To coDraw
          </h1>
          <h1 className="text-[20px]">
            A Realtime Whiteboard Sharing App
          </h1>
      </div>
      <div className="flex flex-col justify-evenly items-center">
            <div className="w-fit p-4 rounded-2xl border-2 border-green-500">

                <div className="flex flex-row">
                    <button
                        style={
                            { background: showJoinRoom ? 'blue' : 'white',
                            color: showJoinRoom ? 'white' : 'black' }
                        }
                        className="text-[20px] font-bold w-[200px] p-[10px] border-2 border-blue-500"
                        onClick={() => {
                            setShowJoinRoom(true);
                            setShowCreateRoom(false);
                        }}
                    >
                        Join Room
                    </button>

                    <button
                        style={
                            { background: showCreateRoom ? 'blue' : 'white',
                                color: showCreateRoom ? 'white' : 'black' }
                        }
                        className="text-[20px] font-bold w-[200px] p-[10px] border-2 border-blue-500"
                        onClick={() => {
                            setShowCreateRoom(true);
                            setShowJoinRoom(false);
                        }}
                    >
                        Create Room
                    </button>
                </div>

                <div style={{ display: showJoinRoom ? 'block' : 'none' }} className="flex flex-col items-center w-[400px] border-2 border-red-600">
                    {showJoinRoom && (
                        <div>
                            <form onSubmit={handleJoinSubmit}>
                                <div className="form-group my-2">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="text-[15px] font-bold w-full mx-auto p-2 border-2 border-grey-500"
                                        value={joinName}
                                        onChange={(e) => setJoinName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group my-2">
                                    <input
                                        type="text"
                                        className="text-[15px] font-bold w-full mx-auto p-2 border-2 border-grey-500"
                                        value={joinRoomId}
                                        onChange={(e) => setJoinRoomId(e.target.value)}
                                        placeholder="Room Id"
                                        style={{
                                        boxShadow: "none",
                                        }}
                                    />
                                </div>
                                <div className="form-group mt-5">
                                    <button
                                        type="submit"
                                        className="text-white text-[20px] font-bold w-full mx-auto p-2 bg-blue-700">
                                        Join Room
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                <div style={{ display: showCreateRoom ? 'block' : 'none' }} className="flex flex-col items-center w-[400px] border-2 border-red-600">

                    {showCreateRoom && (
                        <div>
                            <form onSubmit={handleCreateSubmit}>
                                <div className="form-group my-2">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="text-[15px] font-bold w-full mx-auto p-2 border-2 border-grey-500"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                </div>
                                <div className="input-group my-2 ">
                                <input
                                    type="text"
                                    className="text-[15px] font-bold w-full mx-auto p-2 border-2 border-grey-500"
                                    value={roomId}
                                    readOnly={true}
                                    style={{
                                    boxShadow: "none",
                                    zIndex: "0 !important",
                                    fontsize: "0.89rem !important",
                                    }}
                                />
                                <div className="input-group-append">
                                    <button
                                    className="btn btn-outline-primary  border-0 btn-sm"
                                    type="button"
                                    onClick={() => setRoomId(uuid())}
                                    >
                                    Generate
                                    </button>
                                    &nbsp;&nbsp;
                                    <CopyToClipboard
                                    text={roomId}
                                    onCopy={() => toast.success("Room Id Copied To Clipboard!")}
                                    >
                                    <button
                                        className="btn btn-outline-dark border-0 btn-sm"
                                        type="button"
                                    >
                                        Copy
                                    </button>
                                    </CopyToClipboard>
                                </div>
                                </div>
                                <div className="form-group mt-5">
                                <button type="submit" className="text-[20px] font-bold w-full mx-auto p-2 border-2 border-blue-500">
                                    Create Room
                                </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
      </div>
    </div>
  );
};

export default JoinCreateRoom;