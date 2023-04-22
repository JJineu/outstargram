import { createContext, useContext } from "react";

type CacheKeysValue = {
  postsKey: string;
};
export const CacheKeysContext = createContext<CacheKeysValue>({
  postsKey: "/api/post",
});

export const useCacheKeys = () => useContext(CacheKeysContext);
