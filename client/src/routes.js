import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Dashboard from './pages/mainDash';
import Login from './pages/loginPage';
import Landing from './pages/landingPage';
import Memos from './pages/memosPage';
import Utility from './pages/utilityPage';
import NotFound from './pages/notFound';
// This will define the routes with the associated components needed for rendering
const router = createBrowserRouter([
    { path: '/', element: <Landing /> },
    { path: '/login', element: <Login /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/memos', element: <Memos /> },
    { path: '/utility', element: <Utility /> },
    { path: '*', element: <NotFound /> },
]);

const AppRoutes = () => {
    return <RouterProvider router={router} />;
};

export default AppRoutes;