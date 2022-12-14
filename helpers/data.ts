import {SearchList} from '../types';

export const categories = {
  discover: 'Se cultiver',
  nature: 'Découvrir la nature',
  visit: 'Visiter',
  bar: 'Bars',
  cafe: 'Cafés',
  store: 'Magasins',
  restaurant: 'Restaurants',
  night: 'Sortir la nuit',
  day: 'Sortir le jour',
};

export const types = [
  {
    value: 'park',
    label: 'Parc',
    category: categories.day,
  },
  {
    value: 'amusement_park',
    label: 'Parc de loisir',
    category: categories.day,
  },
  {
    value: 'zoo',
    label: 'Zoo',
    category: categories.day,
  },
  {
    value: 'tourist_attraction',
    label: 'Attraction touristique',
    category: categories.day,
  },
  {
    value: 'aquarium',
    label: 'Aquarium',
    category: categories.day,
  },
  {
    value: 'museum',
    label: 'Musée',
    category: categories.discover,
  },
  {
    value: 'art_gallery',
    label: "Gallerie d'art",
    category: categories.discover,
  },
  {
    value: 'store',
    label: 'Magasin',
    category: categories.store,
  },
  {
    value: 'liquor_store',
    label: 'Magasin de vins et spiritueux',
    category: categories.store,
  },
  {
    value: 'clothing_store',
    label: 'Magasin de vêtements',
    category: categories.store,
  },
  {
    value: 'shoe_store',
    label: 'Magasin de chaussures',
    category: categories.store,
  },
  {
    value: 'electronics_store',
    label: "Magasin d'éléctronique",
    category: categories.store,
  },
  {
    value: 'jewelry_store',
    label: 'Magasin de bijoux',
    category: categories.store,
  },
  {
    value: 'pet_store',
    label: 'Magasin pour animaux',
    category: categories.store,
  },
  {
    value: 'book_store',
    label: 'Magasin de livres',
    category: categories.store,
  },
  {
    value: 'department_store',
    label: 'Grand magasin',
    category: categories.store,
  },
  {
    value: 'shopping_mall',
    label: 'Centre commercial',
    category: categories.store,
  },
  {
    value: 'movie_rental',
    label: 'Magasin de location de films',
    category: categories.store,
  },
  {
    value: 'bakery',
    label: 'Boulangerie',
    category: categories.store,
  },
  {
    value: 'restaurant',
    label: 'Restaurant',
    category: categories.restaurant,
  },
  {
    value: 'bar',
    label: 'Bar',
    category: categories.bar,
  },
  {
    value: 'cafe',
    label: 'Café',
    category: categories.cafe,
  },
  {
    value: 'library',
    label: 'Librairie',
    category: categories.discover,
  },
  {
    value: 'spa',
    label: 'Spa',
    category: categories.day,
  },
  {
    value: 'mosque',
    label: 'Mosqué',
    category: categories.visit,
  },
  {
    value: 'church',
    label: 'Eglise',
    category: categories.visit,
  },
  {
    value: 'synagogue',
    label: 'Synagogue',
    category: categories.visit,
  },
  {
    value: 'embassy',
    label: 'Embassade',
    category: categories.visit,
  },
  {
    value: 'hindu_temple',
    label: 'Temple hindu',
    category: categories.visit,
  },
  {
    value: 'movie_theater',
    label: 'Théatre',
    category: categories.visit,
  },
  {
    value: 'bowling_alley',
    label: 'Bowling',
    category: categories.night,
  },
  {
    value: 'casino',
    label: 'Casino',
    category: categories.night,
  },
  {
    value: 'night_club',
    label: 'Boite de nuit',
    category: categories.night,
  },
];

