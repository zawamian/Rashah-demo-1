import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ar' | 'tr';

const TRANSLATIONS = {
  en: {
    // Brand & Header
    brand_sub: "ARTISANAL CRUNCH & BLOOM",
    logo_sub: "ARTISANAL SPICE & GRAIN",
    logo_ar: "رشة",
    nav_home: "THE JOURNAL (HOME) — الرشة الأولى",
    nav_collections: "THE BATCH COLLECTIONS — كتلوج الكولكشن",
    nav_connect: "STOCKISTS INQUIRY — تواصل معنا",
    nav_cta: "STOCKIST INQUIRY",
    sections_label: "SYSTEM SECTIONS",
    meta_footer: "RASHAH © Riyadh, KSA",
    meta_sub: "COARSE & REFINED",

    // Hero Segment
    hero_title: "COARSE & REFINED HERITAGE PROVISIONS",
    hero_desc: "Curated Heirloom Spices & Small-Batch Granolas sourced from micro-climes of the Levant, Anatolia & Beyond. Formulating sensory contrasts in Riyadh, Saudi Arabia. Coarse textures baked slowly, designed to erupt in aromatic power upon the very first sprinkle.",
    hero_cta: "DISCOVER THE SERIES",

    // Lineup / Shop section
    lineup_title: "SHOP BY COLLECTION",
    lineup_subtitle: "Three distinct, premium culinary paths defined by texture and traditional milling recipes.",
    lineup_g_title: "01 / GRAIN MATRIX",
    lineup_g_desc: "Ancient oats, toasted nuts, cold-pressed raw tahini and Damascus rose petals.",
    lineup_s_title: "02 / FLOWER & SEED",
    lineup_s_desc: "Single-origin wild crops sun-dried and stone-broken for pure floral intensity.",
    lineup_c_title: "03 / COARSE HARMONY",
    lineup_c_desc: "Our master blends celebrating the coarse grain and untrimmed heat.",
    explore_btn: "EXPLORE THE INDEX",

    // Ethos
    ethos_label: "THE ETHOS",
    ethos_title: "A Living Dialogue Between Earth & Stone Milling",
    ethos_p1: "At Rashah, our name (meaning 'a light sprinkle' or 'fine gesture' in Arabic) describes our approach to food. We reject over-refinement, celebrating the coarse grain, the volcanic zest, and the untrimmed fiber of ancestral crops. Every jar holds a record of season, soil, and human hands.",
    ethos_p2: "Sourced directly through ethical micro-partners in dryland farms across Riyadh, Urfa, Aleppo, and the Mount Lebanon terraces, our provisions represent culinary resilience.",
    ethos_quote: '"The table is not a place of consumption, but a record of geographical truth."',

    // Collections Page & Filters
    provisions_index: "PROVISIONS INDEX",
    filtered_cat: "Filtered by category.",
    cat_all: "All",
    cat_granola: "Granola",
    cat_single: "Single Spices",
    cat_curated: "Curated Blends",
    add_to_batch: "ADD TO BATCH",
    add_more: "ADD MORE",
    full_specs: "FULL SPECS",
    quick_batch_insight: "QUICK BATCH INSIGHT",
    terroir_origin: "TERROIR / ORIGIN",
    net_weight: "NET WEIGHT",
    heritage_tasting_notes: "HERITAGE TASTING NOTES",
    valuation: "VALUATION",
    save_item: "Save Item",
    remove_saved: "Remove from Saved",
    featured_badge: "FEAT. SPOT",

    // Connect Page
    connect_title: "CONNECT WITH RASHAH",
    establish_parchment: "ESTABLISH PARCHMENT",
    connect_desc: "Inquire about micro-lot stockist arrangements, custom blending, or bespoke packaging requests for high-heritage hospitality.",
    form_surname: "Your Surname",
    form_email: "Email Address",
    form_vessel: "Vessel or Merchant Name (Optional)",
    form_msg: "Inquiry Message Description",
    form_submit: "SUBMIT DISPATCH",
    form_success_title: "MESSAGE SENT",
    form_success_desc: "Thank you. Our Riyadh cell will evaluate your inquiry.",

    // Flavor Matrix
    spice_p_matrix: "THE SPICE PROFILE MATRIX",
    inter_flavour: "Interactive Flavour Profiler",
    spice_profile_desc: "Select an ancestral spice profile below to map its characteristics overlayed on traditional pairings.",
    quick_recipe: "QUICK RECIPE SUGGESTION",
    provision_recommends: "PROVISION RECOMMENDS",

    // Bag Slider
    provision_bag: "PROVISION BAG",
    empty_bag: "Your bag is currently empty.",
    bag_total: "Total Value",
    proceed_to_secure: "PROCEED TO SECURE DISPATCH",
    clear_everything: "CLEAR EVERYTHING",
    dispatch_proxied: "DISPATCH PROXIED",
    bespoke_success: "Your bespoke provisions are successfully booked for direct distribution.",
    close_station: "CLOSE STATION",
    items_count: "items",
    item_count: "item",

    // NEW EXTENSIVE KEYS
    // Narrative Page
    narrative_est_sub: "ESTABLISHED IN SAUDI ARABIA",
    narrative_quote: '"We believe cooking is not a strict science of ounces, but a delicate art of small gestures."',
    narrative_title1: "The Genesis of Coarse Rubs.",
    narrative_p1_text1: "Rashah (رشة) was born out of a simple, rebellious dissatisfaction with the state of commercial seasonings. Modern culinary practices have reduced life-giving spices into uniform, tasteless powders which dissipate instantly upon storage. We asked ourselves: why allow the volatile botanical essential oils of premium herbs to perish inside industrial grinders?",
    narrative_p1_text2: "Our philosophy is centered on raw physical integrity. We do not grind our single spices to passive dust. Instead, we coarsely hand-rub premium green cardamom pods, crush volcanic sumac stones, and slice pecan kernels with surgical precision. This ensures that every individual cluster of granola or grain of za’atar stores its aromatics safely, releasing them only when they are crushed under bite, filling your palate with absolute, unfiltered truth.",
    narrative_title2: "From Riyadh, Infused Locally.",
    narrative_p2_text1: "As an artisanal brand, our heritage is deeply rooted in Riyadh's evolving culinary renaissance. We build on the ancient Arabic custom of hospitality—where spices are not hidden behind kitchen counters, but presented on the table with great pride and reverence. Our formulas blend Middle Eastern heritage flavors like wild Thyme, Sumac, and Loomi with contemporary botanical elements such as Rose Buds and Premium Maple.",
    narrative_p2_text2: "Every glass container that leaves our kitchen represents an authentic pact: you are receiving curated ingredients of unparalleled freshness, devoid of chemicals or refined sweeteners. Whether you are showering our Volcanic Sumac over cold home-strained labneh or scattering Rose Pecan loops onto fresh yogurt, you are participating in a quiet, ancestral revolution. One beautiful, deliberate gesture at a time.",
    narrative_founders: "The Founders of Rashah",
    narrative_logistics: "ARTISANAL FLAVOR LOGISTICS",

    // Connect Page Additions
    connect_form_verification: "Inquiry Verified & Registered.",
    connect_submit_another: "SUBMIT ANOTHER DISPATCH",
    connect_dossier_spec: "INQUIRY DOSSIER SPECIFICATION",
    connect_lbl_name: "FULL IDENTITY NAME *",
    connect_lbl_email: "DIGITAL CO-ORDINATES (EMAIL) *",
    connect_lbl_company: "VENUE / ORGANIZATION NAME *",
    connect_lbl_type: "REGISTRY INTENT TYPE",
    connect_opt_stockist: "Premium Cafe / Store Stockist Registry",
    connect_opt_custom: "Bespoke Culinary Formula Order",
    connect_opt_general: "Artisanal Brand Partnership / General",
    connect_lbl_msg: "PROJECT DESCRIPTION DETAIL *",
    connect_placeholder_name: "e.g. Sultan Al-Saud",
    connect_placeholder_email: "e.g. sultan@coffeebrands.sa",
    connect_placeholder_company: "e.g. Roaster & Thyme Cafe",
    connect_placeholder_msg: "Detail your requirements, bulk volumes, and delivery targets...",
    connect_submit_btn: "SUBMIT ENQUIRY DOSSIER",
    connect_transmitting: "TRANSMITTING BATCH ORDER REGISTER...",
    connect_partnerships: "PARTNERSHIPS REGISTRY",
    connect_stockist_registry: "THE STOCKISTS REGISTRY",
    connect_rep_excellence: "Representing Artisanal Excellence.",
    connect_rep_desc: "We supply selected high-end coffee salons, farm-to-table grocers, local hotel boutique groups, and curated concept stores across Saudi Arabia.",
    connect_digital_inbox: "DIGITAL INBOX",
    connect_logistics_centre: "RIYADH LOGISTICS CENTRE",
    connect_logistics_addr: "The Warehouse District, Al Malqa",
    connect_timing_lbl: "REGISTRY TIMING",
    connect_timing_val: "Sunday — Thursday / 09:00 — 17:00 AST",
    connect_bespoke_note: "Note on bespoke: We offer custom grain sizes, customized labeling, and specific single-spice moisture ratios for culinary establishments and premium corporate gifting arrays.",
    
    // Connect Errors
    err_name_required: "Full identity name is required.",
    err_email_required: "An email coordinate is required.",
    err_email_invalid: "Please provide a valid structural email address (e.g., name@domain.com).",
    err_company_required: "Company / Stockist venue name is required.",
    err_msg_required: "Please express detail on how Rashah can integrate into your portfolio.",
    err_msg_length: "Inquiry content should be at least 10 characters long to guarantee depth.",

    // Collections Page Additions
    collections_catalogue: "PROVISIONS CATALOGUE",
    collections_discoveries: "BATCHES DISCOVERED",
    collections_all_provisions: "ALL PROVISIONS",
    collections_investment: "INVESTMENT",
    collections_leaflet: "SPECIFICATION LEAFLET",
    collections_constituents: "CONSTITUENTS & INGREDIENTS:",
    collections_palate_notes: "PALATE & SERVICE NOTES:",
    collections_inquire_batch: "INQUIRE BATCH",
    collections_matching_stock: "MATCHING STOCK",
    collections_add_match: "ADD THIS MATCH TO BATCH",
    palette_science: "THE PALATE SCIENCE",
    interactive_flavor_head: "Interactive Flavor Profiling",
    interactive_flavor_desc: "Culinary synergy is born of precise contrast and calibration. Choose a library profile below to explore core flavor notes, sensory evaluations, and curated pairings.",
    select_raw_specimen: "SELECT RAW SPECIMEN",
    declared_organic: "DECLARED ORGANIC & IRRADIATED FREE",
    sensory_compass: "SENSORY COMPASS PROFILES",
    sensory_aromatics: "Aromatic Herbaceous Lift",
    sensory_acidity: "Citrus Tang / Acid",
    sensory_earthiness: "Earthy Mineral Depth",
    sensory_heat: "Capsicum Spark / Heat",
    sensory_sweetness: "Sweet Raisin/Honey undertone",
    herbaceous_notes: "HERBACEOUS NOTES",
    recommended_pairings: "RECOMMENDED PAIRINGS",
    testimonials_label: "FROM OUR COMMUNITY",
    testimonials_heading: "Trusted by discerning kitchens worldwide.",
  },
  ar: {
    // Brand & Header
    brand_sub: "طحن وقرمشة حرفية موروثة",
    logo_sub: "توابل وحبوب حرفية موروثة",
    logo_ar: "رشة",
    nav_home: "المجلة (الرئيسية) — الرشة الأولى",
    nav_collections: "التشكيلات والمنتجات — كتلوج الكولكشن",
    nav_connect: "اتصال ومراسلة — تواصل معنا",
    nav_cta: "طلب موزع معتمد",
    sections_label: "أقسام النظام",
    meta_footer: "رشة © الرياض، المملكة العربية السعودية",
    meta_sub: "خشن ومكرر",

    // Hero Segment
    hero_title: "مؤن تراثية خشنة ونقية موروثة",
    hero_desc: "بهارات متوارثة وغرانولا مصنوعة بدفعات صغيرة مستوردة من الأقاليم المناخية الدقيقة في بلاد الشام والأناضول وما وراءها. نبتكر تباينات حسية خلابة في الرياض، المملكة العربية السعودية. قوام خشن ومخبوز ببطء مذهل لتنفجر القوة العطرية من أول رشة.",
    hero_cta: "اكتشف المجموعة الكاملة",

    // Lineup / Shop section
    lineup_title: "تسوق حسب التشكيلة",
    lineup_subtitle: "ثلاثة مسارات طهي متميزة وفاخرة تحددها القوام ووصفات الطحن التقليدية السليمة.",
    lineup_g_title: "٠١ / مصفوفة الحبوب",
    lineup_g_desc: "الشوفان القديم، المكسرات المحمصة، الطحينة الخام المعصورة على البارد وبتلات الورد الدمشقي العطرة.",
    lineup_s_title: "٠٢ / الزهرة والبذرة",
    lineup_s_desc: "محاصيل برية فردية المصدر مجففة تحت أشعة الشمس ومكسورة لتجربة عطرية وزهرية نقية ونفاذة.",
    lineup_c_title: "٠٣ / الانسجام الخشن",
    lineup_c_desc: "خلطاتنا المبتكرة والفريدة التي تحتفي بالحبوب الخشنة والنكهات الحية والحرارة المتوازنة.",
    explore_btn: "تصفح معجم المنتجات",

    // Ethos
    ethos_label: "فلسفتنا وغايتنا",
    ethos_title: "حوار حي متصل بين الأرض وطحن الحجر القديم",
    ethos_p1: "اسمنا «رشة» يصف نهجنا الفريد والفاخر في الطعام. نحن نرفض التكرير الزائد الذي يفقد المحاصيل خواصها وغرابتها، ونحتفي بالحبوب الخشنة، والنكهات البركانية الحادة، والألياف الطبيعية الكاملة للمحاصيل المتوارثة. تحتوي كل جرة نصدرها على حكاية الموسم والتربة والأيدي البشرية الحرفية.",
    ethos_p2: "مستمدة ومطورة مباشرة عبر شراكات أخلاقية دقيقة مع مزارع جافة مستدامة في الرياض، وأورفة، وحلب، ومدرجات جبل لبنان الشامخة.",
    ethos_quote: "«المائدة ليست مجرد مساحة للاستهلاك، بل هي توثيق حقيقي لجغرافيا وتاريخ الأرض.»",

    // Collections Page & Filters
    provisions_index: "مؤشر المؤن والمنتجات",
    filtered_cat: "مفلترة حسب الفئة المختارة.",
    cat_all: "الكل",
    cat_granola: "غرانولا",
    cat_single: "بهارات فردية",
    cat_curated: "خلطات منتقاة",
    add_to_batch: "إضافة للدفعة",
    add_more: "إضافة المزيد",
    full_specs: "التفاصيل الكاملة",
    quick_batch_insight: "نظرة سريعة على الوصفة",
    terroir_origin: "المنشأ والجغرافيا",
    net_weight: "الوزن الصافي المعبأ",
    heritage_tasting_notes: "تذوق التراث والنفحات",
    valuation: "القيمة الإلزامية",
    save_item: "حفظ في المفضلة",
    remove_saved: "إزالة من المفضلة",
    featured_badge: "مختار ومميز",

    // Connect Page
    connect_title: "تواصل مع مكاتب رشة",
    establish_parchment: "إرسال وثيقة اتصال ورق مكتوب",
    connect_desc: "استفسر عن ترتيبات الموزعين المعتمدين والمجموعات المحدودة، أو خلط المطاحن المخصص، أو طلبات التغليف المجهزة لقطاعات الضيافة الفاخرة والنخبوية.",
    form_surname: "اللقب أو الكنية الموقرة",
    form_email: "عنوان البريد الإلكتروني للخطاب",
    form_vessel: "اسم المنشأة أو التاجر المهتم (اختياري)",
    form_msg: "تفاصيل ووصف طلب التنسيق والاتصال",
    form_submit: "إرسال وثيقة الطلب",
    form_success_title: "تم الإرسال بنجاح",
    form_success_desc: "نشكر نبل تواصلكم. سيقوم فريق الاتصال في الرياض بتقييم الوثيقة والاستجابة السريعة لها.",

    // Flavor Matrix
    spice_p_matrix: "مصفوفة وخرائط نكهات التوابل",
    inter_flavour: "محلل النكهات التفاعلي الدقيق",
    spice_profile_desc: "اختر عنصر توابل تقليدي متوارث أدناه لمشاهدة رسومه وخصائصه الجسدية والنكهية مع الأغذية المتوافقة.",
    quick_recipe: "وصفة واقتراح تحضير سريع",
    provision_recommends: "توصية رشة المختارة",

    // Bag Slider
    provision_bag: "حقيبة مؤنك المختارة",
    empty_bag: "الحقيبة خالية من المؤن حالياً.",
    bag_total: "مجموع القيمة الإجمالية",
    proceed_to_secure: "المتابعة لإرسال وطرد المشتريات",
    clear_everything: "إفراغ وتطهير الحقيبة",
    dispatch_proxied: "تم اعتماد وحجز طلب الطرد",
    bespoke_success: "تم تسجيل وتجهيز مؤنكم الحرفية بنجاح لإرسالها وتوزيعها المباشر لكم.",
    close_station: "إغلاق النافذة",
    items_count: "وحدات",
    item_count: "وحدة",

    // NEW EXTENSIVE KEYS
    // Narrative Page
    narrative_est_sub: "تأسست في المملكة العربية السعودية",
    narrative_quote: "«نحن نؤمن بأن الطهي ليس علماً صارماً بالأوزان والجرامات، بل هو فن رقيق من اللمسات البسيطة والمدروسة.»",
    narrative_title1: "نشأة ومفهوم الجسيمات والخلطات الخشنة.",
    narrative_p1_text1: "ولدت رشة (رشة) من استياء بسيط ومتمرد على حالة التوابل التجارية المحبطة والتقليدية. لقد اختزلت ممارسات الطهي الحديثة التوابل والمنكهات الغنية المانحة للحياة إلى مساحيق موحدة بلا طعم تتبدد وتتطاير بمجرد تخزينها. سألنا أنفسنا: لماذا نسمح للزيوت العطرية النباتية الثمينة للأعشاب الممتازة بالتلاشي والتآكل داخل المطاحن الصناعية العنيفة؟",
    narrative_p1_text2: "تتمكز فلسفتنا على السلامة الجسدية الخام للمنتج وتكامله الرائع. نحن لا نطحن توابلنا الفردية لتصبح غباراً خاملاً بلا روح. بدلاً من ذلك، نقوم بفرك قرون الهيل الأخضر الممتاز يدوياً بخشونة، وسحق حبات السماق البركاني يدوياً، وتقطيع حبات جوز البيكان بدقة جراحية بالغة. يضمن هذا أن يحتفظ كل تجمع فردي للجرانولا أو حبة زعتر بنكهته العطرية بأمان تطلقها فقط عندما تلوكه تحت أسنانك، لتملأ حنكك بالصدق المطلق والعميق.",
    narrative_title2: "من قلب الرياض، بنكهة وإلهام محلي وروح عالمية.",
    narrative_p2_text1: "بصفتنا علامة تجارية حرفية ملموسة، فإن تراثنا متجذر بعمق في النهضة والتحول الغذائي والطهي المتسارع والمتألق في الرياض. نحن نبني على العادات الوجدانية والراسخة للضيافة—حيث لا يتم إخفاء التوابل خلف أسطح المطابخ، بل يتم تقديمها على المائدة بوقار وفخر عظيم. تمزج وصفاتنا بحب بين نكهات التراث الشرق أوسطية مثل الزعتر البري والسماق واللومي مع عناصر نباتية عصرية مذهلة مثل براعم الورد وجوز البيكان الكندي والشراب القيقب الفاخر.",
    narrative_p2_text2: "تمثل كل عبوة زجاجية مصممة بعناية تغادر مصنعنا ميثاقاً ورسالة تراثية فريدة: إنك تتلقى مكونات طازجة منتقاة ومحزومة بعناية تامة فائقة الطزاجة، خالية تماماً من أي مواد كيميائية أو محليات مكررة أو نكهات مصنعة. سواء كنت ترش سماقنا البركاني فوق لبنة منزلية باردة أو تنثر حبات الجرانولا بهيل الورد على الزبادي الطازج، فأنت تشارك في ثورة هادئة ومتوارثة مذهلة. خطوة جميلة ومدروسة واحدة في كل مرة.",
    narrative_founders: "مؤسسو رشة التراثية",
    narrative_logistics: "إمدادات النكهات واللوجستيات الحرفية",

    // Connect Page Additions
    connect_form_verification: "تم تأكيد طلب المراسلة وأرشفته بنجاح.",
    connect_submit_another: "إرسال خطاب تواصل آخر",
    connect_dossier_spec: "تحديد بيانات وثيقة الاتصال والطلب",
    connect_lbl_name: "الاسم الكامل واللقب الموقر *",
    connect_lbl_email: "عنوان البريد الإلكتروني للمراسلة *",
    connect_lbl_company: "اسم المنشأة أو الشركة أو المتجر *",
    connect_lbl_type: "تصنيف نوع الطلب والاتصال",
    connect_opt_stockist: "سجل تمثيل الموزعين والمتاجر الفاخرة",
    connect_opt_custom: "تسجيل طلب تركيبة وخلطة تراثية مخصصة",
    connect_opt_general: "شراكة ملموسة للعلامة التجارية / شؤون عامة",
    connect_lbl_msg: "تفاصيل ووصف مشروعك وجدوى الطلب *",
    connect_placeholder_name: "مثال: سلطان آل سعود الموقر",
    connect_placeholder_email: "مثال: sultan@coffeebrands.sa",
    connect_placeholder_company: "مثال: مقهى رشة وصعتر التراثي",
    connect_placeholder_msg: "يرجى كتابة متطلباتكم بالتفصيل، والكميات المقدرة، ومواعيد التسليم المستهدفة لمشروعكم لتجهيز العينات...",
    connect_submit_btn: "إرسال وثيقة الطلب",
    connect_transmitting: "جاري نقل وأرشفة معاملة الاتصال التراثية...",
    connect_partnerships: "سجل الشراكات ومكاتب المراسلة",
    connect_stockist_registry: "سجل حجز الموزعين المعتمدين والمتاجر",
    connect_rep_excellence: "تمثيل فخامة وجودة النكهات الحرفية.",
    connect_rep_desc: "نحن نقوم بتزويد نخبة المقاهي وصالونات التذوق الفاخرة، ومتاجر الأغذية العضوية الراقية، ومجموعات الفنادق المبتكرة في الرياض وجميع أنحاء المملكة العربية السعودية.",
    connect_digital_inbox: "البريد الوارد الرقمي الرسمي",
    connect_logistics_centre: "مركز رشة اللوجستي للإمداد",
    connect_logistics_addr: "حي المستودعات الفريد، الملقا، الرياض",
    connect_timing_lbl: "ساعات استقبال الطلبات",
    connect_timing_val: "الأحد — الخميس / ٠٩:٠٠ صباحاً — ٠٥:٠٠ مساءً بتوقيت الرياض",
    connect_bespoke_note: "تنبيه المخصص: نحن نقدم خيارات طحن مخصصة لثخانة الحبوب، وتصميم ملصقات خاص للمنشآت، ومعدلات رطوبة معينة للتوابل الفردية للمطاعم ومجموعات الشركات النخبوية والفاخرة.",

    // Connect Errors
    err_name_required: "الرجاء إدخال الاسم الكامل لمتابعة الطلب.",
    err_email_required: "الرجاء إدخال البريد الإلكتروني للمراسلة.",
    err_email_invalid: "الرجاء كتابة البريد الإلكتروني بالشكل الصحيح والتركيب السليم (مثال: name@domain.com).",
    err_company_required: "الرجاء تحديد المنشأة أو الكيان المعني.",
    err_msg_required: "الرجاء إدخال تفاصيل طلبك لمساعدة الفريق على تقييمه.",
    err_msg_length: "يجب أن لا يقل طول الوصف عن ١٠ حروف لضمان استيعاب الطلب بعمق كافٍ.",

    // Collections Page Additions
    collections_catalogue: "دليل المؤن التراثية ومعجم المنتجات",
    collections_discoveries: "دفعات تراثية وصفت وتوفرت",
    collections_all_provisions: "كل المؤن",
    collections_investment: "الاستثمار المالي للوحدة",
    collections_leaflet: "صحيفة ومواصفات المنتج الفنية والتراثية",
    collections_constituents: "التكوين والعناصر والمكونات الفاخرة:",
    collections_palate_notes: "نفحات وتوصيات التذوق والتقديم:",
    collections_inquire_batch: "طلب حجز هذه الدفعة مسبقاً",
    collections_matching_stock: "المطابقة المتناغمة للدفعة",
    collections_add_match: "إضافة المكمل المطابق للمجموعة",
    palette_science: "أسرار وعلم حاسة الذوق وتكامل النكهة",
    interactive_flavor_head: "التحليل التفاعلي لنفحات التوابل والمذاق",
    interactive_flavor_desc: "يولد التناغم والانسجام في الطهي من التباين والمعايرة الدقيقة لنكهاتها. اختر ملفاً تعريفياً من القائمة لاستكشاف نفحات النكهات الأساسية والتقييمات وتوصيات الاقتران.",
    select_raw_specimen: "اختر نوع بهارات أو مادة تذوق عينة",
    declared_organic: "عضوي معتمد بالكامل وخالٍ من الإشعاع والمستنبتات الصناعية",
    sensory_compass: "مؤشرات وبوصلة التقييم الحسي الدقيق",
    sensory_aromatics: "النفحة والجاذبية العشبية الفواحة",
    sensory_acidity: "الحدة المبهجة والحموضة النفاذة",
    sensory_earthiness: "العمق المعدني الترابي الصلب المتوازن",
    sensory_heat: "حرارة ولسعة الفلفل الدافئ الفاخر",
    sensory_sweetness: "حلاوة الزبيب وعسل السدر الرقيقة",
    herbaceous_notes: "العناصر والخصائص العطرية:",
    recommended_pairings: "الاقترانات وتوصيات التقديم المتناغمة:",
    testimonials_label: "من مجتمعنا",
    testimonials_heading: "موثوق به في مطابخ الذواقة حول العالم.",
  },
  tr: {
    // Brand & Header
    brand_sub: "ZANAATKAR ÇITIRTI & ÇİÇEKLENMEDE ÖNCÜ",
    logo_sub: "ZANAATKAR BAHARAT & TAHIL",
    logo_ar: "رشة",
    nav_home: "DERGİ (ANASAYFA) — الرشة الأولى",
    nav_collections: "SERİ KOLEKSİYONLARI — كتلوج الكولكشن",
    nav_connect: "DİSTRİBÜTÖR İLETİŞİM — تواصل معنا",
    nav_cta: "DİSTRİBÜTÖR TALEBİ",
    sections_label: "SİSTEM BÖLÜMLERİ",
    meta_footer: "RASHAH © Riyad, KSA",
    meta_sub: "SERT & ÖZENLE İŞLENMİŞ",

    // Hero Segment
    hero_title: "SERT & ÖZENLE İŞLENMİŞ MİRASLIK ERZAKLAR",
    hero_desc: "Doğu Akdeniz, Anadolu ve ötesinin mikro iklimlerinden elde edilen, özenle seçilmiş ata tohumu baharatlar ve küçük parti granolalar. Riyad, Suudi Arabistan'da duyusal kontrastlar formüle ediyoruz. Kalın dokular yavaşça fırınlanır ve ilk serpmede aromatik gücüyle patlayacak şekilde tasarlanır.",
    hero_cta: "SERİYİ KEŞFEDİN",

    // Lineup / Shop section
    lineup_title: "KOLEKSİYONA GÖRE ALIŞVERİŞ",
    lineup_subtitle: "Doku ve geleneksel öğütme tarifleriyle tanımlanan üç farklı, birinci sınıf mutfak yolu.",
    lineup_g_title: "01 / TAHIL MATRİSİ",
    lineup_g_desc: "Kadim yulaflar, kavrulmuş kuruyemişler, soğuk sıkım ham tahin ve Şam gülü yaprakları.",
    lineup_s_title: "02 / ÇİÇEK & TOHUM",
    lineup_s_desc: "Tüm çiçeksi yoğunluğu korumak için güneşte kurutulmuş ve taşla kırılmış tek kökenli yabani mahsuller.",
    lineup_c_title: "03 / COARSE HARMONY",
    lineup_c_desc: "Sert taneleri ve işlenmemiş ısı profilini harmanlayan ana karışımlarımız.",
    explore_btn: "TÜM DİZİNİ KEŞFEDİN",

    // Ethos
    ethos_label: "FELSEFEMİZ",
    ethos_title: "Toprak ve Taş Öğütme Arasında Yaşayan Bir Diyalog",
    ethos_p1: "Rashah'da adımız (Arapça'da 'hafif bir serpme' veya 'zarif bir jest' anlamına gelir) yemeğe yaklaşımımızı tanımlar. Aşırı işlemeyi reddediyor; ata tohumu mahsullerin sert tanelerini, volkanik lezzetini ve işlenmemiş liflerini kutluyoruz. Her kavanoz mevsimin, toprağın ve insan elinin bir kaydını taşır.",
    ethos_p2: "Riyad, Urfa, Halep ve Cebel-i Lübnan teraslarındaki kurak tarım arazilerinde faaliyet gösteren etik mikro ortaklar aracılığıyla doğrudan temin edilen erzaklarımız, mutfak direncini temsil eder.",
    ethos_quote: '"Sofra bir tüketim yeri değil, coğrafi gerçeğin bir kaydıdır."',

    // Collections Page & Filters
    provisions_index: "ERZAK DİZİNİ",
    filtered_cat: "Kategoriye göre filtrelendi.",
    cat_all: "Tümü",
    cat_granola: "Granola",
    cat_single: "Tekli Baharatlar",
    cat_curated: "Özel Karışımlar",
    add_to_batch: "GRUBA EKLE",
    add_more: "DEVAMINI EKLE",
    full_specs: "TÜM DETAYLAR",
    quick_batch_insight: "HIZLI GRUP BAKIŞI",
    terroir_origin: "TERUAR / MENŞE",
    net_weight: "NET AĞIRLIK",
    heritage_tasting_notes: "MİRASLIK TADIM NOTLARI",
    valuation: "FİYAT DEĞERİ",
    save_item: "Kaydet",
    remove_saved: "Kaydedilenlerden Çıkar",
    featured_badge: "SEÇKİN SPOT",

    // Connect Page
    connect_title: "RASHAH İLE İLETİŞİME GEÇİN",
    establish_parchment: "BAĞLANTI BELGESİ OLUŞTURUN",
    connect_desc: "Mikro parti distribütörlük anlaşmaları, özel karışımlar veya yüksek düzey miras misafirperverlik tasarımları için özel paketleme talepleri hakkında bilgi alın.",
    form_surname: "Soyadınız",
    form_email: "E-posta Adresiniz",
    form_vessel: "Mağaza veya Tüccar Adı (İsteğe Bağlı)",
    form_msg: "Talep Mesajınızın Açıklaması",
    form_submit: "TALEP GÖNDER",
    form_success_title: "MESAJ GÖNDERİLDİ",
    form_success_desc: "Teşekkür ederiz. Riyad ekibimiz talebinizi değerlendirecektir.",

    // Flavor Matrix
    spice_p_matrix: "BAHARAT PROFİLİ MATRİSİ",
    inter_flavour: "İnteraktif Lezzet Profilleyici",
    spice_profile_desc: "Geleneksel eşleşmeler üzerindeki özelliklerini haritalandırmak için aşağıdan bir ata baharat profili seçin.",
    quick_recipe: "HIZLI TARİF ÖNERİSİ",
    provision_recommends: "RASHAH ÖNERİSİ",

    // Bag Slider
    provision_bag: "ERZAK SEPETİNİZ",
    empty_bag: "Sepetiniz şu anda boş.",
    bag_total: "Toplam Değer",
    proceed_to_secure: "GÜVENLİ GÖNDERİME GEÇ",
    clear_everything: "HEPSİNİ TEMİZLE",
    dispatch_proxied: "GÖNDERİ YOLA ÇIKTI",
    bespoke_success: "Özel erzaklarınız doğrudan dağıtım için başarıyla rezerve edildi.",
    close_station: "PENCEREYİ KAPAT",
    items_count: "adet",
    item_count: "adet",

    // NEW EXTENSIVE KEYS
    // Narrative Page
    narrative_est_sub: "SUUDİ ARABİSTAN'DA KURULDU",
    narrative_quote: '"Yemek yapmanın katı bir gramaj bilimi değil, küçük dokunuşların hassas bir sanatı olduğuna inanıyoruz."',
    narrative_title1: "Sert Karışımların Doğuşu.",
    narrative_p1_text1: "Rashah (رشة), ticari baharatların durumuna yönelik basit ve isyankar bir memnuniyetsizlikten doğdu. Modern mutfak uygulamaları, hayat veren baharatları depolandıklarında anında yok olan tek tip, tatsız tozlara indirgedi. Kendimize sorduk: Birinci sınıf bitkilerin uçucu botanik yağlarının endüstriyel öğütücüler içinde yok olmasına neden izin verelim?",
    narrative_p1_text2: "Felsefemiz ham fiziksel bütünlüğe dayanmaktadır. Tekli baharatlarımızı durağan bir toza dönüştürmüyoruz. Bunun yerine, birinci sınıf yeşil kakule kabuklarını elle kabaca ufalıyor, volkanik sumak taşlarını eziyor ve pekan cevizlerini cerrahi hassasiyetle dilimliyoruz. Bu sayede her bir granola kümesi veya zahter tanesi aromasını güvenle saklıyor ve ancak ısırıldığında salarak damağınızı mutlak ve filtrelenmemiş gerçekle dolduruyor.",
    narrative_title2: "Riyad'dan, Yerel İlhamla.",
    narrative_p2_text1: "Zanaatkar bir marka olarak mirasımız, Riyad'ın gelişen mutfak rönesansına derinlemesine kök salmıştır. Baharatların mutfak tezgahlarının arkasına gizlenmeyip büyük bir gurur ve saygıyla masada sunulduğu kadim Arap misafirperverlik geleneği üzerine inşa ediyoruz. Formüllerimiz; yabani kekik, sumak ve lümi gibi Orta Doğu miras lezzetlerini gül goncaları ve birinci sınıf akçaağaç gibi çağdaş botanik unsurlarla harmanlıyor.",
    narrative_p2_text2: "Mutfağımızdan çıkan her cam kavanoz gerçek bir anlaşmayı temsil eder: Kimyasallardan veya rafine tatlandırıcılardan arındırılmış, eşsiz tazelikte özenle seçilmiş malzemeler alıyorsunuz. İster Volkanik Sumağımızı soğuk süzme labnenin üzerine serpiştirin, ister Gül Pekan granolamızı taze yoğurdun üzerine dökün; sessiz, atalardan kalma bir devrime katılıyorsunuz. Her seferinde güzel ve bilinçli bir dokunuşla.",
    narrative_founders: "Rashah Kurucuları",
    narrative_logistics: "ZANAATKAR LEZZET LOJİSTİĞİ",

    // Connect Page Additions
    connect_form_verification: "Talep Doğrulandı ve Kaydedildi.",
    connect_submit_another: "YENİ BİR TALEP GÖNDER",
    connect_dossier_spec: "BAŞVURU DOSYASI DETAYLARI",
    connect_lbl_name: "ADINIZ VE SOYADINIZ *",
    connect_lbl_email: "E-POSTA ADRESİNİZ *",
    connect_lbl_company: "MAĞAZA VEYA KURUM ADI *",
    connect_lbl_type: "TALEP AMACININ TÜRÜ",
    connect_opt_stockist: "Seçkin Kafe / Mağaza Distribütör Kaydı",
    connect_opt_custom: "Özel Mutfak Formülü Siparişi",
    connect_opt_general: "Zanaatkar Marka Ortaklığı / Genel",
    connect_lbl_msg: "TALEP GÖRÜŞME VE PROJE DETAYLARI *",
    connect_placeholder_name: "Örn. Sultan Al-Saud",
    connect_placeholder_email: "Örn. sultan@coffeebrands.sa",
    connect_placeholder_company: "Örn. Atölye ve Kekik Cafe",
    connect_placeholder_msg: "Gereksinimlerinizi, toplu sipariş hacimlerinizi ve teslimat hedeflerinizi detaylandırın...",
    connect_submit_btn: "GÖRÜŞME DOSYASINI GÖNDER",
    connect_transmitting: "TALEP DOSYASI GÖNDERİLİYOR...",
    connect_partnerships: "ORTAKLIK SİCİLİ",
    connect_stockist_registry: "DİSTRİBÜTÖR SİCİLİ",
    connect_rep_excellence: "Zanaatkar Mükemmelliği Temsil Etmek.",
    connect_rep_desc: "Suudi Arabistan genelindeki seçkin kahve salonlarına, organik gıda mağazalarına, yerel otel butik gruplarına ve özel konsept mağazalara tedarik sağlıyoruz.",
    connect_digital_inbox: "DİJİTAL GELEN KUTUSU",
    connect_logistics_centre: "RİYAD LOJİSTİK MERKEZİ",
    connect_logistics_addr: "Depo Bölgesi, Al Malqa, Riyad",
    connect_timing_lbl: "KAYIT ÇALIŞMA SAATLERİ",
    connect_timing_val: "Pazar — Perşembe / 09:00 — 17:00 AST",
    connect_bespoke_note: "Özel sipariş notu: Mutfak işletmeleri ve birinci sınıf kurumsal hediye dizileri için özel tane boyutları, özelleştirilmiş etiketleme ve belirli tek baharat nem oranları sunuyoruz.",

    // Connect Errors
    err_name_required: "Tam kimlik adı gereklidir.",
    err_email_required: "E-posta adresi gereklidir.",
    err_email_invalid: "Lütfen geçerli bir e-posta adresi girin (örn. ad@alanadi.com).",
    err_company_required: "Şirket / Salon adı gereklidir.",
    err_msg_required: "Lütfen Rashah'nın portföyünüze nasıl entegre olabileceğini açıklayın.",
    err_msg_length: "Derinliği garanti etmek için talep içeriği en az 10 karakter uzunluğunda olmalıdır.",

    // Collections Page Additions
    collections_catalogue: "ERZAK KATALOĞU",
    collections_discoveries: "MÜKEMMEL GRUPLAR KEŞFEDİLDİ",
    collections_all_provisions: "TÜM ERZAKLAR",
    collections_investment: "FİYAT DEĞERİ",
    collections_leaflet: "ÜRÜN ÖZELLİKLERİ BÜLTENİ",
    collections_constituents: "BİLEŞENLER & İÇİNDEKİLER:",
    collections_palate_notes: "DAMAK VE SERVİS NOTLARI:",
    collections_inquire_batch: "GRUBU SORGULA",
    collections_matching_stock: "EŞLEŞEN STOK",
    collections_add_match: "BU EŞLEŞMEYİ SEPETE EKLE",
    palette_science: "DAMAK BİLİMİ",
    interactive_flavor_head: "İnteraktif Lezzet Profilleme",
    interactive_flavor_desc: "Mutfak sinerjisi, hassas kontrast ve kalibrasyondan doğar. Temel lezzet notalarını, duyusal değerlendirmeleri ve küratörlüğündeki eşleşmeleri keşfetmek için aşağıdan bir kütüphane profili seçin.",
    select_raw_specimen: "HAM NUMUNE SEÇİN",
    declared_organic: "ORGANİK VE IŞINLANMAMIŞ DEKLARE EDİLMİŞTİR",
    sensory_compass: "DUYUSAL PUSULA PROFİLLERİ",
    sensory_aromatics: "Aromatik Otsu Yükseliş",
    sensory_acidity: "Narenciye Keskinliği / Asit",
    sensory_earthiness: "Topraksı Mineral Derinliği",
    sensory_heat: "Kapsaisin Kıvılcımı / Sıcaklık",
    sensory_sweetness: "Tatlı Üzüm/Bal Alt Tonu",
    herbaceous_notes: "OTSU NOTALAR",
    recommended_pairings: "ÖNERİLEN EŞLEŞMELER",
    testimonials_label: "TOPLULUĞUMUZDAN",
    testimonials_heading: "Dünyanın dört bir yanındaki seçkin mutfakların tercihi.",
  }
} as const;

