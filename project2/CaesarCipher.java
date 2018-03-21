/*
* Christian Trinidad
* 2-21-2018
* Comp 585
* This class contains the GUI component for the
* Caesar Cipher functionality
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

public class CaesarCipher extends JInternalFrame {

    private static CaesarCipher instance = null;
    private JTextField message, key;
    private JButton submit, switchConversion;
    private JLabel label1, answerLabel,info, param1, param2;
    private JPanel upperPanel, middlePanel, lowerPanel;
    private boolean caesarCipher = true;

    public static CaesarCipher getInstance() {
        if(instance == null ) {
            instance = new CaesarCipher();
        }
        return instance;
    }

    private CaesarCipher() {
        //arge: title, resizability, closeability, maximizability inifiability
        super("Caesar Cipher", false, true, false, false);
        setDisplay();
    } 

    private void setDisplay() {
        message = new JTextField(10);
        key = new JTextField(2);

        submit = new JButton("Encrypt");
        switchConversion = new JButton("Switch");

        label1 = new JLabel("Encrypted Message: ");
        answerLabel = new JLabel();
        param1 = new JLabel("Original Message");
        param2 = new JLabel("key");
        info = new JLabel("Enter your message and key");

        upperPanel = new JPanel();
        middlePanel = new JPanel();
        lowerPanel = new JPanel();

        upperPanel.add(info);
        middlePanel.add(param1);
        middlePanel.add(message);
        middlePanel.add(param2);
        middlePanel.add(key);
        middlePanel.add(switchConversion);        
        middlePanel.add(submit);        
        lowerPanel.add(label1);
        lowerPanel.add(answerLabel);
        add(upperPanel, BorderLayout.NORTH);
        add(middlePanel, BorderLayout.CENTER);
        add(lowerPanel, BorderLayout.SOUTH);
        addButtonListener();
        setBounds(25,25,380,150);
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

    // method to let user switch between encryption/decryption
    private void changeConversion() {
        if(caesarCipher) {
            param1.setText("Encrypted Message");
            info.setText("Enter your encrypted message and key");         
            label1.setText("Decrypted Message");
            submit.setText("Decrypt");
        } else {
            param1.setText("Original Message");
            info.setText("Enter your message and key");            
            label1.setText("Encrypted Message");
            submit.setText("Encrypt");
        }
        message.setText("");
        answerLabel.setText("");
        key.setText("");
        caesarCipher = !caesarCipher;
    }

    private void setAnswer() {
    
        try {
            if(param1.getText().equals("Original Message")) {
                int k = Integer.parseInt(key.getText());
                String answer = MiscLogic.encrypt(message.getText(),k);
                answerLabel.setText(""); 
                answerLabel.setText(answer);
            } else {
                int k = Integer.parseInt(key.getText());
                String answer = MiscLogic.decrypt(message.getText(),k);
                answerLabel.setText("");
                answerLabel.setText(answer);
            }
        } catch (NumberFormatException ne) {
            JOptionPane.showMessageDialog(this, "enter a number for the key!");
        }
    
    }

}