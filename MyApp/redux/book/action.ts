


export function saveBookId(id: number) {
  return {
    type: '@@book/SAVE_BOOKID' as const,
    bookId: id,
  };
}

export function saveLastSearch(id: number) {
  return {
    type: '@@book/SAVE_LAST' as const,
    lastBookId: id,
  };
}

//exports
export type SaveLastAction = ReturnType<typeof saveLastSearch>
export type SaveBookAction = ReturnType<typeof saveBookId>;
export type BookActions = SaveBookAction | SaveLastAction;
