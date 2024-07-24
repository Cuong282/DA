package main

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func main() {
	password := "111111"
	hash := SignUp(password)
	err := SignIn("222222", hash)
	fmt.Println("err ", err)
}

func SignUp(password string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		fmt.Printf("- signUp error: %v\n", err)
	} else {
		fmt.Printf("- signUp with password: %s , hash: %s\n", password, hash)

	}
	return string(hash)
}
func SignIn(password, hash string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	if err != nil {
		fmt.Printf("- SignIn error: %v\n", err)
	} else {
		fmt.Printf("- SignIn with password: %s , hash: %s\n", password, hash)
	}
	return err
}
