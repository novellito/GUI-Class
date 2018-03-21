/*
* Christian Trinidad
* 2-21-2018
* Comp 585
* This class contains the Logic for the
* Weights category
*/

public class WeightsLogic {

    private static final double GRAM_TO_OZ = 0.035274;
    private static final double OZ_TO_GRAM = 28.3495;
    private static final double KILO_TO_LB = 2.20462;
    private static final double LB_TO_KILO = 0.453592;
    private static final double TONS_TO_LB = 2000;
    private static final double LB_TO_TONS = 0.0005;

    public static String doCalculation(double val, String type) {
        
        switch(type) {
            case "gramToOz":
            return "" + String.format("%.4f",val * GRAM_TO_OZ) + " oz";
            
            case "ozToGram":
            return "" + String.format("%.4f",val * OZ_TO_GRAM) + " g";
            
            case "kiloToLb": 
            return "" + String.format("%.4f",val * KILO_TO_LB) + " lbs";
            
            case "lbToKilo":
            return "" + String.format("%.4f",val * LB_TO_KILO) + " kg";

            case "tonToLbs":
            return "" + String.format("%.4f",val * TONS_TO_LB) + " lbs";

            case "lbsToTons":
            return "" + String.format("%.4f",val * LB_TO_TONS) + " tons";

            default:
                return "error";
        }
        
    }

}