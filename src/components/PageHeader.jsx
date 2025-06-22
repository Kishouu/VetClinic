import React from 'react';
import './UI/PageHeader.css'; // adjust path if needed

export default function PageHeader({ imageSrc, title }) {
  return (
    <header className="page-header">
      <img src={imageSrc} alt={title} className="page-header-image" />
      <h1>{title}</h1>
    </header>
  );
}

