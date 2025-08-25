#!/bin/bash

: '
  One-time script to:
	1. Insert data into the `types` table based on the `properties` table
	2. Update data in the `properties` table from type name to type ID
	3. Rename a column in the `properties` table and change its data type
	4. Set that column as a foreign key
'

PSQL="psql -X --username=freecodecamp --dbname=periodic_table -t --no-align -c"

ALTER_COLUMN() {
	# rename column
	RENAME_COLUMN_RESULT=$($PSQL "ALTER TABLE properties RENAME COLUMN type TO type_id;")

	if [[ $RENAME_COLUMN_RESULT != 'ALTER TABLE' ]]
	then
		echo "Rename failed: $RENAME_COLUMN_RESULT"
		return
	fi

	echo Rename success

	# alter data type
	ALTER_TYPE_RESULT=$($PSQL "ALTER TABLE properties ALTER COLUMN type_id TYPE INT USING type_id::integer;")

	if [[ $ALTER_TYPE_RESULT != 'ALTER TABLE' ]]
	then
		echo "Alter data type failed: $ALTER_TYPE_RESULT"
		return
	fi

	echo Alter data type success

	# alter constraint
	ALTER_CONSTRAINT_RESULT=$($PSQL "ALTER TABLE properties ALTER COLUMN type_id SET NOT NULL;")

	if [[ $ALTER_CONSTRAINT_RESULT != 'ALTER TABLE' ]]
	then
		echo "Alter constraint failed: $ALTER_CONSTRAINT_RESULT"
		return
	fi

	echo Alter constraint success

	# set foreign key
	SET_FOREIGN_RESULT=$($PSQL "ALTER TABLE properties ADD FOREIGN KEY (type_id) REFERENCES types (type_id);")

	if [[ $SET_FOREIGN_RESULT != 'ALTER TABLE' ]]
	then
		echo "Alter foreign key failed: $SET_FOREIGN_RESULT"
		return
	fi

	echo Alter foreign key success
}

INSERT_UPDATE() {
	# get distinct types name from properties table
	PROPERTIES_TYPE_NAMES=$($PSQL "SELECT DISTINCT (type) FROM properties;")

	echo "$PROPERTIES_TYPE_NAMES" | while read PROPERTIES_TYPE_NAME
	do
		TYPES_TYPE_NAME=$($PSQL "SELECT * FROM types WHERE type = '$PROPERTIES_TYPE_NAME';")

		# if the type not in types table yet
		if [[ -z $TYPES_TYPE_NAME ]]
		then
			# insert into type table
			INSERT_TYPE_RESULT=$($PSQL "INSERT INTO types (type) VALUES ('$PROPERTIES_TYPE_NAME');")

			if [[ $INSERT_TYPE_RESULT != 'INSERT 0 1' ]]
			then
				echo "Insert failed: $INSERT_TYPE_RESULT"
				return
			fi

			echo "Inserted into types: $PROPERTIES_TYPE_NAME"

			TYPE_ID=$($PSQL "SELECT type_id FROM types WHERE type = '$PROPERTIES_TYPE_NAME';")

			# update value of type column in properties table
			UPDATE_TYPE_RESULT=$($PSQL "UPDATE properties SET type = '$TYPE_ID' WHERE type = '$PROPERTIES_TYPE_NAME';")
			UPDATED_NUMBER=$(echo $UPDATE_TYPE_RESULT | sed -E 's/^UPDATE ([0-9]+)$/\1/')

			if [[ $UPDATED_NUMBER == 0 ]]
			then
				echo "Update failed: $UPDATE_TYPE_RESULT"
				return
			fi

			echo "Type updated: $PROPERTIES_TYPE_NAME to $TYPE_ID"
		fi
	done

	ALTER_COLUMN
}

INSERT_UPDATE
