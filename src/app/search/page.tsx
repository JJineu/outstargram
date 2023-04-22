import { Metadata } from "next";
import SearchBar from "../components/SearchBar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "User Search",
  description: "Search users to follow",
};

export default function SearchPage() {
  return <SearchBar />;
}
