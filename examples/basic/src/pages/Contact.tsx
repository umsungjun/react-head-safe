// import { Helmet } from 'react-helmet-async';
import { ReactHeadSafe } from '../../../../src';

export default function Contact() {
  return (
    <>
      <ReactHeadSafe
        title="Contact - React Head Safe Demo"
        description="Get in touch with the React Head Safe team. Report issues, suggest features, or contribute to the project."
        keywords="react, head, meta, seo, csr, contact, github, support"
        ogTitle="Contact - React Head Safe Demo"
        ogDescription="Get in touch with the React Head Safe team. Report issues, suggest features, or contribute to the project."
        ogImage={`${window.location.origin}/logo.png`}
      />
      {/* <Helmet>
        <title>Contact - React Head Safe Demo</title>
        <meta
          name="description"
          content="Get in touch with the React Head Safe team. Report issues, suggest features, or contribute to the project."
        />
        <meta
          name="keywords"
          content="react, head, meta, seo, csr, contact, github, support"
        />
        <meta property="og:title" content="Contact - React Head Safe Demo" />
        <meta
          property="og:description"
          content="Get in touch with the React Head Safe team. Report issues, suggest features, or contribute to the project."
        />
        <meta
          property="og:image"
          content={`${window.location.origin}/logo-contact.png`}
        />
      </Helmet> */}

      <div className="page-container">
        <div className="hero hero-accent">
          <h1>Get in Touch</h1>
          <p className="subtitle">
            Questions, feedback, or contributions welcome
          </p>
        </div>

        <div className="content">
          <section className="contact-section">
            <h2>GitHub Repository</h2>
            <p>
              React Head Safe is open source and available on GitHub. Feel free
              to:
            </p>
            <div className="contact-cards">
              <div className="contact-card">
                <h3>🐛 Report Issues</h3>
                <p>
                  Found a bug? Have a problem? Open an issue on GitHub and we'll
                  help you out.
                </p>
                <a
                  href="https://github.com/umsungjun/react-head-safe/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  Open an Issue
                </a>
              </div>

              <div className="contact-card">
                <h3>💡 Feature Requests</h3>
                <p>
                  Have an idea to make React Head Safe better? We'd love to hear
                  it!
                </p>
                <a
                  href="https://github.com/umsungjun/react-head-safe/issues/new"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  Suggest a Feature
                </a>
              </div>

              <div className="contact-card">
                <h3>🤝 Contribute</h3>
                <p>
                  Want to contribute code? Pull requests are welcome and
                  appreciated!
                </p>
                <a
                  href="https://github.com/umsungjun/react-head-safe/pulls"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  Submit a PR
                </a>
              </div>

              <div className="contact-card">
                <h3>⭐ Star the Project</h3>
                <p>
                  If you find React Head Safe useful, consider giving it a star
                  on GitHub!
                </p>
                <a
                  href="https://github.com/umsungjun/react-head-safe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  View on GitHub
                </a>
              </div>
            </div>
          </section>

          <section className="info-section">
            <h2>Testing Meta Tags</h2>
            <p>
              While on this page, check your browser's DevTools to see the
              Contact page's unique meta tags:
            </p>
            <ul className="meta-tag-list">
              <li>
                <strong>Title:</strong> Contact - React Head Safe Demo
              </li>
              <li>
                <strong>Description:</strong> Get in touch with the React Head
                Safe team...
              </li>
              <li>
                <strong>Keywords:</strong> react, head, meta, seo, csr, contact,
                github, support
              </li>
              <li>
                <strong>OG Image:</strong> Purple themed placeholder image
              </li>
            </ul>
            <p className="note">
              Note: Each page has different colored OG images to demonstrate
              dynamic updates!
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
