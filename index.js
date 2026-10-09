'use strict';

/* =====================================================================
   ۰) ابزارهای کمکی
   ===================================================================== */
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const DAY = 86400000; // یک روز به میلی‌ثانیه

/* =====================================================================
   ۱) زبان: دیکشنری فارسی و تابع‌های کمکی
   ===================================================================== */
let currentLang = 'en';
const isFa = () => currentLang === 'fa';

// کلید = متن انگلیسی دقیقاً مثل HTML (با فاصله‌های یکدست)، مقدار = ترجمه فارسی
// اسم برند (ELENA / SUMMER RETREAT) عمداً ترجمه نمی‌شود
const FA = {
    // عنوان و متا
    'ELENA — Summer Retreat': 'النا — اقامتگاه تابستانی',
    "Discover ELENA's concept collection of private summer villas in Cyprus.":
        'مجموعه‌ی مفهومی ویلاهای خصوصی تابستانی النا در قبرس را کشف کنید.',
    'Skip to content': 'رفتن به محتوا',

    // هدر و منو
    'HOME': 'خانه', 'BLOG': 'وبلاگ', 'FAVORITE': 'علاقه‌مندی‌ها', 'ABOUT US': 'درباره ما',
    'GET STARTED': 'شروع کنید',
    'Home': 'خانه', 'Blog': 'وبلاگ', 'Favorite': 'علاقه‌مندی‌ها', 'About us': 'درباره ما',
    'Get started': 'شروع کنید',
    'ELENA Summer Retreat home': 'صفحه‌ی اصلی النا',
    'Main navigation': 'منوی اصلی', 'Language': 'زبان', 'Open navigation': 'باز کردن منو',
    'Mobile navigation': 'منوی موبایل', 'Footer navigation': 'منوی پایین صفحه',
    'Sample villa search': 'جستجوی نمونه‌ی ویلا', 'Collection categories': 'دسته‌بندی مجموعه',

    // هیرو
    'YOUR OWN LITTLE CORNER OF CYPRUS': 'گوشه‌ی کوچک خودتان در قبرس',
    'Private villas. Unhurried days.': 'ویلاهای خصوصی. روزهای بی‌عجله.',
    'A summer that feels like yours.': 'تابستانی که حس می‌کنید مال شماست.',
    'THE SUMMER COLLECTION': 'مجموعه‌ی تابستان',
    'A slower kind of summer.': 'تابستانی آرام‌تر.',
    'Find your place between the olive trees and the sea.': 'جای خودتان را میان درختان زیتون و دریا پیدا کنید.',
    'Casa Sol · Paphos, Cyprus': 'کاسا سول · پافوس، قبرس',
    'A sunlit coastal villa with a private swimming pool': 'ویلایی ساحلی و آفتاب‌گیر با استخر خصوصی',

    // نوار جستجو
    'Destination': 'مقصد', 'Anywhere in Cyprus': 'هرجای قبرس',
    'Paphos': 'پافوس', 'Polis': 'پولیس', 'Protaras': 'پروتاراس',
    'Your dates': 'تاریخ سفر شما', '12 – 17 Jul 2027': '۱۲ تا ۱۷ ژوئیه ۲۰۲۷',
    'Guests': 'مهمان‌ها',
    '4 adults · 2 children': '۴ بزرگسال · ۲ کودک', '2 adults': '۲ بزرگسال',
    '4 adults': '۴ بزرگسال', '6 adults': '۶ بزرگسال',
    'SEARCH': 'جستجو',

    // مزیت‌ها
    'A place, not just a stay': 'یک مکان، نه فقط اقامت',
    'Thoughtfully selected private villas.': 'ویلاهای خصوصی با انتخاب دقیق.',
    'Made for slow days': 'ساخته‌شده برای روزهای آرام',
    'Pools, terraces and room to unwind.': 'استخر، تراس و فضا برای استراحت.',
    'Clear from the first click': 'شفاف از اولین کلیک',
    'Nightly rates and fees, all in one place.': 'نرخ شبانه و هزینه‌ها، همه در یک‌جا.',

    // مقصدها
    '01 / FIND YOUR SUMMER': '۰۱ / تابستان خود را پیدا کنید',
    'Where would you like to slow down?': 'کجا دوست دارید آرام بگیرید؟',
    'Three ways to escape. One beautifully easy island.': 'سه راه برای فرار. یک جزیره‌ی دلپذیر و آسان.',
    'By the coast': 'کنار ساحل',
    'Salt in the air. The sea at your doorstep.': 'بوی نمک در هوا. دریا در آستانه‌ی در.',
    'The blue coastline of Paphos': 'ساحل آبی پافوس',
    'Among the olives': 'میان زیتون‌ها',
    'Quiet gardens and cool, shaded afternoons.': 'باغ‌های آرام و بعدازظهرهای خنک و سایه‌دار.',
    'Olive trees in a quiet garden': 'درختان زیتون در باغی آرام',
    'Warm Region': 'منطقه‌ی گرم',
    'Golden light and long, sun-filled days.': 'نور طلایی و روزهای بلند و آفتابی.',
    'A sunny Mediterranean terrace': 'تراسی آفتابی در مدیترانه',

    // مجموعه ویلاها
    '02 / THE VILLA COLLECTION': '۰۲ / مجموعه‌ی ویلاها',
    'Find a place that feels like you.': 'جایی را پیدا کنید که شبیه خودتان باشد.',
    'Three considered stays, with space for your favourite people. Rates shown in USD.':
        'سه اقامتگاه سنجیده، با جا برای آدم‌های محبوبتان. نرخ‌ها به دلار آمریکا نمایش داده می‌شوند.',
    'Coast': 'ساحل', 'Countryside': 'روستایی',
    'Casa Sol': 'کاسا سول', 'Olive House': 'الیو هاوس', 'Azure Cove': 'آژور کاو',
    'THE SUN SEEKER': 'جویای آفتاب', 'THE QUIET ESCAPE': 'گریزگاه آرام',
    'THE SEA-LOVER’S STAY': 'اقامت دریادوستان',
    'Paphos · Coast': 'پافوس · ساحل', 'Polis · Countryside': 'پولیس · روستایی',
    'Protaras · Warm Region': 'پروتاراس · منطقه‌ی گرم',
    '/ night': '/ شب',
    'A limestone hideaway with a private pool and long, lazy terrace lunches.':
        'پناهگاهی از سنگ آهک با استخر خصوصی و ناهارهای طولانی و بی‌عجله روی تراس.',
    'A garden retreat tucked between olive trees, with a pool all to yourself.':
        'خلوتگاهی باغی میان درختان زیتون، با استخری که فقط مال شماست.',
    'Open-air living, an infinity pool and a front-row seat to the sea.':
        'زندگی در فضای باز، استخر بی‌انتها و ردیف اول تماشای دریا.',
    '180 m² · Private pool · Sea-view terrace · Wi-Fi': '۱۸۰ متر مربع · استخر خصوصی · تراس رو به دریا · وای‌فای',
    '120 m² · Plunge pool · Olive garden · Wi-Fi': '۱۲۰ متر مربع · استخر کوچک · باغ زیتون · وای‌فای',
    '240 m² · Infinity pool · Sea views · Wi-Fi': '۲۴۰ متر مربع · استخر بی‌انتها · منظره‌ی دریا · وای‌فای',
    'Explore & reserve': 'مشاهده و رزرو',
    'Casa Sol villa and pool': 'ویلای کاسا سول و استخر',
    'Olive House garden retreat': 'خلوتگاه باغی الیو هاوس',
    'Azure Cove infinity pool and sea views': 'استخر بی‌انتها و منظره‌ی دریا در آژور کاو',
    'Stay a little longer. Every villa in this collection has a 3-night minimum.':
        'کمی بیشتر بمانید. همه‌ی ویلاهای این مجموعه حداقل ۳ شب اقامت دارند.',

    // آسایش‌ها
    'A warm villa interior opening onto a terrace': 'فضای داخلی گرم ویلا که به تراس باز می‌شود',
    'Doors open. Shoes off.': 'در باز، کفش بیرون.',
    'You’re on island time.': 'به وقت جزیره خوش آمدید.',
    '03 / THE LITTLE THINGS, CONSIDERED': '۰۳ / چیزهای کوچک، سنجیده',
    'All the comforts.': 'همه‌ی آسایش‌ها.', 'None of the hurry.': 'بدون هیچ عجله‌ای.',
    'Morning coffee on the terrace. One more dip before dinner. Spaces designed for living well, together.':
        'قهوه‌ی صبح روی تراس. یک شنای دیگر پیش از شام. فضاهایی برای خوب زیستن، با هم.',
    'Your own pool': 'استخر اختصاصی', 'A kitchen to gather in': 'آشپزخانه‌ای برای دور هم بودن',
    'Stay connected': 'همیشه متصل', 'Cool, restful rooms': 'اتاق‌های خنک و آرامش‌بخش',
    'Private parking': 'پارکینگ خصوصی', 'Outdoor living': 'زندگی در فضای باز',
    'Included across the collection. See each villa for individual details.':
        'در کل مجموعه موجود است. جزئیات هر ویلا را در صفحه‌ی همان ویلا ببینید.',
    'Find your villa': 'ویلای خود را پیدا کنید',

    // مراحل
    '04 / FROM BROWSING TO BAREFOOT': '۰۴ / از مرور تا پای برهنه',
    'Your summer, in three simple steps.': 'تابستان شما، در سه گام ساده.',
    '01': '۰۱', '02': '۰۲', '03': '۰۳',
    'Choose your place': 'جای خود را انتخاب کنید',
    'Compare the villas, choose your dates and tell us who’s coming.':
        'ویلاها را مقایسه کنید، تاریخ‌هایتان را انتخاب کنید و بگویید چه کسانی می‌آیند.',
    'Review & request': 'بررسی و درخواست',
    'Check the full price and send your reservation request.': 'قیمت کامل را ببینید و درخواست رزرو بفرستید.',
    'Confirm & unwind': 'تأیید و آرامش',
    'After availability is confirmed, pay the deposit and receive your arrival guide.':
        'پس از تأیید موجودی، پیش‌پرداخت را بپردازید و راهنمای ورود را دریافت کنید.',

    // داستان‌ها
    '05 / SUMMERS TO REMEMBER': '۰۵ / تابستان‌های ماندگار',
    'The best souvenir? Time together.': 'بهترین سوغات؟ زمانی که با هم گذراندید.',
    'Illustrative guest stories for this concept collection.': 'داستان‌های نمونه‌ی مهمانان برای این مجموعه‌ی مفهومی.',
    '“The terrace became our favourite room. Slow breakfasts, a swim, and nowhere else we needed to be.”':
        '«تراس شد اتاق مورد علاقه‌ی ما. صبحانه‌های آرام، یک شنا، و هیچ جای دیگری که لازم باشد باشیم.»',
    'Maya · Casa Sol': 'مایا · کاسا سول', 'Family summer escape': 'فرار تابستانی خانوادگی',
    '“A little house among the olives, with everything we needed. We finally switched off.”':
        '«خانه‌ای کوچک میان زیتون‌ها، با هر چه لازم داشتیم. بالاخره ذهنمان را خاموش کردیم.»',
    'Reza · Olive House': 'رضا · الیو هاوس', 'A quiet week for two': 'یک هفته‌ی آرام برای دو نفر',
    'Transparent pricing': 'قیمت‌گذاری شفاف', 'A human to help': 'یک آدم واقعی برای کمک',
    'Written booking confirmation': 'تأییدیه‌ی کتبی رزرو',

    // سوالات متداول
    '06 / GOOD TO KNOW': '۰۶ / خوب است بدانید',
    'A little clarity,': 'کمی شفافیت،', 'before you go.': 'پیش از رفتن.',
    'The practical details, without the small-print feeling. These are sample rental terms for the concept.':
        'جزئیات عملی، بدون حس ریزنوشته‌ها. این‌ها شرایط نمونه‌ی اجاره برای این طرح مفهومی است.',
    'Still wondering? Ask us ↗': 'هنوز سؤالی دارید؟ از ما بپرسید ↗',
    'How long can I stay?': 'چقدر می‌توانم بمانم؟',
    'All three villas have a 3-night minimum. The sample reservation below is for 5 nights.':
        'هر سه ویلا حداقل ۳ شب اقامت دارند. رزرو نمونه‌ی زیر برای ۵ شب است.',
    'When do I pay?': 'چه زمانی پرداخت کنم؟',
    'Request first; no payment is taken here. After confirmation, 30% is due to reserve; the balance is due 14 days before arrival.':
        'ابتدا درخواست بدهید؛ اینجا هیچ پرداختی گرفته نمی‌شود. پس از تأیید، ۳۰٪ برای رزرو پرداخت می‌شود و مانده تا ۱۴ روز پیش از ورود.',
    'Can I change or cancel my stay?': 'آیا می‌توانم اقامتم را تغییر دهم یا لغو کنم؟',
    'For this sample policy, cancel at least 30 days before arrival for a full refund. Later cancellations retain the 30% deposit. Date changes depend on availability.':
        'طبق این سیاست نمونه، اگر دست‌کم ۳۰ روز پیش از ورود لغو کنید، کل مبلغ بازگردانده می‌شود. لغوهای دیرتر، ۳۰٪ پیش‌پرداخت را نگه می‌دارند. تغییر تاریخ به موجودی بستگی دارد.',
    'Are children welcome? What about arrival?': 'آیا کودکان خوش‌آمدند؟ ورود چطور است؟',
    'Children count toward each villa’s capacity. Check-in is from 15:00; check-out is by 11:00. Ask about a cot when requesting your stay.':
        'کودکان جزو ظرفیت هر ویلا حساب می‌شوند. ورود از ساعت ۱۵:۰۰ و خروج تا ساعت ۱۱:۰۰ است. هنگام درخواست اقامت درباره‌ی گهواره بپرسید.',

    // رزرو
    '07 / YOUR NEXT CHAPTER STARTS HERE': '۰۷ / فصل بعدی شما از اینجا شروع می‌شود',
    'Let’s make room for your summer.': 'بیایید برای تابستان شما جا باز کنیم.',
    'Choose your stay, review the details and send your reservation request.':
        'اقامت خود را انتخاب کنید، جزئیات را بررسی کنید و درخواست رزرو بفرستید.',
    '1. Make it your stay': '۱. اقامت خودتان را بسازید',
    'Choose your villa *': 'ویلای خود را انتخاب کنید *',
    'Check-in *': 'ورود *', 'Check-out *': 'خروج *',
    'Adults *': 'بزرگسالان *', 'Ages 13 and above': '۱۳ سال و بالاتر',
    'Children': 'کودکان', 'Ages 0–12 · included in capacity': '۰ تا ۱۲ سال · جزو ظرفیت',
    '2. A few details about you': '۲. چند نکته درباره‌ی شما',
    'First name *': 'نام *', 'Sara': 'سارا',
    'Last name *': 'نام خانوادگی *', 'Morgan': 'مورگان',
    'Email address *': 'نشانی ایمیل *',
    'Phone with country code *': 'تلفن همراه با کد کشور *',
    'Anything else? (optional)': 'نکته‌ی دیگری هست؟ (اختیاری)',
    'Tell us about any special requests.': 'درخواست‌های ویژه‌تان را بنویسید.',
    'I agree to the rental terms and privacy policy. I understand this is a request, not a confirmed booking.':
        'با شرایط اجاره و سیاست حریم خصوصی موافقم. می‌دانم که این یک درخواست است، نه رزرو قطعی.',
    '* Required fields · We use your details only to arrange your stay.':
        '* فیلدهای الزامی · از اطلاعات شما فقط برای ترتیب‌دادن اقامتتان استفاده می‌کنیم.',

    // خلاصه رزرو
    'Your summer, at a glance': 'تابستان شما، در یک نگاه',
    'Cleaning fee': 'هزینه‌ی نظافت', 'Service fee': 'هزینه‌ی خدمات',
    'Sample taxes included · All amounts in USD': 'مالیات نمونه شامل است · همه مبالغ به دلار آمریکا',
    'Total stay': 'مجموع اقامت', '30% after confirmation': '۳۰٪ پس از تأیید',
    'Balance before arrival': 'مانده پیش از ورود',
    'Balance due 14 days before arrival. A separate $250 refundable damage deposit is collected at check-in.':
        'مانده تا ۱۴ روز پیش از ورود پرداخت می‌شود. یک ودیعه‌ی جداگانه‌ی ۲۵۰ دلاری قابل‌استرداد برای خسارت هنگام ورود گرفته می‌شود.',
    'Request reservation': 'ارسال درخواست رزرو',
    'No payment now. We’ll confirm availability before you pay the deposit.':
        'اکنون پرداختی لازم نیست. پیش از پرداخت پیش‌پرداخت، موجودی را تأیید می‌کنیم.',
    'Design preview only — this form does not submit a booking or process a payment.':
        'فقط پیش‌نمایش طراحی — این فرم رزروی ثبت نمی‌کند و پرداختی انجام نمی‌دهد.',

    // فوتر
    'Rental terms': 'شرایط اجاره', 'Privacy': 'حریم خصوصی',
    'Preview privacy notice: this page does not send the information entered in the form. A live service would need its own privacy policy.':
        'اطلاعیه‌ی حریم خصوصی پیش‌نمایش: این صفحه اطلاعات واردشده در فرم را ارسال نمی‌کند. یک سرویس واقعی به سیاست حریم خصوصی مخصوص خودش نیاز دارد.',
    'ELENA concept collection · Villas, prices, guest stories and rental terms are illustrative, not live offers.':
        'مجموعه‌ی مفهومی النا · ویلاها، قیمت‌ها، داستان‌های مهمانان و شرایط اجاره نمایشی هستند و پیشنهاد واقعی نیستند.',
    '© ELENA 2027': '© النا ۲۰۲۷'
};

