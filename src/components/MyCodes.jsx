/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { IoMdTrash } from "react-icons/io";

const MyCodes = ({ isCodeUploaded, onCodeUploaded }) => {
  const [sourceCodes, setSourceCodes] = useState(null);

  const uid = localStorage.getItem("uid");
  const fetchUserSourceCodes = async () => {
    try {
      const data = await fetch(
        `https://enchanting-pink-reindeer.cyclic.app/uploads/${uid}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await data.json();
      setSourceCodes(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteSource = async (id) => {
    try {
      const data = await fetch(
        `https://enchanting-pink-reindeer.cyclic.app/upload/${id}`,
        {
          method: "DELETE",
        }
      );

      const res = await data.json();
      console.log(res);
      if (res.success) toast.success("Source Code Deleted Successfully!");
      fetchUserSourceCodes();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserSourceCodes();
    onCodeUploaded();
  }, [isCodeUploaded]);

  return (
    <>
      <Toaster />
      {sourceCodes ? (
        <>
          {" "}
          {sourceCodes?.map((res) => (
            <>
              <div
                key={res?._id}
                className="card mb-6 w-full bg-base-100 shadow-md p-4 md:p-4"
              >
                <div className="grid md:grid-cols-2 grid-cols-1">
                  <div>
                    <img src={res?.image} alt="image" />
                  </div>
                  <div className="px-4 flex items-center gap-2">
                    <span className="text-xs font-semibold">{res?.name}</span>
                    <span className="badge  text-xs badge-secondary">
                      ₹ {parseInt(res?.price).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="badge  text-xs bg-slate-300">
                    {res?.uploadedDate?.slice(0, 10)}
                  </span>

                  <span
                    onClick={() => {
                      handleDeleteSource(res?._id);
                    }}
                    className=" cursor-pointer"
                  >
                    <IoMdTrash
                      className="hover:bg-red-300  rounded-md"
                      size={25}
                    />
                  </span>
                </div>
              </div>
            </>
          ))}{" "}
        </>
      ) : (
        <div className="text-center font-semibold py-3">
          ALL UPLOADED SOURCE CODES
        </div>
      )}
    </>
  );
};

export default MyCodes;
