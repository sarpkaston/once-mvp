# ONCE — Ürün Stratejisi ve Teknik Tasarım Dokümanı

**Slogan:** "Today only happens once." · "Bir fotoğraf. Bir an. Bir yıl sonra."

## 0. Marka Kimliği (Resmi, Değiştirilemez)

Logo, ürünün resmi ve kesin marka kimliğidir. Bu doküman ve tüm UI bu kimliğe uyarlanır.

- **Sembol**: Kum saati formu, üstte mühürlü zarf/mektup siluetiyle birleşmiş — "zamanın geçişi" ve "mühürlü anı" metaforlarının tek bir işarette birleşimi. Çift üçgen simetrik form, ince çizgi ağırlığı, keskin köşeler.
- **App icon**: Yalnızca bu semboldür. Wordmark veya slogan içermez.
- **Wordmark**: Yalnızca "ONCE" — geniş harf aralıklı (tracking), ince ağırlıklı sans-serif. Alt slogan ("THE ANNUAL TIME CAPSULE" vb.) wordmark ile birlikte KULLANILMAZ.
- **Logo rengi**: Koyu gri-lacivert (`#3A4148` civarı çizgi rengi) açık zeminde; koyu zeminde kırık beyaz (`#F4F1EA`) versiyonu kullanılır.

### 0.1 Logo kullanım kuralları (kesin)

Resmi sembol — kum saati ikonu, asla emoji (⌛ vb.) veya yer tutucu değil — şu ekranlarda tutarlı biçimde kullanılır:

✓ Açılış ritüeli ekranları (bkz. 3.3.1)
✓ Open Your Year
✓ "This was your 2026" bitiş ekranı
✓ Ana Ekran
✓ Wrapped paylaşım kartları

Her kullanımda:
- **Küçük**: ekranın görsel odağı asla logo olmaz.
- **Sakin**: %50-70 opaklık — tam opak, dikkat çekici bir logo değil, sayfanın dokusuna karışan bir iz.
- **Asla baskın değil**: en büyük, en kontrastlı veya en üstte duran eleman logo olmamalı.
- **Asla dekoratif değil**: süsleme amacıyla tekrar tekrar veya büyütülerek kullanılmaz.
- İmza gibi hissettirmeli, reklam gibi değil.

**İstisna (kesin):** Logo hiçbir koşulda gerçek anı fotoğraflarının üzerine yerleştirilmez. Anının kendisi kutsal ve kesintisiz kalmalıdır — fotoğraf sunumu ekranlarında (bkz. 3.3.5) logo yer almaz.

---

## 1. Ürün Stratejisi

### 1.1 Konumlandırma

ONCE bir sosyal medya uygulaması değil, bir günlük uygulaması da değil. **"Gecikmiş hatırlama" ürünü** — şu anki anı kaydetmek değil, gelecekteki kendinle bir buluşma randevusu kurmak. Rakipler (BeReal, Locket, Snapchat Memories) "şimdi paylaş" odaklıyken, ONCE'ın tüm değeri **gecikme ve toplu açılış** üzerine kurulu. Bu, üründe taklit edilmesi zor tek bir mekanik fark yaratıyor: **kolektif 31 Aralık anı.**

Konumlandırma cümlesi: *"Instagram anı paylaştırır, ONCE anıyı saklar ve sana geri verir."*

### 1.2 Hedef kitle

- Birincil: 18-32 yaş, "dijital detoks" ve "sosyal medya yorgunluğu" hisseden, ama yine de telefonunda bir ritüele yer açabilecek kullanıcılar.
- İkincil (V2 potansiyeli): Çiftler, yakın arkadaş grupları — ortak kapsül fikri hayata geçerse doğal bir viral kanal olabilir (bkz. Bölüm 8).
- Türkiye lansmanı için: Yılbaşı kültürel olarak zaten güçlü bir "yıl değerlendirme" anı — bu, Aralık ayında organik bir pazarlama penceresi yaratır.

### 1.3 Farklılaşma ekseni

| Eksen | ONCE | BeReal | Snapchat Memories | Klasik günlük app |
|---|---|---|---|---|
| Görme zamanı | Sadece 31 Aralık | Anında | İstendiğinde | İstendiğinde |
| Sosyallik | Yok (V1) | Zorunlu feed | Zorunlu feed | Yok |
| Düzenlenebilirlik | Yok (kalıcı, dokunulmaz) | Var | Var | Var |
| Duygusal anı | Yıllık doruk anı | Günlük gürültü | Arşiv | Günlük yük |

### 1.4 Başarı metrikleri (yıl 1)

