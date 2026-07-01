# ONCE — MVP Prototip

> **⚠️ Bu bir web prototipidir, production iOS uygulaması değildir.**
> Akışları, durumları ve tasarım dilini doğrulamak için React/Vite ile tarayıcıda çalışacak şekilde inşa edilmiştir. Gerçek kamera, gerçek push bildirim, gerçek backend ve App Store dağıtımı içermez. Üretime taşıma planı için bu dokümanın sonundaki **iOS Üretim Yol Haritası**'na bakın.

Çalışan, tıklanabilir bir React + TypeScript prototipi. Strateji dokümanındaki çekirdek döngüyü uçtan uca uygular:

```
Notification → Camera → Preview → Optional Details → Seal Memory → Locked Until Dec 31 → Wrapped → Open Your Year → Year View
```

## Çalıştırma

```bash
npm install
npm run dev
```

Tarayıcıda `localhost:5173` adresini açın. Telefon çerçevesi içinde 390×844 sabit boyutlu bir ekran render edilir.

## Demo navigasyonu

Bu bir prototip olduğu için gerçek bildirim/zamanlayıcı sistemi yoktur. **Yalnızca `npm run dev` ile geliştirme modunda**, ana ekranın altında üç demo butonu görünür:

- **Simulate notification** — günlük bildirim geldi durumunu tetikler, çekim akışına girer.
- **Simulate missed day** — gün kaçırıldı durumunu gösterir.
- **Dec 31** — doğrudan 31 Aralık törenine atlar (Wrapped → Open Your Year → Year View).

Bu butonlar `import.meta.env.DEV` koşuluna bağlıdır; `npm run build` ile alınan production build'de hem görünmez hem de JavaScript paketinden tamamen çıkarılır (tree-shaking). `dist/` çıktısında bu metinlerden hiçbiri bulunmaz — doğrulamak için: `grep "Simulate" dist/assets/*.js` boş sonuç döner.

Gerçek üründe bu üç durum sunucu taraflı bildirim zamanlaması ve tarih kontrolüyle tetiklenir.

## Mimari

```
src/
  types.ts                 — paylaşılan TypeScript tipleri (Memory, Capsule, Screen, vb.)
  store/AppStore.tsx        — React Context + reducer; backend bağlanana kadar tüm state burada
  data/
    mockData.ts             — mock anı üretimi, Wrapped istatistik hesaplama
    notifications.ts        — bildirim/geçiş metin havuzları, tekrar etmeyen seçim
    scheduling.ts           — ağırlıklı bildirim saati üretimi (08-22 → %85, 22-02 → %10, 02-08 → %5)
  components/
    OnceLogo.tsx             — resmi SVG logo, size/opacity prop'larıyla
    PhoneFrame.tsx           — telefon çerçevesi
    ScreenTransition.tsx     — ekranlar arası fade geçiş
  screens/
    OnboardingScreen.tsx     — Apple ile Giriş + bildirim izni (2 adım)
    HomeScreen.tsx           — normal / notified / missed üç durumu
    CaptureFlow.tsx          — kamera → önizleme → opsiyonel detaylar → mühürleme → 30sn Undo → kapanış
    RitualFlow.tsx           — 31 Aralık töreni: açılış → Wrapped → geçiş → Open Your Year → bitiş
    YearViewScreen.tsx       — kalıcı takvim arşivi, güne dokunarak detay
  App.tsx                    — ekranlar arası router (basit state-machine)
```

## Tasarım sistemi kaynağı

Tüm renk/tipografi/hareket kararları `once-strateji.md` stratejik dokümanındaki Bölüm 6 (iOS-First Tasarım Dili) ile birebir uyumludur. CSS değişkenleri `src/styles/tokens.css` içinde tanımlıdır.

## Bilinçli olarak eksik bırakılanlar (V1 kapsamı gereği)

- Gerçek kamera entegrasyonu (AVFoundation) — bu bir web prototip olduğu için gradyan placeholder kullanılıyor.
- Gerçek push bildirim sistemi — demo butonlarıyla simüle ediliyor.
- Gerçek backend/Supabase bağlantısı — `AppStore.tsx` içindeki reducer mock veri üzerinde çalışıyor, ancak action isimleri ve veri modeli gerçek API'ye 1:1 taşınacak şekilde tasarlandı.
- Ortak kapsül, AI mektup, fiziksel albüm, premium, arkadaş sistemi, feed — stratejik olarak V1 dışında (bkz. doküman Bölüm 8).

---

## iOS Üretim Yol Haritası

