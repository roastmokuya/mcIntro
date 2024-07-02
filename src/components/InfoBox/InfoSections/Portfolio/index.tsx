import { Link } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import cover from "@/assets/images/cover.png";

export default function Portfolio() {
  return (
    <div className="backdrop-blur-sm bg-blue-100/30 dark:bg-gray-950/70 p-4 md:p-5 rounded-2xl border border-blue-50/60 dark:border-gray-700/70 dark:drop-shadow-glow">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-20 h-20 bg-gray-800 dark:bg-gray-600 rounded-xl flex justify-center items-center overflow-hidden">
          <img src={cover} alt="Cover" className="object-cover" />
        </div>
        <div className="flex-1 text-gray-950 dark:text-white">
          <h2 className="text-xl md:text-2xl font-semibold mb-1">
            Interested in me?
          </h2>
          <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300 md:leading-snug tracking-normal">
            It's time to see my portfolio and please give me your feedback.
          </p>
        </div>
      </div>

      <Link
        to="https://portfolio-mengche.vercel.app/"
        target="_blank"
        className="link-btn"
      >
        View Portfolio
        <HiArrowRight className="m-2 text-xl" />
      </Link>
    </div>
  );
}
