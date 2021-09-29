import React from 'react';
import { Image } from 'react-bootstrap';
import hoodieEx from '../../css/hoodie-smile.jpg';

export default function FashionPage() {
    return (
        <div>
            <div>
                <Image src={hoodieEx} fluid alt="hoodie" style={{display:'inline-block', height:'300px', marginTop: '100px'}}/>
                <p>Hoodie Smile</p>
                <p></p>
            </div>
        </div>
    )
}
