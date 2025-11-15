import React, { useMemo, useState } from 'react';
import Input from '../components/common/Input.jsx';
import Button from '../components/common/Button.jsx';

const defaultPackage = () => ({ name: '', price: '', features: '' });

// Opsiyonel paketler (After Party, DJ vb.)
const defaultOpsiyonelPaket = () => ({ ad: '', fiyat: '', aciklama: '' });

const normalizePackages = (packages) =>
  packages.map((pkg) => ({
    ...pkg,
    features: Array.isArray(pkg.features) ? pkg.features.join(', ') : pkg.features ?? ''
  }));

const VenueForm = ({ initialValues, onSubmit, isSubmitting = false }) => {
  const [packages, setPackages] = useState(() => normalizePackages(initialValues?.packages ?? [defaultPackage()]));
  const [opsiyonelPaketler, setOpsiyonelPaketler] = useState(() => 
    initialValues?.opsiyonelPaketler?.map(op => ({
      ad: op.ad || op.name || '',
      fiyat: op.fiyat || op.price || '',
      aciklama: op.aciklama || op.description || ''
    })) || []
  );
  const [formData, setFormData] = useState(() => ({
    name: initialValues?.name ?? '',
    city: initialValues?.city ?? '',
    district: initialValues?.district ?? '',
    address: initialValues?.address ?? '',
    capacity: initialValues?.capacity ?? '',
    description: initialValues?.description ?? '',
    coverImage: initialValues?.coverImage ?? '',
    gallery: (initialValues?.gallery ?? []).join(', '),
    availableDates: (initialValues?.availableDates ?? []).join(', '),
    dugun_turu: initialValues?.dugun_turu ?? 'NORMAL',
    fiyat: initialValues?.fiyat ?? '',
    ana_foto_url: initialValues?.ana_foto_url ?? '',
    ana_foto_file: null, // Yüklenen dosya
    ana_foto_preview: null, // Önizleme URL'i
    gallery_files: [], // Galeri dosyaları
    gallery_previews: [] // Galeri önizlemeleri
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

  const handleOpsiyonelPaketChange = (index, field, value) => {
    setOpsiyonelPaketler((prev) => prev.map((op, idx) => (idx === index ? { ...op, [field]: value } : op)));
  };

  const addOpsiyonelPaket = () => {
    setOpsiyonelPaketler((prev) => [...prev, defaultOpsiyonelPaket()]);
  };

  const removeOpsiyonelPaket = (index) => {
    setOpsiyonelPaketler((prev) => prev.filter((_, idx) => idx !== index));
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

    // Opsiyonel paketleri hazırla
    const preparedOpsiyonelPaketler = opsiyonelPaketler
      .filter(op => op.ad && op.fiyat)
      .map(op => ({
        ad: op.ad,
        fiyat: Number(op.fiyat) || 0,
        aciklama: op.aciklama || ''
      }));

    const payload = {
      ...initialValues,
      ...formData,
      capacity: Number(formData.capacity) || 0,
      fiyat: Number(formData.fiyat) || 0,
      dugun_turu: formData.dugun_turu,
      ana_foto_url: formData.ana_foto_url || formData.coverImage,
      ana_foto_file: formData.ana_foto_file, // Dosya yükleme için
      gallery_files: formData.gallery_files || [], // Galeri dosyaları
      packages: preparedPackages,
      opsiyonelPaketler: preparedOpsiyonelPaketler,
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
            <div className="col-md-4">
              <label className="form-label fw-semibold">Düğün Türü *</label>
              <select
                className="form-select"
                value={formData.dugun_turu}
                onChange={(e) => setFormData(prev => ({ ...prev, dugun_turu: e.target.value }))}
                required
              >
                <option value="EN_LUX">En Lüks (Yemekli, kuruyemiş, içecekli)</option>
                <option value="ORTA">Orta (Kuruyemiş ve içecek)</option>
                <option value="NORMAL">Normal (Sadece kuruyemiş)</option>
              </select>
              <small className="text-muted">
                Düğün türünü seçin. Bu bilgi müşterilere gösterilecektir.
              </small>
            </div>
            <div className="col-md-4">
              <Input
                id="fiyat"
                name="fiyat"
                type="number"
                label="Fiyat (TL) *"
                placeholder="50000"
                value={formData.fiyat}
                onChange={handleChange}
                required
                min={0}
                step="0.01"
              />
              <small className="text-muted">
                Salonunuzun gece başına fiyatını girin.
              </small>
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
              <label className="form-label fw-semibold text-muted">
                Ana Salon Fotoğrafı *
              </label>
              <input
                type="file"
                id="ana_foto"
                name="ana_foto"
                className="form-control"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    // Dosya seçildi, formData'ya ekle
                    setFormData(prev => ({ ...prev, ana_foto_file: file }));
                    // Önizleme için URL oluştur
                    const previewUrl = URL.createObjectURL(file);
                    setFormData(prev => ({ ...prev, ana_foto_preview: previewUrl }));
                  }
                }}
                required={!initialValues}
              />
              {formData.ana_foto_preview && (
                <div className="mt-2">
                  <img 
                    src={formData.ana_foto_preview} 
                    alt="Önizleme" 
                    className="img-thumbnail"
                    style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                  />
                </div>
              )}
              {formData.ana_foto_url && !formData.ana_foto_preview && (
                <div className="mt-2">
                  <img 
                    src={formData.ana_foto_url} 
                    alt="Mevcut fotoğraf" 
                    className="img-thumbnail"
                    style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'cover' }}
                  />
                </div>
              )}
              <small className="text-muted d-block mt-1">
                Bu fotoğraf ilan kartında gösterilecektir. Maksimum 5MB, desteklenen formatlar: JPEG, PNG, GIF, WEBP
              </small>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold text-muted">
                Ek Görseller (İsteğe Bağlı)
              </label>
              <input
                type="file"
                id="gallery_files"
                name="gallery_files"
                className="form-control"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  if (files.length > 0) {
                    setFormData(prev => ({ ...prev, gallery_files: files }));
                    // Önizleme için URL'ler oluştur
                    const previewUrls = files.map(file => URL.createObjectURL(file));
                    setFormData(prev => ({ ...prev, gallery_previews: previewUrls }));
                  }
                }}
              />
              {formData.gallery_previews && formData.gallery_previews.length > 0 && (
                <div className="mt-2 d-flex gap-2 flex-wrap">
                  {formData.gallery_previews.map((preview, idx) => (
                    <img 
                      key={idx}
                      src={preview} 
                      alt={`Önizleme ${idx + 1}`} 
                      className="img-thumbnail"
                      style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                    />
                  ))}
                </div>
              )}
              <small className="text-muted d-block mt-1">
                Birden fazla görsel seçebilirsiniz. Maksimum 5MB/dosya
              </small>
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
          <h6 className="text-uppercase text-muted small mb-3">Opsiyonel Paketler (İsteğe Bağlı)</h6>
          <p className="text-muted small mb-3">
            Müşterilerin ekleyebileceği opsiyonel hizmetler (After Party, DJ, Fotoğrafçı vb.)
          </p>
          <div className="d-flex flex-column gap-3">
            {opsiyonelPaketler.map((op, index) => (
              <div key={index} className="border rounded-3 p-3 bg-light">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="mb-0 text-primary">Opsiyonel {index + 1}</h6>
                  <button 
                    type="button" 
                    className="btn btn-sm btn-outline-danger" 
                    onClick={() => removeOpsiyonelPaket(index)}
                  >
                    Sil
                  </button>
                </div>
                <div className="row g-3">
                  <div className="col-md-6">
                    <Input
                      id={`opsiyonel-ad-${index}`}
                      label="Hizmet Adı"
                      value={op.ad}
                      onChange={(event) => handleOpsiyonelPaketChange(index, 'ad', event.target.value)}
                      placeholder="After Party, DJ, Fotoğrafçı vb."
                    />
                  </div>
                  <div className="col-md-6">
                    <Input
                      id={`opsiyonel-fiyat-${index}`}
                      label="Ek Fiyat (TL)"
                      type="number"
                      value={op.fiyat}
                      onChange={(event) => handleOpsiyonelPaketChange(index, 'fiyat', event.target.value)}
                      placeholder="5000"
                      min={0}
                    />
                  </div>
                  <div className="col-12">
                    <Input
                      id={`opsiyonel-aciklama-${index}`}
                      label="Açıklama"
                      as="textarea"
                      rows={2}
                      value={op.aciklama}
                      onChange={(event) => handleOpsiyonelPaketChange(index, 'aciklama', event.target.value)}
                      placeholder="Hizmet hakkında kısa açıklama"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addOpsiyonelPaket}>
              Opsiyonel Paket Ekle
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

