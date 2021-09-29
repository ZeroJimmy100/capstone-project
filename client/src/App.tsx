import React, {useContext, useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import Dashboard from './components/Dashboard';
import Index from './components/Index';
import NavBar from '../src/components/Nav/NavBar';
import Testing from './components/Testing';
import { Navbar } from 'react-bootstrap';
import SpeakingIcon from './components/css/speakingIcon.png';
import Login from './components/UserLogin/Login';
import { myContext } from './components/context/UserContext';
import Registration from './components/UserLogin/Registration';
// import {createSpeechlySpeechRecognition} from '@speechly/speech-recognition-polyfill';

function App() {

  const ctx = useContext(myContext);
  console.log(ctx);
  // const [redirectUrl, setRedirectUrl] = useState<string>("");
  // const commands = [{
  //   command: ["Go to *", "Open *", "*"],
  //   callback: (redirectPage:any) => setRedirectUrl(redirectPage),
  //   },
  // ];
  // const {transcript} = useSpeechRecognition({commands});
  // const [isStart, setIsStart] = useState<boolean>(true);
  
  // if(!SpeechRecognition.browserSupportsSpeechRecognition){
  //     return null;
  // }

  // let redirect:any = "";

  // const pages = ['home', 'testing'];
  // const URLs:any = {
  //     home: "/",
  //     testing: "/testing"
  // };

  // const speakURLVoice = () => {
  //   const utterance = new SpeechSynthesisUtterance(`You are now in ${redirectUrl}`);
  //   utterance.voice = speechSynthesis.getVoices()[0];
  //   speechSynthesis.speak(utterance);
  // }
  
  // if(redirectUrl){
  //   if(pages.includes(redirectUrl)){
  //       redirect = <Redirect to={URLs[redirectUrl]} />
  //       speakURLVoice();
  //   } else {
  //       redirect = <p>Could not find page: {redirectUrl}</p>
  //   }
  // }

  // const stopListening = () => SpeechRecognition.stopListening();


  // const allowListening = () => {
  //   if(isStart === true){
  //     setIsStart(false);
  //     SpeechRecognition.startListening()
  //     setTimeout(() => {
  //       console.log("stop listening");
  //       setIsStart(true);
  //       stopListening();
  //     }, 3000);
  //   }else {
  //     stopListening();
  //     setIsStart(true);
  //   }
  // }

  // const startListening = () => {
  //   // if(canClick){
  //     allowListening();
  //   // }
  // };

  // const handleSpace = (e:any) => {
  //   if(e.key === " "){
  //     allowListening();
  //   }
  // };
  
  // console.log(redirectUrl);

  return (
    <div className="App">
      <Router>
          <NavBar/>
            <Switch>
              <Route path="/" exact>
                <Index/> 
              </Route>
              <Route path="/Dashboard">
                <Dashboard />
              </Route>
              <Route path="/testing">
                <Testing/>
              </Route>
              <Route path="/login">
                <Login/>
              </Route>
              <Route path="/registration">
                <Registration/>
              </Route>
            </Switch>
        {/* {redirect} */}
      </Router>
      {/* {isStart ?
        <button onKeyDown={handleSpace} style={{float:'left', marginTop:'.5%', backgroundColor: "transparent"}} onClick={startListening}><img src={SpeakingIcon} style={{height:'40px', width:"40px"}}/></button> : null
      } */}
    </div>
  );
}

export default App;
