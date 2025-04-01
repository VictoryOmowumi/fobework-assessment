import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MoonIcon, SunIcon, BellIcon, ArrowsPointingOutIcon, ArrowsPointingInIcon, MagnifyingGlassIcon  } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";

interface NavbarProps {
  onMenuToggle: () => void;
  isMobileSidebarOpen: boolean;
}

const Navbar = ({ onMenuToggle, isMobileSidebarOpen }: NavbarProps) => {
  const { theme, setTheme } = useTheme();
  const user = "Ayinla Abdulazeez";

  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names
      .map((n) => n.charAt(0).toUpperCase())
      .join("");
  };

  // handle fullscreen toggle
  const handleFullscreenToggle = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  return (
    <header className="sticky top-0 z-30  backdrop-blur-md">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6">
        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground"
          onClick={onMenuToggle}
        >
          {isMobileSidebarOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3BottomLeftIcon className="h-6 w-6" />
          )}
        </button>

        {/* Logo / App Name */}
        <div className="md:flex items-center bg-accent rounded-full px-4 py-2.5 space-x-2 hidden">
          {/*  search bar */}
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm text-foreground w-40 md:w-64 lg:w-96 placeholder:text-muted-foreground"
              onFocus={(e) => (e.target.placeholder = "")}
            />
            <button className="text-sm text-foreground">
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>
         
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className=" flex w-10 h-10  bg-accent rounded-full justify-center items-center hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>

          <button className=" flex w-10 h-10  bg-accent rounded-full justify-center items-center hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
            <BellIcon className="h-5 w-5" />
          </button>

          <button 
            onClick={handleFullscreenToggle}
          className="hidden md:flex w-10 h-10  bg-accent rounded-full justify-center items-center hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
            {document.fullscreenElement ? (
              <ArrowsPointingInIcon className="h-5 w-5" onClick={handleFullscreenToggle} />
            ) : (
              <ArrowsPointingOutIcon className="h-5 w-5" onClick={handleFullscreenToggle} />
            )}
          </button>

          <div className=" block h-8 w-8 rounded-full bg-primary">
            <img
              src={
                `https://eu.ui-avatars.com/api/?name=${getInitials(user)}`}
              alt="Profile"
              className="w-8 h-8 rounded-full cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
