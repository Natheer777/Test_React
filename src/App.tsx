import './App.css'
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { store } from './store';
import DashBoard from './pages/DashBoard/DashBoard';

function App() {

  useEffect(() => {
    setInterval(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          } else {
            entry.target.classList.remove("show");
            observer.unobserve(entry.target); 
          }
        });
      });

      const Elements = document.querySelectorAll(
        ".left ,.right ,.top ,.hidden"
      );
      Elements.forEach((el) => observer.observe(el));

      return () => {
        Elements.forEach((el) => observer.unobserve(el));
      };
    });
  }, []);



  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/Test_React/" element={<DashBoard />} />
          <Route path="/Test_React/tasks" element={<DashBoard />} />
          <Route path="/Test_React/products" element={<DashBoard />} />
          <Route path="/Test_React/users" element={<DashBoard />} />
          <Route path="/Test_React/notes" element={<DashBoard />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </Provider>
  )
}

export default App
