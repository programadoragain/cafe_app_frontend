export class GlobalConstants{
    public static genericError: string = "Something went wrong. Please try again later.";

    public static unauthorized: string= "You not have the permisions to access this page.";

    public static nameRegex: string = "[a-zA-Z0-9 ]*";
    public static emailRegex: string = "[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}";
    public static phoneRegex: string = "^[0-9]{10,12}$";

    public static error:string = "error"; 
}