- D1/D7 retention yerine **"kapsül tamamlama oranı"** birincil metrik: kullanıcı 31 Aralık'a kadar uygulamada kalıyor mu.
- 31 Aralık gece yarısı eşzamanlı açılış oranı (kaç kullanıcı o gece kapsülünü açıyor) — bu viral/PR metriği.
- Wrapped paylaşım kartı paylaşım oranı (Instagram Story'e ekleme oranı) — organik büyüme metriği.
- Yıl Görünümü'ne dönüş sıklığı (31 Aralık sonrası kalıcı arşivin gerçekten kullanılıp kullanılmadığı).

---

## 2. MVP Kapsamı

### Dahil (V1) — yalnızca bunlar

1. Apple ile Giriş (tek auth yöntemi, V1'de telefon no. yedeği yok)
2. Bildirim izni (onboarding'in tek diğer adımı)
3. Günlük rastgele bildirim sistemi (ağırlıklı dağılım, sunucu taraflı)
4. Kamera (otomatik açılır, zorunlu tek kare)
5. Tekrar çek (kapsüle gönderilene kadar sınırsız)
6. Tek cümle not (opsiyonel)
7. Duygu emojisi (opsiyonel)
8. Konum (opsiyonel, varsayılan kapalı — bkz. 3.1.1)
9. 30 saniyelik geri al penceresi
10. Streak göstergesi (baskısız ton)
11. Wrapped (ücretsiz istatistik özeti, paylaşıma hazır)
12. Open Your Year (sinematik galeri)
13. Yıl Görünümü (kalıcı takvim arşivi, yalnızca açılmış yıllar için — bkz. 3.6)
14. "1 yıl önce bugün" hatırlatmaları (yalnızca açılmış kapsüllerden)
15. Türkçe + İngilizce lokalizasyon (sistem dilinden otomatik algılanır, onboarding'de ayrı bir adım değildir)

V1'in tek görevi: **Bildirim → Fotoğraf → Kilit → 31 Aralık açılışı** döngüsünü mükemmel hale getirmek.

### V1'e kesinlikle dahil değil

- Ortak/paylaşımlı kapsüller
- Fiziksel albüm sipariş akışı
- AI yıl sonu mektubu
- Premium üyelik / premium hatıra paketleri
- Arkadaş sistemi / sosyal özellikler

Bu liste V1 için kapanmıştır — yukarıdakilerin hiçbiri V1'e başka bir gerekçeyle de olsa eklenmemelidir.

---

## 3. Kullanıcı Akışları

### 3.1 İlk kurulum

Onboarding maksimum sadelikte tutulur — isim/takma ad istenmez, dil sistem ayarından otomatik algılanır.

```
Açılış → Apple ile Giriş → Bildirim izni iste (neden gerektiğini tek cümleyle açıkla) → Bitti.
→ Ana ekran (boş durum: "İlk anın seni bekliyor")
```

Konum izni onboarding'de İSTENMEZ (bkz. 3.1.1). İlk deneyimde sürtünme asgariye indirilir: iki adım, iki dokunuş.

### 3.1.1 Konum: varsayılan kapalı

Konum hiçbir zaman varsayılan olarak açık gelmez ve onboarding'de istenmez. Yalnızca her gönderim anında, opsiyonel ekleme ekranında sorulur:

> 📍 Bu anının nerede yaşandığını da saklamak ister misin?

Varsayılan cevap her zaman **hayır**dır (toggle kapalı gelir, kullanıcı bilinçli olarak açar). Mahremiyet ürünün temel değerlerinden biridir — konum verisi asla arka planda, sessizce toplanmaz.

### 3.2 Günlük çekim ritüeli

Bu deneyim kullanıcı tarafından yılda 365 kez yaşanır — bu yüzden 31 Aralık töreniyle aynı duygusal dili taşımalıdır: sakin, ritüelistik, minimal. Hiçbir adımda agresif dil, uyarı tonu veya kutlama animasyonu yoktur.

```
[Sunucu] Rastgele saat hesaplanır (ağırlıklı dağılım: 08-22 → %85, 22-02 → %10, 02-08 → %5)
→ Push bildirim (rotasyonlu havuzdan, bkz. 5.4.1)
→ Kullanıcı bildirime dokunur → Kamera anında açılır (bkz. 3.2.1)
→ Fotoğraf çekilir → Önizleme ekranı (bkz. 3.2.2)
→ Retake istenildiği kadar tekrarlanabilir, Continue'a kadar serbest
→ Continue → Opsiyonel ekleme ekranı (bkz. 3.2.3)
→ SEAL MEMORY → Mühürleme animasyonu (bkz. 3.2.4)
→ 30 saniyelik Undo durumu (bkz. 3.2.5)
→ Pencere kapanınca tamamen mühürlenir, 31 Aralık'a kadar (bkz. 3.2.6)
→ Ana ekrana dön: gün noktası dolar, streak güncellenir
```

### 3.2.1 Kamera

Bildirime dokunulduğu anda kamera doğrudan açılır — galeri seçimi, izin tekrar sorma veya ara ekran yoktur. Sürtünme sıfıra yakındır.

### 3.2.2 Önizleme ekranı

```
[fotoğraf önizlemesi]

Retake          Continue
```

İki seçenek eşit görsel ağırlıkta, sade metin butonlar (dolu/parlak CTA değil). Retake sınırsız tekrarlanabilir.

### 3.2.3 Opsiyonel ekleme ekranı

```
One sentence (opsiyonel)

One feeling (opsiyonel)

Location (varsayılan kapalı)

SEAL MEMORY
```

Konum toggle'ı her zaman kapalı gelir (bkz. 3.1.1). Üç alan da atlanabilir; kullanıcı hiçbirini doldurmadan doğrudan "Seal Memory"ye geçebilir.

### 3.2.4 Mühürleme animasyonu

"Seal Memory"ye dokunulduğunda fotoğraf yavaşça aşağı, kapsüle doğru düşer — hızlı bir kapanma veya parlama efekti değil, yavaş ve ağırlıklı bir hareket. Kutlama animasyonu (konfeti, parıltı, ses efekti) kullanılmaz.

### 3.2.5 30 saniyelik Undo durumu

```
This moment is now waiting for you.

Undo (29)
```

Sayaç sakin, küçük punto, dikkat çekmeyen bir konumda geri sayar. "Undo" kelimesi yanında kalan saniye parantez içinde, alarm hissi vermeyen bir biçimde gösterilir.

### 3.2.6 Pencere kapanışı

```
See you on December 31.
```

30 saniye dolduğunda ekranda yalnızca bu tek cümle belirir, birkaç saniye kalır, sonra ana ekrana dönülür. Uyarı yoktur, kutlama yoktur — yalnızca sakin bir kapanış cümlesi.

**Kilit kuralları (kesin):**
- Fotoğrafı çekmeden gün tamamlanmış sayılmaz.
- "Retake" ile sınırsız tekrar çekim serbesttir, "Continue"a kadar.
- "Seal Memory" anından itibaren **30 saniyelik Undo penceresi** açılır — bu süre içinde kullanıcı yanlış yüklemeyi geri alabilir (ekranda küçük, baskıcı olmayan bir geri al göstergesi/sayaç belirir).
- 30 saniye dolduğunda anı kalıcı olarak mühürlenir: düzenlenemez, silinemez, görüntülenemez, indirilemez, paylaşılamaz. Ta ki 31 Aralık 00:00'a kadar.

Kritik tasarım kararı: Kullanıcı bildirimi kaçırırsa, gün biter ve o gün boş kalır (streak kırılır ama cezalandırıcı dil yok — "boşluklar da yılın bir parçası").

**Ürünün tek cümlelik tanımı:** ONCE, her gün sana rastgele bir anda ulaşır. Bir fotoğraf çekersin. Sonra o anı unutursun. Tüm yılın 31 Aralık gecesi sana geri verilir.

### 3.3 31 Aralık deneyimi — bir tören olarak

Bu akış bir "uygulama özelliği" değil, yılda bir kez yaşanan bir **ritüel** olarak tasarlanır. Duygusal referans noktaları: Spotify Wrapped, Apple keynote temposu, zaman kapsülü törenleri, analog fotoğraf albümleri, yılbaşı nostaljisi. Kesinlikle Instagram, TikTok veya Snapchat değil. Tüm deneyim kutsal, yavaş ve duygusal hissettirmelidir — kullanıcı bir yıl boyunca kendisini bekleyen bir kutuyu açıyormuş gibi hissetmelidir.

```
23:55 civarı: Uygulama içi nazik hatırlatma ("Kapsülün birazdan açılıyor")
00:00: Bildirim → "Yılın hazır."
→ 1. Açılış ekranı (bkz. 3.3.1)
→ 2. ONCE WRAPPED (bkz. 3.3.2)
→ 3. Geçiş (bkz. 3.3.3)
→ 4. Open Your Year (bkz. 3.3.4)
→ 5. Fotoğraf sunumu (bkz. 3.3.5)
→ 6. Konum tabanlı anlatım (bkz. 3.3.6)
→ 7. Ortak kapsül bölümü — V2, yalnızca varsa (bkz. 3.3.7)
→ 8. Bitiş ekranı (bkz. 3.3.8)
→ 9. Yıl Görünümü, kalıcı açılış (bkz. 3.6, 3.3.9)
```

### 3.3.1 Açılış ekranı

Siyah ekran. Küçük ONCE logosu (yalnızca sembol, sakin, üst ortada).

```
[logo]

These moments waited an entire year for you.

91 moments are ready.

Continue
```

"Continue" küçük, mütevazı bir CTA'dır — büyük buton değildir, ekranın görsel ağırlığı cümlede kalır.

Ana cümle sabit değildir; her yıl rastgele bir tanesi seçilen, rotasyonlu bir havuzdan gelir:

```
These moments waited an entire year for you.
You haven't seen these in 365 days.
The year you lived is waiting.
Tonight, your memories come home.
Some moments deserve patience.
```

### 3.3.2 ONCE WRAPPED

Spotify tarzı, kart kart ilerleyen, her ekranda tek bir fikir. Tempo sinematiktir, istatistiksel değil — her kart nefes alır, aceleye getirilmez.

```
KART 1
91
photos captured

KART 2
13
places visited

KART 3
28
day streak

KART 4
You felt 😌 most often.

KART 5
You captured more moments in August
than any other month.

KART 6
Most of your memories happened
after sunset.

KART 7 (yalnızca ortak kapsül varsa — V2)
Together, you created
47
shared moments.
❤️

KART 8
[harita görselleştirmesi, küçük ışıldayan noktalar]
You left pieces of yourself in 13 places.
```

Kart 1-3 büyük sayı formatındadır (bkz. Bölüm 6.1). Kart 4-6 ve 8 tam cümle formatındadır — New York Serif, ekranda dikey ortalanmış, tek cümle, etrafında bol boşluk. Kart 8'deki harita, gerçek konumların soyutlanmış, küçük ışık noktaları halinde gösterimidir; coğrafi doğruluk değil, duygusal iz hissi hedeflenir.

### 3.3.3 Geçiş

Wrapped bittiğinde:

```
[siyah ekran, duraklama]

It's time to remember.

91 moments.
365 days apart.

[3 saniye bekle, fade]

BEGIN
```

Ana cümle de rotasyonlu bir havuzdan gelir:

```
It's time to remember.
Open your year.
The person you were is waiting.
Tonight, the year becomes a memory.
Let's go back.
```

### 3.3.4 Open Your Year

Deneyim bir uygulama kaydırma hissi vermemeli — bir zaman kapsülü açma hissi vermelidir. Fotoğraflar tek tek belirir: yavaş fade geçişleri, çok hafif zoom, yumuşak haptic. Yüksek sesli/ani animasyon yoktur.

Kontroller görünür biçimde açıklanmaz — hiçbir tutorial ekranı oluşturulmaz. Kullanıcı modern arayüzleri zaten bilir ve doğal olarak keşfeder: sağa dokunma → sonraki, sola dokunma → önceki, basılı tutma → duraklat, aşağı kaydırma → Year View.

### 3.3.5 Fotoğraf sunumu

Fotoğraf ekranın yaklaşık %80-85'ini kaplar — Instagram Story estetiğinden kaçınmaya yetecek kadar nefes alan boşluk bırakılır.

Metadata hiyerarşisi:
```
August 14, 2026

Kadıköy

😌

Today felt lighter.
```

İtalik yoktur. Dekoratif eleman yoktur. Etiket (Date:, Location: vb.) yoktur. Yalnızca anı parçaları, sade biçimde alt alta. Duygu emojileri küçük ve sakin kalır. (Not: bu, önceki tasarımdaki tırnak işareti ve italik cümle kullanımının üzerine yazılır — yeni standart düz, etiketsiz, süssüz metin bloğudur.)

### 3.3.6 Konum tabanlı anlatım (kritik)

Birkaç fotoğraftan sonra, ONCE küçük anlatı anları yaratır — ham istatistik değil, cümle halinde gözlemler:

```
You returned to Kadıköy 17 times.

The sea appeared in your life
more than any other place.

Most of your quiet moments
happened after midnight.

You traveled 642 kilometers this year.

Your happiest memories happened near water.
```

Kullanıcı konum paylaşımını etkinleştirdiyse, yıl coğrafi olarak canlı hissettirilir. Bu anlatı kartları fotoğraf akışının arasına serpiştirilir (her fotoğrafta değil, doğal aralıklarla) ve aynı sinematik tempoyla, tam ekran, tek cümle olarak sunulur.

### 3.3.7 Ortak kapsül bölümü — V2, yalnızca varsa

V1'de bu bölüm yoktur (bkz. Bölüm 8). Eğer gelecekte ortak kapsül hayata geçerse: ritüele doğal biçimde eklenir, kişisel anılarla rastgele karıştırılmaz, kendi ayrı "bölümü" olarak ele alınır.

```
You didn't live this year alone.

47 shared moments.

[ardından bu anılar ayrı bir akış olarak gösterilir]
```

### 3.3.8 Bitiş ekranı

Son fotoğraftan sonra:

```
[siyah ekran, uzun duraklama]

This was your 2026.

VIEW YEAR
SHARE WRAPPED

91 moments.
13 places.
One year.
```

"This was your 2026." uzun bir duraklamanın ardından belirir — aceleye getirilmez. İki CTA altında, en altta küçük ve sakin biçimde yılın özet rakamları tekrarlanır (kapanışı, açılıştaki sayılarla simetrik biçimde kapatmak için).

### 3.3.9 Tören sonrası: kalıcı açılış

Deneyim tamamlandığında kapsül kalıcı olarak açılır. Kullanıcı ömür boyu erişim kazanır. `sealed → open` geçişi kalıcı ve geri dönüşsüzdür (bkz. Bölüm 5.2 ve Bölüm 3.6). Bir yıl beklemenin karşılığı, o yılın anıları üzerinde tam ve kalıcı sahipliktir.

### 3.3.10 Wrapped paylaşım stratejisi (büyüme motoru)

Wrapped tamamen ücretsiz kalır — bu paywall'a kapatılmaz. Ama Wrapped ekranları özellikle **Instagram Story paylaşımına** uygun tasarlanır; Spotify Wrapped'ın organik büyüme mekanizması doğrudan örnek alınır.

Hedef davranış: 31 Aralık gecesi kullanıcılar ONCE Wrapped ekranlarını Instagram hikâyelerinde paylaşır, arkadaşları "Bu hangi uygulama?" diye sorar. Bu, ürünün en önemli organik büyüme kanallarından biri olarak tasarlanır.

**Paylaşım kartı içerik formatı (premium hiyerarşi, emoji yok):**
```
ONCE WRAPPED
2026

91
photos captured

13
places visited

28
day streak
```
Her sayı SF Pro Display Bold, büyük punto; her açıklama SF Pro Text, küçük ve muted renkte hemen altında. "ONCE WRAPPED" ve "2026" New York Serif ile, ince ağırlıkta, geniş harf aralığıyla yazılır. Kartın altında, küçük ve sakin biçimde yalnızca logo sembolü (wordmark'sız veya wordmark ile birlikte, sade) yer alır — imza gibi, reklam gibi değil.

**Tasarım gereksinimleri:**
- Format: 9:16 (Instagram Story native boyut), tek dokunuşla "Story'e ekle" akışı.
- ONCE logosu kartın altında **zarif ama görünür** şekilde yer alır — reklam gibi değil, kullanıcının kendi yılını anlatan estetik bir kart gibi hissettirmeli.
- Tipografi ve renk paleti, Bölüm 6'daki token sistemiyle birebir tutarlı olmalı (koyu zemin `#0B0B0A`, turuncu vurgu yalnızca "2026" ve kritik anlarda, New York Serif başlık + SF Pro Display Bold sayılar) — kart Wrapped deneyiminin görsel devamı gibi hissettirmeli, ayrı bir "pazarlama şablonu" gibi değil.
- Referans kalite çıtası: Spotify Wrapped, Apple Music Replay, Aesop ve Apple Human Interface Guidelines seviyesi. Instagram/TikTok/Snapchat template estetiğinden kesinlikle uzak durulur.
- Kart, kullanıcının gerçek istatistiklerinden dinamik üretilir (mock veya jenerik değil); her paylaşım benzersizdir.
- Paylaşım CTA'sı Open Your Year akışının doğal bitişinde sunulur, ayrı bir adım veya pop-up olarak zorlanmaz.

### 3.3.2 Yıl sonu sonrası: kapsül kalıcı arşive dönüşür (kritik)

31 Aralık'tan **önce**: hiçbir fotoğraf hiçbir koşulda görülemez (bkz. Bölüm 5.2, görülemezlik garantisi).

31 Aralık'tan **sonra**: kullanıcı o yılın kapsülünü tamamen ve kalıcı olarak açmış olur. Bu açılış geri dönüşsüzdür ve yalnızca bir kerelik bir "gösterim" değil, kalıcı bir erişim hakkıdır. Açıldıktan sonra kullanıcı:

- Yıl Görünümü'ne (takvim) geçebilir (bkz. 3.6)
- Tüm günleri görebilir
- Fotoğrafları istediği zaman tekrar inceleyebilir
- Notlarını okuyabilir
- Duygularını görebilir

Yani 31 Aralık, kapsülün kalıcı olarak mühürden çıktığı gündür. Sonrasında o yılın anıları artık kullanıcının kişisel arşivine dönüşür ve ömür boyu erişilebilir kalır. (Yeni başlayan yıl ise yeniden mühürlü, yeniden 31 Aralık'a kadar görülemez durumdadır — kilit mekaniği yalnızca o anki aktif yıl için geçerlidir.)

### 3.6 Yıl Görünümü (kalıcı takvim arşivi)

Open Your Year sinematik deneyimi bittikten sonra, kullanıcı istediği zaman bu görünüme dönebilir — minimalist bir takvim/ızgara:

```
2026

□ □ ■ □ □
■ ■ □ ■ □
□ □ □ ■ ■
```

Dolu kare (■) o gün mühürlenmiş bir anıyı, boş kare (□) anısız geçen bir günü temsil eder — ana ekrandaki nokta dizisinin açılmış, dokunulabilir hâlidir. Bir güne dokunulduğunda o günün fotoğrafı, notu, duygusu ve konumu (varsa) açılır.

Bu ekran yalnızca açılmış (geçmiş) yıllar için erişilebilirdir ve ömür boyu kalıcıdır — kullanıcı yıllar sonra bile 2026'sına geri dönüp tek tek günlerini yeniden gezebilir. Aktif/mühürlü yıl için bu görünüm yoktur (henüz açılmamış kapsül hiçbir biçimde görüntülenemez).

### 3.4 Yıl içi ikincil akış (Memories)

```
Rastgele günlerde (düşük frekans, spam değil): "🕰️ Tam 1 yıl önce bugün..."
→ Sadece geçmişte AÇILMIŞ kapsüllerden gelir, mevcut yıldan asla
→ Dokunulduğunda o günün fotoğrafı + notu gösterilir
```

### 3.5 Ortak kapsül — backlog notu

V1'de yer almaz, herhangi bir akış olarak tasarlanmaz. Fikir notu olarak Bölüm 8 (V2 Backlog)'de tutulur.

---

## 4. Ana Ekranlar

Ana ekran üç net duruma sahiptir; her durumda kasıtlı olarak aşırı minimal kalınır.

### 4.1 Normal durum

```
[ONCE sembolü — küçük, %50-70 opaklık]
2026

91 memories sealed
87 days remaining

Today is still waiting.
```

Üstte yer alan, resmi kum saati sembolüdür (bkz. Bölüm 0.1) — emoji değil, marka kimliğinin gerçek SVG/vektör hâli, küçük ve sakin opaklıkta. Bu, 365 günün tamamını temsil eden ince bir nokta dizisinin (bkz. Bölüm 6.1, imza eleman) üstünde, kullanıcının o ana kadar mühürlediği toplam anı sayısını ve kalan gün sayısını gösterir. "Today is still waiting." satırı, bildirim gelene kadarki bekleyişi sakin bir tonda çerçeveler — baskı değil, davet hissi verir.

### 4.2 Bildirim geldikten sonra

```
✨ Your moment is here.

Capture today.
You have until midnight.

[ dev kamera butonu ]
```

Ekranın odağı tek ve büyük bir kamera butonudur. "You have until midnight" satırı günün sınırını nazikçe hatırlatır, aciliyet dili kullanmadan.

### 4.3 Gün kaçırıldıysa

```
July 14

A quiet day.
Not every memory needs a photograph.
```

Kırmızı hata rengi, çarpı işareti veya cezalandırıcı dil **kesinlikle kullanılmaz**. Kaçırılan gün, nokta dizisinde sessizce boş kalır (bkz. 4.1, 4.4) — bu, ürünün "boşluklar da hayatın bir parçasıdır" felsefesinin ekranda somutlaştığı yerdir.

### 4.4 Nokta dizisi (imza görsel)

```
2026

● ● ● ● ○ ○ ○ ○

87 days remaining
```

Gerçek ekranda 365 nokta, yılın film şeridi gibi ince bir çizgide sıralanır. Dolu noktalar mühürlenmiş anıları, boş noktalar henüz gelmemiş veya kaçırılmış günleri temsil eder; gizlenmez veya "tamamlanmamış" diye işaretlenmez.

"2026" başlığı tek istisnai vurgu noktasıdır — New York Serif, ince ağırlık, ve isteğe bağlı olarak accent renginde (`#D96A47`) kullanılabilir; geri kalan her şey nötr tonda kalır.

V1 için kritik ekranlar: Ana Ekran (3 durum), Çekim Ekranı, Opsiyonel Detay Ekranı (konum varsayılan kapalı toggle ile), Onay/Geri Al/Kilit Animasyonu (30 saniyelik pencere dahil), Wrapped, Open Your Year, Yıl Görünümü/Takvim (bkz. Bölüm 3.6), Ayarlar.

Görsel mockup'lar bu dokümanla birlikte ayrıca sunulmuştur.

---

## 5. Teknik Mimari

### 5.1 Yüksek seviye

```
[iOS App - SwiftUI]
   ├─ Kamera modülü (AVFoundation, doğrudan capture, galeri erişimi YOK — bu kasıtlı bir ürün kararı)
   ├─ Yerel bildirim zamanlayıcı (yedek) + Push (APNs, birincil)
   ├─ Konum (CoreLocation, opsiyonel, tek seferlik anlık konum — sürekli takip YOK)
   └─ Yerel şifreli önbellek (kilitli kapsül fotoğrafları cihazda da görüntülenemez biçimde saklanır)

[Backend - örn. Node/Go + PostgreSQL + S3/Cloud Storage]
   ├─ Auth servisi (Apple Sign-In öncelikli, telefon no. yedek)
   ├─ Rastgele bildirim zamanlama servisi (cron + kullanıcı bazlı seed)
   ├─ Medya yükleme servisi (fotoğraf S3'e şifreli yüklenir, kapsül kapanana kadar
   │   hiçbir API endpoint'i bu medyayı kullanıcıya GERİ döndürmez — sunucu taraflı kilit)
   ├─ Kapsül kapanış job'ı (her kullanıcının yerel saat dilimine göre 31 Aralık 00:00 tetiklenir)
   ├─ Wrapped istatistik hesaplama servisi (batch, kapanış anında çalışır)
   └─ Bildirim servisi (APNs/FCM)
```

### 5.2 Kritik mimari karar: "Görülemezlik" nasıl garanti edilir

Bu ürünün güven vaadi teknik olarak da uygulanmalı, sadece UI kısıtlaması olmamalı. "Kapsüle Gönder" anından itibaren **30 saniyelik geri al penceresi** açılır (yanlış yüklemeleri önlemek için) — bu pencere kapandığında anı, kapsül `sealed` durumdayken şu beş şekilde de korunur: düzenlenemez, silinemez, görüntülenemez, indirilemez, paylaşılamaz.

- Geri al penceresi sunucu taraflı bir `pending_until` zaman damgasıyla uygulanır; istemci sayaç gösterse de nihai karar backend'dedir. Pencere kapanmadan medya `sealed` durumuna geçmez.
- Çekilen fotoğraf cihazdan yüklendikten sonra **istemci tarafında silinir** (yerel kopya tutulmaz, kamera rulosuna asla yazılmaz).
- Backend API'sinde, kapsül `status = open` olmadan o kapsüle ait medya URL'lerini döndüren hiçbir endpoint yoktur (yetkilendirme katmanında, route seviyesinde engellenir — sadece UI'da gizlenmez). `GET /memories/:id` gibi bir çağrı `sealed` durumdaki bir kayıt için 403 döner, veri sızdırmaz.
- İndirme/dışa aktarma/paylaşma action'ları `sealed` kapsüller için istemci tarafında render bile edilmez — UI'da bu butonlar yoktur, devre dışı bırakılmış olarak da gösterilmez (devre dışı buton, "aslında erişilebilir ama kilitli" hissi verir; bu üründe o buton hiç var olmamalıdır).
- 31 Aralık 00:00'da kapsül `status = open`'a geçtiğinde bu kısıtlama **kalıcı olarak kaldırılır** — bu, tek seferlik bir gösterim değil, geri dönüşsüz bir durum değişikliğidir. O andan itibaren `GET /memories/:id` ve ilgili tüm endpoint'ler o yılın kapsülü için süresiz erişime açılır (bkz. Bölüm 3.3.2, 3.6).
- Bu, kullanıcı güvenini teknik olarak kanıtlanabilir kılar ve pazarlamada ("verilerin bizde bile senin görmen mümkün olmadan duruyor") kullanılabilir bir vaat haline gelir.

### 5.3 Zaman dilimi karmaşıklığı

31 Aralık herkes için "aynı gün" olmalı ama kullanıcılar farklı saat dilimlerinde. Karar: kapanış kullanıcının **kayıtlı yerel saat dilimine göre** 31 Aralık 00:00'da tetiklenir (global eşzamanlı an değil, ürünün "herkes kendi gece yarısında açar" hissi seyahat eden kullanıcılar için de tutarlı kalır).

### 5.4 Bildirim rastgeleliği

Sunucu taraflı, kullanıcı ID + gün damgası ile seed'lenmiş pseudo-rastgele saat üretimi. Eşit dağılım yerine **ağırlıklı dağılım** kullanılır — bu, ürünün "sürpriz" hissini taşıyan kritik bir detay:

| Zaman dilimi | Olasılık ağırlığı |
|---|---|
| 08:00–22:00 | %85 |
| 22:00–02:00 | %10 |
| 02:00–08:00 | %5 |

Gece geç saatte (örn. 03:17) gelen nadir bildirimler kasıtlı olarak özel anlar olarak tasarlanır — bunlar düşük frekanslı ama yüksek duygusal etkili "imza anlar" haline gelir ve kullanıcı arasında organik olarak konuşulan bir özellik olabilir ("ONCE bana gece 3'te geldi" paylaşımları gibi). Tamamen client-side yapılmamalı — uygulama arka planda değilken de tetiklenmesi gerekir (push gerektirir, APNs sessiz push + zamanlanmış local notification yedek olarak).

### 5.4.1 Bildirim metin havuzu

Bildirim sistemi tek bir sabit mesaj kullanmaz. Her gün, sunucu taraflı bir havuzdan rastgele seçilen şiirsel, sakin bir mesaj gönderilir — kullanıcı aynı cümleyi art arda görmemeli (seçim, kullanıcının son N gün içinde görmediği mesajlar arasından yapılır).

Örnek havuz:
```
✨ Today only happens once.
📸 Your moment is here.
🌙 Don't let today disappear.
☀️ Pause for a second.
🕰️ One day, you'll come back to this.
🌧️ Capture this ordinary day.
🌙 The world is quiet tonight.
📷 Leave something for your future self.
✨ A year from now, you'll thank yourself.
🌅 Save a piece of today.
🍂 Some moments deserve to wait.
🌌 This night will only happen once.
```

Amaç: bildirimlerin ekran görüntüsü alınabilecek kadar estetik olması, kullanıcının aynı cümleyi tekrar tekrar görmemesi ve ürünün şiirsel, sakin, nostaljik tonunun her temas noktasında korunması. Türkçe lokalizasyonda bu havuzun birebir çevirisi değil, aynı tonu taşıyan ayrı bir şiirsel set kullanılmalıdır (doğrudan çeviri tonun doğallığını bozar).

### 5.5 Veri modeli (özet)

```
User { id, apple_id, locale(sistem dilinden), timezone, notification_window, created_at }
Capsule { id, user_id, year, status[open|sealed], opened_at }
Memory { id, capsule_id, photo_url(encrypted), note, emotion, location_opt_in(bool), location, captured_at, pending_until, status[pending|sealed] }
WrappedStats { capsule_id, photo_count, location_count, longest_streak, top_emotion, most_active_month, ... }
```

V1'de `SharedCapsule` modeli yoktur — ortak kapsül V1 kapsamı dışındadır (bkz. Bölüm 2).

---

## 6. iOS-First Tasarım Dili

### 6.1 Token sistemi

**Renk:**
- `--once-bg`: #0B0B0A (neredeyse siyah, sayfa zemini)
- `--once-surface`: #181715 (kart yüzeyi)
- `--once-text`: #F4F1EA (kırık beyaz)
- `--once-text-muted`: #8C8A82
- `--once-accent`: #D96A47 (gün batımı turuncu — yalnızca CTA, "2026" başlığı ve kapanış anları gibi gerçekten önemli vurgu noktalarında; abartılmaz)
- `--once-line`: #2A2925 (kıl payı ayraçlar)
- `--once-logo-light`: #3A4148 (logo çizgisi, açık zemin)
- `--once-logo-dark`: #F4F1EA (logo çizgisi, koyu zemin)

**Tipografi — üç katmanlı net hiyerarşi:**
- **Başlıklar** (ONCE WRAPPED, 2026, ekran başlıkları): New York Serif — zarif, geniş boşluklu, premium. Asla kalın değil, ince/regular ağırlıkta sentence/title case.
- **Sayılar** (Wrapped istatistikleri, gün sayaçları): SF Pro Display Bold — büyük punto, güçlü hiyerarşi. Sayı her zaman ekranın görsel odağıdır; açıklama metni altında küçük ve sakin durur (örn. "91" büyük, "photos captured" küçük ve muted).
- **Arayüz metinleri** (butonlar, etiketler, sistem mesajları): SF Pro Text Regular.
- Emoji kullanımı minimumda tutulur — yalnızca duygu seçici bileşeninde işlevsel olarak kullanılır, istatistik kartlarında veya başlıklarda dekoratif emoji KULLANILMAZ. İkonografi gerektiğinde ince çizgili (hairline), minimalist sembollerle sağlanır.

**Hareket:**
- Sayfa geçişleri minimal, çoğunlukla fade + slight scale
- Tek orkestre edilmiş an: Open Your Year sekansı — bunun dışında her yerde hareket sakin

**İmza eleman:** Ana ekrandaki yıl ilerleme çizgisi — 365 noktadan oluşan ince bir film şeridi/Polaroid kenar deliği hattı; doldukça turuncu (`#D96A47`) yanar, boş noktalar nötr tonda sessizce kalır.

**Tasarım felsefesi — referans çıtası:** Apple, Aesop, Notion ve analog fotoğraf/Polaroid kültürü ilham kaynağıdır. Instagram, Snapchat ve TikTok estetiğinden kesinlikle uzak durulur — parlak gradyanlar, kalın emoji ağırlığı, yoğun template hissi bu üründe yer almaz. Hedef his: sessiz, zamansız, duygusal, premium, minimal, mahrem, nostaljik. ONCE bir teknoloji ürünü gibi değil, kişisel bir zaman kapsülü gibi hissettirmelidir.

### 6.2 iOS native hizalama

- Bildirim, doğrudan kamerayı açan bir Notification Action (App Clip benzeri sürtünmesiz giriş)
- Haptic feedback: çekim anında ve kapsül kilitlenme anında hafif (`UIImpactFeedbackGenerator.light`)
- Dynamic Type desteği, VoiceOver tam uyumlu (özellikle Wrapped ve Open Your Year ekranları için sesli betimleme)
- Widget (V2): Ana ekran widget'ı sadece gün sayacını ve "bugün çekildi mi" durumunu gösterir, fotoğrafı asla göstermez

---

## 7. Gelir Modeli — V1 Sonrası Yön

V1'de gelir özelliği yoktur (bkz. Bölüm 2). Aşağıdakiler V1 kanıtlandıktan sonra değerlendirilecek olası yönlerdir, şu an aktif kapsamda değildir:

1. Fiziksel yıl sonu fotoğraf albümü
2. Ortak/paylaşılan kapsüller (premium katman olası)
3. AI tarafından yazılmış kişisel yıl sonu mektubu
4. Premium hatıra paketleri

Wrapped'in ücretsiz kalması kalıcı bir stratejik karardır, V1 sonrası dönemde de geçerlidir — viral paylaşım kartı (bkz. 3.3.1) en güçlü organik büyüme kanalı olduğu için asla paywall arkasına konmamalı.

---

## 8. V2 Backlog (Fikir Notları — Aktif Kapsam Değil)

Aşağıdakiler V1 kapsamının kesin olarak dışındadır (bkz. Bölüm 2). Burada yalnızca gelecekte değerlendirilebilecek fikirler olarak not düşülür; herhangi bir tasarım veya mimari karar V1 için bunları varsaymamalıdır.

- **Ortak kapsül**: Sevgili, arkadaş veya aile ile birlikte oluşturulan paylaşımlı yıllık kapsül fikri güçlü bulunuyor — davet akışı, ortak Wrapped, ortak Open Your Year deneyimi gibi yönleriyle doğal bir K-factor/viral kanal olabilir. Ancak V1'in tek kullanıcılı çekirdek döngüyü (bildirim → çekim → kilit → 31 Aralık açılışı) kusursuzlaştırmaya odaklanması gerektiği için şimdilik backlog'da bekletilir.
- Fiziksel yıl sonu fotoğraf albümü
- AI tarafından yazılmış kişisel yıl sonu mektubu
- Premium hatıra paketleri
- Arkadaş sistemi / sosyal özellikler
