import React, { useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import {
    Camera, ArrowLeft, User, Mail, Phone, MapPin,
    DollarSign, ShieldCheck, Zap, Award, Sparkles, Fingerprint
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const employee = location.state?.employee;
    const webcamRef = useRef(null);
    const [showCamera, setShowCamera] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');

    if (!employee) {
        return (
            <div className="container" style={{ textAlign: 'center', padding: '10rem' }}>
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                    <Fingerprint size={64} color="var(--accent-color)" style={{ marginBottom: '2rem', opacity: 0.5 }} />
                </motion.div>
                <h2 style={{ marginBottom: '1.5rem' }}>Identity Session Expired</h2>
                <button onClick={() => navigate('/list')}>Return to Directory</button>
            </div>
        );
    }

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        navigate('/photo-result', { state: { image: imageSrc, employee } });
    };

    return (
        <div className="details-page">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}
            >
                <motion.button
                    whileHover={{ x: -5 }}
                    onClick={() => navigate('/list')}
                    style={{ background: 'transparent', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1.2rem' }}
                >
                    <ArrowLeft size={18} /> Directory
                </motion.button>
                <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="badge badge-green"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.8rem 1.5rem' }}
                >
                    <ShieldCheck size={16} /> Encrypted Session Active
                </motion.div>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: showCamera ? '1fr 1fr' : '1.6fr 1fr', gap: '3rem', alignItems: 'start' }}>
                {/* Profile Info */}
                <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card"
                    style={{ overflow: 'hidden' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', marginBottom: '3rem' }}>
                        <motion.div
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            className="avatar"
                            style={{ width: '120px', height: '120px', fontSize: '3rem', borderRadius: '32px' }}
                        >
                            <User size={60} />
                        </motion.div>
                        <div>
                            <motion.h1
                                initial={{ filter: 'blur(10px)' }}
                                animate={{ filter: 'blur(0px)' }}
                                style={{ fontSize: '4rem', marginBottom: '0.3rem', letterSpacing: '-2px' }}
                            >
                                {employee.name}
                            </motion.h1>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Fingerprint size={18} color="var(--accent-color)" />
                                Associate Node ID <span style={{ color: 'white', fontWeight: 800 }}>#JOT-{employee.id || '2849'}</span>
                            </p>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--border-color)', marginBottom: '2.5rem' }}>
                        {['profile', 'security'].map(tab => (
                            <motion.button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    background: 'transparent',
                                    color: activeTab === tab ? 'white' : 'var(--text-muted)',
                                    padding: '1.2rem 0.5rem',
                                    position: 'relative',
                                    border: 'none',
                                    boxShadow: 'none',
                                    textTransform: 'capitalize',
                                    fontSize: '1rem',
                                    fontWeight: activeTab === tab ? 800 : 500
                                }}
                            >
                                {tab === 'profile' ? 'Core Intelligence' : 'Biometric Security'}
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="tab-underline"
                                        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', background: 'var(--accent-color)' }}
                                    />
                                )}
                            </motion.button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {activeTab === 'profile' ? (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="details-grid"
                                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}
                            >
                                {[
                                    { icon: <Zap />, label: 'Standard Designation', val: employee.designation },
                                    { icon: <Award />, label: 'Tier 1 Compensation', val: `$${parseInt(employee.salary).toLocaleString()} / year` },
                                    { icon: <MapPin />, label: 'Regional Sector', val: employee.city },
                                    { icon: <Mail />, label: 'Encrypted Communication', val: `${employee.name.split(' ')[0].toLowerCase()}@jotish.cloud` }
                                ].map((d, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.02)' }}
                                        className="detail-box"
                                        style={{ padding: '1.5rem', borderRadius: '20px' }}
                                    >
                                        <label style={{ color: 'var(--accent-color)', fontWeight: 700 }}>{d.icon} {d.label}</label>
                                        <p style={{ fontSize: '1.2rem', marginTop: '0.4rem' }}>{d.val}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div key="security" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                <div className="glass-card" style={{ background: 'rgba(99, 102, 241, 0.05)', borderStyle: 'dashed', textAlign: 'center' }}>
                                    <Sparkles size={48} color="var(--accent-color)" style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Initiate ID Generation</h3>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '400px', margin: '0 auto 2rem' }}>
                                        To complete the associate profile, please activate the camera for a high-fidelity biometric sync.
                                    </p>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowCamera(!showCamera)}
                                        style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}
                                    >
                                        <Camera size={20} /> {showCamera ? 'Shutdown Terminal' : 'Activate Scan'}
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Dynamic Sidebar */}
                <motion.div layout>
                    <AnimatePresence mode="wait">
                        {!showCamera ? (
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="glass-card"
                                style={{ textAlign: 'center', padding: '4rem 2rem', position: 'relative', overflow: 'hidden' }}
                            >
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                                    style={{ position: 'absolute', top: '-100px', right: '-100px', width: '250px', height: '250px', border: '1px solid var(--accent-color)', borderRadius: '50%', opacity: 0.1 }}
                                />

                                <div style={{ padding: '3rem 2rem', border: '1px solid var(--border-color)', borderRadius: '32px', background: 'rgba(255,255,255,0.02)' }}>
                                    <div className="avatar" style={{ width: '80px', height: '80px', margin: '0 auto 2rem', opacity: 0.3 }}>
                                        <Fingerprint size={40} />
                                    </div>
                                    <h3 style={{ opacity: 0.5 }}>Identity Awaiting <br /> Biometric Proof</h3>
                                </div>

                                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    <div className="badge badge-purple" style={{ opacity: 0.6 }}>Level 4 Clearanced Required</div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="camera"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 30 }}
                                className="glass-card camera-container"
                                style={{ padding: '1.5rem', borderRadius: '32px' }}
                            >
                                <div style={{ borderRadius: '24px', overflow: 'hidden', position: 'relative', width: '100%', aspectRatio: '1/1', border: '2px solid var(--accent-color)' }}>
                                    <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width="100%" style={{ objectFit: 'cover' }} />
                                    <div className="camera-overlay" style={{ border: '1px solid rgba(255,255,255,0.2)' }}></div>
                                    <motion.div
                                        animate={{ y: [-100, 300, -100] }}
                                        transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                                        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'var(--accent-color)', boxShadow: '0 0 10px var(--accent-color)' }}
                                    />
                                </div>
                                <button onClick={capture} style={{ marginTop: '1.5rem', width: '100%', background: 'linear-gradient(135deg, #10b981, #059669)', fontSize: '1.1rem' }}>
                                    <Camera size={24} /> Generate Security Badge
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default DetailsPage;
