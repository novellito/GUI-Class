/*
* Christian Trinidad
* 2-21-2018
* Comp 585
* This class contains the Logic for the
* Temperature category
*/

public class TemperatureLogic {

    public static String doCalculation(double val, String type) {

        switch(type) {
            case "cToF":
            return "" + String.format("%.2f",(val * 9/5 + 32)) + " F";
        
            case "fToC":
            return "" + String.format("%.2f",((val - 32) * 5/9)) + " C";
            
            case "fToK":
            return "" + String.format("%.2f",((val + 459.67) * 5/9)) + " K";
            
            case "kToF":
            return "" + String.format("%.2f",((val - 273) * 9/5 + 32)) + " F";
            
            case "kToC":
            return "" + String.format("%.2f", (val - 273)) + " C";
            
            case "cToK":
            return "" + String.format("%.2f",(val + 273)) + " K";

            default:
            return "error";
        }
        
    }

}