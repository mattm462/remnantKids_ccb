function resetGritterPosition() {
    jQuery.extend(jQuery.gritter.options, {
        position: "top-center"
    })
}
Object.keys || (Object.keys = function(o) {
    if (o !== Object(o)) throw new TypeError("Object.keys called on non-object");
    var ret = [],
        p;
    for (p in o) Object.prototype.hasOwnProperty.call(o, p) && ret.push(p);
    return ret
});
var eventStatus = {
        pending: "pending",
        deleted: "delete",
        warning: "warning",
        checkedIn: "checked_in",
        checkedOut: "checked_out"
    },
    pagingModal = {
        templates: {
            nametagTypeInput: '<input type="hidden" class="nametag-type" name="ind_event_ids[{{individual_id}}][nametags][{{index}}][nametag_type]" value="" />',
            nametagValueInput: '<input type="hidden" class="nametag-value" name="ind_event_ids[{{individual_id}}][nametags][{{index}}][nametag_value]" value="" />',
            nametagValueDetailInput: '<input type="hidden" class="nametag-value-detail" name="ind_event_ids[{{individual_id}}][nametags][{{index}}][nametag_value_detail]" value="" />',
            nametagValueTitleInput: '<input type="hidden" class="nametag-value-title" name="ind_event_ids[{{individual_id}}][nametags][{{index}}][nametag_value_title]" value="" />'
        },
        manageCheckinButton: function() {
            $(".main-item.item-checked").length > 0 || $("#pager-number").length > 0 && $("#pager-number").val().length > 0 ? $("button.checkin").button("enable") : $("button.checkin").button("disable")
        },
        initialize: function() {
            var self = this;
            this.modalElement = jQuery("#pager-modal"), this.triggeredFromElement = [], this.modalElement.find("#paging-main").data("buttons", [{
                text: "Cancel",
                "class": "default",
                click: function() {
                    self.resetPagingModal(), jQuery(this).dialog("close")
                }
            }, {
                text: "Check In",
                "class": "content-main checkin",
                click: function(e) {
                    jQuery("#paging-form").submit(), jQuery("#family-detail-disabled").hide()
                }
            }]), this.modalElement.find("#mobile-provider").data("buttons", [{
                text: "Cancel",
                "class": "default",
                click: function() {
                    var lastPushedElement = self.triggeredFromElement.pop();
                    lastPushedElement.trigger("rewind-transition")
                }
            }, {
                text: "Done",
                "class": "content-main",
                click: function(e) {
                    var lastPushedElement = self.triggeredFromElement.pop(),
                        selectedItem = jQuery(this).find("#mobile-provider .item-press:eq(0) a");
                    lastPushedElement.trigger("pager.modal.provider.change", [selectedItem.data("id"), selectedItem.data("name")])
                }
            }]), this.modalElement.find("#ios-mobile-phone").data("buttons", [{
                text: "Cancel",
                "class": "default",
                click: function() {
                    var lastPushedElement = self.triggeredFromElement.pop(),
                        view = jQuery(this).find("#ios-mobile-phone");
                    view.find("#ios-mobile-phone-number").val(""), view.find("#ios-mobile-phone-number").getkeyboard().$preview.val(""), lastPushedElement.trigger("rewind-transition")
                }
            }, {
                text: "Done",
                "class": "content-main",
                click: function(e) {
                    var lastPushedElement = self.triggeredFromElement.pop(),
                        view = jQuery(this).find("#ios-mobile-phone"),
                        phone = jQuery.trim(view.find("#ios-mobile-phone-number").getkeyboard().$preview.val()),
                        isValid = !0;
                    phone = phone.replace(/\D/g, ""), phone === "" ? (jQuery.gritter.add({
                        title: "Mobile phone number is required",
                        text: "Please provide a mobile phone number.",
                        time: 4e3,
                        image: CCB.resources.badIcon
                    }), isValid = !1) : isValid = self.isValidPhoneNumberLength(phone), isValid ? (lastPushedElement.trigger("pager.modal.phone.change", [phone]), view.find("#ios-mobile-phone-number").val(""), view.find("#ios-mobile-phone-number").getkeyboard().$preview.val("")) : self.triggeredFromElement.push(lastPushedElement)
                }
            }]), this.modalElement.find("#add-mobile-phone").data("buttons", [{
                text: "Cancel",
                "class": "default",
                click: function() {
                    var lastPushedElement = self.triggeredFromElement.pop(),
                        view = jQuery(this).find("#add-mobile-phone");
                    lastPushedElement.trigger("rewind-transition"), view.find("#mobile-phone-number").val("").blur().end().find(".mobile-phone-number-display").html("None").end().find(".mobile-provider").val("0").end().find("#full-name").val("").blur().end().find(".mobile-provider-display").html("None"), onScreenKeyboard.hideKeyboard()
                }
            }, {
                text: "Done",
                "class": "content-main",
                click: function(e) {
                    var lastPushedElement = self.triggeredFromElement.pop(),
                        view = jQuery(this).find("#add-mobile-phone"),
                        phone = view.find("#mobile-phone-number").val().replace(/\D/g, "").trim(),
                        fullname = view.find("#full-name").val().trim(),
                        providerId = view.find(".mobile-provider").val(),
                        providerName = view.find(".mobile-provider-display").html(),
                        isTemporaryContact = view.find(".full-name").is(":visible"),
                        subtitleSecondaryText = providerName,
                        isValid = !0;
                    if (isTemporaryContact) {
                        if (phone === "" && fullname === "") {
                            lastPushedElement.trigger("rewind-transition"), view.find("#mobile-phone-number").val("").end().find(".mobile-phone-number-display").html("None").end().find(".mobile-provider").val("0").end().find("#full-name").val("").end().find(".mobile-provider-display").html("None");
                            return
                        }
                        phone === "" && (jQuery.gritter.add({
                            title: "Mobile phone number is required",
                            text: "Please provide a mobile phone number.",
                            time: 4e3,
                            image: CCB.resources.badIcon
                        }), isValid = !1), providerName === "None" && (jQuery.gritter.add({
                            title: "Mobile provider is required",
                            text: "Please provide a mobile provider.",
                            time: 4e3,
                            image: CCB.resources.badIcon
                        }), isValid = !1), fullname === "" && (jQuery.gritter.add({
                            title: "Full Name is required",
                            text: "Please provide a full name.",
                            time: 4e3,
                            image: CCB.resources.badIcon
                        }), isValid = !1), isValid = isValid && self.verifyPhoneLengthAndProvider(phone, providerId), subtitleSecondaryText = fullname
                    } else jQuery.trim(phone) === "" ? (jQuery.gritter.add({
                        title: "Mobile phone number is required",
                        text: "Please provide a mobile phone number.",
                        time: 4e3,
                        image: CCB.resources.badIcon
                    }), isValid = !1) : isValid = self.verifyPhoneLengthAndProvider(phone, providerId);
                    isValid ? (lastPushedElement.data("phone_new", phone).data("provider_name_new", providerName).data("provider_id_new", providerId).data("temporary_full_name", fullname).data("is_dirty", !0).removeClass("no-sub-title").closest("li").removeClass("row-arrow").addClass("item-checked").end().append('<div class="sub-title">' + self.formatPhone(phone) + '&nbsp;<span class="georgia">' + subtitleSecondaryText + "</span></div>").trigger("rewind-transition").data("ios-transition").disable(!0), lastPushedElement.closest("li").find("a").append('<input type="hidden" class="option" value="1" />'), view.find("#mobile-phone-number").val("").blur().end().find(".mobile-phone-number-display").html("None").end().find(".mobile-provider").val("0").end().find("#full-name").val("").end().find(".mobile-provider-display").html("None"), onScreenKeyboard.hideKeyboard()) : self.triggeredFromElement.push(lastPushedElement)
                }
            }]), this.modalElement.find("#mobile-phone").on("keydown", function(event) {
                event.which === jQuery.ui.keyCode.TAB && (event.preventDefault(), self.modalElement.find("#mobile-provider-trigger").click())
            }), this.modalElement.dialog({
                autoOpen: !1,
                modal: !0,
                draggable: !1,
                resizable: !1,
                width: 500,
                open: function() {
                    var hasMultiplePagerNumbers = !1,
                        pagerNumber = "",
                        previousNumber = !1,
                        hasPager = !1,
                        hasTextPaging = !1;
                    jQuery(".items .item").each(function() {
                        jQuery(this).find(".nametag-type[value=p]").each(function() {
                            hasPager = !0;
                            var pagerValue = jQuery.trim(jQuery(this).next(".nametag-value").val());
                            if (pagerValue === "") return !0;
                            previousNumber && previousNumber != pagerValue && (hasMultiplePagerNumbers = !0), previousNumber = pagerValue
                        }), jQuery(this).find(".nametag-type[value=t]").each(function() {
                            hasTextPaging = !0
                        })
                    }), CCB.displayTextPaging || $("button.checkin").button("enable");
                    if (!hasMultiplePagerNumbers && previousNumber) {
                        var pagerNumberElement = jQuery(this).find("#pager-number");
                        pagerNumberElement.val(previousNumber), pagerNumberElement.change(), setTimeout(function() {
                            jQuery("#paging-form li.last a").trigger("click"), pagerNumberElement.focus().select()
                        }, 100)
                    }
                    jQuery(this).find(".modal-content").css({
                        height: jQuery("#paging-main").outerHeight(!0)
                    }), self.positionModal(), nativeKeyboardInhibitor.inhibit()
                },
                close: function() {
                    onScreenKeyboard.hideKeyboard();
                    var $dialog = jQuery(this).dialog("widget");
                    $dialog.find(".content-main.checkin").button("disable")
                },
                buttons: this.modalElement.find("#paging-main").data("buttons")
            }), this.modalTitleElement = this.modalElement.find(".modal-title"), this.modalElement.bind("pager.modal.title.change", function(e, title, subtitle) {
                var titleElement = self.modalTitleElement.find("h3"),
                    subtitleElement = self.modalTitleElement.find("h5");
                titleElement.html(title), subtitleElement.html(subtitle)
            }), this.modalElement.bind("pager.modal.buttons.change", function(e, buttons) {
                jQuery(this).dialog("option", "buttons", buttons)
            });
            if (CCB.displayPager && CCB.displayTextPaging) {
                jQuery("#paging-select").select2Buttons({
                    classes: {
                        buttonsWrapper: "radio-button-bar paging-settings-bar settings-bar group"
                    }
                }).bind("change", function() {
                    self.modalElement.find(".paging-section").hide();
                    var title = jQuery("#" + jQuery(this).val()).show().data("title");
                    self.modalElement.trigger("pager.modal.title.change", title), jQuery(this).val() === "pager-section" && jQuery("#pager-number").focus().select()
                }), this.modalElement.trigger("pager.modal.title.change", this.modalElement.find("#text-paging-section").data("title")), this.modalElement.find("#pager-section").hide(), this.modalElement.find("#text-paging-section").show();
                var pagerNumberTimeout = 0;
                this.modalElement.find("#pager-number").on("keyup", function() {
                    clearTimeout(pagerNumberTimeout), pagerNumberTimeout = setTimeout(function() {
                        pagingModal.manageCheckinButton()
                    }, 200)
                })
            } else CCB.displayPager ? (this.modalElement.trigger("pager.modal.title.change", this.modalElement.find("#pager-section").data("title")), this.modalElement.find("#pager-section").show()) : CCB.displayTextPaging && (this.modalElement.trigger("pager.modal.title.change", this.modalElement.find("#text-paging-section").data("title")), this.modalElement.find("#text-paging-section").show());
            this.modalElement.find("#mobile-provider-trigger").bind("click", function() {
                self.modalElement.find("#mobile-provider").trigger("mobile-provider-change", [jQuery(this).find(".mobile-provider").val()])
            }).bind("pager.modal.provider.change", function(e, providerId, providerName) {
                jQuery(this).data("provider_name_new", providerId).data("provider_id_new", providerName).data("is_dirty", !0).find(".mobile-provider-display").html(document.createTextNode(providerName)).end().find(".mobile-provider").val(providerId).end().trigger("rewind-transition")
            }).iosTransition(this.modalElement.find("#paging-main"), this.modalElement.find("#mobile-provider"), {
                width: 468,
                afterStartAnimation: function(triggerEl, parentContainer, childContainer) {
                    var childContainerHeight = childContainer.outerHeight(),
                        parentContainerHeight = parentContainer.outerHeight();
                    self.modalElement.find(".modal-content").animate({
                        height: childContainerHeight
                    }, "fast", function() {
                        self.positionModal(!0)
                    }), self.triggeredFromElement.push(triggerEl), self.modalElement.trigger("pager.modal.title.change", childContainer.data("title")), self.modalElement.trigger("pager.modal.buttons.change", [childContainer.data("buttons")])
                },
                afterEndAnimation: function(triggerEl, parentContainer, childContainer) {
                    var childContainerHeight = childContainer.outerHeight(),
                        parentContainerHeight = parentContainer.outerHeight();
                    self.modalElement.find(".modal-content").animate({
                        height: parentContainerHeight
                    }, "fast", function() {
                        self.positionModal(!0)
                    }), self.modalElement.trigger("pager.modal.title.change", parentContainer.data("title")), self.modalElement.trigger("pager.modal.buttons.change", [parentContainer.data("buttons")]), pagingModal.manageCheckinButton()
                }
            }), this.modalElement.find("ul.individuals li.row-arrow:not(.has-mobile-number)").length > 0 ? this.modalElement.find("ul.individuals li.row-arrow:not(.has-mobile-number) a").iosTransition(this.modalElement.find("#paging-main"), this.modalElement.find("#add-mobile-phone"), {
                width: 468,
                initParentPosition: !1,
                afterStartAnimation: function(triggerEl, parentContainer, childContainer) {
                    var title, firstName;
                    self.triggeredFromElement.push(triggerEl), triggerEl.is(".temporary") ? (childContainer.find("#full-name").closest("li").show(), childContainer.find("#mobile-phone-number").closest("li").removeClass("first"), title = ["Temporary Contact", "Enter the name, mobile number, and provider for this temporary text message paging recipient."], self.positionModal(!0, !0), onScreenKeyboard.showKeyboard()) : (childContainer.find("#mobile-phone-number").closest("li").addClass("first"), childContainer.find("#full-name").closest("li").hide(), title = childContainer.data("title"), firstName = triggerEl.data("name_first"), title[1] = title[1].replace("<<first_name>>", firstName));
                    var childContainerHeight = childContainer.outerHeight(),
                        parentContainerHeight = parentContainer.outerHeight();
                    self.modalElement.find(".modal-content").animate({
                        height: childContainerHeight
                    }, "fast", function() {
                        self.positionModal(!0)
                    }), self.modalElement.trigger("pager.modal.title.change", title), self.modalElement.trigger("pager.modal.buttons.change", [childContainer.data("buttons")]), childContainer.find("input").first().focus()
                },
                afterEndAnimation: function(triggerEl, parentContainer, childContainer) {
                    var parentContainerHeight = parentContainer.outerHeight();
                    self.modalElement.find(".modal-content").animate({
                        height: parentContainerHeight
                    }, "fast", function() {
                        self.positionModal(!0, !0)
                    }), self.modalElement.trigger("pager.modal.title.change", parentContainer.data("title")), self.modalElement.trigger("pager.modal.buttons.change", [parentContainer.data("buttons")]), pagingModal.manageCheckinButton()
                }
            }) : this.modalElement.find("#add-mobile-phone").hide(), this.modalElement.find("ul.individuals li.row-arrow.has-mobile-number").length > 0 && this.modalElement.find("ul.individuals li.row-arrow.has-mobile-number a").bind("click", function() {
                self.modalElement.find("#mobile-provider").trigger("mobile-provider-change", [0])
            }).bind("pager.modal.provider.change", function(e, providerId, providerName) {
                providerId != "0" ? (jQuery(this).data("provider_name_new", providerName).data("provider_id_new", providerId).data("is_dirty", !0).find(".mobile-provider-display").html(document.createTextNode(providerName)).end().find(".mobile-provider").val(providerId).end().closest("li").removeClass("row-arrow").addClass("item-checked").end().trigger("rewind-transition").data("ios-transition").disable(!0), jQuery(this).closest("li").find("input.option").prop("checked", !0)) : jQuery(this).trigger("rewind-transition")
            }).iosTransition(this.modalElement.find("#paging-main"), this.modalElement.find("#mobile-provider"), {
                initParentPosition: !1,
                width: 468,
                afterStartAnimation: function(triggerEl, parentContainer, childContainer) {
                    var childContainerHeight = childContainer.outerHeight(),
                        parentContainerHeight = parentContainer.outerHeight();
                    self.modalElement.find(".modal-content").animate({
                        height: childContainerHeight
                    }, "fast", function() {
                        self.positionModal(!0)
                    }), self.triggeredFromElement.push(triggerEl), self.modalElement.trigger("pager.modal.title.change", childContainer.data("title")), self.modalElement.trigger("pager.modal.buttons.change", [childContainer.data("buttons")])
                },
                afterEndAnimation: function(triggerEl, parentContainer, childContainer) {
                    var childContainerHeight = childContainer.outerHeight(),
                        parentContainerHeight = parentContainer.outerHeight();
                    self.modalElement.find(".modal-content").animate({
                        height: parentContainerHeight
                    }, "fast", function() {
                        self.positionModal(!0)
                    }), self.modalElement.trigger("pager.modal.title.change", parentContainer.data("title")), self.modalElement.trigger("pager.modal.buttons.change", [parentContainer.data("buttons")]), pagingModal.manageCheckinButton()
                }
            }), this.modalElement.find("#mobile-phone-trigger").bind("click", function() {
                self.modalElement.find(".ios-mobile-phone-number").val(jQuery(this).find("#mobile-phone").val())
            }).bind("pager.modal.phone.change", function(e, phone) {
                jQuery(this).find(".mobile-phone-number-display").html(self.formatPhone(phone.toString())).end().find("#mobile-phone").val(phone).end().trigger("rewind-transition")
            }).iosTransition(this.modalElement.find("#paging-main"), this.modalElement.find("#ios-mobile-phone"), {
                width: 468,
                initParentPosition: !1,
                afterStartAnimation: function(triggerEl, parentContainer, childContainer) {
                    var childContainerHeight = childContainer.outerHeight(),
                        parentContainerHeight = parentContainer.outerHeight(),
                        keyboardHeight = self.modalElement.find("#ios-mobile-phone #ios-mobile-phone-number").getkeyboard().$keyboard.outerHeight();
                    self.modalElement.find(".modal-content").animate({
                        height: keyboardHeight
                    }, "fast", function() {
                        self.positionModal(!0)
                    }), self.triggeredFromElement.push(triggerEl), self.modalElement.trigger("pager.modal.title.change", childContainer.data("title")), self.modalElement.trigger("pager.modal.buttons.change", [childContainer.data("buttons")])
                },
                afterEndAnimation: function(triggerEl, parentContainer, childContainer) {
                    var childContainerHeight = childContainer.outerHeight(),
                        parentContainerHeight = parentContainer.outerHeight(),
                        title = parentContainer.data("title"),
                        lastTriggeredElement = self.triggeredFromElement[self.triggeredFromElement.length - 1];
                    lastTriggeredElement.is(".temporary") && (title = ["Temporary Contact", "Enter the name, mobile number, and provider for this temporary text message paging recipient."], onScreenKeyboard.showKeyboard()), self.modalElement.find(".modal-content").animate({
                        height: parentContainerHeight
                    }, "fast", function() {
                        self.positionModal(!0)
                    }), self.modalElement.trigger("pager.modal.title.change", title), self.modalElement.trigger("pager.modal.buttons.change", [parentContainer.data("buttons")]), pagingModal.manageCheckinButton()
                }
            }), this.modalElement.find("#mobile-provider-trigger").bind("click", function() {
                self.modalElement.find("#mobile-provider").trigger("mobile-provider-change", [jQuery(this).find(".mobile-provider").val()])
            }).bind("pager.modal.provider.change", function(e, providerId, providerName) {
                jQuery(this).data("provider_name_new", providerId).data("provider_id_new", providerName).data("is_dirty", !0).find(".mobile-provider-display").html(document.createTextNode(providerName)).end().find(".mobile-provider").val(providerId).end().trigger("rewind-transition")
            }).iosTransition(this.modalElement.find("#paging-main"), this.modalElement.find("#mobile-provider"), {
                width: 468,
                initParentPosition: !1,
                afterStartAnimation: function(triggerEl, parentContainer, childContainer) {
                    var childContainerHeight = childContainer.outerHeight(),
                        parentContainerHeight = parentContainer.outerHeight();
                    self.modalElement.find(".modal-content").animate({
                        height: childContainerHeight
                    }, "fast", function() {
                        self.positionModal(!0)
                    }), self.triggeredFromElement.push(triggerEl), self.modalElement.trigger("pager.modal.title.change", childContainer.data("title")), self.modalElement.trigger("pager.modal.buttons.change", [childContainer.data("buttons")])
                },
                afterEndAnimation: function(triggerEl, parentContainer, childContainer) {
                    var childContainerHeight = childContainer.outerHeight(),
                        parentContainerHeight = parentContainer.outerHeight();
                    self.modalElement.find(".modal-content").animate({
                        height: parentContainerHeight
                    }, "fast", function() {
                        self.positionModal(!0)
                    }), self.modalElement.trigger("pager.modal.title.change", parentContainer.data("title")), self.modalElement.trigger("pager.modal.buttons.change", [parentContainer.data("buttons")]), pagingModal.manageCheckinButton()
                }
            }), this.modalElement.find("#add-mobile-provider-trigger").bind("click", function() {
                self.modalElement.find("#mobile-provider").trigger("mobile-provider-change", [jQuery(this).find(".mobile-provider").val()]), onScreenKeyboard.hideKeyboard()
            }).bind("pager.modal.provider.change", function(e, providerId, providerName) {
                jQuery(this).data("provider_name_new", providerId).data("provider_id_new", providerName).data("is_dirty", !0).find(".mobile-provider-display").html(document.createTextNode(providerName)).end().find(".mobile-provider").val(providerId).end().trigger("rewind-transition")
            }).iosTransition(this.modalElement.find("#add-mobile-phone"), this.modalElement.find("#mobile-provider"), {
                width: 468,
                initParentPosition: !1,
                afterStartAnimation: function(triggerEl, parentContainer, childContainer) {
                    var childContainerHeight = childContainer.outerHeight(),
                        parentContainerHeight = parentContainer.outerHeight();
                    self.modalElement.find(".modal-content").animate({
                        height: childContainerHeight
                    }, "fast", function() {
                        self.positionModal(!0)
                    }), self.triggeredFromElement.push(triggerEl), self.modalElement.trigger("pager.modal.title.change", childContainer.data("title")), self.modalElement.trigger("pager.modal.buttons.change", [childContainer.data("buttons")])
                },
                afterEndAnimation: function(triggerEl, parentContainer, childContainer) {
                    var childContainerHeight = childContainer.outerHeight(),
                        parentContainerHeight = parentContainer.outerHeight(),
                        title = parentContainer.data("title"),
                        lastTriggeredElement = self.triggeredFromElement[self.triggeredFromElement.length - 1];
                    lastTriggeredElement.is(".temporary") && (title = ["Temporary Contact", "Enter the name, mobile number, and provider for this temporary text message paging recipient."], onScreenKeyboard.showKeyboard()), self.modalElement.find(".modal-content").animate({
                        height: parentContainerHeight
                    }, "fast", function() {
                        self.positionModal(!0)
                    }), self.modalElement.trigger("pager.modal.title.change", title), self.modalElement.trigger("pager.modal.buttons.change", [parentContainer.data("buttons")]), pagingModal.manageCheckinButton()
                }
            }), jQuery("#text-paging-section li.main-item a").bind("click", function() {
                var li = jQuery(this).closest("li");
                li.hasClass("row-arrow") || (li.hasClass("temporary") && li.hasClass("item-checked") ? (li.removeClass("item-checked").addClass("row-arrow"), li.find(".sub-title").remove(), li.find("a").addClass("no-sub-title").data("ios-transition").disable(!1), li.find(".option").val("")) : li.hasClass("item-checked") ? (li.removeClass("item-checked"), li.find(".option").val("")) : (li.addClass("item-checked"), li.find(".option").val("1"))), pagingModal.manageCheckinButton(), $(this).is(".none") ? $(".main-item.item-checked:not(.none)").removeClass("item-checked") : $(".main-item.none").removeClass("item-checked")
            }), jQuery("#paging-form").submit(function(e) {
                e.preventDefault(), e.stopPropagation();
                var isSuccessful;
                if (jQuery("#paging-selection").length > 0) {
                    var pagingType = jQuery("#paging-select").val();
                    pagingType == "text-paging-section" ? isSuccessful = self.populateFormWithPageRecipientsAndSubmit() : isSuccessful = self.populateFormWithPagerAndSubmit()
                } else jQuery("#text-paging-section").length > 0 ? isSuccessful = self.populateFormWithPageRecipientsAndSubmit() : isSuccessful = self.populateFormWithPagerAndSubmit();
                isSuccessful && (jQuery("#family-detail-disabled").show(), finishCheckin.submitForm(), self.modalElement.dialog("close"))
            }), jQuery(".item.footer").delegate(".button.finish:eq(0):not(.disabled)", "click", function(e) {
                e.preventDefault(), e.stopPropagation();
                if (jQuery(".group-event.event-pending").length > 0) self.modalElement.dialog("open");
                else if (jQuery(".group-event.event-delete").length > 0) jQuery("#family-detail-disabled").show(), finishCheckin.submitForm();
                else {
                    jQuery("#family-detail-disabled").show();
                    var printNeeded = individualLabels.print();
                    printNeeded ? finishCheckin.printRedirect(finishCheckin.printingNotice) : finishCheckin.redirect(finishCheckin.printingNotice)
                }
            }), this.modalElement.find("#mobile-provider").bind("mobile-provider-change", function(e, providerId) {
                jQuery(this).find(".row").removeClass("item-press"), jQuery(this).find("[data-id=" + providerId + "]").closest("li.row").addClass("item-press")
            }).find(".row a").bind("click", function() {
                self.modalElement.find("#mobile-provider").trigger("mobile-provider-change", [jQuery(this).data("id")])
            }), CCB.isSelfCheckin && CCB.onScreenKeyboard && (jQuery("#ios-mobile-phone-number").keyboard({
                layout: "custom",
                customLayout: {
                    "default": ["1 2 3", "4 5 6", "7 8 9", "{b} 0 {clear}"]
                },
                css: {
                    input: "ui-widget-content ios-input",
                    container: "ui-widget-content ui-corner-all ui-widget ui-helper-clearfix ios-container ios-family-detail-modal",
                    buttonDefault: "ui-state-default ios-button-default",
                    buttonAction: "ui-state-active ios-button-action",
                    buttonDisabled: "ui-state-disabled"
                },
                display: {
                    b: '<img src="' + CCB.resources.cdnLocation + '/js/keyboard/img/backspace_button_32.png" class="ios-backspace-img" />::Backspace'
                },
                alwaysOpen: !0,
                closeOnEscape: !1,
                autoAccept: !0,
                usePreview: !0,
                stickyShift: !1,
                stayOpen: !0,
                appendLocally: !0,
                openOn: ""
            }), this.modalElement.find("#add-mobile-phone-trigger").bind("click", function() {
                self.modalElement.find(".ios-mobile-phone-number").val(jQuery(this).find("#mobile-phone-number").val()), onScreenKeyboard.hideKeyboard()
            }).bind("pager.modal.phone.change", function(e, phone) {
                jQuery(this).find(".mobile-phone-number-display").html(self.formatPhone(phone.toString())).end().find("#mobile-phone-number").val(phone).end().trigger("rewind-transition")
            }).iosTransition(this.modalElement.find("#add-mobile-phone"), this.modalElement.find("#ios-mobile-phone"), {
                width: 468,
                initParentPosition: !1,
                afterStartAnimation: function(triggerEl, parentContainer, childContainer) {
                    var childContainerHeight = childContainer.outerHeight(),
                        parentContainerHeight = parentContainer.outerHeight(),
                        keyboardHeight = self.modalElement.find("#ios-mobile-phone #ios-mobile-phone-number").getkeyboard().$keyboard.outerHeight();
                    self.modalElement.find(".modal-content").animate({
                        height: keyboardHeight
                    }, "fast", function() {
                        self.positionModal(!0)
                    }), self.triggeredFromElement.push(triggerEl), self.modalElement.trigger("pager.modal.title.change", childContainer.data("title")), self.modalElement.trigger("pager.modal.buttons.change", [childContainer.data("buttons")])
                },
                afterEndAnimation: function(triggerEl, parentContainer, childContainer) {
                    var childContainerHeight = childContainer.outerHeight(),
                        parentContainerHeight = parentContainer.outerHeight(),
                        title = parentContainer.data("title"),
                        lastTriggeredElement = self.triggeredFromElement[self.triggeredFromElement.length - 1];
                    self.modalElement.find(".modal-content").animate({
                        height: parentContainerHeight
                    }, "fast", function() {
                        self.positionModal(!0)
                    }), lastTriggeredElement.is(".temporary") && (title = ["Temporary Contact", "Enter the name, mobile number, and provider for this temporary text message paging recipient."], onScreenKeyboard.showKeyboard()), self.modalElement.trigger("pager.modal.title.change", title), self.modalElement.trigger("pager.modal.buttons.change", [parentContainer.data("buttons")]), pagingModal.manageCheckinButton()
                }
            }));
            var mobileProvider = jQuery("#pager-modal #mobile-provider");
            mobileProvider.find(".column:first").addClass("ui-corner-left").find("li.row:first").addClass("ui-corner-tl").end().find("li.row:last").addClass("ui-corner-bl").end().end().find(".column:last").addClass("ui-corner-right").find("li.row:first").addClass("ui-corner-tr").end().find("li.row:last").addClass("ui-corner-br"), mobileProvider.find(".column:first li.row").length > mobileProvider.find(".column:last li.row").length && mobileProvider.find(".column:first").addClass("ui-corner-br").find("li.row:last").addClass("ui-corner-br"), $("button.checkin").button("disable")
        },
        isValidPhoneNumberLength: function(phone) {
            var isValid = !0;
            return phone = phone.replace(/\D/g, ""), jQuery.trim(phone).length !== 10 && (jQuery.gritter.options.position = "top-center", jQuery.gritter.add({
                title: "Incorrect mobile number length",
                text: "The mobile number must have 10 digits.",
                time: 4e3,
                image: CCB.resources.badIcon
            }), isValid = !1), isValid
        },
        isValidProvider: function(providerId) {
            var isValid = !0;
            if (providerId === "" || providerId === 0 || providerId === "0") jQuery.gritter.options.position = "top-center", jQuery.gritter.add({
                title: "Mobile provider is required",
                text: "Please provide a mobile provider.",
                time: 4e3,
                image: CCB.resources.badIcon
            }), isValid = !1;
            return isValid
        },
        isValidTempname: function(tempname) {
            var isValid = !0;
            return tempname === "" && (jQuery.gritter.options.position = "top-center", jQuery.gritter.add({
                title: "Name is required",
                text: "Please provide a name for the Temporary Contact.",
                time: 4e3,
                image: CCB.resources.badIcon
            }), isValid = !1), isValid
        },
        verifyPhoneLengthAndProvider: function(phone, providerId) {
            var phoneValid, providerValid;
            return phoneValid = this.isValidPhoneNumberLength(phone), providerValid = this.isValidProvider(providerId), phoneValid && providerValid
        },
        resetPagingModal: function() {
            var self = this;
            this.modalElement.find("#pager-number").val(""), this.modalElement.find("#text-paging-section").length > 0 ? this.modalElement.trigger("pager.modal.title.change", this.modalElement.find("#text-paging-section").data("title")) : this.modalElement.trigger("pager.modal.title.change", this.modalElement.find("#pager-section").data("title")), this.modalElement.find(".paging-settings-bar").length > 0 && this.modalElement.find(".paging-settings-bar li.first a").trigger("click"), this.modalElement.find(".individuals li a").each(function() {
                if (jQuery(this).data("is_dirty")) {
                    var phone = jQuery(this).data("phone") || "",
                        providerName = jQuery(this).data("provider_name") || "",
                        providerId = jQuery(this).data("provider_id") || 0;
                    phone == "" ? jQuery(this).addClass("no-sub-title").find(".sub-title").remove() : jQuery(this).find(".sub-title").html(self.formatPhone(phone.toString()) + '&nbsp;<span class="georgia mobile-provider-display">' + providerName + "</span>"), jQuery(this).data("is_dirty", !1).data("ios-transition").disable(!1).closest("li").removeClass("item-checked").addClass("row-arrow")
                } else jQuery(this).closest("li").removeClass("item-checked")
            }), this.modalElement.find("#mobile-phone").val("").blur().end().find("#mobile-provider-trigger").find(".mobile-provider").val(0).end().find(".mobile-provider-display").html("None")
        },
        formatPhone: function(phone) {
            return phone.length === 10 ? CCB.isSelfCheckin ? "(&#149;&#149;&#149;) &#149;&#149;&#149;-" + phone.substr(6, 4) : "(" + phone.substr(0, 3) + ") " + phone.substr(3, 3) + "-" + phone.substr(6, 4) : phone
        },
        positionModal: function(animate, keyboard) {
            animate = animate === !0 ? !0 : !1, keyboard = keyboard === !0 ? !0 : !1;
            var dialogWidget = this.modalElement.dialog("widget"),
                dialogHeight = dialogWidget.outerHeight(),
                windowHeight = jQuery(window).height(),
                keyboardHeight = jQuery(".ui-keyboard.ui-keyboard-has-focus").outerHeight(),
                top = 0;
            dialogHeight < windowHeight && (keyboard ? top = Math.abs((windowHeight - dialogHeight - keyboardHeight) / 2) : top = (windowHeight - dialogHeight) / 2), animate ? (this.currentTop > top && (this.currentTop = top), dialogWidget.animate({
                top: this.currentTop
            })) : (this.currentTop = top, dialogWidget.css({
                top: top
            }))
        },
        populateFormWithPageRecipientsAndSubmit: function() {
            var self = this,
                form = jQuery("#family-checkin-form"),
                individuals = this.modalElement.find(".individuals .item-checked:not(.none)"),
                tempPhone = this.modalElement.find("#mobile-phone"),
                tempname = this.modalElement.find("#fullname"),
                tempProvider = this.modalElement.find("#mobile-provider-trigger .mobile-provider"),
                isSuccessful = !0,
                index = 0,
                nametagFields = null,
                nametagFieldList = [],
                individualUpdateList = [];
            return isSuccessful && (individuals.each(function() {
                var $individual = $(this).closest("li");
                if ($individual.find(">a").data("is_dirty")) {
                    var individualIdVal = $individual.find(">a").data("individual_id") || !1;
                    $individual.find(">a").data("phone", $individual.find(">a").data("phone_new")), $individual.find(">a").data("provider_name", $individual.find(">a").data("provider_name_new")), $individual.find(">a").data("provider_id", $individual.find(">a").data("provider_id_new")), $individual.find(">a").removeData("phone_new").removeData("provider_name_new").removeData("provider_id_new"), individualIdVal && individualUpdateList.push({
                        id: individualIdVal,
                        mobile_number: $individual.find(">a").data("phone"),
                        mobile_provider_id: $individual.find(">a").data("provider_id")
                    })
                }
                nametagFields = self.buildNametagFields("{{individual_id}}", index);
                var phoneVal = $individual.find(">a").data("phone"),
                    providerIdVal = $individual.find(">a").data("provider_id"),
                    individualFullname = $individual.find(">a").data("temporary_full_name") || $individual.find(".title").text();
                nametagFields[0].val("t"), nametagFields[1].val(phoneVal), nametagFields[2].val(providerIdVal), nametagFields[3].val(individualFullname), nametagFieldList.push.apply(nametagFieldList, nametagFields), index += 1
            }), jQuery(".items .item").each(function() {
                if (jQuery(this).find(".group-event.event-pending").length > 0) {
                    jQuery(this).find(".nametag-type,.nametag-value,.nametag-value-detail").remove();
                    var individualRow = jQuery(this);
                    jQuery.each(nametagFieldList, function() {
                        var fieldClone = this.clone();
                        fieldClone.attr("name", fieldClone.attr("name").replace("{{individual_id}}", individualRow.data("individual-id"))), individualRow.prepend(fieldClone)
                    })
                }
            }), individualUpdateList.length > 0 && jQuery.post("checkin_family_detail.php", {
                aj: "1",
                ax: "update_individual_mobile",
                individuals: JSON.stringify(individualUpdateList)
            })), isSuccessful
        },
        populateFormWithPagerAndSubmit: function() {
            var self = this,
                form = jQuery("#family-checkin-form"),
                pagerNumber = jQuery.trim(this.modalElement.find("#pager-number").val());
            return pagerNumber !== "" && jQuery(".items .item").each(function() {
                if (jQuery(this).find(".group-event.event-pending").length > 0) {
                    jQuery(this).find(".nametag-type,.nametag-value,.nametag-value-detail").remove();
                    var nametagFields = self.buildNametagFields(jQuery(this).data("individual-id"), 0);
                    nametagFields[0].val("p"), nametagFields[1].val(pagerNumber), jQuery(this).prepend.apply(jQuery(this), nametagFields)
                }
            }), !0
        },
        buildNametagFields: function(individualId, index) {
            var nametagType = this.templates.nametagTypeInput.replace("{{individual_id}}", individualId).replace("{{index}}", index),
                nametagValue = this.templates.nametagValueInput.replace("{{individual_id}}", individualId).replace("{{index}}", index),
                nametagValueTitle = this.templates.nametagValueTitleInput.replace("{{individual_id}}", individualId).replace("{{index}}", index),
                nametagValueDetail = this.templates.nametagValueDetailInput.replace("{{individual_id}}", individualId).replace("{{index}}", index);
            return [jQuery(nametagType), jQuery(nametagValue), jQuery(nametagValueDetail), jQuery(nametagValueTitle)]
        }
    },
    finishCheckin = {
        printingNotice: {
            text: "Your+labels+are+printing.",
            good_or_bad: "good",
            title: "Printing"
        },
        initialize: function() {
            var self = this;
            this.atLeastOneChecked = !1, CCB.displayPager || CCB.displayTextPaging ? pagingModal.initialize() : jQuery(".item.footer").delegate(".button.finish:eq(0):not(.disabled)", "click", function(e) {
                e.preventDefault(), e.stopPropagation(), jQuery("#family-detail-disabled").show();
                if (jQuery(".group-event.event-delete, .group-event.event-pending").length > 0) self.submitForm();
                else {
                    var printNeeded = individualLabels.print();
                    printNeeded ? finishCheckin.printRedirect(finishCheckin.printingNotice) : finishCheckin.redirect(finishCheckin.printingNotice)
                }
            }), jQuery(".group-events").change(function() {
                jQuery(".group-event.event-pending, .group-event.event-delete").length > 0 ? (jQuery(".item.footer .button.finish").removeClass("disabled"), self.atLeastOneChecked = !0) : (jQuery(".item.footer .button.finish").addClass("disabled"), self.atLeastOneChecked = !1)
            }), jQuery(".label-qty").change(function() {
                if (!self.atLeastOneChecked) {
                    var isOneValid = !1;
                    jQuery(".item:not(.header)").each(function() {
                        var individualRow = jQuery(this),
                            labelQtySelect = individualRow.find(".label-qty:eq(0)");
                        if (individualRow.find(".group-event:not(.event-checked-in,.event-checked-out)").length == 0 && individualRow.find(".event-checked-in").length > 0 && labelQtySelect.val() > 0) return isOneValid = !0, !1
                    }), isOneValid ? jQuery(".item.footer .button.finish").removeClass("disabled") : jQuery(".item.footer .button.finish").addClass("disabled")
                }
            })
        },
        createUniqueSecurityCode: function() {
            if (CCB.securityCode.length === 0) {
                var ajaxSettings = {
                    data: "aj=1&ax=create_unique_security_code&family_id=" + CCB.family_id,
                    type: "POST",
                    dataType: "json",
                    async: !1,
                    success: function(data) {
                        data.code.length > 0 && (CCB.securityCode = data.code, jQuery("#security-code").val(CCB.securityCode))
                    },
                    url: "checkin_family_detail.php"
                };
                return jQuery.ajax(ajaxSettings), CCB.securityCode
            }
            return CCB.securityCode
        },
        submitForm: function() {
            this.createUniqueSecurityCode();
            var serializedForm = jQuery("#family-checkin-form").serialize();
            jQuery.post("checkin_family_detail.php", serializedForm, function(checkinObj) {
                jQuery(".item .event-delete").each(function() {
                    var eventId = jQuery(this).data("event-id"),
                        individualEvents = jQuery(this).closest(".item").data("event-list");
                    for (var time in individualEvents) individualEvents.hasOwnProperty(time) && jQuery.each(individualEvents[time], function() {
                        if (eventId == this.event_id) return this.is_checked_in = !1, !1
                    });
                    jQuery(this).remove()
                });
                if (typeof checkinObj.successful_items != "undefined")
                    for (var individualId in checkinObj.successful_items)
                        if (checkinObj.successful_items.hasOwnProperty(individualId)) {
                            var individualRow = jQuery(".item.individual-" + individualId);
                            jQuery.each(checkinObj.successful_items[individualId], function() {
                                var eventId = this,
                                    groupEvent = individualRow.find(".group-event.event-" + eventId);
                                if (groupEvent.length > 0) {
                                    groupEvent.removeClass("event-pending").addClass("event-checked-in"), groupEvent.find(".group-event-status").val(eventStatus.checkedIn), groupEvent.find(".not-in-group").remove();
                                    var individualEvents = individualRow.data("event-list");
                                    for (var time in individualEvents) individualEvents.hasOwnProperty(time) && jQuery.each(individualEvents[time], function() {
                                        if (eventId == this.event_id) return this.is_checked_in = !0, this.not_in_group = !1, !1
                                    })
                                }
                            }), individualRow.find(".group-events").trigger("change", [individualRow.find(".label-qty").val()])
                        }
                typeof checkinObj.events != "undefined" && jQuery.each(checkinObj.events, function() {
                    var event = this;
                    jQuery.each(CCB.checkinEvents, function() {
                        if (event.event_id == this.event_id) return jQuery.extend(this, event), !1
                    })
                });
                if (checkinObj.notice.good_or_bad == "good") {
                    var printNeeded = individualLabels.print();
                    printNeeded ? finishCheckin.printRedirect(finishCheckin.printingNotice) : finishCheckin.redirect(checkinObj.notice)
                } else {
                    jQuery.gritter.options.position = "top-center", jQuery.gritter.add({
                        title: checkinObj.notice.title,
                        text: checkinObj.notice.text.replace(/\+/g, " "),
                        image: CCB.resources.warningIcon
                    });
                    if (typeof checkinObj.warning_items != "undefined")
                        for (var individualId in checkinObj.warning_items)
                            if (checkinObj.warning_items.hasOwnProperty(individualId)) {
                                var individualRow = jQuery(".item.individual-" + individualId);
                                jQuery.each(checkinObj.warning_items[individualId], function() {
                                    var eventId = this,
                                        groupEvent = individualRow.find(".group-event.event-" + eventId);
                                    groupEvent.length > 0 && (groupEvent.removeClass("event-pending").addClass("event-warning"), groupEvent.find(".group-event-status").val(eventStatus.warning))
                                }), individualRow.find(".group-events").trigger("change")
                            }
                    jQuery("#family-detail-disabled").hide()
                }
            }, "json")
        },
        printRedirect: function(notice) {
            var url = "checkin_main.php?notice=" + notice.text + "&good_or_bad=" + notice.good_or_bad + "&notice_title=" + notice.title;
            /(iPad|iPhone|iPod).*OS (8|9|[1-9][0-9])/.test(window.navigator.userAgent) ? window.matchMedia("print").addListener(function(mqp) {
                window.matchMedia("screen").addListener(function(mqs) {
                    window.location = url
                })
            }) : setTimeout(function() {
                window.location = url
            }, 500)
        },
        redirect: function(notice) {
            window.location = "checkin_main.php?notice=" + notice.text + "&good_or_bad=" + notice.good_or_bad + "&notice_title=" + notice.title
        }
    },
    individualLabels = {
        initialize: function() {
            var self = this;
            this.printNeeded = !1, this.pickupTag = jQuery("#pickup-tag"), this.individualLabelTemplate = jQuery(".individual-label:eq(0);"), CCB.needsPickupTag ? this.pickupTag.removeClass("print-no") : this.pickupTag.addClass("print-no"), CCB.displayNametag && jQuery("#family-checkin-form .core-members, #family-checkin-form .other-members").each(function() {
                jQuery(this).data("nametagImage", jQuery('<img src="' + CCB.resources.nametagLocation + jQuery(this).data("nametag-id") + '.png" />'))
            }), jQuery(".item:not(.disabled) .group-events").bind("change", function(e, labelQuantityOverride) {
                var individualRow = jQuery(this).closest(".item"),
                    labelQty = individualRow.find(".label-qty");
                jQuery(this).find(".group-event.event-pending, .group-event.event-checked-in").length > 0 ? (individualRow.find(".label-quantity-bar").show(), individualRow.find(".label-quantity-bar-disabled").hide(), individualRow.find(".select-buttons").removeClass("disabled").find("li").removeClass("checked"), typeof labelQuantityOverride != "undefined" ? self.setLabelQuantity(individualRow, labelQuantityOverride) : jQuery(this).find(".group-event.event-pending").length > 0 ? self.setLabelQuantity(individualRow, CCB.labelQuantityDefault) : jQuery(this).find(".group-event.event-checked-in").length > 0 && jQuery(this).find(".group-event.event-delete").length > 0 ? self.setLabelQuantity(individualRow, CCB.labelQuantityDefault) : self.setLabelQuantity(individualRow, 0)) : (individualRow.find(".select-buttons").addClass("disabled"), individualRow.find(".label-quantity-bar").hide(), individualRow.find(".label-quantity-bar-disabled").show(), self.setLabelQuantity(individualRow, -1)), labelQty.change()
            }), jQuery(".item:not(.disabled) select.label-qty").each(function() {
                jQuery(this).select2Buttons({
                    noDefault: !0,
                    classes: {
                        buttonsWrapper: "radio-button-bar label-quantity-bar group"
                    }
                })
            }).bind("change", function() {
                var individualRow = jQuery(this).closest(".item");
                individualRow.find(".select-buttons li.checked").removeClass("checked"), jQuery(this).val() > 0 ? jQuery(this).next().find(".on").addClass("checked") : jQuery(this).next().find(".checked").removeClass("checked")
            }), jQuery(".event-list-trigger:not(.disabled)").each(function() {
                var individualRow = jQuery(this);
                individualRow.find(".event-checked-in").length > 0 ? (individualRow.find(".select-buttons").removeClass("disabled"), individualRow.find(".label-quantity-bar").show(), individualRow.find(".label-quantity-bar-disabled").hide(), individualLabels.setLabelQuantity(individualRow, 0)) : (individualRow.find(".label-quantity-bar").hide(), individualRow.find(".label-quantity-bar-disabled").show())
            })
        },
        setLabelQuantity: function(individualRow, quantity) {
            quantity == -1 ? individualRow.find(".select-buttons li").removeClass("checked").removeClass("on") : individualRow.find(".select-buttons li a").each(function() {
                jQuery(this).data("select-value") == quantity && jQuery(this).click()
            })
        },
        print: function() {
            var self = this;
            this.printNeeded = !1;
            var printBox = jQuery("#print-content-only .individual-labels").empty();
            jQuery(".label-qty").each(function() {
                var item = jQuery(this).closest(".item"),
                    labelCount = parseInt(jQuery(this).val(), 10);
                if (labelCount > 0 && item.find(".group-event.event-checked-in").length > 0) {
                    self.printNeeded || (self.printNeeded = !0);
                    var thisIndividualLabel = self.individualLabelTemplate.clone(),
                        nameFirst = item.data("name-first"),
                        nameLast = item.data("name-last"),
                        allergy = item.data("allergy").toString(),
                        checkedInEvents = [],
                        nametagId = item.data("nametag-id"),
                        isLeaderOfAnEvent = !1,
                        labelSet = [];
                    jQuery.each(item.data("event-list"), function() {
                        jQuery.each(this, function() {
                            this.is_checked_in && (checkedInEvents.push(this), this.is_leader && (isLeaderOfAnEvent = !0))
                        })
                    }), checkedInEvents = jQuery.map(checkedInEvents, function(individualEvent) {
                        var event = !1;
                        return jQuery.each(CCB.checkinEvents, function() {
                            if (this.event_id == individualEvent.event_id) return individualEvent.event = this, !1
                        }), individualEvent
                    }), checkedInEvents.sort(function(a, b) {
                        var time1 = Date.parse(a.event.event_time),
                            time2 = Date.parse(b.event.event_time);
                        return time1.compareTo(time2)
                    });
                    if (CCB.nameOnlyLabels) thisIndividualLabel.removeClass("print-no"), thisIndividualLabel.find(".name-first").html(nameFirst), thisIndividualLabel.find(".name-last").html(nameLast), labelSet.push(thisIndividualLabel);
                    else {
                        thisIndividualLabel.removeClass("print-no"), thisIndividualLabel.find(".name-first").html(nameFirst), thisIndividualLabel.find(".name-last").html(nameLast), thisIndividualLabel.find(".code").html(isLeaderOfAnEvent ? "Staff" : CCB.securityCode), thisIndividualLabel.find(".comment").html(allergy != "" ? "<span>" + allergy.replace(/\+/g, " ") + "</span>" : "&nbsp;");
                        if (CCB.displayPager) {
                            var type = item.find(".nametag-type[value=p]");
                            if (type.length == 1) {
                                var pager = jQuery.trim(type.next(".nametag-value").val());
                                thisIndividualLabel.find(".pager").html(pager != "" ? "Pager: " + pager : "")
                            }
                        }
                        CCB.displayNametag && thisIndividualLabel.find(".barcode").html(item.data("nametagImage"));
                        var labelsPer = Math.ceil(checkedInEvents.length / 3),
                            thisIndividualLabelClone, eventItems;
                        jQuery.each(checkedInEvents, function(index) {
                            index % 3 === 0 && (thisIndividualLabelClone = thisIndividualLabel.clone(), eventItems = thisIndividualLabelClone.find(".event-items"), labelSet.push(thisIndividualLabelClone), labelsPer === 1 ? thisIndividualLabelClone.find(".label-number").remove() : thisIndividualLabelClone.find(".label-number").html(Math.floor((index + 1) / 3 + 1) + " of " + labelsPer));
                            var name = this.event.event_room_description != "" ? this.event.event_room_description : this.event.event_name,
                                eventRow = jQuery('<div class="event-item"><span class="event-time">' + this.event.event_time.replace(/\s?(am|pm)/i, "") + '</span><span class="event-major"></span><span class="event-minor"></span></div>');
                            this.event.event_room_description != "" ? (eventRow.find(".event-major").html(this.event.event_room_description), eventRow.find(".event-minor").html(this.event.group_name)) : (eventRow.find(".event-major").html(this.event.group_name), eventRow.find(".event-minor").html(this.event.event_name)), eventItems.append(eventRow)
                        })
                    }
                    for (var i = 0; i < labelCount; i++) $.each(labelSet, function() {
                        printBox.append(this.clone())
                    })
                }
            }), printBox.find(".individual-label:last").addClass("last-page");
            var hasNonStaff = !1;
            printBox.find(".individual-label .code").each(function() {
                if (jQuery(this).html() != "Staff") return hasNonStaff = !0, !1
            }), CCB.needsPickupTag && hasNonStaff ? (this.pickupTag.removeClass("print-no"), this.pickupTag.find(".codeleft").html(CCB.securityCode), this.pickupTag.find(".coderight").html(CCB.securityCode)) : this.pickupTag.addClass("print-no");
            if (this.printNeeded)
                if (jQuery.browser.mozilla) {
                    var printContent = '<link rel="stylesheet" type="text/css" href="' + CCB.resources.cdnLocation + '/css/checkin/checkin_family_detail_print.css">' + "<style>.print-no{display:none;}body{height:0;margin:0;padding:0;}</style>" + '<div id="print-content-only">' + jQuery("#print-content-only").html() + '</div><span id="end-of-print"></span>' + '<script type="text/javascript">' + 'var errorCount=0;var timeoutCount=0;function printLabels(){try{if(timeoutCount<30){if(window.getComputedStyle(document.getElementById("end-of-print"),null).getPropertyValue("display")==="none"){window.print();window.close();}else{setTimeout(function(){timeoutCount++;printLabels();},100);}}else{window.close();}}catch(e){errorCount++;if(errorCount<3){setTimeout(function(){printLables();},100);}else{window.close();}}}printLabels();' + "</script>",
                        printWindow = window.open("", "printWindow");
                    printWindow.document.write(printContent), printWindow.document.close()
                } else if (jQuery.browser.msie) try {
                var PrintCommand = '<object ID="PrintCommandObject" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></object>';
                document.body.insertAdjacentHTML("beforeEnd", PrintCommand), PrintCommandObject.ExecWB(6, 2), PrintCommandObject.outerHTML = ""
            } catch (e) {
                window.print()
            } else window.print();
            return this.printNeeded
        }
    },
    individualEventHelpers = {
        getItemEvents: function(itemRow) {
            var events = [];
            return itemRow.find(".group-event:eq(0)").each(function() {
                events.push(jQuery(this).data("event_id"))
            }), events
        },
        getIndividualEvent: function(itemRow, eventId) {
            var individualTimes = itemRow.data("event-list"),
                self = this,
                individualEvent = null;
            return jQuery.each(individualTimes, function() {
                var individualEvents = this;
                jQuery.each(individualEvents, function() {
                    if (this.event_id == eventId) return individualEvent = this, !1
                })
            }), individualEvent
        },
        buildGroupEvent: function(individualId, individualEvent, event, status) {
            var statusClass = "";
            switch (status) {
                case eventStatus.warning:
                    statusClass = "event-warning";
                    break;
                case eventStatus.checkedIn:
                    statusClass = "event-checked-in";
                    break;
                case eventStatus.checkedOut:
                    statusClass = "event-checked-out";
                    break;
                case eventStatus.pending:
                    statusClass = "event-pending";
                    break;
                case eventStatus.deleted:
                    statusClass = "event-delete";
                    break;
                default:
                    statusClass = ""
            }
            var groupEventDiv = jQuery('<div class="group-event ' + statusClass + " event-" + event.event_id + '" data-event-id="' + event.event_id + '"></div>'),
                name = event.event_room_description != "" ? event.event_room_description : event.event_name,
                title = jQuery('<div class="title"><span class="time">' + event.event_time.replace(/(am|pm)/, "") + '</span><span class="group-name">' + event.group_name + '</span><span class="georgia inline-text">' + name + "</span></div>").appendTo(groupEventDiv),
                hidden = "",
                checkbox = jQuery('<input type="hidden" class="group-event-input" name="ind_event_ids[' + individualId + "][events][" + event.event_id + ']" value="1" />'),
                eventStatusHidden = jQuery('<input type="hidden" class="group-event-status" name="ind_event_ids[' + individualId + "][event_status][" + event.event_id + ']" value="' + status + '" />');
            return typeof individualEvent != "undefined" && individualEvent != null && (individualEvent.not_in_group ? hidden = jQuery('<input type="hidden" class="not-in-group" name="ind_event_ids[' + individualId + "][not_in_this_group][" + event.event_id + ']" value="' + event.group_id + '"/>') : individualEvent.is_leader && (hidden = jQuery('<input type="hidden" name="ind_event_ids[' + individualId + "][room_ratio_leader][" + event.event_id + ']" value="1"/>'))), title.before(hidden).before(eventStatusHidden).before(checkbox), groupEventDiv
        },
        isRoomFull: function(event) {
            var isRoomFull = !1,
                currentAttendance = parseInt(event.current_attendance, 10),
                maxQuantity = parseInt(event.attend_max_quantity, 10);
            return CCB.roomManageActive && maxQuantity > 0 && maxQuantity <= currentAttendance && (isRoomFull = !0), isRoomFull
        },
        isRatioHold: function(event) {
            var isRatioHold = !1,
                roomRatio = parseInt(event.event_room_ratio, 10),
                ratioLeaderCount = parseInt(event.room_ratio_leader_count, 10),
                currentAttendance = parseInt(event.current_attendance, 10);
            return CCB.roomManageActive && roomRatio > 0 && (ratioLeaderCount == 0 || ratioLeaderCount > 0 && roomRatio <= (currentAttendance - ratioLeaderCount) / ratioLeaderCount) && (isRatioHold = !0), isRatioHold
        },
        statusBoxHtml: function(event) {
            var statusBox = "",
                isRoomFull = individualEventHelpers.isRoomFull(event),
                isRatioHold = individualEventHelpers.isRatioHold(event);
            return isRoomFull ? statusBox = jQuery('<div class="status full">Full</div>') : isRatioHold ? statusBox = jQuery('<div class="status ratio-hold">Ratio Hold</div>') : CCB.roomManageActive && event.attend_max_quantity > 0 && (statusBox = jQuery('<div class="status"><span class="quantity georgia">' + event.current_attendance + "/" + event.attend_max_quantity + "</span>")), statusBox
        }
    },
    roomsDialog = {
        initialize: function() {
            var self = this;
            this.modalElement = jQuery("#room-select-dialog"), this.currentModalTop = 0, jQuery(".event-list-trigger:not(.disabled)").each(function() {
                jQuery(this).bind("click", function() {
                    roomsDialog.individualRowSelect(this)
                })
            }), jQuery(".event-list-trigger:not(.disabled)").bind("open", function() {
                roomsDialog.individualRowSelect(this)
            });
            var dialogWidth = 420;
            switch (CCB.checkinTimes.length) {
                case 1:
                    dialogWidth = 420, this.modalElement.find(".modal-content .list-wrapper ul.checkin-times").hide();
                    break;
                default:
                    dialogWidth = 676
            }
            this.modalElement.find(".modal-content .list-wrapper ul.checkin-times").find("li a").bind("click", function(e) {
                e.preventDefault(), e.stopPropagation(), jQuery(this).closest("li").addClass("item-press").siblings("li").removeClass("item-press"), self.modalElement.find("ul.event-column").hide();
                var sectionTime = jQuery(this).data("time"),
                    eventColumn = self.modalElement.find(".event-column[data-time='" + sectionTime + "']");
                eventColumn.find("li:not(.other-events-trigger)").length === 0 && eventColumn.find("li.no-events-for-time").length === 0 && jQuery('<li class="no-events-for-time"><span class="georgia">No events available for this time. (Please visit a manned check-in station for assistance.)</span></li>').appendTo(eventColumn), eventColumn.show()
            }), this.modalElement.find(".modal-content .list-wrapper ul.checkin-times").bind("rooms.dialog.checkin.time.change.selected.event", function(e, time, individualEvent, eventObj) {
                var li = jQuery(this).find("li a[data-time='" + time + "']").closest("li");
                typeof eventObj != "undefined" ? (typeof individualEventObj != "undefined" && li.data("individual-event", individualEventObj), li.data("event", eventObj).find(".sub-title").addClass("row-checked").find(".group-name").html(eventObj.group_name).next(".room-name").html(eventObj.display_name)) : li.removeData("event").removeData("individual-event").find(".sub-title").removeClass("row-checked").find(".group-name").html("").next(".room-name").html("")
            }), this.modalElement.dialog({
                autoOpen: !1,
                modal: !0,
                draggable: !1,
                resizable: !1,
                width: dialogWidth,
                open: function() {
                    jQuery(this).dialog("widget").find(".content-main").addClass("disabled"), jQuery(this).find(".modal-content ul.event-column").find("li.other-events-trigger a").bind("mousedown", function() {
                        jQuery(this).closest("li").addClass("item-press")
                    }).bind("mouseup", function() {
                        jQuery(this).closest("li").removeClass("item-press")
                    }).bind("click", function() {
                        jQuery(this).closest("li").hide();
                        var dialog = self.modalElement.dialog("widget");
                        jQuery(this).closest("ul").find(".other-event").fadeIn();
                        var oh = dialog.outerHeight(),
                            wh = jQuery(window).height(),
                            top = 0;
                        oh < wh && (top = (wh - oh) / 2), self.currentModalTop > top && (self.currentModalTop = top), dialog.animate({
                            top: self.currentModalTop
                        })
                    });
                    var oh = self.modalElement.dialog("widget").outerHeight(),
                        wh = jQuery(window).height();
                    oh < wh && (self.currentModalTop = (wh - oh) / 2), Modernizr.hasEvent("touchstart") ? jQuery(this).find(".modal-content ul.event-column").find("li:not(.disabled,.other-events-trigger) a").each(function() {
                        var trigger = jQuery(this).get(0);
                        new FastButton(trigger, function(trigger) {
                            return function() {
                                roomsDialog.selectDeselectRoom(trigger)
                            }
                        }(trigger), {
                            usePressClass: !1
                        })
                    }) : jQuery(this).find(".modal-content ul.event-column").find("li:not(.disabled,.other-events-trigger) a").bind("mousedown", function() {
                        roomsDialog.selectDeselectRoom(this)
                    }), jQuery(this).find(".modal-content .list-wrapper ul.event-column").find("li a").bind("click", function(e) {
                        e.preventDefault(), e.stopPropagation()
                    }), jQuery(this).find(".modal-content .list-wrapper ul.checkin-times").find("li a[data-time='" + CCB.currentTime + "']").trigger("click"), self.currentState = [], jQuery(this).find(".modal-content .list-wrapper>.event-column").find("li.item-press").each(function() {
                        var event = jQuery(this).data("event");
                        self.currentState.push(event.event_id)
                    }), jQuery(this).find(".modal-content .list-wrapper:eq(0)").bind("rooms.change", function() {
                        self.manageRoomDialogDoneButton()
                    })
                },
                close: function() {
                    var row = jQuery(this).data("individual-row");
                    self.currentState = [], jQuery(this).find(".modal-content .list-wrapper:eq(0)").unbind("rooms.change"), row.find(".group-events").trigger("change"), jQuery(this).find(".list-wrapper ul.event-column li:not(.column-header,.other-events-trigger)").remove(), jQuery(this).find(".list-wrapper ul.event-column li.ui-corner-top, .list-wrapper li.ui-corner-bottom").removeClass("ui-corner-bottom").removeClass("ui-corner-top"), jQuery(this).find(".list-wrapper ul.event-column").find("li.other-events-trigger").hide(), jQuery(this).removeData(["individual-row", "events-copy", "individual-events-copy"]), jQuery(this).find(".checkin-times li").each(function() {
                        jQuery(this).removeData("event").removeData("individual-event").find(".sub-title").removeClass("row-checked").find(".group-name").html("").next(".room-name").html("")
                    })
                },
                buttons: [{
                    text: "Cancel",
                    "class": "default",
                    click: function() {
                        jQuery(this).dialog("close")
                    }
                }, {
                    text: "Done",
                    "class": "content-main",
                    click: function() {
                        if (jQuery(this).dialog("widget").find(".content-main").hasClass("disabled")) return;
                        var self = this,
                            row = jQuery(this).data("individual-row"),
                            events = jQuery(this).data("events-copy");
                        row.find(".group-event:not(.event-checked-out, .event-checked-in, .event-delete)").each(function() {
                            var eventId = jQuery(this).data("event-id"),
                                individualEvent = individualEventHelpers.getIndividualEvent(jQuery(this).closest("div.item"), eventId);
                            individualEvent != null ? individualEvent.is_checked_out || jQuery(this).remove() : jQuery(this).remove()
                        });
                        var individualId = row.data("individual-id"),
                            currentEvents = row.find(".group-event");
                        jQuery(this).find(".list-wrapper ul.event-column li.row:not(.other-events-trigger)").each(function() {
                            var event = jQuery(this).data("event");
                            jQuery.each(CCB.checkinEvents, function() {
                                if (this.event_id == event.event_id) return jQuery.extend(this, event), !1
                            })
                        }), jQuery(this).find(".list-wrapper ul.event-column li.row.item-press:not(.other-events-trigger)").length > 0 ? (jQuery(this).find(".list-wrapper ul.event-column li.row.item-press:not(.other-events-trigger)").each(function() {
                            var individualEvent = jQuery(this).data("individual-event"),
                                event = jQuery(this).data("event");
                            if (individualEvent == null || typeof individualEvent == "undefined") {
                                individualEvent = {
                                    event_id: event.event_id,
                                    not_in_group: !0,
                                    is_leader: !1,
                                    is_sticky_room: !1
                                };
                                var individualEvents = row.data("event-list");
                                individualEvents ? individualEvents[event.event_time] || (individualEvents[event.event_time] = []) : (individualEvents = {}, individualEvents[event.event_time] = []), individualEvents[event.event_time].push(individualEvent), row.data("event-list", individualEvents)
                            }
                            var exists = !1;
                            currentEvents.each(function() {
                                if (jQuery(this).data("event-id") == event.event_id) return exists = !0, jQuery(this).hasClass("event-delete") ? jQuery(this).removeClass("event-delete").addClass("event-checked-in").find(".group-event-status").val(eventStatus.checkedIn) : jQuery(this).hasClass("event-checked-out") && jQuery(this).removeClass("event-checked-out").addClass("event-pending").find(".title span.inline-text:eq(0)").remove().end().find(".group-event-status").val(eventStatus.pending), !1
                            }), exists || row.find(".group-events").append(individualEventHelpers.buildGroupEvent(individualId, individualEvent, event, eventStatus.pending))
                        }), currentEvents.each(function() {
                            var exists = !1,
                                currentEventId = jQuery(this).data("event-id");
                            jQuery(self).find(".list-wrapper ul.event-column li.item-press").each(function() {
                                var individualEvent = jQuery(this).data("individual-event"),
                                    event = jQuery(this).data("event");
                                if (typeof event != "undefined" && currentEventId == event.event_id) return exists = !0, !1
                            });
                            if (!exists)
                                if (jQuery(this).hasClass("event-checked-in")) jQuery(this).removeClass("event-checked-in").addClass("event-delete").find(".group-event-status").val(eventStatus.deleted);
                                else if (jQuery(this).hasClass("event-pending")) {
                                var eventId = jQuery(this).data("event-id"),
                                    individualEvent = individualEventHelpers.getIndividualEvent(jQuery(this).closest("div.item"), eventId);
                                individualEvent != null && individualEvent.is_checked_out && jQuery(this).removeClass("event-pending").addClass("event-checked-out").find(".title").prepend('<span class="georgia inline-text">(checked out)</span>').end().find(".group-event-status").val(eventStatus.checkedOut)
                            }
                        })) : currentEvents.length > 0 && currentEvents.each(function() {
                            if (jQuery(this).hasClass("event-checked-in")) jQuery(this).removeClass("event-checked-in").addClass("event-delete").find(".group-event-status").val(eventStatus.deleted);
                            else if (jQuery(this).hasClass("event-pending")) {
                                var eventId = jQuery(this).data("event-id"),
                                    individualEvent = individualEventHelpers.getIndividualEvent(jQuery(this).closest("div.item"), eventId);
                                individualEvent != null && individualEvent.is_checked_out && jQuery(this).removeClass("event-pending").addClass("event-checked-out").find(".title").prepend('<span class="georgia inline-text">(checked out)</span>').end().find(".group-event-status").val(eventStatus.checkedOut)
                            }
                        }), jQuery(this).dialog("close")
                    }
                }]
            })
        },
        manageRoomDialogDoneButton: function() {
            var eventColumnItems = this.modalElement.find(".modal-content .list-wrapper>.event-column").find("li.item-press"),
                hasChange = !1,
                self = this,
                modalObject = this.modalElement.dialog("widget");
            eventColumnItems.each(function() {
                var event = jQuery(this).data("event"),
                    hasEvent = !1;
                jQuery.each(self.currentState, function() {
                    if (this == event.event_id) return hasEvent = !0, !1
                });
                if (!hasEvent) return hasChange = !0, !1
            }), jQuery.each(self.currentState, function() {
                var event_id = this,
                    hasEvent = !1;
                eventColumnItems.each(function() {
                    var event = jQuery(this).data("event");
                    if (event_id == event.event_id) return hasEvent = !0, !1
                });
                if (!hasEvent) return hasChange = !0, !1
            }), hasChange ? modalObject.find(".content-main:eq(0)").removeClass("disabled") : modalObject.find(".content-main:eq(0)").addClass("disabled")
        },
        individualRowSelect: function(div) {
            var self = roomsDialog,
                item = jQuery(div),
                eventList = item.data("event-list"),
                multipleServices = item.data("multiple-services"),
                eventCount = item.data("event-count");
            if (item.find(".group-event:not(.event-checked-out, .event-checked-in, .event-delete, .event-pending, .event-warning)").length > 0) {
                var groupEvent = item.find(".group-event:not(.event-checked-out, .event-checked-in, .event-delete, .event-pending, .event-warning)");
                groupEvent.addClass("event-pending").find(".group-event-status").val(eventStatus.pending).closest(".group-events").trigger("change");
                var eventId = groupEvent.data("event-id");
                jQuery.each(CCB.checkinEvents, function() {
                    var event = this;
                    if (event.event_id == eventId) return this.current_attendance++, typeof eventList != "undefined" && typeof eventList[this.event_time] != "undefined" && jQuery.each(eventList[this.event_time], function() {
                        if (event.event_id == this.event_id && this.is_leader) return event.room_ratio_leader_count++, !1
                    }), (individualEventHelpers.isRoomFull(event) || individualEventHelpers.isRatioHold(event)) && jQuery(".item .group-event:not(.event-checked-out, .event-delete,.event-pending,.event-checked-in)").each(function() {
                        jQuery(this).data("event-id") == event.event_id && jQuery(this).remove()
                    }), !1
                })
            } else if (CCB.isSelfCheckin && !multipleServices && item.find(".group-event.event-pending").length == 1 && eventCount == 1) {
                var groupEvent = item.find(".group-event.event-pending");
                groupEvent.removeClass("event-pending").find(".group-event-status").val("").closest(".group-events").trigger("change");
                var eventId = groupEvent.data("event-id");
                jQuery.each(CCB.checkinEvents, function() {
                    var event = this;
                    if (event.event_id == eventId) return this.current_attendance--, typeof eventList != "undefined" && typeof eventList[this.event_time] != "undefined" && jQuery.each(eventList[this.event_time], function() {
                        if (event.event_id == this.event_id && this.is_leader) return event.room_ratio_leader_count--, !1
                    }), !1
                })
            } else {
                var contents = self.buildIndividualDialog(jQuery(div).closest(".item"));
                self.modalElement.find(".list-wrapper ul").each(function() {
                    jQuery(this).find("li:not(.column-header):eq(0)").addClass("ui-corner-top"), jQuery(this).find("li:not(.column-header,.other-event-trigger,.other-event)").length == 0 && jQuery(this).find("li.other-events-trigger").addClass("ui-corner-top"), jQuery(this).find("li:not(.column-header,.other-event):eq(0)").addClass("ui-corner-top"), jQuery(this).find("li.other-event").length > 0 ? (jQuery(this).find("li.other-events-trigger").show().addClass("ui-corner-bottom"), jQuery(this).find("li.other-event:last").addClass("ui-corner-bottom")) : jQuery(this).find("li:not(.column-header,.other-events-trigger):last").addClass("ui-corner-bottom")
                }), self.modalElement.data("individual-row", item).dialog("open")
            }
        },
        selectDeselectRoom: function(anchor) {
            var li = jQuery(anchor).closest("li"),
                individualEvent = li.data("individual-event"),
                disabledClass = "",
                statusBox = "",
                event = null,
                sectionTime = li.closest("ul").data("time");
            typeof individualEvent != "undefined" ? event = individualEvent.event : event = li.data("event"), jQuery(anchor).find(".status").remove(), li.hasClass("item-press") ? (li.removeClass("item-press"), this.modalElement.find("ul.checkin-times").trigger("rooms.dialog.checkin.time.change.selected.event", [sectionTime, individualEvent]), event.current_attendance--, typeof individualEvent != "undefined" && individualEvent.is_leader && event.room_ratio_leader_count--) : (this.modalElement.find("ul.checkin-times").trigger("rooms.dialog.checkin.time.change.selected.event", [sectionTime, individualEvent, event]), li.addClass("item-press").siblings(".item-press").each(function() {
                jQuery(this).removeClass("item-press"), jQuery(this).find(".status").remove();
                var otherIndividualEvent = jQuery(this).data("individual-event"),
                    otherEvent = null;
                typeof otherIndividualEvent != "undefined" ? (otherEvent = otherIndividualEvent.event, otherIndividualEvent.is_leader && otherIndividualEvent.event.room_ratio_leader_count--) : otherEvent = jQuery(this).data("event"), otherEvent.current_attendance--, jQuery(this).find("a").append(individualEventHelpers.statusBoxHtml(otherEvent))
            }), event.current_attendance++, typeof individualEvent != "undefined" && individualEvent.is_leader && event.room_ratio_leader_count++, (individualEventHelpers.isRoomFull(event) || individualEventHelpers.isRatioHold(event)) && jQuery(".item .group-event:not(.event-checked-out,.event-delete,.event-pending,.event-checked-in)").each(function() {
                jQuery(this).data("event-id") == event.event_id && jQuery(this).remove()
            })), jQuery(anchor).append(individualEventHelpers.statusBoxHtml(event)), this.modalElement.find(".list-wrapper:eq(0)").trigger("rooms.change")
        },
        buildIndividualDialog: function(individualRow) {
            var self = this;
            this.modalElement.data("events-copy", jQuery.extend(!0, [], CCB.checkinEvents)).data("individual-events-copy", jQuery.extend(!0, {}, individualRow.data("event-list")));
            var eventTimes = this.modalElement.data("individual-events-copy");
            for (var time in eventTimes)
                if (eventTimes.hasOwnProperty(time))
                    for (var index in eventTimes[time]) eventTimes[time].hasOwnProperty(index) && jQuery.each(this.modalElement.data("events-copy"), function() {
                        if (this.event_id == eventTimes[time][index].event_id) return eventTimes[time][index].event = this, !1
                    });
            var individualEvents = eventTimes,
                shownEvents = [],
                currentEvents = individualRow.find(".group-event:not(.event-delete,.event-warning)").map(function(index, element) {
                    return {
                        eventId: jQuery(this).data("event-id"),
                        status: jQuery(this).find(".group-event-status").val()
                    }
                });
            for (var time in individualEvents) {
                var ul = !1;
                this.modalElement.find("ul.event-column").each(function() {
                    if (jQuery(this).data("time") == time) return ul = jQuery(this), !1
                }), ul && jQuery.each(individualEvents[time], function(index, individualEvent) {
                    var originalIndividualEvent = jQuery.extend(!0, {}, individualEvent),
                        isItemPressed = !1,
                        itemPressedClass = "",
                        isCheckedOut = !1,
                        isCheckedIn = !1;
                    shownEvents.push(individualEvent.event_id), currentEvents.length > 0 ? currentEvents.each(function() {
                        if (this.eventId == individualEvent.event_id) return isItemPressed = !0, this.status == eventStatus.pending || this.status == eventStatus.checkedIn ? isCheckedIn = !0 : this.status == eventStatus.checkedOut && (isCheckedOut = !0), !1
                    }) : individualEvent.is_sticky_room && (isItemPressed = !0);
                    if (isCheckedOut) disabledClass = "", itemPressed = "", isItemPressed = !1;
                    else {
                        isItemPressed ? itemPressed = " item-press" : itemPressed = "";
                        var disabledClass = "";
                        individualEventHelpers.isRatioHold(individualEvent.event) && (individualEvent.is_leader || isCheckedIn || (disabledClass = " disabled", itemPressed = "", isItemPressed = !1)), individualEventHelpers.isRoomFull(individualEvent.event) && (isCheckedIn || (disabledClass = " disabled", itemPressed = "", isItemPressed = !1)), currentEvents.length == 0 && isItemPressed && (individualEvent.event.current_attendance++, typeof individualEvent != "undefined" && individualEvent.is_leader && individualEvent.event.room_ratio_leader_count++)
                    }
                    var name = individualEvent.event.event_room_description != "" ? individualEvent.event.event_room_description : individualEvent.event.event_name,
                        row = jQuery('<li class="row' + itemPressed + disabledClass + '"><a href="javascript:void(0)" data-id="' + individualEvent.event_id + '" class="group"><div class="title">' + name + '</div><div class="sub-title">' + individualEvent.event.group_name + "</div></a></li>").data("individual-event", individualEvent).data("event", individualEvent.event);
                    isItemPressed && self.modalElement.find("ul.checkin-times").trigger("rooms.dialog.checkin.time.change.selected.event", [individualEvent.event.event_time, individualEvent, individualEvent.event]), row.find("a").append(individualEventHelpers.statusBoxHtml(individualEvent.event)), ul.find(".other-events-trigger").before(row)
                })
            }
            CCB.isSelfCheckin || jQuery.each(this.modalElement.data("events-copy"), function(i, event) {
                var alreadyShown = !1;
                individualEvents && typeof individualEvents[event.event_time] != "undefined" && jQuery.each(individualEvents[event.event_time], function(j, individualEvent) {
                    if (event.event_id == individualEvent.event_id) return alreadyShown = !0, !1
                });
                if (!alreadyShown) {
                    var ul = !1;
                    self.modalElement.find("ul.event-column").each(function() {
                        if (jQuery(this).data("time") == event.event_time) return ul = jQuery(this), !1
                    });
                    if (ul) {
                        var disabledClass = "";
                        individualEventHelpers.isRatioHold(event) && (disabledClass = " disabled"), individualEventHelpers.isRoomFull(event) && (disabledClass = " disabled");
                        var name = event.event_room_description != "" ? event.event_room_description : event.event_name,
                            row = jQuery('<li class="row' + disabledClass + ' other-event"><a href="javascript:void(0)" data-id="' + event.event_id + '" class="group"><div class="title">' + name + '</div><div class="sub-title">' + event.group_name + "</div></a></li>").data("event", event);
                        row.find("a").append(individualEventHelpers.statusBoxHtml(event)), ul.find(".other-events-trigger").before(row)
                    }
                }
            })
        }
    },
    barcodeDialog = {
        initialize: function() {
            var self = this;
            this.modal = jQuery("#barcode-modal"), jQuery("#header .manage-barcode").click(function(e) {
                e.stopPropagation(), e.preventDefault(), self.modal.dialog("open")
            }), self.modal.dialog({
                autoOpen: !1,
                modal: !0,
                draggable: !1,
                resizable: !1,
                width: 500,
                open: function() {
                    jQuery(this).find("#barcode-number").focus().select()
                },
                close: function() {},
                buttons: [{
                    text: "Cancel",
                    "class": "default",
                    click: function() {
                        jQuery(this).dialog("close"), jQuery(this).find("#barcode-number").val(jQuery(this).data("original-value"))
                    }
                }, {
                    text: "Done",
                    "class": "content-main",
                    click: function(e) {
                        self.modal.find("form:eq(0)").submit()
                    }
                }]
            }), self.modal.find("form:eq(0)").submit(function(e) {
                e.stopPropagation(), e.preventDefault();
                var barcodeNumber = jQuery(this).find("#barcode-number").val();
                barcodeNumber === self.modal.data("original-value") ? self.modal.dialog("close") : jQuery.post("checkin_family_detail.php", jQuery(this).serialize(), function(notice) {
                    notice.good_or_bad == "good" ? (jQuery.gritter.options.position = "top-center", jQuery.gritter.add({
                        title: notice.title,
                        text: notice.text,
                        image: CCB.resources.goodIcon
                    }), barcodeNumber != "" ? jQuery("#header .manage-barcode").html("Edit Barcode") : jQuery("#header .manage-barcode").html("Add Barcode"), self.modal.data("original-value", barcodeNumber), self.modal.dialog("close")) : (jQuery.gritter.options.position = "top-center", jQuery.gritter.add({
                        title: notice.title,
                        text: notice.text,
                        image: CCB.resources.badIcon
                    }))
                }, "json")
            })
        }
    },
    checkinMessageModal = {
        initialize: function() {
            var self = this;
            this.modal = $("#family-message-modal"), $("#header .edit-family-message").click(function(e) {
                e.stopPropagation(), e.preventDefault(), self.modal.dialog("open")
            }), self.modal.dialog({
                autoOpen: !1,
                modal: !0,
                draggable: !1,
                resizable: !1,
                width: 500,
                open: function() {
                    $(this).find(".message").focus().select()
                },
                close: function() {},
                buttons: [{
                    text: "Cancel",
                    "class": "default",
                    click: function() {
                        $(this).dialog("close"), $(this).find(".message").val(self.modal.data("message"))
                    }
                }, {
                    text: "Done",
                    "class": "content-main",
                    click: function(e) {
                        self.modal.find("form:eq(0)").submit()
                    }
                }]
            }), self.modal.find("form:eq(0)").submit(function(e) {
                e.stopPropagation(), e.preventDefault();
                var message = $(this).find(".message").val();
                message === self.modal.data("message") ? self.modal.dialog("close") : jQuery.post("checkin_family_detail.php", jQuery(this).serialize(), function(notice) {
                    notice.good_or_bad == "good" && (message != "" ? $("#header .edit-family-message").text("Edit Message") : jQuery("#header .edit-family-message").html("Add Message"), self.modal.data("message", message), self.modal.dialog("close"))
                }, "json")
            })
        }
    },
    checkinState = {
        initialize: function() {
            jQuery("#header .edit-family").click(function(e) {
                e.preventDefault(), e.stopPropagation();
                var anchor = this;
                jQuery.when(checkinState.saveState(anchor)).then(function() {
                    window.location = jQuery(anchor).attr("href")
                })
            }), CCB.checkinState && CCB.checkinState.length > 0 && (jQuery.each(CCB.checkinState, function() {
                var individual = this,
                    individualRow = jQuery(".items .item.individual-" + individual.individual_id),
                    individualEvents = individualRow.data("event-list"),
                    individualId = individualRow.data("individual-id"),
                    hasOtherThanDeletedItems = !1;
                individualRow.find(".group-event:not(.event-checked-out, .event-checked-in)").remove(), jQuery.each(individual.events, function() {
                    var event = this,
                        eventItem = individualRow.find(".group-event.event-" + event.event_id),
                        checkinEvent = null,
                        individualEvent = individualEventHelpers.getIndividualEvent(individualRow, event.event_id);
                    jQuery.each(CCB.checkinEvents, function() {
                        if (event.event_id == this.event_id) return checkinEvent = this, !1
                    });
                    switch (event.status) {
                        case eventStatus.deleted:
                            eventItem.length > 0 && eventItem.hasClass("event-checked-in") && (eventItem.removeClass("event-checked-in").addClass("event-delete"), eventItem.find(".group-event-status").val(eventStatus.deleted), checkinEvent.current_attendance--, typeof individualEvent != "undefined" && individualEvent != null && individualEvent.is_leader && event.room_ratio_leader_count--);
                            break;
                        case eventStatus.pending:
                            hasOtherThanDeletedItems || (hasOtherThanDeletedItems = !0);
                            if (eventItem.length == 0) {
                                var groupEventDiv = null;
                                individualEventHelpers.isRoomFull(checkinEvent) ? (groupEventDiv = individualEventHelpers.buildGroupEvent(individualId, individualEvent, checkinEvent, eventStatus.warning), jQuery.gritter.options.position = "top-center", jQuery.gritter.add({
                                    title: "Some choices are unavailable",
                                    text: "Some of your previous choices are no longer available. Please review the list and make the desired changes.",
                                    image: CCB.resources.warningIcon
                                })) : individualEventHelpers.isRatioHold(checkinEvent) ? typeof individualEvent != "undefined" && individualEvent != null ? individualEvent.is_leader ? (groupEventDiv = individualEventHelpers.buildGroupEvent(individualId, individualEvent, checkinEvent, eventStatus.pending), checkinEvent.room_ratio_leader_count++, checkinEvent.current_attendance++) : (groupEventDiv = individualEventHelpers.buildGroupEvent(individualId, individualEvent, checkinEvent, eventStatus.warning), jQuery.gritter.options.position = "top-center", jQuery.gritter.add({
                                    title: "Some choices are unavailable",
                                    text: "Some of your previous choices are no longer available. Please review the list and make the desired changes.",
                                    image: CCB.resources.warningIcon
                                })) : (groupEventDiv = individualEventHelpers.buildGroupEvent(individualId, individualEvent, checkinEvent, eventStatus.warning), jQuery.gritter.options.position = "top-center", jQuery.gritter.add({
                                    title: "Some choices are unavailable",
                                    text: "Some of your previous choices are no longer available. Please review the list and make the desired changes.",
                                    image: CCB.resources.warningIcon
                                })) : (groupEventDiv = individualEventHelpers.buildGroupEvent(individualId, individualEvent, checkinEvent, eventStatus.pending), checkinEvent.current_attendance++);
                                if (typeof individualEvent == "undefined" || individualEvent == null) individualEvent = {
                                    event_id: checkinEvent.event_id,
                                    not_in_group: !0,
                                    is_leader: !1,
                                    is_sticky_room: !1
                                }, individualEvents ? individualEvents[checkinEvent.event_time] || (individualEvents[checkinEvent.event_time] = []) : (individualEvents = {}, individualEvents[checkinEvent.event_time] = []), individualEvents[checkinEvent.event_time].push(individualEvent), individualRow.data("event-list", individualEvents);
                                individualRow.find(".group-events").append(groupEventDiv)
                            } else individualEvent != null && individualEvent.is_checked_out && (individualEventHelpers.isRoomFull(checkinEvent) || (individualEventHelpers.isRatioHold(checkinEvent) ? individualEvent.is_leader && (checkinEvent.room_ratio_leader_count++, checkinEvent.current_attendance++, eventItem.removeClass("event-checked-out").addClass("event-pending").find(".title span.inline-text:eq(0)").remove().end().find(".group-event-status").val(eventStatus.pending)) : (checkinEvent.current_attendance++, eventItem.removeClass("event-checked-out").addClass("event-pending").find(".title span.inline-text:eq(0)").remove().end().find(".group-event-status").val(eventStatus.pending))));
                            break;
                        case eventStatus.checkedIn:
                            hasOtherThanDeletedItems || (hasOtherThanDeletedItems = !0);
                            break;
                        case eventStatus.checkedOut:
                            hasOtherThanDeletedItems || (hasOtherThanDeletedItems = !0)
                    }
                }), hasOtherThanDeletedItems ? individualRow.find(".group-events").trigger("change", [individual.label_count]) : individualRow.find(".group-events").trigger("change", [-1])
            }), jQuery(".items .item.other-members").find(".event-delete, .event-pending").length > 0 && jQuery(".show-others-trigger").trigger("click"))
        },
        saveState: function(anchor) {
            var individualRows = jQuery(".items .item"),
                individualsState = [],
                dfd = $.Deferred();
            return individualRows.each(function() {
                var individualRow = jQuery(this),
                    events = [],
                    labelCount = individualRow.find(".label-qty").val();
                individualRow.find(".group-event.event-checked-out, .group-event.event-checked-in, .group-event.event-delete, .group-event.event-pending").each(function() {
                    jQuery(this).hasClass("event-checked-in") ? labelCount > 0 && events.push({
                        event_id: jQuery(this).data("event-id"),
                        status: jQuery(this).find(".group-event-status").val()
                    }) : events.push({
                        event_id: jQuery(this).data("event-id"),
                        status: jQuery(this).find(".group-event-status").val()
                    })
                }), events.length > 0 && individualsState.push({
                    individual_id: individualRow.data("individual-id"),
                    events: events,
                    label_count: labelCount
                })
            }), individualsState.length > 0 ? jQuery.post("checkin_family_detail.php", {
                aj: "1",
                ax: "save_checkin_state",
                individuals: individualsState
            }) : (dfd.resolve(), dfd.promise())
        }
    },
    onScreenKeyboard = {
        initialize: function() {
            var self = this,
                showEvent = "focus";
            navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1 ? showEvent = "click" : nativeKeyboardInhibitor.shouldInhibit && (showEvent = "touchend"), CCB.isSelfCheckin && CCB.onScreenKeyboard && (jQuery("#full-name").keyboard({
                layout: "custom",
                autoAccept: !0,
                usePreview: !1,
                stickyShift: !1,
                openOn: "",
                alwaysOpen: !0,
                stayOpen: !0,
                display: {
                    accept: "Done::Accept the content",
                    meta1: ".?123::Other characters"
                },
                customLayout: {
                    "default": ["q w e r t y u i o p {b}", "a s d f g h j k l {accept}", "{s} z x c v b n m , . {s}", "{meta1} {space} {meta1}"],
                    shift: ["Q W E R T Y U I O P {b}", "A S D F G H J K L {accept}", "{s} Z X C V B N M ! ? {s}", "{meta1} {space} {meta1}"],
                    meta1: ["1 2 3 4 5 6 7 8 9 0 {b}", "- / : ; ( ) $ & @ {accept}", ". , ? ! ' \"", "{meta1} {space} {meta1}"]
                },
                position: {
                    of: window,
                    my: "center bottom",
                    at2: "center bottom",
                    offset: "0 -10"
                }
            }), jQuery("#full-name").bind("change.keyboard", function(e, keyboardObj) {
                var displayText = "";
                typeof keyboardObj != "undefined" && keyboardObj.metaActive === "meta1" ? (displayText = "abc", keyboardObj.options.display.meta1 = "abc:Alpha characters", jQuery(".ui-keyboard-meta1").find("span").html("abc")) : typeof keyboardObj != "undefined" && (displayText = ".?123", keyboardObj.options.display.meta1 = ".?123:Numeric &amp; Special Characters", jQuery(".ui-keyboard-meta1").find("span").html(".?123")), jQuery(".ui-keyboard-meta1").each(function() {
                    var key = jQuery(this).data("key");
                    jQuery(this).data("key", {
                        action: key.action,
                        original: displayText,
                        curTxt: displayText,
                        curNum: key.curNum
                    })
                })
            }).bind("accepted.keyboard", function() {
                self.hideKeyboard()
            }), $("#text-paging-section a").not("#full-name").bind("click", function() {
                self.hideKeyboard()
            }), this.hideKeyboard())
        },
        hideKeyboard: function() {
            if (CCB.isSelfCheckin && CCB.onScreenKeyboard) {
                var keyboardApi = jQuery("#full-name").getkeyboard();
                keyboardApi.$keyboard.hide()
            }
        },
        showKeyboard: function() {
            if (CCB.isSelfCheckin && CCB.onScreenKeyboard) {
                var keyboardApi = jQuery("#full-name").getkeyboard();
                keyboardApi.$keyboard.show(), jQuery("#full-name").trigger("visible.keyboard", [keyboardApi, keyboardApi.el]), nativeKeyboardInhibitor.inhibit()
            }
        }
    };