Bu bölüm V1'i bu prototipten gerçek bir App Store uygulamasına taşımanın planıdır. Yeni özellik içermez — yalnızca mevcut V1 kapsamının (bkz. `once-strateji.md` Bölüm 2) production'a taşınması.

### 1. Platform kararı: SwiftUI mı, React Native/Expo mu?

**Karar: SwiftUI (native).**

Gerekçe:
- ONCE'ın çekirdek değeri donanım seviyesinde güven gerektiriyor (bkz. strateji dokümanı Bölüm 5.2 — "görülemezlik" garantisi). Bu, kamera rulosuna asla yazmama, yerel önbellekte şifreli saklama gibi davranışları native API'lerle (AVFoundation, Keychain, FileProtection) doğrudan kontrol etmeyi gerektiriyor. React Native bu katmanda ekstra bridge karmaşıklığı ve belirsizlik ekler.
- Hareket dili (fade + slight zoom, haptic, Open Your Year sekansı) SwiftUI'nin native animasyon sistemiyle (`withAnimation`, `matchedGeometryEffect`) çok daha az sürtünmeyle, 60-120fps ProMotion uyumlu şekilde elde edilir.
- Uygulama küçük ve odaklı (tek platform, V1'de 8-9 ekran) — RN'in "tek kod tabanından çoklu platform" avantajı burada düşük getiri sağlıyor; Android V1 kapsamında zaten yok.
- App Clip / Notification Action ile kameraya sürtünmesiz giriş (bkz. Bölüm 6.2) native entegrasyon ister.

React Native/Expo'nun tek gerçek avantajı (bu web prototipinin component mantığını kısmen yeniden kullanabilmek) burada yeterli ağırlıkta değil — ekran sayısı az, yeniden yazım maliyeti düşük.

### 2. Backend kararı: Supabase mi, Firebase mi?

**Karar: Supabase.**

Gerekçe:
- Veri modeli (bkz. strateji dokümanı Bölüm 5.5: `User`, `Capsule`, `Memory`, `WrappedStats`) ilişkisel ve sorgu ağırlıklı (örn. "kapsül `sealed` değilse medya URL'si dönme" gibi satır seviyeli yetkilendirme). Postgres + Row Level Security bu kuralı veritabanı seviyesinde, route koduna güvenmeden uygulamayı sağlar — bu, Bölüm 5.2'deki "yalnızca UI'da değil, route seviyesinde engellenir" gereksinimini RLS ile çok daha sağlam karşılar.
- Supabase Storage + RLS, "sealed kapsülün medyası hiçbir endpoint'ten dönmez" kuralını politika olarak tanımlamaya izin verir (bucket policy + signed URL süresi).
- Apple Sign-In, Supabase Auth'da birinci sınıf desteklenir.
- Edge Functions, 31 Aralık unlock job'ı ve bildirim zamanlama mantığı için yeterli (bkz. madde 6).

Firebase Firestore'un NoSQL doğası, kapsül durum geçişlerini (`pending → sealed → open`) ve zamana bağlı yetkilendirmeyi (RLS'nin kod yazmadan sağladığı garantiyi) Cloud Functions içinde elle, daha kırılgan biçimde uygulamayı gerektirirdi.

### 3. Apple Sign In

- `AuthenticationServices` framework, `ASAuthorizationAppleIDButton`.
- Supabase Auth'un native Apple Sign-In entegrasyonu (`supabase-swift` SDK) ile doğrudan bağlanır — dönen kimlik token'ı Supabase'e iletilir, oturum orada oluşturulur.
- Yalnızca isim/e-posta paylaşımı istenir, ekstra profil alanı toplanmaz (bkz. strateji dokümanı Bölüm 3.1 — onboarding sürtünmesi sıfıra yakın).
- "Hide My Email" senaryosu için e-posta alanı `nullable` tutulmalı; kullanıcı kimliği `apple_id` (sub claim) üzerinden eşlenmeli.

### 4. Kamera

