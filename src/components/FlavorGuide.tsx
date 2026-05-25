import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Plus, Flame, Leaf, Coffee, Wine, Award, Check } from 'lucide-react';
import { Product, CartItem } from '../types';
import { products } from '../data/products';
import { useLanguage, useProductTranslation } from '../context/LanguageContext';

interface FlavorGuideProps {
  addToCart: (product: Product) => void;
  cartItems: CartItem[];
}

interface ProfileItem {
  id: string;
  name: string;
  arabicName: string;
  turkishName?: string;
  subtitle: string;
  subtitle_ar?: string;
  subtitle_tr?: string;
  category: 'Single Spices' | 'Curated Blends';
  description: string;
  description_ar?: string;
  description_tr?: string;
  pairings: string[];
  pairings_ar?: string[];
  pairings_tr?: string[];
  keyNotes: string[];
  keyNotes_ar?: string[];
  keyNotes_tr?: string[];
  ratings: {
    aromatics: number; // percentage
    acidity: number;
    earthiness: number;
    heat: number;
    sweetness: number;
  };
  recommendsProductId: string; // real product ID from products list
  sensoryDescriptors: string;
  sensoryDescriptors_ar?: string;
  sensoryDescriptors_tr?: string;
  recipeSuggestion: {
    dishName: string;
    instructions: string;
  };
  recipeSuggestion_ar?: {
    dishName: string;
    instructions: string;
  };
  recipeSuggestion_tr?: {
    dishName: string;
    instructions: string;
  };
}

