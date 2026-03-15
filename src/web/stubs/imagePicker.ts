/**
 * Web stub for react-native-image-picker.
 * Opens file input dialog on web.
 */

type Callback = (result: { assets?: Array<{ uri: string }> }) => void;

export function launchCamera(_opts: object, callback: Callback): void {
  pickFile(callback);
}

export function launchImageLibrary(_opts: object, callback: Callback): void {
  pickFile(callback);
}

function pickFile(callback: Callback): void {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = () => {
    const file = input.files?.[0];
    if (file) {
      callback({ assets: [{ uri: URL.createObjectURL(file) }] });
    }
  };
  input.click();
}