const SPEC_FA = { guests: 'مهمان', bedrooms: 'اتاق خواب', baths: 'حمام' };
const toFaDigits = (s) => String(s).replace(/\d/g, (d) => '۰۱۲۳۴۵۶۷۸۹'[d]).replace(/,/g, '٬');

// ترجمه یک متن ثابت (اول دیکشنری، بعد الگوها مثل قیمت و مشخصات)
function translate(text) {
    if (FA[text]) return FA[text];
    let m = text.match(/^\$([\d,]+)$/);                       // $280
    if (m) return `${toFaDigits(m[1])} دلار`;
    m = text.match(/^(\d+) (guests|bedrooms|baths)$/);        // 6 guests
    if (m) return `${toFaDigits(m[1])} ${SPEC_FA[m[2]]}`;
    return text;
}
const trText = (text) => (isFa() ? translate(text) : text);

// عدد، قیمت و واحدها بر اساس زبان فعلی
const num = (n) => (isFa() ? n.toLocaleString('fa-IR') : String(n));
const formatPrice = (n) => (isFa() ? `${n.toLocaleString('fa-IR')} دلار` : '$' + n.toLocaleString('en-US'));

const UNITS = {
    en: { night: ['night', 'nights'], guest: ['guest', 'guests'], bedroom: ['bedroom', 'bedrooms'],
          adult: ['adult', 'adults'], child: ['child', 'children'] },
    fa: { night: ['شب'], guest: ['مهمان'], bedroom: ['اتاق خواب'], adult: ['بزرگسال'], child: ['کودک'] }
};
const count = (n, unit) => {
    const forms = UNITS[currentLang][unit];
    return `${num(n)} ${forms[n === 1 ? 0 : forms.length - 1]}`;
};

