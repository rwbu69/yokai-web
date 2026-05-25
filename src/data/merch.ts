import m1 from '../assets/hero-images/1.jpg';
import m2 from '../assets/hero-images/2.jpg';
import m3 from '../assets/hero-images/3.jpg';

export interface MerchItem {
  id: string
  name: string
  price: number
  currency: string
  images: string[]
  description: string
  variants?: string[]
  available: boolean
}

export const merchItems: MerchItem[] = [
  {
    id: 'yokai-classic-tee',
    name: 'YOKAI CLASSIC TEE',
    price: 150000,
    currency: 'IDR',
    images: [m1.src, m2.src],
    description: 'The definitive Yokai Wotagei heavy cotton tee. Featuring our signature logo on the back and minimalist typography on the chest. Built for intense waza practice.',
    variants: ['S', 'M', 'L', 'XL', 'XXL'],
    available: true
  },
  {
    id: 'blade-lightstick',
    name: 'MURAMASA LUMINA BLADE',
    price: 250000,
    currency: 'IDR',
    images: [m3.src],
    description: 'High-luminance multi-color blade custom engineered for wotagei performance. Perfectly balanced for dual-wielding.',
    available: false
  },
  {
    id: 'yokai-hoodie-2026',
    name: 'UNDERGROUND CIRCUIT HOODIE',
    price: 350000,
    currency: 'IDR',
    images: [m2.src, m1.src],
    description: 'Limited 2026 tour edition. Thick fleece material with oversized fit. Perfect for warming up before hitting the stage.',
    variants: ['M', 'L', 'XL'],
    available: true
  }
];
