import { useEffect, useState } from "react";

import stylesLocal from "./ConfirmWindow.module.css";
import stylesGlobal from "../CartModal.module.css";

function ConfirmWindow({ setConfirmIsOpen }) {
  const shiftBack = function () {
    setConfirmIsOpen(false);
    setIsShifted(false);
  };

  const [isShifted, setIsShifted] = useState(false);

  useEffect(() => {
    setIsShifted(true);
  }, []);

  return (
    <div className={`${stylesGlobal.modal} ${isShifted ? "" : stylesLocal.modal_invisible}`}>
      <button className={`button ${stylesGlobal.button} ${stylesGlobal.submit}`} type="submit">
        Confirm
      </button>
      <button className={`button ${stylesGlobal.button} ${stylesGlobal.close}`} type="button" onClick={shiftBack}>
        Back to the order list
      </button>
    </div>
  );
}

export default ConfirmWindow;
