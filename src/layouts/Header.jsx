import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Header = () => {
  const { currentUser, logout, signInGoogle } = UserAuth();

  const [devData, setDevData] = useState();

  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      await signInGoogle();
      // setTimeout(() => {
      //   localStorage.setItem("id", devData._id);
      //   localStorage.setItem("dev", devData.dev);
      // }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem("id");
      localStorage.removeItem("uid");
      localStorage.removeItem("dev");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDevs = async () => {
    const id = localStorage.getItem("uid");
    try {
      const res = await fetch(
        `https://enchanting-pink-reindeer.cyclic.app/register/${id}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();
      setDevData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDevs();
    if (devData?._id) {
      localStorage.setItem("id", devData?._id);
      localStorage.setItem("dev", devData?.dev);
    } else return;
  }, [currentUser, devData]);
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a
            onClick={() => {
              navigate("/");
            }}
            className="btn btn-ghost normal-case text-2xl font-bold"
          >
            Help-Devs
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {currentUser ? (
              <>
                <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
                  <label tabIndex={0} className="avatar online">
                    <div className="w-12 rounded-full">
                      <img src={currentUser.photoURL} />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <a>{currentUser.displayName}</a>
                    </li>
                    {devData?.dev == true && currentUser ? (
                      <li>
                        <a onClick={() => navigate("/dashboard")}>Dashboard</a>
                      </li>
                    ) : (
                      ""
                    )}
                    <li>
                      <a onClick={handleLogout}>Logout</a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <li>
                <p
                  onClick={() => {
                    handleSignIn();
                  }}
                  className=" font-bold"
                >
                  Login
                </p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
