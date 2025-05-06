import React, { useState, useEffect } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";


const SalesChart = () => {
    const [dadosVendas, setDadosVendas] = useState([]);

    useEffect(() => {
        fetch('https://681401b7225ff1af1627ad6a.mockapi.io/api/dashboard/users')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data) && data.length > 0) {
                    const info = data[0];
                    const vendas = info.sales || []; // <-- array com número de vendas por mês
                    const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'];

                    const vendasMensais = meses.map((mes, index) => ({
                        name: mes,
                        vendas: vendas[index] || 0 // se faltar algum mês, assume 0
                    }));

                    setDadosVendas(vendasMensais);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados do gráfico', error);
            });
    }, []);

    return (
        <div className="containervendas" style={{ width: "40%", height: 300 }}>
            <h1>Relatório de Vendas</h1>
            <ResponsiveContainer>
                <LineChart data={dadosVendas}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="vendas" stroke="#8884d8" strokeWidth={1} name="Vendas por Mês" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SalesChart;
