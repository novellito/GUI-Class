/*
* Christian Trinidad
* 2-21-2018
* Comp 585
* This class contains the logic for the 
* finance category
*/

public class FinanceLogic {

    private static double tip;
    private static double salesTax;
    public static double totalChange;

    public static String calculateTip(double total, double gratuity) {
        tip = gratuity * total;
        total += tip;
        return "" + "Total Tip: $" + String.format("%.2f",tip)  + "\n Total: $" + String.format("%.2f",total);
    }

    public static String calculateSalesTax(double total, double tax) {
        salesTax = tax * total;
        total += salesTax;
        return "" + "Tax: $" + String.format("%.2f",salesTax) + "\n Total Cost: $" + String.format("%.2f",total);
    }

    public static String calculateChange(double denom, int amt) {
        totalChange += denom * amt;
        return "$" + String.format("%.2f",totalChange);
    }

}