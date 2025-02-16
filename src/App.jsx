import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { AppProvider } from "./context/AppProvider";
import "./App.css";

export const App = () => {
  return (
    <AppProvider>
      <div className="app-container">
        <Header />
        <Home />
        <Footer />
      </div>
    </AppProvider>
  );
};
