import { Link } from "react-router-dom";
import dog from "../../img/dog.png";
import "./Landing.css"

const LandingPage = () => {
    return(
        <div>
            <Link to="/home">
                <button className="button1 home_button">Watch dog breeds</button>
            </Link>
            <img src={dog} alt="Loading" />
        </div>
    );
}

export default LandingPage;