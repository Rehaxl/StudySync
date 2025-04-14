import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import mystore from "./redux/store";
import PYQUploader from './components/PYQUploader';
// Screens
import Login from "./components/Login";
import StudentHome from "./Screens/Student/Home";
import FacultyHome from "./Screens/Faculty/Home";
import AdminHome from "./Screens/Admin/Home";

const App = () => {
  return (
    <Provider store={mystore}>
      <Router>
        <Routes>
          {/* Login Route */}
          <Route path="/" element={<Login />} />

          {/* Dashboard Routes */}
          <Route path="/student" element={<StudentHome />} />
          <Route path="/faculty" element={<FacultyHome />} />
          <Route path="/admin" element={<AdminHome />} />
        </Routes>
      </Router>
    </Provider>
    
  );
  
    return <PYQUploader />;
};

export default App;
