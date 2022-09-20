import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  PreviewBook,
  PreviewBookContents,
} from './screens/bookProfile/DisplayBook';
import Config from 'react-native-config';

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

export type AuthorInfoTitle = {
  book_id: number;
  book_picture: string;
};

export type AuthorInfo = {
  id: number;
  author_name: string;
  titles: AuthorInfoTitle[];
  info: string;
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

export interface ReviewCardInfo {
  user_id: number;
  username: string;
  profile_picture: string;
  rating: number;
  updated_at: string;
  content: string;
}

export const initialBookPreviewContents: PreviewBookContents = {
  id: 1,
  book_picture:
    'https://www.syndetics.com/index.aspx?isbn=9780446617420/mc.gif&client=bipsite&type=nocover&upc=&ean=9780446617420&issn=',
};

export const initialBookInfo: BookInfo = {
  id: 0,
  title: '',
  author_name: '',
  publisher_name: '',
  publish_date: '',
  book_picture: `${Config.REACT_APP_BACKEND_URL}/uploads/default.jpg`,
  genre: [''],
  info: '',
  rating: 5,
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

export const initialReviewInfo: ReviewCardInfo = {
  user_id: 0,
  username: '',
  profile_picture: 'default_profile_picture.jpg',
  rating: 0,
  updated_at: '',
  content: '',
};

export interface RatingCardProps {
  ratingInfo: RatingInfo;
}
export interface BookProfileProps {
  bookInfo: BookInfo;
}
export interface AuthorProfileProps {
  Author: AuthorInfo;
}
export interface DiscussionInfoProps {
  discussionInfo: DiscussionInfo;
}

export type NaviProps = NativeStackScreenProps<RootStackParamList>;
