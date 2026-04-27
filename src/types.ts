export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'Camiseta' | 'Moletom' | 'Acessório';
  description: string;
}

export interface BrandInfo {
  name: string;
  slogan: string;
  origin: string;
  whatsapp: string;
  instagram: string;
}
