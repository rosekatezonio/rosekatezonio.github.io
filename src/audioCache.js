export const audioCache = new Map();
export const resolveAudio = (src) => audioCache.get(src) || src;
