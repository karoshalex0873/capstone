
import { Route, Routes } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";
import Hero from "./components/Hero/Hero";

const App = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/project" element={<ProjectPage />} />
      </Routes>
    </div>
  );
};

export default App;
