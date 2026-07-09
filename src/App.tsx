import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchProvider } from "@/contexts/SearchContext";
import { SearchModal } from "@/components/search";
import Index from "./pages/Index";
import Changelog from "./pages/Changelog";
import Documentation from "./pages/Documentation";
import ApiReference from "./pages/ApiReference";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SearchProvider>
          <SearchModal />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/docs/*" element={<Documentation />} />
            <Route path="/api/*" element={<ApiReference />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </SearchProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