// متن‌هایی که JS خودش می‌سازد (پیام‌های فرم و خلاصه رزرو)
const LANG = {
    en: {
        night: 'night',
        pickDates: 'Please choose your dates.',
        minNights: (name, n) => `${name} has a ${n}-night minimum.`,
        addGuest: 'Please add at least one guest.',
        capacity: (name, n) => `${name} sleeps up to ${n} guests.`,
        hintOk: (nights, guests, name, cap) =>
            `${count(nights, 'night')} · ${count(guests, 'guest')} · ${name} sleeps up to ${cap}`,
        location: (city, beds, guests) => `${city}, Cyprus · ${count(beds, 'bedroom')} · up to ${guests} guests`,
        pickValid: 'Choose valid dates and guests to see your price.',
        thanks: 'Thank you! This is a design preview, so your request was not sent.'
    },
    fa: {
        night: 'شب',
        pickDates: 'لطفاً تاریخ‌های خود را انتخاب کنید.',
        minNights: (name, n) => `${name} حداقل ${num(n)} شب اقامت دارد.`,
        addGuest: 'لطفاً دست‌کم یک مهمان اضافه کنید.',
        capacity: (name, n) => `ظرفیت ${name} حداکثر ${num(n)} مهمان است.`,
        hintOk: (nights, guests, name, cap) =>
            `${count(nights, 'night')} · ${count(guests, 'guest')} · ظرفیت ${name} تا ${num(cap)} مهمان`,
        location: (city, beds, guests) => `${city}، قبرس · ${count(beds, 'bedroom')} · تا ${num(guests)} مهمان`,
        pickValid: 'برای دیدن قیمت، تاریخ و تعداد مهمان معتبر وارد کنید.',
        thanks: 'ممنونیم! این فقط پیش‌نمایش طراحی است و درخواست شما ارسال نشد.'
    }
};
const tx = () => LANG[currentLang];

