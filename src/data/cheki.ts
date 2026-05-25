import c1 from '../assets/hero-images/4.jpg';
import c2 from '../assets/hero-images/5.jpg';
import c3 from '../assets/hero-images/6.jpg';

export interface ChekiItem {
  id: string
  name: string
  price: number
  currency: string
  image: string
  description: string
  available: boolean
}

export interface ChekiConfig {
  isOpen: boolean
  closedMessage: string
}

export const chekiConfig: ChekiConfig = {
  isOpen: false, // Default closed, can be toggled via DEV button
  closedMessage: "OUR CHEKI IS CLOSED AT THE MOMENT."
}

export const chekiItems: ChekiItem[] = [
  {
    id: 'cheki-solo-1',
    name: 'SOLO: KAI',
    price: 50000,
    currency: 'IDR',
    image: c1.src,
    description: 'Solo polaroid shot. Signed.',
    available: true
  },
  {
    id: 'cheki-solo-2',
    name: 'SOLO: RYU',
    price: 50000,
    currency: 'IDR',
    image: c2.src,
    description: 'Solo polaroid shot. Signed.',
    available: true
  },
  {
    id: 'cheki-group',
    name: 'GROUP SHOT',
    price: 80000,
    currency: 'IDR',
    image: c3.src,
    description: 'Full team polaroid with special event decorations.',
    available: true
  }
];
