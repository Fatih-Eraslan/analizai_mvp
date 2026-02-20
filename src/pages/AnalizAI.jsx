import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Trash2, Sparkles } from 'lucide-react';
import './AnalizAI.css';

/* ─── Mock AI response engine ─── */
const responseMap = [
    {
        keywords: ['fiyat', 'ücret', 'pahalı', 'ucuz', 'indirim', 'maliyet'],
        responses: [
            'Mevcut fiyat konumunuz mahalle ortalamasının %7 üzerinde görünüyor. Bu durum fiyat hassasiyeti yüksek müşterilerde kayba neden olabilir. Belirli ürünlerde mikro indirim stratejisi öneriyorum.',
            'Fiyat analizi verilerine göre, süt ve ekmek kategorisinde en düşük 3. sıradasınız — bu olumlu. Ancak atıştırmalık segmentinde ortalamanın %12 üstündesiniz. Haftalık "Atıştırmalık Cuma" kampanyası ile bu farkı kapatabilirsiniz.',
            'Fiyatlandırma stratejinizi dinamik hale getirmenizi öneriyorum. Yoğun saatlerde (17:00–20:00) temel ürünlerde %5 indirim, düşük trafikli saatlerde ise marjı koruma yaklaşımı gelir optimizasyonu sağlayabilir.',
        ],
    },
    {
        keywords: ['rakip', 'rakipler', 'rakibe', 'rekabet', 'yarış', 'karşı'],
        responses: [
            'En yakın rakibiniz "Güneş Market" son 30 günde Google yorumlarında 4.2 → 4.5 puana yükseldi. Özellikle "temizlik" ve "ürün çeşitliliği" kategorilerinde öne çıkıyor. Bu alanlarda iyileştirme yapmanız rekabet gücünüzü artıracaktır.',
            'Mahallenizdeki 12 rakip arasında müşteri memnuniyetinde 5. sıradasınız. Lider konumdaki rakiplerin ortak özelliği: hızlı kasa, geniş otopark ve sadakat programı. Sadakat kartı uygulaması başlatmanızı öneriyorum.',
            'Rakip analizi sonucuna göre, "ŞOK Market" ve "A101" fiyat liderliği yapıyor ancak hizmet kalitesinde düşük puan alıyor. Sizin güçlü yanınız kişisel hizmet — bu avantajı "Komşu Bakkal" konseptiyle pazarlayabilirsiniz.',
        ],
    },
    {
        keywords: ['yorum', 'değerlendirme', 'puan', 'yıldız', 'şikayet', 'memnuniyet'],
        responses: [
            'Son 30 günlük yorum analizinize göre müşterilerinizin %68\'i olumlu değerlendirme bırakmış. En sık tekrarlanan olumsuz tema: "kasa bekleme süresi". Yoğun saatlerde ikinci kasa açılması memnuniyeti tahmini %15 artırabilir.',
            'Yorum trendleriniz genel olarak pozitif seyrediyör. Ancak "taze meyve-sebze" kategorisinde son haftalarda artan şikayetler dikkat çekiyor. Tedarikçi değişikliği veya günlük teslimat planlaması düşünebilirsiniz.',
            'Google Haritalar yorumlarınızda en çok öne çıkan olumlu kelimeler: "güler yüzlü", "temiz", "uygun fiyat". Bu 3 özelliği dijital pazarlama materyallerinizde aktif kullanmanızı öneriyorum.',
        ],
    },
    {
        keywords: ['kampanya', 'promosyon', 'teklif', 'etkinlik', 'reklam'],
        responses: [
            'Mahalle verilerine göre Cuma akşamları en yüksek trafik zamanınız. "Cuma Sepeti" kampanyası ile 3 ürün alana 1 bedava formatında bir kampanya, sepet ortalamanızı %22 artırabilir.',
            'Rakiplerinizin çoğu henüz WhatsApp üzerinden kampanya bildirimi yapmıyor. Müşteri veritabanınız üzerinden haftalık WhatsApp kampanya mesajı göndermek, düşük maliyetle yüksek geri dönüş sağlayabilir.',
            'Saat bazlı analiz sonucuna göre 14:00–16:00 arası en düşük müşteri trafiğiniz. Bu saatlere özel "Öğleden Sonra İndirimi" kampanyası ile boş saatleri değerlendirebilirsiniz.',
        ],
    },
];

