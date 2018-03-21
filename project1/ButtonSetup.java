/*
* Christian Trinidad
* 2-7-2018
* Comp 585
* This class initializes the button setup 
* for the calculator along with the click listeners.
*/
import java.awt.event.ActionListener;

import javax.swing.JButton;

public class ButtonSetup {

    public static JButton [] buttons;
    public static String [] buttonsArr;
    
    public ButtonSetup() {

        buttonsArr = new String [] {
            "7","8","9","del","4","5","6","clr","1",
            "2","3","+",".","0","-","*","%","/","="
        }; 
        addButtons();
    }


    private void addButtons() {

        ActionListener listener = new ClickListener();
        buttons = new JButton[buttonsArr.length];
      
          for (int i = 0; i <= buttonsArr.length-1; i++) {
            buttons[i] = new JButton(buttonsArr[i]);
            CalculatorFrame.panel.buttonPanel.add(buttons[i]);
            buttons[i].addActionListener(listener);
        }

    }
}