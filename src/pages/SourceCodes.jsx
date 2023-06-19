const SourceCodes = () => {
  return (
    <>
      <div className="min-h-screen justify-center bg-base-200">
        <div className=" justify-center items-center flex p-3 flex-col lg:flex-row-reverse">
          <input
            type="search"
            placeholder="Search Source Code/Developer Name"
            className="input input-bordered text-center input-primary w-full max-w-xl"
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
          {/* CARD */}
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://images.unsplash.com/photo-1617900906639-cab7adceb499?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>

          {/* CARD */}

          {/* CARD */}
          <div className="card w-96 bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://images.unsplash.com/photo-1603575448360-153f093fd0b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>

          {/* CARD */}
        </div>
      </div>
    </>
  );
};

export default SourceCodes;
