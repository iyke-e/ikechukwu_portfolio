interface PagesHeroProps {
  title: string;
  subtitle?: string;
  className?: string; // optional additional classes
}

const PagesHero: React.FC<PagesHeroProps> = ({
  title,
  subtitle,
  className = "",
}) => {
  return (
    <div
      className={`pt-20 md:pt-30 pb-10 grid gap-4 md:grid-cols-2 pad-auto items-center border-b border-foreground/20 ${className}`}
    >
      <h1 className="text-7xl md:text-8xl opacity-30">{title}</h1>
      <p className="text-gray-300/50 text-lg">{subtitle}</p>
    </div>
  );
};

export default PagesHero;