export const searchList: SearchList[] = [
  {
    categoryName: 'Sortir dans la nature',
    categoryValues: [
      {type: ['park'], keyword: '', label: 'Parcs'},
      {type: ['natural_feature'], keyword: '', label: 'Elément naturel'},
      {keyword: 'foret', label: 'Forêts'},
      {keyword: 'montagne', label: 'Montagnes'},
      {keyword: 'randonnée', label: 'Randonnées'},
      {keyword: 'sommet', label: 'Sommets'},
      {keyword: 'mont', label: 'Monts'},
      {keyword: 'lac', label: 'Lacs'},
      {keyword: 'ile', label: 'Iles'},
      {keyword: 'sentier', label: 'Sentiers'},
      {keyword: 'grotte', label: 'Grotte'},
      {keyword: 'safari', label: 'Safari'},
    ],
    typesToExclude: ['hotel', 'store', 'restaurant', 'campground', 'hair_care'],
  },
  {
    categoryName: 'Activités sportives',
    categoryValues: [
      {type: ['amusement_park'], keyword: '', label: 'Parcs de loisir'},
      {keyword: 'skatepark', label: 'Skateparks'},
      {keyword: 'futsal', label: 'Futsal'},
      {keyword: 'foot', label: 'Foot'},
      {keyword: "tir a l'arc", label: "Tir à l'arc"},
      {keyword: 'acrobranche', label: 'Accrobranches'},
      {keyword: 'piscine', label: 'Piscines'},
      {keyword: 'golf', label: 'Golfs'},
      {keyword: 'tennis', label: 'Tennis'},
      {keyword: 'badminton', label: 'Badminton'},
      {keyword: 'trampoline', label: 'Jump park'},
      {keyword: 'baseball', label: 'Baseball'},
      {keyword: 'basket terrain', label: 'Basketball'},
    ],
    typesToExclude: ['hotel', 'store'],
  },
  {
    categoryName: 'Se divertir',
    categoryValues: [
      {keyword: 'bowling', label: 'Bowlings'},
      {keyword: 'cinema', label: 'Cinémas'},
      {keyword: 'aquatique', label: 'Parcs aquatiques'},
      {keyword: 'arcade', label: "Salle d'arcades"},
      {keyword: 'karting', label: 'Kartings'},
      {keyword: 'vr', label: 'Espace VR'},
      {keyword: 'escape game', label: 'Escape games'},
      {keyword: 'laser game', label: 'Laser games'},
      {keyword: 'paintball', label: 'Paint ball'},
      {keyword: 'bateau', label: 'Location de bateau'},
      {keyword: 'lancer de hache', label: 'Lancer de hache'},
      {keyword: 'boué tracté', label: 'Boué tractée'},
      {keyword: 'jetski', label: 'Location de jetski'},
      {keyword: 'thermes', label: 'Thermes'},
      {keyword: 'spa', label: 'SPA'},
      {keyword: 'casino', label: 'Casino'},
      {keyword: 'boite de nuit', label: 'Boîte de nuits'},
    ],
    typesToExclude: ['hotel', 'store', 'car_repair'],
  },
  {
    categoryName: 'A visiter',
    //villes
    categoryValues: [
      {
        type: ['tourist_attraction'],
        keyword: '',
        label: 'Attractions touristiques',
      },
      {keyword: 'zoo', label: 'Zoo'},
      {keyword: 'musee', label: 'Musées'},
      {type: ['art_gallery'], keyword: '', label: "Gallerie d'art"},
      {keyword: 'chateau', label: 'Chateaux'},
      {keyword: 'temple', label: 'Temple'},
      {type: ['church'], keyword: '', label: 'Eglises'},
      {type: ['synagogue'], keyword: '', label: 'Synaguogues'},
      {type: ['mosque'], keyword: '', label: 'Mosquées'},
      {type: ['place_of_worship'], keyword: '', label: 'Lieux religieux'},
      {keyword: 'aquarium', label: 'Aquariums'},
    ],
    typesToExclude: ['hotel', 'store'],
  },
  {
    categoryName: 'Restaurants',
    categoryValues: [
      {keyword: 'restaurant japonais', label: 'Japonais'},
      {keyword: 'restaurant chinois', label: 'Chinois'},
      {keyword: 'restaurant coréen', label: 'Coréen'},
      {keyword: 'restaurant indien', label: 'Indien'},
      {keyword: 'restaurant américain', label: 'Américain'},
      {keyword: 'restaurant asiatique', label: 'Asiatique'},
      {keyword: 'restaurant thai', label: 'Thai'},
      {keyword: 'restaurant marocain', label: 'Marocain'},
      {keyword: 'restaurant vietnamien', label: 'Vietnamien'},
      {keyword: 'restaurant italien', label: 'Italien'},
      {keyword: 'restaurant libanais', label: 'Libanais'},
      {keyword: 'restaurant africain', label: 'Africain'},
      {keyword: 'pizza', label: 'Pizzeria'},
      {keyword: 'creperie', label: 'Crêperie'},
      {keyword: 'fast-food', label: 'Fast-Food'},
      {keyword: 'burger', label: 'Burger'},
      {keyword: 'boulangerie', label: 'Boulangerie'},
      {keyword: 'restaurant fruits de mer', label: 'Fruits de mer'},
      {keyword: 'restaurant steak', label: 'Grill et Steakhouse'},
      {keyword: 'sushi', label: 'Sushis'},
      {keyword: 'ramen', label: 'Ramen'},
      {keyword: 'brasserie', label: 'Brasserie'},
    ],
    typesToExclude: [],
  },
  {
    categoryName: 'Boire un coup',
    categoryValues: [
      {keyword: 'Buble Tea', label: 'Buble Tea'},
      {keyword: 'café', label: 'Cafés'},
    ],
    typesToExclude: [],
  },
  {
    categoryName: 'Bars',
    categoryValues: [
      {keyword: 'Bar', label: 'Bars'},
      {keyword: 'Pub', label: 'Pubs'},
      {keyword: 'Bar gaming', label: 'Bars Gaming'},
    ],
    typesToExclude: [],
  },
];
