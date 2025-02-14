import { Home } from './pages/Home';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AppProvider } from './context/AppProvider';

export const App = () => {
    return (
        <AppProvider>
            <Header />
            <Home />
            <Footer />
        </AppProvider>
    );
};