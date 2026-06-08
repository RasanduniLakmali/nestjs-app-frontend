import { IconShield } from './UI';

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
      </svg>
    ),
    title: 'JWT Authentication',
    desc: 'Stateless tokens with automatic refresh',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="m9 12 2 2 4-4"/>
      </svg>
    ),
    title: 'Role-Based Access',
    desc: 'Granular permissions per user role',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
        <path d="M21 3v5h-5"/>
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
        <path d="M8 16H3v5"/>
      </svg>
    ),
    title: 'Token Rotation',
    desc: 'Silent refresh keeps sessions alive',
  },
];

export default function AuthPanel({ mode }) {
  return (
    <aside className="auth-panel" aria-hidden="true">
      <div className="panel-grid" />
      <div className="panel-orb panel-orb-1" />
      <div className="panel-orb panel-orb-2" />

      <div className="panel-brand">
        <div className="panel-logo">
          <div className="panel-logo-icon">
            <IconShield size={18} style={{ stroke: '#ffffff' }} />
          </div>
          <span className="panel-logo-text">AuthKit</span>
        </div>

        <h2 className="panel-headline">
          {mode === 'register' ? (
            <><span>Create</span> your secure account</>
          ) : (
            <>Your gateway to<br /><span>secure access</span></>
          )}
        </h2>
        <p className="panel-desc">
          Production-ready authentication powered by NestJS, JWT tokens, and bcrypt password hashing.
        </p>
      </div>

      <div className="panel-features">
        {features.map((f) => (
          <div key={f.title} className="panel-feature">
            <div className="feature-icon">{f.icon}</div>
            <div className="feature-text">
              <strong>{f.title}</strong>
              <span>{f.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
