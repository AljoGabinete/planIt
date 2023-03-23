import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './Pages/MainLayout';
import Dashboard from './Pages/Dashboard';
import Calendar from './Pages/Calendar';
import Blog from './Pages/Blog';
import { MonthProvider } from './provider/MonthProvider';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <Dashboard /> },
        { path: '/Calendar', element: <Calendar /> },
        { path: '/Blog', element: <Blog /> },
      ],
    },
  ]);
  return (
    <MonthProvider>
      <RouterProvider router={router} />
    </MonthProvider>
  );
}

export default App;
