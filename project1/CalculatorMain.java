/*
* Christian Trinidad
* 2-7-2018
* Comp 585
* This is the main class that initializes the application
*/
import javax.swing.JFrame;

public class CalculatorMain {

    public static void main(String[] args) {

        JFrame frame = new CalculatorFrame();
        frame.setTitle("My calculator");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);
        frame.setResizable(false);

    }

}