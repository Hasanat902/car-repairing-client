import { signOut } from 'firebase/auth';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../api/axiosPrivate';
import auth from '../../firebase.init';

const Orders = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect( () => {
        
        const getOrders = async() => {
            const email = user?.email;
            const url = `http://localhost:5000/order?email=${email}`;
            try{
                const {data} = await axiosPrivate.get(url);
                setOrders(data);
            }
            catch(error){
                if(error.response.status === 401 || error.response.status === 403){
                    signOut(auth);
                    navigate('/login')
                }
            }
        }

        getOrders();

    }, [])

    return (
        <div className='w-50 mx-auto'>
            <h2>Your Orders: {orders.length}</h2>
            {
                orders.map(order => <p>{order.email} : {order.service}</p>)
            }
        </div>
    );
};

export default Orders;