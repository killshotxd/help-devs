import { useLocation } from "react-router-dom";

const IndividualSource = () => {
  const state = useLocation();
  const res = state.state;
  const filters = res.category.map((res) => {
    return res.label;
  });

  return (
    <>
      <div className=" min-h-screen bg-base-200">
        <div className="grid grid-cols-1 px-6 py-6 gap-4">
          <section className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-5 py-24">
              <div className="mx-auto flex flex-wrap items-center lg:w-4/5">
                <img
                  alt="Source image"
                  className="h-64 w-full rounded object-cover lg:h-96 lg:w-1/2"
                  src={res.image}
                />
                <div className="mt-6 w-full lg:mt-0 lg:w-1/2 lg:pl-10">
                  <h2 className="text-sm font-semibold tracking-widest text-gray-500">
                    {res.userName}
                  </h2>
                  <h1 className="my-4 text-3xl font-semibold text-black">
                    {res.name}
                  </h1>
                  <div className="my-4 flex items-center gap-4">
                    {/* <span className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-500" />
                ))}
                <span className="ml-3 inline-block text-xs font-semibold">4 Reviews</span>
              </span> */}
                    <p className=" font-semibold">Tech Stacks :</p>
                    <span className="badge badge-accent">
                      {filters.join(",")}
                    </span>
                  </div>
                  <p className="leading-relaxed">{res.description}</p>
                  <div className="mb-5 mt-6 flex items-center border-b-2 border-gray-100 pb-5"></div>
                  <div className="flex items-center justify-between">
                    <span className="title-font text-xl font-bold text-gray-900">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: "INR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(res.price)}
                    </span>
                    <button
                      type="button"
                      className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default IndividualSource;
