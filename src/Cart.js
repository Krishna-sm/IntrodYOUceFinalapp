import styled from "styled-components";
import { useCartContext } from "./context/cart_context";
import CartItem from "./components/CartItem";
import { NavLink } from "react-router-dom";
import { Button } from "./styles/Button";
import FormatPrice from "./Helpers/FormatPrice";
import axios from "axios";
import React,{useState} from 'react';
import { useParams} from 'react-router-dom';


const Cart = () => {
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
  
  const { cart ,clearCart, total_price, shipping_fee} = useCartContext();
 if( cart.length === 0 )
 {
   return (
    <EmptyDiv>
    <h1 >No template in your cart</h1>
    <img src="https://i.ibb.co/wLyzygp/pngegg.png" alt="" className="NoCart" />
    
    </EmptyDiv>
   )
   
 }

 const CheckoutHandler = async({name,amount})=>{
     const {data:{order}} = await axios.post("http://localhost:9120/payment/checkout",{
      name,amount
     })
     var options = {
      "key": "rzp_test_LyJ0i6pR9WyJin", // Enter the Key ID generated from the Dashboard
      "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": order.currency,
      "name": "IntrodYOUce",
      "description": "Test Transaction",
      "image": "images/logo.png",
      "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url":"http://localhost:9120/payment/payment-verification",
      "prefill": {
          "name": values.name,
          "email": values.email,
          "contact": values.phone
      },
      "notes": {
          "address": "Razorpay Corporate Office"
      },
      "theme": {
          "color": "#3399cc"
      }
  };
  var rzp1 = new window.Razorpay(options);
    rzp1.open();

 }
 
  return (
    <Wrapper>
      <div className="container">
        <div className="cart_heading grid grid-five-column">
          <p>Item</p>
          <p className="cart-hide">Price</p>
          <p>Quantity</p>
          <p className="cart-hide">Subtotal</p>
          <p>Remove</p>
        </div>
        <hr />
          
        <div className="cart-item">
          {cart.map((curElem) => {
            return <CartItem key={curElem.id} {...curElem} onCheckout={CheckoutHandler}/>;
          })}
        
        </div>
        <hr />
        <div className="cart-two-button">
          <NavLink to="/products"><Button>Continue to search</Button></NavLink>
          <NavLink>
            <Button className="btn btn-place" >Place order</Button>
          </NavLink>
          <NavLink>
            <Button className="btn btn-clear" onClick={clearCart}>Clear cart</Button>
          </NavLink>
        </div>
        <div className="order-total--amount">
          <div className="order-total--subdata">
            <div>
              <p>Subtotal:</p>
              <p><FormatPrice price={total_price}/></p>
            </div>
            <div>
              <p>Portal charge:</p>
              <p><FormatPrice price={shipping_fee}/></p>
            </div>
            <hr />
            <div>
              <p>Total order amount:</p>
              <p><FormatPrice price={total_price + shipping_fee}/></p>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
       
};

const EmptyDiv = styled.section`

  display:grid;
  place-items:center;
  height:50vh;

  h3 {
    font-size:4.2 rem;
    text-transform:capitalize;
    font-weight:300;
  }

  .NoCart {
    height:50vh;
    width:30vw;
  }

`;

const Wrapper = styled.section`
  padding: 9rem 0;

  .grid-four-column {
    grid-template-columns: repeat(4, 1fr);
  }

  .grid-five-column {
    grid-template-columns: repeat(4, 1fr) 0.3fr;
    text-align: center;
    align-items: center;
  }
  .cart-heading {
    text-align: center;
    text-transform: uppercase;
  }
  hr {
    margin-top: 1rem;
  }
  .cart-item {
    padding: 3.2rem 0;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  .cart-user--profile {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 5.4rem;

    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
    h2 {
      font-size: 2.4rem;
    }
  }
  .cart-user--name {
    text-transform: capitalize;
  }
  .cart-image--name {
    /* background-color: red; */
    align-items: center;
    display: grid;
    gap: 1rem;
    grid-template-columns: 0.4fr 1fr;
    text-transform: capitalize;
    text-align: left;
    img {
      max-width: 5rem;
      height: 5rem;
      object-fit: contain;
      color: transparent;
    }

    .color-div {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 1rem;

      .color-style {
        width: 1.4rem;
        height: 1.4rem;

        border-radius: 50%;
      }
    }
  }

  .cart-two-button {
    margin-top: 2rem;
    display: flex;
    justify-content: space-between;

    .btn-clear {
      background-color: #e74c3c;
    }
  }

  .amount-toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.4rem;
    font-size: 1.4rem;

    button {
      border: none;
      background-color: #fff;
      cursor: pointer;
    }

    .amount-style {
      font-size: 2.4rem;
      color: ${({ theme }) => theme.colors.btn};
    }
  }

  .remove_icon {
    font-size: 1.6rem;
    color: #e74c3c;
    cursor: pointer;
  }

  .order-total--amount {
    width: 100%;
    margin: 4.8rem 0;
    text-transform: capitalize;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;

    .order-total--subdata {
      border: 0.1rem solid #f0f0f0;
      display: flex;
      flex-direction: column;
      gap: 1.8rem;
      padding: 3.2rem;
    }
    div {
      display: flex;
      gap: 3.2rem;
      justify-content: space-between;
    }

    div:last-child {
      background-color:${({ theme }) => theme.colors.white};
    }

    div p:last-child {
      font-weight: bold;
      color: ${({ theme }) => theme.colors.heading};
    }
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    .grid-five-column {
      grid-template-columns: 1.5fr 1fr 0.5fr;
    }
    .cart-hide {
      display: none;
    }

    .cart-two-button {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      gap: 2.2rem;
    }

    .order-total--amount {
      width: 100%;
      text-transform: capitalize;
      justify-content: flex-start;
      align-items: flex-start;

      .order-total--subdata {
        width: 100%;
        border: 0.1rem solid #f0f0f0;
        display: flex;
        flex-direction: column;
        gap: 1.8rem;
        padding: 3.2rem;
      }
    }
  }
  .btn-place {
    background-color: #5bb450;
  }
`;

export default Cart;