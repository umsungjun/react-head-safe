import { ReactHeadSafe } from '../../../../src';

export default function Home() {
  return (
    <>
      <ReactHeadSafe
        title="Home - React Head Safe Demo"
        description="Welcome to React Head Safe - A CSR-only React head manager that prevents duplicate meta tags."
        keywords="react, head, meta, seo, csr, home"
        ogTitle="Home - React Head Safe Demo"
        ogDescription="Welcome to React Head Safe - A CSR-only React head manager that prevents duplicate meta tags."
        ogImage="https://via.placeholder.com/1200x630/3b82f6/ffffff?text=Home"
      />

      <div className="page-container">
        <div className="hero">
          <h1>Welcome to React Head Safe</h1>
          <p className="subtitle">
            A CSR-only React head manager that prevents duplicate meta tags
          </p>
        </div>

        <div className="content">
          <section className="feature-section">
            <h2>Key Features</h2>
            <div className="feature-grid">
              <div className="feature-card">
                <h3>🎯 No Duplicates</h3>
                <p>
                  Automatically prevents duplicate meta tags from cluttering
                  your head section
                </p>
              </div>
              <div className="feature-card">
                <h3>⚡ Lightweight</h3>
                <p>Minimal overhead with efficient DOM manipulation</p>
              </div>
              <div className="feature-card">
                <h3>🔄 Dynamic Updates</h3>
                <p>
                  Seamlessly updates meta tags when navigating between pages
                </p>
              </div>
              <div className="feature-card">
                <h3>💪 Type-Safe</h3>
                <p>Full TypeScript support for better developer experience</p>
              </div>
            </div>
          </section>

          <section className="demo-section">
            <h2>How It Works</h2>
            <p>
              Navigate between pages using the menu above and open your browser
              DevTools (F12 or Cmd+Opt+I) to see how meta tags are updated
              dynamically without creating duplicates.
            </p>
            <div className="demo-steps">
              <div className="step">
                <span className="step-number">1</span>
                <span className="step-text">Open DevTools (F12)</span>
              </div>
              <div className="step">
                <span className="step-number">2</span>
                <span className="step-text">Navigate to Elements tab</span>
              </div>
              <div className="step">
                <span className="step-number">3</span>
                <span className="step-text">
                  Expand the &lt;head&gt; element
                </span>
              </div>
              <div className="step">
                <span className="step-number">4</span>
                <span className="step-text">Click different pages</span>
              </div>
              <div className="step">
                <span className="step-number">5</span>
                <span className="step-text">
                  Watch meta tags update in real-time
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
