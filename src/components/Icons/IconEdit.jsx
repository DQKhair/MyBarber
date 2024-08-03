import React from "react";
import { MdModeEdit } from "react-icons/md";

const IconEdit = ({onClick}) =>{
    const size = "20px"
    const color = "white"
    return (
        <>
            <MdModeEdit color={color} size={size} onClick={onClick} />
        </>
    );
}

export default IconEdit;