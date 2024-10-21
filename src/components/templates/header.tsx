import useScroll from "@/core/custom-hook/use-scroll";

export const Header = () => {
  const { isScrollingUp } = useScroll();

  return (
    <header
      className={`sm:hidden fixed top-0 left-0 right-0 z-10 transition-all duration-300 ease-in-out bg-white shadow-md ${
        isScrollingUp ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center h-16 px-6 font-semibold text-lg">
        Gather Pets Logo
      </div>
    </header>
  );
};
