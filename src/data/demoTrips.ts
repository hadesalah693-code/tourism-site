import type { Trip } from '../types/trip'

function trip({
  id,
  title,
  short,
  full,
  duration,
  price,
  featured = false,
}: {
  id: string
  title: string
  short: string
  full: string
  duration: string
  price: number
  featured?: boolean
}): Trip {
  const gallery_images = [`/trips/${id}/1.jpg`, `/trips/${id}/2.jpg`, `/trips/${id}/3.jpg`]

  return {
    id,
    title_ar: title,
    title_en: title,
    short_description_ar: short,
    short_description_en: short,
    full_description_ar: full,
    full_description_en: full,
    destination: 'hurghada',
    duration,
    price,
    currency: 'USD',
    cover_image: gallery_images[0],
    gallery_images,
    is_featured: featured,
    is_active: true,
  }
}

export const demoTrips: Trip[] = [
  trip({
    id: 'moto-safari-dinner-show',
    title: 'Moto Safari + Dinner + Show',
    short:
      'Exciting desert adventure combining quad biking, Bedouin culture, camel rides, dinner, and oriental entertainment.',
    full:
      'Program:\n- 50 km quad safari ride\n- Visit Bedouin village\n- Egyptian tea and fresh bread tasting\n- Camel riding\n- Buffet dinner\n- Belly dance and fire show\n- Hotel transfer included\n\nTiming: Daily — 14:00 to 19:00\nChildren: Kids under 5 free. Kids 5–10: 50% discount.\nHero image theme: Desert quad biking at sunset + Bedouin camp + oriental night show.',
    duration: '14:00 to 19:00',
    price: 25,
    featured: true,
  }),
  trip({
    id: 'utopia-island',
    title: 'Utopia Island',
    short: 'Relaxing island trip with snorkeling, SeaScope experience, lunch, and beautiful Red Sea views.',
    full:
      'Program:\n- Snorkeling stop at coral reefs\n- SeaScope glass boat experience\n- Snorkeling equipment included\n- Lunch and soft drinks\n- 1.5-hour stay on Utopia Island\n- Hotel transfer included\n\nTiming: Daily — 09:00 to 17:00\nChildren: Kids under 5 free. Kids 5–10: 50% discount.\nHero image theme: Crystal-clear beach water + island relaxation + snorkeling.',
    duration: '09:00 to 17:00',
    price: 60,
    featured: true,
  }),
  trip({
    id: 'horse-riding',
    title: 'Horse Riding',
    short: 'Peaceful horseback riding experience through desert landscapes and Red Sea beaches.',
    full:
      'Program:\n- 2-hour horse ride\n- Desert trail\n- Beach trail with water entry option\n- Hotel transfer included\n\nTiming: Daily — 10:00 to 16:00\nHero image theme: Horse riding on the beach during sunset.',
    duration: '2 hours',
    price: 25,
  }),
  trip({
    id: 'hula-hula-island-vip',
    title: 'Hula Hula Island VIP',
    short: 'Premium island trip with snorkeling, luxury boat experience, and tropical beach vibes.',
    full:
      'Program:\n- Two snorkeling stops\n- Snorkeling equipment included\n- Lunch and soft drinks\n- 1.5-hour island stay\n- Hotel transfer included\n\nTiming: Daily — 09:00 to 17:00\nHero image theme: Luxury beach island + swings + turquoise water.',
    duration: '09:00 to 17:00',
    price: 25,
    featured: true,
  }),
  trip({
    id: 'moto-beach-safari',
    title: 'Moto Beach Safari',
    short: 'Adventure safari mixing beach scenery with desert quad biking.',
    full:
      'Program:\n- 2-hour quad tour\n- Desert and beach routes\n- Scenic photo stops\n- Hotel transfer included\n\nTiming: Daily — 09:00 to 16:00\nHero image theme: Quad bike on beach and desert roads.',
    duration: '2 hours',
    price: 30,
  }),
  trip({
    id: 'dolphin-house',
    title: 'Dolphin House',
    short: 'Boat trip to Dolphin House with snorkeling and chance to swim near dolphins.',
    full:
      'Program:\n- Dolphin House snorkeling stop\n- Coral reef snorkeling stop\n- Snorkeling equipment included\n- Lunch and soft drinks\n- Hotel transfer included\n\nTiming: Daily — 09:00 to 17:00\nChildren: Kids under 5 free. Kids 5–10: 15 USD.\nHero image theme: Wild dolphins swimming in open sea.',
    duration: '09:00 to 17:00',
    price: 25,
    featured: true,
  }),
  trip({
    id: 'professional-diving',
    title: 'Professional Diving',
    short: 'Professional diving experience for certified divers in the Red Sea.',
    full:
      'Program:\n- Two deep diving spots\n- Diving equipment included\n- Personal instructor\n- Lunch and soft drinks\n- Hotel transfer included\n\nTiming: Daily — 09:00 to 16:00\nRequirements: PADI certification required.\nHero image theme: Deep diving with colorful coral reefs and sea life.',
    duration: '09:00 to 16:00',
    price: 40,
  }),
  trip({
    id: 'eden-island',
    title: 'Eden Island',
    short: 'Luxury island day trip with snorkeling and relaxing beach atmosphere.',
    full:
      'Program:\n- Snorkeling stop\n- Snorkeling equipment included\n- Breakfast, snacks, and lunch\n- Soft drinks included\n- 3-hour island stay\n- Hotel transfer included\n\nTiming: Daily — 09:00 to 17:00\nHero image theme: Luxury island swing + turquoise water + tropical beach.',
    duration: '09:00 to 17:00',
    price: 70,
    featured: true,
  }),
  trip({
    id: 'paradise-island',
    title: 'Paradise Island',
    short: 'Relaxing tropical island trip perfect for snorkeling and beach lovers.',
    full:
      'Program:\n- Coral reef snorkeling stop\n- Snorkeling equipment included\n- Lunch and soft drinks\n- 2.5-hour island stay\n- Hotel transfer included\n\nTiming: Daily — 09:00 to 17:00\nExtra notes: Government island tax may apply.\nHero image theme: White sand beach + tropical island + crystal water.',
    duration: '09:00 to 17:00',
    price: 45,
  }),
  trip({
    id: 'super-safari',
    title: 'Super Safari',
    short: 'Full desert experience with jeep safari, buggy rides, camel riding, dinner, and entertainment.',
    full:
      'Program:\n- Jeep desert safari\n- Bedouin village visit\n- Tea and bread tasting\n- Camel riding\n- 30-minute quad ride\n- 20-minute buggy ride\n- Buffet dinner\n- Belly dance and fire show\n- Hotel transfer included\n\nTiming: Daily — 13:00 to 19:00\nHero image theme: Quad biking + camel + desert dinner show.',
    duration: '13:00 to 19:00',
    price: 22,
    featured: true,
  }),
  trip({
    id: 'camel-riding',
    title: 'Camel Riding',
    short: 'Traditional camel riding experience through desert and beach areas.',
    full:
      'Program:\n- 2-hour camel ride\n- Desert and beach route\n- Hotel transfer included\n\nTiming: Daily — 10:00 to 16:00\nHero image theme: Camel ride in desert during sunset.',
    duration: '2 hours',
    price: 25,
  }),
  trip({
    id: 'orange-bay-intro-diving',
    title: 'Orange Bay + Intro Diving',
    short: 'Island relaxation combined with beginner diving experience.',
    full:
      'Program:\n- Coral reef snorkeling stop\n- Intro diving session with instructor\n- Snorkeling and diving equipment included\n- Lunch and soft drinks\n- 1.5-hour Orange Bay stay\n- Hotel transfer included\n\nTiming: Daily — 09:00 to 17:00\nHero image theme: Orange Bay beach + beginner diving + coral reefs.',
    duration: '09:00 to 17:00',
    price: 35,
    featured: true,
  }),
  trip({
    id: 'swimming-with-dolphins',
    title: 'Swimming with Dolphins',
    short: 'Unique dolphin swimming experience in Hurghada dolphinarium.',
    full:
      'Program:\n- 5-minute dolphin swimming session\n- Safety equipment available\n- Professional photographers available\n- Hotel transfer included\n\nTiming: Daily — 11:00 and 13:00\nHero image theme: People swimming and playing with dolphins.',
    duration: '11:00 and 13:00',
    price: 55,
  }),
  trip({
    id: 'dolphin-photo-session',
    title: 'Dolphin Photo Session',
    short: 'Professional dolphin photo session with memorable moments.',
    full:
      'Program:\n- 10–20 professional photos\n- Poolside photography session\n- Hotel transfer included\n\nTiming: Daily — 11:00 and 13:00\nHero image theme: Kissing and posing with dolphins.',
    duration: '11:00 and 13:00',
    price: 50,
  }),
  trip({
    id: 'intro-diving',
    title: 'Intro Diving',
    short: 'First diving experience for beginners in the Red Sea.',
    full:
      'Program:\n- Two diving stops\n- Diving equipment included\n- Personal instructor\n- Lunch and soft drinks\n- Hotel transfer included\n\nTiming: Daily — 09:00 to 16:00\nNotes: Maximum beginner depth: 6–8 meters.\nHero image theme: Beginner scuba diving with colorful fish.',
    duration: '09:00 to 16:00',
    price: 30,
  }),
  trip({
    id: 'bianca-island',
    title: 'Bianca Island',
    short: 'Premium island trip with snorkeling and crystal-clear water.',
    full:
      'Program:\n- Coral reef snorkeling stop\n- SeaScope experience\n- Snorkeling equipment included\n- Seafood lunch and drinks\n- 2-hour island stay\n- Hotel transfer included\n\nTiming: Thursday & Sunday — 09:00 to 17:00\nHero image theme: White luxury beach and island relaxation.',
    duration: '09:00 to 17:00',
    price: 65,
    featured: true,
  }),
  trip({
    id: 'mahmya-island',
    title: 'Mahmya Island',
    short: 'Exclusive Red Sea island experience with snorkeling and beach relaxation.',
    full:
      'Program:\n- Snorkeling stop\n- Snorkeling equipment included\n- Lunch and drinks\n- 4-hour island stay\n- Hotel transfer included\n\nTiming: Tuesday, Thursday, Sunday — 09:00 to 17:00\nHero image theme: Luxury white sand island and turquoise sea.',
    duration: '09:00 to 17:00',
    price: 95,
    featured: true,
  }),
  trip({
    id: 'magawish-island',
    title: 'Magawish Island',
    short: 'Quiet island escape for snorkeling and relaxation lovers.',
    full:
      'Program:\n- Two snorkeling stops\n- Snorkeling equipment included\n- Lunch and drinks\n- 1.5-hour island stay\n- Hotel transfer included\n\nTiming: Monday & Friday — 09:00 to 17:00\nHero image theme: Relaxed island vibes with beach lounges and turquoise water.',
    duration: '09:00 to 17:00',
    price: 30,
  }),
  trip({
    id: 'moto-safari-3-hours',
    title: 'Moto Safari (3 Hours)',
    short:
      'Fast-paced quad biking experience through the Egyptian desert, perfect for adrenaline lovers looking for a shorter adventure.',
    full:
      'Program:\n- 50 km quad biking through desert\n- Bedouin village visit\n- Egyptian tea and bread tasting\n- Camel riding\n- Hotel transfer included\n\nTiming: Daily — 09:00 or 14:00\nDuration: 3 to 5 hours\nChildren: Kids under 5 free. Kids 5–10: 50% discount.\nHero image theme: Short desert quad safari adventure with dunes and beach views.',
    duration: '3 to 5 hours',
    price: 22,
  }),
  trip({
    id: 'dolphin-show',
    title: 'Dolphin Show',
    short: 'Family dolphinarium show with dolphins, sea lions, tricks, and live entertainment.',
    full:
      'Program:\n- 1-hour stay at the dolphinarium complex\n- Dolphin and sea lion show\n- Family entertainment with trainers\n- Hotel transfer included\n\nTiming: Daily — 10:00 and 15:00\nChildren: Kids under 5 free. Kids 5–10: 50% discount.\nHero image theme: Dolphins performing tricks and family entertainment.',
    duration: '1 hour',
    price: 18,
  }),
  trip({
    id: 'new-cairo-exclusive-mini-bus',
    title: 'New Cairo Exclusive (Mini Bus)',
    short:
      'Executive mini-bus day from Hurghada: Grand Egyptian Museum, Giza Pyramids & Sphinx, optional Nile cruise, perfumes & souvenirs, buffet lunch.',
    full:
      'Program:\n- New Grand Egyptian Museum\n- Pyramids of Giza\n- Great Sphinx\n- Optional Nile felucca ride (+10 USD)\n- Perfume & souvenir shop stop\n- Free buffet lunch; drinks paid extra\n- Polish-speaking escort/guide\n- Hotel transfers both ways\n\nTiming: Depart Tuesday, Thursday & Sunday at 01:00; back around 22:00\nChildren: Under 5: 40 USD; 5–12 years: 55 USD.',
    duration: 'Tue / Thu / Sun — dep. 01:00, ~22:00 return',
    price: 105,
    featured: true,
  }),
  trip({
    id: 'super-el-gouna',
    title: 'Super El Gouna',
    short:
      'Snorkeling on coral reefs, Dolphin House snorkeling, 30-minute SeaScope, seafood lunch on board, plus a 1-hour El Gouna city tour.',
    full:
      'Program:\n- Snorkeling at coral reefs\n- Snorkeling at Dolphin House (wild dolphins sometimes sighted)\n- 30-minute SeaScope submarine-style viewing\n- Seafood lunch & drinks on the boat\n- 1-hour El Gouna town tour\n- Hotel transfers included\n\nTiming: Daily — 09:00 to 16:00\nChildren: Under 5 free; 5–10 years: 25 USD.',
    duration: '09:00–16:00',
    price: 45,
  }),
  trip({
    id: 'kleopatra-spa',
    title: 'Kleopatra Spa',
    short:
      'Traditional Moroccan/Turkish bath, scrub, foam massage session, sauna, jacuzzi, and drinks — about 2 hours of spa relaxation.',
    full:
      'Program:\n- Traditional Moroccan/Turkish bath\n- Steam room\n- Full body scrub\n- Foam wash & cleanse\n- 45-minute full body massage\n- Dry sauna & steam sauna\n- Jacuzzi\n- Drinks during the visit\n- Hotel transfers included\n\nTiming: Daily — slots at 10:00, 14:00 or 16:00 (about 2 hours)\nNotes: Children — no discount stated.',
    duration: '~2 hours',
    price: 25,
  }),
  trip({
    id: 'new-cairo-by-bus',
    title: 'New Cairo by Bus',
    short:
      'Budget-friendly bus trip: Grand Egyptian Museum, Pyramids & Sphinx, optional Nile ride, perfumes & souvenirs, buffet lunch.',
    full:
      'Program:\n- New Grand Egyptian Museum\n- Optional Nile felucca ride (+10 USD)\n- Perfume & souvenir shop\n- Free buffet lunch; drinks paid extra\n- Pyramids of Giza & Great Sphinx\n- Polish-speaking escort/guide\n- Hotel transfers both ways\n\nTiming: Depart Tuesday, Thursday & Sunday from 00:00; back around 23:00\nChildren: Under 5: 10 USD; 5–12 years: 45 USD.',
    duration: 'Tue / Thu / Sun — dep. 00:00, ~23:00 return',
    price: 85,
    featured: true,
  }),
  trip({
    id: 'cairo-by-plane',
    title: 'Cairo by Plane',
    short:
      'Fly from Hurghada to Cairo for the Egyptian Museum (Tahrir), Nile cruise option, souvenirs, buffet lunch & Giza plateau.',
    full:
      'Program:\n- Old Egyptian Museum collection\n- Optional Nile felucca\n- Perfume & souvenir shop\n- Free buffet lunch; drinks paid extra\n- Pyramids of Giza & Great Sphinx\n- Polish-speaking escort/guide\n- Airport transfers both ways\n\nTiming: Runs daily.\nNotes: Children — no discount stated.',
    duration: 'Full day flight excursion',
    price: 270,
    featured: true,
  }),
  trip({
    id: 'mini-egypt-park',
    title: 'Mini Egypt Park',
    short:
      'Around 2-hour visit at Mini Egypt Park in Hurghada: scale models of famous Egyptian landmarks.',
    full:
      'Program:\n- About 2 hours at Mini Egypt Park\n- Detailed miniature models of major Egyptian monuments\n- Hotel transfers included\n\nTiming: Daily — 10:00 to 15:00\nChildren: Under 5 free; 5–10 years: 50% discount.',
    duration: '10:00–15:00',
    price: 30,
  }),
  trip({
    id: 'luxor-hot-air-balloon',
    title: 'Luxor + Hot Air Balloon',
    short:
      'Overnight in Luxor, sunrise balloon, Karnak, Hatshepsut, Memnon statues, Valley of the Kings — optional Banana Island Nile (+15 USD).',
    full:
      'Program:\n- Overnight stay in Luxor\n- Sunrise hot air balloon ride\n- Karnak Temple\n- Mortuary temple of Hatshepsut\n- Colossi of Memnon\n- Valley of the Kings\n- Optional Banana Island Nile trip (+15 USD)\n- Polish-speaking escort/guide\n- Buffet lunch; drinks paid extra\n- Hotel transfers both ways\n\nTiming: Depart Tuesday, Thursday, Friday & Sunday ~16:00; return next day ~20:00\nChildren: Under 10 years: 230 USD.',
    duration: '~2 days (eve dep. ~16:00)',
    price: 250,
    featured: true,
  }),
  trip({
    id: 'city-tour-hurghada',
    title: 'Hurghada City Tour',
    short:
      'Marina stroll, fish & produce market, Al Mina mosque viewpoint, panorama, Coptic church, and free shopping time.',
    full:
      'Program:\n- New Marina waterfront\n- Fish, vegetable & fruit market\n- Al Mina mosque\n- Scenic panorama stop\n- Coptic Orthodox church visit\n- Free shopping & souvenirs\n- Hotel transfers included\n\nTiming: Tuesday & Friday — 16:00 to 20:00 (according to minimum group)\nChildren: Under 5 free; 5–10 years: 50% discount.',
    duration: '16:00–20:00',
    price: 10,
  }),
  trip({
    id: 'grand-aquarium-hurghada',
    title: 'Grand Aquarium',
    short:
      'About two hours at Grand Aquarium Hurghada: glass tunnels, rainforest & mini zoo, shark feeding dives (scheduled).',
    full:
      'Program:\n- ~2-hour visit to Grand Aquarium\n- Glass tunnels & exhibits\n- Mini zoo & tropical rainforest zones\n- Shark feeding shows by scuba divers\n- Hotel transfers included\n\nTiming: Daily arrival window 10:00–16:00\nNotes: Shark feeding roughly 11:00–12:00 and 15:00–16:00\nChildren: Under 4 free; 4–10 years: 50% discount.',
    duration: '~2 hours slot',
    price: 40,
  }),
  trip({
    id: 'cairo-vip-mini-bus',
    title: 'Cairo VIP Mini Bus',
    short:
      'Comfort mini-bus: Old Egyptian Museum, optional Nile (+10 USD), perfumes, buffet lunch & Giza Pyramids with Sphinx.',
    full:
      'Program:\n- Old Egyptian Museum\n- Optional Nile felucca (+10 USD)\n- Perfume & souvenir shop\n- Free buffet lunch; drinks paid extra\n- Pyramids of Giza & Great Sphinx\n- Polish-speaking escort/guide\n- Hotel transfers both ways\n\nTiming: Monday, Wednesday, Friday & Saturday — departure 01:00; back around 22:00\nChildren: Under 5: 20 USD; 5–12 years: 40 USD.',
    duration: 'Mon / Wed / Fri / Sat — dep. 01:00, ~22:00 return',
    price: 70,
  }),
  trip({
    id: 'new-cairo-exclusive-by-plane',
    title: 'New Cairo Exclusive by Plane',
    short:
      'Fly to Cairo for the new Grand Egyptian Museum, Pyramids & Sphinx, optional Nile, souvenirs & buffet lunch.',
    full:
      'Program:\n- New Grand Egyptian Museum\n- Pyramids of Giza & Great Sphinx\n- Optional Nile felucca\n- Perfume & souvenir shop\n- Free buffet lunch; drinks paid extra\n- Polish-speaking escort/guide\n- Airport transfers both ways\n\nTiming: Daily.\nNotes: Children — no discount stated.',
    duration: 'Full day flight excursion',
    price: 320,
    featured: true,
  }),
  trip({
    id: 'luxor-vip-mini-bus',
    title: 'Luxor VIP Mini Bus',
    short:
      'Same-day Luxor highlights: Karnak, Hatshepsut, Memnon, Valley of the Kings — optional Banana Island (+15 USD).',
    full:
      'Program:\n- Karnak Temple\n- Mortuary temple of Hatshepsut\n- Colossi of Memnon\n- Valley of the Kings\n- Optional Banana Island Nile trip (+15 USD)\n- Polish-speaking escort/guide\n- Buffet lunch; drinks paid extra\n- Hotel transfers both ways\n\nTiming: Monday, Wednesday, Friday & Saturday — depart ~04:00; back ~20:00\nChildren: Under 5: 20 USD; 5–12 years: 40 USD.',
    duration: 'Mon / Wed / Fri / Sat — dep. ~04:00, ~20:00 return',
    price: 75,
  }),
  trip({
    id: 'cairo-by-bus',
    title: 'Cairo by Bus',
    short:
      'Economy overnight bus excursion: Tahrir Egyptian Museum, optional Nile (+10 USD), perfumes, lunch & pyramids.',
    full:
      'Program:\n- Old Egyptian Museum (Tahrir)\n- Optional Nile felucca (+10 USD)\n- Perfume & souvenir shop\n- Free buffet lunch; drinks paid extra\n- Pyramids of Giza & Great Sphinx\n- Polish-speaking escort/guide\n- Hotel transfers both ways\n\nTiming: Daily — depart 00:00; back around 23:00\nChildren: Under 5: 10 USD; 5–12 years: 35 USD.',
    duration: 'Daily — dep. 00:00, ~23:00 return',
    price: 60,
  }),
  trip({
    id: 'parasailing',
    title: 'Parasailing',
    short:
      'Motorboat trip with single or tandem parasail over the Red Sea coast — transfers included (~2 hr total window).',
    full:
      'Program:\n- Motorboat offshore trip\n- Parasail flight (solo or tandem)\n- Hotel transfers included\n\nTiming: Daily — 10:00 to 16:00 (experience ~2 hours)\nRequirements: Combined weight for tandem max 150 kg\nNotes: Children — no discount stated.',
    duration: '~2 hours',
    price: 20,
  }),
  trip({
    id: 'seascope-hurghada',
    title: 'SeaScope',
    short:
      'Panoramic underwater viewing plus 30-minute snorkeling slot with equipment — multiple daily departures.',
    full:
      'Program:\n- ~45 minutes panoramic underwater/semi-sub viewing\n- 30 minutes snorkeling at a reef spot\n- Snorkeling equipment included\n- Hotel transfers included\n\nTiming daily windows:\n- 08:30–10:30\n- 11:00–13:00\n- 13:00–15:00\n- 15:00–17:00\nChildren: Under 5 free; 5–10 years: 10 USD.',
    duration: 'Choose time window',
    price: 17,
  }),
  trip({
    id: 'luxor-by-bus',
    title: 'Luxor by Bus',
    short:
      'Guided Luxor day from Hurghada: Karnak & Hatshepsut temples, Memnon, Valley of the Kings — optional Banana Island (+15 USD).',
    full:
      'Program:\n- Karnak Temple\n- Mortuary temple of Hatshepsut\n- Colossi of Memnon\n- Valley of the Kings\n- Optional Banana Island Nile trip (+15 USD)\n- Polish-speaking escort/guide\n- Buffet lunch; drinks paid extra\n- Hotel transfers both ways\n\nTiming: Daily — depart ~03:00; back ~21:00\nChildren: Under 5: 10 USD; 5–12 years: 35 USD.',
    duration: 'Daily — dep. ~03:00, ~21:00 return',
    price: 65,
  }),
  trip({
    id: 'orange-bay-island',
    title: 'Orange Bay Island',
    short:
      'Enjoy a relaxing full-day boat trip to Orange Bay, featuring crystal-clear water, a sandy beach, snorkeling stops, lunch, and beautiful Red Sea views.',
    full:
      'Approximate Tour Time:\n- Start: 8:00 AM\n- Finish: 4:00 PM\n- Pickup time depends on your hotel location.\n\nWhat’s Included:\n- Hotel pickup and return transfer\n- Boat trip\n- Orange Bay entrance\n- Time on the island\n- Two snorkeling stops\n- Snorkeling equipment\n- Buffet lunch\n- Soft drinks and water\n- Professional snorkeling guide\n\nWhat’s Not Included:\n- Personal expenses\n- Photos and videos\n- Optional water activities\n- National Park fees, if applicable\n- Transfer supplements from distant areas',
    duration: '08:00 to 16:00',
    price: 0,
    featured: true,
  }),
  trip({
    id: 'paradise-island-hurghada',
    title: 'Paradise Island',
    short:
      'Spend a wonderful day at Paradise Island, combining a beautiful sandy beach, turquoise water, snorkeling, lunch, and a comfortable boat trip.',
    full:
      'Approximate Tour Time:\n- Start: 8:00 AM\n- Finish: 4:00 PM\n\nWhat’s Included:\n- Hotel pickup and return transfer\n- Boat trip\n- Paradise Island entrance\n- Beach time\n- Snorkeling stops\n- Snorkeling equipment\n- Lunch on the boat or island\n- Soft drinks and water\n- Professional guide\n\nWhat’s Not Included:\n- $10 National Park fee per person\n- Personal expenses\n- Photos and videos\n- Optional activities\n- Transfer supplements from El Gouna, Safaga, or distant hotels',
    duration: '08:00 to 16:00',
    price: 45,
    featured: true,
  }),
  trip({
    id: 'dolphin-house-hurghada',
    title: 'Dolphin House',
    short:
      'Sail to one of Hurghada’s best-known dolphin areas and enjoy snorkeling in the open sea, with the possibility of seeing dolphins in their natural environment.',
    full:
      'Approximate Tour Time:\n- Start: 7:30–8:00 AM\n- Finish: 3:30–4:00 PM\n\nWhat’s Included:\n- Hotel pickup and return transfer\n- Full-day boat trip\n- Dolphin House visit\n- Two snorkeling stops\n- Snorkeling equipment\n- Buffet lunch\n- Soft drinks and water\n- Professional snorkeling guide\n- Life jackets\n\nWhat’s Not Included:\n- Personal expenses\n- Photos and videos\n- National Park fees, if applicable\n- Transfer supplements from distant areas\n\nImportant Note:\nDolphins are wild animals, so sightings and swimming with them cannot be guaranteed.',
    duration: '07:30 to 16:00',
    price: 25,
    featured: true,
  }),
  trip({
    id: 'private-speedboat-trip',
    title: 'Private Speedboat Trip',
    short:
      'Discover the Red Sea with complete privacy and flexibility, choosing between Abu Monkar, Orange Bay, Paradise Island, Ozera, or Hola Hola.',
    full:
      'Approximate Tour Time:\n- Morning or afternoon departure\n- Duration: Approximately 4 hours\n\nWhat’s Included:\n- Private speedboat\n- Hotel pickup and return transfer within Hurghada\n- Professional captain\n- Snorkeling stops\n- Snorkeling equipment\n- Soft drinks and water\n- Fresh fruit\n- Life jackets\n\nWhat’s Not Included:\n- Island entrance fees\n- National Park fees\n- Lunch unless selected\n- Photos and videos\n- Personal expenses\n- Transfer supplements from areas outside Hurghada\n- Additional hours beyond the booked duration\n\nAvailable Destinations:\n- Abu Monkar Island\n- Orange Bay\n- Paradise Island\n- Ozera\n- Hola Hola Beach',
    duration: 'Approximately 4 hours',
    price: 0,
    featured: true,
  }),
]
