import { toast } from "react-toastify";

export const handleError = (error: Error) => {
  toast.error(error.message);
};
