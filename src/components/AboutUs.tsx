import { CinematicHero } from "./ui/cinematic-hero";

export const AboutUs = () => {
  return (
    <section id="about" className="relative py-64 md:py-64 pt-80 md:pt-96">
      <CinematicHero 
        brandName="BOMB"
        tagline1="ESTILO DE RUA,"
        tagline2="ALMA URBAN"
        cardHeading="AUTENTICIDADE SEM LIMITES"
        cardDescription="A BOMB Street Art nasceu nas ruas de Recife, transformando a energia do graffiti em moda streetwear de alto nível. Cada peça é um drop exclusivo feito para quem não tem medo de se expressar."
        metricValue={2024}
        metricLabel="FOUNDED"
        ctaHeading="FAÇA PARTE DO MOVIMENTO"
        ctaDescription="Siga nossa jornada no Instagram e fique por dentro dos próximos lançamentos."
      />
    </section>
  );
};
