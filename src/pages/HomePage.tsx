import { useNavigate } from "react-router-dom";
import { Navbar } from '../components/Navbar';
import { Footer } from "../components/Footer";
import  SearchBar  from "../components/SearchBar";


export const HomePage = () => {
    
    const navigate = useNavigate(); // Hook para la navegación programática

    return (
    <div>
      <Navbar />
       <SearchBar />
       
      <div>
        <h1>Pokemon App</h1>
        <div>           
            <button onClick={() => navigate('/ZonaDeCaptura')}>Empezar</button>
        </div>
        <p>by Bolaldo</p>
      </div>
      <Footer />
    </div>
    );
}