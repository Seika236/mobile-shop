import Toast from "react-native-toast-message";

export function UseToaster() {
  const showInfoToast = (description: string) => {
    Toast.show({
      type: "info",
      text1: "info",
      text2: description,
      position: "top",
      visibilityTime: 10000,
    });
  };

  const showErrorToast = (description: string) => {
    Toast.show({
      type: "error",
      text1: "error",
      text2: description,
      position: "top",
      visibilityTime: 10000,
    });
  };

  const showSuccessToast = (description: string) => {
    Toast.show({
      type: "success",
      text1: "success",
      text2: description,
      position: "top",
      visibilityTime: 10000,
    });
  };

  return {
    showInfoToast,
    showErrorToast,
    showSuccessToast,
  };
}
