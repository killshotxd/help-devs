import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRef, useState } from "react";
import { BsFileImage } from "react-icons/bs";
import { AiFillFile } from "react-icons/ai";
import { storage } from "../Firebase";
import { UserAuth } from "../context/AuthContext";
import { MultiSelect } from "react-multi-select-component";
import { Toaster, toast } from "react-hot-toast";
const Upload = () => {
  const options = [
    { value: "node", label: "NodeJs" },
    { value: "angular", label: "Angular" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
    { value: "ai/ml", label: "AI/ML" },
    { value: "react", label: "React" },
  ];

  const { currentUser } = UserAuth();
  const imagePicker = useRef();
  const filePicker = useRef();
  const [imageUrl, setImageUrl] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [price, setPrice] = useState("");
  const [formattedPrice, setFormattedPrice] = useState("");
  const [profileImageUploadStarted, setProfileImageUploadStarted] =
    useState(false);
  const [selected, setSelected] = useState([]);
  console.log(selected);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    setPrice(numericValue);
    setFormattedPrice(
      numericValue ? parseInt(numericValue).toLocaleString("en-IN") : ""
    );
  };

  const handleImageClick = () => {
    imagePicker.current.click();
  };

  const handleFileClick = () => {
    filePicker.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;
    setProfileImageUploadStarted(true);
    uploadImage(
      file,
      (progress) => {
        setProgress(Math.round(progress));
      },
      (url) => {
        setImageUrl(url);

        uploadImage(url);

        setProfileImageUploadStarted(false);
        setProgress(0);
      },
      (err) => {
        console.log("Error->", err);
        setProfileImageUploadStarted(false);
      }
    );
  };

  // UPLOAD TO FIREBASE STORAGE
  const uploadImage = (file, progressCallback, urlCallback, errorCallback) => {
    if (!file) {
      errorCallback("File not found");
      return;
    }
    const fileType = file.type;
    const storageRef = ref(
      storage,
      `${currentUser.email}/${fileType}/${file.name}`
    );
    const task = uploadBytesResumable(storageRef, file);
    task.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressCallback(progress);
      },
      (error) => {
        errorCallback(error.message);
      },
      () => {
        getDownloadURL(storageRef).then((url) => {
          urlCallback(url);
          toast.success("Image Uploaded Successfully!");
        });
      }
    );
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (!file) return;
    setProfileImageUploadStarted(true);
    uploadFile(
      file,
      (progress) => {
        setProgress(Math.round(progress));
      },
      (url) => {
        setFileUrl(url);

        uploadFile(url);

        setProfileImageUploadStarted(false);
        setProgress(0);
      },
      (err) => {
        console.log("Error->", err);
        setProfileImageUploadStarted(false);
      }
    );
  };

  // UPLOAD File TO FIREBASE STORAGE
  const uploadFile = (file, progressCallback, urlCallback, errorCallback) => {
    if (!file) {
      errorCallback("File not found");
      return;
    }
    const fileType = file.type;
    const storageRef = ref(
      storage,
      `${currentUser.email}/${fileType}/${file.name}`
    );
    const task = uploadBytesResumable(storageRef, file);
    task.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        progressCallback(progress);
      },
      (error) => {
        errorCallback(error.message);
      },
      () => {
        getDownloadURL(storageRef).then((url) => {
          urlCallback(url);
          toast.success("File Uploaded Successfully!");
        });
      }
    );
  };

  const handleUploadSource = async () => {
    try {
      const data = await fetch();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <input
        type="file"
        hidden
        accept="image/*"
        ref={imagePicker}
        onChange={handleImageChange}
      />

      <input
        type="file"
        hidden
        accept="application/*"
        ref={filePicker}
        onChange={handleFileChange}
      />

      <div className="flex justify-center py-6 items-center gap-2">
        <div
          onClick={handleImageClick}
          className=" cursor-pointer btn-ghost shadow-lg w-full p-6 rounded flex justify-center items-center text-xs gap-1"
        >
          <BsFileImage size={30} /> Please upload an Image
        </div>
      </div>
      <div className="w-full customImgDiv flex justify-center m-auto items-center px-2 max-w-xs">
        <figure>
          <input className="w-1/2" type="image" src={imageUrl} alt="" />
        </figure>
      </div>

      <div className="flex flex-col gap-3 w-full py-6">
        <label className="font-semibold">Source Code Name : </label>
        <input
          type="text"
          placeholder="Type here"
          className="input input-ghost w-full "
        />
      </div>

      <div className="flex flex-col gap-3 w-full py-6">
        <label className="font-semibold">Description : </label>
        <textarea
          type="text"
          placeholder="Type here"
          className="input input-ghost w-full "
        />
      </div>

      <div className="flex flex-col gap-3 w-full py-6">
        <label className="font-semibold">Category : </label>
        <MultiSelect
          options={options}
          value={selected}
          onChange={setSelected}
          labelledBy="Select"
        />
      </div>

      <div className="flex flex-col gap-3 w-full py-6">
        <label className="font-semibold">Price : </label>
        <input
          type="text"
          placeholder="Price In INR"
          value={formattedPrice}
          onChange={handlePriceChange}
          className="input input-ghost w-full "
        />
      </div>

      <div className="flex flex-col gap-3 w-full py-6">
        <label className="font-semibold">Source Code File : </label>
        <div
          className=" cursor-pointer btn-ghost shadow-lg w-full p-6 rounded flex justify-center items-center text-xs gap-1"
          onClick={handleFileClick}
        >
          <AiFillFile size={30} /> Upload File from Here
        </div>
      </div>

      <div className="w-full customImgDiv flex justify-center m-auto items-center px-2 max-w-xs">
        <figure>
          {fileUrl !== "" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="48"
              height="48"
              viewBox="0 0 48 48"
            >
              <path
                fill="#c8e6c9"
                d="M36,42H12c-3.314,0-6-2.686-6-6V12c0-3.314,2.686-6,6-6h24c3.314,0,6,2.686,6,6v24C42,39.314,39.314,42,36,42z"
              ></path>
              <path
                fill="#4caf50"
                d="M34.585 14.586L21.014 28.172 15.413 22.584 12.587 25.416 21.019 33.828 37.415 17.414z"
              ></path>
            </svg>
          ) : (
            ""
          )}
        </figure>
      </div>

      <div className="py-6 flex items-center justify-center">
        <button onClick={handleUploadSource} className="btn btn-primary">
          Upload Source Code
        </button>
      </div>
    </>
  );
};

export default Upload;
