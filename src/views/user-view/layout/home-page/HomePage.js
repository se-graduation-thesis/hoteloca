import NavBarHomePage from "./components/navbar/NavBarHomePage";
import CarouselHomePage from "./components/carousel/CarouselHomePage";
import './HomePage.css';
import ServiceHomePage from "./components/service/ServiceHomePage";

export default function HomePage() {

    return (
        <div className="body">
            <div className="navbar">
                <NavBarHomePage />
            </div>

            <div className="carousel">
                <CarouselHomePage />
            </div>

            <div className="service">
                <ServiceHomePage />
            </div>
        </div>
    );
}