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
import YCInterviewTipsPage from "./pages/YCInterviewTipsPage";
import YCDecisionTipsPage from "./pages/YCDecisionTipsPage";
import YCEligibilityPage from "./pages/YCEligibilityPage";
import VentureLabInterviewTipsPage from "./pages/VentureLabInterviewTipsPage";
import VentureLabDecisionTipsPage from "./pages/VentureLabDecisionTipsPage";
import VentureLabEligibilityPage from "./pages/VentureLabEligibilityPage";
import Begin from "./pages/BeginPage";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import SignUpInfoPage from "./pages/SignUpInfoPage";
import Intro from "./pages/IntroPage";
import { SavedOpportunitiesProvider } from "./lib/SavedOpportunitiesContext";
import { UserProfileProvider } from "./lib/UserProfileContext";
import CompetitionInterviewTipsPage from "@/pages/CompetitionInterviewTipsPage";
import InvestorInterviewTipsPage from "@/pages/InvestorInterviewTipsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProfileProvider>
        <SavedOpportunitiesProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Begin />} />
              <Route path="/intro" element={<Intro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signup-info" element={<SignUpInfoPage />} />
              <Route path="/home" element={<Index />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/saved" element={<SavedPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/opportunity/:id" element={<OpportunityDetailPage />} />
              <Route path="/apply/:id" element={<ApplicationChecklistPage />} />
              <Route path="/interview-tips/:id" element={<InterviewTipsPage />} />
              <Route path="/competition-interview-tips/:id" element={<CompetitionInterviewTipsPage />} />
              <Route path="/investor-interview-tips/:id" element={<InvestorInterviewTipsPage />} />
              <Route path="/decision-tips/:id" element={<DecisionTipsPage />} />
              <Route path="/yc-interview-tips/:id" element={<YCInterviewTipsPage />} />
              <Route path="/yc-decision-tips/:id" element={<YCDecisionTipsPage />} />
              <Route path="/yc-eligibility/:id" element={<YCEligibilityPage />} />
              <Route path="/venture-lab-interview-tips/:id" element={<VentureLabInterviewTipsPage />} />
              <Route path="/venture-lab-decision-tips/:id" element={<VentureLabDecisionTipsPage />} />
              <Route path="/venture-lab-eligibility/:id" element={<VentureLabEligibilityPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SavedOpportunitiesProvider>
      </UserProfileProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
