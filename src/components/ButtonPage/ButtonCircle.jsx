import React from "react";
import ButtonPage from "./index";

const ButtonCircle = ({
  nameButton,
  colorButton,
  sizeButton,
  handleOnclick,
}) => {

  return (
    <>
        <ButtonPage
          nameButton={nameButton}
          outlineButton={false}
          colorButton={colorButton}
          typeButton={"circle"}
          sizeButton={sizeButton}
          handleOnclick={handleOnclick}
        />
    </>
  );
};

export default ButtonCircle;
