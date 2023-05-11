import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import CommunityInsights from './pages/CommunityInsights';
import OnBoarding from './pages/OnBoarding';
import { Envs, ensureEnvironments } from './config/index';

const env: Envs = ensureEnvironments();

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/community-insights"
          element={
            <DefaultLayout>
              <CommunityInsights />
            </DefaultLayout>
          }
        />
        <Route path="/try-now" element={<OnBoarding />} />
        <Route path="*" element={<div>dsa</div>} />
      </Routes>
    </Router>
  );
}

export default App;
