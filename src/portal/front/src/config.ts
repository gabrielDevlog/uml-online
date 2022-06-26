export interface RemoteService {
  /**
   * A unique identifier of the service in the portal
   */
  app_unique_name: string;

  serviceId: string;

  /**
   * A url where the service can be fetched
   */
  url: string;

  /**
   * All url paths where this service will be active
   */
  paths: string[];
}

export const config = {
  services: {
    plantumlProxy: {
      app_unique_name: "uml-plantuml-proxy",
      serviceId: "uml-plantuml-proxy",
      url: process.env.PLANTUML_PROXY_URL as string,
      paths: ["/diagrams", "/public/diagrams"]
    },
    account: {
      app_unique_name: "uml-account",
      serviceId: "uml-account",
      url: process.env.ACCOUNT_URL as string,
      paths: ["/me", "/login", "/diagrams"]
    },
    account2: {
      app_unique_name: "uml-account-2",
      serviceId: "uml-account",
      url: process.env.ACCOUNT_URL + "?date=5",
      paths: ["/me", "/login", "/diagrams"]
    }
  }
};
