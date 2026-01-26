interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
}

export function HeroSection({
  title = "Dịch Vụ Visa Trọn Gói",
  subtitle = "Visa đi nước ngoài - Dễ dàng, Nhanh chóng, Tỷ lệ đậu cao",
  backgroundImage = "/visa/banner.png",
}: HeroSectionProps) {
  return (
    <section className="relative h-75 md:h-100">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      <div className="absolute inset-0 bg-foreground/60" />
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-center text-white">
        <h1 className="text-4xl md:text-5xl capitalize font-bold text-background mb-4">
          {title}
        </h1>
        <p className="text-xl text-white/90  mb-8 animate-in slide-in-from-bottom-5 duration-700 delay-100">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
