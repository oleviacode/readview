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
  bookId: number;
  bookTitle: string;
  author: string;
  publisher: string;
  publishDate: string;
  bookPicture: string;
  genre: string;
  synopsis: string;
  rating: number | undefined;
  readerStatus: 'read' | 'reading' | 'want to read' | undefined;
};

export type DiscussionInfo = {
  authorName: string;
  publishDate: string;
  topic: string;
  text: string;
};

export interface RatingInfo {
  numberOfRatings: number;
  rating: number;
  fiveStarsNum: number;
  fourStarsNum: number;
  threeStarsNum: number;
  twoStarsNum: number;
  oneStarNum: number;
  readerNum: number;
  readingNum: number;
  savedNum: number;
}

export interface BookProfileProps {
  bookInfo: BookInfo;
}

export interface DiscussionInfoProps {
  discussionInfo: DiscussionInfo;
}

export type NaviProps = NativeStackScreenProps<RootStackParamList>;