export type TranslationKey = keyof (typeof TRANSLATIONS)['en'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('rashah-lang');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('rashah-lang', lang);
  };

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    const html = window.document.documentElement;
    html.setAttribute('lang', language);
    html.setAttribute('dir', dir);
    
    // Apply styling enhancements based on Arabic or LTR to keep the font rendering extremely gorgeous
    if (language === 'ar') {
      html.classList.add('font-serif-rtl');
      // Set secondary font adjustments or dir behaviors if needed
    } else {
      html.classList.remove('font-serif-rtl');
    }
  }, [language, dir]);

  const t = (key: TranslationKey): string => {
    const langTrans = TRANSLATIONS[language];
    if (key in langTrans) {
      return langTrans[key];
    }
    // Fallback to English
    return TRANSLATIONS['en'][key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useProductTranslation() {
  const { language } = useLanguage();
  return (product: any) => {
    if (!product) return product;
    if (language === 'ar') {
      return {
        ...product,
        title: product.title_ar || product.arabicTitle || product.title,
        subtitle: product.subtitle_ar || product.subtitle,
        description: product.description_ar || product.description,
        fullDescription: product.fullDescription_ar || product.fullDescription,
        origin: product.origin_ar || product.origin,
        ingredients: product.ingredients_ar || product.ingredients,
        notes: product.notes_ar || product.notes,
      };
    }
    if (language === 'tr') {
      return {
        ...product,
        title: product.title_tr || product.title,
        subtitle: product.subtitle_tr || product.subtitle,
        description: product.description_tr || product.description,
        fullDescription: product.fullDescription_tr || product.fullDescription,
        origin: product.origin_tr || product.origin,
        ingredients: product.ingredients_tr || product.ingredients,
        notes: product.notes_tr || product.notes,
      };
    }
    return product;
  };
}
