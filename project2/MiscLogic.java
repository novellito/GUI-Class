/*
* Christian Trinidad
* 2-21-2018
* Comp 585
* This class contains the logic for the Misc.
* category.
*/

public class MiscLogic {

    public static String encrypt(String message, int key) {

        char [] msgToArr = message.toUpperCase().toCharArray();

        for(int i = 0; i <= msgToArr.length - 1; i++) {

            if(msgToArr[i] == 32) { // keep the space if present
                msgToArr[i] = 32;
            } else if(msgToArr[i] >= 48 && msgToArr[i] <= 57) {
                msgToArr[i] = msgToArr[i]; //do nothing for numbers
            } else {
                msgToArr[i] = (char) ((msgToArr[i] + key - 'A') % 26 + 'A'); // subtract ascii value of 'A' (65) to go back to beginning of alphabet
            }
        }

        message = String.valueOf(msgToArr);
        return message;
    }

    public static String decrypt(String encText, int key) {

        char [] msgToArr = encText.toUpperCase().toCharArray();

        for(int i = 0; i <= msgToArr.length - 1; i++) {

            if(msgToArr[i] == 32) { // keep the space if present
                msgToArr[i] = 32;
            }else if(msgToArr[i] >= 48 && msgToArr[i] <= 57) {
                msgToArr[i] = msgToArr[i]; //do nothing for numbers
            } else {
                msgToArr[i] = (char) ((msgToArr[i] - key + 'A') % 26 + 'A'); // Add ascii value of 'A' (65) to go back to beginning of alphabet
            }
        }

        encText = String.valueOf(msgToArr);
        return encText;
    }

    public static String [][] calculatePlanetWeights(double weight) {

        double mercury = weight * .378;
        double venus = weight * .907;
        double mars = weight * .377;
        double jupiter = weight * 2.364;
        double saturn = weight * .916;
        double uranus = weight * .889;
        double neptune = weight * 1.125;
        double pluto = weight * .076;

        return new String [][]{
            {"Mercury", WeightsLogic.doCalculation(mercury, "kiloToLb"),Double.toString(mercury) + " kgs"},
            {"Venus", WeightsLogic.doCalculation(venus, "kiloToLb") ,Double.toString(venus) + " kgs"},
            {"Mars", WeightsLogic.doCalculation(mars, "kiloToLb"),Double.toString(mars) + " kgs"},
            {"Jupiter", WeightsLogic.doCalculation(jupiter, "kiloToLb"),Double.toString(jupiter) + " kgs"},
            {"Saturn",WeightsLogic.doCalculation(saturn, "kiloToLb") ,Double.toString(saturn) + " kgs"},
            {"Uranus", WeightsLogic.doCalculation(uranus, "kiloToLb"),Double.toString(uranus) + " kgs"},
            {"Neptune",WeightsLogic.doCalculation(neptune, "kiloToLb") ,Double.toString(neptune) + " kgs"},
            {"Pluto",WeightsLogic.doCalculation(pluto, "kiloToLb") ,Double.toString(pluto) + " kgs"}
        };
    }
}