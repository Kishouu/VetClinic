import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import '../components/UI/ContactUs.css';

// Fix default marker icon issue with Leaflet + Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

export default function ContactUs() {
  return (
    <div className='contact-page'>
      <header className='contact-header'>
        <img src="/ContactUsHeader" alt="Contact Us Header" className='header-image' />
        <h1>Contact Us</h1>
      </header>

      <div className='contact-content'>
        <form className='contact-form'>
          <label>Name</label>
          <input type="text" placeholder='Your name' required />

          <label>Email</label>
          <input type="email" placeholder='Your email' required />

          <label>Message</label>
          <textarea placeholder='Your message' rows="5" required />

          <button type="submit">Send</button>
        </form>

        <div className='map-container'>
          <MapContainer center={[52.2297, 21.0122]} zoom={13} scrollWheelZoom={false} style={{ height: '300px', width: '100%' }}>
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
    </div>
  );
}

