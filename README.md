# Employee Intelligence Portal

A sophisticated ReactJS-based enterprise application designed for high-fidelity talent management. This portal integrates real-time data analytics, biometric security systems, and global geographic insights into a high-performance executive dashboard.

---

## Project Overview

This application serves as a comprehensive tool for monitoring and managing global talent. It features an advanced design system centered on Glassmorphism principles, providing a clear, modern, and professional aesthetic while maintaining high usability standards.

### Core Implementation Details

*   **Secure Authentication**: A robust authentication node utilizing React Context for session management and state persistence.
*   **Real-time API Integration**: Live data synchronization with the Jotish REST service, featuring automated data mapping and salary normalization.
*   **Biometric Identity Verification**: Integrated camera modules allowing for on-site security profile generation and identity proofing.
*   **Geographic Operations Map**: Interactive visualization of the workforce distribution across global regional sectors.
*   **Executive Analytics**: High-resolution charting of employee compensation tiers for the top 10 associates.

---

## Technical Architecture

The portal is engineered using a modern JavaScript stack focused on performance, modularity, and scalability.

*   **Frontend Framework**: React 19 (Functional Components, Hooks, Context API)
*   **State Management**: Secure Authentication Context with LocalStorage persistence.
*   **Design System**: Custom CSS3 Layouts (Glassmorphism, Responsive Grid Systems)
*   **Animations**: Framer Motion 12 (Staggered Loaders, Seamless Page Transitions)
*   **Data Services**: Axios-based asynchronous communication layer.
*   **Visualization**: Recharts (Analytics) and React-Leaflet (Mapping).
*   **Build Environment**: Vite (High-performance HMR and bundling).



## Screenshots

<img width="1909" height="861" alt="Screenshot 2026-03-01 152712" src="https://github.com/user-attachments/assets/4c3d3529-e103-4cb4-a67c-2b49292b4426" />

<img width="1919" height="1079" alt="Screenshot 2026-03-01 152811" src="https://github.com/user-attachments/assets/38d468c0-7c54-443d-b2ef-b6b20a97902f" />

<img width="1911" height="1079" alt="Screenshot 2026-03-01 152828" src="https://github.com/user-attachments/assets/5b1bd63f-5829-43a1-9c4e-b62768e3a537" />

<img width="1919" height="1079" alt="Screenshot 2026-03-01 152842" src="https://github.com/user-attachments/assets/7e7149b0-2c72-49db-bdbe-b7108dcebd15" />



---

## Installation and Deployment

### Development Environment Setup

1.  **Clone and Navigate**:
    ```bash
    cd Jotish_Project-
    ```

2.  **Dependency Installation**:
    ```bash
    npm install
    ```

3.  **Launch Local Development Server**:
    ```bash
    npm run dev
    ```
    *The application will be accessible at `http://localhost:5173/`.*

---

## API and Security Specifications

### Data Service Integration
The application interfaces with the following production endpoint for real-time intelligence:
*   **Endpoint URL**: `https://backend.jotish.in/backend_dev/gettabledata.php`
*   **Method**: `POST`
*   **Payload Specification**:
    ```json
    {
       "username": "test",
       "password": "123456"
    }
    ```

### Authentication Credentials
For evaluation and testing purposes, use the following local credentials:
*   **Username**: `testuser`
*   **Password**: `Test123`

---

## Mandatory Deliverables Status

*   **Authentication Portal**: Completed
*   **Data Intelligence List Feed**: Completed
*   **Detailed Associate Profiles**: Completed
*   **Biometric Photo Capture System**: Completed
*   **Identity Sync Confirmation Result**: Completed
*   **Salary Distribution Bar Charts**: Completed
*   **Global Distribution Map**: Completed

---

**Institutional Note**: This project was developed to demonstrate technical proficiency in ReactJS, secure API integration, and advanced UI/UX design suitable for enterprise-grade applications.
