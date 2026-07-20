import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { SearchProvider } from "@/contexts/SearchContext";
import { RunProvider } from "@/contexts/RunContext";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { SearchModal } from "@/components/search";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Studio from "./pages/Studio";
import Templates from "./pages/Templates";
import Skills from "./pages/Skills";
import Automations from "./pages/Automations";
import RunHistory from "./pages/RunHistory";
import RunDetail from "./pages/RunDetail";
import Codebase from "./pages/Codebase";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Changelog from "./pages/Changelog";
import Documentation from "./pages/Documentation";
import ApiReference from "./pages/ApiReference";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function Protected({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem themes={["light", "dark", "blue"]} storageKey="dbsherpa-studio-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <SearchProvider>
              <RunProvider>
                <WorkspaceProvider>
                  <SearchModal />
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/changelog" element={<Changelog />} />
                    <Route path="/docs/*" element={<Documentation />} />
                    <Route path="/api/*" element={<ApiReference />} />
                    <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
                    <Route path="/studio/:workflowId?" element={<Protected><Studio /></Protected>} />
                    <Route path="/templates" element={<Protected><Templates /></Protected>} />
                    <Route path="/skills" element={<Protected><Skills /></Protected>} />
                    <Route path="/automations" element={<Protected><Automations /></Protected>} />
                    <Route path="/runs" element={<Protected><RunHistory /></Protected>} />
                    <Route path="/runs/:runId" element={<Protected><RunDetail /></Protected>} />
                    <Route path="/codebase" element={<Protected><Codebase /></Protected>} />
                    <Route path="/settings" element={<Protected><Settings /></Protected>} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </WorkspaceProvider>
              </RunProvider>
            </SearchProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
