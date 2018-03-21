/*
* Christian Trinidad
* 2-7-2018
* Comp 585
* This class contains the main logic of the calculator
* along with the logic associated with a button click.
*/
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyListener;
import java.util.Arrays;

public class ClickListener implements ActionListener {

    private boolean reset;
    private double initialNum;
    private double result;
    private double nextNum;
    private String currentCommand;

    public ClickListener() {
        currentCommand = "";
        reset = false;
        initialNum = result = nextNum = 0;
    }

    public void actionPerformed(ActionEvent ae) {

             String[] ops = {"+", "-", "*", "/", "%","=","del","clr"};
             if(Arrays.asList(ops).contains(ae.getActionCommand())) {
                 doOperation(ae.getActionCommand());
             } else {
                 if(reset) {
                     CalculatorFrame.panel.textField.setText("");
                 }
                 CalculatorFrame.panel.textField.setText(CalculatorFrame.panel.textField.getText() + ae.getActionCommand());
                 reset = false;
                 CalculatorFrame.panel.textField.requestFocusInWindow(); // focus back onto textfield
             }
    }

    // This helper method checks which operation is pressed and checks the appropriate state.
    private void doOperation(String cmd) {
        switch(cmd) {
            case "+":
                checkState(cmd);
                break;
            case "-":
                checkState(cmd);
                break;
            case "*":
                checkState(cmd);
                break;
            case "/":
                checkState(cmd);
                break;
            case "%":
                checkState(cmd);
                break;
            case "del":
                checkState(cmd);
                break;
            case "=":
                finalCalc();
                break;
            default: // user cleared screen
                CalculatorFrame.panel.textField.setText("");
                CalculatorFrame.panel.textField.requestFocusInWindow(); // focus back onto textfield
                break;
        }
    }
    // This method checks the current state of the calculator
    private void checkState(String cmd) {
        try {
            if(cmd.equals("del")) { // Delete last entry
                CalculatorFrame.panel.textField.setText(CalculatorFrame.panel.textField.getText().substring(0,CalculatorFrame.panel.textField.getText().length()-1));
            } else if(!currentCommand.equals("")) { // If a previous command exists update the current total
                updateTotal();
            } else {
                initialNum = Double.parseDouble(CalculatorFrame.panel.textField.getText());
                CalculatorFrame.panel.textField.setText(cmd);
                currentCommand = cmd;
                reset = true;
            }
        } catch(NumberFormatException | StringIndexOutOfBoundsException e) { // The user changed the operation or they kept pressing the same operation. 
            CalculatorFrame.panel.textField.setText(cmd);
            currentCommand = cmd;
        }
    }
    // this method keeps track of the current total
    private void updateTotal() {
        nextNum = Double.parseDouble(CalculatorFrame.panel.textField.getText());
        switch(currentCommand) {
            case "+":
                initialNum +=  nextNum;
                CalculatorFrame.panel.label.setText(""+initialNum);
                currentCommand = "";
                break;
            case "-":
                initialNum -=  nextNum;
                CalculatorFrame.panel.label.setText(""+initialNum);
                currentCommand = "";
                break;
            case "*":
                initialNum *= nextNum;
                CalculatorFrame.panel.label.setText(""+initialNum);
                currentCommand = "";
                break;
            case "/":
                initialNum /= nextNum;
                CalculatorFrame.panel.label.setText(""+initialNum);
                currentCommand = "";
                break;
            case "%":
                initialNum %= nextNum;
                CalculatorFrame.panel.label.setText(""+initialNum);
                currentCommand = "";
                break;
            default:
                System.out.println("error");
                break;
        }
    }
    //This method calculates the final total when user selects "="
    private void finalCalc() {
        nextNum = Double.parseDouble(CalculatorFrame.panel.textField.getText());
        if (currentCommand.equals("+")) {
            result = initialNum + nextNum;
            currentCommand = "";
            CalculatorFrame.panel.label.setText(""+result);
        } else if (currentCommand.equals("-")) {
            result = initialNum - nextNum;
            currentCommand = "";
            CalculatorFrame.panel.label.setText(""+result);
        }
        else if (currentCommand.equals("*")) {
            result = initialNum * nextNum;
            currentCommand = "";
            CalculatorFrame.panel.label.setText(""+result);
        }
        else if (currentCommand.equals("/")) {
            result = initialNum / nextNum;
            currentCommand = "";
            CalculatorFrame.panel.label.setText(""+result);
        }
        else if (currentCommand.equals("%")) {
            result = initialNum % nextNum;
            currentCommand = "";
            CalculatorFrame.panel.label.setText(""+result);
        }
        CalculatorFrame.panel.textField.setText("" +result);
        reset = true;
    }
}