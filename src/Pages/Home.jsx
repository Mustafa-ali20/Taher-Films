import React from "react";
import Name from "../Components/Home/Name";
import ProjectsDisplay from "../Components/Home/ProjectsDisplay";
import Footer from "../Components/Home/Footer";

function Home() {
  return (
    <div className="min-h-screen items-center justify-center overflow-hidden">
      <Name />
      <ProjectsDisplay />
      <Footer />
    </div>
  );
}

export default Home;
