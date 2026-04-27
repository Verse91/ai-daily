interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-serif font-bold text-gray-900">{title}</h2>
      {subtitle && (
        <p className="text-gray-500 mt-2">{subtitle}</p>
      )}
    </div>
  );
}