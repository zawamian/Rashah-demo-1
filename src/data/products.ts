import { Product } from '../types';

// Let's resolve the actual generated image paths
import heroJarImg from '../assets/images/monolith_jar_hero_1779726349623.png';
import granolaImg from '../assets/images/grain_series_granola_1779726368711.png';
import spiceImg from '../assets/images/spice_series_blend_1779726386735.png';

export const products: Product[] = [
  {
    id: 'rashah-signature-blend',
    title: 'Signature Volcanic Sumac & Wildflower',
    arabicTitle: 'رشة السماق البري المطور',
    subtitle: 'The Monolith Jar',
    series: 'spice',
    category: 'Curated Blends',
    description: 'High-altitude wild-growing sumac collected on volcanic slopes, flaky sea salt, organic dried lemon peel, and crushed red rose berries.',
    fullDescription: 'Our signature blend celebrates the deep sour and citric majesty of native wild sumac. Hand-harvested on volcanic highlands, we crush the berries coarsely and blend them with delicate flakes of sun-evaporated sea salt and dehydrated wildflower petals. An elemental drizzle of citrus oil completes this complex, crimson sprinkle.',
    price: 24,
    weight: '120g',
    origin: 'Anatolian Volcanic Slopes',
    ingredients: ['Volcanic Violet Sumac', 'Flaky Sea Salt', 'Dried Lemon Peel', 'Wildflower Petals', 'Crushed Rose Pink Berries'],
    image: heroJarImg,
    featured: true,
    notes: 'Incredible over organic labneh, heirloom tomato carpaccios, grilled halloumi, or olive oil-drenched flatbreads.',
    
    title_ar: 'رشة السماق البري المطور والورد البري',
    title_tr: 'Volkanik Sumak ve Yabani Çiçek İmzalı Karışım',
    subtitle_ar: 'العلبة الأحادية الكاملة',
    subtitle_tr: 'Monolit Kavanoz',
    description_ar: 'سماق بري ينمو على مرتفعات بركانية شاهقة، ملح بحري ناصع، قشر ليمون مجفف عضوي وحبيبات ورد حمراء مسحوقة.',
    description_tr: 'Volkanik yamaçlardan toplanan yüksek rakımlı yabani sumak, pul deniz tuzu, organik kurutulmuş limon kabuğu ve ezilmiş kırmızı gül taneleri.',
    fullDescription_ar: 'تتميز خلطتنا الخاصة بالحموضة العميقة والفخامة الحمضية للسماق البري الأصلي. يتم حصاد المنتج يدوياً من المرتفعات البركانية، ونقوم بطحنه خشناً ومزجه مع رقائق رقيقة من ملح البحر المتبخر بالشمس وبتلات الزهور البرية المجففة. رشة خفيفة من الزيت الحمضى تكمل هذا المزيج المعقد والقرمزي المذهل.',
    fullDescription_tr: 'İmza karışımımız, yerel yabani sumağın derin ekşi ve narenciye görkemini kutluyor. Volkanik yaylalarda elle hasat edilen sumak meyvelerini kabaca eziyor, güneşte buharlaştırılmış deniz tuzu pulları ve kurutulmuş yabani çiçek yaprakları ile harmanlıyoruz. Narenciye yağının elementel dokunuşu bu karmaşık, koyu kırmızı serpmeyi tamamlıyor.',
    origin_ar: 'المنحدرات البركانية في الأناضول',
    origin_tr: 'Anadolu Volkanik Yamaçları',
    ingredients_ar: ['سماق بنفسجي بركاني', 'رقائق ملح البحر', 'قشر ليمون مجفف', 'بتلات زهور برية', 'ورد جوري وكرز زهري مطحون'],
    ingredients_tr: ['Volkanik Mor Sumak', 'Pul Deniz Tuzu', 'Kurutulmuş Limon Kabuğu', 'Yabani Çiçek Yaprakları', 'Ezilmiş Gül Pembe Meyveleri'],
    notes_ar: 'رائع للغاية فوق اللبنة العضوية الفاخرة، أو سلطة طماطم الكارباتشيو، أو جبن الحلوم المشوي، أو الخبز المغطى بزيت الزيتون المعصور على البارد.',
    notes_tr: 'Organik labne, domates karpaçyo, ızgara hellim veya sızma zeytinyağlı sıcak pidelerin üzerinde inanılmaz bir lezzet sunar.'
  },
  {
    id: 'cardamom-rose-pecan-granola',
    title: 'Cardamom Rose Pecan Granola',
    arabicTitle: 'جرانولا الهيل والورد الجوري',
    subtitle: 'Grain Series',
    series: 'grain',
    category: 'Granola',
    description: 'A delicate floral fusion of hand-ground green cardamom, organic Damascus rose buds, toasted pecan halves, and raw maple syrup.',
    fullDescription: 'Crafted in small micro-batches of only fifteen jars at a time, our Grain Series Cardamom Rose Pecan Granola features thick organic rolled oats slowly dehydrated under low temperature. Infused with freshly ground green cardamom pods, toasted buttery pecan halves, and sweet fragrant organic rose buds, this granola delivers a floral, botanical warmth.',
    price: 18,
    weight: '350g',
    origin: 'Handcrafted in Riyadh',
    ingredients: ['Organic Rolled Oats', 'Pecan Halves', 'Freshly Ground Cardamom Portions', 'Organic Flower Honey', 'Damascus Rose Buds', 'Cold-Pressed Coconut Oil'],
    image: granolaImg,
    featured: true,
    notes: 'Best served over cool goat yogurt, layered with organic honeycomb, or enjoyed dry as a desktop snack.',

    title_ar: 'جرانولا الهيل والورد الجوري وجوز البيكان',
    title_tr: 'Kakule, Gül ve Pekan Cevizli Granola',
    subtitle_ar: 'سلسلة الحبوب',
    subtitle_tr: 'Tahıl Serisi',
    description_ar: 'مزيج زهري رقيق من الهيل الأخضر المطحون يدوياً، بتلات الورد الجوري الدمشقي، أنصاف جوز البيكان المحمصة، وشراب القيقب الطبيعي.',
    description_tr: 'Elde öğütülmüş yeşil kakule, organik Şam gülü goncaları, fırınlanmış pekan cevizi ve saf akçaağaç şurubunun hassas çiçeksi füzyonu.',
    fullDescription_ar: 'صُنعت بحرفية ودقة فائقة بدفعات صغيرة لا تتعدى خمسة عشر علبة في المرة الواحدة، وتتميز جرانولا الهيل والورد الجوري بشوفان عضوي خشن يتم تجفيفه ببطء تحت درجات حرارة منخفضة للحفاظ على القوام والزيوت العطرية. مضاف إليها حبات الهيل الأخضر الطازج والبيكان المحمص الشهي وبتلات الورد الجوري العطرة لتمنحك دفئاً نباتياً غنياً.',
    fullDescription_tr: 'Her seferinde sadece on beş kavanozluk mikro partiler halinde üretilen Kakule ve Gül Serisi Granolamız, düşük sıcaklıkta yavaşça kurutulmuş kalın organik yulaf ezmesi içerir. Taze öğütülmüş yeşil kakule kabukları, fırınlanmış tereyağlı pekan cevizi yarımları ve tatlı kokulu organik gül goncaları ile harmanlanmış bu granola, çiçeksi ve botanik bir sıcaklık sunar.',
    origin_ar: 'صنع يدوياً في الرياض',
    origin_tr: 'Riyad\'da El Yapımı',
    ingredients_ar: ['شوفان عضوي كامل', 'أنصاف جوز البيكان الكندي', 'هيل أخضر مطحون طازج', 'عسل زهور برية طبيعي', 'بتلات ورد جوري دمشقي', 'زيت جوز الهند العضوي'],
    ingredients_tr: ['Organik Yulaf Ezmesi', 'Pekan Cevizi', 'Taze Öğütülmüş Kakule', 'Organik Çiçek Balı', 'Şam Gülü Goncaları', 'Soğuk Sıkım Hindistan Cevizi Yağı'],
    notes_ar: 'تُقدم بشكل مثالي مع الزبادي البارد، أو العسل الصافي، أو تؤكل جافة كوجبة خفيفة ومقرمشة أثناء العمل.',
    notes_tr: 'Soğuk keçi yoğurdu ile servis edilmesi, organik petek balı ile katmanlandırılması veya kuru bir atıştırmalık olarak tüketilmesi önerilir.'
  },
  {
    id: 'zaatar-premium-artisanal',
    title: 'Royal Hand-Dried Za\'atar',
    arabicTitle: 'الزعتر الملكي الفاخر',
    subtitle: 'Spice Series',
    series: 'spice',
    category: 'Curated Blends',
    description: 'Shade-dried wild thyme leaves, toasted heirloom white sesame seeds, bright tart sumac berries, and high-altitude mineral salt.',
    fullDescription: 'An unparalleled interpretation of a heritage blend. We source wild, broad-leaf thyme from calcareous soils, drying it strictly in the shade to preserve raw green essential oils. Coarsely rubbed and packed with toasted heirloom white sesame seeds and a lavish hand of our signature tart sumac.',
    price: 16,
    weight: '110g',
    origin: 'Hebron Limestone Foothills',
    ingredients: ['Shade-Dried Wild Thyme', 'Toasted Heirloom White Sesame', 'Volcanic Pink Sumac', 'Sea Salt'],
    image: spiceImg,
    featured: false,
    notes: 'Whisk with premium cold-pressed olive oil (Extra Virgin) for dipping, or rub generously onto farm chicken during final roasting.',

    title_ar: 'الزعتر الملكي الفاخر المجفف في الظل',
    title_tr: 'Kraliyet El Emeği Kurutulmuş Zahter',
    subtitle_ar: 'سلسلة البهارات',
    subtitle_tr: 'Baharat Serisi',
    description_ar: 'أوراق الزعتر البري المجفف في الظل، بذور السمسم الأبيض البلدي المحمصة، حبيبات السماق البركاني الحامضة، والملح المعدني النقي.',
    description_tr: 'Gölgede kurutulmuş yabani kekik yaprakları, kavrulmuş yerli beyaz susam tohumları, parlak ekşi sumak taneleri ve yüksek rakımlı maden tuzu.',
    fullDescription_ar: 'تفسير لا مثيل له لخلطة تراثية أصيلة. نحن نحصل على أوراق الزعتر البري عريض الأوراق من التربة الكلسية النقية، ونجففها بدقة في الظل للحفاظ على أثمن الزيوت العطرية الخضراء. يُفرك يدوياً بخشونة ويُعبأ مع السمسم الأبيض المحمص البلدي الغني ورشة وفيرة من سماقنا البركاني الحامض اللذيذ.',
    fullDescription_tr: 'Miras bir karışımın eşsiz bir yorumu. Kireçli topraklardan elde ettiğimiz yabani, geniş yapraklı kekiği gölgede kurutarak taze yeşil uçucu yağlarını koruyoruz. Kabaca ovalanmış ve kavrulmuş beyaz susam tohumları ile imza ekşi sumağımızla paketlenmiştir.',
    origin_ar: 'تلال الخليل الجيرية المقدسة',
    origin_tr: 'El-Halil Kireçtaşı Etekleri',
    ingredients_ar: ['زعتر بري مجفف في الظل', 'سمسم أبيض بلدي محمص', 'سماق بركاني حامض', 'ملح بحري معدني'],
    ingredients_tr: ['Gölgede Kurutulmuş Yabani Kekik', 'Kavrulmuş Beyaz Susam', 'Volkanik Pembe Sumak', 'Deniz Tuzu'],
    notes_ar: 'يُمزج مع زيت زيتون بكر ممتاز كغموس شهي للخبز الدافئ، أو يفرك بسخاء على الدجاج والطيور للتتبيل والشوي.',
    notes_tr: 'Banmak için sızma zeytinyağı ile çırpın veya kızartma sırasında tavuğun üzerine cömertçe sürün.'
  },
  {
    id: 'classic-toasted-maple-granola',
    title: 'Heritage Toasted Maple Granola',
    arabicTitle: 'جرانولا القيقب الكلاسيكية',
    subtitle: 'Grain Series',
    series: 'grain',
    category: 'Granola',
    description: 'Slow-toasted organic pumpkin seeds, crisp organic rolled oats, grade-A pure Canadian dark maple syrup, and sliced almonds.',
    fullDescription: 'The purist’s standard. Devoid of refined sugars, this classic toasted granola relies strictly on grade-A single-source dark maple syrup. Roasted to a rich, dark amber crunch with high-nutrient organic pumpkin seeds, sunflower kernels, and raw slivered almonds, creating a sophisticated woodsy profile with deep vanilla undertone.',
    price: 18,
    weight: '350g',
    origin: 'Handcrafted in Riyadh',
    ingredients: ['Organic Rolled Oats', 'Canadian Grade-A Dark Maple Syrup', 'Slivered Sweet Almonds', 'Organic Pumpkin Seeds', 'Sea Salt Flakes'],
    image: granolaImg, // reuse beautiful premium granola design
    featured: false,
    notes: 'Complements thick almond milk or serves beautifully as a topping on overnight chia oats.',

    title_ar: 'جرانولا القيقب الكلاسيكية المحمصة',
    title_tr: 'Geleneksel Fırınlanmış Akçaağaçlı Granola',
    subtitle_ar: 'سلسلة الحبوب',
    subtitle_tr: 'Tahıl Serisi',
    description_ar: 'بذور اليقطين العضوية المحمصة ببطء، شوفان عضوي مقرمش، شراب قيقب كندي داكن نقي من الدرجة الممتازة واللوز الشرائح.',
    description_tr: 'Yavaşça fırınlanmış organik kabak çekirdeği, çıtır organik yulaf ezmesi, A sınıfı saf Kanada akçaağaç şurubu ve dilimlenmiş badem.',
    fullDescription_ar: 'المعيار الأنقى لعشاق الكلاسيكية. خالية تماماً من السكر المكرر بتركيز حصري على شراب القيقب الكندي الداكن من فئة الـ Grade A الصافي. محمصة ببطء للحصول على لون كهرماني داكن مع بذور اليقطين الغنية بالمعادن وحبوب دوار الشمس واللوز النيئ المشرح لنكهة غنية وعميقة.',
    fullDescription_tr: 'Saflığın standardı. Rafine şeker içermeyen bu klasik granola, tamamen A sınıfı Kanada akçaağaç şurubuna dayanır. Yüksek besin değerli kabak çekirdekleri, ayçiçeği çekirdekleri ve çiğ dilimlenmiş bademlerle kavrularak vanilya alt tonlu derin bir tat profili oluşturur.',
    origin_ar: 'صنع يدوياً في الرياض',
    origin_tr: 'Riyad\'da El Yapımı',
    ingredients_ar: ['شوفان عضوي كامل', 'شراب القيقب الكندي الأصلي', 'لؤلؤ اللوز المشرح الحلو', 'بذور اليقطين النيئة', 'رقائق ملح البحر النقي'],
    ingredients_tr: ['Organik Yulaf Ezmesi', 'Kanada A-Sınıfı Akçaağaç Şurubu', 'Dilimlenmiş Tatlı Badem', 'Organik Kabak Çekirdeği', 'Deniz Tuzu Pulları'],
    notes_ar: 'تُقدم بشكل رائع كقرمشة فوق حليب اللوز الطازج أو كطبقة للتزيين على أكواب الشوفان بالتشيا والفاكهة.',
    notes_tr: 'Yoğun badem sütünü tamamlar veya chia tohumlu yulaf ezmesinin üzerinde harika bir sos olarak servis edilir.'
  },
  {
    id: 'aleppo-smoked-pepper-flakes',
    title: 'Heirloom Aleppo Smoked Pepper',
    arabicTitle: 'رقاقات الفلفل الحلبي المدخن',
    subtitle: 'Spice Series',
    series: 'spice',
    category: 'Single Spices',
    description: 'Sun-cured, oiled Halaby pepper flakes with mild elegant heat, deep fruity sweetness, and delicate hickory woodsmoke finish.',
    fullDescription: 'Also known as Halaby pepper, our Aleppo pepper pods are grown in small family micro-farms, sun-cured for three weeks, deseeded, and then rubbed with high-quality olive oil and a touch of sea salt. We cold-smoke them gently over hickory coals to yield a warm, fragrant flake with fruity, raisin-like sweetness and just a hint of slow heat.',
    price: 15,
    weight: '90g',
    origin: 'Mediterranean Border Hills',
    ingredients: ['Sun-Cured Aleppo Pepper Flakes', 'Cold-Pressed Extra Virgin Olive Oil', 'Mineral Salt'],
    image: spiceImg, // reuse beautiful spice rendering
    featured: true,
    notes: 'Sprinkle directly onto fried free-range eggs, charred broccoli, creamy hummus, or dark chocolate ganache for a luxurious twist.',

    title_ar: 'الفلفل الحلبي التراثي المدخن',
    title_tr: 'Ata Tohumu Aleppo Füme Biberi',
    subtitle_ar: 'سلسلة البهارات',
    subtitle_tr: 'Baharat Serisi',
    description_ar: 'رقاقات مخملية من الفلفل الحلبي المجفف بالشمس والمطعم برشة من زيت الزيتون، بلمسة دخانية من خشب الجوز وحرارة رقيقة محببة.',
    description_tr: 'Güneşte kurutulmuş, hafif zarif acılığa, derin meyvemsi tatlılığa ve hassas füme odun bitişine sahip Halep biberi pulları.',
    fullDescription_ar: 'يُعرف أيضاً بفلفل حلب، حيث يُزرع في مزارع عائلية صغيرة ويجفف تحت أشعة الشمس لثلاثة أسابيع، ثم تزال بذوره ويُفرك يدوياً بزيت زيتون بكر ممتاز ورشة من ملح البحر الحرفي. نقوم بتدخينه ببطء برفق على فحم السنديان لمنح رقاقاته دفئاً خشبياً نادراً بنفحات من حلاوة الزبيب المذهلة.',
    fullDescription_tr: 'Halep biberi olarak da bilinen bu biberler küçük aile çiftliklerinde yetiştirilir, üç hafta güneşte kurutulur, çekirdeklerinden arındırılır, ardından hakiki zeytinyağı ve deniz tuzu ile harmanlanır. Meyvemsi ve kuru üzüm benzeri bir tatlılığa sahip sıcak, hoş kokulu baharat için meşe kömürü üzerinde hafifçe tütsülenir.',
    origin_ar: 'تلال الحدود في البحر المتوسط',
    origin_tr: 'Akdeniz Sınır Tepeleri',
    ingredients_ar: ['رقاقات الفلفل الحلبي المجفف بالشمس', 'زيت زيتون بكر ممتاز معصور بارد', 'ملح بحري معدني نقي'],
    ingredients_tr: ['Güneşte Kurutulmuş Halep Biberi Pulları', 'Soğuk Sıkım Sızma Zeytinyağı', 'Maden Tuzu'],
    notes_ar: 'رائعة جداً عند رشها فوق البيض المقلي، أو القرنبيط المشوي، أو الحمص الكريمي الناعم، أو غاناش الشوكولاتة الداكنة لقرمشة فريدة.',
    notes_tr: 'Kızarmış yumurta, fırınlanmış brokoli, kremsi humus veya lüks bir dokunuş için bitter çikolata ganajının üzerine doğrudan serpin.'
  },
  {
    id: 'salted-ochre-sesame-granola',
    title: 'Salted Tahini & Gold Sesame Granola',
    arabicTitle: 'جرانولا الطحينة الملكية بالسمسم',
    subtitle: 'Grain Series',
    series: 'grain',
    category: 'Granola',
    description: 'Creamy cold-pressed sesame tahini, hand-roasted gold sesame seeds, premium farm wildflower honey, halves walnuts, and flaky sea salt.',
    fullDescription: 'A rich savory-leaning granola inspired by traditional confectionery. We saturate organic whole-grain oats in stone-ground sesame paste (tahini), raw desert wildflower honey, and high-oil walnuts. Toasted with pristine white and black sesame seeds until crisp, finished with high-contrast flakes of Celtic sea salt for deep mineral counterpoints.',
    price: 20,
    weight: '350g',
    origin: 'Handcrafted in Riyadh',
    ingredients: ['Organic Rolled Oats', 'Stone-Ground Sesame Tahini', 'Wildflower Desert Honey', 'Hand-Selected Walnut Halves', 'Toasted White Sesame Seeds', 'Flaky Celtic Salt'],
    image: granolaImg,
    featured: false,
    notes: 'Stunning as a savory crunch on parsnip purees, baked sweet potatoes, or contrasting with vanilla bean gelato.',

    title_ar: 'جرانولا الطحينة والسمسم الذهبي المملحة',
    title_tr: 'Tuzlu Tahinli ve Altın Susamlı Granola',
    subtitle_ar: 'سلسلة الحبوب',
    subtitle_tr: 'Tahıl Serisi',
    description_ar: 'طحينة السمسم النقية المعصورة بارداً، بذور السمسم الذهبي المحمصة، عسل الزهور البرية، أنصاف عين الجمل، ورقائق ملح سلتيك المعدني.',
    description_tr: 'Kremsi soğuk sıkım susam tahini, elde kavrulmuş altın susam tohumları, yabani çiçek balı, yarım cevizler ve pul deniz tuzu.',
    fullDescription_ar: 'جرانولا غنية مائلة للملوحة اللذيذة مستوحاة من صناعة الحلويات التراثية اليدوية الممتازة. نقوم بتشريب الشوفان الكامل في معجون طحينة السمسم الحجرية وعسل زهور الصحراء البرية، ثم تحمص مع السمسم الأسود والذهبي حتى تصبح فائقة القرمشة، وتنتهي برقائق ثمينة من ملح سلتيك البحري الغني بالمعادن.',
    fullDescription_tr: 'Geleneksel şekerlemelerden esinlenen zengin, tuzlu lezzete sahip bir granola. Organik yulafları taş değirmende çekilmiş tahin, yabani çöllerin çiçek balı ve yüksek besleyici cevizler ile doyuruyoruz. Gevrek olana kadar beyaz ve siyah susam tohumlarıyla kavurup mineral dengesi için kelt deniz tuzu pullarıyla bitiriyoruz.',
    origin_ar: 'صنع يدوياً في الرياض',
    origin_tr: 'Riyad\'da El Yapımı',
    ingredients_ar: ['شوفان عضوي كامل', 'طحينة سمسم معصورة على الحجر', 'عسل زهور برية صحراوية', 'أنصاف جوز عين جمل منتقى', 'سمسم أبيض محمّص', 'ملح سلتيك البحري المعدني'],
    ingredients_tr: ['Organik Yulaf Ezmesi', 'Taş Baskı Susam Tahini', 'Çöl Çiçekleri Balı', 'Özenle Seçilmiş Ceviz İçi', 'Kavrulmuş Ak Susam Tohumları', 'Kelt Deniz Tuzu Pulları'],
    notes_ar: 'مذهلة كإضافة مقرمشة مالحة فوق شوربات اليقطين والبطاطس الحلوة المشوية، أو مضافة للكونتراست اللذيذ فوق جيلاتو الفانيليا.',
    notes_tr: 'Tuzlu çıtırlığıyla fırınlanmış tatlı patateslerin üzerinde veya vanilyalı dondurma ile kontrast oluşturan nefis bir tat sunar.'
  },
  {
    id: 'loomi-fermented-black-lime',
    title: 'Sun-Fermented Loomi Black Lime',
    arabicTitle: 'ليمون لومي مفروم ومطحون',
    subtitle: 'Spice Series',
    series: 'spice',
    category: 'Single Spices',
    description: 'Traditional sun-cured whole black limes ground to an intense sour, citrusy, beautifully fermented powder.',
    fullDescription: 'Made by boiling fresh lime citrus fruit in mineral saltwater and leaving them to slow-cure in desert sun sands until they carbonize black. The result is an intensely sour, slightly woodsy, deeply fermented citrus powder that provides instant brightness with earthiness.',
    price: 12,
    weight: '95g',
    origin: 'Salted Desert Basins',
    ingredients: ['Ground Fermented Black Lime'],
    image: heroJarImg,
    featured: false,
    notes: 'An essential dust for seafood risottos, rich white meat stews, spice rubs, or complex vegetable tagines.',

    title_ar: 'اللومي الأسود المجفف تحت شمس الصحراء',
    title_tr: 'Güneşte Fermente Siyah Loomi Limonu',
    subtitle_ar: 'سلسلة البهارات',
    subtitle_tr: 'Baharat Serisi',
    description_ar: 'ليمون أسود كامل ومجفف تحت شمس الصحراء الحارقة ومفروم كبودرة حامضة نفاذة ذات لمسة خشبية معتقة مذهلة.',
    description_tr: 'Geleneksel olarak güneşte kurutulmuş bütün siyah misket limonlarının, yoğun ekşi, narenciye aromalı, fermente edilmiş toz haline getirilmesi.',
    fullDescription_ar: 'يُصنع عن طريق سلق ثمار ليمون الكي لايم الطازجة في مياه البحر المعدنية ثم تركها لتجف ببطء متناهٍ في رمال الصحراء الذهبية الساخنة حتى تتفحم بلون أسود طبيعي. النتيجة هي بودرة ليمون حامضة بشكل مكثف برائحة ترابية خشبية نفاذة تمنح حموضة معتقة فورية للمأكولات.',
    fullDescription_tr: 'Taze misket limonlarının tuzlu suda kaynatılması ve çöl kumlarında karbonize olana kadar kurumaya bırakılmasıyla elde edilir. Sonuç, yemeklere anında parlaklık ve derinlik kazandıran yoğun ekşi, hafif odunsu, narenciye tozudur.',
    origin_ar: 'أحواض المياه المركزة في الصحراء',
    origin_tr: 'Tuzlu Çöl Havzaları',
    ingredients_ar: ['ليمون لومي أسود مطحون ومخمر طبيعياً'],
    ingredients_tr: ['Öğütülmüş Fermente Siyah Limon'],
    notes_ar: 'تعد غبار اللومي غباراً سحرياً لشوربات المأكولات البحرية، اليخنات، وتتبيل وافر لصدور الدجاج المشوية والتاغين اللذيذ.',
    notes_tr: 'Deniz ürünleri risottoları, zengin beyaz et güveçleri, baharat sosları veya sebze yemekleri için vazgeçilmez bir malzemedir.'
  }
];

// Helper functions for Query system
export const fetchProductsApi = async (categoryFilter?: string): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!categoryFilter || categoryFilter === 'All') {
        resolve(products);
      } else {
        resolve(products.filter(p => p.category === categoryFilter));
      }
    }, 400); // realistic slight network delay for React Query simulation
  });
};

export const fetchProductByIdApi = async (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(products.find(p => p.id === id));
    }, 200);
  });
};

export const submitInquiryApi = async (inquiryData: any): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: `Thank you, ${inquiryData.name}. Your stockist inquiry for "${inquiryData.company}" has been logged successfully. The Rashah artisanal team will reach out directly.`
      });
    }, 800);
  });
};
