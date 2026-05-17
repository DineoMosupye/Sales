import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RequestQuotePage from "./pages/RequestQuotePage";
import SealTypePage from "./pages/SealTypePage";
import SealKnowledge from "./pages/SealKnowledge";
import KnowInfoPage from "./pages/KnowInfoPage";
import DontKnowInfoPage from "./pages/DontKnowInfoPage";
import ConfirmPage from "./pages/ConfirmPage";
import BookTechnicianPage from "./pages/BookTechnicianPage";
import DashboardPage from "./pages/DashboardPage";
import { AuthProvider } from "./state/AuthContext";
import { RequestProvider } from "./state/RequestContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RequestProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/request-quote"
                element={
                  <ProtectedRoute>
                    <RequestQuotePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/seal-type"
                element={
                  <ProtectedRoute>
                    <SealTypePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/seal-knowledge"
                element={
                  <ProtectedRoute>
                    <SealKnowledge />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/know-info"
                element={
                  <ProtectedRoute>
                    <KnowInfoPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dont-know-info"
                element={
                  <ProtectedRoute>
                    <DontKnowInfoPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/confirm"
                element={
                  <ProtectedRoute>
                    <ConfirmPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/book-technician"
                element={
                  <ProtectedRoute>
                    <BookTechnicianPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </RequestProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
