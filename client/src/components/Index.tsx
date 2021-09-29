import React, {useContext, useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import { myContext } from './context/UserContext';
import '../components/css/Index.css';

export default function Index() {
    return (
        <div>
            <div className="BannerLogo"></div>
        </div>
    )
}
