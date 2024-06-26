import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import MyRouts from './MyRouts.jsx';
import AuthProviders from './Authentications/AuthProviders.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <div className='max-w-7xl mx-auto'>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProviders>
          <React.StrictMode>
            <RouterProvider router={MyRouts} />
          </React.StrictMode>
        </AuthProviders>
      </QueryClientProvider>
    </HelmetProvider>
  </div>,
)
