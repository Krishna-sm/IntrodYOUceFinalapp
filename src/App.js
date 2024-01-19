import React,{useState} from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from'./Home';
import About from'./About';
import Products from './Products';
import Contact from './Contact';
import SingleProduct from './SingleProduct';
import Cart from './Cart';
import ErrorPage from './ErrorPage';
import {GlobalStyle} from './GlobalStyle';
import { ThemeProvider } from "styled-components";
import Header from './components/Header';
import Footer from './components/Footer';
import Modal from './components/Modal';
import DarkMode from "./components/DarkMode";
import  LoginSignup  from "./components/LoginSignup";
import  SignupLogin  from "./components/SignupLogin";

const App = () => {




  const Light_theme = {
    colors: {
      footer_bg: "#0a1435",
      heading: "rgb(24 24 29)",
      text: "rgba(29,29,29,0.8)",
      white: "#fff",
      black: "#212529",
      helper: "#8490ff",
      bg: "#F6F8FA",
      filterHead:"#212529",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
    
  };
  const Dark_theme = {
    colors: {
      footer_bg: "#0a1435",
      heading: "White",
      text: "White",
      white: "#000",
      black: "#fff",
      helper: "#8490ff",
      bg: "#121212", 
      filterHead:"rgb(255, 191, 0)",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#000000",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: {
      mobile: "768px",
      tab: "998px",
    },
    
  };
 
  const [theme,setTheme] = useState("light");
  const isDarkTheme = theme ==="dark";

  const toggleTheme =()=>{
    setTheme(isDarkTheme?"light":"dark")
  }
  
  return (
    
    
    <ThemeProvider theme={isDarkTheme ? Dark_theme:Light_theme}>
    <Router basename="/IntrodYOUceFinalapp">

      <GlobalStyle/>  
      <Header/>
      <Modal/>
      <DarkMode toggleTheme={toggleTheme} isDarkTheme={isDarkTheme}/>
   <Routes> 
     <Route path="/" element={<Home />}/>
     <Route path="/about" element={<About />}/>
     <Route path="/products" element={<Products />}/>
     <Route path="/contact" element={<Contact />}/>
     <Route path="/singleproduct/:id" element={<SingleProduct />}/>
     <Route path="/cart" element={<Cart />}/>
     <Route path="/login" element={<LoginSignup />}/>
     <Route path="/signup" element={<SignupLogin />}/>
     <Route path="/*" element={<ErrorPage />}/>
   </Routes>
   <Footer/>
    </Router>
    </ThemeProvider>
    
  );
};

export default App;

