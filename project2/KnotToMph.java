/*
* Christian Trinidad
* 2-21-2018
* Comp 585
* This class contains the GUI component for the
* knot <--> mph functionality
*/

import java.awt.BorderLayout;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JInternalFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;
import javax.swing.WindowConstants;

public class KnotToMph extends JInternalFrame {

    private static KnotToMph instance = null;
    private JTextField textField;
    private JButton submit, switchConversion;
    private JLabel label1, answerLabel,info, param1;
    private JPanel upperPanel, middlePanel, lowerPanel;
    private boolean knotToMph = true;

    public static KnotToMph getInstance() {
        if(instance == null ) {
            instance = new KnotToMph();
        }
        return instance;
    }

    private KnotToMph() {
        //arge: title, resizability, closeability, maximizability inifiability
        super("Knot <--> mph", false, true, false, false);
        setDisplay();
    } 

    private void setDisplay() {
        textField = new JTextField(10);
        
        submit = new JButton("Calculate");
        switchConversion = new JButton("Switch Conversion");

        label1 = new JLabel("Answer: ");
        answerLabel = new JLabel();
        param1 = new JLabel("Knot(s)");
        info = new JLabel("Enter speed in Knot(s)");

        upperPanel = new JPanel();
        middlePanel = new JPanel();
        lowerPanel = new JPanel();

        upperPanel.add(info);
        middlePanel.add(param1);
        middlePanel.add(textField);
        middlePanel.add(switchConversion);        
        middlePanel.add(submit);        
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
        submit.addActionListener(new ActionListener(){
            @Override
            public void actionPerformed(ActionEvent e) {
                setAnswer();                
            }
        });
        switchConversion.addActionListener(new ActionListener(){
            @Override
            public void actionPerformed(ActionEvent e) {
                changeConversion();                
            }
        });
    }

    // Method to let user switch between conversion types    
    private void changeConversion() {
        if(!knotToMph) {
            param1.setText("Knot(s)");
            info.setText("Enter speed in Knot(s)");         
        } else {
            param1.setText("Mph");
            info.setText("Enter speed in Mph");            
        }
        textField.setText("");
        answerLabel.setText("");
        knotToMph = !knotToMph;
    }

    private void setAnswer() {
        try {
            double val = Double.parseDouble(textField.getText());
            if(param1.getText().equals("Knot(s)")) {
                String answer = SpeedLogic.doCalculation(val, "knotToMph");
                answerLabel.setText("");   
                answerLabel.setText(answer);
            } else {
                String answer = SpeedLogic.doCalculation(val, "mphToKnot");
                answerLabel.setText("");
                answerLabel.setText(answer);
            }
        } catch (NumberFormatException ne) {
            JOptionPane.showMessageDialog(this, "enter a number");
        }
    }

}