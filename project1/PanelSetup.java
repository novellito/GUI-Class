/*
* Christian Trinidad
* 2-7-2018
* Comp 585
* This class initializes the various components 
* of the panel.
*/
import java.awt.BorderLayout;
import java.awt.GridLayout;

import java.awt.event.KeyListener;

import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

public class PanelSetup {

    public  JTextField textField;
    public  JLabel  label;
    public  JPanel  buttonPanel;
    public  JPanel  mainPanel;
    private JPanel  resultPanel;
    
    public PanelSetup() {
        addTextField();
        addPanels();
    }

    private void addTextField() {
        textField = new JTextField(10);
        textField.addKeyListener(ButtonKeyListener.keyListener);
        textField.setEditable(false);
    }

    private void addPanels() {
        buttonPanel = new JPanel();
        buttonPanel.setLayout(new GridLayout(5,4));

        resultPanel = new JPanel();
        resultPanel.setLayout(new BorderLayout());

        mainPanel = new JPanel();
        mainPanel.setLayout(new BorderLayout());

        label = new JLabel("Result");
        resultPanel.add(label);

        mainPanel.add(textField);
        mainPanel.add(resultPanel, BorderLayout.NORTH);
        mainPanel.add(buttonPanel, BorderLayout.SOUTH);

    }


}