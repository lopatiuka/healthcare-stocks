(function () {
    window.intgrtnI18n = {};
    window.intgrtnI18n.getLanguage = function (language) {
        switch (language) {
            case "mx":
            case "cl":
            case "co":
            case "ar":
            case "uy":
            case "cr":
            case "ec":
            case "pa":
            case "pe":
            case "ve":
                language = "es";
        }

        return language;
    };

    window.intgrtnI18n.showDataTags = function () {
        $(".js-intgrtn-i18n-styles").remove();
    };

    window.intgrtnI18n.translateAll = function (language) {
        window.intgrtn.store('language', language);
        language = window.intgrtnI18n.getLanguage(language);

        window.intgrtnI18n.getTranslations(language, function (response) {
            window.intgrtnI18n.translateDataTags(response);
            window.intgrtnI18n.translateIntgrtnOptions(response);
            window.intgrtnI18n.showDataTags();
        }, function () {
            window.intgrtnI18n.showDataTags();
        });
    };

    window.intgrtnI18n.getTranslations = function (language, onSuccess, onError) {
        if (typeof onSuccess == "undefined") {
            onSuccess = function () { };
        }
        if (typeof onError == "undefined") {
            onError = function () { };
        }
        if (!window.availableLanguages) {
            console.error("Set window.availableLanguages");
        }
        if (window.availableLanguages && window.availableLanguages.includes(language + '.json')) {
            $.ajax({
                url: 'translations/' + language + '.json',
                method: 'GET',
            }).done(function (response) {
                onSuccess(response);
            }).fail(function (response) {
                onError(response);
            });
        } else {
            $.ajax({
                url: 'translations/default.json',
                method: 'GET',
            }).done(function (response) {
                onSuccess(response);
            }).fail(function (response) {
                onError(response);
            });
        }
    };

    window.intgrtnI18n.translateDataTags = function (response) {
        $("[data-i18n]").each(function () {
            var t = $(this).attr("data-i18n");
            switch ($(this).prop("tagName")) {
                case "INPUT":
                    t || (t = $(this).attr("placeholder"));
                    $(this).attr("placeholder", response[t]);
                    break;
                default:
                    t || (t = $(this).text()), $(this).text(response[t])
            }
        });
    }

    window.intgrtnI18n.translateIntgrtnOptions = function (response) {
        window.intgrtn.setOptions({
            forms: {
                signup: {
                    placeholders: {
                        password: response.hasOwnProperty('Password') ? response['Password'] : "Password",
                    },
                    fields: {
                        phone: {
                            errors: {
                                required: response.hasOwnProperty('Phone is required.') ? response['Phone is required.'] : "Phone is required",
                                onlyDigits: response.hasOwnProperty('Phone number should contain only digits') ? response['Phone number should contain only digits'] : "Phone number should contain only digits",
                            },
                        },
                        password: {
                            errors: {
                                required: response.hasOwnProperty('Password is required.') ? response['Password is required.'] : "Password is required.",
                                minLength: response.hasOwnProperty('Password should be at least {{passwordMinLength}} characters.') ? response['Password should be at least {{passwordMinLength}} characters.'] : "Password should be at least {{passwordMinLength}} characters.",
                                maxLength: response.hasOwnProperty('Password should be at least {{passwordMaxLength}} characters.') ? response['Password should be at least {{passwordMaxLength}} characters.'] : "Password should be at least {{passwordMaxLength}} characters.",
                                pattern: response.hasOwnProperty('Password should contain at least 1 lowercase, 1 uppercase and 1 number without special characters. (Example: 123Asd).') ? response['Password should contain at least 1 lowercase, 1 uppercase and 1 number without special characters. (Example: 123Asd).'] : "Password should contain at least 1 lowercase, 1 uppercase and 1 number without special characters. (Example: 123Asd).",
                            },
                            tooltip: response.hasOwnProperty('Password should contain at least 1 lowercase, 1 uppercase and 1 number without special characters. <strong>Example: 123Abc</strong>') ? response['Password should contain at least 1 lowercase, 1 uppercase and 1 number without special characters. <strong>Example: 123Abc</strong>'] : "Password should contain at least 1 lowercase, 1 uppercase and 1 number without special characters. <strong>Example: 123Abc</strong>",
                        }
                    },
                    buttons: {
                        submit: {
                            text: response.hasOwnProperty('Open Account With') ? response['Open Account With'] : "Open Account With"
                        }
                    },
                },
                optin: {
                    placeholders: {
                        firstName: response.hasOwnProperty('First Name') ? response['First Name'] : "First Name",
                        lastName: response.hasOwnProperty('Last Name') ? response['Last Name'] : "Last Name",
                        email: response.hasOwnProperty('Email') ? response['Email'] : "Email",
                    },
                    buttons: {
                        submit: {
                            text: response.hasOwnProperty('Join Community') ? response['Join Community'] : "Join Community"
                        }
                    },
                    fields: {
                        name: {
                            errors: {
                                required: response.hasOwnProperty('Name is required.') ? response['Name is required.'] : "Name is required.",
                                onlyLetters: response.hasOwnProperty('Name should be at least {{nameMinLength}} characters.') ? response['Name should be at least {{nameMinLength}} characters.'] : "Name should be at least {{nameMinLength}} characters.",
                            },
                        },
                        firstName: {
                            errors: {
                                required: response.hasOwnProperty('First name is required.') ? response['First name is required.'] : "First name is required.",
                                pattern: response.hasOwnProperty('Only letters are allowed.') ? response['Only letters are allowed.'] : "Only letters are allowed.",
                                minLength: response.hasOwnProperty('First name should be at least {{firstNameMinLength}} characters.') ? response['First name should be at least {{firstNameMinLength}} characters.'] : "First name should be at least {{firstNameMinLength}} characters.",
                            },
                        },
                        lastName: {
                            errors: {
                                required: response.hasOwnProperty('Last name is required.') ? response['Last name is required.'] : "Last name is required.",
                                pattern: response.hasOwnProperty('Only letters are allowed.') ? response['Only letters are allowed.'] : "Only letters are allowed.",
                                minLength: response.hasOwnProperty('Last name should be at least {{lastNameMinLength}} characters.') ? response['Last name should be at least {{lastNameMinLength}} characters.'] : "Last name should be at least {{lastNameMinLength}} characters.",
                            },
                        },
                        email: {
                            errors: {
                                required: response.hasOwnProperty('Email is required.') ? response['Email is required.'] : "Email is required.",
                                pattern: response.hasOwnProperty('Email is invalid.') ? response['Email is invalid.'] : "Email is invalid.",
                            },
                        },
                    }
                }
            }
        }, true);
    }

    window.intgrtnI18n.translatePasswordErrors = function (language) {
        window.intgrtn.store('language', language);
        language = window.intgrtnI18n.getLanguage(language);
        if (window.availableLanguages.includes(language + '.json')) {
            $.ajax({
                url: 'js/languageJson/password-translation.json',
                method: 'GET'
            }).done(function (response) {
                document.dispatchEvent(new CustomEvent("translationsLoaded", {
                    detail: response
                }));
                var translations = response.data;

                $("[data-i18n]").each(function () {
                    var t = $(this).attr("data-i18n");
                    switch ($(this).prop("tagName")) {
                        case "INPUT":
                            t || (t = $(this).attr("placeholder"));
                            $(this).attr("placeholder", translations[t]);
                            break;
                        default:
                            t || (t = $(this).text()), $(this).text(translations[t])
                    }
                });
            });
        }
    }

    setTimeout(function () {
        window.intgrtnI18n.showDataTags();
    }, 3000);
}());