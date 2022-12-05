import React, { useEffect, useState } from 'react';
import CloseIcon from '../../assets/icons/modal-close-icon.png';
import './styles.css';
import CheckIcon from '../../assets/icons/green-check.png';

const BlueHeaderSuccessModal = ({key}) =>{

    const [onShow, setOnShow] = useState(true);
    const handleClose = () => {
        setOnShow(false);
    }
    useEffect(() => {
        setOnShow(true)
       
    },[key])

    const alert = {
        background: "rgba(0, 0, 0, 0.459)",
        width: '100vw',
        position: 'fixed',
        height: '100vh',
        top: 0,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
    }
    const hide = {
        display: 'none'
    }
    return (
        <div style={(onShow) ? alert : hide}>
          <div className="card-cover">
            <div className="close-icon-wrapper">
             <img src={CloseIcon} onClick={() => handleClose()} alt="close modal box" className="close-icon" />
            </div>
           <div className="success-content-container">
               <div className="success-model-header-container">
                   <div className="title-wrapper">
                    <h5>Notice</h5>
                   </div>
                 </div>
                 <div className="message-wrapper">
                     <h5>Successful</h5>
                     <img src={CheckIcon} alt="green check icon" />
                 </div>
           </div>        
          </div>
        </div>
    );

}
export default BlueHeaderSuccessModal;