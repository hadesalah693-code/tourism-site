-- Sample trips (run after schema.sql). Replace image URLs if needed.

insert into public.trips (
  title_ar, title_en,
  short_description_ar, short_description_en,
  full_description_ar, full_description_en,
  destination, duration, price, currency,
  cover_image, gallery_images,
  is_featured, is_active
) values
(
  'أضواء شرم وخليج نعمة',
  'Sharm Lights & Naama Evenings',
  'إقامة فاخرة على البحر الأحمر مع غطس يومي وعشاء بإطلالة.',
  'Premium Red Sea stay with daily snorkeling and sunset dining.',
  'برنامج متوازن بين الاسترخاء على الشاطئ والغطس في الشعاب المرجانية، مع أمسيات هادئة في شرم الشيخ.',
  'A balanced blend of beach calm, reef snorkeling, and relaxed evenings across Sharm El Sheikh’s coastline.',
  'sharm',
  '6 nights',
  1299,
  'USD',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80',
  array[
    'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
  ],
  true,
  true
),
(
  'غردقة: جزر وغروب',
  'Hurghada: Islands & Golden Hours',
  'رحلات بحرية يومية وعائلية مع وقت فراغ للسبا.',
  'Island hopping and family-friendly sea days with spa time.',
  'تجربة غردقة الكلاسيكية: مياه صافية، رحلات إلى الجزر الصغيرة، وأجواء مناسبة للعائلات.',
  'Classic Hurghada — clear water, island hops, and easy-going family energy.',
  'hurghada',
  '5 nights',
  899,
  'USD',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
  array[
    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80'
  ],
  true,
  true
),
(
  'هدوء مرسى علم',
  'Marsa Alam Serenity',
  'شواطئ هادئة ولقاءات محتملة مع الدلافين.',
  'Quiet lagoons and dolphin-friendly mornings.',
  'باقة للباحثين عن إيقاع أبطأ: شواطئ نظيفة، غطس لطيف، ومساحات واسعة للراحة.',
  'For slower rhythms — clean beaches, gentle snorkeling, and wide-open downtime.',
  'marsa_alam',
  '7 nights',
  1099,
  'USD',
  'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80',
  array[
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'
  ],
  true,
  true
),
(
  'شرم: غوص مع مدرب',
  'Sharm: Guided Dive Week',
  'أسبوع يركز على مواقع الغوص الشهيرة بإرشاد محترف.',
  'A week focused on signature dive sites with pro guidance.',
  'مناسب لمحبي الأعماق: جداول غوص مرنة، مواقع متنوعة، ودعم لوجستي مريح.',
  'Built for divers — flexible schedules, varied sites, and smooth logistics.',
  'sharm',
  '8 nights',
  1599,
  'USD',
  'https://images.unsplash.com/photo-1512343879784-a96027f1bb6e?auto=format&fit=crop&w=1600&q=80',
  '{}',
  false,
  true
),
(
  'الغردقة للعائلات',
  'Hurghada Family Escape',
  'منتجع شامل مع أنشطة أطفال ومسبح دافئ.',
  'All-inclusive resort with kids’ clubs and warm pools.',
  'إقامة مريحة للعائلات مع أنشطة يومية ومساحات آمنة للعب.',
  'Comfort-first family stay with daily activities and safe play spaces.',
  'hurghada',
  '4 nights',
  749,
  'USD',
  'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=80',
  '{}',
  false,
  true
),
(
  'مرسى علم: لاغونز خاصة',
  'Marsa Alam: Lagoon Focus',
  'تجربة تركز على الشواطئ الهادئة والغطس الخفيف.',
  'A lagoon-forward trip with light snorkeling and long sunsets.',
  'لمن يفضلون المياه الضحلة والكثبان البعيدة عن الزحام.',
  'For shallow-water lovers and dunes away from the rush.',
  'marsa_alam',
  '6 nights',
  999,
  'USD',
  'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80',
  '{}',
  false,
  true
);
