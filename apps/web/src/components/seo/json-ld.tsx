type JsonLdValue = Record<string, unknown> | Record<string, unknown>[];

type JsonLdProps = {
  data: JsonLdValue;
};

/** Renders one or more JSON-LD scripts for search engines. */
export function JsonLd({ data }: JsonLdProps) {
  const payloads = Array.isArray(data) ? data : [data];

  return (
    <>
      {payloads.map((payload, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
