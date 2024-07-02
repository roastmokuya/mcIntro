import RunButton from "../ButtonGroup/RunButton";

export default function MoveHand() {
  return (
    <>
      <div className="info-container text-center">
        <div className="flex flex-col justify-center items-center">
          <RunButton />
          <p className="font-semibold uppercase tracking-wide text-sm md:text-base p-2 md:p-3">
            Click shoes to Start
          </p>
        </div>
      </div>
    </>
  );
}
