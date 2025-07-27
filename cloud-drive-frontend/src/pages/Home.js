// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-box">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          ☁️ Welcome to Cloud Drive
        </motion.h1>
        <p>Securely store and access your files on the cloud.</p>

        <div className="home-buttons">
          <Link to="/register" className="home-btn">Get Started</Link>
          <Link to="/login" className="home-btn secondary">Login</Link>
        </div>

        <div className="home-features">
          <motion.div className="feature-box" whileHover={{ scale: 1.05 }}>
            <h3>🔒 Secure Upload</h3>
            <p>Keep your files encrypted and safe.</p>
          </motion.div>
          <motion.div className="feature-box" whileHover={{ scale: 1.05 }}>
            <h3>⚡ Fast Access</h3>
            <p>Access files instantly from anywhere.</p>
          </motion.div>
          <motion.div className="feature-box" whileHover={{ scale: 1.05 }}>
            <h3>📤 Easy Sharing</h3>
            <p>Share files with just one click.</p>
          </motion.div>
        </div>

        <footer className="home-footer">
          <p>© 2025 Cloud Drive. Built by Kiran 👨‍💻</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
