import useAuth from "../hooks";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import routes from "../routes";
import * as yup from "yup";
import { Button, Container, FloatingLabel, Form, Stack } from "react-bootstrap";

const LoginPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup
        .string("Enter your username")
        .required("Username is required"),
      password: yup
        .string("Enter your password")
        .required("Password is required"),
    }),
    onSubmit: async (values) => {
      const { data } = await axios.post(routes.loginPath(), values);

      auth.logIn(data);
      navigate("/", { replace: true });
    },
  });

  return (
    <Container className="align-items-center">
      <Form onSubmit={formik.handleSubmit}>
        <Stack className="w-50" gap={3}>
          <FloatingLabel controlId="username" label="Username">
            <Form.Control
              name="username"
              type="text"
              placeholder="Username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.username && formik.errors.username}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.username}
            </Form.Control.Feedback>
          </FloatingLabel>
          <FloatingLabel controlId="password" label="Password">
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.password && formik.errors.password}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.password}
            </Form.Control.Feedback>
          </FloatingLabel>
          <Button variant="outline-primary" type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </Container>
  );
};

export default LoginPage;
