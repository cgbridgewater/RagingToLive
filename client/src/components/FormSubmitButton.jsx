import { Link } from 'react-router-dom';

const FormSubmit = ({ text, type }) => {
    
    return (
        <button type={ type } className='FormButton' >
                { text }
        </button>
    );
};

export default FormSubmit;