import { useProductTags } from "@/hooks/Mutation";

export const TagList = () => {
  const { data: tags, isLoading } = useProductTags();

  if (isLoading) return <p>Loading tags...</p>;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag: string) => (
        <span key={tag} className="px-3 py-1 bg-gray-100 rounded text-sm">
          #{tag}
        </span>
      ))}
    </div>
  );
};
