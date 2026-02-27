import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { fetchData } from '../services/api';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChartsPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchData();
                const rawData = Array.isArray(result) ? result : (result.data || []);
                // Get first 10 employees and format for chart
                const formattedData = rawData.slice(0, 10).map(emp => ({
                    name: emp.name?.split(' ')[0] || 'Unknown',
                    salary: parseFloat(emp.salary) || 0,
                    fullName: emp.name
                }));
                setData(formattedData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e'];

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <Loader2 className="spinner" size={48} color="var(--accent-color)" />
            </div>
        );
    }

    return (
        <div className="charts-page">
            <button onClick={() => navigate('/list')} className="back-btn" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}>
                <ArrowLeft size={18} /> Back to Directory
            </button>

            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem' }}>Salary Insights</h1>
                <p style={{ color: 'var(--text-muted)' }}>Compensation analysis for the top 10 associates</p>
            </header>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{ height: '500px', padding: '3rem 2rem 2rem' }}
            >
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="name"
                            stroke="var(--text-muted)"
                            axisLine={false}
                            tickLine={false}
                            dy={15}
                        />
                        <YAxis
                            stroke="var(--text-muted)"
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value) => `$${value / 1000}k`}
                        />
                        <Tooltip
                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            contentStyle={{
                                background: 'rgba(15, 23, 42, 0.9)',
                                border: '1px solid var(--border-color)',
                                borderRadius: '12px',
                                backdropFilter: 'blur(10px)'
                            }}
                            formatter={(value) => [`$${value.toLocaleString()}`, 'Salary']}
                        />
                        <Bar dataKey="salary" radius={[8, 8, 0, 0]} barSize={40}>
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </motion.div>
        </div>
    );
};

export default ChartsPage;
