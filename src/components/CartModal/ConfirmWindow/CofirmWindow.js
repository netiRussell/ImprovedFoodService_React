import { useEffect, useState } from "react";

import stylesLocal from "./ConfirmWindow.module.css";
import stylesGlobal from "../CartModal.module.css";

function ConfirmWindow({ setConfirmIsOpen, totalAmount }) {
  const shiftBack = function () {
    setConfirmIsOpen(false);
    setIsShifted(false);
  };

  const [isShifted, setIsShifted] = useState(false);

  useEffect(() => {
    setIsShifted(true);
  }, []);

  /* 
    Name validation - only when clicked the submit button to check if it is empty or not
    Phone number validation - only when clicked the submit button to check if it has enough digits
    Call me validation - only when clicked the submit button to check if one of the options is selected

    whenever the input is changed(try focus as well - onBlur), red backgraound color should disappear leaving regular stylings.
  */

  return (
    <form className={`${stylesGlobal.modal} ${stylesGlobal.wrapper_gap} ${isShifted ? "" : stylesLocal.modal_invisible}`}>
      <div className={`${stylesLocal.wrapper} ${stylesGlobal.wrapper_gap}`}>
        <label className={stylesLocal.label}>
          <p>Name:</p>
          <input type="text" name="name" className={stylesLocal.input_text} required />
        </label>

        <label className={stylesLocal.label}>
          <p>Phone number:</p> <input type="text" name="phoneNumber" className={stylesLocal.input_text} required />
        </label>

        <div className={stylesLocal.call_me}>
          <p>Would you like us to call you when the order is ready?</p>
          <label>
            <input type="radio" name="callMe" value="true" required /> Yes
          </label>
          <label>
            <input type="radio" name="callMe" value="false" selected="selected" required /> No
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
