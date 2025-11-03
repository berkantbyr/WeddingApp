import React, { useState } from 'react';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';

const ContactPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container py-5">
      <div className="row g-5 align-items-center">
        <div className="col-lg-6">
          <h1 className="section-heading">Planlama yolculuğunuza rehberlik edelim</h1>
          <p className="text-muted mb-4">
            İster mükemmel atmosferi arayan bir çift olun ister platformumuza katılan bir salon sahibi, yanınızdayız.
            Bize yazın, ekibimiz en geç bir iş günü içinde size dönüş yapsın.
          </p>
          <div className="d-flex flex-column gap-3">
            <div className="d-flex align-items-center gap-3">
              <span className="badge-soft">Destek</span>
              <span className="text-muted">support@salonbulucu.com</span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span className="badge-soft">Telefon</span>
              <span className="text-muted">+90 (212) 555 00 00</span>
            </div>
            <div className="d-flex align-items-center gap-3">
              <span className="badge-soft">Ofis</span>
              <span className="text-muted">Levent Mahallesi, İstanbul</span>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 p-md-5">
              {submitted ? (
                <div className="alert alert-success mb-0" role="alert">
                  Teşekkürler! Ekibimiz kısa süre içinde sizinle iletişime geçecek.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                  <Input
                    id="name"
                    name="name"
                    label="Ad Soyad"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    label="E-posta"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    id="message"
                    name="message"
                    label="Size nasıl yardımcı olabiliriz?"
                    as="textarea"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <Button type="submit">Mesajı gönder</Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

