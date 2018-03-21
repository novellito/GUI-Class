/*
* Christian Trinidad
* 2-21-2018
* Comp 585
* This class builds the various components
* of the application
*/

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Image;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;

import javax.swing.BorderFactory;
import javax.swing.ImageIcon;
import javax.swing.JDesktopPane;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JSplitPane;
import javax.swing.JTree;
import javax.swing.tree.DefaultMutableTreeNode;
import javax.swing.tree.DefaultTreeModel;


public class GUIApp extends JFrame {

    private JTree tree;
    private JDesktopPane desktop;
    private JLabel statusLabel;
    private JPanel panel;
    private JScrollPane scrollPane;
    private JSplitPane splitPane;
    private JPanel labelPanel;
    DefaultMutableTreeNode root = new DefaultMutableTreeNode("tools");

    //menu stuff
    private JMenuBar menuBar;
    private JMenu app;
    private JMenu help;
    private JMenuItem exit;
    private JMenuItem about;

    public GUIApp() {
        initComponents();
    }

    private void initComponents() {
        buildDesktop();
        buildFinanceTree();
        buildWeightsTree();
        buildTemperatureTree();
        buildSpeedTree();
        buildMiscTree();

        DefaultTreeModel treeModel = new DefaultTreeModel(root);
        tree = new JTree(treeModel);
        buildMenu();
        addTreeListeners();
        addMenuListeners();
        buildPanel();
        buildFrame();
    }

    private void buildWeightsTree() {
        DefaultMutableTreeNode weights = new DefaultMutableTreeNode("Weight Conversions");
        DefaultMutableTreeNode kgToLbs = new DefaultMutableTreeNode("kg <--> lbs");
        DefaultMutableTreeNode tonToLbs = new DefaultMutableTreeNode("ton <--> lbs");
        DefaultMutableTreeNode gramToOz = new DefaultMutableTreeNode("g <--> oz");

        root.add(weights);
        weights.add(kgToLbs);
        weights.add(tonToLbs);
        weights.add(gramToOz);
    }

    private void buildFinanceTree() {
        DefaultMutableTreeNode finance = new DefaultMutableTreeNode("Finance");
        DefaultMutableTreeNode tip = new DefaultMutableTreeNode("Tip Calculator");
        DefaultMutableTreeNode tax = new DefaultMutableTreeNode("Sales Tax");
        DefaultMutableTreeNode money = new DefaultMutableTreeNode("Change Calculator");

        root.add(finance);
        finance.add(tip);
        finance.add(tax);
        finance.add(money);
    }

    private void buildTemperatureTree() {
        DefaultMutableTreeNode temperature = new DefaultMutableTreeNode("Temperature");
        DefaultMutableTreeNode cToF = new DefaultMutableTreeNode("Celsius <--> Fahrenheit");
        DefaultMutableTreeNode ftoK = new DefaultMutableTreeNode("Fahrenheit <--> Kelvin");
        DefaultMutableTreeNode cToK = new DefaultMutableTreeNode("Kelvin <--> Celsius");

        root.add(temperature);
        temperature.add(cToF);
        temperature.add(ftoK);
        temperature.add(cToK);
    }

    private void buildSpeedTree() {
        DefaultMutableTreeNode speed = new DefaultMutableTreeNode("Speed");
        DefaultMutableTreeNode mphToKmph = new DefaultMutableTreeNode("mph <--> kmph");
        DefaultMutableTreeNode machToFps = new DefaultMutableTreeNode("mach <--> feet/sec");
        DefaultMutableTreeNode knotToMph = new DefaultMutableTreeNode("knot <--> mph");

        root.add(speed);
        speed.add(mphToKmph);
        speed.add(machToFps);
        speed.add(knotToMph);
    }

    private void buildMiscTree() {
        DefaultMutableTreeNode misc = new DefaultMutableTreeNode("Misc");
        DefaultMutableTreeNode planetWeights = new DefaultMutableTreeNode("Planet Weights");
        DefaultMutableTreeNode caesarCipher = new DefaultMutableTreeNode("Caesar Cipher");
        DefaultMutableTreeNode longTask = new DefaultMutableTreeNode("Long Task");

        root.add(misc);
        misc.add(planetWeights);
        misc.add(caesarCipher);
        misc.add(longTask);
    }

    private void addTreeListeners() {
        tree.addMouseListener(new MouseAdapter() {
            @Override
            public void mousePressed(MouseEvent mouseEvent) {
                int selRow = tree.getRowForLocation(mouseEvent.getX(), mouseEvent.getY());
                if(selRow != -1) {
                    treeClicked();
                }
            }
        });
    }

