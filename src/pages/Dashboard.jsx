import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { api } from '../utils/api';
import { decodeJwt, getExpiryInfo } from '../utils/helpers';
import {
  Alert, Btn, CopyBtn,
  IconShield, IconRefresh, IconLogout,
} from '../components/UI';

/* ── Stat Card ───────────────────────────────────────────── */
function StatCard({ label, value, meta, iconColor, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-label">{label}</span>
        <div className={`stat-icon ${iconColor}`}>{icon}</div>
      </div>
      <div className="stat-value">{value}</div>
      {meta && <div className="stat-meta">{meta}</div>}
    </div>
  );
}

/* ── Token Block ─────────────────────────────────────────── */
function TokenBlock({ label, value }) {
  return (
    <div className="token-block">
      <div className="token-block-header">
        <span className="token-type">{label}</span>
        <CopyBtn text={value} />
      </div>
      <div className="token-value">{value}</div>
    </div>
  );
}

/* ── Expiry Bar ──────────────────────────────────────────── */
function ExpiryBar({ token }) {
  const info = getExpiryInfo(token);
  if (!info) return null;
  const color = info.pct > 50 ? 'var(--success)' : info.pct > 20 ? 'var(--warn)' : 'var(--error)';
  return (
    <div className="expiry-bar-wrap">
      <div className="expiry-bar-label">
        <span>token lifetime</span>
        <span>{info.expired ? 'expired' : `${info.mins} min remaining`}</span>
      </div>
      <div className="expiry-bar-track">
        <div className="expiry-bar-fill" style={{ width: `${info.pct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { tokens, saveTokens, clearTokens } = useAuth();
  const [status, setStatus] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 30000);
    return () => clearInterval(id);
  }, []);

  const payload = decodeJwt(tokens.access);
  const expiryInfo = getExpiryInfo(tokens.access);
  const initials = payload?.email ? payload.email[0].toUpperCase() : '?';
  const loginTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleRefresh = async () => {
    setRefreshing(true);
    setStatus(null);
    try {
      const data = await api.refresh(tokens.refresh);
      saveTokens(data.accessToken, data.refreshToken);
      setStatus({ type: 'success', msg: 'Tokens refreshed successfully.' });
    } catch (err) {
      setStatus({ type: 'error', msg: err.message });
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = () => {
    clearTokens();
    navigate('/login');
  };

  return (
    <div className="dashboard-layout">
      {/* ── Topbar ── */}
      <header className="topbar">
        <div className="topbar-brand">
          <div className="topbar-logo" style={{ background: 'var(--accent)' }}>
            <IconShield size={16} style={{ stroke: '#ffffff' }} />
          </div>
          <span className="topbar-name">AuthKit</span>
        </div>

        <div className="topbar-right">
          <div className="user-pill">
            <div className="user-avatar">{initials}</div>
            <span>{payload?.email || 'user'}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            <IconLogout size={14} /> Sign out
          </button>
        </div>
      </header>

      {/* ── Content ── */}
      <div className="dashboard-content">
        <div className="dashboard-welcome">
          <h1>Good to see you, <span>{payload?.email?.split('@')[0] || 'user'}</span></h1>
          <p>Your session is active · Signed in at {loginTime}</p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <StatCard
            label="Status"
            value="Active"
            meta="Session authenticated"
            iconColor="green"
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>}
          />
          <StatCard
            label="Role"
            value={payload?.role || 'user'}
            meta="Access level"
            iconColor="amber"
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
          />
          <StatCard
            label="Token expires"
            value={expiryInfo ? `${expiryInfo.mins}m` : '—'}
            meta={expiryInfo?.expired ? 'Expired — refresh needed' : 'Until expiry'}
            iconColor={expiryInfo && expiryInfo.pct < 20 ? 'red' : 'blue'}
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>}
          />
          <StatCard
            label="User ID"
            value={`#${String(payload?.sub || '—').slice(0, 6)}`}
            meta="Unique identifier"
            iconColor="amber"
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
          />
        </div>

        <div className="dashboard-grid">
          {/* JWT Payload */}
          <div className="dash-section">
            <div className="section-title">JWT payload</div>
            <div className="jwt-fields">
              {[
                { key: 'sub',   val: payload?.sub   || '—' },
                { key: 'email', val: payload?.email || '—' },
                { key: 'role',  val: payload?.role  || '—', badge: true },
                { key: 'iat',   val: payload?.iat ? new Date(payload.iat * 1000).toLocaleString() : '—' },
                { key: 'exp',   val: payload?.exp ? new Date(payload.exp * 1000).toLocaleString() : '—' },
              ].map(({ key, val, badge }) => (
                <div key={key} className="jwt-field">
                  <span className="jwt-key">{key}</span>
                  <span className={`jwt-val ${badge ? 'role-badge' : ''}`}>{val}</span>
                </div>
              ))}
            </div>
            <ExpiryBar token={tokens.access} />
          </div>

          {/* Tokens + Actions */}
          <div className="dash-section">
            <div className="section-title">session tokens</div>

            <Alert message={status?.msg} type={status?.type} />

            <TokenBlock label="access_token" value={tokens.access || '—'} />
            <TokenBlock label="refresh_token" value={tokens.refresh || '—'} />

            <div className="action-row">
              <Btn variant="ghost" onClick={handleRefresh} loading={refreshing}>
                <IconRefresh size={14} /> Refresh tokens
              </Btn>
              <Btn variant="danger" onClick={handleLogout}>
                <IconLogout size={14} /> Sign out
              </Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
