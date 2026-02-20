import { mockFetch } from './api';

const dashboardData = {
    performans: {
        skor: 74,
        degisim: +3.2,
        oncekiAy: 71,
    },
    rakipKonum: {
        seviye: 'Ortalama',
        aciklama: 'Mahallenizdeki 12 rakibe göre fiyatlarınız ortalama seviyede.',
        rakipSayisi: 12,
        ucuzYuzdesi: 35,
        pahaliYuzdesi: 25,
        ortalamaYuzdesi: 40,
    },
    yorumTrend: [
        { gun: '1 Oca', pozitif: 12, negatif: 3 },
        { gun: '5 Oca', pozitif: 15, negatif: 2 },
        { gun: '10 Oca', pozitif: 18, negatif: 5 },
        { gun: '15 Oca', pozitif: 14, negatif: 4 },
        { gun: '20 Oca', pozitif: 22, negatif: 3 },
        { gun: '25 Oca', pozitif: 19, negatif: 6 },
        { gun: '30 Oca', pozitif: 25, negatif: 4 },
    ],
    mahalleTalep: [
        { baslik: 'Organik Ürünler', talep: 85, trend: 'yukari' },
        { baslik: 'Hızlı Teslimat', talep: 72, trend: 'yukari' },
        { baslik: 'Uygun Fiyat', talep: 91, trend: 'sabit' },
        { baslik: 'Gece Açık Olma', talep: 58, trend: 'asagi' },
    ],
    kritikUyari: {
        baslik: 'Fiyat Uyarısı',
        mesaj: 'Rakibiniz "Güneş Market" süt fiyatını %12 düşürdü. Mahalle ortalamasının altına indiniz.',
        seviye: 'yuksek',
        tarih: '2 saat önce',
    },
};

export const getDashboardData = () => mockFetch(dashboardData);
