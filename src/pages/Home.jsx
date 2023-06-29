import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="hero bgHome min-h-screen ">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://images.unsplash.com/photo-1635830625698-3b9bd74671ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
            className="md:max-w-2xl max-w-sm: rounded-lg shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">Help-Devs</h1>
            <p className="py-6">
              Unlock the potential of your code and turn your passion into
              profit. Join our innovative platform that empowers developers to
              share, showcase, and monetize their source code like never before.
              Connect with a vibrant community of fellow developers and start
              earning from your expertise today. Sign up now and embark on a
              rewarding journey with us.
            </p>
            <div className="flex  gap-4 max-w-[14rem]">
              {localStorage?.getItem("dev") ? (
                <button
                  onClick={() => {
                    navigate("/dashboard");
                  }}
                  className="btn btn-primary"
                >
                  Dashboard
                </button>
              ) : (
                <button
                  onClick={() => {
                    navigate("/register");
                  }}
                  className="btn btn-primary"
                >
                  Get Started
                </button>
              )}

              <button
                onClick={() => {
                  navigate("/sourceCode");
                }}
                className="btn btn-primary"
              >
                Browse Source Codes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
