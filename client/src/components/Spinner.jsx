import SpinnerOutter from "../assets/spinner_background.png"
import SpinnerInner from "../assets/spinner_bee.gif"

const Spinner = () => {

    return(
        <div className="SpinnerBackground">
            <img className="Spinner" src={ SpinnerOutter } alt="Key spinner" />
            <img className="Center" src={ SpinnerInner } alt="Key spinner" />
        </div>
    )
}

export default Spinner;