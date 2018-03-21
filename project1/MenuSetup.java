/*
* Christian Trinidad
* 2-4-2018
* Comp 585
* This class initializes the various components 
* of the menu.
*/
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;

public class MenuSetup {

    public JMenuBar menuBar;
    private JMenu appMenu;
    private JMenu helpMenu;
    private JMenuItem exitMenuItem;
    private JMenuItem aboutMenuItem;

    public MenuSetup() {

        menuBar = new JMenuBar();
        // menu
        appMenu = new JMenu("App");
        helpMenu = new JMenu("Help");
        // menu items
        exitMenuItem = new JMenuItem("Exit");
        aboutMenuItem = new JMenuItem("About");
        // add menu items to menu
        appMenu.add(exitMenuItem);
        helpMenu.add(aboutMenuItem);
        // add menus to bar
        menuBar.add(appMenu);
        menuBar.add(helpMenu);
        
        addListeners();
    }
    
    private void addListeners() {
        exitMenuItem.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                System.exit(0);
            }
        });
        
        aboutMenuItem.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent actionEvent) {
                JOptionPane.showMessageDialog(null,"Thank you for using the magical calculator!");
            }
        });
    }
}