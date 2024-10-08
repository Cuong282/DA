package dataobject

type API struct {
	StockNo     string  `db:"stock_no,omitempty"`
	AvgPrice    float32 `db:"avg_price,omitempty"`
	Best1Bid    int     `db:"best1_bid,omitempty"`
	Best1BidVol int     `db:"best1_bid_vol,omitempty"`
	Best2Bid    int     `db:"best2_bid,omitempty"`
	Best2BidVol int     `db:"best2_bid_vol,omitempty"`
	Best3Bid    int     `db:"best3_bid,omitempty"`
	Best3BidVol int     `db:"best3_bid_vol,omitempty"`
	// CorporateEvents    int     `db:"corporateEvents,omitempty"`
	// CaStatus           int     `db:"caStatus,omitempty"`
	// CoveredWarrantType int     `db:"coveredWarrantType,omitempty"`
	Exchange      string `db:"exchange,omitempty"`
	ExercisePrice int    `db:"exercise_price,omitempty"`
	// ExerciseRatio      int     `db:"exerciseRatio,omitempty"`
	Floor int `db:"floor,omitempty"`
	// IssuerName         int    `db:"issuerName,omitempty"`
	Lowest             int    `db:"lowest,omitempty"`
	LastTradingDate    string `db:"last_trading_date,omitempty"`
	LastVol            int    `db:"last_vol,omitempty"`
	MaturityDate       string `db:"maturity_date,omitempty"`
	MatchedPrice       int    `db:"matched_price,omitempty"`
	NmTotalTradedValue int    `db:"nm_total_traded_value,omitempty"`
	OpenPrice          int    `db:"open_price,omitempty"`
	Best1Offer         int    `db:"best1_offer,omitempty"`
	Best1OfferVol      int    `db:"best1_offer_vol,omitempty"`
	Best2Offer         int    `db:"best2_offer,omitempty"`
	Best2OfferVol      int    `db:"best2_offer_ol,omitempty"`
	Best3Offer         int    `db:"best3_offer,omitempty"`
	Best3OfferVol      int    `db:"best3_offer_vol,omitempty"`
	PriorClosePrice    int    `db:"prior_close_price,omitempty"`
	RefPrice           int    `db:"ref_price,omitempty"`
	SecurityName       string `db:"security_name,omitempty"`
	StockSymbol        string `db:"stock_symbol,omitempty"`
	StockType          string `db:"stock_type,omitempty"`
	// TradingStatus      string  `db:"tradingStatus,omitempty"`
	TotalShare  int `db:"total_share,omitempty"`
	TradingUnit int `db:"trading_unit,omitempty"`
	// UnderlyingSymbol   string  `db:"underlyingSymbol,omitempty"`
	CompanyNameEn int `db:"stock_sycompany_name_enmbol,omitempty"`
}