/* =====================================================================
   ۲) منوی موبایل (تگ details)
   ===================================================================== */
const mobileMenu = $('.mobile-menu');

$$('a', mobileMenu).forEach((link) => {
    link.addEventListener('click', () => mobileMenu.removeAttribute('open'));
});
document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target)) mobileMenu.removeAttribute('open');
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') mobileMenu.removeAttribute('open');
});

/* =====================================================================
   ۳) هایلایت لینک منو هنگام اسکرول
   ===================================================================== */
const navLinks = $$('.desktop-nav a');
const spyTargets = navLinks
    .filter((link) => link.hash.length > 1)
    .map((link) => ({ link, section: $(link.hash) }));

function setActiveNav(activeLink) {
    navLinks.forEach((link) => {
        if (link === activeLink) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });
}

const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setActiveNav(spyTargets.find((t) => t.section === entry.target).link);
    });
}, { rootMargin: '-45% 0px -50% 0px' });

spyTargets.forEach((t) => spy.observe(t.section));
window.addEventListener('scroll', () => {
    if (window.scrollY < 200) setActiveNav(navLinks[0]);
}, { passive: true });

/* =====================================================================
   ۴) سوالات متداول: هر بار فقط یکی باز
   ===================================================================== */
const faqItems = $$('.faq-list details');
faqItems.forEach((item) => {
    item.addEventListener('toggle', () => {
        if (!item.open) return;
        faqItems.forEach((other) => {
            if (other !== item) other.open = false;
        });
    });
});

