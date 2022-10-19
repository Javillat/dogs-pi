import { Link } from "react-router-dom";
import dog from "../../img/dog.png";

const LandingPage = () => {
    return(
        <div>
            <Link to="/home">
                <button className="home_button">Watch dog breeds</button>
            </Link>
            <img src={dog} alt="Loading" />
        </div>
    );
}

export default LandingPage;