import React from "react";
import "./RSVPSection.css";

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSd.../viewform?embedded=true"; // replace with your form's embed URL

function RSVPSection() {
  return (
    <section className="rsvp-section">
      <h2 className="rsvp-heading">RSVP</h2>
      <p className="rsvp-intro">
        We hope you can join us on our special day!
        <br />
        Please fill out the RSVP form below.
      </p>
      <div className="rsvp-form-wrapper">
        <iframe
          src={GOOGLE_FORM_URL}
          title="Wedding RSVP"
          frameBorder="0"
          allowFullScreen
        >
          Loading…
        </iframe>
      </div>
    </section>
  );
}

export default RSVPSection;
