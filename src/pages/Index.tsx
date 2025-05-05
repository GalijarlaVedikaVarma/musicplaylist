
import { useState } from "react";
import { usePlaylist } from "@/contexts/PlaylistContext";
import { useSong } from "@/contexts/SongContext";
import Layout from "@/components/Layout";
import PlaylistCard from "@/components/PlaylistCard";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import CreatePlaylistDialog from "@/components/CreatePlaylistDialog";
import SongItem from "@/components/SongItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const { playlists } = usePlaylist();
  const { filteredSongs, searchQuery } = useSong();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Discover Music</h2>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Playlist
          </Button>
        </div>

        <CreatePlaylistDialog
          open={createDialogOpen}
          onOpenChange={setCreateDialogOpen}
        />
        
        <Tabs defaultValue="playlists">
          <TabsList>
            <TabsTrigger value="playlists">Playlists</TabsTrigger>
            <TabsTrigger value="songs">Songs</TabsTrigger>
          </TabsList>
          <TabsContent value="playlists" className="mt-6">
            {searchQuery ? (
              <h3 className="text-xl font-medium mb-4">Search Results</h3>
            ) : (
              <h3 className="text-xl font-medium mb-4">Featured Playlists</h3>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {playlists.map((playlist) => (
                <PlaylistCard key={playlist.id} playlist={playlist} />
              ))}
            </div>
            
            {playlists.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No playlists found</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => setCreateDialogOpen(true)}
                >
                  Create Your First Playlist
                </Button>
              </div>
            )}
          </TabsContent>
          <TabsContent value="songs" className="mt-6">
            <div className="space-y-1">
              {filteredSongs.map((song) => (
                <SongItem key={song.id} song={song} />
              ))}
              
              {filteredSongs.length === 0 && (
                <div className="text-center py-10">
                  <p className="text-muted-foreground">No songs found</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;
