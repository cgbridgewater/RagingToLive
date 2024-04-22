import { Link } from 'react-router-dom';

const Button = ({ to, text, type }) => {
    
    return (
        <Link to={ to } className='ButtonBox'>
            <button>
                { text }
            </button>
        </Link>
    );
};

export default Button;
