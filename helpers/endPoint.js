export const apiGetErrorMessage = () => {
  return '/api/v1/grocery/reference/error-message';
};

//return '/v3/1f60df97-3bd6-421c-a3b1-73f8540e2c09';
export const apiCsvLaporanBulanan = () => {
  return '/api/v2/history/export-csv/cashier-transaction-recap';
};
export const apiCsvRekapSaldo = () => {
  return '/api/v2/history/export-csv/transfer-recap';
};
export const apiCsvRekapTransaksi = () => {
  return '/api/v2/history/export-csv/transaction-recap';
};
export const apiCsvRekapKomisi = () => {
  return '/api/v2/history/export-csv/commission-recap';
};
export const apiCsvHistoryQris = () => {
  return '/api/v2/history/export-csv/history-qris';
};

//return '/v3/59376fd0-4114-4468-a760-5c77a06271bc';
export const apiPdfTransaksi = () => {
  return '/api/v2/history/export-pdf/transaction';
};
export const apiPdfTranferSaldo = () => {
  return '/api/v2/history/export-pdf/transfer';
};
export const apiPdfSimpanBukti = () => {
  return '/api/v2/history/export-pdf/proof-of-transaction';
};
export const apiPdfQris = () => {
  return '/api/v2/history/export-pdf/qris';
};
export const apiPdfHistoryGrosir = () => {
  return '/v3/59376fd0-4114-4468-a760-5c77a06271bc';
};
export const apiPdfStrukGrosir = () => {
  return '/v3/59376fd0-4114-4468-a760-5c77a06271bc';
};

// ========================
// === Auth ===
// ========================
export const apiRequestOtp = () => {
    return '/api/v2/auth/login/otp';
};
export const apiCekPin = () => {
    return '/api/v2/auth/login/verify/check-pin';
};
export const apiVerifyOtp = (check) => {
  if (check === 'login') {
    return '/api/v2/auth/login/verify';
  } else {
    return '/api/v2/auth/register/verify';
  }
};
export const apiUserRegister = () => {
  return '/api/v2/auth/register';
};
export const apiUserLogout = () => {
  return '/api/v2/auth/logout';
};
export const apiUserRequestOtpPin = () => {
  return '/api/v2/auth/forget-pin/otp';
};

// ========================
// === Utility ===
// ========================
export const apiUtilitySlider = () => {
  return '/api/v2/utility/slider';
};
export const apiUtilityReference = () => {
  return '/api/v2/utility/reference';
};
export const apiUtilityRewards = () => {
  return '/api/v2/utility/reward';
};
export const apiUtilityConfig = () => {
  return '/api/v2/utility/config';
};
export const apiUtilityNotification = () => {
  return '/api/v2/utility/notification';
};
export const apiUtilityNotificationDetail = () => {
  return '/api/v2/utility/notification-detail';
};
export const apiUtilityComment = () => {
  return '/api/v2/utility/addrate';
};
export const apiUtilityDownloadBanner = () => {
  return '/api/v2/utility/promotion';
};
export const apiUtilityTopPoint = () => {
  return '/api/v2/utility/toppoint';
};
export const apiUtilityNews = () => {
  return '/api/v2/utility/news';
};

// ========================
// === User ===
// ========================
export const apiUserVerifyOtpPin = () => {
  return '/api/v2/user/verify-otp';
};
export const apiUserResetPin = () => {
  return '/api/v2/user/reset-pin';
};
export const apiUserValidPin = () => {
  return '/api/v2/user/valid-pin';
};
export const apiUserTanpaPin = () => {
  return '/api/v2/user/check-pin';
};
export const apiUserChangePin = () => {
  return '/api/v2/user/change-pin';
};
export const apiUserBalance = () => {
  return '/api/v2/user/balance';
};
export const apiUserProfile = () => {
  return '/api/v2/user/profile';
};

export const apiMutasiSummary = () => {
  return '/api/v2/history/mutation-summary';
};
export const apiMutasiDebit = () => {
  return '/api/v2/history/mutation-debit-list';
};
export const apiMutasiCredit = () => {
  return '/api/v2/history/mutation-credit-list';
};

