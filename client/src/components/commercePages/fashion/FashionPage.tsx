import React, {useState} from 'react';
import { Image } from 'react-bootstrap';
import hoodieEx from '../../css/hoodie-smile.jpg';
import StripeContainer from '../../stripe/StripeContainer';

export default function FashionPage() {
    const [showItem, setShowItem] = useState<boolean>(false);

    return (
        <div>
                {showItem ? <><StripeContainer/></> 
                : 
                    <>
                        <Image src={hoodieEx} fluid alt="hoodie" style={{display:'inline-block', height:'300px', marginTop: '100px'}}/>
                        <p>Hoodie Smile</p>
                        <h5>$10.00</h5>
                        <button onClick={() => setShowItem(true)}>Purchase Hoodie</button>
                    </> 
                }
            
        </div>
    )
}
