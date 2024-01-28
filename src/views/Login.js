// ** Styles
import "@styles/react/pages/page-authentication.scss";

import * as Yup from "yup";

// ** Reactstrap Imports
import {
  Button,
  CardText,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Form, Formik } from "formik";
// ** Custom Components
import { PasswordField, InputField } from "@customcomponents";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Trans } from "@lingui/react";
import illustrationsDark from "@src/assets/images/pages/login-v2-dark.svg";
// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/login-v2.svg";
import themeConfig from "@configs/themeConfig";
import { useEffect } from "react";
// ** React Imports
import { useSkin } from "@hooks/useSkin";

import { login } from "@store/AppSettings/auth";

const Login = () => {
  const navigate = useNavigate();

  // Redux Selectors
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const { skin } = useSkin();

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  // initial Values
  const initialValue = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required(<Trans id="Username required" />)
      .min(1, <Trans id="min is 1" />),
    password: Yup.string()
      .required(<Trans id="Password required" />)
      .min(5, <Trans id="min is 5" />),
  });

  const onSubmit = (values) => {
    dispatch(login(values));
  };
  useEffect(() => {
    if (!!isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn]);
  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
          <img
            src={themeConfig.app.appLogoImage}
            alt="logo"
            style={{ width: "150px", height: "50px" }}
          />
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              SCIB Paints AID 👋
            </CardTitle>
            <CardText className="mb-2">Login to your account</CardText>
            <Formik
              onSubmit={onSubmit}
              initialValues={initialValue}
              validationSchema={validationSchema}
            >
              {({ handleSubmit }) => (
                <Form className="auth-login-form mt-2" onSubmit={handleSubmit}>
                  <InputField
                    label="Username"
                    name="username"
                    placeholder="username"
                  />
                  <PasswordField
                    name="password"
                    label={<Trans id="Password" />}
                  />
                  <div className="form-check mb-1">
                    <Input type="checkbox" id="remember-me" />
                    <Label className="form-check-label" for="remember-me">
                      Remember Me
                    </Label>
                  </div>
                  <Button type="submit" color="primary" block>
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
