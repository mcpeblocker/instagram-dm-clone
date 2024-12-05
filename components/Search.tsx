import { useRouter } from "next/navigation";
import LeftArrow from "./icons/LeftArrow";
import TextButton from "./TextButton";
import SearchInput from "./SearchInput";
import { TSearchResult, TUser } from "@/utils/types";
import { useState } from "react";
import UserInfo from "./UserInfo";
import api from "@/utils/api";

interface SearchProps {
  me: TUser;
  onBack: () => void;
  onConfirm: (user: TUser) => void;
}

export default function Search(props: SearchProps) {
  const [results, setResults] = useState<TSearchResult[]>([]);
  const [chosenUser, setChosenUser] = useState<TUser | null>(null);

  const handleSearch = (query: string) => {
    if (!query || query.length < 2) return setResults([]);
    api.searchUsers(query, props.me).then(setResults);
    setChosenUser(null);
  };

  const handleChoose = (user: TUser) => {
    if (chosenUser === user) {
      setChosenUser(null);
    } else {
      setChosenUser(user);
    }
  };

  const handleConfirm = () => {
    if (!chosenUser) return;
    props.onConfirm(chosenUser);
  };

  return (
    <>
      {/* Header */}
      <div className="w-full flex p-2 pt-4 gap-4 items-center text-contrast">
        {/* Back button */}
        <div
          onClick={props.onBack}
          className="cursor-pointer hover:opacity-60 transition-all"
        >
          <LeftArrow />
        </div>
        {/* Title */}
        <span className="text-md font-semibold flex-grow">
          {/* en: New message */}새 매시지
        </span>
        {/* Confirm button */}
        <TextButton
          // en: OK
          text="확인"
          onClick={handleConfirm}
          disabled={!chosenUser}
        />
      </div>
      <div className="px-4 py-1">
        {/* Search input */}
        <SearchInput onSearch={handleSearch} />
        {/* Search results */}
        <div className="flex flex-col gap-1 my-3">
          {results.map((result, index) => (
            <div
              key={index}
              onClick={handleChoose.bind(null, result.user)}
              className={
                "rounded-sm border-b-[#d9d9d9] cursor-pointer hover:opacity-75 " +
                (result.user === chosenUser ? "bg-secondary-bg" : "bg-default")
              }
              style={{
                borderBottomWidth: 1,
              }}
            >
              <UserInfo result={result} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
