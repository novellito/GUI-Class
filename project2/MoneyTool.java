/*
* Christian Trinidad
* 2-21-2018
* Comp 585
* This class contains the GUI component for the
* Money tool
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

public class MoneyTool extends JInternalFrame {

    private static MoneyTool instance = null;
    private JTextField [] denominationFields;
    private JButton calculate, clear;
    private JLabel label1,answerLabel,info;
    private JPanel upperPanel, middlePanel, lowerPanel;
    private String [] denominations;


    public static MoneyTool getInstance() {
        if(instance == null ) {
            instance = new MoneyTool();
        }
        return instance;
    }

    private MoneyTool() {
        //arge: title, resizability, closeability, maximizability inifiability
        super("Money Tool", false, true, false, false);
        denominations = new String []{"$100","$50", "$20", "$10", "$5", "$1", "\u00A225", "\u00A210", "\u00A25", "\u00A21"};
        setDisplay();
    } 

    private void setDisplay() {
        calculate = new JButton("Calculate");
        clear = new JButton("Clear");
        
        label1 = new JLabel("Answer: ");
        answerLabel = new JLabel();
        info = new JLabel("Enter amount of each denomination in the fields");

        upperPanel = new JPanel();
        middlePanel = new JPanel();
        lowerPanel = new JPanel();
        upperPanel.add(info);
        addFields();
        lowerPanel.add(label1);
        lowerPanel.add(answerLabel);
        add(upperPanel, BorderLayout.NORTH);
        add(middlePanel, BorderLayout.CENTER);
        add(lowerPanel, BorderLayout.SOUTH);
        addButtonListener();
        setBounds(25,25,350,170);
        setLocation(100, 100);
        setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
    }

    // method to add the various textfields with their respective labels
    private void addFields() {
        denominationFields = new JTextField[denominations.length];
        for(int i = 0; i < denominations.length; i++) {
            denominationFields[i] = new JTextField(3);
            JLabel denom = new JLabel(denominations[i]);
            middlePanel.add(denom);
            middlePanel.add(denominationFields[i]);
        }
        middlePanel.add(calculate);
        middlePanel.add(clear);
    }
    
    private void addButtonListener() {
        calculate.addActionListener(new ActionListener(){
            @Override
            public void actionPerformed(ActionEvent e) {
                setAnswer();                
            }
        });
        clear.addActionListener(new ActionListener(){
            @Override
            public void actionPerformed(ActionEvent e) {
                clearEntries();                
            }
        });
    }

    private void clearEntries() {
        for(int i = 0; i < denominationFields.length; i++) {
            if(!denominationFields[i].getText().equals("")) {
                denominationFields[i].setText("");
            }
        }
        FinanceLogic.totalChange = 0;
        answerLabel.setText("");        
    }

    private void setAnswer() {
    
            for(int i = 0; i < denominationFields.length; i++) {
                if(!denominationFields[i].getText().equals("") && i <= 5) {

                    double denomination = Double.parseDouble(denominations[i].substring(1,denominations[i].length())); // get denomination type

                    try {
                        int amt = Integer.parseInt(denominationFields[i].getText());
                        if(amt < 0) {
                            JOptionPane.showMessageDialog(this, "enter a positive number!");
                        } else {
                            String answer = FinanceLogic.calculateChange(denomination, amt);
                            answerLabel.setText("");
                            answerLabel.setText(answer);
                        }
                    } catch (NumberFormatException ne) {
                        JOptionPane.showMessageDialog(this, "enter a number");
                    }
                } else if (!denominationFields[i].getText().equals("")){ //if denomination is in cents

                    double denomination = Double.parseDouble(denominations[i].substring(1,denominations[i].length()))/100; // denomination is a coin

                    try {
                        int amt = Integer.parseInt(denominationFields[i].getText());
                        if(amt < 0) {
                            JOptionPane.showMessageDialog(this, "enter a positive number!");
                        } else {
                            String answer = FinanceLogic.calculateChange(denomination, amt);
                            answerLabel.setText("");
                            answerLabel.setText(answer);
                        }
                    } catch (NumberFormatException ne) {
                        JOptionPane.showMessageDialog(this, "enter a valid number!");
                    }

                }
            }
            FinanceLogic.totalChange = 0;
    }

}