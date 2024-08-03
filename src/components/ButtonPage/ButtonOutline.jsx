import React from "react";
import ButtonPage from "./index";

const ButtonOutline = ({nameButton,colorButton, sizeButton,handleOnclick}) => {
    return (
        <ButtonPage nameButton={nameButton} outlineButton={true} colorButton={colorButton} typeButton={""} sizeButton={sizeButton} handleOnclick={handleOnclick}  />
    )
}

export default ButtonOutline;