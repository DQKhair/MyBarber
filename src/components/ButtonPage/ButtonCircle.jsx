import React from "react";
import ButtonPage from "./index";

const ButtonCircle = ({
  nameButton,
  colorButton,
  sizeButton,
  titleButton = "",
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
          titleButton={titleButton}
          handleOnclick={handleOnclick}
        />
    </>
  );
};

export default ButtonCircle;
