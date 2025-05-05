
import { api } from "@/lib/mock-api";
import { Playlist, Song } from "@/types";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface PlaylistContextType {
  playlists: Playlist[];
  currentPlaylist: Playlist | null;
  loading: boolean;
  error: string | null;
  fetchPlaylists: () => Promise<void>;
  fetchPlaylist: (id: string) => Promise<void>;
  createPlaylist: (data: Omit<Playlist, "id" | "createdBy" | "createdAt" | "updatedAt">) => Promise<Playlist>;
  updatePlaylist: (id: string, data: Partial<Playlist>) => Promise<Playlist>;
  deletePlaylist: (id: string) => Promise<boolean>;
  addSongToPlaylist: (playlistId: string, songId: string) => Promise<Playlist>;
  removeSongFromPlaylist: (playlistId: string, songId: string) => Promise<Playlist>;
}

const PlaylistContext = createContext<PlaylistContextType | undefined>(undefined);

export const PlaylistProvider = ({ children }: { children: ReactNode }) => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [currentPlaylist, setCurrentPlaylist] = useState<Playlist | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPlaylists = async () => {
    try {
      setLoading(true);
      const data = await api.getPlaylists();
      setPlaylists(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch playlists");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaylist = async (id: string) => {
    try {
      setLoading(true);
      const data = await api.getPlaylist(id);
      setCurrentPlaylist(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch playlist");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createPlaylist = async (data: Omit<Playlist, "id" | "createdBy" | "createdAt" | "updatedAt">) => {
    try {
      setLoading(true);
      const newPlaylist = await api.createPlaylist(data);
      setPlaylists([...playlists, newPlaylist]);
      setError(null);
      return newPlaylist;
    } catch (err) {
      setError("Failed to create playlist");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePlaylist = async (id: string, data: Partial<Playlist>) => {
    try {
      setLoading(true);
      const updatedPlaylist = await api.updatePlaylist(id, data);
      
      setPlaylists(playlists.map(p => 
        p.id === id ? updatedPlaylist : p
      ));
      
      if (currentPlaylist?.id === id) {
        setCurrentPlaylist(updatedPlaylist);
      }
      
      setError(null);
      return updatedPlaylist;
    } catch (err) {
      setError("Failed to update playlist");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePlaylist = async (id: string) => {
    try {
      setLoading(true);
      await api.deletePlaylist(id);
      
      setPlaylists(playlists.filter(p => p.id !== id));
      
      if (currentPlaylist?.id === id) {
        setCurrentPlaylist(null);
      }
      
      setError(null);
      return true;
    } catch (err) {
      setError("Failed to delete playlist");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addSongToPlaylist = async (playlistId: string, songId: string) => {
    try {
      setLoading(true);
      const updatedPlaylist = await api.addSongToPlaylist(playlistId, songId);
      
      setPlaylists(playlists.map(p => 
        p.id === playlistId ? updatedPlaylist : p
      ));
      
      if (currentPlaylist?.id === playlistId) {
        setCurrentPlaylist(updatedPlaylist);
      }
      
      setError(null);
      return updatedPlaylist;
    } catch (err) {
      setError("Failed to add song to playlist");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeSongFromPlaylist = async (playlistId: string, songId: string) => {
    try {
      setLoading(true);
      const updatedPlaylist = await api.removeSongFromPlaylist(playlistId, songId);
      
      setPlaylists(playlists.map(p => 
        p.id === playlistId ? updatedPlaylist : p
      ));
      
      if (currentPlaylist?.id === playlistId) {
        setCurrentPlaylist(updatedPlaylist);
      }
      
      setError(null);
      return updatedPlaylist;
    } catch (err) {
      setError("Failed to remove song from playlist");
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaylists();
  }, []);

  return (
    <PlaylistContext.Provider
      value={{
        playlists,
        currentPlaylist,
        loading,
        error,
        fetchPlaylists,
        fetchPlaylist,
        createPlaylist,
        updatePlaylist,
        deletePlaylist,
        addSongToPlaylist,
        removeSongFromPlaylist
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylist = () => {
  const context = useContext(PlaylistContext);
  if (context === undefined) {
    throw new Error("usePlaylist must be used within a PlaylistProvider");
  }
  return context;
};
