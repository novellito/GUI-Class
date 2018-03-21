/*
* Christian Trinidad
* 2-21-2018
* Comp 585
* This class contains the Logic for the
* speed category
*/

public class SpeedLogic {

    public static String doCalculation(double val, String type) {

        switch(type) {
            case "mphToKmph":
            return "" + String.format("%.3f",val * 1.60934) + " kmph";

            case "kmphToMph":
            return "" + String.format("%.3f",val * 0.621371) + " mph";
            
            case "machToFps":
            return "" + String.format("%.3f",val * 1116.437) + " ft/s";
            
            case "fpsToMach":
            return "" + String.format("%.3f",val * 0.0008957066) + " mach";
            
            case "knotToMph":
            return "" + String.format("%.3f",val * 1.150779) + " mph";

            case "mphToKnot":
            return "" + String.format("%.3f",val * 0.8689762) + " knot(s)";
            
            default:
            return "error";

        }
    }
}  