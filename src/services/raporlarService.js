import { mockFetch } from './api';

const raporlar = [
    {
        id: 1,
        baslik: 'Haftalık Performans Raporu',
        tarih: '10 Şubat 2026',
        tur: 'Haftalık',
        durum: 'hazir',
        ozet: 'Genel performans skoru 74 → 76 yükseldi. Yorum sayısı %8 arttı.',
    },
    {
        id: 2,
        baslik: 'Aylık Rekabet Analizi',
        tarih: '1 Şubat 2026',
        tur: 'Aylık',
        durum: 'hazir',
        ozet: 'Mahallede 2 yeni rakip açıldı. Fiyat konumunuz ortalamada kaldı.',
    },
    {
        id: 3,
        baslik: 'Müşteri Memnuniyet Raporu',
        tarih: '25 Ocak 2026',
        tur: 'Aylık',
        durum: 'hazir',
        ozet: 'Pozitif yorum oranı %68. Kasa hızı ana şikayet konusu.',
    },
];

export const getRaporlar = () => mockFetch(raporlar);

export const raporIndir = (id) =>
    mockFetch({ basarili: true, mesaj: 'PDF rapor indirmeye hazır.' }, 1500);

export const raporMailGonder = (id) =>
    mockFetch({ basarili: true, mesaj: 'Rapor e-posta adresinize gönderildi.' }, 1200);
