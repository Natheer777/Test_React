import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-4">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title ">Task Manager</h3>
          <p className="footer-description">
            A modern React application for managing tasks, products, and users
            with full CRUD operations and beautiful UI.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#tasks">Tasks</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#users">Users</a></li>
            <li><a href="#notes">Notes</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Tech Stack</h4>
          <ul className="footer-links">
            <li>React 19</li>
            <li>TypeScript</li>
            <li>Redux Toolkit</li>
            <li>Vite</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-subtitle">Contact</h4>
          <div className="footer-contact">
            <p>© {currentYear} Task Manager. All rights reserved.</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="footer-copyright">
            Developed by Natheer | Powered by React & TypeScript
          </p>
        </div>
      </div>
    </footer>
  );
}
