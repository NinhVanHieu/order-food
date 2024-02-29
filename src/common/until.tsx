import { toast } from "react-toastify";
import { MdError } from "react-icons/md";
import { FaDiagramSuccessor } from "react-icons/fa6";

export const message = {
  success: (msg: string) => {
    if (typeof msg !== "string" || msg === "") {
      return null;
    }

    return toast.success(
      <div>
        <p className="text-[#61AF40] font-bold text-xl font-inter">
          Successful message
        </p>
        <p className="text-[#110E27] text-sm font-medium font-inter">{msg}</p>
      </div>,
      {
        theme: "colored",
        autoClose: 3000,
        icon: () => <FaDiagramSuccessor />,
      }
    );
  },
  error: (msg: string) => {
    if (typeof msg !== "string" || msg === "") {
      return null;
    }

    return toast.error(
      <div>
        <p className="text-[#fff] font-bold text-xl font-inter">
          False message
        </p>
        <p className="text-[#fff] text-sm font-medium font-inter">{msg}</p>
      </div>,
      {
        theme: "colored",
        autoClose: 3000,
        icon: () => <MdError />,
      }
    );
  },
};
