package dataobject

type APIDO struct {
	IndexId       string  `db:"IndexId,omitempty"`
	IndexValue    float32 `db:"IndexValue,omitempty"`
	ChangePercent float32 `db:"ChangePercent,omitempty"`
	Time          int     `db:"Time,omitempty"`
	Change        float32 `db:"Change,omitempty"`
	ChartOpen     float32 `db:"ChartOpen,omitempty"`
	Advances      int     `db:"Advances,omitempty"`
	AllQty        int     `db:"AllQty,omitempty"`
	AllValue      int     `db:"AllValue,omitempty"`
	Ceiling       int     `db:"Ceiling,omitempty"`
	ChartHigh     float32 `db:"ChartHigh,omitempty"`
	ChartLowf     float32 `db:"ChartLowf,omitempty"`
	Declines      int     `db:"Declines,omitempty"`
	Floor         int     `db:"Floor,omitempty"`
	Nochanges     int     `db:"Nochanges,omitempty"`
	TimeMaker     int     `db:"TimeMaker,omitempty"`
	TotalQtty     int     `db:"TotalQtty,omitempty"`
	TotalValue    int     `db:"TotalValue,omitempty"`
	Label         string  `db:"Label,omitempty"`
	ExchangeLabel string  `db:"ExchangeLabel,omitempty"`
}

type Response1 struct {
	ID          int       `db:"id"`
	Name        string    `db:"name"`
	Description string    `db:"description"`
	Code        string    `json:"code"`
	Message     string    `json:"message"`
	Data        []GetList `json:"data"`
}

type GetList struct {
	IndexId        string  `db:"indexId,omitempty"`
	IndexValue     float32 `db:"indexValue,omitempty"`
	PrevIndexValue float32 `db:"PrevIndexValue,omitempty"`
	Time           int     `db:"Time,omitempty"`
	Change         float32 `db:"Change,omitempty"`
	ChangePercent  float32 `db:"ChangePercent,omitempty"`
	ChartOpen      float32 `db:"ChartOpen,omitempty"`
	Advances       int     `db:"Advances,omitempty"`
	AllQty         int     `db:"AllQty,omitempty"`
	AllValue       int     `db:"AllValue,omitempty"`
	Ceiling        int     `db:"Ceiling,omitempty"`
	ChartHigh      float32 `db:"ChartHigh,omitempty"`
	ChartLowf      float32 `db:"ChartLowf,omitempty"`
	Declines       int     `db:"Declines,omitempty"`
	Floor          int     `db:"Floor,omitempty"`
	Nochanges      int     `db:"Nochanges,omitempty"`
	TimeMaker      int     `db:"TimeMaker,omitempty"`
	TotalQtty      int     `db:"TotalQtty,omitempty"`
	TotalValue     int     `db:"TotalValue,omitempty"`
	Label          string  `db:"Label,omitempty"`
	ExchangeLabel  string  `db:"ExchangeLabel,omitempty"`
}