export const apiGetProfileImage = () => {
  return '/api/v2/user/avatar';
}
export const apiUpdateProfileImage = () => {
  return '/api/v2/user/update-avatar'
}
export const apiUserTrxNetwork = () => {
  return '/api/v2/user/trx-network';
};
export const apiUserLocation = () => {
  return '/api/v2/user/geolocation';
};
export const apiUserRegisterKyc = () => {
  return '/api/v2/user/register-kyc';
};
export const apiUserProfileChange = () => {
  return '/api/v2/user/update-profile';
};
export const apiUserReferalUpdate = () => {
  return '/api/v2/user/update-referal';
};
export const apiUserChangeProfile = () => {
  return '/api/v2/user/update-profile';
};
export const apiUserReferal = () => {
  return '/api/v2/user/referal';
};
export const apiUserCheck = () => {
  return '/api/v2/user/check-user';
};
export const apiUserCheckPin = () => {
  return '/api/v2/user/check-pin';
};
export const apiUserCheckKyc = () => {
  return '/api/v2/user/check-kyc';
};
export const apiUserUpdateFcm = () => {
  return '/api/v2/user/update-fcm';
};
export const apiUserGetPhone = () => {
  return '/v3/d2729587-b49a-4ecf-bdae-da9512788d21';
  //return '/api/v2/user/get-phone-numbe';
};

// ========================
// === History ===
// ========================
export const apiHistoryInbox = () => {
  return '/api/v2/history/inbox';
};
export const apiHistoryTransaction = () => {
  return '/api/v2/history/transaction';
};
export const apiHistoryTransferSaldo = () => {
  return '/api/v2/history/latest-transfer';
};
export const apiHistoryAllTransaction = () => {
  return '/api/v2/history/all-transaction';
};
export const apiHistoryTransactionDetail = () => {
  return '/api/v2/history/transaction-detail';
};
export const apiHistoryAllTrxDetail = () => {
  return '/api/v2/history/transaction-by-id';
};
export const apiHistoryTransactionDescription = () => {
  return '/api/v2/history/transaction-description';
};
export const apiHistoryMutation = () => {
  return '/api/v2/history/mutation';
};
export const apiHistoryTransfer = () => {
  return '/api/v2/history/transfer';
};
export const apiHistoryTopup = () => {
  return '/api/v2/history/topup';
};
export const apiHistoryReward = () => {
  return '/api/v2/history/reward';
};
export const apiHistoryRekapSaldo = () => {
  return '/api/v2/history/transfer-recap';
};
export const apiHistoryRekapKomisi = () => {
  return '/api/v2/history/commission-recap';
};
export const apiHistoryRekapTransaksi = () => {
  return '/api/v2/history/transaction-recap';
};
export const apiHistoryCheckReceipt = () => {
  return '/api/v2/history/check-receipt';
};
export const apiHistoryPrintReceipt = () => {
  return '/api/v2/history/print-receipt';
};
export const apiHistoryDonation = () => {
  return '/api/v2/history/donation';
};

//belum
export const apiHistoryAlfamart = () => {
  return '/api/v2/history/topup-alfa-pending';
};
export const apiHistoryAlfamartPaid = () => {
  return '/api/v2/history/print-receipt';
};
export const apiHistoryIndomaret = () => {
  return '/api/v2/history/topup-indomaret-pending';
};
export const apiHistoryIndomaretPaid = () => {
  return '/api/v2/history/print-receipt';
};

// ========================
// === Topup ===
// ========================
export const apiTopupEwallet = () => {
  return '/api/v2/nicepay/ewallet';
};
export const apiTopupAlfamart = () => {
  return '/api/v2/nicepay/alfa';
};
export const apiTopupIndomaret = () => {
  return '/api/v2/nicepay/indo';
};
export const apiTopupTransferBank = () => {
  return '/api/v2/transaction/topup';
};
export const apiTransactionGetListVa = () => {
  return '/api/v2/nicepay/list-va';
};
export const apiTransactionCreateVa = () => {
  return '/api/v2/nicepay/create-va';
};

