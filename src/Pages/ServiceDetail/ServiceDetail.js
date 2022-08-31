import React from 'react';
import { useParams, Link } from 'react-router-dom';

const ServiceDetail = () => {

    const {serviceId} = useParams();

    return (
        <div>
            <h2>This is service Detail: {serviceId}</h2>
            <div className='text-center'>
                <Link to="/checkout">
                    <button className='btn btn-primary'>Proceed Checkout</button>
                </Link>
            </div>
        </div>
    );
};

export default ServiceDetail;