export const API_CONFIG = {
  BASE_URL: "https://pokeapi.co",
  API_VERSION: "/api/v2",
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

export const API_ENDPOINTS = {
  POKEMON: {
    GET_ALL: "/pokemon",
    GET_BY_ID: (id: string) => `/pokemon/${id}`,
    GET_BY_NAME: (name: string) => `/pokemon/${name}`,
    GET_EVOLUTION_TRIGGERS: `/evolution-trigger`,
  },
} as const;
