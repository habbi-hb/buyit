export const colors = {
  TRANSPARENT: 'transparent',
  WHITE: '#FFF',
  BLACK: '#000',
  // RED: {
  //   DEFAULT: 'red',
  // },
  // GREEN: {
  //   DEFAULT: 'green',
  //   LIGHT: '#00ff0d',
  //   BUTTON: '#2b7a45',
  // },
  // BLUE: {
  //   DEFAULT: 'blue',
  //   PRIMARY: 'rgba(111, 202, 186, 1)',
  //   SECONDARY: '#007AFF',
  //   LIGHT: '#8EC4E6',
  //   SKY: '#4A90E2',
  //   DARK: '#111B1E',
  //   DEEP: '#0386E1',
  //   TAB: '#006EEC',
  // },

  GREY: {
    DEFAULT: '#333333',
    //   PRIMARY: '#F5F1F1',
    //   SECONDARY: '#9B9B9B',
    //   LIGHT: '#CCCCCC',
    //   TAB: '#555555',
  },
  // YELLOW: {
  //   PRIMARY: '#FDA33B',
  //   SECONDARY: '#FFE446',
  //   LIGHT: '#DBD6A0',
  // },
  ORANGE: {
    DEFAULT: '#fcb941',
    //   PRIMARY: '#ff9626',
    //   SECONDARY: '#f78f0f',
  },
  // PURPLE: {
  //   DEFAULT: '#31117a',
  //   PRIMARY: '#381191',
  //   SECONDARY: '#4c00fa',
  // },
  LIGHTGREY: {
    DEFAULT: '#8f8f8f',
    //   LIGHT: '#ffdbf1',
  },
};

export let images = {
  logo: require('../assets/logo.png'),
  slider1: require('../assets/slider1.jpg'),
  slider2: require('../assets/slider1.jpg'),
  slider3: require('../assets/slider1.jpg'),
  slider4: require('../assets/slider1.jpg'),
  logoAsiaTv: require('../assets/logo_asiatv.png'),
  trendingProduct: require('../assets/product.jpg'),
};
const mainurl = 'http://thecodeditors.com/test/carobar/';
const mainurl2 = 'https://thecodeditors.com/test/carobar/';
const mainurl3= 'https://thecodeditors.com/test/buy_it/'
export const sliderpic =
  'https://thecodeditors.com/test/single_vendor/admin/slider_images/';
export const cardimage =
  'https://thecodeditors.com/test/single_vendor/admin/plugin/product_images/';
export const cartimage =
  'https://thecodeditors.com/test/single_vendor/admin/plugin/product_images/';
export const catlist =
  'https://thecodeditors.com/test/single_vendor/admin/sub_category_images/';

export const featuredslider =
  'https://thecodeditors.com/test/single_vendor/admin/plugin/product_images/';

export let api = {
  menuCategories: '',
  signup: mainurl + 'api-user-signup.php?',
  login: mainurl + 'api-user-login.php?',
  allproduct: 'https://thecodeditors.com/test/buy_it/api-get-allproduct.php',
  categorieslist: mainurl + 'api-get-subcategories.php?',
  categorieslistdetails: mainurl + 'api-get-product.php?',
  productdetails: mainurl + 'api-get-singleproduct.php?',
  cartshow: mainurl3 + 'api-get-cartshow.php?user_id=',
  checkout: mainurl + 'api-get-checkout.php?',
  addcart: mainurl3 + 'api-get-cartadd.php?guest_id=',
  deleteitem: mainurl + 'api-get-cartdel.php?cart_id=',
  recommendslider: mainurl + 'api-get-allproductrole.php?role=recommended',
  featuredslider: mainurl + 'api-get-allproductrole.php?role=featured',
  slider: mainurl + 'api-get-slider-images.php',
  categories: 'https://thecodeditors.com/test/buy_it/api-get-categories.php',
  shop: 'https://thecodeditors.com/test/buy_it/api-get-shopname.php',
  Recent: 'https://thecodeditors.com/test/buy_it/api-get-recentproducts.php',
  changepassword: mainurl2 + 'api-user-changepassword.php?id=',
};
