import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import EyeIcon from "mdi-react/EyeIcon";
import KeyVariantIcon from "mdi-react/KeyVariantIcon";
import AccountOutlineIcon from "mdi-react/AccountOutlineIcon";
import { loginUser } from "../../../store/Auth/actions";

function LogInForm() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState("password");
  const changePasswordState = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: true,
    },
    validationSchema: LoginSchema,
    onSubmit: async (values) => {
      console.log("values of login form", values);
      await dispatch(
        loginUser({
          email: values.email,
          password: values.password,
        })
      );
    },
  });

  return (
    <>
      <Form className="form login-form" onSubmit={loginFormik.handleSubmit}>
        <div className="form__form-group">
          <span className="form__form-group-label">Username</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Input
              className="input-without-border-radius"
              name="email"
              label="Email"
              value={loginFormik.values.email}
              onChange={loginFormik.handleChange}
              placeholder="Enter Email"
              type="text"
            />
          </div>
          {loginFormik.touched.email && loginFormik.errors.email ? (
            <div className="text-start mb-1 text-danger">
              {loginFormik.errors.email}
            </div>
          ) : null}
        </div>
        <div className="form__form-group">
          <span className="form__form-group-label">Password</span>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <Input
              className="input-without-border-radius"
              name="password"
              label="Password"
              value={loginFormik.values.password}
              onChange={loginFormik.handleChange}
              placeholder="Enter Password"
              type={showPassword}
            />

            <button
              type="button"
              className={`form__form-group-button${
                showPassword == "text" ? " active" : ""
              }`}
              onClick={changePasswordState}
            >
              <EyeIcon />
            </button>
          </div>
          {loginFormik.touched.password && loginFormik.errors.password ? (
            <div className="text-start mb-1 text-danger">
              {loginFormik.errors.password}
            </div>
          ) : null}
        </div>
        <div className="form__form-group">
          <div className="form__form-group form__form-group-field"></div>
        </div>
        <div className="account__btns">
          <Button className="account__btn" type="submit" color="primary">
            Sign In
          </Button>
        </div>
      </Form>
    </>
  );
}

export default LogInForm;
