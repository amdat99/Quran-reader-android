export async function fetchBookmarksAsync(id, contentid) {

  console.log('contentid',contentid)
  try {
    const response = await fetch(
      'https://quranlive.uk/fetchbookmarks',
      {
        // const response = await fetch('http://192.168.11.177:3000/fetchbookmarks',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: id,
          userid: contentid,
        }),
      },
    );
    const data = await response.json();
    console.log('data', data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchNotesAsync(id, contentid, page) {
  try {
    const response = await fetch(
      'https://quranlive.uk/fetchnotes',
      {
        // const response = await fetch('http://192.168.11.177:3000/fetchnotes',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: id,
          userid: contentid,
          page: page,
        }),
      },
    );
    const data = await response.json();
    console.log('data', data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export async function fetchAllNotesAsync(id, contentid) {
  try {
    const response = await fetch(
      'https://quranlive.uk/fetchallnotes',
      {
        // const response = await fetch('http://192.168.11.177:3000/fetchallnotes',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: id,
          userid: contentid,
        }),
      },
    );
    const data = await response.json();
    console.log('data', data);
    return data;
  } catch (e) {
    console.log(e);
  }
}

export const deleteBookmarkAsync = async bookmarkid => {
  console.log('deleting copies');
  try {
    //  const response = await fetch('http://192.168.11.177:3000/deletebookmark',{
    const response = await fetch(
      'https://quranlive.uk/deletebookmark',
      {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          bookmarkid: bookmarkid,
        }),
      },
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log('delete bookmark error', e);
  }
};

export const deleteNoteAsync = async noteid => {
  console.log('deleting note');
  try {
    const response = await fetch(
      'https://quranlive.uk/deletenote',
      {
        //  const response = await fetch('http://192.168.11.177:3000/deletenote',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          noteid: noteid,
        }),
      },
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log('delete note error', e);
  }
};
export const surahs = [
  {
    name: 'al-Fatihah',
    pageGreen: 2,
    num: 1,
  },
  {
    name: 'al-Baqarah',
    pageGreen: 3,
    num: 2,
  },
  {
    name: 'Al-ʿImran',
    pageGreen: 68,
    num: 3,
  },
  {
    name: 'an-Nisaʾ',
    pageGreen: 106,
    num: 4,
  },
  {
    name: 'al-Maʾidah',
    pageGreen: 147,
    num: 5,
  },
  {
    name: 'al-Anʿam',
    pageGreen: 177,
    num: 6,
  },
  {
    name: 'al-Aʿraf',
    pageGreen: 209,
    num: 7,
  },
  {
    name: 'al-Anfal',
    pageGreen: 246,
    num: 8,
  },
  {
    name: 'at-Taubah',
    pageGreen: 260,
    num: 9,
  },
  {
    name: 'Yuunus',
    pageGreen: 288,
    num: 10,
  },
  {
    name: 'Hud',
    pageGreen: 308,
    num: 11,
  },
  {
    name: 'Yusuf',
    pageGreen: 328,
    num: 12,
  },
  {
    name: 'ar-Raʿd',
    pageGreen: 346,
    num: 13,
  },
  {
    name: 'Ibrahim',
    pageGreen: 355,
    num: 14,
  },
  {
    name: 'al-Hijr',
    pageGreen: 365,
    num: 15,
  },
  {
    name: 'an-Nahl',
    pageGreen: 372,
    num: 16,
  },
  {
    name: 'al-Israʾ',
    pageGreen: 393,
    num: 17,
  },
  {
    name: 'al-Kahf',
    pageGreen: 408,
    num: 18,
  },
  {
    name: 'Maryam',
    pageGreen: 425,
    num: 19,
  },
  {
    name: 'Ṭa-Ha',
    pageGreen: 435,
    num: 20,
  },
  {
    name: 'al-Anbiyaʾ',
    pageGreen: 449,
    num: 21,
  },
  {
    name: 'al-Hajj',
    pageGreen: 462,
    num: 22,
  },
  {
    name: 'al-Muʾminun',
    pageGreen: 477,
    num: 23,
  },
  {
    name: 'an-Nur',
    pageGreen: 487,
    num: 24,
  },
  {
    name: 'al-Furqan',
    pageGreen: 501,
    num: 25,
  },
  {
    name: 'ash-Shuʿara',
    pageGreen: 511,
    num: 26,
  },
  {
    name: 'an-Naml',
    pageGreen: 525,
    num: 27,
  },
  {
    name: 'al-Qasas',
    pageGreen: 537,
    num: 28,
  },
  {
    name: 'al-ʿAnkabut',
    pageGreen: 552,
    num: 29,
  },
  {
    name: 'ar-Rum',
    pageGreen: 562,
    num: 30,
  },
  {
    name: 'Luqman',
    pageGreen: 571,
    num: 31,
  },
  {
    name: 'as-Sajdah',
    pageGreen: 577,
    num: 32,
  },
  {
    name: 'al-Ahzab',
    pageGreen: 581,
    num: 33,
  },
  {
    name: 'Sabaʾ',
    pageGreen: 595,
    num: 34,
  },
  {
    name: 'Fatir',
    pageGreen: 603,
    num: 35,
  },
  {
    name: 'Ya-Seen',
    pageGreen: 611,
    num: 36,
  },
  {
    name: 'as-saffat',
    pageGreen: 618,
    num: 37,
  },
  {
    name: 'Sad',
    pageGreen: 628,
    num: 38,
  },
  {
    name: 'az-Zumar',
    pageGreen: 635,
    num: 39,
  },
  {
    name: 'al-Mu`min',
    pageGreen: 647,
    num: 40,
  },
  {
    name: 'Hha-Meem- Sajdah',
    pageGreen: 659,
    num: 41,
  },
  {
    name: 'ash-Shura',
    pageGreen: 668,
    num: 42,
  },
  {
    name: 'az-Zukhruf',
    pageGreen: 677,
    num: 43,
  },
  {
    name: 'ad-Dukhan',
    pageGreen: 686,
    num: 44,
  },
  {
    name: 'al-Jathiyah',
    pageGreen: 691,
    num: 45,
  },
  {
    name: 'al-Ahqaf',
    pageGreen: 697,
    num: 46,
  },
  {
    name: 'Muhammad',
    pageGreen: 704,
    num: 47,
  },
  {
    name: 'al-Fath',
    pageGreen: 710,
    num: 48,
  },
  {
    name: 'al-Hujurat',
    pageGreen: 716,
    num: 49,
  },
  {
    name: 'Qaf',
    pageGreen: 721,
    num: 50,
  },
  {
    name: 'adh-Dhariyat',
    pageGreen: 725,
    num: 51,
  },
  {
    name: 'at-Tur',
    pageGreen: 729,
    num: 52,
  },
  {
    name: 'an-Najm',
    pageGreen: 732,
    num: 53,
  },
  {
    name: 'al-Qamar',
    pageGreen: 736,
    num: 54,
  },
  {
    name: 'ar-Rahman',
    pageGreen: 740,
    num: 55,
  },
  {
    name: 'al-Waqiʿah',
    pageGreen: 745,
    num: 56,
  },
  {
    name: 'al-Hadid',
    pageGreen: 750,
    num: 57,
  },
  {
    name: 'al-Mujadilah',
    pageGreen: 757,
    num: 58,
  },
  {
    name: 'al-Hashr',
    pageGreen: 761,
    num: 59,
  },
  {
    name: 'al-Mumtahanah',
    pageGreen: 766,
    num: 60,
  },
  {
    name: 'as-Saff',
    pageGreen: 770,
    num: 61,
  },
  {
    name: 'al-Jumuʿah',
    pageGreen: 773,
    num: 62,
  },
  {
    name: 'al-Munafiqun',
    pageGreen: 775,
    num: 63,
  },
  {
    name: 'at-Taghabun',
    pageGreen: 777,
    num: 64,
  },
  {
    name: 'at-Talaq',
    pageGreen: 780,
    num: 65,
  },
  {
    name: 'at-Tahrim',
    pageGreen: 783,
    num: 66,
  },
  {
    name: 'al-Mulk',
    pageGreen: 787,
    num: 67,
  },
  {
    name: 'al-Qalam',
    pageGreen: 790,
    num: 68,
  },
  {
    name: 'al-Haqqah',
    pageGreen: 794,
    num: 69,
  },
  {
    name: 'al-Maʿarij',
    pageGreen: 797,
    num: 70,
  },
  {
    name: 'Nuh',
    pageGreen: 800,
    num: 71,
  },
  {
    name: 'al-Jinn',
    pageGreen: 803,
    num: 72,
  },
  {
    name: 'al-Muzzammil',
    pageGreen: 806,
    num: 73,
  },
  {
    name: 'al-Muddaththir',
    pageGreen: 808,
    num: 74,
  },
  {
    name: 'al-Qiyamah',
    pageGreen: 811,
    num: 75,
  },
  {
    name: 'ad-Dahr',
    pageGreen: 813,
    num: 76,
  },
  {
    name: 'al-Mursalat',
    pageGreen: 816,
    num: 77,
  },
  {
    name: 'an-Nabaʾ',
    pageGreen: 819,
    num: 78,
  },
  {
    name: 'an-Naziʿat',
    pageGreen: 820,
    num: 79,
  },
  {
    name: 'ʿAbasa',
    pageGreen: 822,
    num: 80,
  },
  {
    name: 'at-Takwir',
    pageGreen: 824,
    num: 81,
  },
  {
    name: 'al-Infitar',
    pageGreen: 825,
    num: 82,
  },
  {
    name: 'al-Mutaffifin',
    pageGreen: 826,
    num: 82,
  },
  {
    name: 'al-Inshiqaq',
    pageGreen: 828,
    num: 83,
  },
  {
    name: 'al-Buruj',
    pageGreen: 829,
    num: 84,
  },
  {
    name: 'at-Tariq',
    pageGreen: 830,
    num: 85,
  },
  {
    name: 'al-Aʿla',
    pageGreen: 831,
    num: 86,
  },
  {
    name: 'al-Ghashiyah',
    pageGreen: 832,
    num: 87,
  },
  {
    name: 'al-Fajr',
    pageGreen: 833,
    num: 88,
  },
  {
    name: 'al-Balad',
    pageGreen: 835,
    num: 89,
  },
  {
    name: 'ash-Shams',
    pageGreen: 836,
    num: 90,
  },
  {
    name: 'al-Layl',
    pageGreen: 837,
    num: 91,
  },
  {
    name: 'ad-Duha',
    pageGreen: 838,
    num: 92,
  },
  {
    name: 'ash-Sharh',
    pageGreen: 838,
    num: 93,
  },
  {
    name: 'at-Tin',
    pageGreen: 839,
    num: 94,
  },
  {
    name: 'al-ʿAlaq',
    pageGreen: 839,
    num: 95,
  },
  {
    name: 'al-Qadr',
    pageGreen: 840,
    num: 95,
  },
  {
    name: 'al-Bayyinah',
    pageGreen: 840,
    num: 96,
  },
  {
    name: 'az-Zalzalah',
    pageGreen: 841,
    num: 97,
  },
  {
    name: 'al-ʿAdiyat',
    pageGreen: 842,
    num: 98,
  },
  {
    name: 'al-Qariʿah',
    pageGreen: 843,
    num: 99,
  },
  {
    name: 'at-Takathur',
    pageGreen: 843,
    num: 100,
  },
  {
    name: 'al-ʿAsr',
    pageGreen: 844,
    num: 101,
  },
  {
    name: 'al-Humazah',
    pageGreen: 844,
    num: 102,
  },
  {
    name: 'al-Fil',
    pageGreen: 844,
    num: 103,
  },
  {
    name: 'Quraysh',
    pageGreen: 845,
    num: 104,
  },
  {
    name: 'al-Maʿun',
    pageGreen: 845,
    num: 105,
  },
  {
    name: 'al-Kawthar',
    pageGreen: 846,
    num: 106,
  },
  {
    name: 'al-Kafirun',
    pageGreen: 846,
    num: 107,
  },
  {
    name: 'an-Nasr',
    pageGreen: 846,
    num: 108,
  },
  {
    name: 'al-Masad',
    pageGreen: 847,
    num: 109,
  },
  {
    name: 'al-Ikhlas',
    pageGreen: 847,
    num: 110,
  },
  {
    name: 'al-Falaq',
    pageGreen: 847,
    num: 111,
  },
  {
    name: 'an-Nas',
    pageGreen: 848,
    num: 112,
  },
];

