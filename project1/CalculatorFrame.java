/*
* Christian Trinidad
* 2-7-2018
* Comp 585
* This class initializes the various components 
* of the calculator.
*/
import javax.swing.JFrame;

public class CalculatorFrame extends JFrame {

    public static PanelSetup panel;
    private MenuSetup menu;
    
    public CalculatorFrame() {

        new ButtonKeyListener();
        panel = new PanelSetup();
        new ButtonSetup();
        add(panel.mainPanel);
        menu = new MenuSetup();
        setJMenuBar(menu.menuBar);

        pack();
    }

}