// ========================
// === Product ===
// ========================
export const apiProductPdam = () => {
  return '/api/v2/product/pdam'; //check paging
};
export const apiProductOperator = () => {
  return '/api/v2/product/operator';
};
export const apiProductPulsa = () => {
  return '/api/v2/product/pulsa';
};
export const apiProductDetail = () => {
  return '/api/v2/product/detail';
};

// ========================
// === Pricelist ===
// ========================
export const apiPricePulsa = () => {
  return '/api/v2/product/pricelist/pulsa';
};
export const apiPricePaketData = () => {
  return '/api/v2/product/pricelist/data';
};
export const apiPricePaketSms = () => {
  return '/api/v2/product/pricelist/sms';
};
export const apiPriceToken = () => {
  return '/api/v2/product/pricelist/token';
};
export const apiPricePpob = () => {
  return '/api/v2/product/pricelist/ppob';
};
export const apiPriceGame = () => {
  return '/api/v2/product/pricelist/game';
};
export const apiPriceTopup = () => {
  return '/api/v2/product/pricelist/topup';
};
export const apiPriceLainnya = () => {
  return '/api/v2/product/pricelist/lainnya';
};
export const apiPriceVoucher = () => {
  return '/api/v2/product/pricelist/voucher_data';
};

// ========================
// === Transaction ===
// ========================
export const apiTransactionPay = () => {
  return '/api/v2/transaction/pay';
};
export const apiTransactionCheck = () => {
  return '/api/v2/transaction/check';
};
export const apiTransactionTopup = () => {
  return '/api/v2/transaction/topup';
};
export const apiTransactionCheckUser = () => {
  return '/api/v2/transaction/check-user';
};
export const apiTransactionTransferSaldo = () => {
  return '/api/v2/transaction/transfer';
};
export const apiTransactionWithdraw = () => {
  return '/api/v2/transaction/withdraw';
};
export const apiTransactionRedeem = () => {
  return '/api/v2/transaction/redeem';
};
export const apiTransactionAdditional = () => {
  return '/api/v2/transaction/additional-trx-info';
};

// ========================
// === Downline ===
// ========================
export const apiDownlineRegister = () => {
  return '/api/v2/downline/register';
};
export const apiDownlineMarkup = () => {
  return '/api/v2/downline/update-markup';
};
export const apiDownlineList = () => {
  return '/api/v2/downline/list';
};
export const apiDownlineCount = () => {
  return '/api/v2/downline/count';
};

// ========================
// === Area ===
// ========================
export const apiAreaProvince = () => {
  return '/api/area/province';
};
export const apiAreaDistrict = () => {
  return '/api/area/district';
};
export const apiAreaCity = () => {
  return '/api/area/city';
};

