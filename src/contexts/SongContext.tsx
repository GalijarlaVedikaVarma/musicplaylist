
import { api } from "@/lib/mock-api";
import { Song } from "@/types";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface SongContextType {
  songs: Song[];
  filteredSongs: Song[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SongContext = createContext<SongContextType | undefined>(undefined);

export const SongProvider = ({ children }: { children: ReactNode }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        setLoading(true);
        const data = await api.getSongs();
        setSongs(data);
        setFilteredSongs(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch songs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  useEffect(() => {
    const searchSongs = async () => {
      if (searchQuery.trim() === "") {
        setFilteredSongs(songs);
        return;
      }

      try {
        setLoading(true);
        const results = await api.searchSongs(searchQuery);
        setFilteredSongs(results);
        setError(null);
      } catch (err) {
        setError("Failed to search songs");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    searchSongs();
  }, [searchQuery, songs]);

  return (
    <SongContext.Provider
      value={{
        songs,
        filteredSongs,
        loading,
        error,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </SongContext.Provider>
  );
};

export const useSong = () => {
  const context = useContext(SongContext);
  if (context === undefined) {
    throw new Error("useSong must be used within a SongProvider");
  }
  return context;
};
