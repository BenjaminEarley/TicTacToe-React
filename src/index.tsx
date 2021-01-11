import ReactDOM from 'react-dom';
import Game from './Game/game';
import './index.css';

function Home() {
    return (
        <Game/>
    );
}

// ========================================

ReactDOM.render(<Home/>, document.getElementById("root"));

