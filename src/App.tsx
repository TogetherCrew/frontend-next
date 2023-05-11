import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';
import CommunityInsights from './pages/CommunityInsights';
import OnBoarding from './pages/OnBoarding';
import Callback from './pages/Callback';

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
        <Route path="/callback" element={<Callback />} />
        <Route path="*" element={<div>dsa</div>} />
      </Routes>
    </Router>
  );
}

export default App;
