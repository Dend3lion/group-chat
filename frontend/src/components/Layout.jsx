import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks";
import { useTranslation } from "react-i18next";

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  return auth.loggedIn ? (
    <Button
      onClick={() => {
        auth.logOut();
        navigate("/");
      }}
    >
      {t("header.logout")}
    </Button>
  ) : (
    <Button as={Link} to="/login" state={{ from: location }}>
      {t("header.login")}
    </Button>
  );
};

const RegistrationButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    !auth.loggedIn && (
      <Nav.Link as={Link} to="/signup" className="me-3">
        {t("header.register")}
      </Nav.Link>
    )
  );
};

const Layout = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            {t("header.brand")}
          </Navbar.Brand>
          <Nav>
            <RegistrationButton />
            <AuthButton />
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
};

export default Layout;
