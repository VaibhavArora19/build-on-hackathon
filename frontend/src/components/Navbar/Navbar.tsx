"use client";

import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" onClick={() => router.push("/")}>
          CrossFi
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 ">
          <li className="mt-2">
            <details>
              <summary>Parent</summary>
              <ul className="bg-base-100 rounded-t-none p-2">
                <li>
                  <a onClick={() => router.push("/lend")}>Deposit</a>
                </li>
                <li>
                  <a onClick={() => router.push("/positions")}>Positions</a>
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
