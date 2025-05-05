
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  coverArt: string;
  audioUrl?: string;
}

export interface Playlist {
  id: string;
  name: string;
  description?: string;
  coverImage?: string;
  createdBy: string;
  songs: Song[];
  createdAt: string;
  updatedAt: string;
}
