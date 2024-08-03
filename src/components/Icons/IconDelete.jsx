import React from "react";
import { MdDelete } from "react-icons/md";

const IconDelete = ({onClick}) => {
    const size = "20px"
    const color = "white"
    return (
        <>
            <MdDelete color={color} size={size} onClick={onClick} />
        </>
    );
}

export default IconDelete;