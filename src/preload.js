import {
  PROFILE,
  SPOTIFY_TRACK,
  ALL_SKILL_ITEMS,
  AI_TOOLING,
  ALL_PROJECTS,
  CERTIFICATIONS,
  ACTIVITIES,
  EXPERIENCE,
  AFFILIATIONS,
  ABOUT_PHOTOS,
  EDUCATION,
  IMAGE_FIELDS,
  thumbFor,
  galleryFor,
} from "./data.js";
import { img, loadRemoteImages } from "./images.jsx";
import { galleryUrl } from "./components/Archives.jsx";
import { TRACKS } from "./components/CDPlayer.jsx";
import { audioCache } from "./audioCache.js";

const REMOTE_WAIT = 6000;
const IMAGE_TIMEOUT = 15000;
const WEIGHT = { remote: 5, music: 40, images: 55 };

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const asList = (value) => [].concat(value || []).filter((key) => typeof key === "string" && key);

const collectUrls = () => {
  const urls = new Set();
  const add = (url) => url && urls.add(url);
  add(img(PROFILE.photo));
  add(img(SPOTIFY_TRACK.cover));
  const sources = [
    ...ALL_SKILL_ITEMS,
    ...AI_TOOLING,
    ...ALL_PROJECTS,
    ...CERTIFICATIONS,
    ...ACTIVITIES,
    ...EXPERIENCE,
    ...AFFILIATIONS,
    ...ABOUT_PHOTOS,
    ...EDUCATION,
  ];
  const plainFields = IMAGE_FIELDS.filter((field) => field !== "gallery" && field !== "galleryDark");
  for (const item of sources) {
    for (const field of plainFields) asList(item[field]).forEach((key) => add(img(key)));
  }
  for (const project of ALL_PROJECTS) {
    for (const dark of [false, true]) {
      const gallery = galleryFor(project, dark);
      const keys = gallery && gallery.length ? gallery : [thumbFor(project, dark)];
      keys.filter(Boolean).forEach((key) => add(galleryUrl(key)));
    }
  }
  return [...urls];
};

const loadImage = (url) =>
  new Promise((resolve) => {
    const image = new Image();
    const finish = () => {
      clearTimeout(timer);
      image.onload = null;
      image.onerror = null;
      resolve();
    };
    const timer = setTimeout(finish, IMAGE_TIMEOUT);
    image.onload = finish;
    image.onerror = finish;
    image.src = url;
  });

const downloadTrack = async (track, onChunk) => {
  try {
    const response = await fetch(track.src);
    if (!response.ok) throw new Error(`Audio request failed (${response.status})`);
    const total = Number(response.headers.get("content-length")) || 0;
    let blob;
    if (response.body && total) {
      const reader = response.body.getReader();
      const chunks = [];
      let received = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.length;
        onChunk(Math.min(1, received / total));
      }
      blob = new Blob(chunks, { type: "audio/mpeg" });
    } else {
      const raw = await response.blob();
      blob = new Blob([raw], { type: "audio/mpeg" });
    }
    audioCache.set(track.src, URL.createObjectURL(blob));
  } catch {}
  onChunk(1);
};

export async function preloadAll(onProgress) {
  const part = { remote: 0, music: TRACKS.map(() => 0), images: 0 };
  let last = 0;
  const report = () => {
    const music = part.music.reduce((sum, value) => sum + value, 0) / TRACKS.length;
    const value = WEIGHT.remote * part.remote + WEIGHT.music * music + WEIGHT.images * part.images;
    last = Math.max(last, Math.min(100, value));
    onProgress(last);
  };

  const music = Promise.all(
    TRACKS.map((track, index) =>
      downloadTrack(track, (fraction) => {
        part.music[index] = fraction;
        report();
      })
    )
  );

  const remote = loadRemoteImages().catch(() => null);
  await Promise.race([remote, delay(REMOTE_WAIT)]);
  part.remote = 1;
  report();

  const urls = collectUrls();
  let finished = 0;
  if (!urls.length) {
    part.images = 1;
    report();
  }
  const images = Promise.all(
    urls.map((url) =>
      loadImage(url).then(() => {
        finished += 1;
        part.images = finished / urls.length;
        report();
      })
    )
  );

  await Promise.all([music, images]);
  onProgress(100);
}
