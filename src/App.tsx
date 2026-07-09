import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import { SearchProvider } from "@/contexts/SearchContext";
import { SherpaProvider } from "@/contexts/SherpaContext";
import { RunProvider } from "@/contexts/RunContext";
import { WorkspaceProvider } from "@/contexts/WorkspaceContext";
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

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem themes={["light", "dark", "blue"]} storageKey="emt-sun-theme">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SearchProvider>
            <RunProvider>
              <WorkspaceProvider>
                <SherpaProvider>
                  <SearchModal />
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
                    <Route path="/login" element={<Login />} />
                    <Route path="/changelog" element={<Changelog />} />
                    <Route path="/docs/*" element={<Documentation />} />
                    <Route path="/api/*" element={<ApiReference />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </SherpaProvider>
              </WorkspaceProvider>
            </RunProvider>
          </SearchProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
