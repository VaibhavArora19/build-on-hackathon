import React from "react";
import Backdrop from "./Backdrop";
import useLockBodyScroll from "@/hooks/useLockBodyScroll";

const Modal = ({
  children,
  className,
  onClose,
  isBackdrop = true,
}: {
  children: React.ReactNode;
  className?: string;
  onClose?: () => void;
  isBackdrop?: boolean;
}) => {
  useLockBodyScroll(true);

  return (
    <>
      {isBackdrop && <Backdrop onClose={onClose} />}
      <div className={`${className} fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] rounded-lg bg-[#151515] shadow-md z-20`}>
        {children}
      </div>
    </>
  );
};

export default Modal;