// ========================
// === Cashier ===
// ========================
export const apiCashierSumMontly = () => {
  return '/api/v2/cashier/transaction/sum-monthly'; //done --------------
};
export const apiCashierAddTransaksi = () => {
  return '/api/v2/cashier/transaction/add-transaction'; //done --------------
};
export const apiCashierViewTransaksi = () => {
  return '/api/v2/cashier/transaction/view-transaction';
};
export const apiCashierEditTransaksi = () => {
  return '/api/v2/cashier/transaction/edit-transaction';
};
export const apiCashierDeleteTransaksi = () => {
  return '/api/v2/cashier/transaction/delete-transaction';
};
export const apiCashierTarikUntung = () => {
  return '/api/v2/cashier/transaction/withdraw-profit';
};
export const apiCashierInputPengeluaran = () => {
  return '/api/v2/cashier/transaction/input-disbursement';
};
export const apiCashierReset = () => {
  return '/api/v2/cashier/transaction/reset-transaction'; //done --------------
};
export const apiCashierViewMemberLoan = () => {
  return '/api/v2/cashier/loan/view-member-loan';
};
export const apiCashierAddMemberLoan = () => {
  return '/api/v2/cashier/loan/add-member';
};
export const apiCashierUpdateMemberLoan = () => {
  return '/api/v2/cashier/loan/update-member';
};
export const apiCashierDeleteMemberLoan = () => {
  return '/api/v2/cashier/loan/delete-member';
};
export const apiCashierViewLoan = () => {
  return '/api/v2/cashier/loan/view-loan'; //:id
};
export const apiCashierViewDataLoan = () => {
  return '/api/v2/cashier/loan/view-data-loan'; //:id
};
export const apiCashierAddDataLoan = () => {
  return '/api/v2/cashier/loan/add-data-loan';
};
export const apiCashierViewPiutang = () => {
  return '/api/v2/cashier/loan/view-piutang-loan';
};
export const apiCashierByIDMemberLoan = () => {
  return '/api/v2/cashier/loan/loan-member'; //:id
};
export const apiCashierViewSetHarga = () => {
  return '/api/v2/cashier/product-price/view-set-harga';
};
export const apiCashierAddSetHarga = () => {
  return '/api/v2/cashier/product-price/add-set-harga';
};
export const apiCashierEditHarga = () => {
  return '/api/v2/cashier/product-price/add-set-harga';
};
export const apiCashierViewSetAdmin = () => {
  return '/api/v2/cashier/admin-fee/view-set-harga';
};
export const apiCashierAddSetAdmin = () => {
  return '/api/v2/cashier/admin-fee/add-set-harga';
};

// ========================
// === Lainnya ===
// ========================
export const apiTarikDanaBank = () => {
  return '/api/v2/cashier/download-banner';
};
export const apiTarikDanaAction = () => {
  return '/api/v2/transaction/pay';
};
export const apiTargetTransaksiRiwayat = () => {
  return '/api/v2/history/target/history';
};
export const apiTargetTransaksi = () => {
  return '/api/v2/history/target';
};

// ========================
// === Qris ===
// ========================
export const apiQrisUser = () => {
  return '/api/v2/qris';
};
export const apiQrisCheck = () => {
  return '/api/v2/qris/check';
};
export const apiQrisRegister = () => {
  return '/api/v2/qris/register';
};
export const apiQrisWitdraw = () => {
  return '/api/v2/qris/withdraw';
};
export const apiQrisBalance = () => {
  return '/api/v2/qris/balance';
};
export const apiQrisHistory = () => {
  return '/api/v2/qris/history';
};

// ========================
// === Paylater ===
// ========================
export const apiPaylaterCheck = () => {
  return '/api/v2/paylater/check';
};
export const apiPaylaterBalance = () => {
  return '/api/v2/paylater/balance';
};
export const apiTransactionPaylater = () => {
  return '/api/v2/paylater/withdraw';
};

// ========================
// === Pesawat ===
// ========================
export const apiPesawatAirport = () => {
  return '/api/v2/pegasus/airport';
  // return '/v3/d09d0d87-2405-4755-896c-4c170e096523';
};
export const apiPesawatList = () => {
  return '/api/v2/pegasus/air-available';
  //return '/v3/de7cac1a-cd55-49a4-b9a0-f32f1b5583cf';
};
export const apiPesawatPrice = () => {
  return '/api/v2/pegasus/air-price';
  //return '/v3/27b71cf0-4515-4fc8-beec-d5e6c37bbf92';
};
export const apiPesawatBooking = () => {
  return '/api/v2/pegasus/air-book';
  //return '/v3/e4208dca-65b0-48ae-aa33-3bad8f2a56f9';
};
export const apiPesawatHistory = () => {
  return '/api/v2/pegasus/history';
  //return '/v3/cfd8c669-5612-45fc-ac67-e77f309d01d7';
};
export const apiPesawatRule = () => {
  return '/api/v2/pegasus/air-fare-rule';
  //return '/v3/27b71cf0-4515-4fc8-beec-d5e6c37bbf92';
};
export const apiPesawatCountry = () => {
  return '/api/v2/pegasus/citizenship';
  //return '/v3/27b71cf0-4515-4fc8-beec-d5e6c37bbf92';
};

