import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthContentProvider } from './context/AuthContent.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContentProvider>
     <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContentProvider>

   

)
