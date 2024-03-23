import IMAGES from "@/assets/images/Images";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ErrorStyle from "./ErrorStyle";
// import { registerUser } from "@/api/auth";
import toast from "react-hot-toast";
import { loginUser } from "@/api/auth";
import { setAccessToken, setUser } from "@/store/slices/userSlice";

const AuthForm = ({ isLogin }) => {
  const { darkMode, menuOpen } = useSelector((state) => state.ui);

  const googleAuth = () => {
    window.open(`http://localhost:8080/auth/google/callback`, "_self");
  };

  const initialValues = {
    name: "",
    email: "",
    phone_num: "",
    password: "",
    c_password: "",
  };

  const AuthSchema = Yup.object({
    name: isLogin ? null : Yup.string()
      .min(3, "Name must have at least 3 characters.")
      .required("Name is required."),
    email: Yup.string()
      .required("Email is required.")
      .email("Please enter valid email."),
    password: Yup.string()
      .min(3, "Password must have at least 3 characters.")
      .required("Password is required."),    
    c_password: isLogin ? null : Yup.string()
      .required("Please re-type your password.")
      .oneOf([Yup.ref("password")], "Passwords does not match."), 
  })

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onSubmitHandler = async (values) => {
    if(!isLogin) {
      try {
        const response = await registerUser(values);
        if(response.success) {
          toast.success(response.message);
          navigate("/login");
        } else {
          throw new Error(response.message)
        }
      } catch (err) {
        toast.error(err.message);
      }
    } else {
      try {
        const response = await loginUser(values);
        console.log(response);
        if(response.success) {
          dispatch(setUser(response.userDoc));
          dispatch(setAccessToken(response.token));
          localStorage.setItem("token", response.token);
          localStorage.setItem("user", JSON.stringify(response.userDoc));
          toast.success(response.message);
          navigate("/");
        } else {
          throw new Error(response.message)
        }
      } catch (err) {
        toast.error(err.message);
      }
    }
  };

  return (
    <div
      className={`${
        menuOpen ? "ml-[30%]" : "mx-auto"
      } border w-[40%] 2xl:w-[25%] mt-[7%] px-8 rounded-md`}
    >
      <Formik initialValues={initialValues} validationSchema={AuthSchema} onSubmit={onSubmitHandler}>
        {({ errors, touched, values }) => (
          <Form>
            <h2 className=" font-semibold text-2xl text-center my-8">
              {isLogin ? "Login" : "Register"}
            </h2>
            {!isLogin && (
              <div className="my-6">
                <Field
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="border py-2 w-full rounded-md px-2 dark:bg-[#4d4d4d]"
                />
                <ErrorStyle>
                  <ErrorMessage name="name" />
                </ErrorStyle>
              </div>
            )}
            <div className="my-6">
              <Field
                name="email"
                id="email"
                placeholder="Email"
                className="border py-2 w-full rounded-md px-2 dark:bg-[#4d4d4d]"
              />
              <ErrorStyle>
                  <ErrorMessage name="email" />
                </ErrorStyle>
            </div>
            {!isLogin && (
              <div className="my-6">
                <Field
                  type="text"
                  name="phone_num"
                  id="phone_num"
                  placeholder="Phone Number"
                  className="border py-2 w-full rounded-md px-2 dark:bg-[#4d4d4d]"
                />
                <ErrorStyle>
                  <ErrorMessage name="phone_num" />
                </ErrorStyle>
              </div>
            )}
            <div className="my-6">
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="border py-2 w-full rounded-md px-2 dark:bg-[#4d4d4d]"
              />
              <ErrorStyle>
                  <ErrorMessage name="password" />
                </ErrorStyle>
            </div>
            {!isLogin && (
              <div className="my-6">
                <Field
                  type="password"
                  name="c_password"
                  id="c_password"
                  placeholder="Confirm Password"
                  className="border py-2 w-full rounded-md px-2 dark:bg-[#4d4d4d]"
                />
                <ErrorStyle>
                  <ErrorMessage name="c_password" />
                </ErrorStyle>
              </div>
            )}
            {isLogin && (
              <p className="text-[#4777c4] text-center">Forgot Password?</p>
            )}
            <div className="my-6">
              <button type="submit" className="border py-2 w-full rounded-md px-2 bg-[#0E5DDD] text-white hover:bg-[#4779c9]">
                {isLogin ? "Login" : "Register"}
              </button>
            </div>
            {isLogin ? (
              <p className="text-center mb-8">
                Don't have an account?{" "}
                <Link to="/register">
                  <span className="text-[#4777c4] ml-2">Sign up</span>
                </Link>
              </p>
            ) : (
              <p className="text-center mb-8">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="text-[#4777c4] ml-2">Log in</span>
                </Link>
              </p>
            )}
          </Form>
        )}
      </Formik>

      <hr />
      <div className="my-8">
        <button
          className="border py-2 w-full rounded-md px-2 flex gap-20 pl-4"
          onClick={googleAuth}
        >
          <img src={IMAGES.googleLogo} />
          Login with google
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
