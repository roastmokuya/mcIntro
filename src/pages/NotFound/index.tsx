import MetaData from "@/components/MetaData";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <MetaData title="404 Page Not Found" />
      <div className="max-w-xs md:max-w-md w-full mx-auto p-4 md:p-5">
        <div className="flex flex-col justify-center items-center text-center">
          <div className="mb-10">
            <p className="font-semibold">4 0 4</p>
            <h1 className="font-bold text-2xl">Page Not Found</h1>
            <p className="text-gray-700 dark:text-gray-200">
              Looks like you've followed a broken link or entered a URL that
              doesn't exist on this site.
            </p>
          </div>
          <button
            type="button"
            className="link-btn"
            onClick={() => navigate("/")}
          >
            Back to home
          </button>
        </div>
      </div>
    </>
  );
}
