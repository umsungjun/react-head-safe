import { ReactHeadSafe } from '../../../../src';

export default function About() {
  return (
    <>
      <ReactHeadSafe
        title="About - React Head Safe Demo"
        description="Learn more about React Head Safe and how it solves the duplicate meta tag problem in CSR applications."
        keywords="react, head, meta, seo, csr, about, documentation"
        ogTitle="About - React Head Safe Demo"
        ogDescription="Learn more about React Head Safe and how it solves the duplicate meta tag problem in CSR applications."
        ogImage={`${window.location.origin}/logo.png`}
      />

      <div className="page-container">
        <div className="hero hero-secondary">
          <h1>About React Head Safe</h1>
          <p className="subtitle">Understanding the problem and the solution</p>
        </div>

        <div className="content">
          <section className="info-section">
            <h2>The Problem</h2>
            <p>
              In Client-Side Rendered (CSR) applications, managing meta tags and
              other head elements can be challenging. Traditional solutions
              often lead to:
            </p>
            <ul className="problem-list">
              <li>Duplicate meta tags accumulating in the DOM</li>
              <li>Memory leaks from improper cleanup</li>
              <li>SEO issues due to conflicting metadata</li>
              <li>Performance degradation over time</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>The Solution</h2>
            <p>
              React Head Safe provides a simple, efficient way to manage head
              elements in your React application. It automatically:
            </p>
            <ul className="solution-list">
              <li>Tracks and removes duplicate meta tags</li>
              <li>Cleans up when components unmount</li>
              <li>Maintains consistent metadata across page transitions</li>
              <li>Provides a familiar React-like API</li>
            </ul>
          </section>

          <section className="info-section">
            <h2>Usage Example</h2>
            <pre className="code-block">
              <code>{`import ReactHeadSafe from 'react-head-safe';

function MyPage() {
  return (
    <>
      <ReactHeadSafe>
        <title>My Page Title</title>
        <meta name="description" content="Page description" />
        <meta property="og:title" content="My Page Title" />
      </ReactHeadSafe>
      
      <div>Your page content here</div>
    </>
  );
}`}</code>
            </pre>
          </section>

          <section className="info-section">
            <h2>Why Choose React Head Safe?</h2>
            <div className="feature-grid">
              <div className="feature-card">
                <h3>🎯 CSR-Focused</h3>
                <p>Designed specifically for client-side rendering scenarios</p>
              </div>
              <div className="feature-card">
                <h3>🪶 Zero Dependencies</h3>
                <p>No additional packages required beyond React</p>
              </div>
              <div className="feature-card">
                <h3>📦 Tiny Bundle</h3>
                <p>Minimal impact on your application bundle size</p>
              </div>
              <div className="feature-card">
                <h3>🔧 Easy Integration</h3>
                <p>Drop-in solution with no complex configuration</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
