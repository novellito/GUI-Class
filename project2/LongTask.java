/*
* Christian Trinidad
* 2-21-2018
* Comp 585
* This class contains the Long task 
* functionality
*/
import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FilenameFilter;
import java.io.IOException;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JInternalFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JProgressBar;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.JTextField;
import javax.swing.SwingWorker;
import javax.swing.WindowConstants;

class LongTask extends JInternalFrame {

    private static LongTask instance = null;

    private JLabel searchWord;
    private JTextField tf, word;
    private JTextArea infoArea;
    private JButton fileBtn, readBtn, cancelBtn;
    private JFileChooser fc;
    private String fileName;   
    private Task task;
    private JProgressBar progressBar;
    private int totalNumWords, numWordsInFile;

    public static LongTask getInstance() {
        if(instance == null) {
            instance = new LongTask();
        }
        return instance;   
    }

    class Task extends SwingWorker<Void, String> {
        /*
        * Main task. Executed in background thread.
        */
        @Override
        public Void doInBackground() throws Exception { //throws Exception
            if(fileName.equals("")) {
                JOptionPane.showMessageDialog(null, "Choose a file!");
                return null;
            }
            progressBar.setIndeterminate(true);
            try {

                File dir = new File(fileName);
                totalNumWords = numWordsInFile = 0;

                walk(dir.getAbsolutePath());
                cancelBtn.setEnabled(false);
				
                publish("Total word(s) found: " + totalNumWords); // send final # of words
            }
            catch(FileNotFoundException ex) {
                JOptionPane.showMessageDialog(null, "File not found!");
            }
            catch(IOException ex) {
                JOptionPane.showMessageDialog(null, "An error occured");
            }
            return null;
        }

         public void walk( String path ) throws Exception {
             
            File root = new File( path );
            File[] list = root.listFiles();
    
            if (list == null) return;
            for ( File f : list ) {
                if ( f.isDirectory() ) {
                    walk( f.getAbsolutePath() );
                } else {
                    if(f.getName().endsWith(".txt")) {
                        String fileLine = "";
                        Pattern regex = Pattern.compile(word.getText(), Pattern.CASE_INSENSITIVE); // get the current word and ignore casing 
                        
                            FileReader data = new FileReader(f);
                            BufferedReader br = new BufferedReader(data);
                            while((fileLine = br.readLine()) != null) {
                                
                                Matcher m = regex.matcher(fileLine);
                                while (m.find()) { // check the current line and search for the word
        
                                    if (Thread.currentThread().isInterrupted()) { // Cancel button is clicked
                                        endTask();
                                    }
                                    totalNumWords++;
                                    numWordsInFile++;
                                }
                            }
                            infoArea.append(f +" has " + numWordsInFile + " matching word(s)");
                            infoArea.append("\n");
                            numWordsInFile = 0; // reset counter for the next file
                            br.close(); // close file
                    }
                }
            }
        }

		private void endTask() throws InterruptedException {
			throw new InterruptedException("Interrupted while searching files");
		}

        @Override
        protected void process(List<String> chunks) {
            // Messages received from the doInBackground() (when invoking the publish() method)
            for (final String string : chunks) {
                infoArea.append(string);
                infoArea.append("\n");
            }
        }

        /*
        * Executed in event dispatch thread
        */
        @Override
        public void done() {
            progressBar.setIndeterminate(false);
            readBtn.setEnabled(true);
        }

    }

    private LongTask() {

        super("File Info", false, true, false, false);

        word = new JTextField(5);
        tf = new JTextField(30);
        tf.setEditable(false);

        searchWord = new JLabel("Word to search: ");

        infoArea = new JTextArea(12,50);
        infoArea.setEditable(false);

        fileBtn = new JButton("...");
        readBtn = new JButton("Read");
        cancelBtn = new JButton("Cancel");
        cancelBtn.setEnabled(false);
        
        fc = new JFileChooser();
        fc.setFileSelectionMode(JFileChooser.DIRECTORIES_ONLY); // dont show the text files

        progressBar = new JProgressBar(0, 100);
        //Call setStringPainted now so that the progress bar height
        //stays the same whether or not the string is shown.
        progressBar.setStringPainted(false);      
        fileName = "";    
        
        fileBtn.setPreferredSize(new Dimension(20, 20));
        readBtn.setPreferredSize(new Dimension(80, 20));
        cancelBtn.setPreferredSize(new Dimension(80, 20));
        
        JPanel upperPanel = new JPanel();
        JPanel midPanel = new JPanel();
        JPanel lowerPanel = new JPanel();
        
        upperPanel.setLayout(new FlowLayout());
        midPanel.setLayout(new FlowLayout());
        lowerPanel.setLayout(new FlowLayout());
        
        upperPanel.add(tf);
        upperPanel.add(fileBtn);
        upperPanel.add(readBtn);
        upperPanel.add(cancelBtn);
        
        midPanel.add(searchWord);
        midPanel.add(word);
        midPanel.add(progressBar);
        
        lowerPanel.add(new JScrollPane(infoArea));
        
        add(upperPanel, BorderLayout.NORTH);
        add(midPanel, BorderLayout.CENTER);
        add(lowerPanel, BorderLayout.SOUTH); 
        addButtonListeners();
        
        pack();
        setBounds(25, 25, 700, 320);
        setLocation(50, 50);
        setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
    }

    private void addButtonListeners() {

        fileBtn.addActionListener(new ActionListener() { 
            public void actionPerformed(ActionEvent e) { 
                chooseFile();
            } 
        });   
    
        readBtn.addActionListener(new ActionListener() { 
            public void actionPerformed(ActionEvent e) {
                if(word.getText().equals("")) {
                    JOptionPane.showMessageDialog(null, "Enter a word!");
                } else {
                    readBtn.setEnabled(false);
                    cancelBtn.setEnabled(true);
                    task = new Task();
                    task.execute();
                }
            } 
        });      

        cancelBtn.addActionListener(new ActionListener() { 
            public void actionPerformed(ActionEvent e) {
                if(task != null) {
                    task.cancel(true);
                    cancelBtn.setEnabled(false);
                    JOptionPane.showMessageDialog(null, "Search was cancelled!");
                }
            } 
        }); 
    }

    private void chooseFile() { 
        fileName = "";
        int returnVal = fc.showOpenDialog(this);
        if (returnVal == JFileChooser.APPROVE_OPTION) {
            File file = fc.getSelectedFile();
            tf.setText(file.getAbsolutePath());
            fileName = file.getAbsolutePath();
        } else {
            JOptionPane.showMessageDialog(this, "Open command cancelled by user.");
        }   
    }
}
