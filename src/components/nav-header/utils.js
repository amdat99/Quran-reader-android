

export async function fetchBookmarksAsync(id,contentid) {

  
    try {
      // const response = yield fetch(
      //   "https://aamirproject-api.herokuapp.com/addmessages",
      //   {
          const response = await fetch('http://192.168.11.177:3000/fetchbookmarks',{
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              id: id,
              userid: contentid,
          }),
        }
      );
      const data = await response.json();
      console.log('data',data);
        return data;
  
    } catch (e) {
        console.log(e)
    }
  }

  export async function fetchNotesAsync(id,contentid,page) {

  
    try {
      // const response = yield fetch(
      //   "https://aamirproject-api.herokuapp.com/addmessages",
      //   {
          const response = await fetch('http://192.168.11.177:3000/fetchnotes',{
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              id: id,
              userid: contentid,
              page: page
          }),
        }
      );
      const data = await response.json();
      console.log('data',data);
        return data;
  
    } catch (e) {
        console.log(e)
    }
  }

  export async function fetchAllNotesAsync(id,contentid) {

  
    try {
      // const response = yield fetch(
      //   "https://aamirproject-api.herokuapp.com/addmessages",
      //   {
          const response = await fetch('http://192.168.11.177:3000/fetchallnotes',{
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              id: id,
              userid: contentid,
          }),
        }
      );
      const data = await response.json();
      console.log('data',data);
        return data;
  
    } catch (e) {
        console.log(e)
    }
  }

  export const  deleteBookmarkAsync = async (bookmarkid) => { 
    console.log('deleting copies')
        try {
       
           const response = await fetch('http://192.168.11.177:3000/deletebookmark',{
             method: "post",
             headers: { "Content-Type": "application/json" },
             body: JSON.stringify({
              bookmarkid: bookmarkid,
      
            }),
           }
         );
         const data =  await response.json();
         console.log(data);
         return data
       
       }catch(e) {
           console.log('delete bookmark error',e)
       }
        }

        export const  deleteNoteAsync = async (noteid) => { 
          console.log('deleting copies')
              try {
             
                 const response = await fetch('http://192.168.11.177:3000/deletenote',{
                   method: "post",
                   headers: { "Content-Type": "application/json" },
                   body: JSON.stringify({
                    noteid: noteid,
            
                  }),
                 }
               );
               const data =  await response.json();
               console.log(data);
               return data
             
             }catch(e) {
                 console.log('delete note error',e)
             }
              }
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
    pageGreen: 445,
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
    num: 28
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
    num: 106
  },
  {
    name: 'al-Kafirun',
    pageGreen: 846,
    num: 107
  },
  {
    name: 'an-Nasr',
    pageGreen: 846,
    num: 108
  },
  {
    name: 'al-Masad',
    pageGreen: 847,
    num: 109
  },
  {
    name: 'al-Ikhlas',
    pageGreen: 847,
    num: 110
  },
  {
    name: 'al-Falaq',
    pageGreen: 847,
    num: 111
  },
  {
    name: 'an-Nas',
    pageGreen: 848,
    num: 112
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

const translation = [
  {
    page: 2,
    ayah: 1,
    text: 'With the name of Allah, the All-Merciful, the Very-Merciful.',
  },
  {
    page: 2,
    ayah: 2,
    text: 'Praise belongs to Allah, the Lord of all the worlds.',
  },
  {
    page: 2,
    ayah: 3,
    text: 'the All-Merciful, the Very Merciful.',
  },
  {
    page: 2,
    ayah: 4,
    text: 'the Master of the Day of Requital. ',
  },
  {
    page: 2,
    ayah: 5,
    text: 'You alone do we worship, and from You alone do we seek help.',
  },
  {
    page: 2,
    ayah: 6,
    text: 'Take us on the straight path.',
  },
  {
    page: 2,
    ayah: 7,
    text: 'the path of those on whom You have bestowed Your Grace, not of those who have incurred Your wrath, nor of those who have gone astray. ',
  },
];