import React from "react";
import InputMask from "react-text-mask";
import "./styles.css";

const Input = ({ changeWidth, label, name, maskBoolean, ...rest }) => {
  const mask = [
    "(",
    /\d/,
    /\d/,
    /\d/,
    ")",
    " ",
    /\d/,
    /\d/,
    /\d/,
    "-",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
  ];
  // const InputWhatsapp = (props) => {
  //   const mask = [
  //     "(",
  //     /\d/,
  //     /\d/,
  //     /\d/,
  //     ")",
  //     " ",
  //     /\d/,
  //     /\d/,
  //     /\d/,
  //     "-",
  //     /\d/,
  //     /\d/,
  //     /\d/,
  //     /\d/,
  //   ];
  //   return (
  //     <InputMask guide mask={mask} {...props} placeholder="(___) ___-____" />
  //   );
  // };
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      {!maskBoolean && (
        <input style={{ width: changeWidth }} type="text" id={name} {...rest} />
      )}
      {maskBoolean && (
        <InputMask
          guide
          mask={mask}
          id={name}
          {...rest}
          placeholder="(___) ___-____"
        />
      )}
    </div>
  );
};

export default Input;
