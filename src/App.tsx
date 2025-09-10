import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import { Login } from './components/layout/Login_page'
import { Layout } from 'lucide-react'
import PrivateRoute from './utils/PrivateRoute'
import Home from './pages/Home'
import { Toaster } from 'sonner'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' 
          element={
            <PrivateRoute>
              <Layout/>
              </PrivateRoute>
          }
        >
          <Route index element={<Home/>}/>
        </Route>
      </Routes>
      <Toaster position='top-center'/>
    </Router>
  )
}

export default App
