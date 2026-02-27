import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Download } from 'lucide-react';
import { motion } from 'framer-motion';

const PhotoResultPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { image, employee } = location.state || {};

    if (!image) {
        return <div className="container">No photo captured. <button onClick={() => navigate('/list')}>Go Back</button></div>;
    }

    return (
        <div className="photo-result-page">
            <header style={{ marginBottom: '2.5rem' }}>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Photo Captured</h1>
                <p style={{ color: 'var(--text-muted)' }}>Security profile update for <strong>{employee?.name}</strong></p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '3rem', alignItems: 'start' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card"
                    style={{ padding: '1rem', borderRadius: '32px' }}
                >
                    <img
                        src={image}
                        alt="Captured"
                        style={{ width: '100%', borderRadius: '24px', display: 'block', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card"
                    style={{ width: '300px' }}
                >
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyCenter: 'center', margin: '0 auto 1rem' }}>
                            <CheckCircle size={32} />
                        </div>
                        <h3 style={{ fontSize: '1.25rem' }}>Ready to Save</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.5rem' }}>The photo has been processed successfully.</p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                            <Download size={18} /> Download Image
                        </button>
                        <button
                            onClick={() => navigate('/list')}
                            style={{ width: '100%', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                        >
                            Done
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PhotoResultPage;
