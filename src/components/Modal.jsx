import React,{useState,useEffect} from 'react';
import MyModal from './ShowModal';
import axios from 'axios';
import styled from "styled-components";

const API_endpoint = process.env.REACT_APP_API_GEOLOCATION

const API_key = process.env.REACT_APP_API_KEY_GEO
const Modal = () => {
 const [latitude, setLatitude] = useState('');
 const [longitude, setLongitude] = useState('');
 const [responseData, setResponseData] =useState({})
 useEffect(()=>{
  navigator.geolocation.getCurrentPosition((position)=>{
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
  })
  let finalAPIEndPoint = `${API_endpoint}lat=${latitude}&lon=${longitude}&appid=${API_key}`
 
  axios.get(finalAPIEndPoint)
  .then((response)=>{
    setResponseData(response.data)
   
  })
 },[latitude,longitude])
// ------------------------------------------------------------------
  useEffect(() => {
    
      setShowModal(true)
      setTimeout(()=>{
        setShowModal(false)
      }, 5000)
   
  } ,[]);

  const [showModal, setShowModal]= useState(false);

  const closeModal = ()=>setShowModal(false);
  
   

  return(
  <Wrapper>
  <div className='Stripe'>
  <button className='ShowOffer' onClick={()=> setShowModal(true)}>Show Offers</button>
  {showModal && <MyModal closeModal={closeModal}/>}
  <h4>City:{responseData.name}</h4>
  </div>
 
  
  </Wrapper>)
}
const Wrapper = styled.section`
 .Stripe{
  background-color:${({ theme }) => theme.colors.bg};
  color:${({ theme }) => theme.colors.black};
  align-items: space-between;
 }
 .Stripe>h4{
  width: 150px;
  color: ${({ theme }) => theme.colors.black};
  float: left;
  font-size:2rem;
  margin-top: 5px;

 }
 .ShowOffer{
  padding: 0.6rem 1.4rem;
  font-size:1.4rem;
  border:none;
  border-radius: 0.3rem;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  font-family: "Work sans",sans-serif;
  
 }
 .dark 
 {
  background-color:#fff;
  color:#000
 }
`;

export default Modal