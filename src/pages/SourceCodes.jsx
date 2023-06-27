import { useEffect, useState } from "react";

const SourceCodes = () => {
  const [sourceCodes, setSourceCodes] = useState(null);

  const fetchAllSourceCodes = async () => {
    try {
      const data = await fetch(
        "https://enchanting-pink-reindeer.cyclic.app/upload",
        {
          method: "GET",
        }
      );

      const res = await data.json();
      setSourceCodes(res?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllSourceCodes();
  }, []);

  return (
    <>
      <div className="min-h-screen justify-center bg-base-200">
        <div className=" justify-center items-center flex p-3 flex-col lg:flex-row-reverse">
          <input
            type="search"
            placeholder="Search Source Code/Developer Name"
            className="input input-bordered text-center input-primary mt-4 w-full max-w-xl"
          />
        </div>

        <div className=" justify-center items-center flex p-3 gap-4 max-w-screen m-0">
          <div className="badge badge-outline p-3">default</div>
          <div className="badge badge-primary badge-outline p-3">primary</div>
          <div className="badge badge-secondary badge-outline p-3">
            secondary
          </div>
          <div className="badge badge-accent badge-outline p-3">accent</div>
        </div>

        <div className="p-6 md:px-16 flex gap-6 flex-wrap">
          {sourceCodes?.map((res) => (
            <>
              {/* CARD */}
              <div
                key={res?._id}
                className="card w-80 h-96 bg-base-100 shadow-xl"
              >
                <figure>
                  <img src={res?.image} alt="cover" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{res?.name}!</h2>
                  <p>{res?.description}</p>
                  <div className="card-actions mt-3 justify-end">
                    <button className="btn btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>

              {/* CARD */}
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default SourceCodes;
