import { mockFetch } from './api';

const planlar = [
    {
        id: 'basic',
        isim: 'Basic',
        fiyat: 299,
        renk: 'green',
        emoji: '🟢',
        ozellikler: [
            { isim: 'Rakip takibi', dahil: true, limit: '3 rakip' },
            { isim: 'Fiyat analizi', dahil: true, limit: '5 ürün' },
            { isim: 'Yorum analizi', dahil: true, limit: 'Haftalık' },
            { isim: 'Mahalle trendleri', dahil: false },
            { isim: 'Kampanya önerileri', dahil: false },
            { isim: 'PDF rapor', dahil: false },
            { isim: 'E-posta rapor gönderimi', dahil: false },
            { isim: 'Öncelikli destek', dahil: false },
        ],
    },
    {
        id: 'pro',
        isim: 'Pro',
        fiyat: 599,
        renk: 'blue',
        emoji: '🔵',
        ozellikler: [
            { isim: 'Rakip takibi', dahil: true, limit: '10 rakip' },
            { isim: 'Fiyat analizi', dahil: true, limit: '20 ürün' },
            { isim: 'Yorum analizi', dahil: true, limit: 'Günlük' },
            { isim: 'Mahalle trendleri', dahil: true },
            { isim: 'Kampanya önerileri', dahil: true, limit: '3 öneri/ay' },
            { isim: 'PDF rapor', dahil: true },
            { isim: 'E-posta rapor gönderimi', dahil: false },
            { isim: 'Öncelikli destek', dahil: false },
        ],
    },
    {
        id: 'premium',
        isim: 'Premium',
        fiyat: 999,
        renk: 'purple',
        emoji: '🟣',
        one_cikan: true,
        ozellikler: [
            { isim: 'Rakip takibi', dahil: true, limit: 'Sınırsız' },
            { isim: 'Fiyat analizi', dahil: true, limit: 'Sınırsız' },
            { isim: 'Yorum analizi', dahil: true, limit: 'Anlık' },
            { isim: 'Mahalle trendleri', dahil: true },
            { isim: 'Kampanya önerileri', dahil: true, limit: 'Sınırsız' },
            { isim: 'PDF rapor', dahil: true },
            { isim: 'E-posta rapor gönderimi', dahil: true },
            { isim: 'Öncelikli destek', dahil: true },
        ],
    },
];

export const getPlanlar = () => mockFetch(planlar);

export const planSec = (planId) =>
    mockFetch({ basarili: true, mesaj: `${planId} planı seçildi!` }, 800);
