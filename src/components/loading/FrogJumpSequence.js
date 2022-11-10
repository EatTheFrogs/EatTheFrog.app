import React, { useState, useEffect } from 'react';
import frog0 from '../../images/frogJump/0.png';
import frog1 from '../../images/frogJump/1.png';
import frog2 from '../../images/frogJump/2.png';
import frog3 from '../../images/frogJump/3.png';
import '../../styles/Global.css';
import '../../styles/FrogJumpSequence.css';

export const FrogJumpSequence = ({ intervalTime }) => {
    
    const images = [frog0, frog1, frog2, frog3];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => changeImage(), intervalTime);

        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    });

    const changeImage = () => {
        let nextIndex = index + 1 < images.length ? index + 1 : 0;
        setIndex(nextIndex);
    }

    return (
        <div className='flex-column frog-jump-image-container'>
            <img className='frog-jump-image' src={images[index]} alt="EatTheFrog logo"/>
        </div>
    );
}