import React, {useContext, useState} from 'react'
import { Link, Redirect } from 'react-router-dom';
import SpeechRecognition, {useSpeechRecognition} from 'react-speech-recognition';
import { myContext } from './context/UserContext';
import '../components/css/Index.css';
import NavBar2 from './Nav/NavBar2';
import {Carousel, Image} from 'react-bootstrap';
import blueShoppingBanner from './css/blueShoppingBanner.jpg';
import shoppingBagsBanner from './css/shoppingBagsBanner.jpg';
import shoppingOnlineBanner from './css/shoppingOnlineBanner.jpg';

export default function Index() {
    return (
        <div>
            <div className="BannerLogo"></div>
            <NavBar2/>
            <div>
                <Carousel>
                    <Carousel.Item interval={3000}>
                        <Image
                        className="d-block w-100"
                        src={shoppingOnlineBanner}
                        alt="First slide"
                        style={{height:'600px'}}
                        />
                        <Carousel.Caption>
                        <h3>Shopping Online is made easy</h3>
                        <p>LookUp helps you identify your objects and sell online</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <Image
                        className="d-block w-100"
                        src={shoppingBagsBanner}
                        alt="Second slide"
                        style={{height:'600px'}}
                        />
                        <Carousel.Caption>
                        <h3>Found what you need?</h3>
                        <p>We got it</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item interval={3000}>
                        <Image
                        className="d-block w-100"
                        src={blueShoppingBanner}
                        alt="Third slide"
                        style={{height:'600px'}}
                        />
                        <Carousel.Caption>
                        <h3>Shopping with Machine Learning</h3>
                        <p>Shopping specifically for you</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
    )
}
