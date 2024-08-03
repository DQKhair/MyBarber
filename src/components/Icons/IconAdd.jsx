import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

const IconAdd = ({onClick}) =>{
    const size = "20px"
    const color = "white"
    return (
        <>
            <IoIosAddCircleOutline color={color} size={size} onClick={onClick} />
        </>
    );
}

export default IconAdd;