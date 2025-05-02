import React from 'react'
import Stylepainelprincipal from '../Painel_adm/Stylepainelprincipal.css';
import Cards from '../Painel_adm/Cards';

const PaineilTelaPrincipal = () => {
  return (
    <div>
      <div className='nav-bar'>
        <h1 className='title_dashboard'>Dashboard Administrativo</h1>
      </div>
      <Cards/>


    </div>
  )
}

export default PaineilTelaPrincipal
