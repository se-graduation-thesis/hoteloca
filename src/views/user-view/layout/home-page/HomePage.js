import NavBarHomePage from "../navbar/NavBarHomePage";
import CarouselHomePage from "./components/carousel/CarouselHomePage";
import './HomePage.css';
import ServiceHomePage from "./components/service/ServiceHomePage";
import ContentHomePage from "./components/content/ContentHomePage";

export default function HomePage() {

    return (
        <div className="body">
            <div className="carousel">
                <CarouselHomePage />
            </div>

            <div className="service">
                <ServiceHomePage />
            </div>

            <div className="content">
                <ContentHomePage />
            </div>
        </div>
    );
}