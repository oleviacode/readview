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
  AddToBookList: {bookId: number};
  AllReviews: {bookId: number};
  BookListScreen: {booklistId: number};
  AuthorScreen: {authorId: number};
  Search: undefined;
  Scanner: undefined;
  AddTopic: undefined;
  UpdatebooklistScreen: {booklistId: number};
  DiscussionProfileScreen: {topicId: number};
};

export type ResponseInfo = {
  username: string;
  updated_at: string;
  content: string;
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
  author_id: number;
};
export type AuthorInfo = {
  id: number;
  author_name: string;
  bookids: number[];
  array_agg: string[];
  bookpictures: string[];
  genres: string[];
  numoffollowers: number;
};

export type DiscussionInfo = {
  substring: string;
  username: string;
  id: number;
  info: string;
  likes: number;
  unlikes: number;
  updated_at: string;
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

export type BookListInfo = {
  id: number;
  title: string;
  booklist_creator_id: number;
  private: boolean;
  genre: string[];
  numoffollowers: number;
  book_picture: string[];
  book_id: number;
};

export interface ReviewCardInfo {
  id: number;
  user_id: number;
  username: string;
  profile_picture: string;
  rating: number;
  updated_at: string;
  content: string;
}

export interface RegInfo {
  username: string;
  email: string;
  password: string;
  gender: string | null;
  birthday: string | null;
}

export interface RankingBoxInfo {
  toprated: number | null;
  mostread: number | null;
  mostcomment: number | null;
  book_picture: string;
  title: string;
  id: number;
}

export const initialResponseInfo: ResponseInfo = {
  username: '',
  updated_at: '',
  content: '',
};

export const initialAuthorInfo: AuthorInfo = {
  id: 0,
  author_name: '',
  bookids: [0],
  array_agg: [''],
  bookpictures: [''],
  genres: [''],
  numoffollowers: 0,
};

export const initialBookListInfo: BookListInfo = {
  id: 0,
  title: '',
  booklist_creator_id: 0,
  private: false,
  genre: ['Fiction'],
  numoffollowers: 0,
  book_picture: [
    `${Config.REACT_APP_BACKEND_URL}/uploads/default_profile_picture`,
  ],
  book_id: 0,
};

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
  author_id: 0,
};

export type Birthday = Date | null;

export const initialRegInfo: RegInfo = {
  username: '',
  email: '',
  password: '',
  gender: 'other',
  birthday: null,
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
  id: 0,
};

export const initialRankingBoxInfo: RankingBoxInfo = {
  toprated: 1,
  mostread: 1,
  mostcomment: 1,
  book_picture: `${Config.REACT_APP_BACKEND_URL}/uploads/default.jpg`,
  title: '',
  id: 1,
};

export const initialDiscussInfo: DiscussionInfo = {
  substring: '',
  username: '',
  id: 0,
  info: '',
  likes: 0,
  unlikes: 0,
  updated_at: '',
};

export interface ReviewCardProps {
  reviewInfo: ReviewCardInfo;
  index: number;
}

export interface ResponseInfoProps {
  responseInfo: ResponseInfo;
}

export type RankingBoxProps = {
  importedInfo: RankingBoxInfo[];
  boxTitle: string;
};

export interface RatingCardProps {
  ratingInfo: RatingInfo;
}
export interface BookProfileProps {
  bookInfo: BookInfo;
}
export interface BookProfilePropsArray {
  bookInfo: BookInfo[];
}
export interface AuthorProfileProps {
  Author: AuthorInfo;
}
export interface DiscussionInfoProps {
  discussionInfo: DiscussionInfo;
}
export interface BooklistInfoProps {
  booklist: BookListInfo;
}
export interface AuthorInfoProps {
  authorlist: AuthorInfo;
}

export type NaviProps = NativeStackScreenProps<RootStackParamList>;
