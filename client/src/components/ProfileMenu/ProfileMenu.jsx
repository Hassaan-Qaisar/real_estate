import React from 'react'
import {Avatar, Menu} from '@mantine/core'
import { useNavigate } from 'react-router-dom';

export const ProfileMenu = ({user, logout}) => {

  const navigate = useNavigate()

  const onClickHandler = () => {
    localStorage.clear();
    logout();
  }
  return (
    <Menu>
        <Menu.Target>
            <Avatar src={user?.picture} alt='user image' radius={"xl"} />
        </Menu.Target>
        <Menu.Dropdown>
            <Menu.Item onClick={() => navigate("./favourites", {replace:true})} >
            Favourites
            </Menu.Item>

            <Menu.Item onClick={() => navigate("./bookings", {replace: true})}>
            Bookings
            </Menu.Item>

            <Menu.Item onClick={onClickHandler}>
            Logout
            </Menu.Item>
        </Menu.Dropdown>
    </Menu>
  )
}

