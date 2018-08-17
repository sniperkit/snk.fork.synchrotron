/*
Sniperkit-Bot
- Status: analyzed
*/

package controllers

import (
	"net/http"

	"github.com/sniperkit/snk.fork.synchrotron/config"
)

func AccountShow(w http.ResponseWriter, req *http.Request) {

	config.View.Execute(
		"account/show",
		map[string]interface{}{},
		req,
		w,
	)
}
