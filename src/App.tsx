import React from "react";
import { Routes, Route } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Paymanet from "./pages/Paymanet";
import Main from "./pages/Main";
import TvShows from "./pages/TvShows";
import UserProfile from "./pages/UserProfile";
import Movies from "./pages/Movies";
import MyList from "./pages/MyList";
import NewPopular from "./pages/NewPopular";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<SignUp />} />
      <Route path="/payment" element={<Paymanet />} />
      <Route path="/main" element={<Main />} />
      <Route path="/tvShows" element={<TvShows />} />
      <Route path="/new&popular" element={<NewPopular />} />
      <Route path="/userProfile" element={<UserProfile />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/mylist" element={<MyList />} />
    </Routes>
  );
};

export default App;
