import toast from "react-hot-toast";

type ErrorMessageProps = {
  errorMessage: boolean;
};

export default function ErrorMessage({ errorMessage }: ErrorMessageProps) {
  if (errorMessage) {
    toast.error("Error, try reloading the page");
  }

  return null;
}
