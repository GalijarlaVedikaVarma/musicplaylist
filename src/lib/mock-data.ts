
import { Playlist, Song, User } from "@/types";

export const currentUser: User = {
  id: "user1",
  name: "Alex Johnson",
  email: "alex@example.com",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&auto=format&fit=crop&q=60"
};

export const songs: Song[] = [
  {
    id: "song1",
    title: "Summer Vibes",
    artist: "Sunshine Band",
    album: "Hot Season",
    duration: "3:45",
    coverArt: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&auto=format&fit=crop&q=80",
  },
  {
    id: "song2",
    title: "Midnight Dreams",
    artist: "Moon Walkers",
    album: "Night Owl",
    duration: "4:20",
    coverArt: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&auto=format&fit=crop&q=80",
  },
  {
    id: "song3",
    title: "City Lights",
    artist: "Urban Echo",
    album: "Metropolitan",
    duration: "3:55",
    coverArt: "https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?w=300&h=300&auto=format&fit=crop&q=80",
  },
  {
    id: "song4",
    title: "Mountain High",
    artist: "Peak Climbers",
    album: "Altitude",
    duration: "4:10",
    coverArt: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&auto=format&fit=crop&q=80",
  },
  {
    id: "song5",
    title: "Ocean Waves",
    artist: "Coastal Dreams",
    album: "Seaside",
    duration: "3:30",
    coverArt: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&auto=format&fit=crop&q=80",
  },
  {
    id: "song6",
    title: "Forest Whispers",
    artist: "Nature Sounds",
    album: "Green Life",
    duration: "5:15",
    coverArt: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=300&h=300&auto=format&fit=crop&q=80",
  },
  {
    id: "song7",
    title: "Electronic Dreams",
    artist: "Digital Wave",
    album: "Cyber Space",
    duration: "4:05",
    coverArt: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&auto=format&fit=crop&q=80",
  },
  {
    id: "song8",
    title: "Jazz Night",
    artist: "Smooth Quartet",
    album: "Club Sessions",
    duration: "6:20",
    coverArt: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=300&h=300&auto=format&fit=crop&q=80",
  }
];

export const playlists: Playlist[] = [
  {
    id: "playlist1",
    name: "Chill Vibes",
    description: "Perfect for relaxing afternoons",
    coverImage: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&auto=format&fit=crop&q=80",
    createdBy: "user1",
    songs: [songs[0], songs[2], songs[4]],
    createdAt: new Date(2023, 5, 15).toISOString(),
    updatedAt: new Date(2023, 6, 10).toISOString(),
  },
  {
    id: "playlist2",
    name: "Workout Mix",
    description: "High energy songs to keep you moving",
    coverImage: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&auto=format&fit=crop&q=80",
    createdBy: "user1",
    songs: [songs[1], songs[3], songs[6]],
    createdAt: new Date(2023, 7, 5).toISOString(),
    updatedAt: new Date(2023, 8, 15).toISOString(),
  },
  {
    id: "playlist3",
    name: "Focus Time",
    description: "Concentration and productivity boost",
    coverImage: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&auto=format&fit=crop&q=80",
    createdBy: "user1",
    songs: [songs[5], songs[7]],
    createdAt: new Date(2023, 9, 20).toISOString(),
    updatedAt: new Date(2023, 10, 5).toISOString(),
  }
];
