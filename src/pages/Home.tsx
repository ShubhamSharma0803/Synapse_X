import Hero from "../components/Hero";
import BentoGrid from "../components/BentoGrid";
import TeamCarousel from "../components/TeamCarousel";
import CompetitiveEdge from "../components/CompetitiveEdge";
import Footer from "../components/Footer";

interface HomeProps {
    onGhostLaunch?: () => void;
}

const Home = ({ onGhostLaunch }: HomeProps) => {
    return (
        <>
            <Hero onGhostLaunch={onGhostLaunch} />
            <BentoGrid />
            <TeamCarousel />
            <CompetitiveEdge />
            <Footer />
        </>
    );
};

export default Home;
