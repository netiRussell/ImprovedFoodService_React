import { useEffect, useState, useContext, useCallback } from "react";

import stylesLocal from "./ConfirmWindow.module.css";
import stylesGlobal from "../CartModal.module.css";

import ConfirmFormContext from "../../../store/confirmForm-context";
import CartContext from "../../../store/cart-context";

function ConfirmWindow({ setConfirmIsOpen, totalAmount }) {
  const [isShifted, setIsShifted] = useState(false);
  const [nameIncorrect, setNameIncorrect] = useState(false);
  const [phoneIncorrect, setPhoneIncorrect] = useState(false);

  const contextForm = useContext(ConfirmFormContext);
  const nameValue = contextForm.nameConfirmForm;
  const phoneValue = contextForm.phoneConfirmForm;
  const callMeValue = contextForm.callMeConfirmForm;

  const contextCart = useContext(CartContext);

  useEffect(() => {
    setIsShifted(true);
  }, []);

  const shiftBack = function () {
    setConfirmIsOpen(false);
    setIsShifted(false);
  };

  const sendData = useCallback(
    async function () {
      const dataToSend = { name: nameValue, phoneNumber: phoneValue, callMe: callMeValue, orderData: contextCart.cartItems };

      try {
        await fetch("https://foodservice-905ba-default-rtdb.firebaseio.com/orders.json", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }).then((request) => {
          if (!request.ok) throw new Error("There was an error: " + request.status);

          return request.json();
        });

        return false;
      } catch (error) {
        return error;
      }
    },
    [callMeValue, nameValue, phoneValue, contextCart.cartItems]
  );

  const fetchData = useCallback(async function () {
    try {
      const request = await fetch("https://foodservice-905ba-default-rtdb.firebaseio.com/orders.json").then((request) => {
        if (!request.ok) throw new Error("There was an error: " + request.status);

        return request.json();
      });
      const data = [];

      for (const element in request) {
        if (element != null) {
          data.push({
            id: element,
            name: request[element].name,
            phoneNumber: request[element].phoneNumber,
            callMe: request[element].callMe,
            orderData: request[element].orderData,
          });
        }
      }

      return data;
    } catch (error) {
      return error;
    }
  }, []);

  const submitOrder = async function (event) {
    event.preventDefault();
    let formIsValid = true;

    if (nameValue.trim() === "") {
      formIsValid = false;
      setNameIncorrect(true);
    }

    const phoneValueAdopted = phoneValue.trim();
    const testPattern = /[A-Za-z]/;
    if (phoneValueAdopted.trim() === "" || phoneValueAdopted.length < 10 || phoneValueAdopted.length > 14 || testPattern.test(phoneValueAdopted)) {
      // +1() considered
      setPhoneIncorrect(true);
      formIsValid = false;
    }

    if (formIsValid) {
      // Loading phase
      shiftBack();
      contextCart.setOrderStatus("Loading...");
      const responseIsInvalid = await sendData();
      console.log(await fetchData());

      // Reseting phase
      contextCart.cartStateDispatch({ type: "REMOVE_ALL_ITEMS" });
      contextCart.setAllItems((prevValue) =>
        prevValue.map((value) => {
          value.status = "default";
          value.amount = 1;

          return value;
        })
      );

      // Output phase
      if (responseIsInvalid) {
        contextCart.setOrderStatus(responseIsInvalid.message);
        return;
      }
      contextCart.setOrderStatus("Thank you! Your order has been placed. Though it doesn't mean you cannot continue shoping with us ;)");
    }
  };

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
              contextForm.setNameConfirmForm(event.target.value);
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
              contextForm.setPhoneConfirmForm(event.target.value);
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
                contextForm.setCallMeConfirmForm(event.target.value);
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
                contextForm.setCallMeConfirmForm(event.target.value);
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
