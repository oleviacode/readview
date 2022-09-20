export interface UserDataState {
  rating: {
    rating: number,
    count: number,
  }[];
  genre: {
    genre_name: string,
    count: number,
  }[];
  reading: {
    date_trunc: string,
    count: number
  }[];
  author: {
    author_name: string,
    count: number
  }[];
  fiction: {
    nonfiction : number,
    fiction: number,
  }[],
  isLoading: boolean | null,
  userId: number,
}