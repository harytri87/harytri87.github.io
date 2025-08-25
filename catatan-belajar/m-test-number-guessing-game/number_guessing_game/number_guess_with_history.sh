#!/bin/bash

# Number Guessing Game

PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

GREETINGS() {
	echo -e "\n~~~~ Number Guessing Game ~~~~\n"

	echo "Enter your username:"
	read USERNAME

	USER_ID=$($PSQL "SELECT user_id FROM users WHERE username = '$USERNAME';")

	if [[ -z $USER_ID ]]
	then
		# if not registered
		echo "Welcome, $USERNAME! It looks like this is your first time here."

		# register user
		INSERT_USER_RESULT=$($PSQL "INSERT INTO users (username) VALUES ('$USERNAME');")

		# if register failed
		if [[ $INSERT_USER_RESULT != 'INSERT 0 1' ]]
		then
			echo "Failed to register: $INSERT_USER_RESULT"
			return
		fi
		
		# if success, get user_id
		USER_ID=$($PSQL "SELECT user_id FROM users WHERE username = '$USERNAME';")
	else
		GET_HISTORY $USER_ID $USERNAME
	fi

	# initiate game, send user_id
	GAME_INITIATE $USER_ID
}

GAME_INITIATE() {
	RANDOM_NUMBER=$(( RANDOM % 1000 + 1 ))

	# create new game
	INSERT_GAME_RESULT=$($PSQL "INSERT INTO games (user_id, secret_number)
		VALUES ($1, $RANDOM_NUMBER);")

	# if failed
	if [[ $INSERT_GAME_RESULT != 'INSERT 0 1' ]]
	then
		echo "Failed to create game: $INSERT_GAME_RESULT"
		return
	fi

	# get latest game_id
	GAME_ID=$($PSQL "SELECT MAX (game_id) FROM games;")

	# start guessing
	echo "Guess the secret number between 1 and 1000:"
	GAME_GUESSING $GAME_ID $RANDOM_NUMBER
}

GAME_GUESSING() {
	read GUESS_NUMBER

	# validation
	if [[ ! $GUESS_NUMBER =~ ^[0-9]+$ ]]
	then
		echo "That is not an integer, guess again:"
		GAME_GUESSING $1 $2
		return
	fi

	if [[ $GUESS_NUMBER -lt 1 || $GUESS_NUMBER -gt 1000 ]]
	then
		echo "Input number between 1 and 1000, guess again:"
		GAME_GUESSING $1 $2
		return
	fi

	# game start
	if [[ $GUESS_NUMBER -gt $2 ]]
	then
		# if too high
		INSERT_DETAILS $1 $GUESS_NUMBER "too high"

		echo "It's lower than that, guess again:"
		GAME_GUESSING $1 $2
		return
	elif [[ $GUESS_NUMBER -lt $2 ]]
	then
		# if too low
		INSERT_DETAILS $1 $GUESS_NUMBER "too low"

		echo "It's higher than that, guess again:"
		GAME_GUESSING $1 $2
		return
	else
		# if correct
		INSERT_DETAILS $1 $GUESS_NUMBER "correct"
		
		GUESS_COUNT=$($PSQL "SELECT COUNT (*) FROM game_details WHERE game_id = $1;")
		echo "You guessed it in $GUESS_COUNT tries. The secret number was $2. Nice job!"
	fi
}

INSERT_DETAILS() {
	# insert for game history/details
	INSERT_DETAILS_RESULT=$($PSQL "INSERT INTO game_details (game_id, guess_number, guess_result)
		VALUES ($1, $2, '$3');")

	# if insert failed
	if [[ $INSERT_DETAILS_RESULT != 'INSERT 0 1' ]]
	then
		echo "Failed to insert game details: $INSERT_DETAILS_RESULT"
		return
	fi
}

GET_HISTORY() {

	# check games
	CHECK_GAMES=$($PSQL "SELECT * FROM games WHERE user_id=$1;")

	if [[ -z $CHECK_GAMES ]]
	then
		USERNAME=$2
		GAMES_PLAYED=0
		BEST_GAME=0
	else
		# get history
		HISTORY=$($PSQL "WITH guess_counts AS (
			SELECT
				g.game_id,
				COUNT(d.game_detail_id) AS total_guesses
			FROM games AS g
			JOIN game_details AS d USING (game_id)
			WHERE g.user_id = $1
			GROUP BY g.game_id
		)
		SELECT
			u.username,
			COUNT(g.game_id) AS games_played,
			MIN(gc.total_guesses) AS best_game
		FROM users AS u
		JOIN games AS g ON u.user_id = g.user_id
		JOIN guess_counts AS gc USING (game_id)
		WHERE u.user_id = $1
		GROUP BY u.username;")

		IFS="|" read USERNAME GAMES_PLAYED BEST_GAME <<< $HISTORY
	fi

	echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."

}

GREETINGS
