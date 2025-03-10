import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from '../../components/Navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navigation />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
