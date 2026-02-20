import { mockFetch } from './api';

const fiyatVerileri = [
    {
        urun: '1L Süt',
        seninFiyat: 42.5,
        mahalleOrtalama: 44.2,
        enUcuz: 38.0,
        enPahali: 52.0,
        konum: 32,
    },
    {
        urun: '5kg Şeker',
        seninFiyat: 189.9,
        mahalleOrtalama: 178.5,
        enUcuz: 165.0,
        enPahali: 210.0,
        konum: 72,
    },
    {
        urun: 'Ekmek',
        seninFiyat: 10.0,
        mahalleOrtalama: 10.0,
        enUcuz: 8.0,
        enPahali: 12.0,
        konum: 50,
    },
    {
        urun: '1.5L Su',
        seninFiyat: 12.5,
        mahalleOrtalama: 14.0,
        enUcuz: 10.0,
        enPahali: 18.0,
        konum: 25,
    },
    {
        urun: 'Gazlı İçecek',
        seninFiyat: 35.0,
        mahalleOrtalama: 32.5,
        enUcuz: 28.0,
        enPahali: 40.0,
        konum: 68,
    },
];

export const getFiyatVerileri = () => mockFetch(fiyatVerileri);
