import React from 'react';
import sleeping from "../../../images/sleepy.jpg";

const NotFound = () => {
    return (
        <div className='text-center'>
            <h2 className='text-primary'>Mechanic is sleeping</h2>
            <img  src={sleeping} alt="" />
        </div>
    );
};

export default NotFound;