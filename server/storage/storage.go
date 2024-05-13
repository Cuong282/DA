package storage

import (
	"context"
	"fmt"

	"github.com/akhilsharma/todo/common"
	"github.com/jmoiron/sqlx"
)

const (
	SQLTimeOut = 5
)

type SQLStorage struct {
	db *sqlx.DB
}

func NewSQLStorage(db *sqlx.DB) *SQLStorage {
	return &SQLStorage{
		db,
	}
}

func (s *SQLStorage) SelectAllTodos() []common.Response {
	myCtx, cancelFunc := context.WithTimeout(context.Background(), SQLTimeOut)
	defer cancelFunc()
	var query = "SELECT id, name, description FROM todo"
	rows, err := s.db.QueryxContext(myCtx, query)

	if err != nil {
		fmt.Println(err)

		return []common.Response{}
	}

	defer rows.Close()

	var todos []common.Response
	for rows.Next() {
		v := common.Response{}
		err := rows.StructScan(&v)
		if err != nil {
			fmt.Println(err)

			return []common.Response{}
		}
		todos = append(todos, v)

	}

	err = rows.Err()
	if err != nil {
		fmt.Println(err)

		return []common.Response{}
	}

	return todos
}
