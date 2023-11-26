import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FiUsers } from 'react-icons/fi';

const ClientRoom = ({ userNo, socket, setUsers, setUserNo }) => {
    const imgRef = useRef(null);
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
    useEffect(() => {
            socket.on("canvasImage", (data) => {
            imgRef.current.src = data;
        });
    }, []);
    return (
        <div className="container-fluid">
            <div className="ml-auto text-[#0C356A] px-10 py-6 w-full bg-[#40F8FF]">
                <div className="flex felx-row justify-center items-center text-[#0C356A]">
                    <FiUsers size={27} />
                    &nbsp;&nbsp;
                    <h1>
                        {userNo}
                    </h1>
                </div>
            </div>
            <div className="">
                <div
                className="col-md-8 overflow-hidden border border-dark mx-4 mt-4"
                style={{ height: "750px" }}
                >
                    <img className="w-100 h-100 bg-white" ref={imgRef} src="" alt="image" />
                </div>
            </div>
        </div>
    );
};

export default ClientRoom;