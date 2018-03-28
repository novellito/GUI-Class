package hangman;


import javafx.beans.Observable;
import javafx.beans.binding.ObjectBinding;
import javafx.beans.property.ObjectProperty;
import javafx.beans.property.ReadOnlyObjectProperty;
import javafx.beans.property.ReadOnlyObjectWrapper;
import javafx.beans.value.ChangeListener;
import javafx.beans.value.ObservableValue;

import java.util.ArrayList;
import java.util.List;
import java.io.RandomAccessFile;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

public class Game {

	public String answer;
	public  String tmpAnswer;
	public  String[] letterAndPosArray;
	public  String[] mysteryWordArr;
	private String[] words;
	private RandomAccessFile dictionary_scanner;
	private File dictionary_file;
	public int moves;
	private int index;
	private boolean containsDash = true;
	private ReadOnlyObjectWrapper<GameStatus> gameStatus;
	private ObjectProperty<Boolean> gameState = new ReadOnlyObjectWrapper<Boolean>();

	public enum GameStatus {
		GAME_OVER {
			@Override
			public String toString() {
				return "Game over!";
			}
		},
		BAD_GUESS {
			@Override
			public String toString() { return "Bad guess..."; }
		},
		GOOD_GUESS {
			@Override
			public String toString() {
				return "Good guess!";
			}
		},
		WON {
			@Override
			public String toString() {
				return "You won!";
			}
		},
		OPEN {
			@Override
			public String toString() {
				return "Game on, let's go!";
			}
		},
		DUPLICATE {
			@Override
			public String toString() {
				return "Duplicate Entry!";
			}
		}
	}

	public Game() {
		gameStatus = new ReadOnlyObjectWrapper<GameStatus>(this, "gameStatus", GameStatus.OPEN);
		gameStatus.addListener(new ChangeListener<GameStatus>() {
			@Override
			public void changed(ObservableValue<? extends GameStatus> observable,
								GameStatus oldValue, GameStatus newValue) {
				if (gameStatus.get() != GameStatus.OPEN) {
					log("in Game: in changed");

				}
			}

		});
		setRandomWord();
		prepTmpAnswer();
		prepLetterAndPosArray();
		moves = 0;

		gameState.setValue(false); // initial state
		createGameStatusBinding();
	}

	private void createGameStatusBinding() {
		List<Observable> allObservableThings = new ArrayList<>();
		ObjectBinding<GameStatus> gameStatusBinding = new ObjectBinding<GameStatus>() {
			{
				super.bind(gameState);
			}
			@Override
			public GameStatus computeValue() {
				log("in computeValue");
				GameStatus check = checkForWinner(index);
				if(check != null ) {
					return check;
				}

				/***** A.K. - update moves *****/
				if(tmpAnswer.trim().length() == 0 && index != -1){
					log("new game");
					return GameStatus.OPEN;
				}
				//GN - show new game on screen when resetting

				else {
					if(index == -2) { // CT
						return GameStatus.DUPLICATE;
					}

					if (index == -1){
						moves++;

						if(moves ==numOfTries()) {
							return GameStatus.GAME_OVER;
						}



						log("Moves: " + moves);
						log("bad guess");
						return GameStatus.BAD_GUESS;
					}

					else {
						log("good guess");
						return GameStatus.GOOD_GUESS;
					}
				}
			}
		};
		gameStatus.bind(gameStatusBinding);
	}

	public ReadOnlyObjectProperty<GameStatus> gameStatusProperty() {
		return gameStatus.getReadOnlyProperty();
	}
	public GameStatus getGameStatus() {
		return gameStatus.get();
	}

	//GN -Pulling a random word from dictionary text file
	private void setRandomWord() {
		try {
			dictionary_file = new File("src/dictionary/dictionary_full.txt");
			dictionary_scanner = new RandomAccessFile(dictionary_file, "r");
			final long randomLocation = (long) (Math.random() * dictionary_scanner.length()-1);
			dictionary_scanner.seek(randomLocation);
			dictionary_scanner.readLine();
			// Remove the dashes from the word
			while(containsDash) {
				answer = dictionary_scanner.readLine().toLowerCase();
				if(answer.contains("-")){
					containsDash = true;
				}
				else
					containsDash = false;
			}
			System.out.println(answer);
		}catch(FileNotFoundException fnf){
			System.out.println("The file you specified was not found");
		}catch(IOException ioe){
			System.out.println("IO exception, maybe something entered was wrong?");
		}
	}

	private void prepTmpAnswer() {
		StringBuilder sb = new StringBuilder();
		for(int i = 0; i < answer.length(); i++) {
			sb.append(" ");
		}
		tmpAnswer = sb.toString();
	}

	private void prepLetterAndPosArray() {
		letterAndPosArray = new String[answer.length()];
		mysteryWordArr = new String[answer.length()];
		for(int i = 0; i < answer.length(); i++) {
			letterAndPosArray[i] = answer.substring(i,i+1);
			mysteryWordArr[i] = answer.substring(i,i+1);

		}
	}

	private int getValidIndex(String input) {
		int index = -1;
		if(input.equals("DUP")) { // CT duplicate entry
			index = -2;
		}
		for(int i = 0; i < letterAndPosArray.length; i++) {
			if(letterAndPosArray[i].equals(input)) {
				index = i;
				letterAndPosArray[i] = "";
			}
		}
		return index;
	}

	private int update(String input) {
		int index = getValidIndex(input);
		if(index != -1 && index != -2) {
			StringBuilder sb = new StringBuilder(tmpAnswer);
			sb.setCharAt(index, input.charAt(0));
			tmpAnswer = sb.toString();
			System.out.println("tmp " + tmpAnswer);
		}
		return index;
	}

	public void makeMove(String letter) {
		log("\nin makeMove: " + letter);
		index = update(letter);
		// this will toggle the state of the game
		gameState.setValue(!gameState.getValue());
	}

	//GN - Resetting the game
	public void reset() {
		containsDash = true;
		moves = 0;
		index = 0;
		setRandomWord();
		prepTmpAnswer();
		prepLetterAndPosArray();
		gameState.setValue(false); // initial state
		createGameStatusBinding();
		//gameState.setValue(!gameState.getValue());
	}

	private int numOfTries() {
		return 6;
	}

	public static void log(String s) {
		System.out.println(s);
	}

	private GameStatus checkForWinner(int status) {
		log("in checkForWinner");

		if(tmpAnswer.equals(answer)) {
			log("won");
			return GameStatus.WON;
		}
		else if(moves == numOfTries()) {
			log("game over");
			return GameStatus.GAME_OVER;
		}
		else {
			return null;
		}
	}
}
