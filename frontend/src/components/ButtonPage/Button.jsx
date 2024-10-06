import React from "react";
import ButtonPage from "./index";

const Button = ({
  type,
  nameButton,
  colorButton,
  sizeButton,
  handleOnclick,
  isDisabled,
}) => {
  return (
    <ButtonPage
      type={type}
      nameButton={nameButton}
      outlineButton={false}
      colorButton={colorButton}
      typeButton={""}
      sizeButton={sizeButton}
      handleOnclick={handleOnclick}
      isDisabled={isDisabled}
    />
  );
};

export default Button;
