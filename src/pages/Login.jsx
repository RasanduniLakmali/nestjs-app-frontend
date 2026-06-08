import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthPanel from '../components/AuthPanel';
import { FormInput, Btn, Divider, Alert, IconMail, IconLock } from '../components/UI';
import { api } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { saveTokens } = useAuth();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors]     = useState({});
  const [status, setStatus]     = useState(null);
  const [loading, setLoading]   = useState(false);

  const validate = () => {
    const e = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address';
    if (!password) e.password = 'Password is required';
    return e;
  };

  const submit = async () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setStatus(null);
    try {
      const data = await api.login({ email, password });
      saveTokens(data.accessToken, data.refreshToken);
      navigate('/dashboard');
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => { if (e.key === 'Enter') submit(); };

  return (
    <div className="auth-layout">
      <AuthPanel mode="login" />

      <main className="auth-form-area">
        <div className="auth-card">
          <div className="auth-card-header">
            <div className="auth-badge">secure sign in</div>
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">Sign in to access your dashboard</p>
          </div>

          <Alert message={status?.msg} type={status?.type} />

          <FormInput
            label="Email address"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="jane@example.com"
            autoComplete="email"
            icon={IconMail}
            error={errors.email}
          />

          <div onKeyDown={handleKey}>
            <FormInput
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Your password"
              autoComplete="current-password"
              icon={IconLock}
              error={errors.password}
            />
          </div>

          <div style={{ marginTop: '0.5rem' }}>
            <Btn onClick={submit} loading={loading}>
              Sign in
            </Btn>
          </div>

          <Divider label="new here?" />

          <Link to="/register" style={{ textDecoration: 'none' }}>
            <Btn variant="secondary">Create an account</Btn>
          </Link>
        </div>
      </main>
    </div>
  );
}
