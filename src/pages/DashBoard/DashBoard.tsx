import { useLocation } from 'react-router-dom';
import { Navbar, Tasks, Products, Users, Notes } from '../../sctions'

export default function DashBoard() {
  const location = useLocation();

  const getCurrentComponent = () => {
    switch (location.pathname) {
      case '/products':
        return <Products />;
      case '/users':
        return <Users />;
      case '/notes':
        return <Notes />;
      case '/tasks':
      default:
        return <Tasks />;
    }
  };

  return (
    <>
      <Navbar />
      {getCurrentComponent()}
    </>
  )
}
