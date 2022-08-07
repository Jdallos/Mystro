import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/LoginButtonStyles.css";
import { ReduxState } from "../types/schema";
import { storeLogin } from "../redux/mystroSlice";

const LoginButton: React.FC = () => {

  const dispatch = useDispatch();
  const { userName } = useSelector((state: ReduxState) => state.mystro.login.userData);
  // Below is useful for DB debugging
  // const login = useSelector((state: ReduxState) => state.mystro.login);
  // console.log(login)

  return (
    <div>
      {userName === "" ? (
        <div className="LoginScreenProfile">
          <Link className="LoginScreenButton" to="/login">
            Login/ Register
          </Link>
        </div>
      ) : (
        <div className="LoginScreenProfile">
          <p className="profileIcon">Welcome {userName}</p>
          <button onClick={() => dispatch(storeLogin({userData: { userName: "", userId: 0}}))}>Sign Out</button>
        </div>
      )}
    </div>
  );
};

export default LoginButton;
