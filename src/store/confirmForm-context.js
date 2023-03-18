import React from "react";

const ConfirmFormContext = React.createContext({
  name: "",
  setName: () => {},
  phoneNumber: "",
  setPhoneNumber: () => {},
  callMe: "0",
  setCallMe: () => {},
});

export default ConfirmFormContext;
