import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';
import useServiceDetail from '../../../hooks/useServiceDetail';

const Checkout = () => {

    const {serviceId} = useParams();
    const [service] = useServiceDetail(serviceId);
    const [user] = useAuthState(auth);

    // const [user, setUser] = useState({
    //     name: 'Akbar',
    //     email: 'akbar@momo.taj',
    //     address: 'Tajmahal Road, Mohammadpur',
    //     phone: '01777034768'
    // });

    // const handleAddressChange = event => {
    //     const {address, ...rest} = user;
    //     const newAddress = event.target.value;
    //     const newUser = {address: newAddress, ...rest};
    //     setUser(newUser);
    // }

    const handlePlaceOrder = event => {
        event.preventDefault();

        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: event.target.address.value,
            phone: event.target.phone.value
        }
        
        axios.post('http://localhost:5000/order', order)
        .then(response => {
           const {data} = response;
           if(data.insertedId){
                toast("Your order is booked!");
                event.target.reset();
           }
        })
    }

    return (
        <div className='w-50 mx-auto'>
            <h2>Please Order: {service.name}</h2>
            <form onSubmit={handlePlaceOrder}>
                <input className='w-100 mb-2' type="text" value={user?.displayName} name="name" placeholder='Name' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="text" value={user?.email} name="email" placeholder='Email' required readOnly disabled />
                <br />
                <input className='w-100 mb-2' type="text" value={service.name} name="service" placeholder='Service' required readOnly />
                <br />
                <input className='w-100 mb-2' type="text" autoComplete='off' name="address" placeholder='Address' required />
                <br />
                <input className='w-100 mb-2' type="text" name="phone" placeholder='Phone' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Place Order" />
            </form>
        </div>
    );
};

export default Checkout;