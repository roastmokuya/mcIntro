import { useEffect, useState } from "react";

export default function Copyright() {
  const [year, setYear] = useState<number | null>(null);
  useEffect(() => {
    const getYear = new Date().getFullYear();
    setYear(getYear);
  }, []);

  return (
    <div className="absolute p-4 md:p-5 right-0 bottom-0 z-10">
      <small className="text-xs text-slate-800 dark:text-slate-400">
        &copy; {year} Meng Che Wu.
      </small>
    </div>
  );
}
