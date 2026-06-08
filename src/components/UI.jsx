import { useState } from 'react';

/* ── Icons (inline SVG) ──────────────────────────────────── */
export function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="form-input-icon">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}

export function IconLock() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="form-input-icon">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  );
}

export function IconUser() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="form-input-icon">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  );
}

export function IconShield({ size = 16, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}

export function IconRefresh({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
      <path d="M21 3v5h-5"/>
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
      <path d="M8 16H3v5"/>
    </svg>
  );
}

export function IconLogout({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16,17 21,12 16,7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );
}

export function IconCopy({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
    </svg>
  );
}

export function IconCheck({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20,6 9,17 4,12"/>
    </svg>
  );
}

/* ── Spinner ─────────────────────────────────────────────── */
export function Spinner() {
  return <span className="spinner" aria-hidden="true" />;
}

/* ── Alert ───────────────────────────────────────────────── */
export function Alert({ message, type = 'error' }) {
  if (!message) return null;
  const isError = type === 'error';
  return (
    <div className={`alert ${isError ? 'alert-error' : 'alert-success'}`} role="alert">
      <span className="alert-icon" aria-hidden="true">
        {isError ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
        )}
      </span>
      {message}
    </div>
  );
}

/* ── Button ──────────────────────────────────────────────── */
export function Btn({ children, onClick, loading, disabled, variant = 'primary', type = 'button', className = '' }) {
  return (
    <button type={type} onClick={onClick} disabled={disabled || loading} className={`btn btn-${variant} ${className}`}>
      {loading ? <><Spinner /> Processing…</> : children}
    </button>
  );
}

/* ── Divider ─────────────────────────────────────────────── */
export function Divider({ label }) {
  return (
    <div className="divider">
      <span className="divider-line" />
      <span className="divider-text">{label}</span>
      <span className="divider-line" />
    </div>
  );
}

/* ── Form Input ──────────────────────────────────────────── */
export function FormInput({ label, type = 'text', value, onChange, error, placeholder, autoComplete, icon: Icon, extra }) {
  const [showPwd, setShowPwd] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPwd ? 'text' : type;

  return (
    <div className="form-group">
      <label className="form-label">
        <span>{label}</span>
        {extra}
      </label>
      <div className="form-input-wrap">
        {Icon && <Icon />}
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`form-input ${error ? 'error' : ''}`}
          style={!Icon ? { paddingLeft: '1rem' } : undefined}
        />
        {isPassword && (
          <button type="button" className="form-input-action" onClick={() => setShowPwd((s) => !s)}>
            {showPwd ? 'hide' : 'show'}
          </button>
        )}
      </div>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}

/* ── Copy Button ─────────────────────────────────────────── */
export function CopyBtn({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className={`token-copy-btn ${copied ? 'copied' : ''}`}>
      {copied ? <><IconCheck /> copied</> : <><IconCopy /> copy</>}
    </button>
  );
}