const defaultResponses = [
    'İşletmenizin genel performansı mahalle ortalamasının üzerinde seyretmektedir. Sürdürülebilir büyüme için müşteri sadakat programı ve dijital pazarlama stratejisini güçlendirmenizi öneriyorum.',
    'Verilerinizi incelediğimde en büyük fırsatın organik ve sağlıklı ürün segmentinde olduğunu görüyorum. Bu kategoride ürün çeşitliliğini artırmanız, mahallenizdeki artan talebi karşılamanıza yardımcı olacaktır.',
    'İşletme optimizasyonu için 3 öncelikli adım öneriyorum: 1) Kasa hızını iyileştirme, 2) Müşteri geri bildirimlerine proaktif yanıt verme, 3) Sosyal medya varlığını güçlendirme.',
    'Mevcut durumunuza göre, aylık ciro hedefinize ulaşmak için günlük ortalama müşteri sayınızı %8 artırmanız gerekiyor. Bunun için mahalle etkinlikleriyle entegre olmanız etkili bir strateji olabilir.',
];

function getAIResponse(message) {
    const lower = message.toLowerCase();
    for (const group of responseMap) {
        if (group.keywords.some((kw) => lower.includes(kw))) {
            return group.responses[Math.floor(Math.random() * group.responses.length)];
        }
    }
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function formatTime() {
    return new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

/* ─── Quick suggestion buttons ─── */
const quickSuggestions = [
    'Fiyat stratejimi analiz et',
    'Rakiplerim neden daha iyi puan alıyor?',
    'Bugün kampanya yapmalı mıyım?',
];

/* ─── Component ─── */
const AnalizAI = () => {
    const [messages, setMessages] = useState([
        {
            role: 'ai',
            text: 'Merhaba! Ben AnalizAI, işletmeniz için akıllı analiz asistanınızım. Fiyatlar, rakipler, müşteri yorumları veya kampanyalar hakkında bana soru sorabilirsiniz.',
            time: formatTime(),
        },
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, typing]);

    const sendMessage = async (text) => {
        const trimmed = (text || input).trim();
        if (!trimmed || typing) return;

        const userMsg = { role: 'user', text: trimmed, time: formatTime() };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setTyping(true);

        const delay = 1000 + Math.random() * 500;
        await new Promise((r) => setTimeout(r, delay));

        const aiMsg = { role: 'ai', text: getAIResponse(trimmed), time: formatTime() };
        setMessages((prev) => [...prev, aiMsg]);
        setTyping(false);
        inputRef.current?.focus();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const clearChat = () => {
        setMessages([
            {
                role: 'ai',
                text: 'Sohbet temizlendi. Size nasıl yardımcı olabilirim?',
                time: formatTime(),
            },
        ]);
    };

    return (
        <div className="aai-page">
            {/* Header */}
            <div className="aai-header">
                <div className="aai-header-left">
                    <div className="aai-header-icon">
                        <Bot size={24} />
                    </div>
                    <div>
                        <h1 className="aai-title">AnalizAI</h1>
                        <p className="aai-subtitle">İşletmeniz için akıllı analiz asistanı</p>
                    </div>
                </div>
                <button className="aai-clear-btn" onClick={clearChat} title="Sohbeti Temizle">
                    <Trash2 size={16} /> <span>Sohbeti Temizle</span>
                </button>
            </div>

            {/* Chat area */}
            <div className="aai-chat">
                {messages.map((msg, i) => (
                    <div key={i} className={`aai-msg aai-msg-${msg.role}`}>
                        {msg.role === 'ai' && (
                            <div className="aai-avatar">
                                <Bot size={16} />
                            </div>
                        )}
                        <div className="aai-bubble">
                            <p>{msg.text}</p>
                            <span className="aai-time">{msg.time}</span>
                        </div>
                    </div>
                ))}

                {typing && (
                    <div className="aai-msg aai-msg-ai">
                        <div className="aai-avatar">
                            <Bot size={16} />
                        </div>
                        <div className="aai-bubble aai-typing">
                            <span className="aai-dot" />
                            <span className="aai-dot" />
                            <span className="aai-dot" />
                        </div>
                    </div>
                )}

                <div ref={chatEndRef} />
            </div>

            {/* Quick suggestions */}
            {messages.length <= 1 && !typing && (
                <div className="aai-suggestions">
                    {quickSuggestions.map((s, i) => (
                        <button key={i} className="aai-suggestion-btn" onClick={() => sendMessage(s)}>
                            <Sparkles size={14} /> {s}
                        </button>
                    ))}
                </div>
            )}

            {/* Input */}
            <div className="aai-input-bar">
                <input
                    ref={inputRef}
                    type="text"
                    className="aai-input"
                    placeholder="Bir soru yazın..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={typing}
                />
                <button className="aai-send-btn" onClick={() => sendMessage()} disabled={typing || !input.trim()}>
                    <Send size={18} />
                </button>
            </div>
        </div>
    );
};

export default AnalizAI;
