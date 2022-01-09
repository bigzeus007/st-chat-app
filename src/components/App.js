import React from "react"

import { BrowserRouter , Routes , Route } from "react-router-dom"

import { AuthProvider } from "../contexts/AuthContext"

import Chats from "./Chats"
import Login from "./Login"

function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="chats" element={<Chats/>} />
            <Route path="/" element={<Login/>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
}

export default App