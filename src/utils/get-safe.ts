export default function getSafe<T>(getter: () => T): T | undefined {
  try {
    return getter();
  } catch (e) {
    return undefined;
  }
}
