import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import UserRoutes from "./Routes/UserRoutes"
import { ToastContainer } from 'react-toastify';


function App() {
  

  return (
    <>
    <ToastContainer 
        position="top-center"
        reverseOrder={false}
         />
 <Router>
  <Routes>
     <Route path="/*" element={<UserRoutes/>}/>
  </Routes>
 </Router>
    </>
  )
}

export default App
