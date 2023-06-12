import {showMessage} from 'react-native-flash-message';
import {colors} from '../colors';

export const showError = (message, deskripsi) => {
  showMessage({
    message: message,
    description: deskripsi,
    type: 'default',
    backgroundColor: colors.error,
    color: colors.white,
  });
};

export const showSuccess = (message, deskripsi) => {
  showMessage({
    message: message,
    description: deskripsi,
    type: 'default',
    backgroundColor: 'blud',
    color: colors.white,
  });
};
