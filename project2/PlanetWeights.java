/*
* Christian Trinidad
* 2-21-2018
* Comp 585
* This class contains the GUI component for the
* Planet Weights functionality
*/

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JInternalFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.JTextField;
import javax.swing.WindowConstants;
import javax.swing.table.DefaultTableModel;
import javax.swing.table.TableModel;

public class PlanetWeights extends JInternalFrame {

    private static PlanetWeights instance = null;
    private JTextField weight;
    private JButton submit;
    private JLabel label1, answerLabel,info, param1;
    private JPanel upperPanel, middlePanel, lowerPanel;
    private JTable table;
    private TableModel model;
    private String [][] result;

    public static PlanetWeights getInstance() {
        if(instance == null ) {
            instance = new PlanetWeights();
        }
        return instance;
    }

    private PlanetWeights() {
        //arge: title, resizability, closeability, maximizability inifiability
        super("Planet weights", false, true, false, false);
        setDisplay();
    } 

    private void setDisplay() {
        weight = new JTextField(10);
        
        submit = new JButton("submit");

        answerLabel = new JLabel();
        param1 = new JLabel("Weight");
        info = new JLabel("Enter your weight (in lbs)");

        upperPanel = new JPanel();
        middlePanel = new JPanel();
        lowerPanel = new JPanel();

        upperPanel.add(info);
        middlePanel.add(param1);
        middlePanel.add(weight);
        middlePanel.add(submit);        
        lowerPanel.add(answerLabel);
        add(upperPanel, BorderLayout.NORTH);
        add(middlePanel, BorderLayout.CENTER);
        add(lowerPanel, BorderLayout.SOUTH);
        addButtonListener();
        setBounds(25,25,380,280);
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
    }

    private void setAnswer() {
        try {
            if(table != null) {
                removeOldContent();
                double val = Double.parseDouble(weight.getText());
                if(val < 0) {
                    JOptionPane.showMessageDialog(this, "enter a positive number!");
                } else {
                    result = MiscLogic.calculatePlanetWeights(val);
                    makeTable();
                }
            } else {
                double val = Double.parseDouble(weight.getText());
                if(val < 0) {
                    JOptionPane.showMessageDialog(this, "enter a positive number!");
                } else {
                    result = MiscLogic.calculatePlanetWeights(val);
                    makeTable();
                }
            }
        } catch (NumberFormatException ne) {
            JOptionPane.showMessageDialog(this, "enter a number!");
        }
    }

    // Method to remove the previous info
    private void removeOldContent() {
        remove(middlePanel);
        validate();
        repaint();
        middlePanel = new JPanel();
        middlePanel.add(param1);
        middlePanel.add(weight);
        middlePanel.add(submit);  
        add(middlePanel, BorderLayout.CENTER);
        revalidate();
        repaint();
    }

    // Method to create a table
    private void makeTable() {
        String [] cols = new String[] {"Planets", "Weights (in lbs)", "Weights (in kgs)"};
         model = new DefaultTableModel(result,cols) {
            @Override
            public boolean isCellEditable(int row, int column) {
                return false;
            }
        };
        table = new JTable(model);
        JScrollPane scrollPane = new JScrollPane(table);
        scrollPane.setPreferredSize(new Dimension(310,155));
        middlePanel.add(scrollPane);
        revalidate();
        repaint();
    }

}