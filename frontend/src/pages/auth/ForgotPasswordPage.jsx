import React, { useState } from 'react';
import Input from '../../components/common/Input.jsx';
import Button from '../../components/common/Button.jsx';

const ForgotPasswordPage = () => {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
      {sent ? (
        <div className="alert alert-success mb-0">
          {email} adresine kayıtlı bir hesap varsa, şifre sıfırlama bağlantısını gönderdik.
        </div>
      ) : null}

      <Input
        id="reset-email"
        type="email"
        label="E-posta adresi"
        placeholder="kullanici@ornek.com"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <Button type="submit">Sıfırlama bağlantısı gönder</Button>
    </form>
  );
};

export default ForgotPasswordPage;

