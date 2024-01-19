

const MyModal = ({closeModal})=> {



    return (
    <>
     <div className="modal-wrapper"onClick={closeModal}></div>
     <div className="modal-container">
     <button  className="modal-btn" onClick={closeModal}>x</button>
     <img src="images/modal.png" alt="Modal" className="responsive"/>
   
    </div>
    </>
    )
  };


  export default MyModal;