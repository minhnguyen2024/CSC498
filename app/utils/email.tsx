import * as React from "react";
import { Html } from "@react-email/html";
import { Button } from "@react-email/button";
type EmailProps = {
  username: string;
  password: string;
};

export const Email: React.FC<EmailProps> = ({username, password}) => {
  return <Html lang="en">
    <h1>An ROWL account associated with this email address.</h1>
    <p>Your username is: <p className="text-bold">{username}</p></p>
    <p>Your temporary password is: <p className="text-bold">{password}</p></p>
    <p>Please visit <p className="text-bold">localhost:3000/resetPassword</p> to reset your password</p>
  </Html>;
};
