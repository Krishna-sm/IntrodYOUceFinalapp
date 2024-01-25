import React,{useState} from 'react'
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
const url = process.env.REACT_APP_LOGIN_API_URL || `http://localhost:5001/api/auth`
export const LoginSignup = () => {

  const [action,setAction] = useState("Login")
  let navigate = useNavigate();
  const [message,setMessage] = useState('')
  const initialValues = {
      
      email:'',
      password:""
      
  }

  const [values,setValues] = useState(initialValues);

  const handleInputChange = (e) => {
      const {name,value} = e.target;
      setValues({
          ...values,
          [name]:value
      })
  }

  const checkout = () => {
    console.log(values)
    fetch(`${url}/login`,{
        method: 'POST',
        headers:{
            'accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify(values)
    })
    .then((res) => res.json())
    .then((data) => {
        if(data.auth === false){
            setMessage(data.token)
        }else{
            sessionStorage.setItem('ltk',data.token)
            navigate('/')
        }
    })
}


return ( <Wrapper>
  
   <div className="container">
    <div className="header">
      <div className="text">{action}</div>
      <div className="underlined"></div>
      <h2 style={{color:'red'}}>{message}</h2>
    </div>  
      <div>
        <div className="inputs">
          
          <div className="input">
            <img src="images/email.png" alt="" />
            <input type="email" id="email" name="email" value={values.email} onChange={handleInputChange}/>
          </div>
         
          <div className="input">
            <img src="images/password.png" alt="" />
            <input type="password" id="password" name="password" value={values.password} onChange={handleInputChange}/>
          </div>
        </div>
      </div>

      <div className="submit-container">
      <NavLink to="/signup">   <div className={action==="Login"?"submit grey":"submit"}>Sign up</div></NavLink>
      <div onClick={checkout} className={action==="Sign Up"?"submit grey":"submit"}>Login</div>
      </div>
   </div>
 
  </Wrapper>
)
};

const Wrapper = styled.section`


.container{
display: flex;
flex-direction:column;
margin:auto;

background:#fff;
padding-bottom:30px;
width:600px;
}

.header{
display:flex;
flex-direction:column;
align-items:center;
gap:9px;
width:100%;
margin-top:30px;
}

.text{
color:#3c009d;
font-size:48px;
font-weight:700;
}

.header .underlined{
width:61px;
height:6px;
background:#3c009d;
border-radius:9px;
}
.inputs {
margin-top:55px;
display:flex;
flex-direction:column;
gap:25px;
}
.input{
display:flex;
align-items:center;
margin:auto;
width:480px;
height:80px;
background:#eaeaea;
border-radius:6px;

}

.input img {
margin: 0px 30px;
}
.input input {
height:50px;
width:350px;
background:transparent;
border:none;
outline:none;
color:#796969;
font-size:19px;

}
.forgot-password{
padding-left:62px;
margin-top:27px;
color:#797979;
font-size:18px;


}

.forgot-password span {
color:#4c00b4;
cursor:pointer;
}

.submit-container{
display:flex;
gap:30px;
margin:60px auto;
}

.submit{
display:flex;
justify-content:center;
align-items:center;
width:220px;
height:59px;
color:#4fff;
background:#4c00b4;
border-radius:50px;
font-size:19px;
font-weight:pointer;
cursor:pointer;

}
.grey{
background:#EAEAEA;
color:#676767;
}
`;


export default LoginSignup;
