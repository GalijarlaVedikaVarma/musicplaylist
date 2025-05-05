
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePlaylist } from "@/contexts/PlaylistContext";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { EditIcon, PlusCircle, Trash2 } from "lucide-react";
import SongItem from "@/components/SongItem";
import { useSong } from "@/contexts/SongContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";

const PlaylistDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentPlaylist, fetchPlaylist, deletePlaylist, loading } = usePlaylist();
  const { filteredSongs, searchQuery, setSearchQuery } = useSong();
  const [songDialogOpen, setSongDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPlaylist(id);
    }
  }, [id, fetchPlaylist]);

  const handleDeletePlaylist = async () => {
    if (id) {
      await deletePlaylist(id);
      navigate("/");
    }
  };

  if (loading && !currentPlaylist) {
    return (
      <Layout>
        <div className="space-y-6">
          <div className="flex items-start gap-6">
            <Skeleton className="h-40 w-40 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-10 w-10" />
              <div className="space-y-1 flex-1">
                <Skeleton className="h-4 w-full max-w-[200px]" />
                <Skeleton className="h-3 w-full max-w-[160px]" />
              </div>
            </div>
          ))}
        </div>
      </Layout>
    );
  }

  if (!currentPlaylist) {
    return (
      <Layout>
        <div className="text-center py-10">
          <h2 className="text-2xl font-bold mb-2">Playlist Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The playlist you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate("/")} variant="default">
            Go to Home
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="h-40 w-40 rounded-md overflow-hidden shadow-md">
            <img
              src={
                currentPlaylist.coverImage ||
                "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&auto=format&fit=crop&q=80"
              }
              alt={currentPlaylist.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{currentPlaylist.name}</h1>
            {currentPlaylist.description && (
              <p className="text-muted-foreground">{currentPlaylist.description}</p>
            )}
            <p className="text-sm text-muted-foreground">
              {currentPlaylist.songs.length} songs • Created{" "}
              {format(new Date(currentPlaylist.createdAt), "MMM d, yyyy")}
            </p>
            <div className="flex gap-2 pt-2">
              <Button size="sm" variant="outline">
                <EditIcon className="mr-1 h-4 w-4" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-destructive hover:text-destructive"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className="mr-1 h-4 w-4" />
                Delete
              </Button>
              <Button size="sm" onClick={() => setSongDialogOpen(true)}>
                <PlusCircle className="mr-1 h-4 w-4" />
                Add Songs
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold mb-3">Songs</h2>
          {currentPlaylist.songs.length > 0 ? (
            currentPlaylist.songs.map((song) => (
              <SongItem
                key={song.id}
                song={song}
                playlistId={currentPlaylist.id}
              />
            ))
          ) : (
            <div className="text-center py-10 bg-muted/20 rounded-md">
              <p className="text-muted-foreground mb-2">
                This playlist is empty
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSongDialogOpen(true)}
              >
                <PlusCircle className="mr-1 h-4 w-4" />
                Add Songs
              </Button>
            </div>
          )}
        </div>

        <Dialog open={songDialogOpen} onOpenChange={setSongDialogOpen}>
          <DialogContent className="sm:max-w-[500px] max-h-screen overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Add Songs to Playlist</DialogTitle>
            </DialogHeader>
            <div className="py-4">
              <Input
                placeholder="Search songs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4"
              />
              <div className="overflow-y-auto max-h-[60vh] space-y-1 pr-2">
                {filteredSongs
                  .filter(
                    (song) =>
                      !currentPlaylist.songs.some((s) => s.id === song.id)
                  )
                  .map((song) => (
                    <SongItem
                      key={song.id}
                      song={song}
                      playlistId={currentPlaylist.id}
                      showAddButton
                    />
                  ))}
                  
                {filteredSongs.filter(
                  (song) => !currentPlaylist.songs.some((s) => s.id === song.id)
                ).length === 0 && (
                  <p className="text-center py-4 text-muted-foreground">
                    No songs found to add
                  </p>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <AlertDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this playlist?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                "{currentPlaylist.name}" playlist.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeletePlaylist}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default PlaylistDetail;
