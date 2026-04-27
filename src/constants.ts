import { BrandInfo, Product } from './types';

export const BRAND_INFO: BrandInfo = {
  name: 'BOMB STREET ART',
  slogan: 'DIRETAMENTE DAS RUAS',
  origin: 'Recife, PE',
  whatsapp: '5581998010914',
  instagram: 'bombstreetart',
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Camisa Oversized Bomb Classic',
    price: 89.90,
    category: 'Camiseta',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    description: '100% Algodão, fio 30.1 penteado. Modelagem oversized para o máximo conforto nas ruas.',
  },
  {
    id: '2',
    name: 'Moletom Graffiti Session',
    price: 189.90,
    category: 'Moletom',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    description: 'Moletom pesado com estampa em silk screen de alta durabilidade.',
  },
  {
    id: '3',
    name: 'Bag Street Recife',
    price: 59.90,
    category: 'Acessório',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f331?auto=format&fit=crop&q=80&w=800',
    description: 'Shoulder bag resistente com compartimento secreto para seus suprimentos de arte.',
  },
  {
    id: '4',
    name: 'Camisa Tagged Black',
    price: 79.90,
    category: 'Camiseta',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800',
    description: 'Estampa frontal minimalista com a tag oficial da marca.',
  },
  {
    id: '5',
    name: 'Moletom Crewneck Urban',
    price: 159.90,
    category: 'Moletom',
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=800',
    description: 'O clássico urbano em versão crewneck, sem capuz.',
  },
  {
    id: '6',
    name: 'Boné Dad Hat Bomb',
    price: 69.90,
    category: 'Acessório',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&q=80&w=800',
    description: 'Boné aba curva com bordado de alta definição.',
  },
];
