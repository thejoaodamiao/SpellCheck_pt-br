
import { CiCircleAlert } from "react-icons/ci";

import './Alert.css';

const Alert = ({ onClose }) => {
  return (
    <div className="alert-container">
      <div className="alert">
        <CiCircleAlert className="alert-icon"/>
        <p>
            <span>Existem navegadores recomendados por motivo de clareza nas vozes aqui utilizadas, eles sendo:</span>
            Google Chorme, Mozilla firefox e Microsoft Edge.
        </p>
        <p>
          ps: existe ainda um bug de quando vc atualiza a pagina sem terminar a partida inteira, quando vc voltar e tenta fazer um palpite, os botoes resetam
        </p>
        
        <div className="alert-button" onClick={onClose}>Fechar</div>
      </div>
    </div>
  );
};

export default Alert;