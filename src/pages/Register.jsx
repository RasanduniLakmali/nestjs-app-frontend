import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthPanel from '../components/AuthPanel';
import { FormInput, Btn, Divider, Alert, IconMail, IconLock, IconUser } from '../components/UI';
import { api } from '../utils/api';
import { passwordStrength } from '../utils/helpers';

function validate({ name, email, password, confirm }) {
  const errors = {};
  if (!name.trim()) errors.name = 'Full name is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address';
  if (password.length < 8) errors.password = 'Password must be at least 8 characters';
  if (password !== confirm) errors.confirm = 'Passwords do not match';
  return errors;
}

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const set = (key) => (val) => setForm((f) => ({ ...f, [key]: val }));
  const strength = passwordStrength(form.password);

  const submit = async () => {
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    setStatus(null);
    try {
      await api.register({ name: form.name, email: form.email, password: form.password });
      setStatus({ type: 'success', msg: 'Account created! Redirecting to sign in…' });
      setTimeout(() => navigate('/login'), 1600);
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <AuthPanel mode="register" />

      <main className="auth-form-area">
        <div className="auth-card">
          <div className="auth-card-header">
            <div className="auth-badge">new account</div>
            <h1 className="auth-title">Create account</h1>
            <p className="auth-subtitle">Fill in your details to get started</p>
          </div>

          <Alert message={status?.msg} type={status?.type} />

          <FormInput
            label="Full name"
            value={form.name}
            onChange={set('name')}
            placeholder="Jane Doe"
            autoComplete="name"
            icon={IconUser}
            error={errors.name}
          />

          <FormInput
            label="Email address"
            type="email"
            value={form.email}
            onChange={set('email')}
            placeholder="jane@example.com"
            autoComplete="email"
            icon={IconMail}
            error={errors.email}
          />

          <FormInput
            label="Password"
            type="password"
            value={form.password}
            onChange={set('password')}
            placeholder="Minimum 8 characters"
            autoComplete="new-password"
            icon={IconLock}
            error={errors.password}
          />

          {form.password.length > 0 && (
            <div style={{ marginBottom: '1.1rem', marginTop: '-0.6rem' }}>
              <div className="strength-bar">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`strength-seg ${i <= strength.level ? `active-${strength.cls}` : ''}`}
                  />
                ))}
              </div>
              <span className={`strength-label ${strength.cls}`}>{strength.label}</span>
            </div>
          )}

          <FormInput
            label="Confirm password"
            type="password"
            value={form.confirm}
            onChange={set('confirm')}
            placeholder="Re-enter your password"
            autoComplete="new-password"
            icon={IconLock}
            error={errors.confirm}
          />

          <div style={{ marginTop: '0.25rem' }}>
            <Btn onClick={submit} loading={loading}>
              Create account
            </Btn>
          </div>

          <Divider label="already have an account?" />

          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Btn variant="secondary">Sign in instead</Btn>
          </Link>
        </div>
      </main>
    </div>
  );
}
