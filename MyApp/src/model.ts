import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
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
};

export type BookInfo = {
  id: number;
  title: string;
  author_name: string;
  publisher_name: string;
  publish_date: string;
  book_picture: string;
  genre: string[];
  info: string;
  rating: number | undefined;
  readerStatus: 'read' | 'reading' | 'want to read' | undefined;
  isbn: string;
  page: number;
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

export interface RatingCardProps {
  ratingInfo: RatingInfo;
}
export interface BookProfileProps {
  bookInfo: BookInfo;
}
export interface DiscussionInfoProps {
  discussionInfo: DiscussionInfo;
}

export type NaviProps = NativeStackScreenProps<RootStackParamList>;
