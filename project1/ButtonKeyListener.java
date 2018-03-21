/*
* Christian Trinidad
* 2-7-2018
* Comp 585
* This class contains the keylistener for when a user
* presses a key on their keyboard.
*/
import java.awt.event.KeyListener;
import java.awt.event.KeyEvent;
import java.util.Arrays;

public class ButtonKeyListener {

    public static KeyListener keyListener;

    public ButtonKeyListener() {
        createKeyListener();
    }

     private void createKeyListener() {
        keyListener = new KeyListener(){
            @Override
            public void keyTyped(KeyEvent e) {}

            @Override
            public void keyReleased(KeyEvent e) {}
                
            @Override
            public void keyPressed(KeyEvent e) {
                handleKeyPress(e);
            }
        };
    }

    // This method reacts to the user pressing buttons on their keyboard if it is a valid entry.    
    private void handleKeyPress(KeyEvent e) {

        String keyCharacter = Character.toString(e.getKeyChar());

        if(Arrays.asList(ButtonSetup.buttonsArr).contains(keyCharacter)) { // Trigger only if a valid button is pressed

            ButtonSetup.buttons[Arrays.asList(ButtonSetup.buttonsArr).indexOf(keyCharacter)].doClick(); // Click the button based on the index
           
        } else if (e.getKeyCode() == 8) { // Press "del" button
            ButtonSetup.buttons[3].doClick();

        } else if (e.getKeyCode() == 10) { // press "="" button
            ButtonSetup.buttons[18].doClick();
        }
    }
}