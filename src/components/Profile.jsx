import { UserAuth } from "../context/AuthContext";
import { MdEdit, MdWork } from "react-icons/md";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Dna } from "react-loader-spinner";
const Profile = () => {
  const { currentUser } = UserAuth();
  const [location, setLocation] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [devData, setDevData] = useState();
  const [loading, setLoading] = useState(false);
  const userData = devData;

  const fetchDevs = async () => {
    const id = localStorage.getItem("uid");
    try {
      setLoading(true);
      const res = await fetch(
        `https://enchanting-pink-reindeer.cyclic.app/register/${id}`,
        {
          method: "GET",
        }
      );

      const data = await res.json();

      setDevData(data?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleUpdateDetails = async () => {
    try {
      setLoading(true);
      const data = await fetch(
        `https://enchanting-pink-reindeer.cyclic.app/register/${userData?._id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            location: location == "" ? userData?.location : location,
            github: github == "" ? userData?.github : github,
            linkedin: linkedin == "" ? userData?.linkedin : linkedin,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await data.json();

      if (res.success) {
        toast.success("Profile Updated Successfully");
        fetchDevs();
        setLoading(false);
        window.my_modal_1.close();
        window.my_modal_2.close();
        window.my_modal_3.close();
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDevs();
  }, []);

  return (
    <>
      <Toaster />
      {loading ? (
        <div className="flex items-center justify-center">
          <Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      ) : (
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
                <MdLocationPin />
              </span>

              <span className="font-semibold">
                {userData?.location ? userData?.location : "Location"}
              </span>
            </div>

            <div className="hover:bg-cyan-200 rounded-md p-1">
              <MdEdit
                className="cursor-pointer"
                onClick={() => {
                  window.my_modal_1.showModal();
                }}
              />
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

            <div className="hover:bg-cyan-200 rounded-md p-1">
              <MdEdit
                className="cursor-pointer"
                onClick={() => {
                  window.my_modal_2.showModal();
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-3 font-semibold">
                <BsGithub />
              </span>

              <span className="font-semibold">
                {userData?.github ? userData?.github : "Github Profile"}
              </span>
            </div>

            <div className="hover:bg-cyan-200 rounded-md p-1">
              <MdEdit
                className="cursor-pointer "
                onClick={() => {
                  window.my_modal_3.showModal();
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* location MODAL */}

      {/* Open the modal using ID.showModal() method */}

      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Update Location</h3>
          <div className="py-4">
            <input
              type="text"
              placeholder="Location...."
              className="input input-bordered input-error w-full max-w-xs"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className=" float-right">
            <span
              onClick={() => handleUpdateDetails()}
              className="btn btn-primary"
            >
              Update
            </span>
          </div>
        </form>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* linkedin MODAL */}

      {/* Open the modal using ID.showModal() method */}

      <dialog id="my_modal_2" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Update Linkedin Profile</h3>
          <div className="py-4">
            <input
              type="text"
              placeholder="Linkedin URL...."
              className="input input-bordered input-error w-full max-w-xs"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
            />
          </div>
          <div className=" float-right">
            <span
              onClick={() => handleUpdateDetails()}
              className="btn btn-primary"
            >
              Update
            </span>
          </div>
        </form>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* Github MODAL */}

      {/* Open the modal using ID.showModal() method */}

      <dialog id="my_modal_3" className="modal">
        <form method="dialog" className="modal-box">
          <h3 className="font-bold text-lg">Update Github URL</h3>
          <div className="py-4">
            <input
              type="text"
              placeholder="Github...."
              className="input input-bordered input-error w-full max-w-xs"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
            />
          </div>
          <div className=" float-right">
            <span
              onClick={() => handleUpdateDetails()}
              className="btn btn-primary"
            >
              Update
            </span>
          </div>
        </form>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default Profile;
