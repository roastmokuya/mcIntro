import Logo from "./Logo";
import DarkButton from "./DarkButton";

export default function Header() {
  return (
    <div className="absolute top-0 w-screen flex justify-between items-center gap-4 md:gap-5 p-4 md:p-5 z-10">
      <Logo />
      <div className="flex items-center gap-1">
        <DarkButton />
      </div>
    </div>
  );
}
