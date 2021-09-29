import React, {useContext, useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import { myContext } from './context/UserContext';
import '../components/css/Index.css';
import NavBar2 from './Nav/NavBar2';

export default function Index() {
    return (
        <div>
            <div className="BannerLogo"></div>
            <NavBar2/>
            <div>
                
            </div>
        </div>
    )
}
