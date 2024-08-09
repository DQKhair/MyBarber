import React, { useState, useEffect } from "react";
import Tooltip from '@mui/material/Tooltip';

const ButtonPage = ({type = "button",nameButton,outlineButton,colorButton,typeButton,sizeButton,titleButton,handleOnclick}) => {

    const [colorButtonState,setColorButtonState] = useState("btn-gradient-dark");
    const [typeButtonState, setTypeButtonState] = useState("");
    const [sizeButtonState,setSizeButtonState] = useState("lg");

    useEffect(() => {
        let colorState = "btn-gradient-dark";
        if (outlineButton) {
            colorState = colorButton === "yellow" ? "btn-outline-gradient-warning" :
                         colorButton === "red" ? "btn-outline-gradient-danger" :
                         colorButton === "blue" ? "btn-outline-gradient-info" : "btn-outline-gradient-dark";
        } else {
            colorState = colorButton === "yellow" ? "btn-gradient-warning" :
                         colorButton === "red" ? "btn-gradient-danger" :
                         colorButton === "blue" ? "btn-gradient-info" : "btn-gradient-dark";
        }
        setColorButtonState(colorState);

        const typeState = typeButton === "circle" ? "btn-rounded" : "";
        setTypeButtonState(typeState);

        const sizeState = sizeButton === "sm" ? "btn-sm" :
                          sizeButton === "md" ? "btn-md" : "btn-lg";
        setSizeButtonState(sizeState);
    }, [outlineButton, colorButton, typeButton, sizeButton]);

    
    return (
        <>
         <Tooltip title={titleButton} placement="top">
            <button type={type} onClick={handleOnclick} className = {`btn btn-block ${sizeButtonState } ${colorButtonState} ${typeButtonState} mx-1`}>{nameButton}</button>
         </Tooltip>
        </>
    );
}

export default ButtonPage;