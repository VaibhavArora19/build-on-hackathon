const BasicInfo = () => {
  return (
    <div className="flex ml-[17rem] mb-16 mt-8">
      <div className="card bg-primary text-primary-content w-64">
        <div className="card-body">
          <h1 className="font-medium text-[14px]">Net worth</h1>
          <p className="font-semibold text-[21px]">$147.31</p>
        </div>
      </div>
      <div className="card bg-primary text-primary-content w-64 ml-8">
        <div className="card-body">
          <h1 className="font-medium text-[14px]">Net Apy</h1>
          <p className="font-semibold text-[21px]">1.5%</p>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