- `AVCaptureSession` + `AVCapturePhotoOutput`, doğrudan tam ekran custom kamera arayüzü (sistem kamerasının `UIImagePickerController`'ı kullanılmaz — galeri erişimine açık kapı bırakır, bu üründe istenmeyen bir şey).
- Çekilen `UIImage`, Supabase Storage'a yüklenmeden önce cihazda EXIF/konum meta verisi temizlenir (yalnızca kullanıcının açıkça onayladığı konum verisi ayrı bir alan olarak gönderilir — bkz. Bölüm 3.1.1).
- Yükleme tamamlandıktan sonra yerel `UIImage` ve geçici dosya **hemen silinir**, kamera rulosuna hiçbir noktada yazılmaz (`PHPhotoLibrary` hiç çağrılmaz).
- 30 saniyelik Undo penceresinde (bkz. Bölüm 3.2.5) fotoğraf cihazda geçici, şifreli bir `FileProtectionType.complete` dizininde tutulur; pencere kapanınca yüklenir ve yerelden silinir.

### 5. Push Notification

- APNs, `UNUserNotificationCenter` ile entegre.
- Bildirim saati `data/scheduling.ts`'teki ağırlıklı dağılım mantığının sunucu tarafı (Supabase Edge Function, günlük cron) karşılığıdır — her kullanıcı için günde bir kez, kullanıcı ID + gün damgasıyla seed'lenmiş saat hesaplanır ve o saatte tetiklenecek bir scheduled push kuyruğa alınır.
- Bildirim metni `data/notifications.ts`'teki havuzdan sunucu tarafında seçilir (kullanıcının son N gün gördüğü mesajlar hariç tutularak — bu state'in tutulması için `notification_log` tablosu gerekir).
- Bildirime dokunma, `UNNotificationAction` ile doğrudan kamera ekranını açacak şekilde yapılandırılır (App Clip benzeri sürtünmesiz giriş, bkz. Bölüm 6.2).

### 6. Storage

- Supabase Storage, iki bucket: `memories` (kapsül medyası) ve `wrapped-exports` (paylaşım kartı render çıktıları, V1'de opsiyonel).
- Bucket policy: `sealed` durumdaki bir `Memory` satırına bağlı dosya için **hiçbir** `SELECT`/imzalı URL üretimi yapılmaz; bu policy Postgres RLS ile `Memory.status = 'sealed' AND Capsule.status != 'open'` koşuluna bağlanır.
- `Capsule.status = 'open'` olduğunda aynı policy otomatik olarak erişime izin verir — yani "kalıcı açılış" (bkz. Bölüm 3.3.9) tek bir satır güncellemesiyle, ekstra kod yazmadan gerçekleşir.

### 7. 31 Aralık Unlock Job

- Supabase Edge Function (Deno), günlük cron ile çalışır (örn. her saat başı, kullanıcıların farklı saat dilimlerini kapsayacak şekilde).
- Mantık: `WHERE capsule.status = 'sealed' AND user.timezone'a göre yerel saat = 31 Aralık 00:00 geçti` koşulunu sağlayan kapsülleri bulur, `status = 'open'` yapar, `WrappedStats`'ı hesaplayıp yazar, kullanıcıya "Yılın hazır" push'unu tetikler (bkz. Bölüm 5.3 — zaman dilimi kararı).
- Bu job idempotent olmalı (aynı kapsülü iki kez açmaya çalışsa da zarar vermemeli) ve `opened_at` zaman damgası ile audit edilebilir olmalı.
- Geçiş kalıcı ve geri dönüşsüzdür (bkz. Bölüm 3.3.9, 5.2) — bu job'ın hiçbir versiyonu `open → sealed` yönünde bir geri alma mantığı içermemelidir.

### 8. Sıralı uygulama planı

1. Supabase projesi kurulumu: Auth (Apple provider), Postgres şeması (`User`, `Capsule`, `Memory`, `WrappedStats`), Storage bucket + RLS politikaları.
2. SwiftUI proje iskeleti: bu prototipteki ekran/state mantığını referans alarak (`store/AppStore.tsx` → `ObservableObject`/`@Observable` store, `screens/*.tsx` → SwiftUI View'lar) native olarak yeniden kurmak.
3. Kamera entegrasyonu (`AVCaptureSession`) ve mühürleme/Undo akışının gerçek dosya yükleme ile bağlanması.
4. Apple Sign-In + Supabase Auth bağlantısı, onboarding akışının uçtan uca çalışması.
5. APNs kurulumu + bildirim zamanlama Edge Function'ı (sandbox'ta test, sonra production sertifikası).
6. 31 Aralık unlock Edge Function'ı + Wrapped istatistik hesaplama, test verisiyle (geçmiş tarihli sahte kapsül) doğrulama.
7. TestFlight beta, gerçek cihazlarda bildirim zamanlaması ve kamera akışının doğrulanması.
8. App Store başvurusu — gizlilik politikası, App Privacy beyanı (konum, fotoğraf, bildirim izinleri net biçimde açıklanmalı).