/* =====================================================================
   ۵) اطلاعات ویلاها (همه از روی HTML انگلیسی خوانده می‌شود، قبل از ترجمه)
   ===================================================================== */
const villas = $$('.villa-card').map((card) => {
    const name = $('h3', card).textContent.trim();
    const specs = $$('.villa-specs li', card).map((li) => parseInt(li.textContent, 10));
    return {
        id: name.toLowerCase().replace(/\s+/g, '-'),        // Casa Sol → casa-sol
        name,
        card,
        location: $('.location', card).textContent.trim(),  // Paphos · Coast
        price: parseInt($('.price', card).textContent.replace(/[^0-9]/g, ''), 10),
        guests: specs[0],
        bedrooms: specs[1],
        image: $('img', card).getAttribute('src'),
        imageAlt: $('img', card).getAttribute('alt')
    };
});
const villaById = Object.fromEntries(villas.map((v) => [v.id, v]));
const villaName = (v) => trText(v.name);

/* =====================================================================
   ۶) فیلتر ویلاها
   ===================================================================== */
const pills = $$('.collection-tags .pill');

function filterVillas(keyword = 'all') {
    const key = keyword.toLowerCase();
    villas.forEach((v) => {
        v.card.hidden = !(key === 'all' || v.location.toLowerCase().includes(key));
    });
    pills.forEach((pill) => {
        const active = pill.dataset.filter === key;
        pill.classList.toggle('active', active);
        pill.setAttribute('aria-pressed', active);
    });
}

