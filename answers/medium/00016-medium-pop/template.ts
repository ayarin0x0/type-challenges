type Pop<T extends any[]> = T extends [...infer Rest, unknown] ? Rest : []
