import SearchContent from "@/components/SearchContent";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams;

  const query = params.q?.trim() || "";

  // The page stays a server component (reads the query string).
  // Filtering and the bilingual UI happen in the client component.
  return <SearchContent query={query} />;
}
