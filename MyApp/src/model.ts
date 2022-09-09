import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  Register2: undefined;
};

export type NaviProps = NativeStackScreenProps<RootStackParamList>;
