import React, { useMemo, useState } from 'react';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';

const defaultPackage = () => ({ name: '', price: '', features: '' });

const normalizePackages = (packages) =>
  packages.map((pkg) => ({
    ...pkg,
    features: Array.isArray(pkg.features) ? pkg.features.join(', ') : pkg.features ?? ''
  }));

const VenueForm = ({ initialValues, onSubmit, isSubmitting = false }) => {
  const [packages, setPackages] = useState(() => normalizePackages(initialValues?.packages ?? [defaultPackage()]));
  const [formData, setFormData] = useState(() => ({
    name: initialValues?.name ?? '',
    city: initialValues?.city ?? '',
    district: initialValues?.district ?? '',
    address: initialValues?.address ?? '',
    capacity: initialValues?.capacity ?? '',
    description: initialValues?.description ?? '',
    coverImage: initialValues?.coverImage ?? '',
    gallery: (initialValues?.gallery ?? []).join(', '),
    availableDates: (initialValues?.availableDates ?? []).join(', ')
  }));
  const [error, setError] = useState(null);

  const packageCount = useMemo(() => packages.length, [packages]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePackageChange = (index, field, value) => {
    setPackages((prev) => prev.map((pkg, idx) => (idx === index ? { ...pkg, [field]: value } : pkg)));
  };

  const addPackage = () => {
    setPackages((prev) => [...prev, defaultPackage()]);
  };

  const removePackage = (index) => {
    setPackages((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    if (!packages.length) {
      setError('En az bir paket seçeneği eklemelisiniz.');
      return;
    }

    const preparedPackages = packages.map((pkg, idx) => ({
      id: pkg.id ?? `pkg-${idx + 1}`,
      name: pkg.name,
      price: Number(pkg.price) || 0,
      features: pkg.features
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    }));

    const payload = {
      ...initialValues,
      ...formData,
      capacity: Number(formData.capacity) || 0,
      packages: preparedPackages,
      availableDates: formData.availableDates
        .split(',')
        .map((date) => date.trim())
        .filter(Boolean),
      gallery: formData.gallery
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    };

    onSubmit?.(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="card border-0 shadow-sm">
      <div className="card-body p-4 p-md-5 d-flex flex-column gap-4">
        {error ? <div className="alert alert-danger mb-0">{error}</div> : null}

        <section>
          <h6 className="text-uppercase text-muted small mb-3">Salon bilgileri</h6>
          <div className="row g-3">
            <div className="col-md-6">
              <Input
                id="name"
                name="name"
                label="Salon adı"
                placeholder="Örnek Düğün Salonu"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <Input
                id="city"
                name="city"
                label="Şehir"
                placeholder="İstanbul"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-3">
              <Input
                id="district"
                name="district"
                label="İlçe"
                placeholder="Beşiktaş"
                value={formData.district}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12">
              <Input
                id="address"
                name="address"
                label="Adres"
                placeholder="Sokak, kapı numarası, kat bilgisi"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <Input
                id="capacity"
                name="capacity"
                type="number"
                label="Kapasite"
                placeholder="250"
                value={formData.capacity}
                onChange={handleChange}
                required
                min={0}
              />
            </div>
            <div className="col-12">
              <Input
                id="description"
                name="description"
                label="Açıklama"
                as="textarea"
                rows={4}
                placeholder="Salonunuzun sunduğu deneyimi anlatın"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </section>

        <section>
          <h6 className="text-uppercase text-muted small mb-3">Görseller</h6>
          <div className="row g-3">
            <div className="col-md-6">
              <Input
                id="coverImage"
                name="coverImage"
                label="Kapak görseli (URL)"
                placeholder="https://..."
                value={formData.coverImage}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <Input
                id="gallery"
                name="gallery"
                label="Galeri görselleri"
                placeholder="Virgülle ayırarak görsel linkleri girin"
                value={formData.gallery}
                onChange={handleChange}
              />
            </div>
          </div>
        </section>

        <section>
          <h6 className="text-uppercase text-muted small mb-3">Paketler ({packageCount})</h6>
          <div className="d-flex flex-column gap-3">
            {packages.map((pkg, index) => (
              <div key={index} className="border rounded-3 p-3 bg-light">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0 text-primary">Paket {index + 1}</h6>
                  {packages.length > 1 ? (
                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removePackage(index)}>
                      Sil
                    </button>
                  ) : null}
                </div>
                <div className="row g-3">
                  <div className="col-md-4">
                    <Input
                      id={`package-name-${index}`}
                      label="Ad"
                      value={pkg.name}
                      onChange={(event) => handlePackageChange(index, 'name', event.target.value)}
                      placeholder="Premium"
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <Input
                      id={`package-price-${index}`}
                      label="Fiyat (TRY)"
                      type="number"
                      value={pkg.price}
                      onChange={(event) => handlePackageChange(index, 'price', event.target.value)}
                      placeholder="75000"
                      required
                      min={0}
                    />
                  </div>
                  <div className="col-12">
                    <Input
                      id={`package-features-${index}`}
                      label="Öne çıkanlar"
                      as="textarea"
                      rows={2}
                      value={pkg.features}
                      onChange={(event) => handlePackageChange(index, 'features', event.target.value)}
                      placeholder="DJ performansı, karşılama kokteyli, havai fişek"
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addPackage}>
              Paket ekle
            </Button>
          </div>
        </section>

        <section>
          <h6 className="text-uppercase text-muted small mb-3">Müsaitlik</h6>
          <Input
            id="availableDates"
            name="availableDates"
            label="Müsait tarihler"
            placeholder="2025-11-15, 2025-11-22"
            value={formData.availableDates}
            onChange={handleChange}
            helperText="Birden fazla tarihi virgül ile ayırın (YYYY-AA-GG)."
          />
        </section>

        <div className="d-flex justify-content-end gap-2">
          <Button type="submit" isLoading={isSubmitting}>
            {initialValues ? 'Salonu güncelle' : 'Salon oluştur'}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default VenueForm;

