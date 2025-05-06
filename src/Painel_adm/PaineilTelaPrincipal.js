import React from 'react'
import Stylepainelprincipal from '../Painel_adm/Stylepainelprincipal.css';
import Cards from '../Painel_adm/Cards';
import SalesChart from './SalesChart';

const PaineilTelaPrincipal = () => {
  return (
    <div>
      <div className='nav-bar'>
        <h1 className='title_dashboard'>Dashboard Administrativo</h1>
      </div>
      <Cards/>
      <SalesChart />

    </div>
  )
}

export default PaineilTelaPrincipal
