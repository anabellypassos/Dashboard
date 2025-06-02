import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import '../Painel_adm/SalesChart.css'
import { CiSearch } from "react-icons/ci";


const SalesChart = () => {
    const [dadosVendas, setDadosVendas] = useState([]);
    const [usuarios,setUsuarios]=useState([]);
    const [busca, setBusca] = useState("");

    useEffect(() => {
        fetch('https://681401b7225ff1af1627ad6a.mockapi.io/api/dashboard/users')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setUsuarios(data);

                    const mesesOrdenados = [
                        'January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'
                    ];

                    const mesesAbreviados = {
                        January: 'Jan', February: 'Fev', March: 'Mar', April: 'Abr',
                        May: 'Mai', June: 'Jun', July: 'Jul', August: 'Ago',
                        September: 'Set', October: 'Out', November: 'Nov', December: 'Dez'
                    };

                    // Inicializa o acumulador com todos os meses zerados
                    const vendasPorMes = {};
                    mesesOrdenados.forEach(mes => {
                        vendasPorMes[mes] = 0;
                    });

                    // Soma os valores por mês
                    data.forEach(item => {
                        const mes = item.data; // ex: "January"
                        const pedidos = parseInt(item.orders, 10) || 0;
                        if (mesesOrdenados.includes(mes)) {
                            vendasPorMes[mes] += pedidos;
                        }
                    });

                    // Gera a lista final com os nomes abreviados
                    const vendasMensais = mesesOrdenados.map(mes => ({
                        name: mesesAbreviados[mes], // Abreviação correta
                        vendas: vendasPorMes[mes]
                    }));

                    setDadosVendas(vendasMensais);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados do gráfico', error);
            });
    }, []);
    const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    usuario.email?.toLowerCase().includes(busca.toLowerCase())
  );
    
  
  console.log(busca);
    return (
            <div className="containergeral">
        <div className="containervendas" style={{ width: "50%", height: 400 }}>
            <h1 className='titlegrafico'>Relatório de Vendas</h1>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={dadosVendas} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="vendas" stroke="#0D00FDFF" activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>

        <div className='containerpesquisa'>
            <div className="search">
                <input type="text" placeholder='Pesquisar por nome' value={busca} onChange={(ev)=>setBusca(ev.target.value)} />
                <button className='Search'><CiSearch /></button>
            </div>
            <ul>
          {usuariosFiltrados.map(user => (
            <li key={user.id}>
              <strong>{user.nome}</strong> - {user.email}
            </li>
          ))}
        </ul>
        </div>
    </div>
);
};

export default SalesChart;