const PROFILE_DATA: ProfileItem[] = [
  {
    id: 'halaby-pepper',
    name: 'Heirloom Aleppo Pepper',
    arabicName: 'الفلفل الحلبي المدخن',
    turkishName: 'Ata Tohumu Aleppo Biberi',
    subtitle: 'Sun-cured & slow cold-smoked over hickory',
    subtitle_ar: 'مجفف تحت أشعة الشمس ومطعم بلمسة دخانية خفيفة من خشب الجوز',
    subtitle_tr: 'Güneşte kurutulmuş ve meşe odununda yavaşça tütsülenmiş',
    category: 'Single Spices',
    description: 'An exceptionally smooth pepper pulp that preserves native oil content, offering a bright, raisin-like fruity sweet body paired with a gentle, building tongue warmth.',
    description_ar: 'لب فلفل حلبي مخملي وناعم يحافظ على محتواه الدهني المتطاير، ليقدم مذاقاً حلواً برائحة تشبه الزبيب والعسل، منسجماً مع لسعة حرارة دافئة تتدفق في تناغم تام.',
    description_tr: 'Hafif acılık düzeyi, meyvemsi kuru üzüm tatlılığı ve hassas duman aroması sunan, taze esansiyel yağları koruyan Halep biberi.',
    pairings: ['Fried free-range eggs on labneh', 'Charred broccoli florets with cold oil', 'Whipped goat cheese crostini', 'Spiced dark chocolate ganache'],
    pairings_ar: ['بيض مقلي بلدي فوق طبقة لبنة مكثفة', 'زهرات القرنبيط المشوية بزيت الزيتون', 'لفائف جبن الماعز الطازجة', 'غناش الشوكولاتة الداكنة بالتوابل'],
    pairings_tr: ['Labne üzerinde kızarmış organik yumurta', 'Sızma zeytinyağlı fırınlanmış brokoli', 'Keçi peynirli çıtır ekmek dilimleri', 'Baharatlı bitter çikolata ganajı'],
    keyNotes: ['Fruity Citrus', 'Subtle Hickory Smoke', 'Soft Raisin', 'Mild Capsicum warmth'],
    keyNotes_ar: ['حموضة فاكهية رقيقة', 'لمحة دخانية خفيفة', 'زبيب دافئ ونعومة', 'دفء الفلفل الحلبي'],
    keyNotes_tr: ['Meyvemsi Narenciye', 'Hafif Meşe Dumanı', 'Kuru Üzüm Esintisi', 'Hafif Acı Sıcaklık'],
    ratings: {
      aromatics: 85,
      acidity: 45,
      earthiness: 55,
      heat: 60,
      sweetness: 40
    },
    recommendsProductId: 'aleppo-smoked-pepper-flakes',
    sensoryDescriptors: 'WARM • FRUITY • BALANCED',
    sensoryDescriptors_ar: 'دافئ • فاكهي • متوازن',
    sensoryDescriptors_tr: 'SICAK • MEYVEMSİ • DENGELİ',
    recipeSuggestion: {
      dishName: 'Aleppo Butter Eggs over Labneh',
      instructions: 'Melt 2 tbsp unsalted butter with 1 tsp Heirloom Aleppo Pepper over medium heat until foamy and red. Spoon over poached eggs resting on a thick bed of salted labneh, finished with a fresh mint leaf pinch.'
    },
    recipeSuggestion_ar: {
      dishName: 'بيض حار بزبادي اللبنة التراثي',
      instructions: 'ذوّب ملعقتين من الزبدة غير المملحة مع ملعقة صغيرة من الفلفل الحلبي المدخن على نار هادئة حتى يتشرب اللون الأحمر القرمزي الفخم. اسكب المزيج الحار فوق البيض المسلوق المستند على صفيحة من لبنة متبلة ناصعة، ثم انثر بتلات النعناع البري.'
    },
    recipeSuggestion_tr: {
      dishName: 'Mütebbel Yatağında Aleppo Yumurtası',
      instructions: '2 yemek kaşığı tereyağını köpürene kadar ısıtıp içine 1 çay kaşığı Aleppo Biberi ekleyin. Derin kırmızı renk alınca ocaktan indirin. Süzme yoğurt veya tuzlu labne yatağındaki haşlanmış yumurtaların üzerine gezdirip taze nane ile servis edin.'
    }
  },
  {
    id: 'volcanic-sumac',
    name: 'Volcanic Wild Violet Sumac',
    arabicName: 'السماق البري الفاخر',
    turkishName: 'Volkanik Yabani Sumak',
    subtitle: 'High-altitude wild sumac collected on volcanic slopes',
    subtitle_ar: 'سماق بري ينمو على المرتفعات البركانية الشاهقة ومقطوف يدوياً',
    subtitle_tr: 'Volkanik yamaçlardan elle hasat edilen yüksek rakımlı sumak',
    category: 'Single Spices',
    description: 'A sharp, citric, mineral-dense crimson sprinkle. The volcanic soil gives it a signature tart, saline depth that instantly awakens salivary glands.',
    description_ar: 'رشة قرمزي حادة، غنية بالأحماض والأملاح المعدنية الكثيفة. تمنحه التربة البركانية الغنية نكهة ملحية وحموضة فريدة تثير حاسة التذوق والدهشة فوراً.',
    description_tr: 'Maden tuzu ve asit oranı zengin kırmızı serpme. Volkanik topraklar, tükürük bezlerini anında uyandıran imza bir ekşilik ve tuzlu derinlik kazandırır.',
    pairings: ['Heirloom tomatoes sprinkled with olive oil', 'Creamy labneh dipping platters', 'Grilled halloumi cheese layers', 'Crisp fresh flatbreads'],
    pairings_ar: ['شرائح طماطم مرشوشة بزيت زيتون بكري مميز', 'صواني تغميس لبنة كريمية دافئة', 'جبن الحلوم المشوي الفاخر', 'أرغفة معجنات طازجة ومقرمشة'],
    pairings_tr: ['Hakiki sızma zeytinyağlı domates dilimleri', 'Kremsi labne dip sos tabakları', 'Izgara hellim peyniri dilimleri', 'Fırından taze çıkmış çıtır pideler'],
    keyNotes: ['Volcanic Sour', 'Citric acid spike', 'Mineral salinity', 'Plum undertones'],
    keyNotes_ar: ['حموضة بركانية نفاذة', 'لمحة حمضية ملحية حادة', 'ملوحة معدنية أصيلة', 'نفحة خوخ بري دافئة'],
    keyNotes_tr: ['Volkanik Ekşilik', 'Keskin Narenciye Asidi', 'Maden Sel minerali', 'Yabani Erik tonları'],
    ratings: {
      aromatics: 75,
      acidity: 95,
      earthiness: 65,
      heat: 5,
      sweetness: 20
    },
    recommendsProductId: 'rashah-signature-blend',
    sensoryDescriptors: 'TART • SALINE • VIBRANT',
    sensoryDescriptors_ar: 'لاذع • معدني • حيوي فواح',
    sensoryDescriptors_tr: 'EKŞİ • TUZLU • CANLANDIRICI',
    recipeSuggestion: {
      dishName: 'Fattoush Salad with Volcanic Zest',
      instructions: 'Whisk 3 tbsp extra virgin olive oil with 1.5 tsp of Wild Violet Sumac, 1 tbsp fresh lemon juice, and sea salt. Toss with crisp cucumbers, tomatoes, toasted flatbread squares, and fresh purslane.'
    },
    recipeSuggestion_ar: {
      dishName: 'سلطة الفتوش مع قشر السماق البركاني',
      instructions: 'امزج ٣ ملاعق كبيرة من زيت الزيتون البكر الممتاز مع ملعقة ونصف صغيرة من السماق البركاني الحامض، وملعقة طعام من عصير الليمون الطازج. اخلطه جيداً مع الخيار المقرمش، الطماطم الكرزية، حبات الخبز البلدي المحمص، وأوراق البقلة الطازجة.'
    },
    recipeSuggestion_tr: {
      dishName: 'Volkanik Soslu Geleneksel Fettuş Salatası',
      instructions: '3 yemek kaşığı sızma zeytinyağı, 1.5 çay kaşığı Volkanik Sumak, 1 yemek kaşığı taze limon suyu ve tuzu karıştırın. Çıtır salatalıklar, domatesler, kızarmış pide kareleri ve taze semizotu ile harmanlayıp servis edin.'
    }
  },
  {
    id: 'sun-loomi',
    name: 'Fermented Loomi Black Lime',
    arabicName: 'اللومي الأسود الفاخر',
    turkishName: 'Güneşte Kurutulmuş Siyah Loomi',
    subtitle: 'Carbonized field limes cured in the hot desert sands',
    subtitle_ar: 'ليمون مفروم ومكربن طبيعياً جفف ببطء تحت رمال الصحراء الحارة',
    subtitle_tr: 'Kavurucu çöl kumlarında fermente edilmiş misket limonu',
    category: 'Single Spices',
    description: 'An ancient citrus preservation method that translates fresh green lime juice into a rich, fermented, musky citrus flavor with deep wooden barrel notes.',
    description_ar: 'طريقة تراثية أصيلة لحفظ الحمضيات تحول عصير الليمون الأخضر الطازج إلى مسحوق لومي أسود مخمر وغني بنكهة ترابية عميقة مع نفحات خشبية وبلوطية معتقة للغاية.',
    description_tr: 'Yeşil taze misket limonlarını, fıçı odunu alt tonlarına sahip zengin, fermente, otsu narenciye aromasına dönüştüren kadim bir kurutma koruma metodu.',
    pairings: ['Rich lamb and tomato stews', 'Basmati rice with saffron pillars', 'Oven-roasted whole sea bass', 'Complex root vegetable baking sheets'],
    pairings_ar: ['يخنات اللحم الغنية وحساء الطماطم الوجدية', 'الأرز البسمتي الفاخر المعزز بخيوط الزعفران الكهرمانية', 'سمك القاروص الطازج المشوي بالفرن', 'أطباق الخضروات الجذرية المشوية بالفرن'],
    pairings_tr: ['Zengin etli ve domatesli tencere yemekleri', 'Safran telli kokulu basmati pilavı', 'Fırında ızgara levrek veya çipura', 'Zeytinyağlı fırınlanmış kök sebzeleri'],
    keyNotes: ['Fermented Musk', 'Concentrated Lime Acid', 'Smoky cedar', 'Umami undertone'],
    keyNotes_ar: ['تخمير معتق وغني', 'تركيز حمض الليمون البري', 'خشب صنوبري مدخن وبخور', 'عمق أومامي ترابي'],
    keyNotes_tr: ['Fermente Odunsu Nüans', 'Konsantre Limon Asidi', 'Sedir dumanı aroması', 'Zengin umami alt tonları'],
    ratings: {
      aromatics: 80,
      acidity: 90,
      earthiness: 85,
      heat: 0,
      sweetness: 10
    },
    recommendsProductId: 'loomi-fermented-black-lime',
    sensoryDescriptors: 'EARTHY-CITRUS • MUSKY • ESSENTIAL',
    sensoryDescriptors_ar: 'ترابي-حمضي • عتيق مخمر • أساسي',
    sensoryDescriptors_tr: 'TOPRAKSI-NARENCİYE • FERMENTE • TEMEL NESİL',
    recipeSuggestion: {
      dishName: 'Loomi Saffron Rice Pilaf',
      instructions: 'Add 1 tsp finely ground Fermented Black Lime into boiling basmati rice infused with saffron threads, toasted pine nuts, and a pinch of ground cardamom. Great companion for roasted seabass.'
    },
    recipeSuggestion_ar: {
      dishName: 'أرز البسمتي باللومي والزعفران',
      instructions: 'أضف ملعقة صغيرة من اللومي الأسود الناعم إلى أرز البسمتي المغلي المشرب بخيوط الزعفران، والصنوبر المحمص، ورشة من الهيل المطحون. يقدم متناغماً بجانب سمك القاروص المشوي.'
    },
    recipeSuggestion_tr: {
      dishName: 'Lümi ve Safran Baharatlı Pilav',
      instructions: 'Safran telleri, kavrulmuş çam fıstığı ve bir çay kaşığı ezilmiş yeşil kakule ile kaynayan basmati pirincine 1 çay kaşığı öğütülmüş Siyah Loomi ekleyin. Izgara balıkların yanında mükemmel gider.'
    }
  },
  {
    id: 'royal-zaatar',
    name: 'Royal Hand-Dried Za\'atar',
    arabicName: 'الزعتر الملكي الفاخر',
    turkishName: 'Kraliyet El Yapımı Zahter',
    subtitle: 'Calcareous wild thyme with white sesame oil infusion',
    subtitle_ar: 'زعتر بري كلسي غني بالسمسم الأبيض البلدي المحمص والمفروم يدوياً في الظل',
    subtitle_tr: 'Kireçli topraklardan yaban kekiği ve yerli susam yağı infüzyonu',
    category: 'Curated Blends',
    description: 'Our ultimate heritage green blend. Balanced by rich nutty fats, high-oil hand-rolled wild oregano thyme, and premium sharp sumac to balance the oil.',
    description_ar: 'مزيجنا التراثي الأخضر الأرقى والكامل على الإطلاق. متوازن بدهون السمسم الغنية بالزيوت، وأوراق الزعتر البري المنتقاة يدوياً، مع رشة سخية من سماقنا البركاني الفاخر لمعادلة حموضة وقوام الزيت.',
    description_tr: 'En üstün miras yeşil karışımımız. Bol yağlı, elle toplanmış yabani kekik yaprakları, kavrulmuş fındığımsı susam tohumları ve asidi dengelemek için volkanik sumak içeren eşsiz lezzet.',
    pairings: ['Warm sourdough dipped in olive oil', 'Whole roasted free-range organic chicken', 'Fresh cucumber and mint sliced salads', 'Baked flatbread flat dough pastries'],
    pairings_ar: ['خبز العجين الحامض الدافئ المغموس بزيت الزيتون البكر', 'الدجاج العضوي البلدي المشوي ببطء بالفرن', 'سلطة شرائح الخيار المقرمش والنعناع الطازج', 'مناقيش الزعتر والمعجنات المخبوزة على الحجر'],
    pairings_tr: ['Sıcak ekşi maya ekmek', 'Bütün fırınlanmış organik köy tavuğu', 'Taze çıtır salatalık ve nane yaprağı salataları', 'Fırınlanmış sıcak zeytinyağlı zahter manakışları'],
    keyNotes: ['Pungent Herbaceous', 'Toasted sesame fat', 'Volcanic background zing', 'Spiced pine resin'],
    keyNotes_ar: ['أعشاب لاذعة فواحة', 'دهون السمسم المحمص الغنية', 'حموضة بركانية خفيفة', 'صنوبر عطري بري'],
    keyNotes_tr: ['Keskin Otsu Kekik', 'Kavrulmuş Susam Yağı', 'Arka Plan Volkanik esintisi', 'Baharatlı Çam reçinesi'],
    ratings: {
      aromatics: 95,
      acidity: 60,
      earthiness: 75,
      heat: 5,
      sweetness: 15
    },
    recommendsProductId: 'zaatar-premium-artisanal',
    sensoryDescriptors: 'HERBACEOUS • NUTTY • FRAGRANT',
    sensoryDescriptors_ar: 'عشبي نفاذ • قوام سمسم كريمي • عطر ناعم',
    sensoryDescriptors_tr: 'OTSU • FINDIKSI • KOKULU',
    recipeSuggestion: {
      dishName: 'Heritage Za\'atar Flatbread (Man\'oushe)',
      instructions: 'Combine equal parts Royal Za\'atar and premium extra virgin olive oil. Spread generously over raw flatdough rounds and bake at 450°F (230°C) until bubbly and golden.'
    },
    recipeSuggestion_ar: {
      dishName: 'مناقيش الزعتر التراثية الفاخرة',
      instructions: 'اخلط مقادير متساوية من الزعتر الملكي الفاخر وزيت الزيتون البكر الممتاز ذي النكهة العميقة. وزعه بسخاء على فطيرة عجين دائرية مفرودة واخبزها على حجر البيتزا أو الفرن على درجة حرارة مئوية ٢٣٠ حتى تصبح كهرمانية مقرمشة.'
    },
    recipeSuggestion_tr: {
      dishName: 'Kraliyet Zahterli Manakış',
      instructions: 'Eşit miktarda Kraliyet Zahteri ile sızma zeytinyağını karıştırın. Hamur yaylarının üzerine cömertçe yayın ve altın sarısı kabarana kadar 230°C fırında pişirin.'
    }
  },
  {
    id: 'cardamom-rose',
    name: 'Oasis Cardamom & Rose Fusion',
    arabicName: 'الهيل والورد الجوري',
    turkishName: 'Oasis Gül ve Kakule Füzyonu',
    subtitle: 'Stone-shattered green cardamom with Najdi Damask buds',
    subtitle_ar: 'هيل أخضر مكسر يدوياً مع براعم الورد الدمشقي العطرة وسلسلة جرانولا مذهلة',
    subtitle_tr: 'Najdi Şam gülü goncaları ile taşla kırılmış yeşil kakule',
    category: 'Curated Blends',
    description: 'A luxurious grain-series blend that unites warm floral camphor and botanical rose aromatics. Dehydrated slowly with sweet syrups for custom, delicate crunch.',
    description_ar: 'مزيج فاخر من سلسلة الحبوب يجمع دمشق الدافئة بالورد الروحي والكافور والروائح النباتية الخالدة. يجفف ببطء شديد مع محليات طبيعية صافية لقرمشة فائقة عطرية.',
    description_tr: 'Narin odunsu kafur ile Şam gülü aromalarını birleştiren lüks tahıl serisi granola karışımı. Çıtır çiçeksi tatlılık sunması için doğal şuruplarla yavaşça kurutulmuştur.',
    pairings: ['Warm golden milk lattes', 'Thick organic Greek or goat yogurt', 'Overnight activated chia seeds', 'Dessert fruit skewers in honey syrup'],
    pairings_ar: ['أكواب حليب اللوز والكركم الدافئة', 'زبادي يوناني أو ماعز عضوي سميك ودسم', 'بذور الشيا المبردة بنكهة الفانيلا', 'أسياخ فواكه مع شراب العسل العطري'],
    pairings_tr: ['Sıcak baharatlı altın süt lattes', 'Süzme organik yoğurt veya keçi yoğurdu', 'Aktive edilmiş chia tohumu jelleri', 'Üzerinde bal şurubu gezdirilmiş meyve şişleri'],
    keyNotes: ['Flowery Camphor', 'Sweet desert honeycomb', 'Toasted pecans', 'Damask rose essence'],
    keyNotes_ar: ['كافور زهري عطري', 'عسل بري صحراوي دافئ', 'أنصاف جوز بيكان محمصة', 'روح الورد الدمشقي العبق'],
    keyNotes_tr: ['Çiçeksi Kafur', 'Sıcak çöl çiçek balı', 'Tereyağlı kavrulmuş pekan', 'Şam gülü esansı'],
    ratings: {
      aromatics: 95,
      acidity: 10,
      earthiness: 35,
      heat: 10,
      sweetness: 80
    },
    recommendsProductId: 'cardamom-rose-pecan-granola',
    sensoryDescriptors: 'FLORAL • WARM • BOTANICAL',
    sensoryDescriptors_ar: 'زهري عبق • دافئ حنون • نباتي خالد',
    sensoryDescriptors_tr: 'ÇİÇEKSİ • SICAK • BOTANİK',
    recipeSuggestion: {
      dishName: 'Damask Spiced Labneh Parfait',
      instructions: 'Layer thick Greek yogurt with raw wildflower honey, fresh berries, and 3 tbsp of Cardamom & Rose Fusion. Garnish with a sprinkle of crushed pistachios and edible organic rose petals.'
    },
    recipeSuggestion_ar: {
      dishName: 'بارفيه اللبنة المتبلة بورد دمشق والهيل',
      instructions: 'اصنع طبقات متتالية من الزبادي اليوناني الكثيف مع عسل الزهور البرية، الفاكهة الطازجة، و٣ ملاعق طعام من مزيج Oasis بالهيل والورد. زين اللوحة برذاذ من الفستق الحلبي المطحون وبتلات الورد الجوري الصالحة للأكل.'
    },
    recipeSuggestion_tr: {
      dishName: 'Gül ve Kakuleli Yoğurt Parfesi',
      instructions: 'Süzme yoğurdu bal, taze meyveler ve 3 yemek kaşığı Kakule & Gül Fusion ile katmanlandırın. Üzerine çekilmiş Antep fıstığı ve organik kuru gül yaprakları serperek servis yapın.'
    }
  }
];

