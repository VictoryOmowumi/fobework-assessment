import React, {lazy, Suspense} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Accounts = lazy(() => import('./pages/Accounts'))
const Transactions = lazy(() => import('./pages/Transactions'))
const Investments = lazy(() => import('./pages/Investments'))
const Settings = lazy(() => import('./pages/Settings'))
const Goals = lazy(() => import('./pages/Goals'))

const App = () => {
  return (
    <Router>
      <MainLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/goals" element={<Goals />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  )
}

export default App