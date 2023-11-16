export class Constants {
    // Role
    public static memberRole = "Member";
    
    public static clientId = "angular-client";

    // API route
    public static pricingPlansApi = "api/pricingPlans";
    public static registerApi= "auth/register"
    public static subcriptionSecret = "subcription/secret"
    public static pricingPlansInfoApi = "api/pricingPlan"
    public static paymentSuccessApi = "subscription/success"
    public static createPaymentIntentApi = "api/create-payment-intent"

    public static subscriptionApi = "api/subscription";
    // Local
    // public static apiRoot = "https://localhost:7213";
    // public static clientRoot = "http://localhost:4200";
    // public static idpAuthority = "https://localhost:7096"
    public static apiRoot = "http://localhost:5031";
    public static clientRoot = "http://localhost:4200";
    public static idpAuthority = "http://localhost:5286"
    // Production
    // public static clientRoot = "https://simplenetflix.vercel.app";
    // public static apiRoot = "https://simplenetflixapi.azurewebsites.net/api";
    // public static idpAuthority = "https://identitynetflix.azurewebsites.net";
}