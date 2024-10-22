type BackdropProps = {
  onClose?: () => void;
};

const Backdrop: React.FC<BackdropProps> = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]  fixed bg-black/50 backdrop-blur-sm h-screen w-screen z-20"
    ></div>
  );
};
export default Backdrop;
