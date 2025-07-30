import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Header from "@/components/Header";
import ConnectionStatus from "@/components/ConnectionStatus";
import TestGiftGeneration from "@/components/TestGiftGeneration";
import TestPreviewDirect from "@/components/TestPreviewDirect";
import TestGenerateGiftOnly from "@/components/TestGenerateGiftOnly";
import TestPreviewSimple from "@/components/TestPreviewSimple";
import TestNavigation from "@/components/TestNavigation";
import SimpleTest from '@/components/SimpleTest';
import Index from "./pages/Index";
import Create from "./pages/Create";
import Preview from "./pages/Preview";
import Gift from "./pages/Gift";
import UserDashboard from "./pages/UserDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ProtectedRoute>
            <Header />
            <ConnectionStatus />
            <div className="pt-16">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/create" element={<Create />} />
                <Route path="/preview" element={<Preview />} />
                <Route path="/dashboard" element={<UserDashboard />} />
                <Route path="/gift/:giftId" element={<Gift />} />
                <Route path="/test" element={<TestGiftGeneration />} />
                <Route path="/test-preview" element={<TestPreviewDirect />} />
                <Route path="/test-generate" element={<TestGenerateGiftOnly />} />
                <Route path="/preview-simple" element={<TestPreviewSimple />} />
                <Route path="/test-nav" element={<TestNavigation />} />
                <Route path="/simple" element={<SimpleTest />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </ProtectedRoute>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
