

export function saveSearchParams(search: string) {
  return {
    type: '@@search/SAVE_SEARCH' as const,
    search: search,
  };
}

//exports
export type SaveSearchAction = ReturnType<typeof saveSearchParams>;
export type SearchActions = SaveSearchAction ;
