package dataobject

type TodoDO struct {
	ID          int       `db:"id"`
	Name        string    `db:"name"`
	Description string    `db:"description"`
	Code        string    `json:"code"`
	Message     string    `json:"message"`
	Data        []GetList `json:"data"`
}
