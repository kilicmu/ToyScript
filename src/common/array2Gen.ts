export function* array2Gen(array: string) {
  for (let i = 0; i < array.length; ++i) {
    yield array[i];
  }
}
