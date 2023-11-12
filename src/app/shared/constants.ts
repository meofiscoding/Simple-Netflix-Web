export class Constants {
    public static clientId = "angular-client";

    // API route
    public static get pricingPlansApi() { 
        return this.apiRoot + "/pricingPlans"; 
    }
    
    public static get subscriptionApi() {
        return this.apiRoot + "/subscription";
    }
    // Local
    public static apiRoot = "http://localhost:5031/api";
    public static clientRoot = "http://localhost:4200";
    public static idpAuthority = "http://localhost:5286"

    // Production
    // public static clientRoot = "https://simplenetflix.vercel.app";
    // public static apiRoot = "https://simplenetflixapi.azurewebsites.net/api";
    // public static idpAuthority = "https://identitynetflix.azurewebsites.net";
}