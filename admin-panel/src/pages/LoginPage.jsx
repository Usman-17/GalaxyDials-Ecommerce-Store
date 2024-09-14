import { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
// imports End

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isShow, setIsShow] = useState(false);

  const queryClient = useQueryClient();

  const {
    mutate: loginMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const res = await fetch("/api/auth/login/admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (!res.ok)
          throw new Error(data.error || "Login failed. Please try again.");
      } catch (error) {
        throw new Error(error);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Successfully logged in");
    },

    onError: (error) => {
      toast.error(error.message || "Invalid email or password");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in both email and password");
      return;
    }
    loginMutation({ email, password });
  };

  const togglePassword = () => {
    setIsShow(!isShow);
  };

  return (
    <div className="auth-wrapper d-flex align-items-center py-5">
      <Container>
        <Row>
          <Col>
            <div className="auth-card py-4 mx-auto">
              <div className="text-center my-3">
                <h3 className="auth-title">Login</h3>
                <p className="sub-heading pb-4">
                  Sign in to access your account and continue.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Email */}
                <FloatingLabel
                  id="floatingInput"
                  label="Email"
                  className="mb-2"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FloatingLabel>

                <FloatingLabel id="floatingPassword" label="Password">
                  <Form.Control
                    type={isShow ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div
                    onClick={togglePassword}
                    className="toggle-password position-absolute d-flex align-items-center justify-content-center"
                  >
                    {password && (
                      <>{isShow ? <Eye size={20} /> : <EyeOff size={20} />}</>
                    )}
                  </div>
                </FloatingLabel>

                {isError && (
                  <p className="text-danger error-message mt-2">
                    {error.message}
                  </p>
                )}

                {/* Button */}
                <div
                  className="btn d-flex gap-2 gap-lg-3 text-center 
              align-items-center justify-content-center my-1 mt-4"
                >
                  {/* login */}
                  <button
                    className="button border-0 d-flex align-items-center justify-content-center w-50"
                    type="submit"
                  >
                    {isPending ? "Loading..." : "Login"}
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;