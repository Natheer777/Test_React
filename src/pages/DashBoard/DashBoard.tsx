import { useLocation } from 'react-router-dom';
import { Navbar, Tasks, Products, Users, Notes, Footer } from '../../sctions'

export default function DashBoard() {
  const location = useLocation();

  const getCurrentComponent = () => {
    switch (location.pathname) {
      case '/Test_React/products':
        return <Products />;
      case '/Test_React/users':
        return <Users />;
      case '/Test_React/notes':
        return <Notes />;
      case '/Test_React/tasks':
      default:
        return <Tasks />;
    }
  };

  return (
    <>
      <Navbar />
      {getCurrentComponent()}
      <Footer />
    </>
  )
}
