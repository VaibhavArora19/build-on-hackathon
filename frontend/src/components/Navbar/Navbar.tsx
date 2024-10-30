"use client";

import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-3xl" onClick={() => router.push("/")}>
          CrossFi
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li className="pt-2 textarea-md">
            <a onClick={() => router.push("/lend")}>Deposit</a>
          </li>
          <li className="pt-2 textarea-md">
            <a onClick={() => router.push("/positions")}>Positions</a>
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
