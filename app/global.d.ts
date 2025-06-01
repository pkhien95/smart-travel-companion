declare module '*.png' {
  const content: any
  export default content
}

declare module '*.jpg' {
  const content: any
  export default content
}

declare type Nullable<T> = T | null

declare type Undefined<T> = T | undefined

declare type Nullish<T> = Nullable<T> | undefined

declare type Nil<T> = Nullable<T> | undefined

declare type Dict<T, K = string> = Record<K, T>
