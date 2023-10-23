import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import logo from "./copy.png"

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
    <div className="">
        <div className="flex flex-col justify-center items-center pt-12 ">
            <h1 className="text-[50px] font-bold text-[#0C356A]">
                Welcome To coDraw
            </h1>
            <h1 className="text-[20px] text-[#0C356A]">
                A Realtime Whiteboard Sharing App
            </h1>
        </div>

        
        <div className="flex flex-col justify-evenly items-center pt-8">

            <div className="w-[448px] flex flex-row">
                <div className="w-1/2">
                    <button
                        style={
                            {   background: showJoinRoom ? '#279EFF' : 'white',
                                color: showJoinRoom ? 'white' : '#0C356A',
                                border: `2px solid ${showJoinRoom ? '#279EFF' : 'white'}`  }
                        }
                        className="text-[#0C356A] text-[20px] font-bold w-full py-2 rounded-tl-lg border-r-0"
                        onClick={() => {
                            setShowJoinRoom(true);
                            setShowCreateRoom(false);
                        }}
                    >
                        Join Room
                    </button>
                </div>

                <div className="w-1/2">
                    <button
                        style={
                            {   background: showCreateRoom ? '#279EFF' : 'white',
                                color: showCreateRoom ? 'white' : '#0C356A',
                                border: `2px solid ${showCreateRoom ? '#279EFF' : 'white'}`   }
                        }
                        className="text-[#0C356A] text-[20px] font-bold w-full py-2 rounded-tr-lg border-2 border-l-0  border-[#279EFF]"
                        onClick={() => {
                            setShowCreateRoom(true);
                            setShowJoinRoom(false);
                        }}
                    >
                        Create Room
                    </button>
                </div>
            </div>
            <div className="w-fit p-6 rounded-b-2xl bg-[#279EFF]">

                <div style={{ display: showJoinRoom ? 'block' : 'none' }} className="flex flex-col items-center w-[400px]">
                    {showJoinRoom && (
                        <div>
                            <form onSubmit={handleJoinSubmit}>
                                <div className="form-group mb-2">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        className="text-[#0C356A] text-[15px] font-bold w-full mx-auto px-4 py-2 rounded-lg border-2 border-grey-500"
                                        value={joinName}
                                        onChange={(e) => setJoinName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group my-2">
                                    <input
                                        type="text"
                                        className="text-[#0C356A] text-[15px] font-bold w-full mx-auto px-4 py-2 rounded-lg border-2 border-grey-500"
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
                                        className="text-[#0C356A] text-[20px] font-bold w-full mx-auto p-2 rounded-lg bg-[#40F8FF]">
                                        Join Room
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                <div style={{ display: showCreateRoom ? 'block' : 'none' }} className="flex flex-col items-center w-[400px]">

                    {showCreateRoom && (
                        <div>
                            <form onSubmit={handleCreateSubmit}>
                                <div className="form-group mb-2">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="text-[#0C356A] text-[15px] font-bold w-full mx-auto px-4 py-2 rounded-lg border-2 border-grey-500"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                </div>
                                <div className="w-full my-2">
                                    <div className="flex flex-row text-[15px] bg-white font-bold pl-4 pr-2 py-2 rounded-lg border-2 border-grey-500">
                                        <input
                                            type="text"
                                            className="text-[#0C356A] w-[400px]"
                                            value={roomId}
                                            readOnly={true}
                                            style={{
                                            boxShadow: "none",
                                            zIndex: "0 !important",
                                            fontsize: "0.89rem !important",
                                            }}
                                        />
                                        <div className="w-[20px]">
                                            <CopyToClipboard
                                                text={roomId}
                                                onCopy={() => toast.success("Room Id Copied To Clipboard!")}
                                                >
                                                <button
                                                    className="btn btn-outline-dark border-0 btn-sm"
                                                    type="button"
                                                >
                                                    <img 
                                                        className="text-[#0C356A] w-[15px] h-[15px]"
                                                        src={logo}
                                                        alt="Logo"
                                                    />
                                                </button>
                                            </CopyToClipboard>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-row mt-5 gap-6">
                                    <div className="w-[200px]">
                                        <button
                                            className="text-[#0C356A] text-[20px] font-bold w-full mx-auto py-2 rounded-lg bg-[#40F8FF]"
                                            type="button"
                                            onClick={() => setRoomId(uuid())}
                                            >
                                            Generate
                                        </button>
                                    </div>
                                    <div className="w-[200px]">
                                        <button
                                            type="submit"
                                            className="text-[#0C356A] text-[20px] font-bold w-full mx-auto py-2 rounded-lg bg-[#40F8FF]">
                                            Create Room
                                        </button>
                                    </div>
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