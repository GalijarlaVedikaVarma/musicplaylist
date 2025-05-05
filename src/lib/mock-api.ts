
import { Playlist, Song } from "@/types";
import { currentUser, playlists as mockPlaylists, songs as mockSongs } from "./mock-data";
import { toast } from "sonner";

let playlists = [...mockPlaylists];
let songs = [...mockSongs];

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // User API
  getCurrentUser: async () => {
    await delay(500);
    return { ...currentUser };
  },
  
  // Playlists API
  getPlaylists: async () => {
    await delay(800);
    return [...playlists];
  },
  
  getPlaylist: async (id: string) => {
    await delay(500);
    const playlist = playlists.find(p => p.id === id);
    if (!playlist) throw new Error("Playlist not found");
    return { ...playlist };
  },
  
  createPlaylist: async (data: Omit<Playlist, "id" | "createdBy" | "createdAt" | "updatedAt">) => {
    await delay(800);
    const newPlaylist: Playlist = {
      id: `playlist${Date.now()}`,
      createdBy: currentUser.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    };
    playlists = [...playlists, newPlaylist];
    toast.success("Playlist created successfully");
    return newPlaylist;
  },
  
  updatePlaylist: async (id: string, data: Partial<Playlist>) => {
    await delay(800);
    const index = playlists.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Playlist not found");
    
    const updatedPlaylist = { 
      ...playlists[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    playlists = [
      ...playlists.slice(0, index),
      updatedPlaylist,
      ...playlists.slice(index + 1)
    ];
    
    toast.success("Playlist updated successfully");
    return updatedPlaylist;
  },
  
  deletePlaylist: async (id: string) => {
    await delay(800);
    const index = playlists.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Playlist not found");
    
    playlists = [
      ...playlists.slice(0, index),
      ...playlists.slice(index + 1)
    ];
    
    toast.success("Playlist deleted successfully");
    return true;
  },
  
  // Songs API
  getSongs: async () => {
    await delay(800);
    return [...songs];
  },
  
  addSongToPlaylist: async (playlistId: string, songId: string) => {
    await delay(500);
    const playlistIndex = playlists.findIndex(p => p.id === playlistId);
    if (playlistIndex === -1) throw new Error("Playlist not found");
    
    const song = songs.find(s => s.id === songId);
    if (!song) throw new Error("Song not found");
    
    const playlist = playlists[playlistIndex];
    if (playlist.songs.some(s => s.id === songId)) {
      toast.error("Song is already in the playlist");
      return playlist;
    }
    
    const updatedPlaylist = {
      ...playlist,
      songs: [...playlist.songs, song],
      updatedAt: new Date().toISOString()
    };
    
    playlists = [
      ...playlists.slice(0, playlistIndex),
      updatedPlaylist,
      ...playlists.slice(playlistIndex + 1)
    ];
    
    toast.success("Song added to playlist");
    return updatedPlaylist;
  },
  
  removeSongFromPlaylist: async (playlistId: string, songId: string) => {
    await delay(500);
    const playlistIndex = playlists.findIndex(p => p.id === playlistId);
    if (playlistIndex === -1) throw new Error("Playlist not found");
    
    const playlist = playlists[playlistIndex];
    const songIndex = playlist.songs.findIndex(s => s.id === songId);
    
    if (songIndex === -1) {
      toast.error("Song is not in the playlist");
      return playlist;
    }
    
    const updatedPlaylist = {
      ...playlist,
      songs: [
        ...playlist.songs.slice(0, songIndex),
        ...playlist.songs.slice(songIndex + 1)
      ],
      updatedAt: new Date().toISOString()
    };
    
    playlists = [
      ...playlists.slice(0, playlistIndex),
      updatedPlaylist,
      ...playlists.slice(playlistIndex + 1)
    ];
    
    toast.success("Song removed from playlist");
    return updatedPlaylist;
  },
  
  searchSongs: async (query: string) => {
    await delay(500);
    const lowerQuery = query.toLowerCase();
    return songs.filter(
      song => 
        song.title.toLowerCase().includes(lowerQuery) || 
        song.artist.toLowerCase().includes(lowerQuery) ||
        song.album.toLowerCase().includes(lowerQuery)
    );
  }
};
