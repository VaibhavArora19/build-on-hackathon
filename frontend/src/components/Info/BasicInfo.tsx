const BasicInfo = () => {
  return (
    <div className="flex ml-[17rem]">
      <div className="card w-[22rem] bg-base-100 shadow-xl image-full mb-16 mt-8">
        <figure>
          <img src="/background.png" alt="Background" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Net worth</h2>
          <p className="text-lg">$147.31</p>
        </div>
      </div>
      <div className="card w-[22rem] bg-base-100 shadow-xl image-full ml-8 mb-16 mt-8">
        <figure>
          <img src="/background.png" alt="Background" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Net Apy</h2>
          <p className="text-lg">1.32%</p>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
