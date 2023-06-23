import { UserAuth } from "../context/AuthContext";
import { MdEdit, MdWork } from "react-icons/md";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaLocationArrow } from "react-icons/fa";
const Profile = (devData) => {
  const { currentUser } = UserAuth();
  console.log(devData.devData);
  const userData = devData?.devData;

  return (
    <>
      <div className="flex flex-col gap-4 justify-start">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-12 mask mask-squircle">
              <img src={currentUser?.photoURL} alt="avatar" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-xl">{userData?.name}</span>
            <span className="">{userData?.email}</span>
          </div>
        </div>
        <hr />
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-3 font-semibold">
            <MdWork />
          </span>

          <span className="font-semibold">{userData?.role}</span>
        </div>

        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-3 font-semibold">
              <FaLocationArrow />
            </span>

            <span className="font-semibold">
              {userData?.linkedin ? userData?.Location : "Location"}
            </span>
          </div>

          <div>
            <MdEdit />
          </div>
        </div>

        <hr />

        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-3 font-semibold">
              <BsLinkedin />
            </span>

            <span className="font-semibold">
              {userData?.linkedin ? userData?.linkedin : "LinkedIn Profile"}
            </span>
          </div>

          <div>
            <MdEdit />
          </div>
        </div>

        <div className="flex items-center gap-4 justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-3 font-semibold">
              <BsGithub />
            </span>

            <span className="font-semibold">
              {userData?.linkedin ? userData?.Github : "Github Profile"}
            </span>
          </div>

          <div>
            <MdEdit />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
