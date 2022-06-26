export const config = {
  services: {
    portal: {
      url: process.env.SERVICE_PORTAL_URL as string
    },
    account: {
      url: process.env.SERVICE_ACCOUNT_URL as string
    }
  }
};
