import React, { useEffect, useState, useMemo } from 'react';
import { fetchData } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, DollarSign, MapPin, Search,
    Users, TrendingUp, Globe, Filter, X, Sparkles
} from 'lucide-react';

const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { delay: i * 0.05, duration: 0.5, ease: [0.23, 1, 0.32, 1] }
    }),
    hover: {
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 }
    }
};

const ListPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchData();
                setData(result);
            } catch (err) {
                console.error(err);
            } finally {
                setTimeout(() => setLoading(false), 600);
            }
        };
        loadData();
    }, []);

    const cities = useMemo(() => {
        const uniqueCities = [...new Set(data.map(item => item.city))];
        return ['All', ...uniqueCities];
    }, [data]);

    const filteredData = useMemo(() => {
        return data.filter(item => {
            const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.designation.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCity = selectedCity === 'All' || item.city === selectedCity;
            return matchesSearch && matchesCity;
        });
    }, [data, searchQuery, selectedCity]);

    const stats = useMemo(() => {
        if (data.length === 0) return { total: 0, avgSalary: 0, cities: 0 };
        const total = data.length;
        const sumSalary = data.reduce((acc, curr) => acc + parseInt(curr.salary || 0), 0);
        const uniqueCities = new Set(data.map(item => item.city)).size;
        return {
            total,
            avgSalary: Math.round(sumSalary / total),
            cities: uniqueCities
        };
    }, [data]);

    if (loading) {
        return (
            <div className="list-page">
                <div className="stats-bar">
                    {[1, 2, 3].map(i => <div key={i} className="glass-card skeleton" style={{ height: '140px', borderRadius: '24px' }} />)}
                </div>
                <div className="grid-layout">
                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="glass-card skeleton" style={{ height: '280px', borderRadius: '24px' }} />)}
                </div>
            </div>
        );
    }

    return (
        <div className="list-page">
            <header style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <motion.h1
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
                >
                    People Intelligence <Sparkles className="text-accent" color="var(--accent-color)" />
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                    Real-time analytics for {stats.total} global associates
                </motion.p>
            </header>

            {/* Interactive Stats Dashboard */}
            <div className="stats-bar">
                {[
                    { icon: <Users size={24} />, label: 'Active Talent', value: stats.total, color: '#6366f1' },
                    { icon: <TrendingUp size={24} />, label: 'Avg Compensation', value: `$${stats.avgSalary.toLocaleString()}`, color: '#a855f7' },
                    { icon: <Globe size={24} />, label: 'Global Nodes', value: stats.cities, color: '#0ea5e9' }
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05, rotate: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card stat-card"
                        style={{ borderLeft: `4px solid ${stat.color}` }}
                    >
                        <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: stat.color }}>
                            {stat.icon} {stat.label}
                        </div>
                        <div className="stat-value">{stat.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Fluid Controls */}
            <div className="controls-row">
                <div className="search-container">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder="Search associates, roles or IDs..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div style={{ display: 'flex', gap: '0.8rem', overflowX: 'auto', padding: '0.5rem 0' }}>
                    {cities.map(city => (
                        <motion.button
                            key={city}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSelectedCity(city)}
                            style={{
                                background: selectedCity === city ? 'var(--accent-color)' : 'rgba(255,255,255,0.05)',
                                color: selectedCity === city ? 'white' : 'var(--text-muted)',
                                padding: '0.6rem 1.4rem',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '0.85rem'
                            }}
                        >
                            {city}
                        </motion.button>
                    ))}
                </div>
            </div>

            <motion.div layout className="grid-layout" style={{ marginTop: '1rem' }}>
                <AnimatePresence>
                    {filteredData.map((item, index) => (
                        <motion.div
                            layout
                            key={item.id || index}
                            custom={index}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            className="glass-card employee-card"
                            onClick={() => navigate('/details', { state: { employee: item } })}
                        >
                            <div className="employee-header">
                                <motion.div
                                    className="avatar"
                                    whileHover={{ rotate: 360, transition: { duration: 0.8 } }}
                                >
                                    <Users size={28} />
                                </motion.div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem' }}>{item.name}</h3>
                                    <div className="badge badge-purple">{item.designation}</div>
                                </div>
                            </div>

                            <div className="employee-info" style={{ marginTop: '0.5rem' }}>
                                <div className="info-item" style={{ fontSize: '1rem' }}>
                                    <DollarSign size={18} />
                                    <span style={{ fontWeight: 700, color: 'white' }}>${parseInt(item.salary).toLocaleString()}</span>
                                </div>
                                <div className="info-item">
                                    <MapPin size={18} />
                                    <span>{item.city}</span>
                                </div>
                            </div>

                            <motion.div
                                className="card-footer"
                                whileHover={{ x: 5 }}
                            >
                                <span>Full Intelligence Profile</span>
                                <ArrowRight size={18} />
                            </motion.div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {filteredData.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{ textAlign: 'center', padding: '8rem 2rem', color: 'var(--text-muted)' }}
                >
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
                        <Search size={64} style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
                    </motion.div>
                    <h2>No matching records found</h2>
                    <p>We couldn't find any associates matching your current filters.</p>
                </motion.div>
            )}
        </div>
    );
};

export default ListPage;
