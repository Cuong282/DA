package types

type Response struct {
	ID          int    `db:"id"`
	Name        string `db:"name"`
	Description string `db:"description"`
	Code        string `json:"code"`
	Message     string `json:"message"`
	Data        []API  `json:"data"`
}

type API struct {
	StockNo     string  `json:"stockNo,omitempty"`
	AvgPrice    float32 `json:"AvgPrice,omitempty"`
	Best1Bid    int     `json:"best1Bid,omitempty"`
	Best1BidVol int     `json:"best1BidVol,omitempty"`
	Best2Bid    int     `json:"best2Bid,omitempty"`
	Best2BidVol int     `json:"best2BidVol,omitempty"`
	Best3Bid    int     `json:"best3Bid,omitempty"`
	Best3BidVol int     `json:"best3BidVol,omitempty"`
	// CorporateEvents    int     `json:"corporateEvents,omitempty"`
	// CaStatus           int     `json:"caStatus,omitempty"`
	// CoveredWarrantType int     `json:"coveredWarrantType,omitempty"`
	Exchange      string `json:"exchange,omitempty"`
	ExercisePrice int    `json:"exercisePrice,omitempty"`
	// ExerciseRatio      int     `json:"exerciseRatio,omitempty"`
	Floor int `json:"floor,omitempty"`
	// IssuerName         int    `json:"issuerName,omitempty"`
	Lowest             int    `json:"lowest,omitempty"`
	LastTradingDate    string `json:"lastTradingDate,omitempty"`
	LastVol            int    `json:"lastVol,omitempty"`
	MaturityDate       string `json:"maturityDate,omitempty"`
	MatchedPrice       int    `json:"matchedPrice,omitempty"`
	NmTotalTradedValue int    `json:"nmTotalTradedValue,omitempty"`
	OpenPrice          int    `json:"openPrice,omitempty"`
	Best1Offer         int    `json:"best1Offer,omitempty"`
	Best1OfferVol      int    `json:"best1OfferVol,omitempty"`
	Best2Offer         int    `json:"best2Offer,omitempty"`
	Best2OfferVol      int    `json:"best2OfferVol,omitempty"`
	Best3Offer         int    `json:"best3Offer,omitempty"`
	Best3OfferVol      int    `json:"best3OfferVol,omitempty"`
	PriorClosePrice    int    `json:"priorClosePrice,omitempty"`
	RefPrice           int    `json:"refPrice,omitempty"`
	SecurityName       string `json:"securityName,omitempty"`
	StockSymbol        string `json:"stockSymbol,omitempty"`
	StockType          string `json:"stockType,omitempty"`
	// TradingStatus      string  `json:"tradingStatus,omitempty"`
	TotalShare  int `json:"totalShare,omitempty"`
	TradingUnit int `json:"tradingUnit,omitempty"`
	// UnderlyingSymbol   string  `json:"underlyingSymbol,omitempty"`
	CompanyNameEn int `json:"stockSycompanyNameEnmbol,omitempty"`
}
