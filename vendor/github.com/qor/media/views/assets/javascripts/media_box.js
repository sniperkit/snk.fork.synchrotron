"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"===("undefined"==typeof exports?"undefined":_typeof(exports))?require("jquery"):jQuery)}(function(e){function t(e){var t=/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/,i=e.match(t);return!(!i||11!=i[7].length)&&i[7]}function i(t,o){this.$element=e(t),this.options=e.extend({},i.DEFAULTS,e.isPlainObject(o)&&o),this.init()}var o=e("body"),n=e(document),a="qor.medialibrary.select",s="click."+a,r=".qor-field__mediabox-list",d=".qor-field__mediabox-item",l=".qor-field__mediabox-data",c="qor-bottomsheets__mediabox";return i.prototype={constructor:i,init:function(){var e=this.$element;this.SELECT_MEDIABOX_UNDO_TEMPLATE=e.find('[name="media-box-undo-delete"]').html(),this.bind(),this.initSelectedMedia()},bind:function(){n.off("reload.qor.bottomsheets").on("reload.qor.bottomsheets","."+c,this.reloadData.bind(this)),this.$element.off(s).off("change.qor.cropper").on(s,"[data-mediabox-url]",this.openBottomSheets.bind(this)).on(s,".qor-cropper__toggle--delete",this.deleteSelected.bind(this)).on(s,".qor-cropper__toggle--undo",this.undoDeleteSelected.bind(this)).on("change.qor.cropper","textarea.qor-file__options",this.imageCrop.bind(this))},unbind:function(){n.off("reload.qor.bottomsheets","."+c),this.$element.off(s).off("change.qor.cropper")},deleteSelected:function(t){var i=e(t.target);return i.closest(d).addClass("is_deleted").append(this.SELECT_MEDIABOX_UNDO_TEMPLATE).find(".qor-file__list").hide(),this.updateMediaLibraryData(i.closest(r)),this.$element.find(l).data("isDeleted",!0),!1},undoDeleteSelected:function(t){var i=e(t.target);return i.closest(d).removeClass("is_deleted").find(".qor-file__list").show(),this.updateMediaLibraryData(i.closest(r)),i.closest(".qor-fieldset__alert").remove(),this.$element.find(l).data("isDeleted",!1),!1},imageCrop:function(t){var i=e(t.target).closest(d);this.syncImageCrop(i)},openBottomSheets:function(t){var i,n=e(t.target).closest("[data-mediabox-url]"),a=n.data();a.isDisabled||(this.BottomSheets=o.data("qor.bottomsheets"),this.bottomsheetsData=a,this.$parent=i=n.closest(".qor-field__mediabox"),this.$selectFeild=i.find(r),a.url=a.mediaboxUrl,this.SELECT_MANY_SELECTED_ICON=e('[name="select-many-selected-icon"]').html(),this.SELECT_MANY_HINT=e('[name="select-many-hint"]').html(),this.TEMPLATE_IMAGE=i.find('[name="media-box-template"]').html(),this.TEMPLATE_FILE=i.find('[name="media-box-file-template"]').html(),this.TEMPLATE_UPLOADEDVIDEO=i.find('[name="media-box-uploadedvideo-template"]').html(),this.TEMPLATE_VIDEOLINK=i.find('[name="media-box-videolink-template"]').html(),this.SELECT_MEDIABOX_UNDO_TEMPLATE=i.find('[name="media-box-undo-delete"]').html(),this.BottomSheets.open(a,this.handleSelectMany.bind(this)))},initSelectedMedia:function(){var e,t=this.$element,i=t.find(d),o=JSON.parse(t.find(l).val());if(o)for(var n=0;n<o.length;n++)e=i.filter('[data-primary-key="'+o[n].ID+'"]'),e.data().description||e.data("description",o[n].Description)},initMedia:function(){var t,i,o,n=this.$selectFeild,a=n.find(d).not(".is_deleted"),s=this.$bottomsheets.find("tbody tr"),r=this;a.each(function(){o=e(this).data().primaryKey,t=s.filter('[data-primary-key="'+o+'"]').addClass("is_selected"),r.changeIcon(t,!0)}),s.each(function(){t=e(this),i=t.find(".qor-table--ml-slideout p img").first(),t.find(".qor-table__actions").remove(),i.length&&(t.find(".qor-table--medialibrary-item").css("background-image","url("+i.prop("src")+")"),i.parent().remove())}),"1"!=this.bottomsheetsData.maxItem&&this.updateHint(this.getSelectedItemData())},reloadData:function(){this.$selectFeild&&this.initMedia()},renderHint:function(e){return window.Mustache.render(this.SELECT_MANY_HINT,e)},getSelectedItemData:function(t){var i,o=t||this.$selectFeild,n=o.find(d).not(".is_deleted"),a=[];return n.length&&n.each(function(){i=e(this).data(),a.push({ID:i.primaryKey,Url:i.originalUrl.replace(/.original.(\w+)$/,".$1"),Description:i.description,FileName:i.fileName,VideoLink:i.videolink})}),{files:a,selectedNum:a.length}},updateHint:function(t){var i;e.extend(t,this.bottomsheetsData),i=this.renderHint(t),e(".qor-selectmany__hint").remove(),this.$bottomsheets.find(".qor-page__body").before(i)},updateMediaLibraryData:function(e,t){var i=e?e.find(l):this.$selectFeild.find(l),o=this.getSelectedItemData(e);i.val(JSON.stringify(o.files)).data("mediaData",t).trigger("changed.medialibrary",[t])},changeIcon:function(t,i){var o=t.find(".qor-table--medialibrary-item"),n=o.length?o:t.find("td:first");t.find(".qor-select__select-icon").remove(),i&&("one"==i&&e("."+c).find(".qor-select__select-icon").remove(),n.prepend(this.SELECT_MANY_SELECTED_ICON))},syncImageCrop:function(t,i){var o=JSON.parse(t.find("textarea.qor-file__options").val()),n=t.data().mediaLibraryUrl,a={},s=["Width","Height"],r=void 0,d=void 0,l=t.find("img[data-size-name]");delete o.ID,delete o.Url,o.Sizes={},l.each(function(){if(d=e(this).data(),d.sizeResolutionWidth||d.sizeResolution){o.Sizes[d.sizeName]={};for(var t=0;t<s.length;t++)r=d["sizeResolution"+s[t]],r||(r=d.sizeResolution[s[t]]),o.Sizes[d.sizeName][s[t]]=r}}),a.MediaOption=JSON.stringify(o),e.ajax({type:"PUT",url:n,data:JSON.stringify(a),contentType:"application/json",dataType:"json",success:function(o){a.MediaOption=JSON.parse(o.MediaOption),i&&e.isFunction(i)&&i(a,t)}})},showHiddenItem:function(e){e.removeClass("is_deleted").find(".qor-file__list").show(),e.find(".qor-fieldset__alert").remove()},removeItem:function(e){var t=e.primaryKey;this.$selectFeild.find('[data-primary-key="'+t+'"]').remove(),this.changeIcon(e.$clickElement)},compareCropSizes:function(e){var t=e.MediaOption.CropOptions,i=this.bottomsheetsData.cropSizes,o=void 0,n=void 0;if(!i||"image"!=e.SelectedType)return!1;if(i=i.split(","),o=i.length-1,!window._.isObject(t))return!1;if(n=Object.keys(t),n.length)for(var a=0;a<o;a++)if(-1==n.indexOf(i[a]))return!0;return!1},addItem:function(i,o){var n=e(window.Mustache.render(this.TEMPLATE_IMAGE,i)),a=n.find(".qor-file__input"),s=a.closest(d),r=this.$selectFeild.find('[data-primary-key="'+i.primaryKey+'"]'),l=this.bottomsheetsData.maxItem,c=this.getSelectedItemData().selectedNum,h=i.MediaOption.CropOptions,m=this.compareCropSizes(i),f=i.SelectedType,u=/.svg$/.test(i.MediaOption.FileName),p=this;if(o||(1==l?this.changeIcon(i.$clickElement,"one"):this.changeIcon(i.$clickElement,!0)),l&&c>=l){if(1!=l)return void window.alert(this.bottomsheetsData.maxItemHint);this.$selectFeild.find(d).remove()}if(r.length)return this.showHiddenItem(r),void(1==l&&setTimeout(function(){p.$bottomsheets.remove(),e(".qor-bottomsheets").is(":visible")||e("body").removeClass("qor-bottomsheets-open")},1e3));1==l&&this.$selectFeild.find(d).filter(".is_deleted").remove(),u||("video"===f?n=e(window.Mustache.render(this.TEMPLATE_UPLOADEDVIDEO,i)):"video_link"===f?(i.VideoLink="//www.youtube.com/embed/"+t(i.MediaOption.Video)+"?rel=0&fs=0&modestbranding=1&disablekb=1",n=e(window.Mustache.render(this.TEMPLATE_VIDEOLINK,i))):"file"===f&&(n=e(window.Mustache.render(this.TEMPLATE_FILE,i)))),n.data({description:i.MediaOption.Description,mediaData:i,videolink:"video_link"===f?i.MediaOption.Video:""}),u&&n.addClass("is-svg").find(".qor-file__input").remove(),n.appendTo(this.$selectFeild),h&&"image"===f&&this.resetImages(i,n),"image"===f&&n.find("textarea.qor-file__options").val(JSON.stringify(i.MediaOption)),n.trigger("enable"),h&&!m||!a.data("qor.cropper")||u||a.data("qor.cropper").load(i.MediaOption.URL,!0,function(){p.syncImageCrop(s,p.resetImages)}),(o||1==l)&&setTimeout(function(){p.$bottomsheets.remove(),e(".qor-bottomsheets").is(":visible")||e("body").removeClass("qor-bottomsheets-open")},150)},resetImages:function(t,i){var o=t.MediaOption.CropOptions,n=Object.keys(o),a=t.MediaOption.OriginalURL;if(/original/.test(a)){for(var s=n.length-1;s>=0;s--)o[n[s]].URL=a.replace(/original/,n[s]);i.find("img[data-size-name]").each(function(){var t=e(this),i=t.data().sizeName;"original"!=i&&o[i]&&t.prop("src",o[i].URL)})}},handleSelectMany:function(e){var t={onSelect:this.onSelectResults.bind(this),onSubmit:this.onSubmitResults.bind(this)};e.qorSelectCore(t).addClass(c),this.$bottomsheets=e,this.initMedia()},onSelectResults:function(e){this.handleResults(e)},onSubmitResults:function(e){this.handleResults(e,!0)},handleResults:function(e,t){t?(e.MediaOption=JSON.parse(e.MediaOption),this.handleResultsData(e,t)):this.handleResultsData(e)},handleResultsData:function(e,t){var i,o=e.$clickElement;if(e.mediaLibraryUrl||t||(e.mediaLibraryUrl=e.url),t)return e.mediaLibraryUrl=this.bottomsheetsData.mediaboxUrl+"/"+e.primaryKey,this.addItem(e,t),void this.updateDatas(e);o.toggleClass("is_selected"),i=o.hasClass("is_selected"),i?this.addItem(e):this.removeItem(e),this.updateDatas(e)},updateDatas:function(e){"1"!=this.bottomsheetsData.maxItem&&this.updateHint(this.getSelectedItemData()),this.updateMediaLibraryData(null,e)},destroy:function(){this.unbind(),this.$element.removeData(a)}},i.plugin=function(t){return this.each(function(){var o,n=e(this),s=n.data(a);if(!s){if(/destroy/.test(t))return;n.data(a,s=new i(this,t))}"string"==typeof t&&e.isFunction(o=s[t])&&o.apply(s)})},e(function(){var t='[data-toggle="qor.mediabox"]';e(document).on("disable.qor.medialibrary.select",function(o){i.plugin.call(e(t,o.target),"destroy")}).on("enable.qor.medialibrary.select",function(o){i.plugin.call(e(t,o.target))}).triggerHandler("enable.qor.medialibrary.select")}),i});