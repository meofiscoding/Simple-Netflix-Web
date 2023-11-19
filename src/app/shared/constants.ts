export class Constants {
    // Role
    public static memberRole = "Member";
    
    public static clientId = "angular-client";

    // API route
    public static pricingPlansApi = "payment/planform";
    public static pricingPlansInfoApi = "/payment/plan";
    public static registerApi= "auth/register"
    public static paymentSuccessApi = "payment/success"
    public static createPaymentIntentApi = "payment/checkout"
    public static subscriptionApi = "payment/subscriptions";

    // Local
    // public static apiRoot = "https://localhost:7213";
    // public static apiRoot = "https://localhost:5000";
    // public static clientRoot = "http://localhost:4200";
    // public static idpAuthority = "https://localhost:7096"
    // Production
    public static clientRoot = "https://simplenetflix.vercel.app";
    public static apiRoot = "https://aks.20.44.235.37.nip.io";
    public static idpAuthority = "https://netflix-identity.azurewebsites.net";

}