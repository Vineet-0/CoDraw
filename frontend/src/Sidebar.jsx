import React, { useRef } from 'react';

const Sidebar = ({ users, user, socket }) => {
  const sideBarRef = useRef(null);

  const openSideBar = () => {
    sideBarRef.current.style.left = 0;
  };
  const closeSideBar = () => {
    sideBarRef.current.style.left = '-100%';
  };
  return (
    <div className="flex flex-row">
      <button
        className="bg-red-500 text-white font-bold px-3 py-1 rounded-md"
        onClick={openSideBar}
        style={{ position: 'absolute', top: '21px', left: '40px' }}
      >
        Users
      </button>
      <div
        className="fixed pt-2 h-full bg-[#0C356A]"
        ref={sideBarRef}
        style={{
          width: '250px',
          left: '-100%',
          transition: '0.3s linear',
          zIndex: '9999',
        }}
      >
        <div className=' ml-[25px] mt-[13px]'>
          <button
            className="bg-red-500 text-white w-[200px] font-bold px-3 py-1 rounded-md"
            onClick={closeSideBar}
          >
            Close
          </button>
        </div>
        
        <div className="w-full mt-5">
          {users.map((usr, index) => (
            <p key={index} className="text-white text-center py-2">
              {usr.username}
              {usr.id === socket.id && ' - (You)'}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;