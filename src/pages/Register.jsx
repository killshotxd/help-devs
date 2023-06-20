import { Toaster, toast } from "react-hot-toast";
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

const Register = () => {
  const { currentUser } = UserAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  console.log(role);
  const handleRegister = async () => {
    if (!currentUser) return toast.error("Login First !");

    try {
      const res = await fetch(
        "https://enchanting-pink-reindeer.cyclic.app/register",
        {
          method: "POST",
          body: JSON.stringify({
            name,
            email,
            role,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (data.success == true) {
        toast.success("You Are Registered Now !");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      setName(currentUser?.displayName);
      setEmail(currentUser?.email);
    }
  }, []);
  return (
    <>
      {" "}
      <Toaster />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now!</h1>
            <p className="py-6">
              Welcome to our developer community! Create your account and gain
              access to a world of opportunities. Share your source code,
              collaborate with like-minded developers, and earn money by selling
              your unique creations. Join now and let your code make a lasting
              impact in the tech world.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full  max-w-sm md:max-w-xl shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Position</span>
                </label>
                <select
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  className="select w-full max-w-full"
                >
                  <option disabled selected>
                    Role?
                  </option>
                  <option>Frontend Developer</option>
                  <option>Full Stack Developer</option>
                  <option>Backend Developer</option>
                  <option>Android Developer</option>
                  <option>Python Developer</option>
                  <option>AI/ML Developer</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-control mt-6">
                <button onClick={handleRegister} className="btn btn-primary">
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
