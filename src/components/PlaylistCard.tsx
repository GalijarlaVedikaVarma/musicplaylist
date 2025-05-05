
import { Playlist } from "@/types";
import { Card, CardContent } from "./ui/card";
import { Play } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

interface PlaylistCardProps {
  playlist: Playlist;
}

const PlaylistCard = ({ playlist }: PlaylistCardProps) => {
  return (
    <Link to={`/playlist/${playlist.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md hover:scale-[1.02] playlist-card">
        <CardContent className="p-0 aspect-square relative">
          <img
            src={playlist.coverImage || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&auto=format&fit=crop&q=80"}
            alt={playlist.name}
            className="w-full h-full object-cover"
          />
          <div className="playlist-overlay absolute inset-0 bg-black/40 opacity-0 transition-opacity flex items-center justify-center">
            <Button variant="secondary" size="icon" className="rounded-full">
              <Play className="h-5 w-5" />
            </Button>
          </div>
        </CardContent>
        <div className="p-3">
          <h3 className="font-medium truncate">{playlist.name}</h3>
          <p className="text-xs text-muted-foreground truncate">
            {playlist.songs.length} songs
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default PlaylistCard;
