import styled from "styled-components";
import React,{useState} from 'react';
import { useParams} from 'react-router-dom';

const Contact = () => {
  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;
  let params = useParams();

  let sessionData = sessionStorage.getItem('userInfo');
  let data = JSON.parse(sessionData)


  
  const initialValues = {
    id:Math.floor(Math.random() * 1000000),
    rest_name: params.restName,
    name:(data?data.name:null),
    email:(data?data.email:null),
    cost:Math.floor(Math.random()*1000),
    phone:(data?data.phone:null),
    address:"Hon 12 sec 34"
}
const [values,setValues] = useState(initialValues);

const handleInputChange = (e) => {
    const {name,value} = e.target;
    setValues({
        ...values,
        [name]:value
    })
}


if(data){
  return (
    <Wrapper>
      <h2 className="common-heading">Contact page</h2>

      <iframe title="myFrame" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29326.222780636188!2d77.4813108619777!3d23.25116975687756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c41dafcd2bacf%3A0x775fa4cd7209c2c0!2sSolitaire%20Inn%20Boys%20Hostel%20-%20Best%20hostel%20for%20boys!5e0!3m2!1sen!2sin!4v1703934075197!5m2!1sen!2sin" width="100%"height="400"style={{ border: 0 }}allowFullScreen=""loading="lazy"referrerPolicy="no-referrer-when-downgrade"></iframe>

      <div className="container">
        <div className="contact-form">
          <form
            action="https://formspree.io/f/xyyryzqw"
            method="POST"
            className="contact-inputs">
            <input
              type="text"
              placeholder="username"
              name="username"
              value={values.name} 
              style={{color:"black"}}
              required
              autoComplete="off"
            />
           
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              style={{color:"black"}}
              required
              id="email"
              value={values.email} 
              onChange={handleInputChange}
            />

            <textarea
              name="Message"
              style={{color:"black"}}
              cols="30"
              rows="10"
              required
              autoComplete="off"
              placeholder="Enter you message"></textarea>

            <input type="submit" value="send" />
          </form>
        </div>
      </div>
    </Wrapper>
  );
}
else{

  return (
    <Wrapper>
      <h2 className="common-heading">Contact page</h2>

      <iframe title="myFrame" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29326.222780636188!2d77.4813108619777!3d23.25116975687756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c41dafcd2bacf%3A0x775fa4cd7209c2c0!2sSolitaire%20Inn%20Boys%20Hostel%20-%20Best%20hostel%20for%20boys!5e0!3m2!1sen!2sin!4v1703934075197!5m2!1sen!2sin" width="100%"height="400"style={{ border: 0 }}allowFullScreen=""loading="lazy"referrerPolicy="no-referrer-when-downgrade"></iframe>

      <div className="container">
        <h2>Kindly login to send direct messages</h2>
      </div>
    </Wrapper>
  );
}
 
};

export default Contact;