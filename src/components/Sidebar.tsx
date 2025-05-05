
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ListMusic, Music, PlusCircle } from "lucide-react";
import { usePlaylist } from "@/contexts/PlaylistContext";
import { Separator } from "./ui/separator";

const Sidebar = () => {
  const location = useLocation();
  const { playlists } = usePlaylist();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Discover", path: "/", icon: <Music className="mr-2 h-4 w-4" /> },
    { name: "Your Library", path: "/library", icon: <ListMusic className="mr-2 h-4 w-4" /> },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 border-r bg-sidebar p-4 h-[calc(100vh-4rem)] sticky top-16">
      <div className="space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant={isActive(item.path) ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              isActive(item.path) && "bg-accent font-medium"
            )}
            asChild
          >
            <Link to={item.path}>
              {item.icon}
              {item.name}
            </Link>
          </Button>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <h3 className="text-sm font-medium">Your Playlists</h3>
        <Button variant="ghost" size="icon" asChild>
          <Link to="/create-playlist">
            <PlusCircle className="h-4 w-4" />
            <span className="sr-only">Create Playlist</span>
          </Link>
        </Button>
      </div>
      
      <Separator className="my-2" />
      
      <div className="space-y-1 overflow-auto flex-1">
        {playlists.map((playlist) => (
          <Button
            key={playlist.id}
            variant="ghost"
            className={cn(
              "w-full justify-start text-sm font-normal truncate",
              isActive(`/playlist/${playlist.id}`) && "bg-accent font-medium"
            )}
            asChild
          >
            <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
          </Button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
