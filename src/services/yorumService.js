import { mockFetch } from './api';

const yorumVerileri = {
    dagitim: { pozitif: 68, notr: 18, negatif: 14 },
    toplamYorum: 247,
    sikKelimeler: [
        { kelime: 'uygun fiyat', sayi: 34, tip: 'pozitif' },
        { kelime: 'taze ürün', sayi: 28, tip: 'pozitif' },
        { kelime: 'güler yüzlü', sayi: 22, tip: 'pozitif' },
        { kelime: 'temiz', sayi: 19, tip: 'pozitif' },
        { kelime: 'kasa kuyruğu', sayi: 16, tip: 'negatif' },
        { kelime: 'pahalı', sayi: 14, tip: 'negatif' },
        { kelime: 'eski ürün', sayi: 11, tip: 'negatif' },
        { kelime: 'hızlı hizmet', sayi: 18, tip: 'pozitif' },
        { kelime: 'park sorunu', sayi: 9, tip: 'negatif' },
        { kelime: 'çeşitlilik', sayi: 15, tip: 'pozitif' },
    ],
    negatifTrend: {
        uyari: true,
        mesaj: 'Son 7 günde negatif yorum oranı %8 arttı. Ana şikayet konusu: kasa bekleme süresi.',
        oncekiHafta: 10,
        buHafta: 18,
    },
    aiOzet:
        `Genel yorum analizi olumlu yönde seyretmekle birlikte, son dönemde kasa bekleme sürelerine ilişkin şikayetlerde dikkat çekici bir artış gözlemlenmektedir. Müşterilerinizin %68'i işletmenizi olumlu değerlendirirken, fiyat-performans dengesi en çok öne çıkan avantajınız olarak belirlenmiştir. Öte yandan, yoğun saatlerde (17:00–19:00 arası) kasa hızının iyileştirilmesi, memnuniyet oranını tahmini %12 artırabilir. Organik ürün talebinin mahallede yükselmesiyle birlikte, bu segmentte ürün çeşitliliğini artırmanız rekabet avantajı sağlayacaktır.`,
};

export const getYorumVerileri = () => mockFetch(yorumVerileri, 1100);
