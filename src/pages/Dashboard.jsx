import { useState } from "react";
import MyCodes from "../components/MyCodes";
import Profile from "../components/Profile";
import Upload from "../components/Upload";

const Dashboard = () => {
  const [isCodeUploaded, setIsCodeUploaded] = useState(false);
  console.log(isCodeUploaded);

  return (
    <>
      <div className=" min-h-screen bg-base-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 py-6 gap-4">
          <div className="card w-full bg-base-100 shadow-md p-4 md:p-6">
            <Profile />
          </div>

          <div className="card w-full bg-base-100 shadow-md p-4 md:p-6">
            <Upload onCodeUploaded={() => setIsCodeUploaded(true)} />
          </div>
          <div className="card w-full bg-base-100 shadow-md p-4 md:p-6">
            <MyCodes
              onCodeUploaded={() => setIsCodeUploaded(false)}
              {...{ isCodeUploaded }}
            />
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Dashboard;
