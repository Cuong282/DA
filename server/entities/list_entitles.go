package entities

type StockList struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Description string    `json:"description"`
	Code        string    `json:"code"`
	Message     string    `json:"message"`
	Data        []GetList `json:"data"`
}