export default function FlavorGuide({ addToCart, cartItems }: FlavorGuideProps) {
  const { language, t } = useLanguage();
  const translateProduct = useProductTranslation();

  const [selectedSubCat, setSelectedSubCat] = useState<'Single Spices' | 'Curated Blends'>('Single Spices');
  const [selectedItem, setSelectedItem] = useState<ProfileItem>(
    PROFILE_DATA.find(item => item.category === 'Single Spices') || PROFILE_DATA[0]
  );
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  const filteredItems = PROFILE_DATA.filter(item => item.category === selectedSubCat);

  const handleCategorySwitch = (cat: 'Single Spices' | 'Curated Blends') => {
    setSelectedSubCat(cat);
    const firstOfCat = PROFILE_DATA.find(item => item.category === cat);
    if (firstOfCat) {
      setSelectedItem(firstOfCat);
    }
  };

  // Find corresponding product to fetch pricing/inventory details if available
  const pairedProductRaw = products.find(p => p.id === selectedItem.recommendsProductId);
  const pairedProduct = translateProduct(pairedProductRaw);
  const isInCart = pairedProduct ? cartItems.find(ci => ci.product.id === pairedProduct.id) : null;

  // Fully translate the currently selected item on-the-fly for pristine zero-gap translations
  const translatedItem = (() => {
    if (language === 'ar') {
      return {
        ...selectedItem,
        name: selectedItem.arabicName || selectedItem.name,
        subtitle: selectedItem.subtitle_ar || selectedItem.subtitle,
        description: selectedItem.description_ar || selectedItem.description,
        pairings: selectedItem.pairings_ar || selectedItem.pairings,
        keyNotes: selectedItem.keyNotes_ar || selectedItem.keyNotes,
        sensoryDescriptors: selectedItem.sensoryDescriptors_ar || selectedItem.sensoryDescriptors,
        recipeSuggestion: selectedItem.recipeSuggestion_ar || selectedItem.recipeSuggestion,
      };
    }
    if (language === 'tr') {
      return {
        ...selectedItem,
        name: selectedItem.turkishName || selectedItem.name,
        subtitle: selectedItem.subtitle_tr || selectedItem.subtitle,
        description: selectedItem.description_tr || selectedItem.description,
        pairings: selectedItem.pairings_tr || selectedItem.pairings,
        keyNotes: selectedItem.keyNotes_tr || selectedItem.keyNotes,
        sensoryDescriptors: selectedItem.sensoryDescriptors_tr || selectedItem.sensoryDescriptors,
        recipeSuggestion: selectedItem.recipeSuggestion_tr || selectedItem.recipeSuggestion,
      };
    }
    return selectedItem;
  })();

  return (
    <div className="mt-20 border-t border-brand-charcoal/10 dark:border-brand-cream/10 pt-16 font-sans">
      
      {/* Container Header */}
      <div className="text-center mb-12">
        <span className="font-mono-data text-[10px] tracking-[0.3em] text-brand-ochre uppercase font-bold block mb-2">
          {t('palette_science')}
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-brand-charcoal dark:text-brand-cream">
          {t('interactive_flavor_head')}
        </h3>
        <p className="text-xs text-brand-charcoal/60 dark:text-brand-cream/60 max-w-xl mx-auto mt-2 leading-relaxed">
          {t('interactive_flavor_desc')}
        </p>
      </div>

      {/* Main interactive grid card layout */}
      <div className="bg-brand-cream/50 dark:bg-brand-charcoal/40 border border-brand-charcoal/10 dark:border-brand-cream/10 rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        
        {/* LEFT COLUMN: Library list controller */}
        <div className="lg:col-span-5 border-r border-brand-charcoal/10 dark:border-brand-cream/10 p-6 sm:p-8 flex flex-col justify-between bg-brand-cream/20 dark:bg-brand-charcoal/20">
          <div>
            {/* Category Toggle buttons */}
            <div className="flex gap-2 mb-6 p-1 bg-brand-charcoal/5 dark:bg-brand-cream/5 rounded">
              <button
                id="toggle-single-spices"
                onClick={() => handleCategorySwitch('Single Spices')}
                className={`flex-1 text-center py-2.5 text-[9px] tracking-widest font-semibold uppercase transition-all duration-300 cursor-pointer ${
                  selectedSubCat === 'Single Spices'
                    ? 'bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal shadow-sm'
                    : 'text-brand-charcoal/50 dark:text-brand-cream/50 hover:text-brand-charcoal dark:hover:text-brand-cream'
                }`}
              >
                {t('cat_single').toUpperCase()}
              </button>
              <button
                id="toggle-curated-blends"
                onClick={() => handleCategorySwitch('Curated Blends')}
                className={`flex-1 text-center py-2.5 text-[9px] tracking-widest font-semibold uppercase transition-all duration-300 cursor-pointer ${
                  selectedSubCat === 'Curated Blends'
                    ? 'bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal shadow-sm'
                    : 'text-brand-charcoal/50 dark:text-brand-cream/50 hover:text-brand-charcoal dark:hover:text-brand-cream'
                }`}
              >
                {t('cat_curated').toUpperCase()}
              </button>
            </div>

            {/* Profile items selector list */}
            <span className="font-mono-data text-[9px] tracking-widest text-brand-ochre uppercase font-bold block mb-3">
              {t('select_raw_specimen')} ({filteredItems.length})
            </span>
            <div className="flex flex-col gap-2">
              {filteredItems.map((item) => {
                const isSelected = selectedItem.id === item.id;
                const translatedName = language === 'ar' ? item.arabicName : (language === 'tr' ? item.turkishName : item.name);
                const secondLabel = language === 'ar' ? item.name : item.arabicName;
                const sensoryDescrip = language === 'ar' ? item.sensoryDescriptors_ar : (language === 'tr' ? item.sensoryDescriptors_tr : item.sensoryDescriptors);

                return (
                  <button
                    id={`profile-selector-${item.id}`}
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className={`w-full text-left p-4 border transition-all duration-300 cursor-pointer flex justify-between items-center group relative ${
                      isSelected
                        ? 'bg-white dark:bg-brand-charcoal/80 border-brand-terracotta text-brand-charcoal dark:text-brand-cream pl-6'
                        : 'bg-transparent border-brand-charcoal/5 dark:border-brand-cream/5 text-brand-charcoal/70 dark:text-brand-cream/70 hover:border-brand-charcoal/20 dark:hover:border-brand-cream/20 hover:bg-white/40 dark:hover:bg-brand-charcoal/10'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-terracotta" />
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm font-bold block">
                          {translatedName}
                        </span>
                        <span className="font-serif text-xs italic text-brand-terracotta translate-y-0.5">
                          {secondLabel}
                        </span>
                      </div>
                      <span className="text-[9px] text-brand-charcoal/50 dark:text-brand-cream/50 font-sans mt-1 block">
                        {sensoryDescrip}
                      </span>
                    </div>
                    <span className={`text-[10px] tracking-widest font-semibold transition-transform duration-300 ${
                      isSelected ? 'text-brand-terracotta translate-x-1' : 'text-brand-charcoal/30 dark:text-brand-cream/30 group-hover:translate-x-1'
                    }`}>
                      →
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick aesthetic badge */}
          <div className="mt-8 border-t border-brand-charcoal/5 dark:border-brand-cream/5 pt-4 hidden lg:flex items-center gap-2.5">
            <Award size={16} className="text-brand-terracotta" />
            <span className="text-[9px] tracking-widest font-mono-data text-brand-charcoal/40 dark:text-brand-cream/40 uppercase">
              {t('declared_organic')}
            </span>
          </div>
        </div>

        {/* RIGHT COLUMN: Profile Viewer Canvas */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <AnimatePresence mode="wait">
            <motion.div
              key={translatedItem.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.35 }}
              className="flex-grow flex flex-col justify-between h-full"
            >
              <div>
                {/* Header card with name and arabic text */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 border-b border-brand-charcoal/10 dark:border-brand-cream/10 pb-4 mb-6">
                  <div>
                    <span className="font-serif text-2xl font-light text-brand-terracotta block">
                      {language === 'ar' ? selectedItem.name : selectedItem.arabicName}
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl font-bold text-brand-charcoal dark:text-brand-cream">
                      {translatedItem.name}
                    </h4>
                    <p className="text-[10px] text-brand-ochre font-bold tracking-[0.05em] uppercase font-mono-data mt-1 text-justify">
                      {translatedItem.subtitle}
                    </p>
                  </div>
                  <span className="px-2.5 py-1 bg-brand-charcoal/5 dark:bg-brand-cream/5 border border-brand-charcoal/10 dark:border-brand-cream/10 text-[9px] tracking-widest text-brand-charcoal/70 dark:text-brand-cream/70 font-bold uppercase rounded self-start sm:self-auto">
                    {selectedSubCat === 'Single Spices' ? t('cat_single').toUpperCase() : t('cat_curated').toUpperCase()}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-brand-charcoal dark:text-brand-cream italic leading-relaxed mb-6 bg-white/45 dark:bg-brand-charcoal/30 border-l-2 border-brand-ochre p-4 text-justify">
                  "{translatedItem.description}"
                </p>

                {/* SENSORY SPECTRUM SLIDERS */}
                <div className="mb-6">
                  <span className="font-mono-data text-[10px] tracking-widest text-brand-ochre font-bold uppercase block mb-4 flex items-center gap-1.5 justify-start">
                    <Sparkles size={11} className="text-brand-terracotta animate-pulse" /> {t('sensory_compass')}
                  </span>

                  <div className="space-y-4 bg-brand-charcoal/5 dark:bg-brand-cream/5 p-4 rounded border border-brand-charcoal/5">
                    
                    {/* Aromatics */}
                    <div 
                      className="relative cursor-pointer group"
                      onMouseEnter={() => setHoveredBar('aromatics')}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div className="flex justify-between items-baseline text-[10px] mb-1.5 font-mono-data">
                        <span className="text-brand-charcoal/70 dark:text-brand-cream/70 transition-colors duration-200 group-hover:text-brand-terracotta">{t('sensory_aromatics')}</span>
                        <span className="text-brand-terracotta font-bold">{translatedItem.ratings.aromatics}%</span>
                      </div>
                      <div className="h-2 bg-brand-charcoal/10 dark:bg-brand-cream/10 rounded-full relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${translatedItem.ratings.aromatics}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-brand-ochre rounded-full"
                        />
                        <AnimatePresence>
                          {hoveredBar === 'aromatics' && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.85, y: -5 }}
                              animate={{ opacity: 1, scale: 1, y: -28 }}
                              exit={{ opacity: 0, scale: 0.85, y: -5 }}
                              transition={{ type: "spring", damping: 15, stiffness: 250 }}
                              style={{ left: `${translatedItem.ratings.aromatics}%` }}
                              className="absolute -translate-x-1/2 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal text-[9px] font-mono-data font-semibold px-2.5 py-1 rounded shadow-lg border border-brand-ochre/30 whitespace-nowrap z-30"
                            >
                              {translatedItem.ratings.aromatics}% {language === 'ar' ? 'عطري' : (language === 'tr' ? 'Aromatik' : 'Aromatics')}
                              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-brand-charcoal dark:border-t-brand-cream" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Acidity */}
                    <div 
                      className="relative cursor-pointer group"
                      onMouseEnter={() => setHoveredBar('acidity')}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div className="flex justify-between items-baseline text-[10px] mb-1.5 font-mono-data">
                        <span className="text-brand-charcoal/70 dark:text-brand-cream/70 transition-colors duration-200 group-hover:text-brand-terracotta">{t('sensory_acidity')}</span>
                        <span className="text-brand-terracotta font-bold">{translatedItem.ratings.acidity}%</span>
                      </div>
                      <div className="h-2 bg-brand-charcoal/10 dark:bg-brand-cream/10 rounded-full relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${translatedItem.ratings.acidity}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-yellow-500 rounded-full"
                        />
                        <AnimatePresence>
                          {hoveredBar === 'acidity' && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.85, y: -5 }}
                              animate={{ opacity: 1, scale: 1, y: -28 }}
                              exit={{ opacity: 0, scale: 0.85, y: -5 }}
                              transition={{ type: "spring", damping: 15, stiffness: 250 }}
                              style={{ left: `${translatedItem.ratings.acidity}%` }}
                              className="absolute -translate-x-1/2 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal text-[9px] font-mono-data font-semibold px-2.5 py-1 rounded shadow-lg border border-brand-ochre/30 whitespace-nowrap z-30"
                            >
                              {translatedItem.ratings.acidity}% {language === 'ar' ? 'حموضة' : (language === 'tr' ? 'Asitlik' : 'Acid')}
                              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-brand-charcoal dark:border-t-brand-cream" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Earthiness */}
                    <div 
                      className="relative cursor-pointer group"
                      onMouseEnter={() => setHoveredBar('earthiness')}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div className="flex justify-between items-baseline text-[10px] mb-1.5 font-mono-data">
                        <span className="text-brand-charcoal/70 dark:text-brand-cream/70 transition-colors duration-200 group-hover:text-brand-terracotta">{t('sensory_earthiness')}</span>
                        <span className="text-brand-terracotta font-bold">{translatedItem.ratings.earthiness}%</span>
                      </div>
                      <div className="h-2 bg-brand-charcoal/10 dark:bg-brand-cream/10 rounded-full relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${translatedItem.ratings.earthiness}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-brand-charcoal dark:bg-brand-cream rounded-full"
                        />
                        <AnimatePresence>
                          {hoveredBar === 'earthiness' && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.85, y: -5 }}
                              animate={{ opacity: 1, scale: 1, y: -28 }}
                              exit={{ opacity: 0, scale: 0.85, y: -5 }}
                              transition={{ type: "spring", damping: 15, stiffness: 250 }}
                              style={{ left: `${translatedItem.ratings.earthiness}%` }}
                              className="absolute -translate-x-1/2 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal text-[9px] font-mono-data font-semibold px-2.5 py-1 rounded shadow-lg border border-brand-ochre/30 whitespace-nowrap z-30"
                            >
                              {translatedItem.ratings.earthiness}% {language === 'ar' ? 'عمق ترابي' : (language === 'tr' ? 'Topraksılık' : 'Earthiness')}
                              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-brand-charcoal dark:border-t-brand-cream" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Heat */}
                    <div 
                      className="relative cursor-pointer group"
                      onMouseEnter={() => setHoveredBar('heat')}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div className="flex justify-between items-baseline text-[10px] mb-1.5 font-mono-data">
                        <span className="text-brand-charcoal/70 dark:text-brand-cream/70 transition-colors duration-200 group-hover:text-brand-terracotta">{t('sensory_heat')}</span>
                        <span className="text-brand-terracotta font-bold">{translatedItem.ratings.heat}%</span>
                      </div>
                      <div className="h-2 bg-brand-charcoal/10 dark:bg-brand-cream/10 rounded-full relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${translatedItem.ratings.heat}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-brand-terracotta rounded-full"
                        />
                        <AnimatePresence>
                          {hoveredBar === 'heat' && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.85, y: -5 }}
                              animate={{ opacity: 1, scale: 1, y: -28 }}
                              exit={{ opacity: 0, scale: 0.85, y: -5 }}
                              transition={{ type: "spring", damping: 15, stiffness: 250 }}
                              style={{ left: `${translatedItem.ratings.heat}%` }}
                              className="absolute -translate-x-1/2 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal text-[9px] font-mono-data font-semibold px-2.5 py-1 rounded shadow-lg border border-brand-ochre/30 whitespace-nowrap z-30"
                            >
                              {translatedItem.ratings.heat}% {language === 'ar' ? 'حرارة' : (language === 'tr' ? 'Sıcaklık' : 'Heat')}
                              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-brand-charcoal dark:border-t-brand-cream" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Sweetness */}
                    <div 
                      className="relative cursor-pointer group"
                      onMouseEnter={() => setHoveredBar('sweetness')}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      <div className="flex justify-between items-baseline text-[10px] mb-1.5 font-mono-data">
                        <span className="text-brand-charcoal/70 dark:text-brand-cream/70 transition-colors duration-200 group-hover:text-brand-terracotta">{t('sensory_sweetness')}</span>
                        <span className="text-brand-terracotta font-bold">{translatedItem.ratings.sweetness}%</span>
                      </div>
                      <div className="h-2 bg-brand-charcoal/10 dark:bg-brand-cream/10 rounded-full relative">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${translatedItem.ratings.sweetness}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          className="h-full bg-orange-400 rounded-full"
                        />
                        <AnimatePresence>
                          {hoveredBar === 'sweetness' && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.85, y: -5 }}
                              animate={{ opacity: 1, scale: 1, y: -28 }}
                              exit={{ opacity: 0, scale: 0.85, y: -5 }}
                              transition={{ type: "spring", damping: 15, stiffness: 250 }}
                              style={{ left: `${translatedItem.ratings.sweetness}%` }}
                              className="absolute -translate-x-1/2 bg-brand-charcoal dark:bg-brand-cream text-brand-cream dark:text-brand-charcoal text-[9px] font-mono-data font-semibold px-2.5 py-1 rounded shadow-lg border border-brand-ochre/30 whitespace-nowrap z-30"
                            >
                              {translatedItem.ratings.sweetness}% {language === 'ar' ? 'حلاوة' : (language === 'tr' ? 'Tatlılık' : 'Sweet')}
                              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-brand-charcoal dark:border-t-brand-cream" />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                  </div>
                </div>

                {/* BEST PAIRINGS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div>
                    <span className="font-mono-data text-[10px] tracking-widest text-brand-ochre font-bold uppercase block mb-2.5 flex items-center gap-1">
                      <Leaf size={11} className="text-emerald-600" /> {t('herbaceous_notes')}
                    </span>
                    <ul className="space-y-1.5">
                      {translatedItem.keyNotes.map((note, idx) => (
                        <li key={idx} className="text-xs text-brand-charcoal/80 dark:text-brand-cream/80 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-brand-terracotta rounded-full" />
                          {note}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <span className="font-mono-data text-[10px] tracking-widest text-brand-ochre font-bold uppercase block mb-2.5 flex items-center gap-1">
                      <Coffee size={11} className="text-amber-800" /> {t('recommended_pairings')}
                    </span>
                    <ul className="space-y-1.5">
                      {translatedItem.pairings.map((pair, idx) => (
                        <li key={idx} className="text-xs text-brand-charcoal/80 dark:text-brand-cream/80 flex items-center gap-1.5 text-justify">
                          <Check size={10} className="text-brand-terracotta stroke-[3]" />
                          {pair}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* QUICK RECIPE SUGGESTION */}
                <div className="mt-6 p-4 rounded bg-brand-ochre/5 dark:bg-brand-ochre/10 border border-brand-ochre/20">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles size={12} className="text-brand-ochre animate-pulse" />
                    <span className="font-mono-data text-[10px] tracking-widest text-brand-ochre font-bold uppercase block">
                      {t('quick_recipe')}
                    </span>
                  </div>
                  <h5 className="font-serif text-sm font-bold text-brand-charcoal dark:text-brand-cream mb-1 text-justify">
                    {translatedItem.recipeSuggestion.dishName}
                  </h5>
                  <p className="text-[11px] text-brand-charcoal/85 dark:text-brand-cream/85 leading-relaxed font-sans text-justify">
                    {translatedItem.recipeSuggestion.instructions}
                  </p>
                </div>
              </div>

              {/* DYNAMIC BATCH PROVISION SUGGESTION */}
              {pairedProduct && (
                <div className="border-t border-brand-charcoal/15 dark:border-brand-cream/15 pt-5 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-brand-terracotta/5 dark:bg-brand-terracotta/10 p-4 border border-brand-terracotta/20">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-white dark:bg-brand-charcoal border border-brand-charcoal/10 p-1 flex items-center justify-center overflow-hidden rounded">
                      <img
                        src={pairedProduct.image}
                        alt={pairedProduct.title}
                        className="object-contain max-h-full"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-left">
                      <span className="block text-[8px] tracking-widest text-brand-charcoal/40 dark:text-brand-cream/40 uppercase font-mono-data">{t('collections_matching_stock')}</span>
                      <h5 className="font-serif text-xs font-bold text-brand-charcoal dark:text-brand-cream truncate max-w-[200px]">
                        {pairedProduct.title}
                      </h5>
                      <span className="font-mono-data text-[10px] font-bold text-brand-terracotta block">
                        ${pairedProduct.price}.00 USD • {pairedProduct.weight}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    id={`guide-add-cart-${pairedProduct.id}`}
                    key={`guide-cart-${isInCart?.quantity || 0}`}
                    onClick={() => addToCart(pairedProduct)}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-5 py-3 bg-brand-terracotta hover:bg-brand-charcoal dark:hover:bg-brand-cream text-brand-cream dark:hover:text-brand-charcoal text-[9px] font-semibold tracking-widest transition-colors duration-300 cursor-pointer uppercase flex items-center justify-center gap-1.5"
                  >
                    {isInCart ? `${t('add_more')} (${isInCart.quantity})` : t('collections_add_match')}
                    <Plus size={11} />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
