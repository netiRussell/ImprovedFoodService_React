import { useEffect, useState, useContext } from "react";

import stylesLocal from "./ConfirmWindow.module.css";
import stylesGlobal from "../CartModal.module.css";

import ConfirmFormContext from "../../../store/confirmForm-context";

function ConfirmWindow({ setConfirmIsOpen, totalAmount }) {
  const shiftBack = function () {
    setConfirmIsOpen(false);
    setIsShifted(false);
  };

  const [isShifted, setIsShifted] = useState(false);

  const [nameIncorrect, setNameIncorrect] = useState(false);
  const [phoneIncorrect, setPhoneIncorrect] = useState(false);

  const context = useContext(ConfirmFormContext);

  useEffect(() => {
    setIsShifted(true);
  }, []);

  const nameValue = context.nameConfirmForm;
  const phoneValue = context.phoneConfirmForm;
  const callMeValue = context.callMeConfirmForm;

  const submitOrder = function (event) {
    event.preventDefault();

    if (nameValue.trim() === "") {
      setNameIncorrect(true);
    }

    const phoneValueAdopted = phoneValue.trim();
    const testPattern = /[A-Za-z]/;
    if (phoneValueAdopted.trim() === "" || phoneValueAdopted.length < 10 || phoneValueAdopted.length > 14 || testPattern.test(phoneValueAdopted)) {
      // +1() considered
      setPhoneIncorrect(true);
    }
  };

  // ! next step :  send data to DB on submit and have an option to console.log all current orders

  return (
    <form className={`${stylesGlobal.modal} ${stylesGlobal.wrapper_gap} ${isShifted ? "" : stylesLocal.modal_invisible}`} onSubmit={submitOrder}>
      <div className={`${stylesLocal.wrapper} ${stylesGlobal.wrapper_gap}`}>
        <label className={stylesLocal.label}>
          <p>{nameIncorrect && <span className={stylesLocal.text_incorrect}>! </span>}Name:</p>
          <input
            type="text"
            name="name"
            className={`${stylesLocal.input_text} ${nameIncorrect ? stylesLocal.input_incorrect : ""}`}
            value={nameValue}
            onChange={(event) => {
              setNameIncorrect(false);
              context.setNameConfirmForm(event.target.value);
            }}
            required
          />
        </label>

        <label className={stylesLocal.label}>
          <p>{phoneIncorrect && <span className={stylesLocal.text_incorrect}>! </span>}Phone number:</p>{" "}
          <input
            type="text"
            name="phoneNumber"
            className={`${stylesLocal.input_text} ${phoneIncorrect ? stylesLocal.input_incorrect : ""}`}
            value={phoneValue}
            onChange={(event) => {
              setPhoneIncorrect(false);
              context.setPhoneConfirmForm(event.target.value);
            }}
            required
          />
        </label>

        <div className={stylesLocal.call_me}>
          <p>Would you like us to call you when the order is ready?</p>
          <label>
            <input
              type="radio"
              name="callMe"
              value="1"
              checked={callMeValue === "1"}
              onChange={(event) => {
                context.setCallMeConfirmForm(event.target.value);
              }}
              required
            />{" "}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="callMe"
              value="0"
              checked={callMeValue === "0"}
              onChange={(event) => {
                context.setCallMeConfirmForm(event.target.value);
              }}
              required
            />{" "}
            No
          </label>
        </div>
      </div>

      <button className={`button ${stylesGlobal.button} ${stylesGlobal.submit}`} type="submit">
        Confirm (${totalAmount.toFixed(2)})
      </button>
      <button className={`button ${stylesGlobal.button} ${stylesGlobal.close}`} type="button" onClick={shiftBack}>
        Back to the order list
      </button>
    </form>
  );
}

export default ConfirmWindow;
