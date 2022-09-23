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

export function saveBooklistId(booklistArray: number[], id: number) {
  let newArray = booklistArray.slice();
  let index = newArray.findIndex(num => (num = id));
  newArray.splice(index, 0, id);
  return {
    type: '@@book/SAVE_BOOKLISTID' as const,
    bookListId: newArray,
  };
}

export function removeBooklistId(booklistArray: number[], id: number) {
  const newArray = booklistArray.filter(item => item !== id);
  return {
    type: '@@book/SAVE_BOOKLISTID' as const,
    bookListId: newArray,
  };
}

export function clearBooklistId() {
  const newArray = [0];
  return {
    type: '@@book/SAVE_BOOKLISTID' as const,
    bookListId: newArray,
  };
}

//exports
export type SaveLastAction = ReturnType<typeof saveLastSearch>;
export type SaveBookAction = ReturnType<typeof saveBookId>;
export type SaveBooklistIdAction = ReturnType<typeof saveBooklistId>;
export type RemoveBooklistIdAction = ReturnType<typeof removeBooklistId>;
export type ClearBooklistIdAction = ReturnType<typeof clearBooklistId>;
export type BookActions =
  | SaveBookAction
  | SaveLastAction
  | SaveBooklistIdAction
  | RemoveBooklistIdAction
  | ClearBooklistIdAction;
