import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Register2: undefined;
  Cover: undefined;
  Main: undefined;
  Chat: undefined;
  DashBoard: undefined;
};

export type NaviProps = NativeStackScreenProps<RootStackParamList>;
