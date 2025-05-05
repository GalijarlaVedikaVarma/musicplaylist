
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlaylistProvider } from "./contexts/PlaylistContext";
import { UserProvider } from "./contexts/UserContext";
import { SongProvider } from "./contexts/SongContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PlaylistDetail from "./pages/PlaylistDetail";
import Library from "./pages/Library";
import CreatePlaylist from "./pages/CreatePlaylist";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <PlaylistProvider>
        <SongProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/library" element={<Library />} />
                <Route path="/create-playlist" element={<CreatePlaylist />} />
                <Route path="/playlist/:id" element={<PlaylistDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </SongProvider>
      </PlaylistProvider>
    </UserProvider>
  </QueryClientProvider>
);

export default App;
