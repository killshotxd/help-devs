import Profile from "../components/Profile";
import Upload from "../components/Upload";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [devData, setDevData] = useState();
  console.log(devData?.name);

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
      console.log(data);
      setDevData(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDevs();
  }, []);
  return (
    <>
      <div className=" min-h-screen bg-base-200">
        <div className="grid grid-cols-1 md:grid-cols-[30%_70%] px-6 py-6 gap-4">
          <div className="card w-full bg-base-100 shadow-md p-4 md:p-6">
            <Profile devData={devData} />
          </div>

          <div className="card w-full bg-base-100 shadow-md p-4 md:p-6">
            <Upload />
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Dashboard;
