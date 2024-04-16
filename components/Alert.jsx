
import { CiCircleAlert } from "react-icons/ci";

import './Alert.css';

const Alert = ({ onClose }) => {
  return (
    <div className="alert-container">
      <div className="alert">
        <CiCircleAlert className="alert-icon"/>
        <p>
            <span>Existem navegadores recomendados por motivo de clareza nas vozes aqui utilizadas, eles sendo:</span>
            Google Chorme, Mozilla firefox e Microsoft Edge
        </p>
        
        <div className="alert-button" onClick={onClose}>Fechar</div>
      </div>
    </div>
  );
};

export default Alert;