jQuery(document).ready(function() {
    FastClick.attach(document.body), resetGritterPosition(), !CCB.isSelfCheckin && CCB.checkin_message.length > 0 && (jQuery.gritter.options.position = "top-left", jQuery.gritter.add({
        title: "Family Message",
        text: CCB.checkin_message,
        class_name: "no-print",
        image: CCB.resources.cdnLocation + "/images/icons_fw/favorites_32.png",
        sticky: !0
    }), resetGritterPosition()), !CCB.isSelfCheckin && CCB.birthday_message.length > 0 && (jQuery.gritter.options.position = "top-left", jQuery.gritter.add({
        title: "Birthday",
        text: CCB.birthday_message,
        class_name: "no-print",
        image: CCB.resources.cdnLocation + "/images/icons_fw/favorites_32.png",
        sticky: !0
    }), resetGritterPosition());
    if (Modernizr.hasEvent("touchstart")) {
        if (jQuery(".show-others-trigger").length > 0) {
            var trigger = jQuery(".show-others-trigger").get(0);
            new FastButton(trigger, function(trigger) {
                return function() {
                    jQuery(trigger).hide(), jQuery(".other-members").fadeIn()
                }
            }(trigger))
        }
    } else jQuery(".show-others-trigger").click(function() {
        jQuery(this).hide(), jQuery(".other-members").fadeIn()
    });
    jQuery("#family-checkin-form").delegate(".item:not(.disabled)", "mousedown", function() {
        jQuery(this).addClass("item-press")
    }).delegate(".item:not(.disabled)", "mouseup", function() {
        jQuery(this).removeClass("item-press")
    });
    var trigger = jQuery("#header .back").get(0),
        originalBackButtonText = jQuery(trigger).html();
    jQuery(".group-events").change(function() {
        jQuery(".group-event.event-pending, .group-event.event-delete").length > 0 ? jQuery(trigger).html("Cancel") : jQuery(trigger).html(originalBackButtonText)
    }), Modernizr.hasEvent("touchstart") ? new FastButton(trigger, function(trigger) {
        return function() {
            jQuery(".group-event.event-delete, .group-event.event-pending").length > 0 ? setTimeout(function() {
                window.location = jQuery(trigger).attr("href")
            }, 50) : window.location = jQuery(trigger).attr("href")
        }
    }(trigger), {
        usePressClass: !1
    }) : jQuery("#header .back").click(function(e) {
        e.stopPropagation(), e.preventDefault(), jQuery(".group-event.event-delete, .group-event.event-pending").length > 0 ? window.location = jQuery(this).attr("href") : window.location = jQuery(this).attr("href")
    });
    var isTouchDevice = Modernizr.hasEvent("touchstart") || navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1;
    nativeKeyboardInhibitor.shouldInhibit = isTouchDevice && CCB.onScreenKeyboard, roomsDialog.initialize(), barcodeDialog.initialize(), finishCheckin.initialize(), individualLabels.initialize(), checkinState.initialize(), onScreenKeyboard.initialize(), checkinMessageModal.initialize(), jQuery(".overlay:not(.ignore)").inFieldLabels(), nativeKeyboardInhibitor.inhibit()
})