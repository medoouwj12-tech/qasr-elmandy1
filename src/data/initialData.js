// Initial official dataset for Qasr Al-Mandi (قصر المندي)

export const INITIAL_CATEGORIES = [
  {
    id: "cat_1",
    name_ar: "وجبات قصر المندى واللحوم",
    name_en: "Mandi & Meat Meals",
    icon: "UtensilsCrossed",
    order: 1
  },
  {
    id: "cat_2",
    name_ar: "صوانى قصر المندى",
    name_en: "Qasr Al-Mandi Platters",
    icon: "Flame",
    order: 2
  },
  {
    id: "cat_3",
    name_ar: "ركن المشويات",
    name_en: "Grill Corner",
    icon: "Beef",
    order: 3
  },
  {
    id: "cat_4",
    name_ar: "سندوتشات",
    name_en: "Sandwiches",
    icon: "Sandwich",
    order: 4
  },
  {
    id: "cat_5",
    name_ar: "مشروبات قصر المندى",
    name_en: "Beverages",
    icon: "Coffee",
    order: 5
  }
];

export const INITIAL_PRODUCTS = [
  // ==========================================
  // Category 1: وجبات قصر المندى واللحوم (cat_1)
  // ==========================================
  {
    id: "p_mandi_nos_farakh",
    category_id: "cat_1",
    name: "نص فراخ مندي على رز بسمتي",
    price: 270.00,
    description: "دجاج طازج متبل بتتبيلة قصر المندي مع رز بسمتي فاخر وكشنة المندي - يقدم مع: شوربة + سلطة + طحينة + صلصة + رغيف عيش",
    image: "/images/nos-farakh-mandi.jpeg",
    is_available: true,
    is_popular: true,
    order: 1
  },
  {
    id: "p_mandi_rob_farakh",
    category_id: "cat_1",
    name: "ربع فراخ مندى",
    price: 170.00,
    description: "ربع دجاج مندي طازج مع أرز بسمتي فاخر وكشنة المندي وصوص وسلطات وشوربة",
    image: "/images/nos-farakh-mandi.jpeg",
    is_available: true,
    is_popular: true,
    order: 2
  },
  {
    id: "p_mandi_farakh_kamla",
    category_id: "cat_1",
    name: "فرخة مندي مع رز بسمتي (صينية بدوي)",
    price: 600.00,
    description: "فرخة مندي كاملة مع رز بسمتي وشوربة وسلطة وطحينة تكفي 4 أفراد سفرة أو تيك أواي",
    image: "/images/nos-farakh-mandi.jpeg",
    is_available: true,
    is_popular: true,
    order: 3
  },
  {
    id: "p_mandi_rob_lahma",
    category_id: "cat_1",
    name: "ربع لحمة مندي على رز بسمتي",
    price: 400.00,
    description: "لحم ضاني طازج ذبح يومي مع رز بسمتي فاخر وتتبيلة خاصة سر الطعم الأصيل من ديار اليمن لأهل دهب",
    image: "/images/rob-lahma-mandi.jpeg",
    is_available: true,
    is_popular: true,
    order: 4
  },
  {
    id: "p_mandi_rob_maez",
    category_id: "cat_1",
    name: "ربع لحمة ماعز مندي",
    price: 400.00,
    description: "لحم ماعز بلدي طازج على الطريقة المندي مع أرز بسمتي فاخر وصوص وسلطات",
    image: "/images/rob-lahma-mandi.jpeg",
    is_available: true,
    is_popular: false,
    order: 5
  },
  {
    id: "p_mandi_mozza",
    category_id: "cat_1",
    name: "موزة ضانى مندى",
    price: 550.00,
    description: "موزة ضاني مطبوخة على أصول المندي اليمني مع أرز بسمتي فاخر وشوربة وصوص",
    image: "/images/rob-lahma-mandi.jpeg",
    is_available: true,
    is_popular: true,
    order: 6
  },
  {
    id: "p_mabkoba_lahma_dani",
    category_id: "cat_1",
    name: "ربع مكرونة مبكبكة باللحمة الضاني",
    price: 450.00,
    description: "طعم الأصالة بنكهة دهب باللحم الضاني الطازج - يقدم مع الوجبة: شوربة + سلطة + طحينة + صلصة + رغيف عيش",
    image: "/images/mabkoba-lahma-4.jpeg",
    is_available: true,
    is_popular: true,
    order: 7
  },
  {
    id: "p_mabkoba_libi_nos",
    category_id: "cat_1",
    name: "نص مكرونة مبكبكة باللحمة الضاني",
    price: 900.00,
    description: "أصل المكرونة المبكبكة الليبي باللحم الضاني الصافي والتتبيلة الحارة المميزة",
    image: "/images/mabkoba-libi.jpeg",
    is_available: true,
    is_popular: true,
    order: 8
  },
  {
    id: "p_mabkoba_shambari",
    category_id: "cat_1",
    name: "ربع كيلو مبكبكة بالحمة الشمبري",
    price: 270.00,
    description: "مبكبكة باللحمة الشمبري العجالي على أصولها - يقدم مع الوجبة: شوربة + سلطة + طحينة + صلصة + رغيف عيش",
    image: "/images/mabkoba-shambari-4.jpeg",
    is_available: true,
    is_popular: true,
    order: 9
  },
  {
    id: "p_mix_mandi_farakh_lahma",
    category_id: "cat_1",
    name: "مكس مندي (ربع فراخ + ربع لحمة)",
    price: 550.00,
    description: "وجبة مكس مندي ربع فراخ + ربع لحمة مع أرز بسمتي وشوربة وسلطات وصوص تكفي فردين",
    image: "/images/rob-lahma-mandi.jpeg",
    is_available: true,
    is_popular: true,
    order: 10
  },
  {
    id: "p_mix_mandi_lahoom",
    category_id: "cat_1",
    name: "نص مشكل لحوم مندى",
    price: 800.00,
    description: "تشكيلة مندي لحوم فاخرة مع أرز بسمتي وخضار وشوربة وصوص",
    image: "/images/rob-lahma-mandi.jpeg",
    is_available: true,
    is_popular: true,
    order: 11
  },
  {
    id: "p_mandi_neefa",
    category_id: "cat_1",
    name: "نصف كيلو نيفة",
    price: 700.00,
    description: "نصف كيلو نيفة مشوية ومسواة على الحطب مع أرز وشوربة وصوص",
    image: "/images/rob-lahma-mandi.jpeg",
    is_available: true,
    is_popular: false,
    order: 12
  },
  {
    id: "p_mandi_rob_teis",
    category_id: "cat_1",
    name: "ربع تيس مندى 2.5 كيلو",
    price: 3250.00,
    description: "ربع تيس مندي بلدي فاخر مع أرز بسمتي وسلطات وصوصات قصر المندي",
    image: "/images/rob-lahma-mandi.jpeg",
    is_available: true,
    is_popular: true,
    order: 13
  },
  {
    id: "p_mandi_saman_mahshi",
    category_id: "cat_1",
    name: "اثنان فرد سمان محشي مندى",
    price: 400.00,
    description: "2 فرد سمان محشي بالأرز بالخلطة والتوابل المندي مع صوص وشوربة",
    image: "/images/saman-mashwi.jpeg",
    is_available: true,
    is_popular: false,
    order: 14
  },
  {
    id: "p_mandi_kabsa_biryani",
    category_id: "cat_1",
    name: "دجاج كبسة أو برياني",
    price: 300.00,
    description: "أرز برياني فاخر مع دجاج محمر والتوابل الخليجية المميزة",
    image: "/images/nos-farakh-mandi.jpeg",
    is_available: true,
    is_popular: false,
    order: 15
  },

  // ==========================================
  // Category 2: صوانى قصر المندى (cat_2)
  // ==========================================
  {
    id: "p_tray_elhana",
    category_id: "cat_2",
    name: "صنية الهنا",
    price: 900.00,
    description: "6 وراك مشوية على الفحم + 6 صوابع سجق مشوي على الفحم بصوص حار + 6 صوابع كفتة",
    image: "/images/tray-elhana.jpeg",
    is_available: true,
    is_popular: true,
    order: 1
  },
  {
    id: "p_tray_eldalaa",
    category_id: "cat_2",
    name: "صنية الدلع",
    price: 1200.00,
    description: "كيلو استربس (اسبايسي أو عادي حسب الطلب) + كيلو كفتة عجالي مشوي على الفحم",
    image: "/images/tray-eldalaa.jpeg",
    is_available: true,
    is_popular: true,
    order: 2
  },
  {
    id: "p_tray_elhubb",
    category_id: "cat_2",
    name: "صنية الحب",
    price: 800.00,
    description: "ربع لحمة مندي + ربع طرب + ربع كفتة + رز بسمتي + شوربة سلامات",
    image: "/images/tray-elhubb.jpeg",
    is_available: true,
    is_popular: true,
    order: 3
  },
  {
    id: "p_tray_elsabahia",
    category_id: "cat_2",
    name: "صنية الصباحية",
    price: 900.00,
    description: "2 حمام + ربع كفتة + ربع ممبار + محشي ورق عنب",
    image: "/images/tray-elsabahia.jpeg",
    is_available: true,
    is_popular: true,
    order: 4
  },
  {
    id: "p_tray_rob_teis",
    category_id: "cat_2",
    name: "صنية ربع تيس",
    price: 3000.00,
    description: "ربع تيس ماعز كامل - كفتة - نص كبدة - 2 سمان - نص سجق - كيلو محاشى ورق عنب وممبار - 2 طاجن ملوخية قصر مندى - بامية - سلطات - شوربة",
    image: "/images/rob-lahma-mandi.jpeg",
    is_available: true,
    is_popular: true,
    order: 5
  },
  {
    id: "p_tray_thomn_teis_super",
    category_id: "cat_2",
    name: "صنية ثمن تيس سوبر",
    price: 4200.00,
    description: "ثمن تيس - فرخة مندى او مشوى - 12 قطعة كفتة - 24 قطعة شيش طاووق - 8 قطعة طرب ضانى - ارز - 2 سمان - 1 كيلو محاشى - صصوص",
    image: "/images/rob-lahma-mandi.jpeg",
    is_available: true,
    is_popular: true,
    order: 6
  },
  {
    id: "p_tray_tawfeer",
    category_id: "cat_2",
    name: "صنية التوفير",
    price: 3200.00,
    description: "كيلو لحمة مندى - 2 كيلو فراخ - كيلو كفتة - ارز - صوص - سلطات - 2 سمان",
    image: "/images/kofta-200.jpeg",
    is_available: true,
    is_popular: true,
    order: 7
  },
  {
    id: "p_tray_abo_shanab",
    category_id: "cat_2",
    name: "صينية ابو شنب",
    price: 1100.00,
    description: "دى هتخليك أسد .. تشكيلة مشاوي ومندي أبو شنب على الفحم والرز البسمتي",
    image: "/images/kebab-qeta.jpeg",
    is_available: true,
    is_popular: true,
    order: 8
  },
  {
    id: "p_tray_dalaa_karshak",
    category_id: "cat_2",
    name: "صينية دلع كرشك",
    price: 1300.00,
    description: "فرخه مع ربع كفتة وربع لحمة .. مع محاشى و ممبار و سمبوسه وسلطات",
    image: "/images/tarab-dani.jpeg",
    is_available: true,
    is_popular: true,
    order: 9
  },
  {
    id: "p_tray_habiba",
    category_id: "cat_2",
    name: "صنيه الحبيبه (تكفي 5 أفراد)",
    price: 1800.00,
    description: "ربع طرب - موزة ضاني - نصف ممبار - فرخة - ربع كفتة - 2 كيلو رز سرفيس",
    image: "/images/tarb-dani-full.jpeg",
    is_available: true,
    is_popular: true,
    order: 10
  },
  {
    id: "p_tray_fakhm",
    category_id: "cat_2",
    name: "صينية الفخم",
    price: 700.00,
    description: "نص فرخه مع ربع كفته و ربع طرب .. ممبار ورز بسمتي وسلطات",
    image: "/images/nos-farakh-mashwi.jpeg",
    is_available: true,
    is_popular: false,
    order: 11
  },
  {
    id: "p_tray_sohab",
    category_id: "cat_2",
    name: "صينية الصحاب",
    price: 700.00,
    description: "نص فرخه مع ربع لحمة ضانى .. بطاطس - ارز بسمتى - سلطة - شوربة - طحينة",
    image: "/images/nos-farakh-mashwi.jpeg",
    is_available: true,
    is_popular: true,
    order: 12
  },
  {
    id: "p_tray_rawqan",
    category_id: "cat_2",
    name: "صينية الروقان",
    price: 900.00,
    description: "ربع لحمة .. ثمن كفته .. ربع سجق .. ربع ممبار مع 1 حمام وأرز بسمتي",
    image: "/images/sojok-mashwi.jpeg",
    is_available: true,
    is_popular: true,
    order: 13
  },
  {
    id: "p_tray_oshaq",
    category_id: "cat_2",
    name: "صينية العشاق",
    price: 700.00,
    description: "ربع فراخ مندى + ربع لحمة ضانى او ماعز + ربع كفته مع شوربة وسلطه وطحينة",
    image: "/images/kofta-200.jpeg",
    is_available: true,
    is_popular: true,
    order: 14
  },
  {
    id: "p_tray_muallem",
    category_id: "cat_2",
    name: "صنية المعلم ابو ربع واحد بس",
    price: 2000.00,
    description: "ربع لحمه - ربع كفتة - ربع سجق - ربع كبدة - ربع طرب - ربع ممبار - ربع شيش كباب",
    image: "/images/kebab-qeta.jpeg",
    is_available: true,
    is_popular: true,
    order: 15
  },
  {
    id: "p_tray_panadol",
    category_id: "cat_2",
    name: "صنية بنادول السعادة",
    price: 1600.00,
    description: "نصف فراخ مشوي - ربع كفته - ربع طرب - نصف لحمه - ربع سجق",
    image: "/images/reyash-mashwi.jpeg",
    is_available: true,
    is_popular: true,
    order: 16
  },
  {
    id: "p_tray_ozooma",
    category_id: "cat_2",
    name: "صنية العزومه 10 أفراد",
    price: 2800.00,
    description: "فرخه مندي - نصف فرخه شيش - فراخ مشوى تكا - كيلو كفته - كيلو سجق جزاري مشوى - ربع كبدة اسكندراني",
    image: "/images/shish-tawooq.jpeg",
    is_available: true,
    is_popular: true,
    order: 17
  },
  {
    id: "p_tray_abo_sayed",
    category_id: "cat_2",
    name: "صنيه ابو السيد",
    price: 1200.00,
    description: "ربع لحمه ماعز او ضاني - ربع كباب عجالي - ربع طرب - نصف فرخه",
    image: "/images/tarb-dani-full.jpeg",
    is_available: true,
    is_popular: false,
    order: 18
  },
  {
    id: "p_tray_andalus",
    category_id: "cat_2",
    name: "صنيه الاندلس",
    price: 900.00,
    description: "فرخه كامله - نصف كفته - نصف سجق مشوي بصوص البربكيو الحار",
    image: "/images/sojok-mashwi.jpeg",
    is_available: true,
    is_popular: false,
    order: 19
  },
  {
    id: "p_tray_osra",
    category_id: "cat_2",
    name: "صنيه الاسره (تكفي 2 كبار و 2 اطفال)",
    price: 900.00,
    description: "نصف فرخه مندي او مشوي - ربع كفته - ربع كباب - ربع سجق - سرفيس 3 شوربة وسلطات 3 أنواع",
    image: "/images/nos-farakh-mashwi.jpeg",
    is_available: true,
    is_popular: true,
    order: 20
  },
  {
    id: "p_tray_amoora_dahab",
    category_id: "cat_2",
    name: "صنيه الاموره دهب",
    price: 1500.00,
    description: "ربع لحمه ماعز - ربع فراخ - ربع كفته - ربع طرب - ربع سجق - ربع كبده - سلطات وشوربة (تكفي 4 افراد كبار)",
    image: "/images/reyash-mashwi.jpeg",
    is_available: true,
    is_popular: true,
    order: 21
  },
  {
    id: "p_tray_mix_grill",
    category_id: "cat_2",
    name: "مكس جريل",
    price: 500.00,
    description: "نصف فرخه مشويه مع رز بسمتي وشوربة وسلطات وربع طرب على كفته",
    image: "/images/kebab-qeta.jpeg",
    is_available: true,
    is_popular: true,
    order: 22
  },

  // ==========================================
  // Category 3: ركن المشويات (cat_3)
  // ==========================================
  {
    id: "p_grill_ard_kofta",
    category_id: "cat_3",
    name: "عرض الربع كيلو كفتة مشوية",
    price: 200.00,
    description: "عرض خاص: ربع كيلو كفتة (6 صوابع) + رز بسمتي + شوربة + خضار + سلطة + طحينة + صوص + 2 عيش",
    image: "/images/kofta-200.jpeg",
    is_available: true,
    is_popular: true,
    order: 1
  },
  {
    id: "p_grill_kebab_qeta",
    category_id: "cat_3",
    name: "كباب قطع مشوية على الفحم",
    price: 300.00,
    description: "كباب قطع مشوية على الفحم بلدي فاخر - تقدم مع: عيش + صلصة + طحينة",
    image: "/images/kebab-qeta.jpeg",
    is_available: true,
    is_popular: true,
    order: 2
  },
  {
    id: "p_grill_tarb_rob",
    category_id: "cat_3",
    name: "ربع كيلو طرب ضاني",
    price: 300.00,
    description: "طرب ضاني أصل المندي مشوي على الفحم طازج ذبح وفرم يومي - رز وخضار وشوربة",
    image: "/images/tarb-dani-full.jpeg",
    is_available: true,
    is_popular: true,
    order: 3
  },
  {
    id: "p_grill_tarb_dani",
    category_id: "cat_3",
    name: "طرب ضاني مشوي",
    price: 300.00,
    description: "طرب ضاني مشوي على الفحم - طعم يذوب وطراوة ما تتقاوم مع أرز بسمتي وسلطات",
    image: "/images/tarab-dani.jpeg",
    is_available: true,
    is_popular: true,
    order: 4
  },
  {
    id: "p_grill_reyash_mashwi",
    category_id: "cat_3",
    name: "ريش مشوي على الفحم",
    price: 350.00,
    description: "ريش ضاني بلدي مشوية على الفحم بتتبيلة قصر المندي الخاصة - طعم يذوب وطراوة ما تتقاوم",
    image: "/images/reyash-mashwi.jpeg",
    is_available: true,
    is_popular: true,
    order: 5
  },
  {
    id: "p_grill_nos_farakh",
    category_id: "cat_3",
    name: "نص فراخ مشوي على الفحم",
    price: 220.00,
    description: "نصف دجاجة مشوية على الفحم بتتبيلة سرية خاصة مع أرز بسمتي وبطاطس وخضار مشوي",
    image: "/images/nos-farakh-mashwi.jpeg",
    is_available: true,
    is_popular: true,
    order: 6
  },
  {
    id: "p_grill_rob_farakh_sadr",
    category_id: "cat_3",
    name: "ربع فرخة مشوية صدر",
    price: 160.00,
    description: "ربع دجاج مشوي صدر على الفحم مع أرز بسمتي وخضار وشوربة وسلطات",
    image: "/images/nos-farakh-mashwi.jpeg",
    is_available: true,
    is_popular: false,
    order: 7
  },
  {
    id: "p_grill_farakh_kamla",
    category_id: "cat_3",
    name: "فرخة مشوية كاملة على الفحم",
    price: 440.00,
    description: "دجاجة كاملة مشوية على الفحم مع أرز و2 خضار و2 شوربة وسلطات",
    image: "/images/nos-farakh-mashwi.jpeg",
    is_available: true,
    is_popular: true,
    order: 8
  },
  {
    id: "p_grill_kebda_mashwi",
    category_id: "cat_3",
    name: "ربع كبدة مشوي على الفحم البلدي",
    price: 300.00,
    description: "كبدة بلدي مشوية على الفحم بريحة وطعم لا يقاوم - يقدم مع: شوربة + سلطة + طحينة + صلصة + رغيف عيش",
    image: "/images/kebda-mashwi-4.jpeg",
    is_available: true,
    is_popular: true,
    order: 9
  },
  {
    id: "p_grill_kebda_dani",
    category_id: "cat_3",
    name: "كبدة ضاني على الفحم",
    price: 300.00,
    description: "كبدة ضاني صافي مشوية على الفحم بتتبيلة أصل المندي - يقدم مع طحينة وصلصة وعيش ومخلل وبصل",
    image: "/images/kebda-dani.jpeg",
    is_available: true,
    is_popular: true,
    order: 10
  },
  {
    id: "p_grill_sojok_mashwi",
    category_id: "cat_3",
    name: "سجق مشوي على الفحم",
    price: 200.00,
    description: "سجق مشوي على الفحم بتتبيلة سرية خلطة أصل المندي - يقدم مع طحينة وصلصة وعيش ومخلل وبصل",
    image: "/images/sojok-mashwi.jpeg",
    is_available: true,
    is_popular: true,
    order: 11
  },
  {
    id: "p_grill_shish_tawooq",
    category_id: "cat_3",
    name: "شيش طاووق أصل المندي",
    price: 250.00,
    description: "شيش طاووق بتتبيلة المستردة والبرتقال الخاصة مع بطاطس وأرز بسمتي وتومية",
    image: "/images/shish-tawooq.jpeg",
    is_available: true,
    is_popular: true,
    order: 12
  },
  {
    id: "p_grill_saman_mashwi",
    category_id: "cat_3",
    name: "سمان مشوي على الفحم",
    price: 300.00,
    description: "2 فرد سمان مشوي على الفحم بتتبيلة خاصة سر الطعم الأصيل مع خضار مشوي وصوص",
    image: "/images/saman-mashwi.jpeg",
    is_available: true,
    is_popular: true,
    order: 13
  },
  {
    id: "p_grill_saman_mahshi",
    category_id: "cat_3",
    name: "اتنين فرد سمان محشى",
    price: 400.00,
    description: "2 فرد سمان محشي بالأرز بالخلطة مع أرز وخضار وشوربة",
    image: "/images/saman-mashwi.jpeg",
    is_available: true,
    is_popular: false,
    order: 14
  },
  {
    id: "p_grill_fard_saman",
    category_id: "cat_3",
    name: "فرد سمان مشوي",
    price: 200.00,
    description: "فرد سمان مشوي طازج على الفحم مع صوص وسلطات",
    image: "/images/saman-mashwi.jpeg",
    is_available: true,
    is_popular: false,
    order: 15
  },
  {
    id: "p_grill_fard_hamam",
    category_id: "cat_3",
    name: "فرد حمام مشوي / محشي",
    price: 250.00,
    description: "فرد حمام بلدي محشي أو مشوي مع سلطات وعيش وشوربة",
    image: "/images/saman-mashwi.jpeg",
    is_available: true,
    is_popular: true,
    order: 16
  },
  {
    id: "p_grill_hamam_kofta",
    category_id: "cat_3",
    name: "فرد حمام مع ثمن كفته",
    price: 300.00,
    description: "فرد حمام مع ثمن كيلو كفتة مشوية ورز بسمتي مندي وشوربة وسلطات",
    image: "/images/kofta-200.jpeg",
    is_available: true,
    is_popular: true,
    order: 17
  },
  {
    id: "p_grill_farakh_kofta",
    category_id: "cat_3",
    name: "وجبة ربع فراخ وثمن كفته",
    price: 250.00,
    description: "ربع فرخة مشوية مع ثمن كفتة ورز بسمتي وشوربة وسلطات",
    image: "/images/nos-farakh-mashwi.jpeg",
    is_available: true,
    is_popular: false,
    order: 18
  },
  {
    id: "p_grill_fetello",
    category_id: "cat_3",
    name: "ربع فتلو مشوى",
    price: 300.00,
    description: "لحم بتلو طري جداً مشوي على الفحم مع أرز وخضار وشوربة",
    image: "/images/reyash-mashwi.jpeg",
    is_available: true,
    is_popular: false,
    order: 19
  },
  {
    id: "p_grill_mozza_mashwi",
    category_id: "cat_3",
    name: "موزة ضانى مشوية",
    price: 550.00,
    description: "موزة ضاني مشوية على الفحم بدقة قصر المندي مع أرز بسمتي",
    image: "/images/rob-lahma-mandi.jpeg",
    is_available: true,
    is_popular: true,
    order: 20
  },
  {
    id: "p_grill_kilo_kofta_dani",
    category_id: "cat_3",
    name: "كيلو كفتة ضانى مشوية",
    price: 800.00,
    description: "كيلو كفتة ضاني بلدي مشوية على الفحم مع سلطات وطحينة وعيش",
    image: "/images/kofta-200.jpeg",
    is_available: true,
    is_popular: true,
    order: 21
  },
  {
    id: "p_grill_kilo_kofta_agali",
    category_id: "cat_3",
    name: "كيلو كفته عجانى مشوية",
    price: 800.00,
    description: "كيلو كفتة عجالي بلدي مشوية + سلطات وصوص طحينة وعيش",
    image: "/images/kofta-200.jpeg",
    is_available: true,
    is_popular: false,
    order: 22
  },
  {
    id: "p_grill_kilo_kebab_dani",
    category_id: "cat_3",
    name: "كيلو كباب ضانى",
    price: 1400.00,
    description: "كيلو كباب ضاني بلدي فاخر مشوي على الفحم مع سلطات وعيش",
    image: "/images/kebab-qeta.jpeg",
    is_available: true,
    is_popular: true,
    order: 23
  },
  {
    id: "p_grill_kilo_kebab_agali",
    category_id: "cat_3",
    name: "كيلو كباب عجانى",
    price: 1100.00,
    description: "كيلو كباب عجالي طازج مشوي على الفحم مع سلطات وعيش",
    image: "/images/kebab-qeta.jpeg",
    is_available: true,
    is_popular: false,
    order: 24
  },
  {
    id: "p_grill_kilo_tarb_dani",
    category_id: "cat_3",
    name: "كيلو طرب ضانى",
    price: 900.00,
    description: "كيلو طرب ضاني بلدي فاخر مشوي على الفحم",
    image: "/images/tarb-dani-full.jpeg",
    is_available: true,
    is_popular: true,
    order: 25
  },
  {
    id: "p_grill_kilo_mix_kebab_kofta",
    category_id: "cat_3",
    name: "مشكل كباب على كفته (كيلو)",
    price: 1200.00,
    description: "نصف كيلو كباب ونصف كيلو كفتة مشوية على الفحم + سلطات وعيش",
    image: "/images/kebab-qeta.jpeg",
    is_available: true,
    is_popular: true,
    order: 26
  },
  {
    id: "p_grill_kilo_mix_mashwi",
    category_id: "cat_3",
    name: "كيلو مشكل مكس مشوي",
    price: 1100.00,
    description: "ربع كباب + ربع طرب + ربع كفته + ربع ريش مع بيت كلوة وسلطات وعيش",
    image: "/images/reyash-mashwi.jpeg",
    is_available: true,
    is_popular: true,
    order: 27
  },
  {
    id: "p_grill_nos_mix_mashwi",
    category_id: "cat_3",
    name: "نصف مشكل مكس مشوي",
    price: 600.00,
    description: "ربع فراخ + ثمن كفتة + ثمن لحم مشوي + رز بسمتي وشوربة وسلطة وعيش",
    image: "/images/nos-farakh-mashwi.jpeg",
    is_available: true,
    is_popular: false,
    order: 28
  },

  // ==========================================
  // Category 4: سندوتشات (cat_4)
  // ==========================================
  {
    id: "p_sand_kofta_baladi",
    category_id: "cat_4",
    name: "سندوتش كفته بلدى",
    price: 80.00,
    description: "كفتة بلدي مشوية في عيش بلدي طازج مع الطحينة والسلطة",
    image: "/images/kofta-200.jpeg",
    is_available: true,
    is_popular: true,
    order: 1
  },
  {
    id: "p_sand_kofta_dani",
    category_id: "cat_4",
    name: "سندوتش كفته ضانى",
    price: 80.00,
    description: "سندوتش كفتة ضاني بلدي مشوية على الفحم",
    image: "/images/kofta-200.jpeg",
    is_available: true,
    is_popular: true,
    order: 2
  },
  {
    id: "p_sand_hawawshi",
    category_id: "cat_4",
    name: "حواوشي بلدي فاخر",
    price: 70.00,
    description: "حواوشي بلدي طازج بالخلطة السرية لقصر المندي مخبوز طازج",
    image: "/images/kofta-200.jpeg",
    is_available: true,
    is_popular: true,
    order: 3
  },
  {
    id: "p_sand_kebab_baladi",
    category_id: "cat_4",
    name: "سندوتش كباب بلدى",
    price: 100.00,
    description: "كباب بلدي مشوي على الفحم في عيش بلدي وسلطات وطحينة",
    image: "/images/kebab-qeta.jpeg",
    is_available: true,
    is_popular: true,
    order: 4
  },
  {
    id: "p_sand_kebab_dani",
    category_id: "cat_4",
    name: "سندوتش كباب ضانى",
    price: 90.00,
    description: "سندوتش كباب ضاني فاخر مشوي على الفحم",
    image: "/images/kebab-qeta.jpeg",
    is_available: true,
    is_popular: false,
    order: 5
  },
  {
    id: "p_sand_tarb_dani",
    category_id: "cat_4",
    name: "سندوتش طرب ضانى",
    price: 90.00,
    description: "سندوتش طرب ضاني مشوي على الفحم مع الطحينة",
    image: "/images/tarb-dani-full.jpeg",
    is_available: true,
    is_popular: true,
    order: 6
  },
  {
    id: "p_sand_shish_tawooq",
    category_id: "cat_4",
    name: "سندوتش شيش طاووق",
    price: 90.00,
    description: "سندوتش شيش طاووق بتتبيلة المستردة والبرتقال مع التومية",
    image: "/images/shish-tawooq.jpeg",
    is_available: true,
    is_popular: false,
    order: 7
  },
  {
    id: "p_sand_sojok_baladi",
    category_id: "cat_4",
    name: "سندوتش سجق بلدى",
    price: 100.00,
    description: "سندوتش سجق بلدي مشوي على الفحم مع الطحينة والصلصة",
    image: "/images/sojok-mashwi.jpeg",
    is_available: true,
    is_popular: false,
    order: 8
  },
  {
    id: "p_sand_sojok_dani",
    category_id: "cat_4",
    name: "سندوتش سجق ضانى",
    price: 70.00,
    description: "سندوتش سجق ضاني مميز بتتبيلة قصر المندي",
    image: "/images/sojok-mashwi.jpeg",
    is_available: true,
    is_popular: false,
    order: 9
  },

  // ==========================================
  // Category 5: مشروبات قصر المندى (cat_5)
  // ==========================================
  {
    id: "p_drink_tea_badawi",
    category_id: "cat_5",
    name: "شاي زرد بدوي على الفحم",
    price: 60.00,
    description: "شاي بدوي مخدر على الفحم بالحَبَق والنبوة والريحان",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80",
    is_available: true,
    is_popular: true,
    order: 1
  },
  {
    id: "p_drink_lemon_mint",
    category_id: "cat_5",
    name: "عصير ليمون نعناع فريش",
    price: 50.00,
    description: "عصير ليمون بالنعناع الطازج مثلج ومنعش",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80",
    is_available: true,
    is_popular: true,
    order: 2
  },
  {
    id: "p_drink_water_small",
    category_id: "cat_5",
    name: "مياه معدنية صغيرة",
    price: 10.00,
    description: "زجاجة مياه معدنية 500 مل",
    image: "https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=800&q=80",
    is_available: true,
    is_popular: false,
    order: 3
  },
  {
    id: "p_drink_water_large",
    category_id: "cat_5",
    name: "مياه معدنية كبيرة",
    price: 20.00,
    description: "زجاجة مياه معدنية 1.5 لتر",
    image: "https://images.unsplash.com/photo-1560023907-5f339617ea30?auto=format&fit=crop&w=800&q=80",
    is_available: true,
    is_popular: false,
    order: 4
  }
];

export const OFFICIAL_WHATSAPP_NUMBERS = [
  { number: "01066568284", label: "الرقم الرئيسي 1", display: "01066568284" },
  { number: "01098128320", label: "الرقم الرئيسي 2", display: "01098128320" }
];
