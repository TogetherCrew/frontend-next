export const redirectToDiscord = (): void => {
  const discordAuthUrl = `${import.meta.env.VITE_API_BASE_URL}auth/try-now`;
  window.location.href = discordAuthUrl;
};
