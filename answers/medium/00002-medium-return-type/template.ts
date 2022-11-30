type MyReturnType<T> = T extends (...args: any[]) => infer Result ? Result : never