pills.forEach((pill, i) => {
    // کلید فیلتر از متن انگلیسی ساخته می‌شود تا با تغییر زبان به‌هم نریزد
    pill.dataset.filter = i === 0 ? 'all' : pill.textContent.trim().toLowerCase();
    pill.setAttribute('role', 'button');
    pill.tabIndex = 0;
    const activate = () => filterVillas(pill.dataset.filter);
    pill.addEventListener('click', activate);
    pill.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activate();
        }
    });
});

// کارت‌های مقصد: نام شهر انگلیسی را همین حالا ذخیره می‌کنیم
$$('.destination-card').forEach((card) => {
    card.dataset.city = $('.image-tag', card).textContent.trim();
    card.addEventListener('click', () => filterVillas(card.dataset.city));
});

// نوار جستجو: value گزینه‌ها همان متن انگلیسی می‌ماند
const searchButton = $('.search-bar .button');
const destinationSelect = $('.search-bar select[name="destination"]');
$$('option', destinationSelect).forEach((option) => { option.value = option.textContent.trim(); });

searchButton.addEventListener('click', () => {
    const value = destinationSelect.value;
    filterVillas(value.startsWith('Anywhere') ? 'all' : value);
});

/* =====================================================================
   ۷) فرم رزرو و خلاصه قیمت
   ===================================================================== */
const MIN_NIGHTS = 3;
const CLEANING_FEE = 85;
const SERVICE_FEE = 65;
const DEPOSIT_RATE = 0.3;

const villaSelect = $('#villa');
const checkIn = $('#check-in');
const checkOut = $('#check-out');
const adultsInput = $('#adults');
const childrenInput = $('#children');
const termsInput = $('input[name="terms"]');
const formHint = $('.form-hint');
const bookingForm = $('.booking-form');
const requestButton = $('.booking-summary .button');
const previewNotice = $('#preview-notice');

const summaryImg = $('.booking-summary img');
const summaryName = $('.summary-content h4');
const summaryLocation = $('.summary-content > .fine-print');
const summaryDates = $$('.summary-content > p:not(.fine-print):not(.summary-note)')[0];
const [stayRow, cleaningRow, serviceRow] = $$('.price-breakdown:not(.payment-breakdown) > div');
const [totalRow, depositRow, balanceRow] = $$('.payment-breakdown > div');

// متن «قیمت ثابت است» دیگر درست نیست
$$('.summary-content > .fine-print')
    .find((p) => p.textContent.includes('Fixed sample summary'))?.remove();

/* --- تاریخ‌ها (UTC تا ساعت تابستانی خطا ندهد) --- */
const toDate = (str) => {
    const [y, m, d] = str.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d));
};
const toInputValue = (date) => date.toISOString().slice(0, 10);
const countNights = (a, b) => Math.round((toDate(b) - toDate(a)) / DAY);
const minCheckOut = () => toInputValue(new Date(toDate(checkIn.value).getTime() + MIN_NIGHTS * DAY));

