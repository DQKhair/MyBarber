import React from "react";
import ButtonPage from "./index";

const Button = ({nameButton,colorButton, sizeButton,handleOnclick}) => {
    return (
        <ButtonPage nameButton={nameButton} outlineButton={false} colorButton={colorButton} typeButton={""} sizeButton={sizeButton} handleOnclick={handleOnclick}  />
    )
}

export default Button;