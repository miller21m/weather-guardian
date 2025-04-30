import CurrentStateList from "../components/CurrentStateList";
import './CurrentState.css';

function CurrentState() {
    return(
        <div className="current-state-list-container">
            <div className="current-state-list">
                <CurrentStateList></CurrentStateList>
            </div>
        </div>
    )

}

export default CurrentState;
