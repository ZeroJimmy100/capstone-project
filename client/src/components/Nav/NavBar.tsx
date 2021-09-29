import React, {useContext, useState} from 'react';
import '../css/NavBar.css';
import LogoIcon from '../css/LookupLogo3.png';
import { Image } from 'react-bootstrap';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import { Redirect, BrowserRouter } from 'react-router-dom';
import SpeakingIcon from '../css/speakingIcon2.png';
import { myContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import yellowCart from '../css/yellowCart.png';

export default function NavBar() {
    const ctx = useContext(myContext);
    const [redirectUrl, setRedirectUrl] = useState<string>("");
    const commands = [{
      command: ["Go to *", "Open *", "*"],
      callback: (redirectPage:any) => setRedirectUrl(redirectPage),
      },
    ];
    const {transcript} = useSpeechRecognition({commands});
    const [isStart, setIsStart] = useState<boolean>(true);
    
    if(!SpeechRecognition.browserSupportsSpeechRecognition){
        return null;
    }
  
    let redirect:any = "";
  
    const pages = ['home', 'testing'];
    const URLs:any = {
        home: "/",
        testing: "/testing",
        login: '/login'
    };
  
    const speakURLVoice = () => {
      const utterance = new SpeechSynthesisUtterance(`You are now in ${redirectUrl}`);
      utterance.voice = speechSynthesis.getVoices()[0];
      speechSynthesis.speak(utterance);
    }
    
    if(redirectUrl){
      if(pages.includes(redirectUrl)){
          redirect = <Redirect to={URLs[redirectUrl]} />
          speakURLVoice();
      } else {
        // const utterance = new SpeechSynthesisUtterance(`cannot find ${redirectUrl}`);
        // utterance.voice = speechSynthesis.getVoices()[0];
        // speechSynthesis.speak(utterance);
      }
    }
  
    const stopListening = () => SpeechRecognition.stopListening();
  
  
    const allowListening = () => {
      if(isStart === true){
        setIsStart(false);
        SpeechRecognition.startListening()
        setTimeout(() => {
          console.log("stop listening");
          setIsStart(true);
          stopListening();
        }, 3000);
      }else {
        stopListening();
        setIsStart(true);
      }
    }
  
    const startListening = () => {
      // if(canClick){
        allowListening();
      // }
    };
  
    const handleSpace = (e:any) => {
      if(e.key === " "){
        allowListening();
      }
    };

    const logout = () => {
      axios.get("http://localhost:4000/logout", {
        withCredentials: true
      }).then((res) => {
        console.log("logout");
        // if(res.data === "Successfully Logout"){
        //   window.location.href = "/";
        // }
      });

    }
    
    console.log(redirectUrl);

    return (
        
            <header className = "header">
                <a href="/" className="Mylogo"><Image className="homeImg" src={LogoIcon} fluid alt=""/></a>
                {isStart ?
                    <button style={{float:'left', marginTop:'.5%', backgroundColor: "transparent"}} onClick={startListening}><img src={SpeakingIcon} style={{height:'40px', width:"40px"}}/></button> : null
                }
                {ctx ? (
                  <>
                    <p style={{float:'left', color: 'white', fontFamily: 'cursive', marginLeft: '1%'}}>Hello, {ctx.firstName}</p>
                  </>
                  ): null}
                <input className="menu-btn" type="checkbox" id="menu-btn"/>
                <label className="menu-icon" htmlFor="menu-btn"><span className="nav-icon"></span></label>
                <ul className="LeMenu">
                    <li><a href="/">home</a></li>
                    {ctx ? (
                    <>
                      {ctx.isVerified ? (
                        <>
                          <li><a href="/Dashboard">Dashboard</a></li>
                          <li><a href="/profile">Profile</a></li>
                          <li><a href="/my-cart">Cart <Image src={yellowCart} fluid alt="cart" className="cartImg"/></a></li>
                          <li><a href="/my-market">My Market</a></li>
                          <li><a href="/" onClick={logout}>Logout</a></li>
                        </>
                        ) : (
                          <>
                            <li><a href="/Dashboard">Dashboard</a></li>
                            <li><a href="/profile">Profile</a></li>
                            <li><a href="/cart">Cart <Image src={yellowCart} fluid alt="cart" className="cartImg"/></a></li>
                            <li><a href="/" onClick={logout}>Logout</a></li>
                          </>
                      )}
                    </>) : ( 
                      <>
                        <li><a href="/login">Login</a></li>
                      </>
                    )}
                </ul>
                {redirect}
            </header>
           
       
    )
}
