import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

const IconDetail = ({onClick}) =>{
    const size = "20px"
    const color = "white"
    return (
        <>
            <IoMdInformationCircleOutline color={color} size={size} onClick={onClick} />
        </>
    );
}

export default IconDetail;