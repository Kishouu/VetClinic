import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../components/UI/ContactUs.css';
import PageHeader from '../components/PageHeader';

// Fix Leaflet marker icon paths
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

export default function ContactUs() {
  return (
    <section className='contact-page'>
      {/* Reusable header with image and title */}
      <PageHeader imageSrc="/ContactUsHeader.png" title="Contact Us" />

      <div className='contact-content'>
        <form className='contact-form' aria-label="Contact form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" placeholder='Your name' required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" placeholder='Your email' required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" placeholder='Your message' rows="5" required />
          </div>

          <button type="submit">Send</button>
        </form>

        <div className='map-container'>
          <MapContainer
            center={[52.2297, 21.0122]}
            zoom={13}
            scrollWheelZoom={false}
            style={{ height: '300px', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[52.2297, 21.0122]}>
              <Popup>
                WetClinic Headquarters<br />Warsaw, Poland
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  );
}

