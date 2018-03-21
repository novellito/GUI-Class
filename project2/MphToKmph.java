/*
* Christian Trinidad
* 2-21-2018
* Comp 585
* This class contains the GUI component for the
* mph <--> kmph functionality
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

public class MphToKmph extends JInternalFrame {

    private static MphToKmph instance = null;
    private JTextField textField;
    private JButton submit, switchConversion;
    private JLabel label1, answerLabel,info, param1;
    private JPanel upperPanel, middlePanel, lowerPanel;
    private boolean mphToKmph = true;

    public static MphToKmph getInstance() {
        if(instance == null ) {
            instance = new MphToKmph();
        }
        return instance;
    }

    private MphToKmph() {
        //arge: title, resizability, closeability, maximizability inifiability
        super("mph <--> kmph Converter", false, true, false, false);
        setDisplay();
    } 

    private void setDisplay() {
        textField = new JTextField(10);
        
        submit = new JButton("Calculate");
        switchConversion = new JButton("Switch Conversion");

        label1 = new JLabel("Answer: ");
        answerLabel = new JLabel();
        param1 = new JLabel("Mph");
        info = new JLabel("Enter speed in Mph");

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
        if(!mphToKmph) {
            param1.setText("Mph");
            info.setText("Enter speed in Mph");         
        } else {
            param1.setText("Kmph");
            info.setText("Enter speed in Kmph");            
        }
        textField.setText("");
        answerLabel.setText("");
        mphToKmph = !mphToKmph;
    }

    private void setAnswer() {
        try {
            double val = Double.parseDouble(textField.getText());
            if(param1.getText().equals("Mph")) {
                String answer = SpeedLogic.doCalculation(val, "mphToKmph");
                answerLabel.setText("");   
                answerLabel.setText(answer);
            } else {
                String answer = SpeedLogic.doCalculation(val, "kmphToMph");
                answerLabel.setText("");
                answerLabel.setText(answer);
            }
        } catch (NumberFormatException ne) {
            JOptionPane.showMessageDialog(this, "enter a number");
        }
    }
}