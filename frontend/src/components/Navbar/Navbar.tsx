const Navbar = () => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 ">
          <li className="mt-2">
            <details>
              <summary>Parent</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <a>Deposit</a>
                </li>
                <li>
                  <a>Portfolio</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <w3m-connect-button />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
