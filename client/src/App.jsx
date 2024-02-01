import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import FooterComp from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

          <Route path="/projects" element={<Projects />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
        </Routes>
        <FooterComp />
      </BrowserRouter>
    </>
  );
}

export default App;