    // Method that determines which item was clicked and opens appropriate component
    private void treeClicked() {
        DefaultMutableTreeNode node = (DefaultMutableTreeNode) tree.getLastSelectedPathComponent();
        if (node != null && node.isLeaf()) {
            statusLabel.setText(node.toString() + " clicked!");
            switch(node.toString()) {
                case "Tip Calculator": 
                    TipCalculator tipCalc = TipCalculator.getInstance();
                    if(!tipCalc.isVisible()) {
                        tipCalc.setVisible(true);
                        desktop.add(tipCalc);
                    }
                    break;
                case "Sales Tax": 
                    SalesTax salesTax = SalesTax.getInstance();
                    if(!salesTax.isVisible()) {
                        salesTax.setVisible(true);
                        desktop.add(salesTax);
                    }
                    break;
                case "Change Calculator": 
                    MoneyTool mt = MoneyTool.getInstance();
                    if(!mt.isVisible()) {
                        mt.setVisible(true);
                        desktop.add(mt);
                    }
                    break;
                case "g <--> oz": 
                    GramToOz g = GramToOz.getInstance();
                    if(!g.isVisible()) {
                        g.setVisible(true);
                        desktop.add(g);
                    }
                    break;
                case "kg <--> lbs": 
                    KgToLbs k = KgToLbs.getInstance();
                    if(!k.isVisible()) {
                        k.setVisible(true);
                        desktop.add(k);
                    }
                    break;
                case "ton <--> lbs": 
                    TonToLbs t = TonToLbs.getInstance();
                    if(!t.isVisible()) {
                        t.setVisible(true);
                        desktop.add(t);
                    }
                    break;
                case "Celsius <--> Fahrenheit": 
                    CelsiusToFahrenheit c = CelsiusToFahrenheit.getInstance();
                    if(!c.isVisible()) {
                        c.setVisible(true);
                        desktop.add(c);
                    }
                    break;
                case "Fahrenheit <--> Kelvin": 
                    FahrenheitToKelvin f = FahrenheitToKelvin.getInstance();
                    if(!f.isVisible()) {
                        f.setVisible(true);
                        desktop.add(f);
                    }
                    break;
                case "Kelvin <--> Celsius": 
                    KelvinToCelsius ktc = KelvinToCelsius.getInstance();
                    if(!ktc.isVisible()) {
                        ktc.setVisible(true);
                        desktop.add(ktc);
                    }
                    break;
                case "mph <--> kmph": 
                    MphToKmph mtk = MphToKmph.getInstance();
                    if(!mtk.isVisible()) {
                        mtk.setVisible(true);
                        desktop.add(mtk);
                    }
                    break;
                case "mach <--> feet/sec": 
                    MachToFps mtf = MachToFps.getInstance();
                    if(!mtf.isVisible()) {
                        mtf.setVisible(true);
                        desktop.add(mtf);
                    }
                    break;
                case "knot <--> mph": 
                    KnotToMph ktm = KnotToMph.getInstance();
                    if(!ktm.isVisible()) {
                        ktm.setVisible(true);
                        desktop.add(ktm);
                    }
                    break;
                case "Caesar Cipher": 
                    CaesarCipher caesar = CaesarCipher.getInstance();
                    if(!caesar.isVisible()) {
                        caesar.setVisible(true);
                        desktop.add(caesar);
                    }
                    break;
                case "Planet Weights": 
                    PlanetWeights planet = PlanetWeights.getInstance();
                    if(!planet.isVisible()) {
                        planet.setVisible(true);
                        desktop.add(planet);
                    }
                    break;
                case "Long Task": 
                    LongTask lt = LongTask.getInstance();
                    if(!lt.isVisible()) {
                        lt.setVisible(true);
                        desktop.add(lt);
                    }
                    break;
            }
        }
    }

    private void addMenuListeners() {
        exit.addActionListener(new ActionListener(){
            @Override
            public void actionPerformed(ActionEvent e) {
                exitActionPerformed();
            }
        });

        about.addActionListener(new ActionListener(){
            @Override
            public void actionPerformed(ActionEvent e) {
                aboutActionPerformed();
            }
        });
    }

    private void buildFrame() {
        setLayout(new BorderLayout());
        getContentPane().add(labelPanel, BorderLayout.SOUTH);
        getContentPane().add(panel, BorderLayout.CENTER);
        setIconImage(Toolkit.getDefaultToolkit().getImage("csun.gif"));
        setTitle("My Tools App");
        setJMenuBar(menuBar);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(1000,600);
        setVisible(true);
    }

    private void buildMenu() {
        menuBar = new JMenuBar();
        app = new JMenu("App");
        help = new JMenu("Help");
        exit = new JMenuItem("Exit");
        about = new JMenuItem("About");
        app.add(exit);
        help.add(about);
        menuBar.add(app);
        menuBar.add(help);
    }

    private void buildPanel() {
        panel = new JPanel();
        splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT);
        scrollPane = new JScrollPane();
        scrollPane.getViewport().add(tree);

        //label panel and label
        labelPanel = new JPanel();
        statusLabel = new JLabel();
        statusLabel.setBorder(BorderFactory.createLoweredBevelBorder());
        statusLabel.setMinimumSize(new Dimension(0,18));
        statusLabel.setPreferredSize(new Dimension(0,18));
        
        splitPane.setOneTouchExpandable(true);
        splitPane.setDividerLocation(200);
        splitPane.setContinuousLayout(true);
        splitPane.add(scrollPane,JSplitPane.LEFT);
        splitPane.add(desktop, JSplitPane.RIGHT);

        panel.setLayout(new BorderLayout());
        panel.add(splitPane, BorderLayout.CENTER);

        labelPanel.setLayout(new BorderLayout());
        labelPanel.add(statusLabel, BorderLayout.CENTER);
    }

    private void buildDesktop() {
        desktop = new JDesktopPane() {
        @Override
        protected void paintComponent(Graphics g) {
            ImageIcon imageIcon = new ImageIcon("csun_logo.png");
            Image image = imageIcon.getImage();

            int x=0;
            int y=0;

            double imageWidth = image.getWidth(null);
            double imageHeight = image.getHeight(null);
            double screenWidth = getWidth();
            double screenHeight = getHeight();

            if(screenWidth !=0 || screenHeight!=0) {
                x = (int) screenWidth/2- (int)imageWidth/2;
                y = (int) screenHeight/2- (int)imageHeight/2;
            }
            g.drawImage(image,x,y,this);
        }
    };
    }

    private void exitActionPerformed() {
        dispose();
    }

    private void aboutActionPerformed() {
        JOptionPane.showMessageDialog(this, "Hello there :D");
    }
}