const reelsData = [
  // 🥘 Food Reels
  {
    id: 1,
    category: "food",
    caption: "taste the food with lens",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Reels/food1.png?updatedAt=1774954366295",
    video:
      "https://vz-963c42bb-849.b-cdn.net/11207cd4-c122-4e0f-9a61-8d0914cc7a9e/playlist.m3u8",
    views: "737K",
    likes: "19K",
    shares: "27K",
    creatorName: "akfoodvlogg",
    creatorProfile: "/images/testi/AK.jpg",
    rotation: 1.2,
  },
  {
    id: 2,
    category: "food",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Reels/food4.png?updatedAt=1774954366391",
    video:
      "https://vz-963c42bb-849.b-cdn.net/997cb648-dfd4-49c5-9b42-c097644dc993/playlist.m3u8",
    views: "110K",
    likes: "2K",
    shares: "2.3K",
    creatorName: "hussainhk",
    creatorProfile: "/images/testi/hussain HK.jpg",
    rotation: -0.5,
  },
  {
    id: 3,
    category: "food",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Reels/food2.png?updatedAt=1774954366149",
    video:
      "https://vz-963c42bb-849.b-cdn.net/77257f41-437e-4c16-89a2-31618f9db7b2/playlist.m3u8",
    views: "164K",
    likes: "4K",
    shares: "2.8K",
    creatorName: "shreddeddiesel",
    creatorProfile: "/images/testi/shreded.jpg",
    rotation: -0.3,
  },
  {
    id: 4,
    category: "food",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Reels/food3.jpg?updatedAt=1774954364679",
    video:
      "https://vz-963c42bb-849.b-cdn.net/de855122-0edb-4092-8adb-e02a48b0a2fd/playlist.m3u8",
    views: "157K",
    likes: "3K",
    shares: "3K",
    creatorName: "akfoodvlogg",
    creatorProfile: "/images/testi/AK.jpg",
    rotation: 1,
  },

  // 🎬 Storytelling Reels
  {
    id: 5,
    category: "storytelling",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Reels/storytelling1.png?updatedAt=1774954365860",
    video:
      "https://vz-963c42bb-849.b-cdn.net/6066bbe9-8aef-4403-9535-55b60434b942/playlist.m3u8",
    views: "214K",
    likes: "10K",
    shares: "4.7K",
    creatorName: "hussainhk",
    creatorProfile: "/images/testi/hussain HK.jpg",
    rotation: 1,
  },
  {
    id: 6,
    category: "storytelling",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Reels/storytelling2.png?updatedAt=1774954366395",
    video:
      "https://vz-963c42bb-849.b-cdn.net/828f2d3f-3896-4530-8ccc-82419e2aa61b/playlist.m3u8",
    views: "186K",
    likes: "2K",
    shares: "400",
    creatorName: "smb_anwarhakim",
    creatorProfile: "/images/testi/smb.jpg",
    rotation: -0.3,
  },
  {
    id: 7,
    category: "storytelling",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Reels/storytelling3.png?updatedAt=1774954365503",
    video:
      "https://vz-963c42bb-849.b-cdn.net/24b6b598-72e9-42c0-8f71-6ec150c4fd56/playlist.m3u8",
    views: "28K",
    likes: "600",
    shares: "170",
    creatorName: "mohammadisareehouse",
    creatorProfile: "/images/testi/mohammadi.jpg",
    rotation: -0.6,
  },
  {
    id: 8,
    category: "storytelling",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Reels/storytelling4.jpg?updatedAt=1774954364103",
    video:
      "https://vz-963c42bb-849.b-cdn.net/be7fba0e-f181-4557-9b03-ea44dc48ea03/playlist.m3u8",
    views: "123K",
    likes: "6K",
    shares: "700",
    creatorName: "hussainhk",
    creatorProfile: "/images/testi/hussain HK.jpg",
    rotation: 1,
  },

  // 💬 insights Reels
  {
    id: 9,
    category: "insights",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Content%20Marketing/cm17.png?updatedAt=1774954414603",
    video:
      "https://res.cloudinary.com/dnvldejvu/video/upload/q_auto/f_auto/v1777894783/cm17_fmrywy.mp4",
    views: "17K",
    likes: "410",
    shares: "170",
    creatorName: "abdigital",
    creatorProfile: "/images/testi/abdigial.jpg",
    rotation: 1.1,
  },
  {
    id: 11,
    category: "insights",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Content%20Marketing/cm10.jpg?updatedAt=1774954413589",
    video:
      "https://res.cloudinary.com/dnvldejvu/video/upload/q_auto/f_auto/v1777894788/cm10_rhkn2v.mp4",
    views: "9K",
    likes: "1K",
    shares: "70",
    creatorName: "akupdatesyou",
    creatorProfile: "/images/testi/AK-updates.jpg",
    rotation: -0.3,
  },
  {
    id: 16,
    category: "insights",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Reels/pod5.jpg?updatedAt=1774954365117",
    video:
      "https://res.cloudinary.com/dnvldejvu/video/upload/q_auto/f_auto/v1777979390/pod5_s96uh5.mp4",
    views: "4K",
    likes: "360",
    shares: "13",
    creatorName: "brewwithabdu",
    creatorProfile: "/images/testi/abdu.png",
    rotation: -0.5,
  },
  {
    id: 12,
    category: "insights",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Reels/exp4.jpg?updatedAt=1774954365080",
    video:
      "https://res.cloudinary.com/dnvldejvu/video/upload/q_auto/f_auto/v1777979486/exp4_sdwnss.mp4",
    views: "28.4K",
    likes: "360",
    shares: "53",
    creatorName: "hussainhk",
    creatorProfile: "/images/testi/hussain HK.jpg",
    rotation: -0.5,
  },
  // podcast
  {
    id: 10,
    category: "podcast",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Reels/pod1.jpg?updatedAt=1774954364496",
    video:
      "https://res.cloudinary.com/dnvldejvu/video/upload/q_auto/f_auto/v1777979362/pod1_cn3pou.mp4",
    views: "33K",
    likes: "1K",
    shares: "100",
    creatorName: "brewwithabdu",
    creatorProfile: "/images/testi/abdu.png",
    rotation: 1,
  },
  {
    id: 15,
    category: "podcast",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Reels/pod4.jpg?updatedAt=1774954364709",
    video:
      "https://res.cloudinary.com/dnvldejvu/video/upload/q_auto/f_auto/v1777979341/pod4_jzemxx.mp4",
    views: "8.7K",
    likes: "215",
    shares: "50",
    creatorName: "brewwithabdu",
    creatorProfile: "/images/testi/abdu.png",
    rotation: 1,
  },
  {
    id: 13,
    category: "podcast",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Reels/pod2.jpg?updatedAt=1774954364669",
    video:
      "https://res.cloudinary.com/dnvldejvu/video/upload/q_auto/f_auto/v1777979367/pod2_bjqwfn.mp4",
    views: "2.5K",
    likes: "75",
    shares: "50",
    creatorName: "brewwithabdu",
    creatorProfile: "/images/testi/abdu.png",
    rotation: -0.2,
  },
  {
    id: 14,
    category: "podcast",
    thumbnail:
      "https://ik.imagekit.io/mxmnzkbib/Taher%20Films/Images/Reels/pod3.jpg?updatedAt=1774954365285",
    video:
      "https://res.cloudinary.com/dnvldejvu/video/upload/q_auto/f_auto/v1777979358/pod3_wzzpts.mp4",
    views: "2.8K",
    likes: "60",
    shares: "20",
    creatorName: "brewwithabdu",
    creatorProfile: "/images/testi/abdu.png",
    rotation: 0.8,
  },
];

export default reelsData;
