import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterAccount from "../components/RegisterAccount";
import { auth } from "../utils/Firebase";
import { isOfficial } from "../utils/FirebaseFunctions";
import OK from "/src/assets/ok1.png";
import Navbar from "/src/components/Navbar";
const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user && !isOfficial(user.uid)) {
        navigate("/student-dashboard");
      } else if (user && isOfficial(user.uid)) {
        navigate("/official-dashboard");
      }
    });
  }, []);
  return (
    <div className="HomePage">
      <Navbar />
      <div className="HomeContainer grid grid-cols-1 lg:grid-cols-2 items-center px-14 lg:px-20">
        <img
          className="mx-100 hidden lg:block h-[32rem] ml-15 mt-75"
          src={OK}
          alt=""
          style={{width:"550px",height:"500px",marginLeft:"50px",marginTop:"75px",borderRadius:"10px"}}
        />
        <div>
          <h3 className="slogan mt-[25%] lg:mt-0 leading-normal font-bold text-center text-base lg:text-[2rem] mb-5">
          Speak Up, Shape Up: Your Voice, Your College, Your Future!
          </h3>
          <RegisterAccount/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
