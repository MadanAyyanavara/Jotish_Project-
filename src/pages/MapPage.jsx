import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { fetchData } from '../services/api';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader2, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Fix for default marker icons in Leaflet with React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const cityCoords = {
    'Bangalore': [12.9716, 77.5946],
    'Mumbai': [19.0760, 72.8777],
    'Delhi': [28.6139, 77.2090],
    'Hyderabad': [17.3850, 78.4867],
    'Chennai': [13.0827, 80.2707],
    'Pune': [18.5204, 73.8567],
    'Kolkata': [22.5726, 88.3639],
    'Ahmedabad': [23.0225, 72.5714],
    'Jaipur': [26.9124, 75.7873],
    'Surat': [21.1702, 72.8311],
    'Edinburgh': [55.9533, -3.1883],
    'Tokyo': [35.6762, 139.6503],
    'San Francisco': [37.7749, -122.4194],
    'New York': [40.7128, -74.0060]
};

const MapPage = () => {
    const [markers, setMarkers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchData();
                const rawData = Array.isArray(result) ? result : (result.data || []);

                // Group by city
                const cityGroups = {};
                rawData.forEach(emp => {
                    const city = emp.city || 'Unknown';
                    if (!cityGroups[city]) cityGroups[city] = [];
                    cityGroups[city].push(emp);
                });

                // Create markers for known cities
                const markerList = Object.keys(cityGroups)
                    .filter(city => cityCoords[city])
                    .map(city => ({
                        name: city,
                        coords: cityCoords[city],
                        count: cityGroups[city].length,
                        employees: cityGroups[city].slice(0, 3)
                    }));

                setMarkers(markerList);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <Loader2 className="spinner" size={48} color="var(--accent-color)" />
            </div>
        );
    }

    return (
        <div className="map-page">
            <button onClick={() => navigate('/list')} className="back-btn" style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}>
                <ArrowLeft size={18} /> Back to Directory
            </button>

            <header style={{ marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '2.5rem' }}>Global Presence</h1>
                <p style={{ color: 'var(--text-muted)' }}>Distribution of our talent across {markers.length} major hubs</p>
            </header>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card"
                style={{ height: '600px', padding: '0.5rem', overflow: 'hidden', borderRadius: '32px' }}
            >
                <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%', borderRadius: '24px' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {markers.map((marker, idx) => (
                        <Marker key={idx} position={marker.coords}>
                            <Popup>
                                <div style={{ padding: '0.5rem' }}>
                                    <h3 style={{ margin: 0, color: '#1e293b' }}>{marker.name}</h3>
                                    <p style={{ margin: '0.5rem 0', color: '#64748b' }}>{marker.count} Employees</p>
                                    <ul style={{ paddingLeft: '1.2rem', margin: 0, color: '#475569', fontSize: '0.85rem' }}>
                                        {marker.employees.map((e, i) => <li key={i}>{e.name}</li>)}
                                    </ul>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </motion.div>
        </div>
    );
};

export default MapPage;
