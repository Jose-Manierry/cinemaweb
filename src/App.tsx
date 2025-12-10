import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import AppRoutes from "./routers/AppRoutes.tsx";


function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="container mt-4">
        <AppRoutes />
      </main>
    </BrowserRouter>
  );
}

export default App;
