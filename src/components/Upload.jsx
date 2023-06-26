import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useRef, useState } from "react";
import { BsFileImage } from "react-icons/bs";
import { storage } from "../Firebase";
import { UserAuth } from "../context/AuthContext";
import { MultiSelect } from "react-multi-select-component";
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
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [price, setPrice] = useState("");
  const [formattedPrice, setFormattedPrice] = useState("");
  const [profileImageUploadStarted, setProfileImageUploadStarted] =
    useState(false);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    setPrice(numericValue);
    setFormattedPrice(
      numericValue ? parseInt(numericValue).toLocaleString("en-IN") : ""
    );
  };

  const [selected, setSelected] = useState([]);
  const handleImageClick = () => {
    imagePicker.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
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
        });
      }
    );
  };

  return (
    <>
      <input
        type="file"
        hidden
        accept="image/*"
        ref={imagePicker}
        onChange={handleImageChange}
      />

      <div className="flex justify-center py-6 items-center gap-2">
        <div
          onClick={handleImageClick}
          className=" cursor-pointer btn-ghost shadow-lg w-full p-6 rounded flex justify-center items-center text-xs gap-1"
        >
          <BsFileImage /> Image
        </div>
      </div>
      <div className="w-full customImgDiv flex justify-center m-auto items-center bg-base-200 px-2 max-w-xs">
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
      </div>
    </>
  );
};

export default Upload;
