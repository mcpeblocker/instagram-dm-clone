import SearchIcon from "@/components/icons/SearchIcon";

interface SearchInputProps {
  onSearch: (query: string) => void;
}

export default function SearchInput(props: SearchInputProps) {
  return (
    <div className="w-full flex items-center rounded-lg bg-secondary-bg">
      <div className="flex justify-center items-center px-4 py-2">
        <SearchIcon />
      </div>
      <input
        className="flex-grow h-12 pr-2 rounded-md bg-transparent outline-none"
        type="text"
        placeholder="사람 검색" // en: Search people
        onChange={(e) => props.onSearch(e.target.value)}
      />
    </div>
  );
}
