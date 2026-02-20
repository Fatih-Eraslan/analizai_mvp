import { mockFetch } from './api';

const kampanyalar = [
    {
        id: 1,
        baslik: 'Sadakat Kartı Programı',
        aciklama: 'Her 100₺ alışverişe 10 puan kazandırın. 500 puan = 50₺ indirim. Müşteri bağlılığını %35 artırır.',
        etkiSeviyesi: 'yuksek',
        kazancArtisi: 18,
        kategori: 'Müşteri Bağlılığı',
        sure: '3 ay',
    },
    {
        id: 2,
        baslik: 'Sabah İndirimi (06:00–09:00)',
        aciklama: 'Sabah saatlerinde seçili ürünlerde %15 indirim. Yoğun olmayan saatlerde müşteri çekimi sağlar.',
        etkiSeviyesi: 'orta',
        kazancArtisi: 12,
        kategori: 'Fiyatlandırma',
        sure: '1 ay',
    },
    {
        id: 3,
        baslik: 'Organik Ürün Köşesi',
        aciklama: 'Mahallede artan organik talebe yönelik özel reyonu açın. Rakiplerden farklılaşma sağlar.',
        etkiSeviyesi: 'yuksek',
        kazancArtisi: 25,
        kategori: 'Ürün Stratejisi',
        sure: '2 hafta',
    },
    {
        id: 4,
        baslik: 'WhatsApp Sipariş Hattı',
        aciklama: 'WhatsApp üzerinden sipariş alın. Eve teslimat beklentisine düşük maliyetle yanıt verin.',
        etkiSeviyesi: 'orta',
        kazancArtisi: 15,
        kategori: 'Dijital Kanal',
        sure: '1 hafta',
    },
    {
        id: 5,
        baslik: 'Haftalık Broşür Kampanyası',
        aciklama: 'Her Pazartesi 5 üründe özel fiyat duyurusu. Mahalle WhatsApp gruplarında paylaşım.',
        etkiSeviyesi: 'dusuk',
        kazancArtisi: 8,
        kategori: 'Pazarlama',
        sure: 'Sürekli',
    },
];

export const getKampanyalar = () => mockFetch(kampanyalar);
