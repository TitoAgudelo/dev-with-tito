interface JsonLdProps {
  readonly data: object;
}

export default function JsonLd({ data }: JsonLdProps) {
  const serialized = JSON.stringify(data).replaceAll("<", "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serialized }} />;
}
