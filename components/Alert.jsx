
import { CiCircleAlert } from "react-icons/ci";

import './Alert.css';

const Alert = ({ onClose }) => {
  return (
    <div className="alert-container">
      <div className="alert">
        <CiCircleAlert className="alert-icon"/>
        <p>
            <h3>Existem navegadores recomendados por motivo de clareza nas vozes aqui utilizadas, eles sendo:</h3>
            Google Chorme, Mozilla firefox e Microsoft Edge
        </p>
        
        <div className="alert-button" onClick={onClose}>Fechar</div>
      </div>
    </div>
  );
};

export default Alert;