import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import RoutesPage from './Routes/Routes'
import GlobalContext
  from './ContextApi/GlobalContext'
function App() {
  return (
    <GlobalContext  >
      <RoutesPage />
    </GlobalContext>
  )
}



export default App
