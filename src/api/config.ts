const DOMAIN_BY_ENV = {
  dev: "api", // TODO на будущее если добавится дев апи поменять на dev-api
  prod: "api",
};

export const getApiUrlDomain = () => {
  // Local/testing override — baked at build time. Prod builds leave this unset.
  if (process.env.NEXT_PUBLIC_API_BASE_URL) {
    return process.env.NEXT_PUBLIC_API_BASE_URL;
  }

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;

    if (hostname.includes("localhost")) {
      return `https://${DOMAIN_BY_ENV.dev}.tcopsapps.com/api/v1`;
    }
  }

  return `https://${DOMAIN_BY_ENV.prod}.tcopsapps.com/api/v1`;
};
