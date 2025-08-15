import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const inputStyles = StyleSheet.create({
  base: {
    width: '100%',
    height: 40,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    backgroundColor: Colors.inputBackground,
  },
  centerText: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  error: {
    borderColor: Colors.notification,
  },
  helper: {
    marginTop: 6,
    fontSize: 12,
    color: Colors.textContent,
  },
  errorText: {
    marginTop: 6,
    fontSize: 12,
    color: Colors.notification,
  },
});