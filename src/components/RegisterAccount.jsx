import styled from "@emotion/styled";
import { Button } from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleRegistration } from "../utils/FirebaseFunctions";
import { Link } from "react-router-dom";
export const TextField = styled(MuiTextField)((props) => ({
  width: "100%",
  [`& fieldset`]: {
    borderRadius: "15px",
  },
}));
const RegisterAccount = () => {
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [Err, setErr] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (FormData.password != FormData.confirmPassword) {
      setErr("The password and confirmation password do not match.");
    } else {
      setErr(null);
    }
  }, [FormData]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (FormData.mobile.length !== 10) {
      setErr("Phone number should be 10 digits.");
      return;
    }

    handleRegistration(FormData)
      .then((user) => {
        console.log(user);

        navigate("/student-dashboard?newUser=true");
      })
      .catch((err) => {
        setErr(err.message.split(": ")[1]);
      });
  };

  return (
    <div
      className="RegisterAccount flex flex-col gap-5 items-center 
      border-solid border-gray-500 px-3 lg:px-4 py-5 mx-4 lg:mx-12 rounded-3xl
      border-2 shadow-[0px_20px_20px_10px_#00000024] bg-opacity-20
    "
    >
      <p className="Slogan text-sm lg:text-xl text-center">
        Register your account
      </p>
      <form
        action=""
        className=" flex flex-col gap-5 w-full"
        onSubmit={(e) => {
          e.preventDefault();

          handleRegistration(FormData)
            .then((user) => {
              console.log(user);

              navigate("/student-dashboard?newUser=true");
            })
            .catch((err) => {
              setErr(err.message.split(": ")[1]);
            });
        }}
      >
        <TextField
          variant="outlined"
          label="Full Name"
          required
          value={FormData.name}
          onChange={(e) => setFormData({ ...FormData, name: e.target.value })}
        />
        <TextField
          variant="outlined"
          label="E-mail"
          type="email"
          required
          value={FormData.email}
          onChange={(e) => setFormData({ ...FormData, email: e.target.value })}
        />
        <TextField
          variant="outlined"
          label="Phone No."
          type="tel"
          required
          value={FormData.mobile}
          onChange={(e) => {
            const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
            if (input.length <= 10) {
              setFormData({ ...FormData, mobile: input });
            }
          }}
        />
        <TextField
          variant="outlined"
          label="Password"
          type="password"
          required
          value={FormData.password}
          onChange={(e) =>
            setFormData({ ...FormData, password: e.target.value })
          }
        />
        <TextField
          variant="outlined"
          label="Confirm Password"
          type="password"
          required
          value={FormData.confirmPassword}  
          onChange={(e) =>
            setFormData({ ...FormData, confirmPassword: e.target.value })
          }
        />
        <p className="text-red-600">{Err}</p>
        <Button variant="contained" type="submit">
          REGISTER
        </Button>
        <p className="text-center cursor-pointer">
              If already have a registered account please{" "}
              <Link to="/citizen-login" className="text-blue-600">sign in</Link>
            </p>
      </form>
    </div>
  );
};

export default RegisterAccount;