// ========================
// === Pelni ===
// ========================
export const apiPelniDestination = () => {
  return '/api/v2/pelni/destination';
  //return '/v3/1b4bdb66-e9b5-42c1-a6ef-e2bb291f711a';
};
export const apiPelniOrigin = () => {
  return '/api/v2/pelni/origin';
  // return '/v3/b192cece-e274-421d-b844-1c2d1214c065';
};
export const apiPelniSchedule = () => {
  return '/api/v2/pelni/schedule-complete';
  //return '/v3/90c645ba-a987-4598-982f-5f8727b5abbd';
};
export const apiPelniScheduleAvb = () => {
  return '/api/v2/pelni/check-avb';
  // return '/v3/f8678416-ad99-4ef2-abd2-53ccf120cea3';
};
export const apiPelniBooking = () => {
  return '/api/v2/pelni/booking';
  // return '/v3/15603766-44b8-4e97-9378-a2d618cb2647';
};
export const apiHistoryPelni = () => {
  return '/api/v2/pelni/history';
  // return '/v3/bd6484b8-2455-47d9-879c-e2a7cee2188e';
};

// ========================
// === Grosir ===
// ========================
export const apiGrosirCategory = (queryParam) => {
  return '/api/v1/grocery/category' + queryParam;
  // return '/v3/1b40575f-0471-42ba-8955-20d595e99d27';
};
export const apiGrosirCategoryHome = () => {
  return '/api/v1/grocery/category/home';
  // return '/v3/1b40575f-0471-42ba-8955-20d595e99d27';
};
export const apiGrosirProductBySlug = (slug) => {
  return '/api/v1/grocery/product/detail/' + slug;
  // return '/v3/24e50dbd-de74-42a1-9418-5a2c74d9f1c8';
};
export const apiGrosirProductPromo = () => {
  return '/api/v1/grocery/product/promo';
  // return '/v3/409d52a6-d8a2-45b7-a117-db9b39a0a481';
};
export const apiGrosirSlider = () => {
  return '/api/v1/grocery/content/slider';
  // return '/v3/72676526-6983-4e4e-a086-0d260ccc9759';
};
export const apiGrosirHistory = (queryParam) => {
  return '/api/v1/grocery/order' + queryParam;
  // return (
  //   '/v3/fc60ceb3-00d7-48f1-bfaa-bbf3554b8cc2' +
  //   `?status=${status}&start_date=${start_date}&end_date=${end_date}&invoice=${invoice}&page=${page}`
  // );
};
export const apiGrosirHistoryDetail = (queryParam) => {
  return '/api/v1/grocery/order/detail' + queryParam;
  //return '/v3/88945df2-290f-4579-8cc8-c659653c4a47' + `?invoice=${invoice}`;
};
export const apiGrosirPopup = () => {
  return '/api/v1/grocery/content/popup';
  // return '/v3/35d67f22-95a4-4701-999e-fe55abbd4cb7';
};
export const apiGrosirProduct = (queryParam) => {
  return '/api/v1/grocery/product' + queryParam;
  // return '/v3/66ba61c1-a694-429e-a589-be408c16ae9f';
  // return '/v3/3e98e43d-0201-4def-934c-1c27242cd6b6';
};
export const apiGrosirProductHighlight = () => {
  return '/api/v1/grocery/product/highlight';
  // return '/v3/17dc7dd1-07d3-41a4-886c-1a6c1714fcac';
};
export const apiGrosirCart = () => {
  return '/api/v1/grocery/cart';
  // return '/v3/619fa0a9-ee5c-48d0-9d38-471ae9ffa01c';
};
export const apiGrosirOrderAccepted = () => {
  return '/api/v1/grocery/order/accepted';
  //return '/v3/bb1bdfc7-3ed5-41b4-bc4f-defb389c8591';
};
export const apiGrosirAddToCart = () => {
  return '/api/v1/grocery/cart';
  // return '/v3/5b091ad8-4117-46a6-84dd-b339f543a83f';
};
export const apiGrosirUpdateCart = () => {
  return '/api/v1/grocery/cart';
  //return '/v3/5b091ad8-4117-46a6-84dd-b339f543a83f';
};
export const apiGrosirDeleteCart = () => {
  return '/api/v1/grocery/cart';
  // return '/v3/5b091ad8-4117-46a6-84dd-b339f543a83f';
};
export const apiGrosirClearCart = () => {
  return '/api/v1/grocery/cart';
  //return '/v3/fc3823cb-61de-4a22-8aff-9921092ba54f';
};
export const apiGrosirGetAllAdress = () => {
  return '/api/v1/grocery/address';
  // return '/v3/fddecd7c-8232-453d-9901-a2aaac39b625';
};
export const apiGrosirAddAdress = () => {
  return '/api/v1/grocery/address';
  //return '/v3/5b091ad8-4117-46a6-84dd-b339f543a83f';
};
export const apiGrosirUpdateAdress = (id) => {
  return '/api/v1/grocery/address/' + id;
  // return '/v3/5b091ad8-4117-46a6-84dd-b339f543a83f';
};
export const apiGrosirDeleteAdress = (id) => {
  return '/api/v1/grocery/address/' + id;
  //return '/v3/5b091ad8-4117-46a6-84dd-b339f543a83f';
};
export const apiGrosirGetShipping = () => {
  return '/api/v1/grocery/shipping';
  // return '/v3/315eb4e7-7a6d-4614-aa29-bfaf7ddf4703';
};
export const apiGrosirGetShippingPrice = () => {
  return '/api/v1/grocery/shipping';
  //return '/v3/ebfe365c-5644-4f64-ac2d-ee6d2de76b50';
};
export const apiGrosirPayment = () => {
  return '/api/v1/grocery/order';
  //return '/v3/97635084-53f4-41b4-9a72-32ba8c5ca31f';
};
export const apiGrosirPaymentInquiry = () => {
  return '/api/v1/grocery/inquiry';
  // return '/v3/5b091ad8-4117-46a6-84dd-b339f543a83f';
};
export const apiGrosirPostAccepted = () => {
  return '/api/v1/grocery/order/accepted';
};
export const apiGrosirComplain = () => {
  return '/api/v1/grocery/complain';
  //return '/v3/bb1bdfc7-3ed5-41b4-bc4f-defb389c8591';
};
export const apiGrosirGetComplain = (queryParam) => {
  return '/api/v1/grocery/complain' + queryParam;
  // return (
  //   '/v3/39afeebd-b95a-4e1d-823e-c4751d57328a' +
  //   `?invoice=${invoice}&page=${page}`
  // );
};
export const apiGrosirReplyComplain = () => {
  return '/api/v1/grocery/complain/reply';
  // return '/v3/1881b515-31a7-41be-9e2e-9469aaef99f0';
};
export const apiGrosirDoneComplain = () => {
  return '/api/v1/grocery/complain/end';
  //return '/v3/1881b515-31a7-41be-9e2e-9469aaef99f0';
};
export const apiGrosirLocationCheck = () => {
  return '/api/v1/grocery/location/check';
  //return '/v3/7c71aa0d-a4a1-4462-aa28-f8ae96a60c82';
};
export const apiGetGrosirStatus = () => {
  return '/api/v1/grocery/reference/transaction-status';
};
export const apiGrosrCod = () => {
  return '/v3/955b6321-9791-4646-8fdb-e1ad514b44fb';
  return '/api/v1/grocery/get-nearby-outlet';
};

// ========================
// === Kereta ===
// ========================
export const apiKeretaHistory = () => {
  // return '/history/booking';
  return '/api/v2/mmbc/train/history';
};
export const apiKeretaList = () => {
  // return '/kereta/list';
  return '/api/v2/mmbc/train/shedule';
};
export const apiKeretaGetPrice = () => {
  // return '/kereta/GetPrice';
  return '/api/v2/mmbc/train/price';
};
export const apiKeretaPostPayment = () => {
  // return '/kereta/postpayment'
  return '/api/v2/mmbc/train/book';
};
export const apiKeretaGetStasiun = () => {
  // return '/kereta/getStasiun'
  return '/api/v2/mmbc/train/station';
};