function formatRange(a, b) {
    const start = toDate(a);
    const end = toDate(b);
    const locale = isFa() ? 'fa-IR-u-ca-gregory' : 'en-GB'; // ماه فارسی، تقویم میلادی
    const fmt = (d, opts) => d.toLocaleDateString(locale, { ...opts, timeZone: 'UTC' });
    const sameMonth = start.getUTCMonth() === end.getUTCMonth()
        && start.getUTCFullYear() === end.getUTCFullYear();
    const endText = fmt(end, { day: 'numeric', month: 'short', year: 'numeric' });
    const startText = sameMonth ? num(start.getUTCDate()) : fmt(start, { day: 'numeric', month: 'short' });
    if (isFa()) return `${startText} تا ${endText}`;
    return sameMonth ? `${startText}–${endText}` : `${startText} – ${endText}`;
}

// تاریخ ورود نمی‌تواند در گذشته باشد
const now = new Date();
checkIn.min = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0')
].join('-');

const setRow = (row, label, value) => {
    if (label !== null) $('dt', row).textContent = label;
    $('dd', row).textContent = value;
};

// متن گزینه‌های انتخاب ویلا (اسم + قیمت)
function renderVillaOptions() {
    $$('option', villaSelect).forEach((option) => {
        const v = villaById[option.value];
        option.textContent = `${villaName(v)} — ${formatPrice(v.price)} / ${tx().night}`;
    });
}

function updateBooking() {
    const villa = villaById[villaSelect.value];
    const name = villaName(villa);
    const adults = parseInt(adultsInput.value, 10) || 0;
    const children = parseInt(childrenInput.value, 10) || 0;
    const guests = adults + children;
    const hasDates = checkIn.value && checkOut.value;
    const nights = hasDates ? countNights(checkIn.value, checkOut.value) : 0;

    if (checkIn.value) checkOut.min = minCheckOut();

    // --- اعتبارسنجی ---
    const errors = [];
    if (!hasDates) errors.push(tx().pickDates);
    else if (nights < MIN_NIGHTS) errors.push(tx().minNights(name, MIN_NIGHTS));
    if (guests < 1) errors.push(tx().addGuest);
    else if (guests > villa.guests) errors.push(tx().capacity(name, villa.guests));
    const valid = errors.length === 0;

    formHint.classList.toggle('form-hint-error', !valid);
    formHint.textContent = valid ? tx().hintOk(nights, guests, name, villa.guests) : errors[0];

    // --- خلاصه رزرو ---
    summaryImg.setAttribute('src', villa.image);
    summaryImg.setAttribute('alt', trText(villa.imageAlt));
    summaryName.textContent = name;
    summaryLocation.textContent =
        tx().location(trText(villa.location.split(' · ')[0]), villa.bedrooms, villa.guests);

    if (valid) {
        const stay = villa.price * nights;
        const total = stay + CLEANING_FEE + SERVICE_FEE;
        const deposit = Math.round(total * DEPOSIT_RATE);

        summaryDates.innerHTML = `${formatRange(checkIn.value, checkOut.value)} · ${count(nights, 'night')}`
            + `<br>${count(adults, 'adult')}${children ? ` + ${count(children, 'child')}` : ''}`;
        setRow(stayRow, `${formatPrice(villa.price)} × ${count(nights, 'night')}`, formatPrice(stay));
        setRow(cleaningRow, null, formatPrice(CLEANING_FEE));
        setRow(serviceRow, null, formatPrice(SERVICE_FEE));
        setRow(totalRow, null, formatPrice(total));
        setRow(depositRow, null, formatPrice(deposit));
        setRow(balanceRow, null, formatPrice(total - deposit));
    } else {
        summaryDates.textContent = tx().pickValid;
        setRow(stayRow, `${formatPrice(villa.price)} / ${tx().night}`, '—');
        [cleaningRow, serviceRow, totalRow, depositRow, balanceRow].forEach((row) => setRow(row, null, '—'));
    }

    requestButton.disabled = !(valid && termsInput.checked);
}

// اگر تاریخ خروج زود بود، خودکار به حداقل شب‌ها برسد (قبل از update ثبت شود)
checkIn.addEventListener('change', () => {
    if (checkIn.value && !(checkOut.value >= minCheckOut())) {
        checkOut.value = minCheckOut();
    }
});

[villaSelect, checkIn, checkOut, adultsInput, childrenInput, termsInput].forEach((el) => {
    el.addEventListener('input', updateBooking);
    el.addEventListener('change', updateBooking);
});

// «Explore & reserve» همان ویلا را در فرم انتخاب می‌کند
villas.forEach((v) => {
    $('.text-link', v.card).addEventListener('click', () => {
        villaSelect.value = v.id;
        updateBooking();
    });
});

bookingForm.addEventListener('submit', (e) => e.preventDefault());

