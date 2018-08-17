/*
Sniperkit-Bot
- Status: analyzed
*/

package migrations

import (
	"github.com/cryptix/go/logging"
	"github.com/qor/activity"
	"github.com/qor/auth/auth_identity"
	"github.com/qor/banner_editor"
	"github.com/qor/help"
	"github.com/qor/media/asset_manager"
	"github.com/qor/transition"

	"github.com/sniperkit/snk.fork.synchrotron/config/admin"
	"github.com/sniperkit/snk.fork.synchrotron/db"
	"github.com/sniperkit/snk.fork.synchrotron/models"
)

func init() {
	AutoMigrate(&asset_manager.AssetManager{})

	AutoMigrate(&models.Setting{})

	AutoMigrate(&models.User{})

	AutoMigrate(&models.Repository{})

	AutoMigrate(&transition.StateChangeLog{})

	AutoMigrate(&activity.QorActivity{})

	AutoMigrate(&admin.QorWidgetSetting{})

	AutoMigrate(&models.Page{})

	AutoMigrate(&models.MediaLibrary{})

	AutoMigrate(&models.Article{})

	AutoMigrate(&help.QorHelpEntry{})

	AutoMigrate(&auth_identity.AuthIdentity{})

	AutoMigrate(&banner_editor.QorBannerEditorSetting{})
}

var check = logging.CheckFatal

func AutoMigrate(values ...interface{}) {
	for _, value := range values {
		check(db.DB.AutoMigrate(value).Error)
	}
}
