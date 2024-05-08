import { Product } from './types/Product'

export const sampleProduct: Product[] = [
  {
    name: 'Dishwasher',
    url: 'Dishwasher',
    image: '../productImages/appliances/dishwasher.jpg',
    category: 'Appliances',
    brand: 'Samsung',
    price: 8000,
    stockCount: 0,
    description:
      ' A time-saving appliance that efficiently cleans dishes, utensils, and cookware using hot water and detergent.',
    rating: 4,
    numberOfReviews: 4,
  },
  {
    name: 'Oven',
    url: 'Oven',
    image: '../productImages/appliances/oven.jpeg',
    category: 'Appliances',
    brand: 'Samsung',
    price: 8000,
    stockCount: 20,
    description:
      ' A kitchen appliance used for baking, roasting, and heating food by circulating hot air within an enclosed space. ',
    rating: 5,
    numberOfReviews: 5,
  },
  {
    name: 'Refrigerator',
    url: 'Refrigerator',
    image: '../productImages/appliances/ref.jpeg',
    category: 'Appliances',
    brand: 'Hanabishi',
    price: 60000,
    stockCount: 10,
    description:
      ' An essential kitchen appliance that keeps food and beverages cool and fresh by maintaining a low temperature.',
    rating: 5,
    numberOfReviews: 2,
  },
]
