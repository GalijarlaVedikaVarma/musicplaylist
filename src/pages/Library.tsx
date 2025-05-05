
import { useState } from "react";
import Layout from "@/components/Layout";
import { usePlaylist } from "@/contexts/PlaylistContext";
import PlaylistCard from "@/components/PlaylistCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import CreatePlaylistDialog from "@/components/CreatePlaylistDialog";

const Library = () => {
  const { playlists, loading } = usePlaylist();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Your Library</h2>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Playlist
          </Button>
        </div>
        
        <CreatePlaylistDialog 
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
        />

        {loading ? (
          <p>Loading your playlists...</p>
        ) : playlists.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-lg">
            <h3 className="text-2xl font-medium mb-2">No Playlists Yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first playlist to organize your favorite songs
            </p>
            <Button onClick={() => setCreateDialogOpen(true)}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Playlist
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {playlists.map((playlist) => (
              <PlaylistCard key={playlist.id} playlist={playlist} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Library;
