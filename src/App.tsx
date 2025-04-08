import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import SavedPage from "./pages/SavedPage";
import ExplorePage from "./pages/ExplorePage";
import OpportunityDetailPage from "./pages/OpportunityDetailPage";
import ApplicationChecklistPage from "./pages/ApplicationChecklistPage";
import InterviewTipsPage from "./pages/InterviewTipsPage";
import DecisionTipsPage from "./pages/DecisionTipsPage";
import Begin from "./pages/BeginPage";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import SignUpInfoPage from "./pages/SignUpInfoPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Begin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-info" element={<SignUpInfoPage />} />
          <Route path="/home" element={<Index />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/opportunity/:id" element={<OpportunityDetailPage />} />
          <Route path="/apply/:id" element={<ApplicationChecklistPage />} />
          <Route path="/interview-tips" element={<InterviewTipsPage />} />
          <Route path="/decision-tips" element={<DecisionTipsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