export const juz = [
  {
    juz: 1,
    page: 2,
  },
  {
    juz: 2,
    page: 29,
  },
  {
    juz: 3,
    page: 57,
  },
  {
    juz: 4,
    page: 85,
  },
  {
    juz: 5,
    page: 113,
  },
  {
    juz: 6,
    page: 141,
  },
  {
    juz: 7,
    page: 169,
  },
  {
    juz: 8,
    page: 197,
  },
  {
    juz: 9,
    page: 225,
  },
  {
    juz: 10,
    page: 253,
  },
  {
    juz: 11,
    page: 281,
  },
  {
    juz: 12,
    page: 309,
  },
  {
    juz: 13,
    page: 337,
  },
  {
    juz: 14,
    page: 365,
  },
  {
    juz: 15,
    page: 393,
  },
  {
    juz: 16,
    page: 421,
  },
  {
    juz: 17,
    page: 449,
  },
  {
    juz: 18,
    page: 477,
  },

  {
    juz: 19,
    page: 505,
  },

  {
    juz: 20,
    page: 533,
  },

  {
    juz: 21,
    page: 559,
  },
  {
    juz: 23,
    page: 587,
  },
  {
    juz: 24,
    page: 641,
  },
  {
    juz: 25,
    page: 667,
  },
  {
    juz: 26,
    page: 697,
  },
  {
    juz: 27,
    page: 727,
  },
  {
    juz: 28,
    page: 757,
  },
  {
    juz: 29,
    page: 787,
  },
  {
    juz: 30,
    page: 819,
  },
];