// پیام پیش‌نمایش (متن پیش‌فرض به زبان فعلی برمی‌گردد)
const noticeOriginal = previewNotice.textContent.trim();
const showDefaultNotice = () => { previewNotice.textContent = trText(noticeOriginal); };
let noticeTimer;
requestButton.addEventListener('click', () => {
    previewNotice.textContent = tx().thanks;
    previewNotice.scrollIntoView({ behavior: 'smooth', block: 'center' });
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(showDefaultNotice, 6000);
});

/* =====================================================================
   ۸) تغییر زبان از هدر (EN / فارسی)
   ===================================================================== */
const langLinks = $$('.language-switch a');
const footerLangLink = $('.footer-top a[href="fa.html"]');
const datesInput = $('.search-bar input[readonly]');
const metaDescription = $('meta[name="description"]');
const original = {
    title: document.title,
    description: metaDescription.content,
    dates: datesInput.value
};

// عناصری که JS خودش مدیریت می‌کند (مترجم متنی نباید به آن‌ها دست بزند)
[
    $('.language-switch'), footerLangLink, pills[0], villaSelect, formHint, previewNotice,
    summaryName, summaryLocation, summaryDates, stayRow.querySelector('dt'),
    ...$$('.price-breakdown dd')
].forEach((el) => { el.dataset.i18nSkip = ''; });

// همه متن‌های صفحه را یک بار جمع می‌کنیم و متن اصلی‌شان را نگه می‌داریم
const textNodes = [];
const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
        if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (node.parentElement.closest('script, style, [data-i18n-skip]')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
    }
});
while (walker.nextNode()) textNodes.push({ node: walker.currentNode, original: walker.currentNode.nodeValue });

// attribute های قابل ترجمه: alt و placeholder و aria-label
const attrItems = [];
$$('[alt], [placeholder], [aria-label]').forEach((el) => {
    if (el === summaryImg) return; // alt این عکس را updateBooking می‌سازد
    ['alt', 'placeholder', 'aria-label'].forEach((attr) => {
        if (el.hasAttribute(attr)) attrItems.push({ el, attr, original: el.getAttribute(attr) });
    });
});

function translateStatic(lang) {
    textNodes.forEach(({ node, original: text }) => {
        if (lang === 'en') { node.nodeValue = text; return; }
        const key = text.trim().replace(/\s+/g, ' ');
        const result = translate(key);
        // فاصله اول و آخر حفظ شود (مثلا «SEARCH » قبل از فلش)
        node.nodeValue = result === key ? text : text.match(/^\s*/)[0] + result + text.match(/\s*$/)[0];
    });
    attrItems.forEach(({ el, attr, original: value }) => {
        el.setAttribute(attr, lang === 'en' ? value : translate(value));
    });
    document.title = lang === 'en' ? original.title : translate(original.title);
    metaDescription.content = lang === 'en' ? original.description : translate(original.description);
    datesInput.value = lang === 'en' ? original.dates : translate(original.dates);
}

function setLanguage(lang, save = true) {
    currentLang = lang;
    const root = document.documentElement;
    root.lang = lang;
    root.dir = isFa() ? 'rtl' : 'ltr'; // CSS برای html[lang="fa"] و html[dir="rtl"] آماده است

    translateStatic(lang);

    // بخش‌های پویا
    pills[0].textContent = isFa() ? `همه ویلاها · ${num(villas.length)}` : `All villas · ${villas.length}`;
    renderVillaOptions();
    showDefaultNotice();
    updateBooking();

    // دکمه‌های زبان
    langLinks.forEach((link) => {
        if (link.getAttribute('lang') === lang) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });
    footerLangLink.textContent = isFa() ? 'English' : 'فارسی';
    footerLangLink.setAttribute('lang', isFa() ? 'en' : 'fa');

    if (save) {
        try { localStorage.setItem('elena-lang', lang); } catch { /* ذخیره‌سازی ممکن است بسته باشد */ }
    }
}

// کلیک روی EN / فارسی در هدر (href ها فقط برای حالتی است که JS کار نکند)
langLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        setLanguage(link.getAttribute('lang'));
    });
});
// لینک پایین صفحه زبان مقابل را انتخاب می‌کند
footerLangLink.addEventListener('click', (e) => {
    e.preventDefault();
    setLanguage(isFa() ? 'en' : 'fa');
});

/* =====================================================================
   ۹) شروع: زبان ذخیره‌شده (پیش‌فرض انگلیسی)
   ===================================================================== */
let savedLang = 'en';
try { savedLang = localStorage.getItem('elena-lang') || 'en'; } catch { /* ignore */ }
setLanguage(savedLang === 'fa' ? 'fa' : 'en', false);