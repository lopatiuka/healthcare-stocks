var waitIntgrtn = setInterval(function () {
    if (!window.intgrtn) {
        return false;
    }
    clearInterval(waitIntgrtn);
    var brokerName = 'this broker';
    var brokerResponse = null;
    var translationResponse = null;
    var formElements = [];
    var terms = '#';
    var privacy = '#';
    var risk = '#';
    var gdpr = '#';
    var footerRiskDisclaimerWrapper = $('.js-risk-disclaimer');

    window.intgrtn.events.on("get.project.details.success", function (response) {
        let countryCode = response.data.client.location.countryIsoCode;
        document.getElementById("location").innerText = response.data.client.location.country + " RESIDENTS";
        document.getElementById("flag").src = "flags/special/" + countryCode.toLowerCase() + ".png"
        var language = window.intgrtn.lookup("language", true, countryCode.toLowerCase());
        if (window.intgrtn.lookup("language")) {
            window.intgrtnI18n.getTranslations(window.intgrtn.lookup("language"), function (response) {
                translationResponse = response;
                appendCheckboxOptin();
            });
        }
    });

    window.intgrtnI18n.getTranslations(window.intgrtn.lookup("language"), function (response) {
        translationResponse = response;
        appendCheckbox();
        appendCheckboxOptin();
    });

    window.intgrtn.getBrokers({}, function (response) {
        brokerResponse = response;
        if (window.intgrtn.lookup("bID", true) && brokerResponse.data.items.length > 0) {
            brokerResponse.data.items.forEach(function (broker) {
                if (broker.advertiserAccountProjectHash == window.intgrtn.lookup("bID", true)) {
                    brokerName = broker.advertiserName;
                }
                if (broker.advertiserAccountProjectHash == "WHk" && window.intgrtn.lookup("bID", true) == "WHk") { //trade360
                    terms = 'https://www.trade360.com/en-gb/legal/terms-and-conditions/';
                    privacy = 'https://www.trade360.com/en-gb/legal/privacy-policy/';
                    risk = 'https://www.trade360.com/en-gb/legal/risk-disclosure/';
                    gdpr = 'https://www.trade360.com/en-gb/legal/privacy-policy/';
                    footerRiskDisclaimerWrapper.text('CFDs are leveraged products that incur a high level of risk and can result in the loss of all your capital and may therefore not be suitable for all investors. You should not risk more than you are prepared to lose. Before deciding to trade, please ensure you understand the risks involved, take the level of your experience into consideration and seek independent advice if necessary. We strictly do not provide investment advice. To read our full risk disclosure statement, please click here. The Company does not offer its service to residents of certain jurisdictions such as: Australia, New Zealand, Canada, Iran, North Korea and Belgium. USA nationals are not accepted regardless of the country of residence. The information on this site is not intended for distribution to, or use by any person in any country where such distribution or use would be contrary to the local law or regulation, or to any person under the age of 18. It is the responsibility of the visitors to this site to ascertain the terms of and comply with all local law or regulation.\n' +
                        'Trade360 is a trade name of Crowd Tech Ltd, authorised and regulated by the Cyprus Securities and Exchange Commission with licence number 202/13, and registered office at 116 Gladstonos, M. Kyprianou House, 3rd & 4th Floors, 3032, Limassol, Cyprus.');
                } else if (broker.advertiserAccountProjectHash == "VHk" && window.intgrtn.lookup("bID", true) == "VHk") { //EuropeFX
                    terms = 'https://europefx.com/license-regulation-terms/legal-documents/';
                    privacy = 'https://europefx.com/license-regulation-terms/legal-documents/';
                    risk = 'https://europefx.com/misc/docs/risk-disclosure/EN_MaxiFlex_Risk-disclosure-policy.pdf?v=5e6a6036911fb';
                    gdpr = 'https://europefx.com/license-regulation-terms/legal-documents/';
                    footerRiskDisclaimerWrapper.text('CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. 79.97% of retail investor accounts lose money when trading CFDs with this provider. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money. We highly recommend that you do not invest more money than you can afford to lose to avoid significant financial problems in the case of losses. Please make sure you define the maximum risk acceptable for yourself. You can find more details about risk here. Please be advised that EUROPEFX is not responsible for the results of your Forex/CFD’s trading. The only person responsible for profits or losses is yourself. You should not consider any market information, educational and analytical material as trading advice that defines your trading actions but purely as educational market material. Please be advised that EUROPEFX shall not be liable for any errors in quotes and trading platform software errors. EUROPEFX does not offer its services to residents of USA, Iran, Cuba, Crimea, ​ Sudan, Syria, New Zealand, United Kingdom, North Korea as well as some other additional jurisdictions. EUROPEFX.com is owned and operated by MAXIFLEX LTD. MAXIFLEX LTD, is registered as a Cyprus Investment Firm (CIF) with the registration number HE327484 and licensed by the Cyprus Securities and Exchange Commission (CySEC) under license number 258/14.');
                }
            });
            $(".js-footer-broker-name").text(brokerName);
        }
        appendCheckbox();
    });

    function appendCheckbox() {
        if (!brokerResponse) {
            return false;
        }
        if (!translationResponse) {
            return false;
        }
        if (formElements.length === 0) {
            return false;
        }

        formElements.forEach(function (element) {
            if ($(element).find(".js-checkboxes-holder").length > 0) {
                return false;
            }

            $(element).find('.intgrtn-btn-submit').append(" " + brokerName);
            $(element).find('.intgrtn-btn-submit').append('<i class="fa fa-user-plus" aria-hidden="true"></i>').prop('disabled', true);
            $('\t\t\t\t\t\t\t<div class="checkboxes js-checkboxes-holder">\n' +
                '\t\t\t\t\t\t\t\t<div class="custom-checkbox"><label class="switch"><input type="checkbox" value="" checked><span class="slider round"></span></label><p data-i18n>By checking this box you agree to open an account with <span class="broker_name">' + brokerName + '</span></p></div>\n' +
                '\t\t\t\t\t\t\t\t<div class="custom-checkbox"><label class="switch"><input type="checkbox" value="" checked><span class="slider round"></span></label><p data-i18n>By checking this box you agree to our <span class="broker_name">' + brokerName + '</span> <a href="' + terms + '" target="_blank"><span data-i18n="">Terms</span></a>, <a href="' + privacy + '" target="_blank"><span data-i18n="">Privacy</span></a> &amp; <a href="' + gdpr + '" target="_blank"><span data-i18n="">Spam Disclaimer</span></a> </p></div>\n' +
                '\t\t\t\t\t\t\t\t<div class="custom-checkbox"><label class="switch"><input type="checkbox" value="" checked><span class="slider round"></span></label><p data-i18n>By checking this box you approve that you read the <span class="broker_name">' + brokerName + '</span> <a href="' + risk + '" target="_blank"><span data-i18n="">Risk Warning</span></a> <span data-i18n="sub-text"></span></p></div>\n' +
                '\t\t\t\t\t\t\t</div>').insertBefore($(element).find(".intgrtn-btn-submit-holder"));
            $(element).find('input[type="checkbox"]').change(function () {
                if ($(element).find('input[type="checkbox"]:checked').length === $(element).find('input[type="checkbox"]').length) {
                    $(element).find('.intgrtn-btn-submit').prop('disabled', false);
                } else {
                    $(element).find('.intgrtn-btn-submit').prop('disabled', true);
                }
            });
        });
        setStepInnerText();
        window.intgrtnI18n.translateDataTags(translationResponse);
    }

    window.intgrtn.events.on('form.optin.success', function () {
        $('.gtd-form-step-1').addClass('hidden');
        var signupFormSelector = $('.gtd-form-step-2').removeClass('hidden');

        signupFormSelector.toArray().forEach(function (element) {
            window.intgrtn.generateSignupForm({onSuccess: {autoRedirect: true}}, element);
            if ($(element).find('.intgrtn-form-signup')) {
                formElements.push(element);
                appendCheckbox();
                $(element).find('.intgrtn-btn-submit').prop('disabled', false );

            }
        });
    });

    window.intgrtn.events.on('parse.data.tags.form.optin.success', function (element) {
        formElements.push(element);
        appendCheckboxOptin();
    });

    function appendCheckboxOptin() {
        if (!translationResponse) {
            return false;
        }

        if (formElements.length === 0) {
            return false;
        }

        formElements.forEach(function (element) {
            if ($(element).find(".js-checkboxes-holder").length > 0) {
                return false;
            }

            $(element).find('.intgrtn-btn-submit').append('<i class="fa fa-key" aria-hidden="true"></i>').prop('disabled', true);
            $('\t\t\t\t\t\t\t<div class="checkboxes js-checkboxes-holder">\n' +
                '\t\t\t\t\t\t\t\t<div class="custom-checkbox"><label class="switch"><input type="checkbox" value=""><span class="slider round"></span></label><p data-i18n>By checking this box you agree to open an account with <span class="broker_name">' + brokerName + '</span></p></div>\n' +
                '\t\t\t\t\t\t\t\t<div class="custom-checkbox"><label class="switch"><input type="checkbox" value=""><span class="slider round"></span></label><p data-i18n>By checking this box you agree to our <a href="https://traders.expert/terms-conditions/" target="_blank" data-i18n>Terms</a>, <a href="https://traders.expert/privacy-policy/" target="_blank" data-i18n>Privacy</a><span data-i18n> & </span><a href="https://traders.expert/spam-disclaimer/" data-i18n target="_blank">Spam Disclaimer</a> </p></div>\n' +
                '\t\t\t\t\t\t\t\t<div class="custom-checkbox"><label class="switch"><input type="checkbox" value=""><span class="slider round"></span></label><p data-i18n>By checking this box you agree to our <a href="https://traders.expert/privacy-policy/" target="_blank" data-i18n>GDPR</a> <span data-i18n>terms</span></p></div>\n' +
                '\t\t\t\t\t\t\t</div>').insertBefore($(element).find(".intgrtn-btn-submit-holder"));
            $(element).find('input[type="checkbox"]').change(function () {
                if ($(element).find('input[type="checkbox"]:checked').length === $(element).find('input[type="checkbox"]').length) {
                    $(element).find('.intgrtn-btn-submit').prop('disabled', false);
                } else {
                    $(element).find('.intgrtn-btn-submit').prop('disabled', true);
                }
            });

            setStepInnerText();
        });
        window.intgrtnI18n.translateDataTags(translationResponse);
    }

    function setStepInnerText() {
        $("#form-step").text( function(){
            return $('.gtd-form-step-1').hasClass('hidden') ? "Step 2" : "Step 1";
        });
    }
}, 10);