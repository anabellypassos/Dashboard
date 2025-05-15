import React, { useState, useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { FaBox } from "react-icons/fa";
import { RiTicketFill } from "react-icons/ri";
import StyleCards from "../Painel_adm/StyleCard.css"


const Cards = () => {
  const [dashboardData, setDashboardData] = useState({
    userCount: 0,
    salesTotal: 0,
    ordersTotal: 0,
    ticketsTotal: 0,
  });

  useEffect(() => {
    fetch('https://681401b7225ff1af1627ad6a.mockapi.io/api/dashboard/users')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          let userCount = data.length;
          let salesTotal = 0;
          let ordersTotal = 0;
          let ticketsTotal = 0;

          data.forEach(item => {
            salesTotal += Number(item.sales || 0);
            ordersTotal += Number(item.orders || 0);
            ticketsTotal += Number(item.tickets || 0);
          });

          setDashboardData({
            userCount,
            salesTotal,
            ordersTotal,
            ticketsTotal
          });
        }
      })
      .catch(error => {
        console.error('Erro ao buscar dados do dashboard:', error);
      });
  }, []);

  return (
    <div className='cards'>
      <div className='users'>
        <h1 className='titlecards'><FaUser className='icon' style={{ color: 'rgb(3, 143, 237)' }} /> Users</h1>
        <p className='info'>{dashboardData.userCount}</p>
      </div>
      <div className='sales'>
        <h1 className='titlecards'><IoCart className='icon'style={{ color: 'rgb(3, 143, 237)' }} /> Sales</h1>
        <p className='info'>${dashboardData.salesTotal.toFixed(2)}</p>
      </div>
      <div className='orders'>
        <h1 className='titlecards'><FaBox className='icon' style={{ color: 'rgb(3, 143, 237)' }} /> Orders</h1>
        <p className='info'>{dashboardData.ordersTotal}</p>
      </div>
      <div className='tickets'>
        <h1 className='titlecards'><RiTicketFill className='icon' style={{ color: 'rgb(3, 143, 237)' }} /> Tickets</h1>
        <p className='info'>{dashboardData.ticketsTotal}</p>
      </div>
    </div>
  );
};

export default Cards;
