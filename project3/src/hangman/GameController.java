package hangman;

import java.io.IOException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ThreadFactory;

import javafx.application.Platform;
import javafx.beans.binding.Bindings;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;
import javafx.scene.layout.HBox;
import javafx.scene.layout.Pane;//RG



import javafx.scene.shape.Circle;
import javafx.scene.shape.Line;
import javafx.scene.paint.Color;//RG
import javafx.scene.text.Text;

public class GameController {

	private final ExecutorService executorService;
	private final Game game;
	private Text [] text;
	private Text triesleft;
	public static String mysteryWord="";

	public GameController(Game game) {
		this.game = game;
		executorService = Executors.newSingleThreadExecutor(new ThreadFactory() {
			@Override
			public Thread newThread(Runnable r) {
				Thread thread = new Thread(r);
				thread.setDaemon(true);
				return thread;
			}
		});
	}

	@FXML
	private Pane board ;
	@FXML
	private Label statusLabel ;
	@FXML
	private Label enterALetterLabel ;
	@FXML
	private TextField textField ;
	@FXML
	private HBox letterStatus ;
	@FXML
	private HBox alphabet ;
	@FXML
	private HBox numTries ;
	private String dynamicString;
	private final String ALPHABET = "abcdefghijklmnopqrstuvwxyz";

    public void initialize() throws IOException {
		System.out.println("in initialize");
		drawHangman(game.moves);
		setMysteryWordLetters(); // CT
		addTextBoxListener();
		setUpStatusLabelBindings();
		setAlphabet(); // A.K.
		updateTries(6); // CT
	}

	private void addTextBoxListener() {
		textField.textProperty().addListener(new ChangeListener<String>() {
			@Override
			public void changed(final ObservableValue<? extends String> ov, final String oldValue, final String newValue) {

				if(newValue.length() > 0) {
					textField.setText(newValue); //found text bug - CT
				}

				if(newValue.length() > 1) {
					Platform.runLater(() -> {
						textField.clear(); //clear field if user enters more than 1 letter (CT)
					});

				}
			}
		});
	}

	// CT - Method to update number of tries left for the player
	private void updateTries(int tries) {
		numTries.getChildren().clear();
		triesleft = new Text("Tries Left : " + Integer.toString(tries));
		numTries.getChildren().add(triesleft);

	}

	// CT - Method to update the mystery word shown to the player if their guess is correct.
	public void updateMysteryWord(String guess) {
		letterStatus.getChildren().clear();
		StringBuilder sb = new StringBuilder(mysteryWord);

		for(int i = 0; i < game.mysteryWordArr.length; i++) {
			if(game.mysteryWordArr[i].equals(guess)) {
				sb.setCharAt(i,guess.charAt(0));
				game.letterAndPosArray[i] = game.mysteryWordArr[i];
			}
		}

		Text changedString = new Text(sb.toString().replace("", "  ").trim()); // update the mystery word & add space in between
		mysteryWord = sb.toString();
		game.tmpAnswer = mysteryWord;
		System.out.println("game. tmp "+game.tmpAnswer);
		letterStatus.getChildren().add(changedString);
	}

	// CT - Sets the initial "_" characters based on how many letters there are in the word
	private void setMysteryWordLetters() {

		text = new Text[game.letterAndPosArray.length];
		//GN - Reset the mystery word and letter status before appending
		mysteryWord = "";
		letterStatus.getChildren().clear();

		for(int i = 0; i < game.letterAndPosArray.length; i ++) {
			text[i] = new Text(" _ ");
			mysteryWord += "_";
			letterStatus.getChildren().add(text[i]);
		}
	}

	/***** A.K. - set the Alphabet on the alphabet HBox *****/
	private void setAlphabet() {


		dynamicString = ALPHABET;
		alphabet.getChildren().clear();

		for(int i = 0; i<ALPHABET.length(); i++) {
			Text ascii = new Text(ALPHABET.charAt(i) + " ");
			alphabet.getChildren().add(ascii);
		}
	}

	/***** A.K. - set and remove entered char *****/
	private void changeAlphabet(String guess) {

		alphabet.getChildren().clear();
		char remove;

		for(int i = 0; i<dynamicString.length(); i++) {
			remove = dynamicString.charAt(i);
			if(String.valueOf(remove).equals(guess)) {
				dynamicString = removeCharAtIndex(dynamicString, dynamicString.indexOf(guess));
			}
		}

		String spacedString = dynamicString.replace("", " ").trim();
		Text changedString = new Text(spacedString);
		alphabet.getChildren().add(changedString);
	}

