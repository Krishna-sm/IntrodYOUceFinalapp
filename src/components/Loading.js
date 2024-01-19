import React from "react";
import ReactLoading from "react-loading";
 
const   Loading =()=> {
    return (
        <div style={{flex: 1,
            alignItems: 'center', 
            justifyContent: 'center'}}>
        
            <ReactLoading type="spokes" color="#0000FF"
                height={100} width={500}  />
         
        </div>
    );
}

export default Loading