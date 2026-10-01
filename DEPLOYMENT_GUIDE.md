# 🚀 دليل رفع وتشغيل مشروع "قصر المندي" على GitHub و Vercel و Supabase

هذا الدليل يشرح لك خطوة بخطوة: إنشاء قاعدة بيانات **Supabase**، ربط الموقع بها، ورفعه على **Vercel** — بحيث يتمكن صاحب المطعم من تعديل أي شيء في أي وقت، فيظهر التعديل لجميع الزبائن فور فتح الموقع.

---

## 📌 الخطوة 1: إنشاء مشروع Supabase

1. اذهب إلى [https://supabase.com](https://supabase.com) وسجّل الدخول (بحساب Google أو GitHub).
2. اضغط **"New Project"**:
   - **Name:** `qasr-al-mandi`
   - **Database Password:** اختر كلمة مرور قوية واحفظها في مكان آمن
   - **Region:** اختر أقرب منطقة (مثل `EU West` أو `US East`)
3. انتظر دقيقة حتى يكتمل إنشاء المشروع.

### نسخ رابط قاعدة البيانات (DATABASE_URL)

1. من لوحة المشروع اضغط **Connect** (أعلى الشاشة).
2. اختر تبويب **Postgres**.
3. من القائمة المنسدلة اختر **Session pooler** (منفذ `6543`).
4. انسخ الـ **URI** بالكامل، وسيبدو هكذا:

```text
postgresql://postgres.abcdefgh:[PASSWORD]@aws-0-eu-west-1.pooler.supabase.com:6543/postgres?sslmode=require
```

> ⚠️ تأكد أن الرابط يحتوي على `sslmode=require` **بدون** `channel_binding`.

### نسخ بيانات المشروع (URL + Anon Key)

1. من لوحة المشروع اضغط **Project Settings** (⚙️) ثم تبويب **API**.
2. انسخ قيمتين:
   - **Project URL** → مثل `https://abcdefgh.supabase.co`
   - **anon public** → مفتاح طويل يبدأ بـ `eyJ...`

### تجهيز حساب صاحب المطعم (تسجيل الدخول)

1. من لوحة المشروع اذهب إلى **Authentication** → تبويب **Sign In / Providers**.
2. تأكد أن **Email** مُفعّل، وأيقِف خيار **Confirm email** (لأن المستخدم الوحيد هو صاحب المطعم).
3. اذهب إلى **Authentication** → تبويب **Users** → اضغط **"Add user"**:
   - **Email:** بريد صاحب المطعم (مثل `owner@example.com`)
   - **Password:** كلمة مرور قوية (احفظها)
   - فعّل خيار **Auto Confirm User**
4. اضغط **Create user**.

---

## 📌 الخطوة 2: رفع الكود على GitHub

في مبنى المشروع، افتح PowerShell ونفّذ:

```bash
git add .
git commit -m "ربط المنيو بـ Supabase مع تسجيل دخول أدمن حقيقي"
git push -u origin main
```

---

## 📌 الخطوة 3: نشر الموقع على Vercel

1. اذهب إلى [https://vercel.com](https://vercel.com) وسجّل الدخول بحساب GitHub.
2. اضغط **"Add New"** → **Project** واختر مستودع `qasr-elmandy1`.
3. قبل الضغط على Deploy أضف **Environment Variables** الثلاثة:

| Key | القيمة |
|-----|--------|
| `DATABASE_URL` | رابط Session pooler الذي نسخته في الخطوة 1 |
| `VITE_SUPABASE_URL` | Project URL من Supabase |
| `VITE_SUPABASE_ANON_KEY` | مفتاح anon public من Supabase |

4. اضغط **Deploy** وانتظر حتى يكتمل النشر.

> 💡 بعد أي تعديل مستقبلي على الكود: ارفع على GitHub وسيرفع Vercel تلقائياً.

---

## 📌 الخطوة 4: تعبئة قاعدة البيانات (زرع المنيو كامل)

بعد نشر الموقع، افتح هذا الرابط مرة واحدة في المتصفح:

```text
https://qasr-elmandy1.vercel.app/api/init
```

ستظهر رسالة نجاح تؤكد إنشاء الجداول وحقن **78 وجبة + 5 أقسام**:

```json
{"success": true, "message": "Supabase database successfully initialized for Qasr Al-Mandi!", "total_categories": 5, "total_products": 78}
```

> ✅ الرابط آمن للتكرار — لن يمسح أي تعديلات قمت بها لاحقاً (يضيف فقط ما ينقص).
> 🔁 لاستعادة المنيو الأصلي بالكامل لاحقاً: استخدم زر **"ضبط المصنع"** داخل لوحة التحكم (يحتاج تسجيل دخول).

---

## 🔑 لوحة التحكم (Admin)

1. افتح الموقع واضغط **"دخول إدارة المطعم (Control Panel)"** في الفوتر.
2. سجّل الدخول بـ:
   - **البريد الإلكتروني:** البريد الذي أنشأته في الخطوة 1
   - **كلمة المرور:** كلمة المرور التي اخترتها
3. أي تعديل (سعر، إضافة، حذف، إخفاء وجبة، أقسام) **يُحفظ في Supabase** ويظهر لكل الزبائن عند فتح الموقع.

---

## 🛠️ حل المشاكل الشائعة

| المشكلة | الحل |
|---------|------|
| الصفحة تظهر وجبات قديمة | اضغط **"ضبط المصنع"** أو افتح `/api/init` من جديد، ثم أعد تحميل الصفحة |
| رسالة "لم يتم إعداد Supabase بعد" | تأكد أن `VITE_SUPABASE_URL` و `VITE_SUPABASE_ANON_KEY` مضافة في Vercel وأنك عملت **Redeploy** |
| رسالة 401 عند الحفظ | الجلسة انتهت — سجّل الخروج ثم الدخول مرة أخرى |
| رابط `DATABASE_URL` لا يعمل | تأكد أنك نسخت **Session pooler** (منفذ 6543) وليس **Direct** |