	/***** A.K. - remove a char at a specific index *****/
	private String removeCharAtIndex(String s, int position) {
		return s.substring(0, position) + s.substring(position + 1);
	}

	/***** A.K. - disable text_field if player has won or lost *****/
	private void checkGameStatus() {
		if(game.getGameStatus().toString().equals("Game over!") || game.getGameStatus().toString().equals("You won!")) {
			System.out.println("Game Over");
			enterALetterLabel.textProperty().bind(Bindings.format("%s %s", "The word was -", game.answer)); // CT - display correct word when game over
			textField.setVisible(false);

		}
	}

	// CT - Method to check if player entered the same letter more than once.
	private boolean checkDuplicateEntry(String guess) {

		for(int i = 0; i < dynamicString.length(); i ++) {
			if(dynamicString.toLowerCase().contains(guess)) {
				return false;
			} else {
				game.makeMove("DUP");
				break;
			}
		}
		return true;
	}

	private void setUpStatusLabelBindings() {

		System.out.println("in setUpStatusLabelBindings");
		statusLabel.textProperty().bind(Bindings.format("%s", game.gameStatusProperty()));
		enterALetterLabel.textProperty().bind(Bindings.format("%s", "Enter a letter:"));

	}


	public  void drawHangman(int moves) { //RG

		switch(moves) {

			case 0:
				break;

			case 1:
				Circle c = new Circle();
				c.relocate(500, 100);
				c.setRadius(25);
				board.getChildren().add(c);
				updateTries(5);
				break;

			case 2:
				Line line = new Line();
				line.setStartX(0.0f);
				line.setStartY(0.0f);
				line.setEndX(0.0f);
				line.setEndY(100.0f);
				line.setStrokeWidth(5);
				line.setStroke(Color.BLUE);
				line.relocate(499, 110);
				board.getChildren().add(line);
				updateTries(4);
				break;

			case 3:
				Line line2 = new Line();
				line2.setStartX(0.0f);
				line2.setStartY(0.0f);
				line2.setEndX(40.0f);
				line2.setEndY(0.0f);
				line2.setStrokeWidth(5);
				line2.setStroke(Color.RED);
				line2.relocate(500, 135);
				board.getChildren().add(line2);
				updateTries(3);
				break;

			case 4:
				Line line3 = new Line();
				line3.setStartX(-40.0f);
				line3.setStartY(0.0f);
				line3.setEndX(0.0f);
				line3.setEndY(0.0f);
				line3.setStrokeWidth(5);
				line3.setStroke(Color.GREEN);
				line3.relocate(460, 135);
				board.getChildren().add(line3);
				updateTries(2);
				break;

			case 5:
				Line line4 = new Line();
				line4.setStartX(0.0f);
				line4.setStartY(0.0f);
				line4.setEndX(20.0f);
				line4.setEndY(20.0f);
				line4.setStrokeWidth(5);
				line4.setStroke(Color.PINK);
				line4.relocate(500, 210);
				board.getChildren().add(line4);
				updateTries(1);
				break;

			case 6:
				Line line5 = new Line();
				line5.setStartX(-20.0f);
				line5.setStartY(20.0f);
				line5.setEndX(0.0f);
				line5.setEndY(0.0f);
				line5.setStrokeWidth(5);
				line5.setStroke(Color.ORANGE);
				line5.relocate(475, 210);
				board.getChildren().add(line5);
				updateTries(0);
				break;
			// GN - Reset the hangman drawing
			case 7:
				board.getChildren().clear();
				updateTries(6);
				break;


		}
	}


	@FXML
	// GN - Resetting game controller when player clicks hangman in Action Bar
	private void newHangman() {
		game.reset();
		dynamicString = ALPHABET;
		setMysteryWordLetters();
		drawHangman(7);
		setUpStatusLabelBindings();
		setAlphabet();
		textField.setVisible(true);
	}

	@FXML
	private void quit() {
		board.getScene().getWindow().hide();
	}

	@FXML
	public void onEnter(ActionEvent ae){ // CT - created initial onEnter listener

		if(!checkDuplicateEntry(textField.getText())) {
			updateMysteryWord(textField.getText()); //CT
			game.makeMove(textField.getText());
			drawHangman(game.moves);

			changeAlphabet(textField.getText()); // A.K. - remove the char after its been entered
			checkGameStatus(); // A.K. - disable text box if win or lose
		}

		textField.clear();

	}

}