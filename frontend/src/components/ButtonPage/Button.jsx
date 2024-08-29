import React from "react";
import ButtonPage from "./index";

const Button = ({type,nameButton,colorButton, sizeButton,handleOnclick}) => {
    return (
        <ButtonPage type={type} nameButton={nameButton} outlineButton={false} colorButton={colorButton} typeButton={""} sizeButton={sizeButton} handleOnclick={handleOnclick}  />
    )
}

export default Button;