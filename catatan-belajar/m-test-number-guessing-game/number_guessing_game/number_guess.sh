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

	# start guessing
	echo "Guess the secret number between 1 and 1000:"
	GAME_GUESSING $USER_ID $RANDOM_NUMBER
}

GAME_GUESSING() {
	read GUESS_NUMBER

	local ATTEMPT
	
	if [[ -z $3 ]]
	then
		ATTEMPT=0
	else
		ATTEMPT=$3
	fi

	# validation
	if [[ ! $GUESS_NUMBER =~ ^[0-9]+$ ]]
	then
		echo "That is not an integer, guess again:"
		GAME_GUESSING $1 $2 $(( $ATTEMPT + 1 ))
		return
	fi

	if [[ $GUESS_NUMBER -lt 1 || $GUESS_NUMBER -gt 1000 ]]
	then
		echo "Input number between 1 and 1000, guess again:"
		GAME_GUESSING $1 $2 $(( $ATTEMPT + 1 ))
		return
	fi

	# game start
	if [[ $GUESS_NUMBER -gt $2 ]]
	then
		# if too high
		echo "It's lower than that, guess again:"
		GAME_GUESSING $1 $2 $(( $ATTEMPT + 1 ))
		return
	elif [[ $GUESS_NUMBER -lt $2 ]]
	then
		# if too low
		echo "It's higher than that, guess again:"
		GAME_GUESSING $1 $2 $(( $ATTEMPT + 1 ))
		return
	else
		# if correct
		ATTEMPT=$(( $ATTEMPT + 1 ))
		
		INSERT_GAMES_RESULT=$($PSQL "INSERT INTO games (user_id, secret_number, number_of_guesses)
			VALUES ($1, $2, $ATTEMPT);")
		
		echo "You guessed it in $ATTEMPT tries. The secret number was $2. Nice job!"
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
		HISTORY=$($PSQL "SELECT username, COUNT(game_id), MIN(number_of_guesses) FROM games
			INNER JOIN users USING (user_id)
			WHERE user_id = $1
			GROUP BY username;")

		IFS="|" read USERNAME GAMES_PLAYED BEST_GAME <<< $HISTORY
	fi
	
	echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."

}

GREETINGS
