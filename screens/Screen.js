// global
import City from './area/City';
import District from './area/District';
// area
import Province from './area/Province';
import Bussiness from './auth/Bussiness';
import ChangePinLogin from './auth/ChangePinLogin';
import Intro from './auth/Intro';
import Login from './auth/Login';
import LoginVerify from './auth/LoginVerify';
import OtpLogin from './auth/OtpLogin';
import Pendapatan from './auth/Pendapatan';
import ChooseOtp from './auth/ChooseOtp'
// auth
import PinLogin from './auth/PinLogin';
import Register from './auth/Register';
import RegisterKyc from './auth/RegisterKyc';
import AddTransaction from './cashier/AddTransaction';
import CatatChoose from './cashier/CatatChoose';
import CatatHutang from './cashier/CatatHutang';
import CatatHutangSup from './cashier/CatatHutangSup';
import CatatSuccess from './cashier/CatatSuccess';
import CatatSuccessSup from './cashier/CatatSuccessSup';
import DaftarHutang from './cashier/DaftarHutang';
import DaftarHutangSup from './cashier/DaftarHutangSup';
import DaftarPenghutang from './cashier/DaftarPenghutang';
import DaftarPenghutangSup from './cashier/DaftarPenghutangSup';
import DetailHutang from './cashier/DetailHutang';
import DetailHutangSup from './cashier/DetailHutangSup';
import AddPin from './auth/AddPin'
import UserBlok from './auth/UserBlok'
import ConfirmPin from './auth/ConfirmPin'
// cashier
import Cashier from './cashier/Index';
import LaporanBulanan from './cashier/LaporanBulanan';
import PilihPenghutang from './cashier/PilihPenghutang';
import PilihPenghutangSup from './cashier/PilihPenghutangSup';
import Bantuan from './global/Bantuan';
import CetakPay from './global/CetakPay';
import CetakPreview from './global/CetakPreview';
import CetakPreviewTransfer from './global/CetakPreviewTransfer';
import CetakStruk from './global/CetakStruk';
import Chat from './global/Chat';
import DownloadBanner from './global/DownloadBanner';
import Home from './global/Home';
import Hubungi from './global/Hubungi';
import LoketChange from './global/LoketChange';
import Maintenance from './global/Maintenance';
import MaintenanceKyc from './global/MaintenanceKyc';
import News from './global/News';
import Notifikasi from './global/Notifikasi';
import NotifikasiDetail from './global/NotifikasiDetail';
import Peduli from './global/Peduli';
import Pesan from './global/Pesan';
import PesanDetail from './global/PesanDetail';
import QrCode from './global/QrCode';
import RateSuccess from './global/RateSuccess';
import Rewards from './global/Rewards';
import RewardsSuccess from './global/RewardsSuccess';
import ScanQr from './global/ScanQr';
import ScanQrPln from './global/ScanQrPln';
import TarikDana from './global/TarikDana';
import TarikDanaBank from './global/TarikDanaBank';
import TarikDanaDetail from './global/TarikDanaDetail';
import TarikDanaSuccess from './global/TarikDanaSuccess';
import TopPoint from './global/TopPoint';
// history
import Riwayat from './history/Riwayat';
import RiwayatDetail from './history/RiwayatDetail';
import RiwayatMutasi from './history/RiwayatMutasi';
import RiwayatReward from './history/RiwayatReward';
import RiwayatTopup from './history/RiwayatTopup';
import RiwayatAllTrx from './history/RiwayatAllTrx';
import RiwayatDetailAllTrx from './history/RiwayatDetailAllTrx';
import RiwayatBayarTagihan from './history/RiwayatBayarTagihan';
import RiwayatTopupAlfa from './history/RiwayatTopupAlfa';
import RiwayatTopupDetail from './history/RiwayatTopupDetail';
import RiwayatTopupIndo from './history/RiwayatTopupIndo';
import RiwayatTopupVa from './history/RiwayatTopupVa';
import RiwayatTransfer from './history/RiwayatTransfer';
import Downline from './keagenan/Downline';
import DownlineDetail from './keagenan/DownlineDetail';
import DownlineNew from './keagenan/DownlineNew';
// keagenan
import DownlineRegister from './keagenan/DownlineRegister';
import Referal from './keagenan/Referal';
import TargetTransaksi from './keagenan/TargetTransaksi';
import TransferSaldo from './keagenan/TransferSaldo';
import TransferSaldoSuccess from './keagenan/TransferSaldoSuccess';
import AngsuranKredit from './paybills/AngsuranKredit';
import AngsuranKreditProduk from './paybills/AngsuranKreditProduk';
import BayarTv from './paybills/BayarTv';
import BayarTvProduk from './paybills/BayarTvProduk';
import BpjsScreen from './paybills/BpjsScreen';
import Bpjs from './paybills/Bpjs';
import BpjsKerja from './paybills/BpjsKerja';
import Donasi from './paybills/Donasi';
import DonasiDetail from './paybills/DonasiDetail';
import DonasiNominal from './paybills/DonasiNominal';
import Finance from './paybills/Finance';
import FinanceProduk from './paybills/FinanceProduk';
import HpPasca from './paybills/HpPasca';
import HpPascaProduk from './paybills/HpPascaProduk';
import KartuKredit from './paybills/KartuKredit';
import KartuKreditProduk from './paybills/KartuKreditProduk';
import Pbb from './paybills/Pbb';
import PbbProduk from './paybills/PbbProduk';
import Pdam from './paybills/Pdam';
import PdamProduk from './paybills/PdamProduk';
import Pertagas from './paybills/Pertagas';
import PertagasToken from './paybills/PertagasToken';
import PertagasTokenProduk from './paybills/PertagasTokenProduk';
import Pgn from './paybills/Pgn';
//paybills
import Pln from './paybills/Pln';
import PlnToken from './paybills/PlnToken';
import PlnTokenProduk from './paybills/PlnTokenProduk';
import Samsat from './paybills/Samsat';
import SamsatProduk from './paybills/SamsatProduk';
import Telkom from './paybills/Telkom';
import TvKabelTagihan from './paybills/TvKabelTagihan';
import TvKabelTagihanDetail from './paybills/TvKabelTagihanDetail';
import TvKabelVoucher from './paybills/TvKabelVoucher';
import TvKabelVoucherDetail from './paybills/TvKabelVoucherDetail';
import Zakat from './paybills/Zakat';
import ZakatDetail from './paybills/ZakatDetail';
// payment
import Confirm from './payment/Confirm';
import Success from './payment/Success';
import PriceListGame from './pricelist/PriceListGame';
import PriceListLainnya from './pricelist/PriceListLainnya';
import PriceListPaketData from './pricelist/PriceListPaketData';
import PriceListPaketSms from './pricelist/PriceListPaketSms';
import PriceListPpob from './pricelist/PriceListPpob';
// pricelist
import PriceListPulsa from './pricelist/PriceListPulsa';
import PriceListToken from './pricelist/PriceListToken';
import PriceListTopup from './pricelist/PriceListTopup';
import PriceListVoucher from './pricelist/PriceListVoucher';
// qris
import Qris from './qris/Qris';
import QrisImage from './qris/QrisImage';
import QrisRegister from './qris/QrisRegister';
import QrisSuccess from './qris/QrisSuccess';
import Digipos from './refillable/Digipos';
import DigiposDetail from './refillable/DigiposDetail';
import EMoney from './refillable/EMoney';
import EMoneyDetail from './refillable/EMoneyDetail';
import PaketData from './refillable/PaketData';
import PaketDataDetail from './refillable/PaketDataDetail';
import PaketSms from './refillable/PaketSms';
import PaketSmsDetail from './refillable/PaketSmsDetail';
// refillable
import Pulsa from './refillable/Pulsa';
import PulsaDetail from './refillable/PulsaDetail';
import Roaming from './refillable/Roaming';
import RoamingDetail from './refillable/RoamingDetail';
import Streaming from './refillable/Streaming';
import StreamingDetail from './refillable/StreamingDetail';
import Wifiid from './refillable/Wifiid';
// rekap
import RekapKomisi from './rekap/RekapKomisi';
import RekapSaldo from './rekap/RekapSaldo';
import RekapTransaksi from './rekap/RekapTransaksi';
// topup
import Topup from './topup/Topup';
import TopupAlfamartDone from './topup/TopupAlfamartDone';
import TopupDone from './topup/TopupDone';
import TopupEwalletDone from './topup/TopupEwalletDone';
import TopupIndomaretDone from './topup/TopupIndomaretDone';
import TopupPaylater from './topup/TopupPaylater';
import TopupQris from './topup/TopupQris';
import TopupVa from './topup/TopupVa';
import TopupVaDone from './topup/TopupVaDone';
import ChangePin from './users/ChangePin';
import Pin from './users/Pin';
import PinForm from './users/PinForm';
import Printer from './users/Printer';
// users
import Profile from './users/Profile';
import ProfileChange from './users/ProfileChange';
import ProfileKycRegister from './users/ProfileKycRegister';
import VoucherData from './voucher/VoucherData';
import VoucherDataDetail from './voucher/VoucherDataDetail';
import MutasiIn from './users/MutasiIn'
import TakeFoto  from './users/TakeFoto';
// voucher
import VoucherDiskon from './voucher/VoucherDiskon';
import VoucherDiskonBelajar from './voucher/VoucherDiskonBelajar';
import VoucherDiskonDetail from './voucher/VoucherDiskonDetail';
import VoucherGame from './voucher/VoucherGame';
import VoucherGameDetail from './voucher/VoucherGameDetail';
import VoucherGameLainnya from './voucher/VoucherGameLainnya';
import VoucherTv from './voucher/VoucherTv';
import VoucherTvDetail from './voucher/VoucherTvDetail';
import SaldoTransfer from './global/SaldoTransfer'

