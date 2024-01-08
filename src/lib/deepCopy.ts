/**
 * Deep copy
 * @param {T} target
 * @returns {T}
 */
 export const deepCopy = <T>(target: T): T => {
    if (target === null) {
      return target;
    }
    if (target instanceof Array) {
      const cp = [] as any[];
      (target as any[]).forEach((v) => { cp.push(v); });
      return cp.map((n: any) => deepCopy<any>(n)) as any;
    }

    if (typeof target === 'object') {
      const cp = { ...(target as { [key: string]: any }) } as { [key: string]: any };
      for (const k of Object.keys(cp)) {
        cp[k] = deepCopy<any>(cp[k]);
      }
      return cp as T;
    }

    return target;
};