import { ui, defaultLang, showDefaultLang } from "./ui";

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang && lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslation(lang: keyof typeof ui) {
  return {
    t: (key: keyof (typeof ui)[typeof defaultLang]) => {
      return ui[lang][key] || ui[defaultLang][key];
    },
  };
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`;
  };
}
