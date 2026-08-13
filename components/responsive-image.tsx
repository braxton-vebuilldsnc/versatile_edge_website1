type ResponsiveImageProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  loading?: "eager" | "lazy";
  decorative?: boolean;
};

export function ResponsiveImage({
  src,
  alt,
  sizes,
  className,
  priority = false,
  loading = "lazy",
  decorative = false,
}: ResponsiveImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      aria-hidden={decorative ? "true" : undefined}
      data-responsive-widths="640,1280,1920"
      sizes={sizes}
      loading={priority ? "eager" : loading}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
