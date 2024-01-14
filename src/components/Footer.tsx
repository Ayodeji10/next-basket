import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="top d-flex justify-content-between align-items-center">
          <h3>Bandage</h3>
          <div className="d-flex gap-3 align-items-center">
            <i className="fa-brands fa-facebook" />
            <i className="fa-brands fa-instagram" />
            <i className="fa-brands fa-twitter" />
          </div>
        </div>
        <div className="main">
          <div className="row">
            <div className="col-lg-8 col-12">
              <div className="row">
                <div className="col-md-3 col-sm-6 col-12 d-flex flex-column gap-3">
                  <h4>Company Info</h4>
                  <p>About Us</p>
                  <p>Carrier</p>
                  <p>We are hiring</p>
                  <p>Blog</p>
                </div>
                <div className="col-md-3 col-sm-6 col-12 d-flex flex-column gap-3 mt-4 mt-sm-0 mt-md-0 mt-lg-0">
                  <h4>Legal</h4>
                  <p>About Us</p>
                  <p>Carrier</p>
                  <p>We are hiring</p>
                  <p>Blog</p>
                </div>
                <div className="col-md-3 col-sm-6 col-12 d-flex flex-column gap-3 mt-4 mt-md-0 mt-lg-0">
                  <h4>Features</h4>
                  <p>Business Marketing</p>
                  <p>User Analytic</p>
                  <p>Live Chat</p>
                  <p>Unlimited Support</p>
                </div>
                <div className="col-md-3 col-sm-6 col-12 d-flex flex-column gap-3 mt-4 mt-md-0 mt-lg-0">
                  <h4>Resources</h4>
                  <p>IOS &amp; Android</p>
                  <p>Watch a Demo</p>
                  <p>Customers</p>
                  <p>Customers</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12 d-flex flex-column gap-3 mt-4 mt-lg-0">
              <h4>Get In Touch</h4>
              <div className="searchbar d-flex align-items-center justify-content-between">
                <input type="email" placeholder="Your Email" />
                <button>Subscribe</button>
              </div>
              <h6>Lore imp sum dolor Amit</h6>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="container">
          <p>Made With Love By Finland All Right Reserved</p>
        </div>
      </div>
    </footer>
  );
}
