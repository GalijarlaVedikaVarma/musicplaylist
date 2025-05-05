
import { useUser } from "@/contexts/UserContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Music } from "lucide-react";
import { useSong } from "@/contexts/SongContext";
import ThemeToggle from "./ThemeToggle";
import { Link } from "react-router-dom";

const Header = () => {
  const { user } = useUser();
  const { searchQuery, setSearchQuery } = useSong();

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Music className="h-6 w-6 text-groove-500" />
            <h1 className="text-xl font-bold tracking-tight">Groove Lounge</h1>
          </Link>
        </div>

        <div className="flex-1 mx-4 md:mx-12 max-w-md">
          <div className="relative">
            <Input
              placeholder="Search songs..."
              className="w-full bg-muted"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-sm font-medium">
                {user.name}
              </span>
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <Button variant="default" size="sm">
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
