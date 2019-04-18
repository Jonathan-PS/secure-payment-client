import React, { components } from "react";

const LogoutPage = props => {
  return (
    <div>
      {sessionStorage.removeItem("user_id")}
      {(window.location = "/")}
    </div>
  );
};

export default LogoutPage;
