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
	var query = "SELECT IndexId, IndexValue, description FROM database"
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

func (dao *SQLStorage) Insert(do *dataobject.APIDO) int64 {
	var query = `insert into api(IndexId, IndexValue, ChangePercent) values (?, ?, ?)`
	r, err := dao.DB.NamedExec(query, do)
	fmt.Printf(">>>>>>>>>>>>>SQLStorage.Insert r: %v, err: %v\n", r, err)

	if err != nil {
		return 0
	}
	lastID, err := r.LastInsertId()
	fmt.Printf("lastID: %d, err: %v\n", lastID, err)

	rowsAffectd, err := r.RowsAffected()
	fmt.Printf("rowsAffectd: %d, err: %v\n", rowsAffectd, err)
	id, err := r.LastInsertId()
	if err != nil {

		return 0
	}
	return id
}
