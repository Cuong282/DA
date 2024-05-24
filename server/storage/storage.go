package storage

import (
	"context"
	"fmt"

	"github.com/akhilsharma/todo/entities/dataobject"
	"github.com/jmoiron/sqlx"
)

const (
	SQLTimeOut = 5
)

type SQLStorage struct {
	DB *sqlx.DB
}

func NewSQLStorage(db *sqlx.DB) *SQLStorage {
	return &SQLStorage{
		DB: db,
	}
}

func (s *SQLStorage) SelectAllTodos() []dataobject.TodoDO {
	myCtx, cancelFunc := context.WithTimeout(context.Background(), SQLTimeOut)
	defer cancelFunc()
	var query = "SELECT id, name, description FROM todo"
	rows, err := s.DB.QueryxContext(myCtx, query)

	if err != nil {
		fmt.Println(err)

		return []dataobject.TodoDO{}
	}

	defer rows.Close()

	var todos []dataobject.TodoDO
	for rows.Next() {
		v := dataobject.TodoDO{}
		err := rows.StructScan(&v)
		if err != nil {
			fmt.Println(err)

			return []dataobject.TodoDO{}
		}
		todos = append(todos, v)
	}

	err = rows.Err()
	if err != nil {
		fmt.Println(err)

		return []dataobject.TodoDO{}
	}

	return todos
}

// func (s *SQLStorage) InsertTodo(do *dataobject.TodoDO) int64 {
// 	// query

// }

// func (s *SQLStorage) InsertStock(do *dataobject.API) int64 {
// 	// s.DB.Queryx()
// }

func (dao *SQLStorage) Insert(do *dataobject.API) int64 {
	// myCtx, cancelFunc := context.WithTimeout(context.Background(), 3*time.Second)
	// defer cancelFunc()

	var query = "insert into todo(StockNo , Best1Bid    ) values (:StockNo, :Best1Bid    )"
	r, err := dao.DB.NamedExec(query, do)
	if err != nil {

		return 0
	}

	id, err := r.LastInsertId()
	if err != nil {

		return 0
	}
	return id
}
