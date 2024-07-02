import { lazy } from "react";

const One = lazy(() => import("./InfoSections/One"));
const Two = lazy(() => import("./InfoSections/Two"));
const Three = lazy(() => import("./InfoSections/Three"));
const Four = lazy(() => import("./InfoSections/Four"));
const Five = lazy(() => import("./InfoSections/Five"));
const Six = lazy(() => import("./InfoSections/Six"));
const Portfolio = lazy(() => import("./InfoSections/Portfolio"));

const stages = [
  {
    id: 1,
    stage: <One />,
  },
  {
    id: 2,
    stage: <Two />,
  },
  {
    id: 3,
    stage: <Three />,
  },
  {
    id: 4,
    stage: <Four />,
  },
  {
    id: 5,
    stage: <Five />,
  },
  {
    id: 6,
    stage: <Six />,
  },
  {
    id: 7,
    stage: <Portfolio />,
  },
];

export default function InfoBox({
  currentStage,
}: {
  currentStage: number | null;
}) {
  return (
    <div
      className={`info-container ${
        currentStage! > 0 ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* 為了要讓文字有 fade in-out 的效果 */}
      {stages.map((item) => (
        <div
          className="absolute left-0 right-0 mx-auto w-[90%] md:w-full md:max-w-lg flex justify-center items-center"
          key={item.id}
        >
          {currentStage === item.id ? (
            <div className="visible opacity-100 transition-all duration-500">
              {item.stage}
            </div>
          ) : (
            <div className="invisible opacity-0 transition-all duration-500">
              {item.stage}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
