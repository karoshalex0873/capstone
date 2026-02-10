
import { Route, Routes } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";
import Hero from "./components/Hero/Hero";

const App = () => {
  return (
    <Routes >
      <Route path="/" element={
        <Hero  />} />
      <Route path="/project" element={<ProjectPage />} />
    </Routes>

  );
};

export default App;