export const translations = [
 [
  {
    id: 1,
    verse_key: '1:1',
    text_uthmani: '',
  },
  {
    id: 2,
    verse_key: '1:2',
    text_uthmani: 'ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَـٰلَمِينَ',
    text: 'With the name of Allah, the All-Merciful, the Very-Merciful.',
  },
  {
    id: 3,
    verse_key: '1:3',
    text_uthmani: 'ٱلرَّحْمَـٰنِ ٱلرَّحِيمِ',
    text: 'Praise belongs to Allah, the Lord of all the worlds.',
  },
  {
    id: 4,
    verse_key: '1:4',
    text_uthmani: 'مَـٰلِكِ يَوْمِ ٱلدِّينِ',
    text: 'the Master of the Day of Requital.',
  },
  {
    id: 5,
    verse_key: '1:5',
    text_uthmani: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
    text: 'You alone do we worship, and from You alone do we seek help.',
  },
  {
    id: 6,
    verse_key: '1:6',
    text_uthmani: 'ٱهْدِنَا ٱلصِّرَٰطَ ٱلْمُسْتَقِيمَ',
    text: 'Take us on the straight path.',
  },
  {
    id: 7,
    verse_key: '1:7',
    text_uthmani:
      'صِرَٰطَ ٱلَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا ٱلضَّآلِّينَ',
    text:
      'the path of those on whom You have bestowed Your Grace, not of those who have incurred Your wrath, nor of those who have gone astray.',
  },
],


 [
  {
    id: 8,
    verse_key: '2:1',
    text_uthmani: 'الٓمٓ',
    text: 'Alif. Lām. Mīm.',
  },
  {
    id: 9,
    verse_key: '2:2',
    text_uthmani:
      'ذَٰلِكَ ٱلْكِتَـٰبُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ',
    text: 'This Book has no doubt in it - a guidance for the God-fearing,',
  },
  {
    id: 10,
    verse_key: '2:3',
    text_uthmani:
      'ٱلَّذِينَ يُؤْمِنُونَ بِٱلْغَيْبِ وَيُقِيمُونَ ٱلصَّلَوٰةَ وَمِمَّا رَزَقْنَـٰهُمْ يُنفِقُونَ',
    text:
      'who believe in the Unseen, and are steadfast in Salāh (prayer), and spend out of what We have provided them;',
  },
  {
    id: 11,
    verse_key: '2:4',
    text_uthmani:
      'وَٱلَّذِينَ يُؤْمِنُونَ بِمَآ أُنزِلَ إِلَيْكَ وَمَآ أُنزِلَ مِن قَبْلِكَ وَبِٱلْـَٔاخِرَةِ هُمْ يُوقِنُونَ',
    text:
      'and who believe in what has been revealed to you and what has been revealed before you; and they have faith in the Hereafter.',
  },
],
  [
  {
    id: 12,
    verse_key: '2:5',
    text_uthmani:
      'أُو۟لَـٰٓئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُو۟لَـٰٓئِكَ هُمُ ٱلْمُفْلِحُونَ',
    text:
      'It is these who are guided by their Lord; and it is just these who are successful.',
  },
  {
    id: 13,
    verse_key: '2:6',
    text_uthmani:
      'إِنَّ ٱلَّذِينَ كَفَرُوا۟ سَوَآءٌ عَلَيْهِمْ ءَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ',
    text:
      'Surely for those who have disbelieved, it is all the same whether you warn them or you warn them not: they do not believe.',
  },
  {
    id: 14,
    verse_key: '2:7',
    text_uthmani:
      'خَتَمَ ٱللَّهُ عَلَىٰ قُلُوبِهِمْ وَعَلَىٰ سَمْعِهِمْ ۖ وَعَلَىٰٓ أَبْصَـٰرِهِمْ غِشَـٰوَةٌ ۖ وَلَهُمْ عَذَابٌ عَظِيمٌ',
    text:
      'Allah has set a seal on their hearts and on their hearing; and on their eyes there is a covering, and for them awaits a mighty punishment.',
  },
  {
    id: 15,
    verse_key: '2:8',
    text_uthmani:
      'وَمِنَ ٱلنَّاسِ مَن يَقُولُ ءَامَنَّا بِٱللَّهِ وَبِٱلْيَوْمِ ٱلْـَٔاخِرِ وَمَا هُم بِمُؤْمِنِينَ',
    text:
      'And among men there are some who say, “We believe in Allah and in the Last Day”, yet they are not believers.',
  },
  {
    id: 16,
    verse_key: '2:9',
    text_uthmani:
      'يُخَـٰدِعُونَ ٱللَّهَ وَٱلَّذِينَ ءَامَنُوا۟ وَمَا يَخْدَعُونَ إِلَّآ أَنفُسَهُمْ وَمَا يَشْعُرُونَ',
    text:
      'They try to deceive Allah and those who believe, while they are not deceiving anyone except themselves, although they are unaware of it.',
  },
  {
    id: 17,
    verse_key: '2:10',
    text_uthmani:
      'فِى قُلُوبِهِم مَّرَضٌ فَزَادَهُمُ ٱللَّهُ مَرَضًا ۖ وَلَهُمْ عَذَابٌ أَلِيمٌۢ بِمَا كَانُوا۟ يَكْذِبُونَ',
    text:
      'In their hearts there is a malady, so Allah has made them grow in their malady; and for them there is a grievous punishment, because they have been lying.',
  },
  {
    id: 18,
    verse_key: '2:11',
    text_uthmani:
      'وَإِذَا قِيلَ لَهُمْ لَا تُفْسِدُوا۟ فِى ٱلْأَرْضِ قَالُوٓا۟ إِنَّمَا نَحْنُ مُصْلِحُونَ',
    text:
      'When it is said to them, “Do not spread disorder on the earth”, they say, “We are but reformers.”',
  },
  {
    id: 19,
    verse_key: '2:12',
    text_uthmani:
      'أَلَآ إِنَّهُمْ هُمُ ٱلْمُفْسِدُونَ وَلَـٰكِن لَّا يَشْعُرُونَ',
    text:
      'Beware, it is, in fact, they who spread disorder, but they do not appreciate.',
  },
  {
    id: 20,
    verse_key: '2:13',
    text_uthmani:
      'وَإِذَا قِيلَ لَهُمْ ءَامِنُوا۟ كَمَآ ءَامَنَ ٱلنَّاسُ قَالُوٓا۟ أَنُؤْمِنُ كَمَآ ءَامَنَ ٱلسُّفَهَآءُ ۗ أَلَآ إِنَّهُمْ هُمُ ٱلسُّفَهَآءُ وَلَـٰكِن لَّا يَعْلَمُونَ',
    text:
      'And when it is said to them, “Believe as people have believed,” they say, “Shall we believe as the fools have believed?” Beware, it is, in fact, they who are the fools, but they do not know.',
  },
]


,[
  {
    id: 21,
    verse_key: '2:14',
    text_uthmani:
      'وَإِذَا لَقُوا۟ ٱلَّذِينَ ءَامَنُوا۟ قَالُوٓا۟ ءَامَنَّا وَإِذَا خَلَوْا۟ إِلَىٰ شَيَـٰطِينِهِمْ قَالُوٓا۟ إِنَّا مَعَكُمْ إِنَّمَا نَحْنُ مُسْتَهْزِءُونَ',
      text: "When they meet those who believe, they say, “We have entered Faith;” but when they are alone with their satans, they say, “Indeed, we are with you; we were only mocking.”"
  },
  {
    id: 22,
    verse_key: '2:15',
    text_uthmani:
      'ٱللَّهُ يَسْتَهْزِئُ بِهِمْ وَيَمُدُّهُمْ فِى طُغْيَـٰنِهِمْ يَعْمَهُونَ',
      text: "It is Allah who mocks at them, and lets them go on wandering blindly in their rebellion."
  },
  {
    id: 23,
    verse_key: '2:16',
    text_uthmani:
      'أُو۟لَـٰٓئِكَ ٱلَّذِينَ ٱشْتَرَوُا۟ ٱلضَّلَـٰلَةَ بِٱلْهُدَىٰ فَمَا رَبِحَت تِّجَـٰرَتُهُمْ وَمَا كَانُوا۟ مُهْتَدِينَ',
      text: "These are the people who have bought error at the price of guidance; so their trade has brought no gain, nor have they reached the right Path."

  },
  {
    id: 24,
    verse_key: '2:17',
    text_uthmani:
      'مَثَلُهُمْ كَمَثَلِ ٱلَّذِى ٱسْتَوْقَدَ نَارًا فَلَمَّآ أَضَآءَتْ مَا حَوْلَهُۥ ذَهَبَ ٱللَّهُ بِنُورِهِمْ وَتَرَكَهُمْ فِى ظُلُمَـٰتٍ لَّا يُبْصِرُونَ',
      text: "Their situation is like that of a man who kindles a fire, and when it illuminates everything around him, Allah takes away their lights and leaves them in layers of darkness, so that they see nothing."

    },
  {
    id: 25,
    verse_key: '2:18',
    text_uthmani: 'صُمٌّۢ بُكْمٌ عُمْىٌ فَهُمْ لَا يَرْجِعُونَ',
    text: "Deaf, dumb and blind, they shall not return."

  },
  {
    id: 26,
    verse_key: '2:19',
    text_uthmani:
      'أَوْ كَصَيِّبٍ مِّنَ ٱلسَّمَآءِ فِيهِ ظُلُمَـٰتٌ وَرَعْدٌ وَبَرْقٌ يَجْعَلُونَ أَصَـٰبِعَهُمْ فِىٓ ءَاذَانِهِم مِّنَ ٱلصَّوَٰعِقِ حَذَرَ ٱلْمَوْتِ ۚ وَٱللَّهُ مُحِيطٌۢ بِٱلْكَـٰفِرِينَ',
      text: "Or (it is) like a rainstorm from the sky, bringing darkness, thunder and lightning; they thrust their fingers in their ears against the thunderclaps for fear of death, -and Allah encompasses the disbelievers."

    },
  {
    id: 27,
    verse_key: '2:20',
    text_uthmani:
      'يَكَادُ ٱلْبَرْقُ يَخْطَفُ أَبْصَـٰرَهُمْ ۖ كُلَّمَآ أَضَآءَ لَهُم مَّشَوْا۟ فِيهِ وَإِذَآ أَظْلَمَ عَلَيْهِمْ قَامُوا۟ ۚ وَلَوْ شَآءَ ٱللَّهُ لَذَهَبَ بِسَمْعِهِمْ وَأَبْصَـٰرِهِمْ ۚ إِنَّ ٱللَّهَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ',
      text: "and lightning (all but) snatches away their eyesight; every time a flash gives them light, they walk by it; and when darkness falls upon them, they stand still. And if Allah willed, He would certainly take away their hearing and their eyes: surely Allah is powerful to do anything."

    },
],


[
  {
    id: 27,
    verse_key: '2:20',
    text_uthmani:
      'يَكَادُ ٱلْبَرْقُ يَخْطَفُ أَبْصَـٰرَهُمْ ۖ كُلَّمَآ أَضَآءَ لَهُم مَّشَوْا۟ فِيهِ وَإِذَآ أَظْلَمَ عَلَيْهِمْ قَامُوا۟ ۚ وَلَوْ شَآءَ ٱللَّهُ لَذَهَبَ بِسَمْعِهِمْ وَأَبْصَـٰرِهِمْ ۚ إِنَّ ٱللَّهَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ',
      text: "and lightning (all but) snatches away their eyesight; every time a flash gives them light, they walk by it; and when darkness falls upon them, they stand still. And if Allah willed, He would certainly take away their hearing and their eyes: surely Allah is powerful to do anything."

    },
  {
    id: 28,
    verse_key: '2:21',
    text_uthmani:
      'يَـٰٓأَيُّهَا ٱلنَّاسُ ٱعْبُدُوا۟ رَبَّكُمُ ٱلَّذِى خَلَقَكُمْ وَٱلَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',
      text: "O people, worship your Lord who created you and those before you, so that you may become God-fearing."

  },
  {
    id: 29,
    verse_key: '2:22',
    text_uthmani:
      'ٱلَّذِى جَعَلَ لَكُمُ ٱلْأَرْضَ فِرَٰشًا وَٱلسَّمَآءَ بِنَآءً وَأَنزَلَ مِنَ ٱلسَّمَآءِ مَآءً فَأَخْرَجَ بِهِۦ مِنَ ٱلثَّمَرَٰتِ رِزْقًا لَّكُمْ ۖ فَلَا تَجْعَلُوا۟ لِلَّهِ أَندَادًا وَأَنتُمْ تَعْلَمُونَ',
      text: "He is the One who made the earth a bed for you, and the sky a roof, and sent down water from the sky, then brought forth with it fruits, as a provision for you. So, do not set up parallels to Allah when you know."

    },
  {
    id: 30,
    verse_key: '2:23',
    text_uthmani:
      'وَإِن كُنتُمْ فِى رَيْبٍ مِّمَّا نَزَّلْنَا عَلَىٰ عَبْدِنَا فَأْتُوا۟ بِسُورَةٍ مِّن مِّثْلِهِۦ وَٱدْعُوا۟ شُهَدَآءَكُم مِّن دُونِ ٱللَّهِ إِن كُنتُمْ صَـٰدِقِينَ',
      text: "If you are in doubt about what We have revealed to Our servant, then bring a Sūrah similar to this, and do call your supporters other than Allah, if you are true."

    },
  {
    id: 31,
    verse_key: '2:24',
    text_uthmani:
      'فَإِن لَّمْ تَفْعَلُوا۟ وَلَن تَفْعَلُوا۟ فَٱتَّقُوا۟ ٱلنَّارَ ٱلَّتِى وَقُودُهَا ٱلنَّاسُ وَٱلْحِجَارَةُ ۖ أُعِدَّتْ لِلْكَـٰفِرِينَ',
      text: "And give good news to those who believe and do righteous deeds that for them there are gardens beneath which rivers flow. Every time they are given a fruit from there to eat, they will say, “This is what we have been given before”; and they will be given (fruits) resembling one another. And for them there shall be wives purified; and there they will live forever."

    },
  {
    id: 32,
    verse_key: '2:25',
    text_uthmani:
      'وَبَشِّرِ ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ أَنَّ لَهُمْ جَنَّـٰتٍ تَجْرِى مِن تَحْتِهَا ٱلْأَنْهَـٰرُ ۖ كُوَلَهُمْ فِيهَآ أَزْوَٰجٌ مُّطَهَّرَةٌ ۖ لَّمَا رُزِقُوا۟ مِنْهَا مِن ثَمَرَةٍ رِّزْقًا ۙ قَالُوا۟ هَـٰذَا ٱلَّذِى رُزِقْنَا مِن قَبْلُ ۖ وَأُتُوا۟ بِهِۦ مُتَشَـٰبِهًا ۖ وَهُمْ فِيهَا خَـٰلِدُونَ',
      text: "And give good news to those who believe and do righteous deeds that for them there are gardens beneath which rivers flow. Every time they are given a fruit from there to eat, they will say, “This is what we have been given before”; and they will be given (fruits) resembling one another. And for them there shall be wives purified; and there they will live forever."
 
    },
]

,[
  {
    id: 32,
    verse_key: '2:25',
    text_uthmani:
      'وَبَشِّرِ ٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ أَنَّ لَهُمْ جَنَّـٰتٍ تَجْرِى مِن تَحْتِهَا ٱلْأَنْهَـٰرُ ۖ كُوَلَهُمْ فِيهَآ أَزْوَٰجٌ مُّطَهَّرَةٌ ۖ لَّمَا رُزِقُوا۟ مِنْهَا مِن ثَمَرَةٍ رِّزْقًا ۙ قَالُوا۟ هَـٰذَا ٱلَّذِى رُزِقْنَا مِن قَبْلُ ۖ وَأُتُوا۟ بِهِۦ مُتَشَـٰبِهًا ۖ وَهُمْ فِيهَا خَـٰلِدُونَ',
  },
  {
    id: 33,
    verse_key: '2:26',
    text_uthmani:
      '۞ إِنَّ ٱللَّهَ لَا يَسْتَحْىِۦٓ أَن يَضْرِبَ مَثَلًا مَّا بَعُوضَةً فَمَا فَوْقَهَا ۚ فَأَمَّا ٱلَّذِينَ ءَامَنُوا۟ فَيَعْلَمُونَ أَنَّهُ ٱلْحَقُّ مِن رَّبِّهِمْ ۖ وَأَمَّا ٱلَّذِينَ كَفَرُوا۟ فَيَقُولُونَ مَاذَآ أَرَادَ ٱللَّهُ بِهَـٰذَا مَثَلًا ۘ يُضِلُّ بِهِۦ كَثِيرًا وَيَهْدِى بِهِۦ كَثِيرًا ۚ وَمَا يُضِلُّ بِهِۦٓ إِلَّا ٱلْفَـٰسِقِينَ',
  },
  {
    id: 34,
    verse_key: '2:27',
    text_uthmani:
      'ٱلَّذِينَ يَنقُضُونَ عَهْدَ ٱللَّهِ مِنۢ بَعْدِ مِيثَـٰقِهِۦ وَيَقْطَعُونَ مَآ أَمَرَ ٱللَّهُ بِهِۦٓ أَن يُوصَلَ وَيُفْسِدُونَ فِى ٱلْأَرْضِ ۚ أُو۟لَـٰٓئِكَ هُمُ ٱلْخَـٰسِرُونَ',
  },
  {
    id: 35,
    verse_key: '2:28',
    text_uthmani:
      'كَيْفَ تَكْفُرُونَ بِٱللَّهِ وَكُنتُمْ أَمْوَٰتًا فَأَحْيَـٰكُمْ ۖ ثُمَّ يُمِيتُكُمْ ثُمَّ يُحْيِيكُمْ ثُمَّ إِلَيْهِ تُرْجَعُونَ',
  },
  {
    id: 36,
    verse_key: '2:29',
    text_uthmani:
      'هُوَ ٱلَّذِى خَلَقَ لَكُم مَّا فِى ٱلْأَرْضِ جَمِيعًا ثُمَّ ٱسْتَوَىٰٓ إِلَى ٱلسَّمَآءِ فَسَوَّىٰهُنَّ سَبْعَ سَمَـٰوَٰتٍ ۚ وَهُوَ بِكُلِّ شَىْءٍ عَلِيمٌ',
  },
  {
    id: 37,
    verse_key: '2:30',
    text_uthmani:
      'وَإِذْ قَالَ رَبُّكَ لِلْمَلَـٰٓئِكَةِ إِنِّى جَاعِلٌ فِى ٱلْأَرْضِ خَلِيفَةً ۖ قَالُوٓا۟ أَتَجْعَلُ فِيهَا مَن يُفْسِدُ فِيهَا وَيَسْفِكُ ٱلدِّمَآءَ وَنَحْنُ نُسَبِّحُ بِحَمْدِكَ وَنُقَدِّسُ لَكَ ۖ قَالَ إِنِّىٓ أَعْلَمُ مَا لَا تَعْلَمُونَ',
  },
], [
  {
    id: 37,
    verse_key: '2:30',
    text_uthmani:
      'وَإِذْ قَالَ رَبُّكَ لِلْمَلَـٰٓئِكَةِ إِنِّى جَاعِلٌ فِى ٱلْأَرْضِ خَلِيفَةً ۖ قَالُوٓا۟ أَتَجْعَلُ فِيهَا مَن يُفْسِدُ فِيهَا وَيَسْفِكُ ٱلدِّمَآءَ وَنَحْنُ نُسَبِّحُ بِحَمْدِكَ وَنُقَدِّسُ لَكَ ۖ قَالَ إِنِّىٓ أَعْلَمُ مَا لَا تَعْلَمُونَ',
  },

  {
    id: 38,
    verse_key: '2:31',
    text_uthmani:
      'وَعَلَّمَ ءَادَمَ ٱلْأَسْمَآءَ كُلَّهَا ثُمَّ عَرَضَهُمْ عَلَى ٱلْمَلَـٰٓئِكَةِ فَقَالَ أَنۢبِـُٔونِى بِأَسْمَآءِ هَـٰٓؤُلَآءِ إِن كُنتُمْ صَـٰدِقِينَ',
  },
  {
    id: 39,
    verse_key: '2:32',
    text_uthmani:
      'قَالُوا۟ سُبْحَـٰنَكَ لَا عِلْمَ لَنَآ إِلَّا مَا عَلَّمْتَنَآ ۖ إِنَّكَ أَنتَ ٱلْعَلِيمُ ٱلْحَكِيمُ',
  },
  {
    id: 40,
    verse_key: '2:33',
    text_uthmani:
      'قَالَ يَـٰٓـَٔادَمُ أَنۢبِئْهُم بِأَسْمَآئِهِمْ ۖ فَلَمَّآ أَنۢبَأَهُم بِأَسْمَآئِهِمْ قَالَ أَلَمْ أَقُل لَّكُمْ إِنِّىٓ أَعْلَمُ غَيْبَ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ وَأَعْلَمُ مَا تُبْدُونَ وَمَا كُنتُمْ تَكْتُمُونَ',
  },
  {
    id: 41,
    verse_key: '2:34',
    text_uthmani:
      'وَإِذْ قُلْنَا لِلْمَلَـٰٓئِكَةِ ٱسْجُدُوا۟ لِـَٔادَمَ فَسَجَدُوٓا۟ إِلَّآ إِبْلِيسَ أَبَىٰ وَٱسْتَكْبَرَ وَكَانَ مِنَ ٱلْكَـٰفِرِينَ',
  },
  {
    id: 42,
    verse_key: '2:35',
    text_uthmani:
      'وَقُلْنَا يَـٰٓـَٔادَمُ ٱسْكُنْ أَنتَ وَزَوْجُكَ ٱلْجَنَّةَ وَكُلَا مِنْهَا رَغَدًا حَيْثُ شِئْتُمَا وَلَا تَقْرَبَا هَـٰذِهِ ٱلشَّجَرَةَ فَتَكُونَا مِنَ ٱلظَّـٰلِمِينَ',
  },
  {
    id: 43,
    verse_key: '2:36',
    text_uthmani:
      'فَأَزَلَّهُمَا ٱلشَّيْطَـٰنُ عَنْهَا فَأَخْرَجَهُمَا مِمَّا كَانَا فِيهِ ۖ وَقُلْنَا ٱهْبِطُوا۟ بَعْضُكُمْ لِبَعْضٍ عَدُوٌّ ۖ وَلَكُمْ فِى ٱلْأَرْضِ مُسْتَقَرٌّ وَمَتَـٰعٌ إِلَىٰ حِينٍ',
  },
], [
  {
    id: 44,
    verse_key: '2:37',
    text_uthmani:
      'فَتَلَقَّىٰٓ ءَادَمُ مِن رَّبِّهِۦ كَلِمَـٰتٍ فَتَابَ عَلَيْهِ ۚ إِنَّهُۥ هُوَ ٱلتَّوَّابُ ٱلرَّحِيمُ',
  },
  {
    id: 45,
    verse_key: '2:38',
    text_uthmani:
      'قُلْنَا ٱهْبِطُوا۟ مِنْهَا جَمِيعًا ۖ فَإِمَّا يَأْتِيَنَّكُم مِّنِّى هُدًى فَمَن تَبِعَ هُدَاىَ فَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ',
  },
  {
    id: 46,
    verse_key: '2:39',
    text_uthmani:
      'وَٱلَّذِينَ كَفَرُوا۟ وَكَذَّبُوا۟ بِـَٔايَـٰتِنَآ أُو۟لَـٰٓئِكَ أَصْحَـٰبُ ٱلنَّارِ ۖ هُمْ فِيهَا خَـٰلِدُونَ',
  },
  {
    id: 47,
    verse_key: '2:40',
    text_uthmani:
      'يَـٰبَنِىٓ إِسْرَٰٓءِيلَ ٱذْكُرُوا۟ نِعْمَتِىَ ٱلَّتِىٓ أَنْعَمْتُ عَلَيْكُمْ وَأَوْفُوا۟ بِعَهْدِىٓ أُوفِ بِعَهْدِكُمْ وَإِيَّـٰىَ فَٱرْهَبُونِ',
  },
  {
    id: 48,
    verse_key: '2:41',
    text_uthmani:
      'وَءَامِنُوا۟ بِمَآ أَنزَلْتُ مُصَدِّقًا لِّمَا مَعَكُمْ وَلَا تَكُونُوٓا۟ أَوَّلَ كَافِرٍۭ بِهِۦ ۖ وَلَا تَشْتَرُوا۟ بِـَٔايَـٰتِى ثَمَنًا قَلِيلًا وَإِيَّـٰىَ فَٱتَّقُونِ',
  },
  {
    id: 49,
    verse_key: '2:42',
    text_uthmani:
      'وَلَا تَلْبِسُوا۟ ٱلْحَقَّ بِٱلْبَـٰطِلِ وَتَكْتُمُوا۟ ٱلْحَقَّ وَأَنتُمْ تَعْلَمُونَ',
  },
  {
    id: 50,
    verse_key: '2:43',
    text_uthmani:
      'وَأَقِيمُوا۟ ٱلصَّلَوٰةَ وَءَاتُوا۟ ٱلزَّكَوٰةَ وَٱرْكَعُوا۟ مَعَ ٱلرَّٰكِعِينَ',
  },
], [
  {
    id: 51,
    verse_key: '2:44',
    text_uthmani:
      '۞ أَتَأْمُرُونَ ٱلنَّاسَ بِٱلْبِرِّ وَتَنسَوْنَ أَنفُسَكُمْ وَأَنتُمْ تَتْلُونَ ٱلْكِتَـٰبَ ۚ أَفَلَا تَعْقِلُونَ',
  },
  {
    id: 52,
    verse_key: '2:45',
    text_uthmani:
      'وَٱسْتَعِينُوا۟ بِٱلصَّبْرِ وَٱلصَّلَوٰةِ ۚ وَإِنَّهَا لَكَبِيرَةٌ إِلَّا عَلَى ٱلْخَـٰشِعِينَ',
  },
  {
    id: 53,
    verse_key: '2:46',
    text_uthmani:
      'ٱلَّذِينَ يَظُنُّونَ أَنَّهُم مُّلَـٰقُوا۟ رَبِّهِمْ وَأَنَّهُمْ إِلَيْهِ رَٰجِعُونَ',
  },
  {
    id: 54,
    verse_key: '2:47',
    text_uthmani:
      'يَـٰبَنِىٓ إِسْرَٰٓءِيلَ ٱذْكُرُوا۟ نِعْمَتِىَ ٱلَّتِىٓ أَنْعَمْتُ عَلَيْكُمْ وَأَنِّى فَضَّلْتُكُمْ عَلَى ٱلْعَـٰلَمِينَ',
  },
  {
    id: 55,
    verse_key: '2:48',
    text_uthmani:
      'وَٱتَّقُوا۟ يَوْمًا لَّا تَجْزِى نَفْسٌ عَن نَّفْسٍ شَيْـًٔا وَلَا يُقْبَلُ مِنْهَا شَفَـٰعَةٌ وَلَا يُؤْخَذُ مِنْهَا عَدْلٌ وَلَا هُمْ يُنصَرُونَ',
  },
  {
    id: 56,
    verse_key: '2:49',
    text_uthmani:
      'وَإِذْ نَجَّيْنَـٰكُم مِّنْ ءَالِ فِرْعَوْنَ يَسُومُونَكُمْ سُوٓءَ ٱلْعَذَابِ يُذَبِّحُونَ أَبْنَآءَكُمْ وَيَسْتَحْيُونَ نِسَآءَكُمْ ۚ وَفِى ذَٰلِكُم بَلَآءٌ مِّن رَّبِّكُمْ عَظِيمٌ',
  },
  {
    id: 57,
    verse_key: '2:50',
    text_uthmani:
      'وَإِذْ فَرَقْنَا بِكُمُ ٱلْبَحْرَ فَأَنجَيْنَـٰكُمْ وَأَغْرَقْنَآ ءَالَ فِرْعَوْنَ وَأَنتُمْ تَنظُرُونَ',
  },
  {
    id: 58,
    verse_key: '2:51',
    text_uthmani:
      'وَإِذْ وَٰعَدْنَا مُوسَىٰٓ أَرْبَعِينَ لَيْلَةً ثُمَّ ٱتَّخَذْتُمُ ٱلْعِجْلَ مِنۢ بَعْدِهِۦ وَأَنتُمْ ظَـٰلِمُونَ',
  },
],[
  {
    id: 58,
    verse_key: '2:51',
    text_uthmani:
      'وَإِذْ وَٰعَدْنَا مُوسَىٰٓ أَرْبَعِينَ لَيْلَةً ثُمَّ ٱتَّخَذْتُمُ ٱلْعِجْلَ مِنۢ بَعْدِهِۦ وَأَنتُمْ ظَـٰلِمُونَ',
  },
  {
    id: 59,
    verse_key: '2:52',
    text_uthmani:
      'ثُمَّ عَفَوْنَا عَنكُم مِّنۢ بَعْدِ ذَٰلِكَ لَعَلَّكُمْ تَشْكُرُونَ',
  },
  {
    id: 60,
    verse_key: '2:53',
    text_uthmani:
      'وَإِذْ ءَاتَيْنَا مُوسَى ٱلْكِتَـٰبَ وَٱلْفُرْقَانَ لَعَلَّكُمْ تَهْتَدُونَ',
  },
  {
    id: 61,
    verse_key: '2:54',
    text_uthmani:
      'وَإِذْ قَالَ مُوسَىٰ لِقَوْمِهِۦ يَـٰقَوْمِ إِنَّكُمْ ظَلَمْتُمْ أَنفُسَكُم بِٱتِّخَاذِكُمُ ٱلْعِجْلَ فَتُوبُوٓا۟ إِلَىٰ بَارِئِكُمْ فَٱقْتُلُوٓا۟ أَنفُسَكُمْ ذَٰلِكُمْ خَيْرٌ لَّكُمْ عِندَ بَارِئِكُمْ فَتَابَ عَلَيْكُمْ ۚ إِنَّهُۥ هُوَ ٱلتَّوَّابُ ٱلرَّحِيمُ',
  },
  {
    id: 62,
    verse_key: '2:55',
    text_uthmani:
      'وَإِذْ قُلْتُمْ يَـٰمُوسَىٰ لَن نُّؤْمِنَ لَكَ حَتَّىٰ نَرَى ٱللَّهَ جَهْرَةً فَأَخَذَتْكُمُ ٱلصَّـٰعِقَةُ وَأَنتُمْ تَنظُرُونَ',
  },
  {
    id: 63,
    verse_key: '2:56',
    text_uthmani:
      'ثُمَّ بَعَثْنَـٰكُم مِّنۢ بَعْدِ مَوْتِكُمْ لَعَلَّكُمْ تَشْكُرُونَ',
  },
  {
    id: 64,
    verse_key: '2:57',
    text_uthmani:
      'وَظَلَّلْنَا عَلَيْكُمُ ٱلْغَمَامَ وَأَنزَلْنَا عَلَيْكُمُ ٱلْمَنَّ وَٱلسَّلْوَىٰ ۖ كُلُوا۟ مِن طَيِّبَـٰتِ مَا رَزَقْنَـٰكُمْ ۖ وَمَا ظَلَمُونَا وَلَـٰكِن كَانُوٓا۟ أَنفُسَهُمْ يَظْلِمُونَ',
  },
  {
    id: 65,
    verse_key: '2:58',
    text_uthmani:
      'وَإِذْ قُلْنَا ٱدْخُلُوا۟ هَـٰذِهِ ٱلْقَرْيَةَ فَكُلُوا۟ مِنْهَا حَيْثُ شِئْتُمْ رَغَدًا وَٱدْخُلُوا۟ ٱلْبَابَ سُجَّدًا وَقُولُوا۟ حِطَّةٌ نَّغْفِرْ لَكُمْ خَطَـٰيَـٰكُمْ ۚ وَسَنَزِيدُ ٱلْمُحْسِنِينَ',
  },
], [
  {
    id: 65,
    verse_key: '2:58',
    text_uthmani:
      'وَإِذْ قُلْنَا ٱدْخُلُوا۟ هَـٰذِهِ ٱلْقَرْيَةَ فَكُلُوا۟ مِنْهَا حَيْثُ شِئْتُمْ رَغَدًا وَٱدْخُلُوا۟ ٱلْبَابَ سُجَّدًا وَقُولُوا۟ حِطَّةٌ نَّغْفِرْ لَكُمْ خَطَـٰيَـٰكُمْ ۚ وَسَنَزِيدُ ٱلْمُحْسِنِينَ',
  },
  {
    id: 66,
    verse_key: '2:59',
    text_uthmani:
      'فَبَدَّلَ ٱلَّذِينَ ظَلَمُوا۟ قَوْلًا غَيْرَ ٱلَّذِى قِيلَ لَهُمْ فَأَنزَلْنَا عَلَى ٱلَّذِينَ ظَلَمُوا۟ رِجْزًا مِّنَ ٱلسَّمَآءِ بِمَا كَانُوا۟ يَفْسُقُونَ',
  },
  {
    id: 67,
    verse_key: '2:60',
    text_uthmani:
      '۞ وَإِذِ ٱسْتَسْقَىٰ مُوسَىٰ لِقَوْمِهِۦ فَقُلْنَا ٱضْرِب بِّعَصَاكَ ٱلْحَجَرَ ۖ فَٱنفَجَرَتْ مِنْهُ ٱثْنَتَا عَشْرَةَ عَيْنًا ۖ قَدْ عَلِمَ كُلُّ أُنَاسٍ مَّشْرَبَهُمْ ۖ كُلُوا۟ وَٱشْرَبُوا۟ مِن رِّزْقِ ٱللَّهِ وَلَا تَعْثَوْا۟ فِى ٱلْأَرْضِ مُفْسِدِينَ',
  },
  {
    id: 68,
    verse_key: '2:61',
    text_uthmani:
      'وَإِذْ قُلْتُمْ يَـٰمُوسَىٰ لَن نَّصْبِرَ عَلَىٰ طَعَامٍ وَٰحِدٍ فَٱدْعُ لَنَا رَبَّكَ يُخْرِجْ لَنَا مِمَّا تُنۢبِتُ ٱلْأَرْضُ مِنۢ بَقْلِهَا وَقِثَّآئِهَا وَفُومِهَا وَعَدَسِهَا وَبَصَلِهَا ۖ قَالَ أَتَسْتَبْدِلُونَ ٱلَّذِى هُوَ أَدْنَىٰ بِٱلَّذِى هُوَ خَيْرٌ ۚ ٱهْبِطُوا۟ مِصْرًا فَإِنَّ لَكُم مَّا سَأَلْتُمْ ۗ وَضُرِبَتْ عَلَيْهِمُ ٱلذِّلَّةُ وَٱلْمَسْكَنَةُ وَبَآءُو بِغَضَبٍ مِّنَ ٱللَّهِ ۗ ذَٰلِكَ بِأَنَّهُمْ كَانُوا۟ يَكْفُرُونَ بِـَٔايَـٰتِ ٱللَّهِ وَيَقْتُلُونَ ٱلنَّبِيِّـۧنَ بِغَيْرِ ٱلْحَقِّ ۗ ذَٰلِكَ بِمَا عَصَوا۟ وَّكَانُوا۟ يَعْتَدُونَ',
  },
], [
  {
    id: 68,
    verse_key: '2:61',
    text_uthmani:
      'وَإِذْ قُلْتُمْ يَـٰمُوسَىٰ لَن نَّصْبِرَ عَلَىٰ طَعَامٍ وَٰحِدٍ فَٱدْعُ لَنَا رَبَّكَ يُخْرِجْ لَنَا مِمَّا تُنۢبِتُ ٱلْأَرْضُ مِنۢ بَقْلِهَا وَقِثَّآئِهَا وَفُومِهَا وَعَدَسِهَا وَبَصَلِهَا ۖ قَالَ أَتَسْتَبْدِلُونَ ٱلَّذِى هُوَ أَدْنَىٰ بِٱلَّذِى هُوَ خَيْرٌ ۚ ٱهْبِطُوا۟ مِصْرًا فَإِنَّ لَكُم مَّا سَأَلْتُمْ ۗ وَضُرِبَتْ عَلَيْهِمُ ٱلذِّلَّةُ وَٱلْمَسْكَنَةُ وَبَآءُو بِغَضَبٍ مِّنَ ٱللَّهِ ۗ ذَٰلِكَ بِأَنَّهُمْ كَانُوا۟ يَكْفُرُونَ بِـَٔايَـٰتِ ٱللَّهِ وَيَقْتُلُونَ ٱلنَّبِيِّـۧنَ بِغَيْرِ ٱلْحَقِّ ۗ ذَٰلِكَ بِمَا عَصَوا۟ وَّكَانُوا۟ يَعْتَدُونَ',
  },
  {
    id: 69,
    verse_key: '2:62',
    text_uthmani:
      'إِنَّ ٱلَّذِينَ ءَامَنُوا۟ وَٱلَّذِينَ هَادُوا۟ وَٱلنَّصَـٰرَىٰ وَٱلصَّـٰبِـِٔينَ مَنْ ءَامَنَ بِٱللَّهِ وَٱلْيَوْمِ ٱلْـَٔاخِرِ وَعَمِلَ صَـٰلِحًا فَلَهُمْ أَجْرُهُمْ عِندَ رَبِّهِمْ وَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ',
  },
  {
    id: 70,
    verse_key: '2:63',
    text_uthmani:
      'وَإِذْ أَخَذْنَا مِيثَـٰقَكُمْ وَرَفَعْنَا فَوْقَكُمُ ٱلطُّورَ خُذُوا۟ مَآ ءَاتَيْنَـٰكُم بِقُوَّةٍ وَٱذْكُرُوا۟ مَا فِيهِ لَعَلَّكُمْ تَتَّقُونَ',
  },
  {
    id: 71,
    verse_key: '2:64',
    text_uthmani:
      'ثُمَّ تَوَلَّيْتُم مِّنۢ بَعْدِ ذَٰلِكَ ۖ فَلَوْلَا فَضْلُ ٱللَّهِ عَلَيْكُمْ وَرَحْمَتُهُۥ لَكُنتُم مِّنَ ٱلْخَـٰسِرِينَ',
  },
  {
    id: 72,
    verse_key: '2:65',
    text_uthmani:
      'وَلَقَدْ عَلِمْتُمُ ٱلَّذِينَ ٱعْتَدَوْا۟ مِنكُمْ فِى ٱلسَّبْتِ فَقُلْنَا لَهُمْ كُونُوا۟ قِرَدَةً خَـٰسِـِٔينَ',
  },
  {
    id: 73,
    verse_key: '2:66',
    text_uthmani:
      'فَجَعَلْنَـٰهَا نَكَـٰلًا لِّمَا بَيْنَ يَدَيْهَا وَمَا خَلْفَهَا وَمَوْعِظَةً لِّلْمُتَّقِينَ',
  },
  {
    id: 74,
    verse_key: '2:67',
    text_uthmani:
      'وَإِذْ قَالَ مُوسَىٰ لِقَوْمِهِۦٓ إِنَّ ٱللَّهَ يَأْمُرُكُمْ أَن تَذْبَحُوا۟ بَقَرَةً ۖ قَالُوٓا۟ أَتَتَّخِذُنَا هُزُوًا ۖ قَالَ أَعُوذُ بِٱللَّهِ أَنْ أَكُونَ مِنَ ٱلْجَـٰهِلِينَ',
  },
], [
  {
    id: 75,
    verse_key: '2:68',
    text_uthmani:
      'قَالُوا۟ ٱدْعُ لَنَا رَبَّكَ يُبَيِّن لَّنَا مَا هِىَ ۚ قَالَ إِنَّهُۥ يَقُولُ إِنَّهَا بَقَرَةٌ لَّا فَارِضٌ وَلَا بِكْرٌ عَوَانٌۢ بَيْنَ ذَٰلِكَ ۖ فَٱفْعَلُوا۟ مَا تُؤْمَرُونَ',
  },
  {
    id: 76,
    verse_key: '2:69',
    text_uthmani:
      'قَالُوا۟ ٱدْعُ لَنَا رَبَّكَ يُبَيِّن لَّنَا مَا لَوْنُهَا ۚ قَالَ إِنَّهُۥ يَقُولُ إِنَّهَا بَقَرَةٌ صَفْرَآءُ فَاقِعٌ لَّوْنُهَا تَسُرُّ ٱلنَّـٰظِرِينَ',
  },
  {
    id: 77,
    verse_key: '2:70',
    text_uthmani:
      'قَالُوا۟ ٱدْعُ لَنَا رَبَّكَ يُبَيِّن لَّنَا مَا هِىَ إِنَّ ٱلْبَقَرَ تَشَـٰبَهَ عَلَيْنَا وَإِنَّآ إِن شَآءَ ٱللَّهُ لَمُهْتَدُونَ',
  },
  {
    id: 78,
    verse_key: '2:71',
    text_uthmani:
      'قَالَ إِنَّهُۥ يَقُولُ إِنَّهَا بَقَرَةٌ لَّا ذَلُولٌ تُثِيرُ ٱلْأَرْضَ وَلَا تَسْقِى ٱلْحَرْثَ مُسَلَّمَةٌ لَّا شِيَةَ فِيهَا ۚ قَالُوا۟ ٱلْـَٔـٰنَ جِئْتَ بِٱلْحَقِّ ۚ فَذَبَحُوهَا وَمَا كَادُوا۟ يَفْعَلُونَ',
  },
  {
    id: 79,
    verse_key: '2:72',
    text_uthmani:
      'وَإِذْ قَتَلْتُمْ نَفْسًا فَٱدَّٰرَْٰٔتُمْ فِيهَا ۖ وَٱللَّهُ مُخْرِجٌ مَّا كُنتُمْ تَكْتُمُونَ',
  },
  {
    id: 80,
    verse_key: '2:73',
    text_uthmani:
      'فَقُلْنَا ٱضْرِبُوهُ بِبَعْضِهَا ۚ كَذَٰلِكَ يُحْىِ ٱللَّهُ ٱلْمَوْتَىٰ وَيُرِيكُمْ ءَايَـٰتِهِۦ لَعَلَّكُمْ تَعْقِلُونَ',
  },
],[
  {
    id: 81,
    verse_key: '2:74',
    text_uthmani:
      'ثُمَّ قَسَتْ قُلُوبُكُم مِّنۢ بَعْدِ ذَٰلِكَ فَهِىَ كَٱلْحِجَارَةِ أَوْ أَشَدُّ قَسْوَةً ۚ وَإِنَّ مِنَ ٱلْحِجَارَةِ لَمَا يَتَفَجَّرُ مِنْهُ ٱلْأَنْهَـٰرُ ۚ وَإِنَّ مِنْهَا لَمَا يَشَّقَّقُ فَيَخْرُجُ مِنْهُ ٱلْمَآءُ ۚ وَإِنَّ مِنْهَا لَمَا يَهْبِطُ مِنْ خَشْيَةِ ٱللَّهِ ۗ وَمَا ٱللَّهُ بِغَـٰفِلٍ عَمَّا تَعْمَلُونَ',
  },
  {
    id: 82,
    verse_key: '2:75',
    text_uthmani:
      '۞ أَفَتَطْمَعُونَ أَن يُؤْمِنُوا۟ لَكُمْ وَقَدْ كَانَ فَرِيقٌ مِّنْهُمْ يَسْمَعُونَ كَلَـٰمَ ٱللَّهِ ثُمَّ يُحَرِّفُونَهُۥ مِنۢ بَعْدِ مَا عَقَلُوهُ وَهُمْ يَعْلَمُونَ',
  },
  {
    id: 83,
    verse_key: '2:76',
    text_uthmani:
      'وَإِذَا لَقُوا۟ ٱلَّذِينَ ءَامَنُوا۟ قَالُوٓا۟ ءَامَنَّا وَإِذَا خَلَا بَعْضُهُمْ إِلَىٰ بَعْضٍ قَالُوٓا۟ أَتُحَدِّثُونَهُم بِمَا فَتَحَ ٱللَّهُ عَلَيْكُمْ لِيُحَآجُّوكُم بِهِۦ عِندَ رَبِّكُمْ ۚ أَفَلَا تَعْقِلُونَ',
  },
  {
    id: 84,
    verse_key: '2:77',
    text_uthmani:
      'أَوَلَا يَعْلَمُونَ أَنَّ ٱللَّهَ يَعْلَمُ مَا يُسِرُّونَ وَمَا يُعْلِنُونَ',
  },
  {
    id: 85,
    verse_key: '2:78',
    text_uthmani:
      'وَمِنْهُمْ أُمِّيُّونَ لَا يَعْلَمُونَ ٱلْكِتَـٰبَ إِلَّآ أَمَانِىَّ وَإِنْ هُمْ إِلَّا يَظُنُّونَ',
  },
],[
  {
    id: 86,
    verse_key: '2:79',
    text_uthmani:
      'فَوَيْلٌ لِّلَّذِينَ يَكْتُبُونَ ٱلْكِتَـٰبَ بِأَيْدِيهِمْ ثُمَّ يَقُولُونَ هَـٰذَا مِنْ عِندِ ٱللَّهِ لِيَشْتَرُوا۟ بِهِۦ ثَمَنًا قَلِيلًا ۖ فَوَيْلٌ لَّهُم مِّمَّا كَتَبَتْ أَيْدِيهِمْ وَوَيْلٌ لَّهُم مِّمَّا يَكْسِبُونَ',
  },
  {
    id: 87,
    verse_key: '2:80',
    text_uthmani:
      'وَقَالُوا۟ لَن تَمَسَّنَا ٱلنَّارُ إِلَّآ أَيَّامًا مَّعْدُودَةً ۚ قُلْ أَتَّخَذْتُمْ عِندَ ٱللَّهِ عَهْدًا فَلَن يُخْلِفَ ٱللَّهُ عَهْدَهُۥٓ ۖ أَمْ تَقُولُونَ عَلَى ٱللَّهِ مَا لَا تَعْلَمُونَ',
  },
  {
    id: 88,
    verse_key: '2:81',
    text_uthmani:
      'بَلَىٰ مَن كَسَبَ سَيِّئَةً وَأَحَـٰطَتْ بِهِۦ خَطِيٓـَٔتُهُۥ فَأُو۟لَـٰٓئِكَ أَصْحَـٰبُ ٱلنَّارِ ۖ هُمْ فِيهَا خَـٰلِدُونَ',
  },
  {
    id: 89,
    verse_key: '2:82',
    text_uthmani:
      'وَٱلَّذِينَ ءَامَنُوا۟ وَعَمِلُوا۟ ٱلصَّـٰلِحَـٰتِ أُو۟لَـٰٓئِكَ أَصْحَـٰبُ ٱلْجَنَّةِ ۖ هُمْ فِيهَا خَـٰلِدُونَ',
  },
  {
    id: 90,
    verse_key: '2:83',
    text_uthmani:
      'وَإِذْ أَخَذْنَا مِيثَـٰقَ بَنِىٓ إِسْرَٰٓءِيلَ لَا تَعْبُدُونَ إِلَّا ٱللَّهَ وَبِٱلْوَٰلِدَيْنِ إِحْسَانًا وَذِى ٱلْقُرْبَىٰ وَٱلْيَتَـٰمَىٰ وَٱلْمَسَـٰكِينِ وَقُولُوا۟ لِلنَّاسِ حُسْنًا وَأَقِيمُوا۟ ٱلصَّلَوٰةَ وَءَاتُوا۟ ٱلزَّكَوٰةَ ثُمَّ تَوَلَّيْتُمْ إِلَّا قَلِيلًا مِّنكُمْ وَأَنتُم مُّعْرِضُونَ',
  },
], [
  {
    id: 91,
    verse_key: '2:84',
    text_uthmani:
      'وَإِذْ أَخَذْنَا مِيثَـٰقَكُمْ لَا تَسْفِكُونَ دِمَآءَكُمْ وَلَا تُخْرِجُونَ أَنفُسَكُم مِّن دِيَـٰرِكُمْ ثُمَّ أَقْرَرْتُمْ وَأَنتُمْ تَشْهَدُونَ',
  },
  {
    id: 92,
    verse_key: '2:85',
    text_uthmani:
      'ثُمَّ أَنتُمْ هَـٰٓؤُلَآءِ تَقْتُلُونَ أَنفُسَكُمْ وَتُخْرِجُونَ فَرِيقًا مِّنكُم مِّن دِيَـٰرِهِمْ تَظَـٰهَرُونَ عَلَيْهِم بِٱلْإِثْمِ وَٱلْعُدْوَٰنِ وَإِن يَأْتُوكُمْ أُسَـٰرَىٰ تُفَـٰدُوهُمْ وَهُوَ مُحَرَّمٌ عَلَيْكُمْ إِخْرَاجُهُمْ ۚ أَفَتُؤْمِنُونَ بِبَعْضِ ٱلْكِتَـٰبِ وَتَكْفُرُونَ بِبَعْضٍ ۚ فَمَا جَزَآءُ مَن يَفْعَلُ ذَٰلِكَ مِنكُمْ إِلَّا خِزْىٌ فِى ٱلْحَيَوٰةِ ٱلدُّنْيَا ۖ وَيَوْمَ ٱلْقِيَـٰمَةِ يُرَدُّونَ إِلَىٰٓ أَشَدِّ ٱلْعَذَابِ ۗ وَمَا ٱللَّهُ بِغَـٰفِلٍ عَمَّا تَعْمَلُونَ',
  },
  {
    id: 93,
    verse_key: '2:86',
    text_uthmani:
      'أُو۟لَـٰٓئِكَ ٱلَّذِينَ ٱشْتَرَوُا۟ ٱلْحَيَوٰةَ ٱلدُّنْيَا بِٱلْـَٔاخِرَةِ ۖ فَلَا يُخَفَّفُ عَنْهُمُ ٱلْعَذَابُ وَلَا هُمْ يُنصَرُونَ',
  },
  {
    id: 94,
    verse_key: '2:87',
    text_uthmani:
      'وَلَقَدْ ءَاتَيْنَا مُوسَى ٱلْكِتَـٰبَ وَقَفَّيْنَا مِنۢ بَعْدِهِۦ بِٱلرُّسُلِ ۖ وَءَاتَيْنَا عِيسَى ٱبْنَ مَرْيَمَ ٱلْبَيِّنَـٰتِ وَأَيَّدْنَـٰهُ بِرُوحِ ٱلْقُدُسِ ۗ أَفَكُلَّمَا جَآءَكُمْ رَسُولٌۢ بِمَا لَا تَهْوَىٰٓ أَنفُسُكُمُ ٱسْتَكْبَرْتُمْ فَفَرِيقًا كَذَّبْتُمْ وَفَرِيقًا تَقْتُلُونَ',
  },
],
[
   {
    id: 94,
    verse_key: '2:87',
    text_uthmani:
      'وَلَقَدْ ءَاتَيْنَا مُوسَى ٱلْكِتَـٰبَ وَقَفَّيْنَا مِنۢ بَعْدِهِۦ بِٱلرُّسُلِ ۖ وَءَاتَيْنَا عِيسَى ٱبْنَ مَرْيَمَ ٱلْبَيِّنَـٰتِ وَأَيَّدْنَـٰهُ بِرُوحِ ٱلْقُدُسِ ۗ أَفَكُلَّمَا جَآءَكُمْ رَسُولٌۢ بِمَا لَا تَهْوَىٰٓ أَنفُسُكُمُ ٱسْتَكْبَرْتُمْ فَفَرِيقًا كَذَّبْتُمْ وَفَرِيقًا تَقْتُلُونَ',
  },
  {
    id: 95,
    verse_key: '2:88',
    text_uthmani:
      'وَقَالُوا۟ قُلُوبُنَا غُلْفٌۢ ۚ بَل لَّعَنَهُمُ ٱللَّهُ بِكُفْرِهِمْ فَقَلِيلًا مَّا يُؤْمِنُونَ',
  },
  {
    id: 96,
    verse_key: '2:89',
    text_uthmani:
      'وَلَمَّا جَآءَهُمْ كِتَـٰبٌ مِّنْ عِندِ ٱللَّهِ مُصَدِّقٌ لِّمَا مَعَهُمْ وَكَانُوا۟ مِن قَبْلُ يَسْتَفْتِحُونَ عَلَى ٱلَّذِينَ كَفَرُوا۟ فَلَمَّا جَآءَهُم مَّا عَرَفُوا۟ كَفَرُوا۟ بِهِۦ ۚ فَلَعْنَةُ ٱللَّهِ عَلَى ٱلْكَـٰفِرِينَ',
  },
  {
    id: 97,
    verse_key: '2:90',
    text_uthmani:
      'بِئْسَمَا ٱشْتَرَوْا۟ بِهِۦٓ أَنفُسَهُمْ أَن يَكْفُرُوا۟ بِمَآ أَنزَلَ ٱللَّهُ بَغْيًا أَن يُنَزِّلَ ٱللَّهُ مِن فَضْلِهِۦ عَلَىٰ مَن يَشَآءُ مِنْ عِبَادِهِۦ ۖ فَبَآءُو بِغَضَبٍ عَلَىٰ غَضَبٍ ۚ وَلِلْكَـٰفِرِينَ عَذَابٌ مُّهِينٌ',
  },
  {
    id: 98,
    verse_key: '2:91',
    text_uthmani:
      'وَإِذَا قِيلَ لَهُمْ ءَامِنُوا۟ بِمَآ أَنزَلَ ٱللَّهُ قَالُوا۟ نُؤْمِنُ بِمَآ أُنزِلَ عَلَيْنَا وَيَكْفُرُونَ بِمَا وَرَآءَهُۥ وَهُوَ ٱلْحَقُّ مُصَدِّقًا لِّمَا مَعَهُمْ ۗ قُلْ فَلِمَ تَقْتُلُونَ أَنۢبِيَآءَ ٱللَّهِ مِن قَبْلُ إِن كُنتُم مُّؤْمِنِينَ',
  },
]

, [
  {
    id: 98,
    verse_key: '2:91',
    text_uthmani:
      'وَإِذَا قِيلَ لَهُمْ ءَامِنُوا۟ بِمَآ أَنزَلَ ٱللَّهُ قَالُوا۟ نُؤْمِنُ بِمَآ أُنزِلَ عَلَيْنَا وَيَكْفُرُونَ بِمَا وَرَآءَهُۥ وَهُوَ ٱلْحَقُّ مُصَدِّقًا لِّمَا مَعَهُمْ ۗ قُلْ فَلِمَ تَقْتُلُونَ أَنۢبِيَآءَ ٱللَّهِ مِن قَبْلُ إِن كُنتُم مُّؤْمِنِينَ',
  },
  {
    id: 99,
    verse_key: '2:92',
    text_uthmani:
      '۞ وَلَقَدْ جَآءَكُم مُّوسَىٰ بِٱلْبَيِّنَـٰتِ ثُمَّ ٱتَّخَذْتُمُ ٱلْعِجْلَ مِنۢ بَعْدِهِۦ وَأَنتُمْ ظَـٰلِمُونَ',
  },
  {
    id: 100,
    verse_key: '2:93',
    text_uthmani:
      'وَإِذْ أَخَذْنَا مِيثَـٰقَكُمْ وَرَفَعْنَا فَوْقَكُمُ ٱلطُّورَ خُذُوا۟ مَآ ءَاتَيْنَـٰكُم بِقُوَّةٍ وَٱسْمَعُوا۟ ۖ قَالُوا۟ سَمِعْنَا وَعَصَيْنَا وَأُشْرِبُوا۟ فِى قُلُوبِهِمُ ٱلْعِجْلَ بِكُفْرِهِمْ ۚ قُلْ بِئْسَمَا يَأْمُرُكُم بِهِۦٓ إِيمَـٰنُكُمْ إِن كُنتُم مُّؤْمِنِينَ',
  },
  {
    id: 101,
    verse_key: '2:94',
    text_uthmani:
      'قُلْ إِن كَانَتْ لَكُمُ ٱلدَّارُ ٱلْـَٔاخِرَةُ عِندَ ٱللَّهِ خَالِصَةً مِّن دُونِ ٱلنَّاسِ فَتَمَنَّوُا۟ ٱلْمَوْتَ إِن كُنتُمْ صَـٰدِقِينَ',
  },
  {
    id: 102,
    verse_key: '2:95',
    text_uthmani:
      'وَلَن يَتَمَنَّوْهُ أَبَدًۢا بِمَا قَدَّمَتْ أَيْدِيهِمْ ۗ وَٱللَّهُ عَلِيمٌۢ بِٱلظَّـٰلِمِينَ',
  },
  {
    id: 103,
    verse_key: '2:96',
    text_uthmani:
      'وَلَتَجِدَنَّهُمْ أَحْرَصَ ٱلنَّاسِ عَلَىٰ حَيَوٰةٍ وَمِنَ ٱلَّذِينَ أَشْرَكُوا۟ ۚ يَوَدُّ أَحَدُهُمْ لَوْ يُعَمَّرُ أَلْفَ سَنَةٍ وَمَا هُوَ بِمُزَحْزِحِهِۦ مِنَ ٱلْعَذَابِ أَن يُعَمَّرَ ۗ وَٱللَّهُ بَصِيرٌۢ بِمَا يَعْمَلُونَ',
  },
],[{
  id: 103,
  verse_key: "2:96",
  text_uthmani: "وَلَتَجِدَنَّهُمْ أَحْرَصَ ٱلنَّاسِ عَلَىٰ حَيَوٰةٍ وَمِنَ ٱلَّذِينَ أَشْرَكُوا۟ ۚ يَوَدُّ أَحَدُهُمْ لَوْ يُعَمَّرُ أَلْفَ سَنَةٍ وَمَا هُوَ بِمُزَحْزِحِهِۦ مِنَ ٱلْعَذَابِ أَن يُعَمَّرَ ۗ وَٱللَّهُ بَصِيرٌۢ بِمَا يَعْمَلُونَ"
  },
  {
  id: 104,
  verse_key: "2:97",
  text_uthmani: "قُلْ مَن كَانَ عَدُوًّا لِّجِبْرِيلَ فَإِنَّهُۥ نَزَّلَهُۥ عَلَىٰ قَلْبِكَ بِإِذْنِ ٱللَّهِ مُصَدِّقًا لِّمَا بَيْنَ يَدَيْهِ وَهُدًى وَبُشْرَىٰ لِلْمُؤْمِنِينَ"
  },
  {
  id: 105,
  verse_key: "2:98",
  text_uthmani: "مَن كَانَ عَدُوًّا لِّلَّهِ وَمَلَـٰٓئِكَتِهِۦ وَرُسُلِهِۦ وَجِبْرِيلَ وَمِيكَىٰلَ فَإِنَّ ٱللَّهَ عَدُوٌّ لِّلْكَـٰفِرِينَ"
  },
  {
  id: 106,
  verse_key: "2:99",
  text_uthmani: "وَلَقَدْ أَنزَلْنَآ إِلَيْكَ ءَايَـٰتٍۭ بَيِّنَـٰتٍ ۖ وَمَا يَكْفُرُ بِهَآ إِلَّا ٱلْفَـٰسِقُونَ"
  },
  {
  id: 107,
  verse_key: "2:100",
  text_uthmani: "أَوَكُلَّمَا عَـٰهَدُوا۟ عَهْدًا نَّبَذَهُۥ فَرِيقٌ مِّنْهُم ۚ بَلْ أَكْثَرُهُمْ لَا يُؤْمِنُونَ"
  },
  {
  id: 108,
  verse_key: "2:101",
  text_uthmani: "وَلَمَّا جَآءَهُمْ رَسُولٌ مِّنْ عِندِ ٱللَّهِ مُصَدِّقٌ لِّمَا مَعَهُمْ نَبَذَ فَرِيقٌ مِّنَ ٱلَّذِينَ أُوتُوا۟ ٱلْكِتَـٰبَ كِتَـٰبَ ٱللَّهِ وَرَآءَ ظُهُورِهِمْ كَأَنَّهُمْ لَا يَعْلَمُونَ"
  },
  {
  id: 109,
  verse_key: "2:102",
  text_uthmani: "وَٱتَّبَعُوا۟ مَا تَتْلُوا۟ ٱلشَّيَـٰطِينُ عَلَىٰ مُلْكِ سُلَيْمَـٰنَ ۖ وَمَا كَفَرَ سُلَيْمَـٰنُ وَلَـٰكِنَّ ٱلشَّيَـٰطِينَ كَفَرُوا۟ يُعَلِّمُونَ ٱلنَّاسَ ٱلسِّحْرَ وَمَآ أُنزِلَ عَلَى ٱلْمَلَكَيْنِ بِبَابِلَ هَـٰرُوتَ وَمَـٰرُوتَ ۚ وَمَا يُعَلِّمَانِ مِنْ أَحَدٍ حَتَّىٰ يَقُولَآ إِنَّمَا نَحْنُ فِتْنَةٌ فَلَا تَكْفُرْ ۖ فَيَتَعَلَّمُونَ مِنْهُمَا مَا يُفَرِّقُونَ بِهِۦ بَيْنَ ٱلْمَرْءِ وَزَوْجِهِۦ ۚ وَمَا هُم بِضَآرِّينَ بِهِۦ مِنْ أَحَدٍ إِلَّا بِإِذْنِ ٱللَّهِ ۚ وَيَتَعَلَّمُونَ مَا يَضُرُّهُمْ وَلَا يَنفَعُهُمْ ۚ وَلَقَدْ عَلِمُوا۟ لَمَنِ ٱشْتَرَىٰهُ مَا لَهُۥ فِى ٱلْـَٔاخِرَةِ مِنْ خَلَـٰقٍ ۚ وَلَبِئْسَ مَا شَرَوْا۟ بِهِۦٓ أَنفُسَهُمْ ۚ لَوْ كَانُوا۟ يَعْلَمُونَ"
  },],
  [
    {
      id: 109,
      verse_key: "2:102",
      text_uthmani: "وَٱتَّبَعُوا۟ مَا تَتْلُوا۟ ٱلشَّيَـٰطِينُ عَلَىٰ مُلْكِ سُلَيْمَـٰنَ ۖ وَمَا كَفَرَ سُلَيْمَـٰنُ وَلَـٰكِنَّ ٱلشَّيَـٰطِينَ كَفَرُوا۟ يُعَلِّمُونَ ٱلنَّاسَ ٱلسِّحْرَ وَمَآ أُنزِلَ عَلَى ٱلْمَلَكَيْنِ بِبَابِلَ هَـٰرُوتَ وَمَـٰرُوتَ ۚ وَمَا يُعَلِّمَانِ مِنْ أَحَدٍ حَتَّىٰ يَقُولَآ إِنَّمَا نَحْنُ فِتْنَةٌ فَلَا تَكْفُرْ ۖ فَيَتَعَلَّمُونَ مِنْهُمَا مَا يُفَرِّقُونَ بِهِۦ بَيْنَ ٱلْمَرْءِ وَزَوْجِهِۦ ۚ وَمَا هُم بِضَآرِّينَ بِهِۦ مِنْ أَحَدٍ إِلَّا بِإِذْنِ ٱللَّهِ ۚ وَيَتَعَلَّمُونَ مَا يَضُرُّهُمْ وَلَا يَنفَعُهُمْ ۚ وَلَقَدْ عَلِمُوا۟ لَمَنِ ٱشْتَرَىٰهُ مَا لَهُۥ فِى ٱلْـَٔاخِرَةِ مِنْ خَلَـٰقٍ ۚ وَلَبِئْسَ مَا شَرَوْا۟ بِهِۦٓ أَنفُسَهُمْ ۚ لَوْ كَانُوا۟ يَعْلَمُونَ"
      },
      {
      id: 110,
      verse_key: "2:103",
      text_uthmani: "وَلَوْ أَنَّهُمْ ءَامَنُوا۟ وَٱتَّقَوْا۟ لَمَثُوبَةٌ مِّنْ عِندِ ٱللَّهِ خَيْرٌ ۖ لَّوْ كَانُوا۟ يَعْلَمُونَ"
      },
      {
      id: 111,
      verse_key: "2:104",
      text_uthmani: "يَـٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُوا۟ لَا تَقُولُوا۟ رَٰعِنَا وَقُولُوا۟ ٱنظُرْنَا وَٱسْمَعُوا۟ ۗ وَلِلْكَـٰفِرِينَ عَذَابٌ أَلِيمٌ"
      },
      {
      id: 112,
      verse_key: "2:105",
      text_uthmani: "مَّا يَوَدُّ ٱلَّذِينَ كَفَرُوا۟ مِنْ أَهْلِ ٱلْكِتَـٰبِ وَلَا ٱلْمُشْرِكِينَ أَن يُنَزَّلَ عَلَيْكُم مِّنْ خَيْرٍ مِّن رَّبِّكُمْ ۗ وَٱللَّهُ يَخْتَصُّ بِرَحْمَتِهِۦ مَن يَشَآءُ ۚ وَٱللَّهُ ذُو ٱلْفَضْلِ ٱلْعَظِيمِ"
      },
  ],[
    {
      id: 112,
      verse_key: "2:105",
      text_uthmani: "مَّا يَوَدُّ ٱلَّذِينَ كَفَرُوا۟ مِنْ أَهْلِ ٱلْكِتَـٰبِ وَلَا ٱلْمُشْرِكِينَ أَن يُنَزَّلَ عَلَيْكُم مِّنْ خَيْرٍ مِّن رَّبِّكُمْ ۗ وَٱللَّهُ يَخْتَصُّ بِرَحْمَتِهِۦ مَن يَشَآءُ ۚ وَٱللَّهُ ذُو ٱلْفَضْلِ ٱلْعَظِيمِ"
      },
      {
      id: 113,
      verse_key: "2:106",
      text_uthmani: "۞ مَا نَنسَخْ مِنْ ءَايَةٍ أَوْ نُنسِهَا نَأْتِ بِخَيْرٍ مِّنْهَآ أَوْ مِثْلِهَآ ۗ أَلَمْ تَعْلَمْ أَنَّ ٱللَّهَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ"
      },
      {
      id: 114,
      verse_key: "2:107",
      text_uthmani: "أَلَمْ تَعْلَمْ أَنَّ ٱللَّهَ لَهُۥ مُلْكُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ ۗ وَمَا لَكُم مِّن دُونِ ٱللَّهِ مِن وَلِىٍّ وَلَا نَصِيرٍ"
      },
      {
      id: 115,
      verse_key: "2:108",
      text_uthmani: "أَمْ تُرِيدُونَ أَن تَسْـَٔلُوا۟ رَسُولَكُمْ كَمَا سُئِلَ مُوسَىٰ مِن قَبْلُ ۗ وَمَن يَتَبَدَّلِ ٱلْكُفْرَ بِٱلْإِيمَـٰنِ فَقَدْ ضَلَّ سَوَآءَ ٱلسَّبِيلِ"
      },
      {
      id: 116,
      verse_key: "2:109",
      text_uthmani: "وَدَّ كَثِيرٌ مِّنْ أَهْلِ ٱلْكِتَـٰبِ لَوْ يَرُدُّونَكُم مِّنۢ بَعْدِ إِيمَـٰنِكُمْ كُفَّارًا حَسَدًا مِّنْ عِندِ أَنفُسِهِم مِّنۢ بَعْدِ مَا تَبَيَّنَ لَهُمُ ٱلْحَقُّ ۖ فَٱعْفُوا۟ وَٱصْفَحُوا۟ حَتَّىٰ يَأْتِىَ ٱللَّهُ بِأَمْرِهِۦٓ ۗ إِنَّ ٱللَّهَ عَلَىٰ كُلِّ شَىْءٍ قَدِيرٌ"
      },
      {
      id: 117,
      verse_key: "2:110",
      text_uthmani: "وَأَقِيمُوا۟ ٱلصَّلَوٰةَ وَءَاتُوا۟ ٱلزَّكَوٰةَ ۚ وَمَا تُقَدِّمُوا۟ لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ ٱللَّهِ ۗ إِنَّ ٱللَّهَ بِمَا تَعْمَلُونَ بَصِيرٌ"
      }],[
        {
          id: 118,
          verse_key: "2:111",
          text_uthmani: "وَقَالُوا۟ لَن يَدْخُلَ ٱلْجَنَّةَ إِلَّا مَن كَانَ هُودًا أَوْ نَصَـٰرَىٰ ۗ تِلْكَ أَمَانِيُّهُمْ ۗ قُلْ هَاتُوا۟ بُرْهَـٰنَكُمْ إِن كُنتُمْ صَـٰدِقِينَ"
          },
          {
          id: 119,
          verse_key: "2:112",
          text_uthmani: "بَلَىٰ مَنْ أَسْلَمَ وَجْهَهُۥ لِلَّهِ وَهُوَ مُحْسِنٌ فَلَهُۥٓ أَجْرُهُۥ عِندَ رَبِّهِۦ وَلَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ"
          },
          {
          id: 120,
          verse_key: "2:113",
          text_uthmani: "وَقَالَتِ ٱلْيَهُودُ لَيْسَتِ ٱلنَّصَـٰرَىٰ عَلَىٰ شَىْءٍ وَقَالَتِ ٱلنَّصَـٰرَىٰ لَيْسَتِ ٱلْيَهُودُ عَلَىٰ شَىْءٍ وَهُمْ يَتْلُونَ ٱلْكِتَـٰبَ ۗ كَذَٰلِكَ قَالَ ٱلَّذِينَ لَا يَعْلَمُونَ مِثْلَ قَوْلِهِمْ ۚ فَٱللَّهُ يَحْكُمُ بَيْنَهُمْ يَوْمَ ٱلْقِيَـٰمَةِ فِيمَا كَانُوا۟ فِيهِ يَخْتَلِفُونَ"
          },
          {
          id: 121,
          verse_key: "2:114",
          text_uthmani: "وَمَنْ أَظْلَمُ مِمَّن مَّنَعَ مَسَـٰجِدَ ٱللَّهِ أَن يُذْكَرَ فِيهَا ٱسْمُهُۥ وَسَعَىٰ فِى خَرَابِهَآ ۚ أُو۟لَـٰٓئِكَ مَا كَانَ لَهُمْ أَن يَدْخُلُوهَآ إِلَّا خَآئِفِينَ ۚ لَهُمْ فِى ٱلدُّنْيَا خِزْىٌ وَلَهُمْ فِى ٱلْـَٔاخِرَةِ عَذَابٌ عَظِيمٌ"
          },
          {
          id: 122,
          verse_key: "2:115",
          text_uthmani: "وَلِلَّهِ ٱلْمَشْرِقُ وَٱلْمَغْرِبُ ۚ فَأَيْنَمَا تُوَلُّوا۟ فَثَمَّ وَجْهُ ٱللَّهِ ۚ إِنَّ ٱللَّهَ وَٰسِعٌ عَلِيمٌ"
          }],
          [{
            id: 122,
            verse_key: "2:115",
            text_uthmani: "وَلِلَّهِ ٱلْمَشْرِقُ وَٱلْمَغْرِبُ ۚ فَأَيْنَمَا تُوَلُّوا۟ فَثَمَّ وَجْهُ ٱللَّهِ ۚ إِنَّ ٱللَّهَ وَٰسِعٌ عَلِيمٌ"
            },
            {
            id: 123,
            verse_key: "2:116",
            text_uthmani: "وَقَالُوا۟ ٱتَّخَذَ ٱللَّهُ وَلَدًا ۗ سُبْحَـٰنَهُۥ ۖ بَل لَّهُۥ مَا فِى ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ ۖ كُلٌّ لَّهُۥ قَـٰنِتُونَ"
            },
            {
            id: 124,
            verse_key: "2:117",
            text_uthmani: "بَدِيعُ ٱلسَّمَـٰوَٰتِ وَٱلْأَرْضِ ۖ وَإِذَا قَضَىٰٓ أَمْرًا فَإِنَّمَا يَقُولُ لَهُۥ كُن فَيَكُونُ"
            },
            {
            id: 125,
            verse_key: "2:118",
            text_uthmani: "وَقَالَ ٱلَّذِينَ لَا يَعْلَمُونَ لَوْلَا يُكَلِّمُنَا ٱللَّهُ أَوْ تَأْتِينَآ ءَايَةٌ ۗ كَذَٰلِكَ قَالَ ٱلَّذِينَ مِن قَبْلِهِم مِّثْلَ قَوْلِهِمْ ۘ تَشَـٰبَهَتْ قُلُوبُهُمْ ۗ قَدْ بَيَّنَّا ٱلْـَٔايَـٰتِ لِقَوْمٍ يُوقِنُونَ"
            },
            {
            id: 126,
            verse_key: "2:119",
            text_uthmani: "إِنَّآ أَرْسَلْنَـٰكَ بِٱلْحَقِّ بَشِيرًا وَنَذِيرًا ۖ وَلَا تُسْـَٔلُ عَنْ أَصْحَـٰبِ ٱلْجَحِيمِ"
            },
            {
            id: 127,
            verse_key: "2:120",
            text_uthmani: "وَلَن تَرْضَىٰ عَنكَ ٱلْيَهُودُ وَلَا ٱلنَّصَـٰرَىٰ حَتَّىٰ تَتَّبِعَ مِلَّتَهُمْ ۗ قُلْ إِنَّ هُدَى ٱللَّهِ هُوَ ٱلْهُدَىٰ ۗ وَلَئِنِ ٱتَّبَعْتَ أَهْوَآءَهُم بَعْدَ ٱلَّذِى جَآءَكَ مِنَ ٱلْعِلْمِ ۙ مَا لَكَ مِنَ ٱللَّهِ مِن وَلِىٍّ وَلَا نَصِيرٍ"
            }],
            [{
              id: 128,
              verse_key: "2:121",
              text_uthmani: "ٱلَّذِينَ ءَاتَيْنَـٰهُمُ ٱلْكِتَـٰبَ يَتْلُونَهُۥ حَقَّ تِلَاوَتِهِۦٓ أُو۟لَـٰٓئِكَ يُؤْمِنُونَ بِهِۦ ۗ وَمَن يَكْفُرْ بِهِۦ فَأُو۟لَـٰٓئِكَ هُمُ ٱلْخَـٰسِرُونَ"
              },
              {
              id: 129,
              verse_key: "2:122",
              text_uthmani: "يَـٰبَنِىٓ إِسْرَٰٓءِيلَ ٱذْكُرُوا۟ نِعْمَتِىَ ٱلَّتِىٓ أَنْعَمْتُ عَلَيْكُمْ وَأَنِّى فَضَّلْتُكُمْ عَلَى ٱلْعَـٰلَمِينَ"
              },
              {
              id: 130,
              verse_key: "2:123",
              text_uthmani: "وَٱتَّقُوا۟ يَوْمًا لَّا تَجْزِى نَفْسٌ عَن نَّفْسٍ شَيْـًٔا وَلَا يُقْبَلُ مِنْهَا عَدْلٌ وَلَا تَنفَعُهَا شَفَـٰعَةٌ وَلَا هُمْ يُنصَرُونَ"
              },
              {
              id: 131,
              verse_key: "2:124",
              text_uthmani: "۞ وَإِذِ ٱبْتَلَىٰٓ إِبْرَٰهِـۧمَ رَبُّهُۥ بِكَلِمَـٰتٍ فَأَتَمَّهُنَّ ۖ قَالَ إِنِّى جَاعِلُكَ لِلنَّاسِ إِمَامًا ۖ قَالَ وَمِن ذُرِّيَّتِى ۖ قَالَ لَا يَنَالُ عَهْدِى ٱلظَّـٰلِمِينَ"
              },
              {
              id: 132,
              verse_key: "2:125",
              text_uthmani: "وَإِذْ جَعَلْنَا ٱلْبَيْتَ مَثَابَةً لِّلنَّاسِ وَأَمْنًا وَٱتَّخِذُوا۟ مِن مَّقَامِ إِبْرَٰهِـۧمَ مُصَلًّى ۖ وَعَهِدْنَآ إِلَىٰٓ إِبْرَٰهِـۧمَ وَإِسْمَـٰعِيلَ أَن طَهِّرَا بَيْتِىَ لِلطَّآئِفِينَ وَٱلْعَـٰكِفِينَ وَٱلرُّكَّعِ ٱلسُّجُودِ"
              },],[{id: 133,
                verse_key: "2:126",
                text_uthmani: "وَإِذْ قَالَ إِبْرَٰهِـۧمُ رَبِّ ٱجْعَلْ هَـٰذَا بَلَدًا ءَامِنًا وَٱرْزُقْ أَهْلَهُۥ مِنَ ٱلثَّمَرَٰتِ مَنْ ءَامَنَ مِنْهُم بِٱللَّهِ وَٱلْيَوْمِ ٱلْـَٔاخِرِ ۖ قَالَ وَمَن كَفَرَ فَأُمَتِّعُهُۥ قَلِيلًا ثُمَّ أَضْطَرُّهُۥٓ إِلَىٰ عَذَابِ ٱلنَّارِ ۖ وَبِئْسَ ٱلْمَصِيرُ"
                },
                {
                id: 134,
                verse_key: "2:127",
                text_uthmani: "وَإِذْ يَرْفَعُ إِبْرَٰهِـۧمُ ٱلْقَوَاعِدَ مِنَ ٱلْبَيْتِ وَإِسْمَـٰعِيلُ رَبَّنَا تَقَبَّلْ مِنَّآ ۖ إِنَّكَ أَنتَ ٱلسَّمِيعُ ٱلْعَلِيمُ"
                },
                {
                id: 135,
                verse_key: "2:128",
                text_uthmani: "رَبَّنَا وَٱجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِن ذُرِّيَّتِنَآ أُمَّةً مُّسْلِمَةً لَّكَ وَأَرِنَا مَنَاسِكَنَا وَتُبْ عَلَيْنَآ ۖ إِنَّكَ أَنتَ ٱلتَّوَّابُ ٱلرَّحِيمُ"
                },
                {
                id: 136,
                verse_key: "2:129",
                text_uthmani: "رَبَّنَا وَٱبْعَثْ فِيهِمْ رَسُولًا مِّنْهُمْ يَتْلُوا۟ عَلَيْهِمْ ءَايَـٰتِكَ وَيُعَلِّمُهُمُ ٱلْكِتَـٰبَ وَٱلْحِكْمَةَ وَيُزَكِّيهِمْ ۚ إِنَّكَ أَنتَ ٱلْعَزِيزُ ٱلْحَكِيمُ"
                },
                {
                id: 137,
                verse_key: "2:130",
                text_uthmani: "وَمَن يَرْغَبُ عَن مِّلَّةِ إِبْرَٰهِـۧمَ إِلَّا مَن سَفِهَ نَفْسَهُۥ ۚ وَلَقَدِ ٱصْطَفَيْنَـٰهُ فِى ٱلدُّنْيَا ۖ وَإِنَّهُۥ فِى ٱلْـَٔاخِرَةِ لَمِنَ ٱلصَّـٰلِحِينَ"
                },],
                [{
                  id: 138,
                  verse_key: "2:131",
                  text_uthmani: "إِذْ قَالَ لَهُۥ رَبُّهُۥٓ أَسْلِمْ ۖ قَالَ أَسْلَمْتُ لِرَبِّ ٱلْعَـٰلَمِينَ"
                  },
                  {
                  id: 139,
                  verse_key: "2:132",
                  text_uthmani: "وَوَصَّىٰ بِهَآ إِبْرَٰهِـۧمُ بَنِيهِ وَيَعْقُوبُ يَـٰبَنِىَّ إِنَّ ٱللَّهَ ٱصْطَفَىٰ لَكُمُ ٱلدِّينَ فَلَا تَمُوتُنَّ إِلَّا وَأَنتُم مُّسْلِمُونَ"
                  },
                  {
                  id: 140,
                  verse_key: "2:133",
                  text_uthmani: "أَمْ كُنتُمْ شُهَدَآءَ إِذْ حَضَرَ يَعْقُوبَ ٱلْمَوْتُ إِذْ قَالَ لِبَنِيهِ مَا تَعْبُدُونَ مِنۢ بَعْدِى قَالُوا۟ نَعْبُدُ إِلَـٰهَكَ وَإِلَـٰهَ ءَابَآئِكَ إِبْرَٰهِـۧمَ وَإِسْمَـٰعِيلَ وَإِسْحَـٰقَ إِلَـٰهًا وَٰحِدًا وَنَحْنُ لَهُۥ مُسْلِمُونَ"
                  },
                  {
                  id: 141,
                  verse_key: "2:134",
                  text_uthmani: "تِلْكَ أُمَّةٌ قَدْ خَلَتْ ۖ لَهَا مَا كَسَبَتْ وَلَكُم مَّا كَسَبْتُمْ ۖ وَلَا تُسْـَٔلُونَ عَمَّا كَانُوا۟ يَعْمَلُونَ"
                  },
                  {
                  id: 142,
                  verse_key: "2:135",
                  text_uthmani: "وَقَالُوا۟ كُونُوا۟ هُودًا أَوْ نَصَـٰرَىٰ تَهْتَدُوا۟ ۗ قُلْ بَلْ مِلَّةَ إِبْرَٰهِـۧمَ حَنِيفًا ۖ وَمَا كَانَ مِنَ ٱلْمُشْرِكِينَ"
                  },
                  {
                  id: 143,
                  verse_key: "2:136",
                  text_uthmani: "قُولُوٓا۟ ءَامَنَّا بِٱللَّهِ وَمَآ أُنزِلَ إِلَيْنَا وَمَآ أُنزِلَ إِلَىٰٓ إِبْرَٰهِـۧمَ وَإِسْمَـٰعِيلَ وَإِسْحَـٰقَ وَيَعْقُوبَ وَٱلْأَسْبَاطِ وَمَآ أُوتِىَ مُوسَىٰ وَعِيسَىٰ وَمَآ أُوتِىَ ٱلنَّبِيُّونَ مِن رَّبِّهِمْ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِّنْهُمْ وَنَحْنُ لَهُۥ مُسْلِمُونَ"
                  },
                  ],[
                    {
                      id: 137,
                      verse_key: "2:130",
                      text_uthmani: "وَمَن يَرْغَبُ عَن مِّلَّةِ إِبْرَٰهِـۧمَ إِلَّا مَن سَفِهَ نَفْسَهُۥ ۚ وَلَقَدِ ٱصْطَفَيْنَـٰهُ فِى ٱلدُّنْيَا ۖ وَإِنَّهُۥ فِى ٱلْـَٔاخِرَةِ لَمِنَ ٱلصَّـٰلِحِينَ"
                      },
                      {
                      id: 138,
                      verse_key: "2:131",
                      text_uthmani: "إِذْ قَالَ لَهُۥ رَبُّهُۥٓ أَسْلِمْ ۖ قَالَ أَسْلَمْتُ لِرَبِّ ٱلْعَـٰلَمِينَ"
                      },
                      {
                      id: 139,
                      verse_key: "2:132",
                      text_uthmani: "وَوَصَّىٰ بِهَآ إِبْرَٰهِـۧمُ بَنِيهِ وَيَعْقُوبُ يَـٰبَنِىَّ إِنَّ ٱللَّهَ ٱصْطَفَىٰ لَكُمُ ٱلدِّينَ فَلَا تَمُوتُنَّ إِلَّا وَأَنتُم مُّسْلِمُونَ"
                      },
                      {
                      id: 140,
                      verse_key: "2:133",
                      text_uthmani: "أَمْ كُنتُمْ شُهَدَآءَ إِذْ حَضَرَ يَعْقُوبَ ٱلْمَوْتُ إِذْ قَالَ لِبَنِيهِ مَا تَعْبُدُونَ مِنۢ بَعْدِى قَالُوا۟ نَعْبُدُ إِلَـٰهَكَ وَإِلَـٰهَ ءَابَآئِكَ إِبْرَٰهِـۧمَ وَإِسْمَـٰعِيلَ وَإِسْحَـٰقَ إِلَـٰهًا وَٰحِدًا وَنَحْنُ لَهُۥ مُسْلِمُونَ"
                      },
                      {
                      id: 141,
                      verse_key: "2:134",
                      text_uthmani: "تِلْكَ أُمَّةٌ قَدْ خَلَتْ ۖ لَهَا مَا كَسَبَتْ وَلَكُم مَّا كَسَبْتُمْ ۖ وَلَا تُسْـَٔلُونَ عَمَّا كَانُوا۟ يَعْمَلُونَ"
                      },
                  ]
      ]
  


