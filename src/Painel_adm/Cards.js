import React, { useState, useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import { IoCart } from "react-icons/io5";
import { FaBox } from "react-icons/fa";
import { RiTicketFill } from "react-icons/ri";
import StyleCards from "../Painel_adm/StyleCard.css"

const Cards = () => {
  const [dashboardData, setDashboardData] = useState({
    user: null,
    sales: null,
    orders: null,
    tickets: null,
  });

  useEffect(() => {
    fetch('https://681401b7225ff1af1627ad6a.mockapi.io/api/dashboard/users')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const info = data[0]; // Pegando o primeiro objeto da lista
          setDashboardData({
            user: info.user,
            sales: info.sales,
            orders: info.orders,
            tickets: info.tickets,
            userquantide: info.userquantide
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
        <h1 className='titlecards' ><FaUser style={{ color: 'rgb(3, 143, 237)',fontSize: '28px' }} /> Users</h1>
        <p className='info'>{dashboardData.userquantide !== null ? dashboardData.userquantide : 'Carregando...'}</p>
      </div>
      <div className='sales'>
        <h1 className='titlecards' ><IoCart style={{ color: 'rgb(3, 143, 237)' ,fontSize: '28px'}} /> Sales</h1>
        <p  className='info' >{dashboardData.sales !== null ? dashboardData.sales : 'Carregando...'}</p>
      </div>
      <div className='orders'>
        <h1 className='titlecards' ><FaBox style={{ color: 'rgb(3, 143, 237)',fontSize: '28px' }} /> Orders</h1>
        <p  className='info'>{dashboardData.orders !== null ? dashboardData.orders : 'Carregando...'}</p>
      </div>
      <div className='tickets'>
        <h1 className='titlecards' ><RiTicketFill style={{ color: 'rgb(3, 143, 237)',fontSize: '28px' }} /> Tickets</h1>
        <p  className='info'>{dashboardData.tickets !== null ? dashboardData.tickets : 'Carregando...'}</p>
      </div>
    </div>
  );
};

export default Cards;
