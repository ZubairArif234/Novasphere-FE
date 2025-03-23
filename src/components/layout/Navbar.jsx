
import { Avatar, Button, Divider, Menu, Modal } from "@mantine/core";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { RiLogoutCircleLine, RiLogoutCircleRLine } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"))


  const handleLogout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")
    navigate("/");
  };

  return (
    <div className="cursor-pointer">
      <Menu shadow="md" width={200} radius={10} position="bottom-end">
        <Menu.Target>
          <Avatar size={"lg"}  alt="no image here" />
        </Menu.Target>

        <Menu.Dropdown>
        
            <div className="p-2">
              <p className="text-[#687CAD] mb-0 text-xl">{user?.firstName + " " + user?.lastName}</p>
              <p className="text-slate-600">{user?.email}</p>
            </div>
          
         
          <Divider my={10} />
          <div className="flex justify-center p-2 ">
            <Button
              size="md"
              color="red"
              w={"100%"}
              onClick={handleLogout}
            >
              <RiLogoutCircleRLine size={18} className="me-2" /> Logout
            </Button>
          </div>
        </Menu.Dropdown>
      </Menu>

    </div>
  );
};

const Navbar = () => {
  return (
    <div className="bg-cyan-50 p-4  rounded-xl flex justify-between items-center"> <p className=" font-bold text-5xl text-center  bg-gradient-to-r from-zinc-500 to-cyan-500 bg-clip-text text-transparent">KanBan</p> <ProfileMenu/> </div>
  )
}

export default Navbar