export default interface Display<T> {
  display: (data: T[] ) => void;
  load: () => Promise<T> | Promise<T[]> | [];
  errorMessage?: () => never | null;
}