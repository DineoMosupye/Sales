import { useNavigate } from "react-router-dom";
import styles from "../../pages/HomePage.module.css";
import { useAuthContext } from "../../state/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <header className={styles.portalHeader}>
        <div>
          <img className={styles.brandLogo} src="/images/eb-logo.png.avif" alt="EagleBurgmann logo" />
        </div>
        <button type="button" className={styles.headerAction} onClick={handleLogout}>
          Logout
        </button>
      </header>
    </>
  );
}

export default Navbar;
