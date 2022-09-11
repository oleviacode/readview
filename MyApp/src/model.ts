import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Register2: undefined;
  Cover: undefined;
  Main: undefined;
  Chat: undefined;
  MessageTop: {something: NaviProps};
};

export type NaviProps = NativeStackScreenProps<RootStackParamList>;
