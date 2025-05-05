
import { Song } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Play, Plus, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { usePlaylist } from "@/contexts/PlaylistContext";

interface SongItemProps {
  song: Song;
  playlistId?: string;
  showAddButton?: boolean;
}

const SongItem = ({ song, playlistId, showAddButton = false }: SongItemProps) => {
  const { addSongToPlaylist, removeSongFromPlaylist } = usePlaylist();

  const handleAddSong = async () => {
    if (playlistId) {
      await addSongToPlaylist(playlistId, song.id);
    }
  };

  const handleRemoveSong = async () => {
    if (playlistId) {
      await removeSongFromPlaylist(playlistId, song.id);
    }
  };

  return (
    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 song-item group">
      <div className="h-10 w-10 overflow-hidden rounded">
        <img 
          src={song.coverArt} 
          alt={song.title} 
          className="h-full w-full object-cover"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{song.title}</h4>
        <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
      </div>
      
      <div className="text-xs text-muted-foreground">
        {song.duration}
      </div>

      <div className="song-controls opacity-0 transition-opacity">
        {showAddButton ? (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8" 
            onClick={handleAddSong}
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add to playlist</span>
          </Button>
        ) : playlistId ? (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-destructive hover:text-destructive" 
            onClick={handleRemoveSong}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Remove from playlist</span>
          </Button>
        ) : (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Play className="h-4 w-4" />
            <span className="sr-only">Play</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default SongItem;
