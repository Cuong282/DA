package logger

import (
	"encoding/json"
	"fmt"
)

var (
	// empty
	emptyBytes = []byte("{}")
)

// JSONDebugData func
func JSONDebugData(message interface{}) []byte {
	data, err := json.Marshal(message)
	if err == nil {
		return data
	} else {
		fmt.Printf("JSONDebugData error: %s\n", err)
	}

	return emptyBytes
}

// JSONDebugDataString func
func JSONDebugDataString(message interface{}) string {
	return string(JSONDebugData(message))
}
