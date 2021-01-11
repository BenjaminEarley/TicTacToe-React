import ReactDOM from 'react-dom';
import Game from './game';
import './index.css';

function Home() {
    return (
        <div className="home">
            <Game/>
        </div>
    );
}

// ========================================

ReactDOM.render(<Home/>, document.getElementById("root"));

