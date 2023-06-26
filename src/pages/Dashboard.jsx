import Profile from "../components/Profile";
import Upload from "../components/Upload";

const Dashboard = () => {
  return (
    <>
      <div className=" min-h-screen bg-base-200">
        <div className="grid grid-cols-1 md:grid-cols-[30%_70%] px-6 py-6 gap-4">
          <div className="card w-full bg-base-100 shadow-md p-4 md:p-6">
            <Profile />
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
