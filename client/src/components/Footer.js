import React from 'react';

function Footer() {
  return (
    <div className="bg-light text-center text-lg-start mt-5">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Football App</h5>
            <p>
              A simple football app to schedule matches, record scores and send calendar invitations.
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Links</h5>

            <ul className="list-unstyled mb-0">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/matches">Matches</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-0">Developed by</h5>

            <ul className="list-unstyled">
              <li>
                <a href="https://github.com/yourusername">Your Name</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Football App | All rights reserved | Terms Of Service | Privacy
      </div>
    </div>
  );
}

export default Footer;
