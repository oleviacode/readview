import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Register2: undefined;
  Cover: undefined;
  Main: undefined;
  Chat: undefined;
  DashBoard: undefined;
  Profile: undefined;
  Settings: undefined;
  Details: undefined;
  BookProfile: {bookId: number};
  AllReviews: {bookId: number};
  Search:{searchParams : string};
};

export type BookInfo = {
  id: number;
  title: string;
  author_name: string;
  publisher_name: string;
  publish_date: string;
  book_picture: string;
  genre: string[] | undefined;
  info: string;
  rating: number | undefined;
  readerstatus: 'read' | 'reading' | 'want to read' | undefined;
  isbn: string;
  pages: number;
};

export type DiscussionInfo = {
  authorName: string;
  publishDate: string;
  topic: string;
  text: string;
};

export type RatingInfo = {
  numOfRatings: number;
  rating: number;
  fiveStarsNum: number;
  fourStarsNum: number;
  threeStarsNum: number;
  twoStarsNum: number;
  oneStarNum: number;
  readNum: number;
  readingNum: number;
  savedNum: number;
};

export const initialBookInfo: BookInfo = {
  id: 0,
  title: '',
  author_name: '',
  publisher_name: '',
  publish_date: '',
  book_picture: '',
  genre: undefined,
  info: '',
  rating: undefined,
  readerstatus: undefined,
  pages: 0,
  isbn: '',
};

export const initialRatingInfo: RatingInfo = {
  numOfRatings: 0,
  rating: 0,
  fiveStarsNum: 0,
  fourStarsNum: 0,
  threeStarsNum: 0,
  twoStarsNum: 0,
  oneStarNum: 0,
  readNum: 0,
  readingNum: 0,
  savedNum: 0,
};

export interface RatingCardProps {
  ratingInfo: RatingInfo;
}
export interface BookProfileProps {
  bookInfo: BookInfo;
}

export interface SearchProps {
  searchParams: string;
}

export interface DiscussionInfoProps {
  discussionInfo: DiscussionInfo;
}

export type NaviProps = NativeStackScreenProps<RootStackParamList>;
