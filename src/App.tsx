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

function ProtectedRoutes() {
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

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/studio/:workflowId?" element={<Studio />} />
      <Route path="/templates" element={<Templates />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/automations" element={<Automations />} />
      <Route path="/runs" element={<RunHistory />} />
      <Route path="/runs/:runId" element={<RunDetail />} />
      <Route path="/codebase" element={<Codebase />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/changelog" element={<Changelog />} />
      <Route path="/docs/*" element={<Documentation />} />
      <Route path="/api/*" element={<ApiReference />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
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
                    <Route path="/login" element={<Login />} />
                    <Route path="/*" element={<ProtectedRoutes />} />
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
