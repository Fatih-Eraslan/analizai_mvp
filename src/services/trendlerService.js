import { mockFetch } from './api';

const trendlerVerileri = {
    beklentiler: [
        { baslik: 'Organik ürün çeşitliliği', oy: 156, trend: 'yukari', kategori: 'Ürün' },
        { baslik: 'Eve teslimat hizmeti', oy: 134, trend: 'yukari', kategori: 'Hizmet' },
        { baslik: 'Sadakat kartı / puan sistemi', oy: 112, trend: 'yukari', kategori: 'Kampanya' },
        { baslik: 'Online sipariş imkanı', oy: 98, trend: 'sabit', kategori: 'Hizmet' },
        { baslik: 'Daha uzun çalışma saatleri', oy: 87, trend: 'asagi', kategori: 'Hizmet' },
        { baslik: 'Gluten-free ürünler', oy: 64, trend: 'yukari', kategori: 'Ürün' },
    ],
    fiyatHassasiyeti: {
        skor: 78,
        seviye: 'Yüksek',
        aciklama: 'Mahallenizde fiyat hassasiyeti yüksek. Müşteriler fiyat karşılaştırması yapıyor.',
    },
    yogunSaatler: [
        { saat: '06-08', yogunluk: 15 },
        { saat: '08-10', yogunluk: 35 },
        { saat: '10-12', yogunluk: 55 },
        { saat: '12-14', yogunluk: 40 },
        { saat: '14-16', yogunluk: 30 },
        { saat: '16-18', yogunluk: 65 },
        { saat: '18-20', yogunluk: 90 },
        { saat: '20-22', yogunluk: 70 },
        { saat: '22-00', yogunluk: 25 },
    ],
    memnuniyetGrafik: [
        { ay: 'Kasım', skor: 72 },
        { ay: 'Aralık', skor: 68 },
        { ay: 'Ocak', skor: 74 },
    ],
};

export const getTrendlerVerileri = () => mockFetch(trendlerVerileri);
