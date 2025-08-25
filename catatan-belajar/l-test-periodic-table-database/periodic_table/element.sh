#!/bin/bash

# Program that shows element's properties

PSQL="psql -X --username=freecodecamp --dbname=periodic_table -t --no-align -c"

FORMAT_INFO() {
	IFS="|" read TYPE_ID ATOMIC_NUMBER SYMBOL NAME ATOMIC_MASS MELTING_POINT BOILING_POINT TYPE <<< $1
	
	echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). It's a $TYPE, with a mass of $ATOMIC_MASS amu. $NAME has a melting point of $MELTING_POINT celsius and a boiling point of $BOILING_POINT celsius."
	
}

GET_ELEMENT() {
	if [[ $1 =~ ^[0-9]+$ ]]
	then
		ELEMENT_INFO=$($PSQL "SELECT * FROM elements
				INNER JOIN properties USING (atomic_number)
				INNER JOIN types USING (type_id)
				WHERE atomic_number = $1;")
	else
		ELEMENT_INFO=$($PSQL "SELECT * FROM elements
			INNER JOIN properties USING (atomic_number)
			INNER JOIN types USING (type_id)
			WHERE symbol = '$1' OR name = '$1';")
	fi

	if [[ -z $ELEMENT_INFO ]]
	then
		echo "I could not find that element in the database."
		return
	fi

	FORMAT_INFO $ELEMENT_INFO
}

if [[ -z $1 ]]
then
	echo Please provide an element as an argument.
else
	GET_ELEMENT $1
fi
