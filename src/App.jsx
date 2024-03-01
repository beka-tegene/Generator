import { Route, Routes } from "react-router-dom"
import Login from "./Auth/Login"
import Dashboard from "./Page/Dashboard"
import Map from "./Page/Map"
import Table from "./Page/Table"
import UserManagement from "./Page/UserManagement"
import Profile from "./Page/Profile"
import DetailGenerator from "./Page/DetailGenerator"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/map" element={<Map />} />
      <Route path="/table" element={<Table />} />
      <Route path="/table/:id/detail" element={<DetailGenerator />} />
      <Route path="/user/management" element={<UserManagement />} />
      <Route path="/account/profile" element={<Profile />} />
    </Routes>
  )
}

export default App
