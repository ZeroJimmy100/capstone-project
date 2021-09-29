import React, {useState, useContext} from 'react';
import { Link, Redirect } from 'react-router-dom';
import './css/dashboard.css';
import { myContext } from '../components/context/UserContext';
// import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';

export default function Dashboard() {
    const ctx = useContext(myContext);
    // const commands = [{
    //     command: ["Go to *", "Open *"],
    //     callback: (redirectPage:any) => setRedirectUrl(redirectPage),
    //     },
    // ];
    // const {transcript} = useSpeechRecognition({commands});
    // const [redirectUrl, setRedirectUrl] = useState<string>("");

    // if(!SpeechRecognition.browserSupportsSpeechRecognition){
    //     return null;
    // }

    // let redirect:any = "";

    // const pages = ['home', 'testing'];
    // const URLs:any = {
    //     home: "/",
    //     testing: "/testing"
    // };

    // if(redirectUrl){
    //     if(pages.includes(redirectUrl)){
    //         redirect = <Redirect to={URLs[redirectUrl]} />
    //     } else {
    //         redirect = <p>Could not find page: {redirectUrl}</p>
    //     }
    // }

    return (
        <div>
            <div className="BannerLogo"></div>
            <h1>Welcome to {ctx.firstName}</h1>
        </div>
    )
}
