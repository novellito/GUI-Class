/*
* Christian Trinidad
* 2-21-2018
* Comp 585
* This class contains the GUI component for the
* Tip calculator functionality
*/

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JInternalFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.WindowConstants;

public class TipCalculator extends JInternalFrame {

    private static TipCalculator instance = null;
    private JTextField textField1, textField2;
    private JButton button;
    private JLabel label1,answerLabel,info, param1, param2;
    private JPanel upperPanel, middlePanel, lowerPanel;

    public static TipCalculator getInstance() {
        if(instance == null ) {
            instance = new TipCalculator();
        }
        return instance;
    }

    private TipCalculator() {
        //arge: title, resizability, closeability, maximizability inifiability
        super("Tip Calculator", false, true, false, false);
        setDisplay();
    } 

    private void setDisplay() {
        textField1 = new JTextField(10);
        textField2 = new JTextField(10);

        button = new JButton("Calculate");

        label1 = new JLabel("Answer: ");
        answerLabel = new JLabel();
        param1 = new JLabel("Tip");
        param2 = new JLabel("Gratuity");
        info = new JLabel("Enter total amount & tip percentage (in decimal format)");
        
        upperPanel = new JPanel();
        middlePanel = new JPanel();
        lowerPanel = new JPanel();

        upperPanel.add(info);
        middlePanel.add(param1);
        middlePanel.add(textField1);
        middlePanel.add(param2);
        middlePanel.add(textField2);
        middlePanel.add(button);        
        lowerPanel.add(label1);
        lowerPanel.add(answerLabel);
        add(upperPanel, BorderLayout.NORTH);
        add(middlePanel, BorderLayout.CENTER);
        add(lowerPanel, BorderLayout.SOUTH);
        addButtonListener();
        setBounds(25,25,350,150);
        setLocation(100, 100);
        setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
    }
    
    private void addButtonListener() {
        button.addActionListener(new ActionListener(){
            @Override
            public void actionPerformed(ActionEvent e) {
                setAnswer();                
            }
        });
    }

    private void setAnswer() {
        try {
            double total = Double.parseDouble(textField1.getText());
            double gratuity = Double.parseDouble(textField2.getText());
            String answer = FinanceLogic.calculateTip(total, gratuity);
            answerLabel.setText("");
            answerLabel.setText(answer);
        } catch (NumberFormatException ne) {
            JOptionPane.showMessageDialog(this, "enter a number");
        }
    }

}