export {
  Home,
  Peduli,
  Chat,
  Hubungi,
  Pesan,
  PesanDetail,
  RateSuccess,
  Notifikasi,
  NotifikasiDetail,
  News,
  Rewards,
  RewardsSuccess,
  CetakStruk,
  CetakPreview,
  CetakPreviewTransfer,
  CetakPay,
  Bantuan,
  LoketChange,
  DownloadBanner,
  TarikDana,
  TarikDanaBank,
  TarikDanaDetail,
  TarikDanaSuccess,
  ScanQr,
  ScanQrPln,
  QrCode,
  TopPoint,
  Maintenance,
  MaintenanceKyc,
  SaldoTransfer,
  // end global
  //kategory menu uwang

  //kategory menu uwang
  //area
  Province,
  District,
  City,
  //end area
  // cashier
  Cashier,
  LaporanBulanan,
  CatatChoose,
  CatatHutang,
  PilihPenghutang,
  DetailHutang,
  CatatSuccess,
  CatatHutangSup,
  PilihPenghutangSup,
  DetailHutangSup,
  CatatSuccessSup,
  DaftarHutang,
  DaftarHutangSup,
  DaftarPenghutang,
  DaftarPenghutangSup,
  AddTransaction,
  //end cashier
  // auth
  PinLogin,
  OtpLogin,
  ChangePinLogin,
  Intro,
  Login,
  LoginVerify,
  Register,
  RegisterKyc,
  Bussiness,
  Pendapatan,
  ChooseOtp,
  AddPin,
  UserBlok,
  ConfirmPin,
  //end auth
  // users
  Profile,
  ProfileChange,
  MutasiIn,
  ProfileKycRegister,
  Printer,
  ChangePin,
  Pin,
  PinForm,
  TakeFoto,
  //end users
  // History
  Riwayat,
  RiwayatDetail,
  RiwayatTopup,
  RiwayatTopupDetail,
  RiwayatTopupAlfa,
  RiwayatTopupIndo,
  RiwayatBayarTagihan,
  RiwayatTopupVa,
  RiwayatAllTrx,
  RiwayatDetailAllTrx,
  RiwayatMutasi,
  RiwayatTransfer,
  RiwayatReward,
  // end History
  // topup
  Topup,
  TopupDone,
  TopupQris,
  TopupVa,
  TopupVaDone,
  TopupAlfamartDone,
  TopupIndomaretDone,
  TopupEwalletDone,
  TopupPaylater,
  // end topup
  // qris
  Qris,
  QrisImage,
  QrisSuccess,
  QrisRegister,
  // qris
  // payment
  Confirm,
  Success,
  //end payment
  // refillable
  Pulsa,
  PulsaDetail,
  PaketData,
  PaketDataDetail,
  PaketSms,
  PaketSmsDetail,
  EMoney,
  EMoneyDetail,
  Digipos,
  DigiposDetail,
  Wifiid,
  Streaming,
  StreamingDetail,
  Roaming,
  RoamingDetail,
  //end refillable
  //paybills
  Pln,
  PlnToken,
  PlnTokenProduk,
  Pdam,
  PdamProduk,
  BpjsScreen,
  Bpjs,
  BpjsKerja,
  Telkom,
  HpPasca,
  HpPascaProduk,
  Finance,
  FinanceProduk,
  TvKabelVoucher,
  TvKabelVoucherDetail,
  TvKabelTagihan,
  TvKabelTagihanDetail,
  Pgn,
  Pertagas,
  PertagasToken,
  PertagasTokenProduk,
  Samsat,
  SamsatProduk,
  Pbb,
  PbbProduk,
  AngsuranKredit,
  AngsuranKreditProduk,
  KartuKredit,
  KartuKreditProduk,
  Zakat,
  ZakatDetail,
  Donasi,
  DonasiDetail,
  DonasiNominal,
  BayarTv,
  BayarTvProduk,
  //end paybills
  // keagenan
  DownlineRegister,
  Downline,
  DownlineNew,
  DownlineDetail,
  Referal,
  TargetTransaksi,
  TransferSaldo,
  TransferSaldoSuccess,
  //end keagenan
  // rekap
  RekapKomisi,
  RekapTransaksi,
  RekapSaldo,
  //end rekap
  // pricelist
  PriceListPulsa,
  PriceListPaketData,
  PriceListPaketSms,
  PriceListGame,
  PriceListTopup,
  PriceListPpob,
  PriceListToken,
  PriceListLainnya,
  PriceListVoucher,
  //end pricelist
  // voucher
  VoucherDiskon,
  VoucherDiskonBelajar,
  VoucherDiskonDetail,
  VoucherTv,
  VoucherTvDetail,
  VoucherData,
  VoucherDataDetail,
  VoucherGame,
  VoucherGameLainnya,
  VoucherGameDetail,
  //end voucher
  // grosir
  //end grosir
};
