# MERN E-Commerce Application

## Project Overview
This is a full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js) and Razorpay payment integration. Users can browse products, add to cart, place orders, and make payments.

## Frontend Libraries
- **ReactJS** – UI library for building components
- **Redux Toolkit** – State management for cart, orders, and user
- **React Router DOM** – Page navigation
- **Bootstrap 5** – Responsive UI components
- **CSS3** – Custom styling
- **Axios** – API calls
- **SweetAlert2** – Alerts and confirmations
- **React DatePicker** – Date selection
- **Framer Motion** – Animations (optional)
- **React Typed** – Typing animation on homepage (optional)

---

## Backend
- **Node.js & Express** – RESTful API
- **MongoDB & Mongoose** – Database
- **Razorpay** – Payment gateway integration

---

## Features
- Product catalog with search & filter
- Shopping cart (add, update, remove items)
- Order management (place, cancel, view history)
- Payment integration with Razorpay
- Loading and error states
- User authentication

---

## Setup & Install Packages

1. **Clone the repository**
```bash
git clone https://github.com/Santhiya-velayutham/mern-ecommerce.git
cd mern-ecommerce
**2.cd client**
npm install
npm install react react-dom react-router-dom redux @reduxjs/toolkit react-redux bootstrap
react-bootstrap axios sweetalert2 react-datepicker framer-motion react-typed
**
3.Install backend packages**
cd ../server
npm install
**4.server/.env → MongoDB URI, Razorpay keys**
**5.Run the application**
cd server
npm run dev
---------------------------
cd ../client
npm run dev

