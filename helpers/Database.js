import SQLite from 'react-native-sqlite-storage';
SQLite.DEBUG(false); // setting false to production
SQLite.enablePromise(true);

const database_name = 'topindoexample8.db';
const database_version = '1.0';
const database_displayname = 'topindoexample8';
const database_size = 500000;

export default class Database {
  initDB() {
    let db;
    return new Promise((resolve) => {
      SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size,
      )
        .then((DB) => {
          db = DB;
          db.transaction((tx) => {
            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS provinces (province_id text PRIMARY KEY, province_name text)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS stations (code text PRIMARY KEY, location text)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS cities (city_id text PRIMARY KEY, province_id text, city_name text, type text, postal_code text)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS districts (district_id text PRIMARY KEY, province_id text, city_id text, district_name text)',
            );

            // tx.executeSql(
            //   "CREATE TABLE IF NOT EXISTS pricelists (reseller_id text, tipe text, id text PRIMARY KEY, operator_id text, operator_image text, operator_name text, product_code text, product_name text, product_image text, product_price text, product_avail text)"
            // );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS recap_balance (transactionId text, dateTransaction text, reseller_id text, idReseller text PRIMARY KEY, nameReseller text, totalAmount text)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS recap_comission (id integer PRIMARY KEY, transactionId text, reseller_id text, dateTransaction text, description text, totalAmount text)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS recap_transaction (transactionId text, reseller_id text, productCode text PRIMARY KEY, totalAmount text, totalTransaction text, dateTransaction text)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS downline (reseller_id text, idReseller text PRIMARY KEY, nameReseller text, markup text, markup_real integer, balance text, balanceReal integer)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS inbox (id_message integer PRIMARY KEY, reseller_id text, image text, title text, message text, date text)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS history_transaction (transactionId text PRIMARY KEY, reseller_id text, dateTransaction text, productCode text, phone text, price text, priceReal text, serialNumber text, imgUrl text, productName text, status text)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS history_mutation (reseller_id text, waktu text, keterangan text, saldo text,totalsaldo text)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS history_transfer (reseller_id text, waktu text, iddownline text, namareseller text,dana text)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS sliders (id integer PRIMARY KEY, image text)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS news (id integer PRIMARY KEY, title text, description text, image text, date text)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS member_loan (id_member_loan INTEGER PRIMARY KEY AUTOINCREMENT, idreseller text, name text, phone text, address text)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS data_loan (id_data_loan INTEGER PRIMARY KEY AUTOINCREMENT, idreseller text, id_member_loan integer, title text, amount text,type integer)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS barang (id_barang INTEGER PRIMARY KEY AUTOINCREMENT, idreseller text, nama text, harga_modal text, harga_jual text, satuan text, stok text)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS cart_jualan (id_cart INTEGER PRIMARY KEY AUTOINCREMENT, idreseller text, id_barang text, nama text, harga_modal text, harga_jual text, qty text, satuan text, stok text, tanggal DATETIME DEFAULT CURRENT_TIMESTAMP)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS set_harga_produk (id_harga INTEGER PRIMARY KEY AUTOINCREMENT, idreseller text UNIQUE, kodeproduk text UNIQUE, harga_jual text)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS transaksi (id_transaksi INTEGER PRIMARY KEY AUTOINCREMENT, idtrx text UNIQUE, idreseller text, nama text, stok text, satuan text, harga_modal text, harga_jual text, qty text, type_barang text, tanggal text)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS favorite_number (id INTEGER PRIMARY KEY AUTOINCREMENT, idreseller text, produk text, number text)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS profile_login (id INTEGER PRIMARY KEY AUTOINCREMENT, status text)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS profile_balance (id INTEGER PRIMARY KEY AUTOINCREMENT, balanceReal integer, balance text, point text, iduser text, name text)',
            );

            tx.executeSql(
              'CREATE TABLE IF NOT EXISTS notification (id INTEGER PRIMARY KEY AUTOINCREMENT, total text, idReseller text)',
            );
          })
            .then(() => {
              //log
            })
            .catch((error) => {});

          resolve(db);
        })
        .catch((error) => {});
    });
  }

  openDatabases() {
    let db;
    return new Promise((resolve) => {
      SQLite.openDatabase(
        database_name,
        database_version,
        database_displayname,
        database_size,
      )
        .then((DB) => {
          db = DB;
          resolve(db);
        })
        .catch((error) => {});
    });
  }

  closeDatabase(db) {
    if (db) {
      db.close()
        .then((status) => {})
        .catch((error) => {
          this.errorCB(error);
        });
    } else {
    }
  }

  createDatabase() {
    return new Promise((resolve) => {
      this.initDB()
        .then((db) => {
          resolve(db);
        })
        .catch((err) => {});
    });
  }

  // PROVINCE
  viewProvinces() {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'select * from provinces order by province_name asc',
              [],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  addProvinces(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            for (var i = 0; i < data.length; i++) {
              tx.executeSql(
                'INSERT INTO `provinces` (`province_id`, `province_name`) VALUES (?, ?);',
                [data[i].province_id, data[i].province_name],
              ).then(([tx, results]) => {
                resolve(results);
              });
            }
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }
  // END PROVINCE

  // CITIES
  viewCities() {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'select * from cities order by city_name asc limit 1',
              [],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  viewCitiesById(id) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'select * from cities where province_id = ? order by city_name asc ',
              [id],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  addCities(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            for (var i = 0; i < data.length; i++) {
              tx.executeSql(
                'INSERT INTO `cities` (`city_id`, `province_id`, `city_name`, `type`, `postal_code`) VALUES(?, ?, ?, ?, ?);',
                [
                  data[i].city_id,
                  data[i].province_id,
                  data[i].city_name,
                  data[i].type,
                  data[i].postal_code,
                ],
              ).then(([tx, results]) => {
                resolve(results);
              });
            }
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }
  // END CITIES

  // DISTRICTS
  viewDistricts() {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'select * from districts order by district_name asc limit 1',
              [],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  viewDistrictsById(id) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'select * from districts where city_id = ? order by district_name asc',
              [id],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  addDistricts(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            for (var i = 0; i < data.length; i++) {
              tx.executeSql(
                'INSERT INTO `districts` (`district_id`, `province_id`, `city_id`, `district_name`) VALUES (?, ?, ?, ?);',
                [
                  data[i].district_id,
                  data[i].province_id,
                  data[i].city_id,
                  data[i].district_name,
                ],
              ).then(([tx, results]) => {
                resolve(results);
              });
            }
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }
  // END DISTRICTS

  // STATIONS
  viewStations() {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'select * from stations order by location asc',
              [],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  addStations(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            for (var i = 0; i < data.length; i++) {
              tx.executeSql(
                'INSERT INTO `stations` (`code`, `location`) VALUES (?, ?);',
                [data[i].code, data[i].location],
              ).then(([tx, results]) => {
                resolve(results);
              });
            }
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }
  // END STATIONS

  // LOAN
  viewPiutangLoan(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'select SUM(d.amount) as total from member_loan m inner join data_loan d ON m.id_member_loan = d.id_member_loan where d.idreseller = ? group by m.id_member_loan order by d.id_data_loan desc;',
              [data.idreseller],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  viewDataLoan(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            let resPerPage = parseInt(2); // results per page
            let page = parseInt(data.page) || 1; // Page
            page = (page - 1) * resPerPage;
            tx.executeSql(
              'select m.id_member_loan, m.name, d.amount, m.address, m.phone, SUM(d.amount) as total from member_loan m inner join data_loan d ON m.id_member_loan = d.id_member_loan where d.idreseller = ? group by m.id_member_loan order by d.id_data_loan desc limit ?, ?;',
              [data.idreseller, page, resPerPage],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  addDataLoan(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'INSERT INTO `data_loan` (`idreseller`, `id_member_loan`, `title`, `amount`, `type`) VALUES (?, ?, ?, ?, ?);',
              [
                data.idreseller,
                data.id_member_loan,
                data.title,
                data.amount,
                data.type,
              ],
            ).then(([tx, results]) => {
              resolve(true);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  getByIDMemberLoan(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'SELECT * from `data_loan` where id_member_loan = ?',
              [data.id_member_loan],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }
  // END LOAN

  // MEMBER LOAN
  viewMemberLoan(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          let resPerPage = parseInt(30); // results per page
          let page = parseInt(data.page) || 1; // Page
          page = (page - 1) * resPerPage;
          db.transaction((tx) => {
            tx.executeSql(
              'select * from member_loan where idreseller = ? order by name asc limit ?, ?',
              [data.idreseller, page, resPerPage],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  addMemberLoan(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'INSERT INTO `member_loan` (`idreseller`, `name`, `phone`, `address`) VALUES (?, ?, ?, ?);',
              [data.idreseller, data.name, data.phone, data.address],
            ).then(([tx, results]) => {
              resolve(true);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  updateMemberLoan(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'UPDATE `member_loan` set `name` = ?, `phone` = ?, `address` = ? where id_member_loan = ?',
              [data.name, data.phone, data.address, data.id_member_loan],
            ).then(([tx, results]) => {
              resolve(true);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }
  // END MEMBER LOAN

  // BARANG

  viewBarang(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          let resPerPage = parseInt(30); // results per page
          let page = parseInt(data.page) || 1; // Page
          page = (page - 1) * resPerPage;
          db.transaction((tx) => {
            tx.executeSql(
              'select * from barang where idreseller = ? order by nama asc limit ?, ?',
              [data.idreseller, page, resPerPage],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  addBarang(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'INSERT INTO `barang` (`idreseller`, `nama`, `harga_modal`, `harga_jual`, `satuan`, `stok`) VALUES (?, ?, ?, ?, ?, ?);',
              [
                data.idreseller,
                data.nama,
                data.harga_modal,
                data.harga_jual,
                data.satuan,
                data.stok,
              ],
            ).then(([tx, results]) => {
              resolve(results.insertId);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  updateStokBarang(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'UPDATE `barang` set `stok` = ? where id_barang = ?',
              [data.stok, data.id_barang],
            ).then(([tx, results]) => {
              resolve(true);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  detailBarang(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('select * from barang where id_barang = ?', [
              data.id_barang,
            ]).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  updateBarang(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'UPDATE `barang` set `nama` = ?, `harga_modal` = ?, `harga_jual` = ?, `satuan` = ?, `stok` = ? where id_barang = ?',
              [
                data.nama,
                data.harga_modal,
                data.harga_jual,
                data.satuan,
                data.stok,
                data.id_barang,
              ],
            ).then(([tx, results]) => {
              resolve(true);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  deleteBarang(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('DELETE FROM `barang` where id_barang = ?', [
              data.id_barang,
            ]).then(([tx, results]) => {
              resolve(true);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }
  // END BARANG

  //CART
  viewCart(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('select * from cart_jualan where idreseller = ?', [
              data.idreseller,
            ]).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  addCart(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'INSERT INTO `cart_jualan` (`idreseller`, `id_barang`, `nama`, `harga_modal`, `harga_jual`, `qty`, `satuan`, `stok`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
              [
                data.idreseller,
                data.id_barang,
                data.nama,
                data.harga_modal,
                data.harga_jual,
                data.qty,
                data.satuan,
                data.stok,
              ],
            ).then(([tx, results]) => {
              resolve(true);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  detailCart(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('select * from cart_jualan where id_barang = ?', [
              data.id_barang,
            ]).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  updateCart(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'UPDATE `cart_jualan` set `qty` = ? where id_cart = ?',
              [data.qty, data.id_cart],
            ).then(([tx, results]) => {
              resolve(true);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  deleteCart(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('DELETE FROM `cart_jualan` where id_cart = ?', [
              data.id_cart,
            ]).then(([tx, results]) => {
              resolve(true);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  deleteAllCart(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('DELETE FROM cart_jualan where idreseller = ?', [
              data.idreseller,
            ]).then(([tx, results]) => {
              resolve(true);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }
  // END CART

  viewSetHarga(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'SELECT * from set_harga_produk where idreseller = ? AND kodeproduk = ?',
              [data.idreseller, data.kodeproduk],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  addSetHarga(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'INSERT OR REPLACE INTO set_harga_produk (idreseller, kodeproduk, harga_jual) VALUES (?, ?, ?);',
              [data.idreseller, data.kodeproduk, data.harga_jual],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }
  // END SET HARGA

  viewTransaksi(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          let resPerPage = parseInt(30); // results per page
          let page = parseInt(data.page) || 1; // Page
          page = (page - 1) * resPerPage;
          db.transaction((tx) => {
            tx.executeSql(
              'SELECT * from transaksi where idreseller = ? and DATE(tanggal) between ? and ? order by id_transaksi desc limit ?, ?',
              [data.idreseller, data.startDate, data.endDate, page, resPerPage],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  sumMonthly(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              "SELECT SUM((harga_jual-harga_modal)*qty) as keuntungan, SUM(harga_jual*qty) as total_penjualan from transaksi where idreseller = ? and strftime('%m', tanggal) = ?",
              [data.idreseller, data.month],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  addTransaksi(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'INSERT OR IGNORE INTO transaksi (idreseller, idtrx, nama, harga_modal, harga_jual, qty, type_barang, stok, satuan, tanggal) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',
              [
                data.idreseller,
                data.idtrx,
                data.nama,
                data.harga_modal,
                data.harga_jual,
                data.qty,
                data.type_barang,
                data.stok,
                data.satuan,
                data.tanggal,
              ],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }
  // END SET HARGA

  // FAVORITE NUMBER
  viewNumber(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'SELECT * from favorite_number where idreseller = ? AND produk = ? group by number order by id desc',
              [data.idreseller, data.produk],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  detailNumber(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'select * from favorite_number where idreseller = ? AND number = ? AND produk = ?',
              [data.idreseller, data.number, data.produk],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  deleteNumber(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'DELETE FROM `favorite_number` where idreseller = ? AND number = ?',
              [data.idreseller, data.number],
            ).then(([tx, results]) => {
              resolve(true);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  addNumber(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'INSERT OR REPLACE INTO favorite_number (idreseller, produk, number) VALUES (?, ?, ?);',
              [data.idreseller, data.produk, data.number],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }
  // END FAVORITE NUMBER

  // profile login
  viewProfileLogin() {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('select * from profile_login', []).then(
              ([tx, results]) => {
                resolve(results);
              },
            );
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  addProfileLogin(status) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('INSERT INTO `profile_login` (`status`) VALUES(?);', [
              status,
            ]).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  deleteProfileLogin() {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('DELETE FROM `profile_login`', []).then(
              ([tx, results]) => {
                resolve(true);
              },
            );
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  updateProfileLogin(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'UPDATE `profile_login` set `status` = ? where id = ?',
              [data.qty, data.id_cart],
            ).then(([tx, results]) => {
              resolve(true);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }
  // END profile login

  // profile balance
  viewProfileBalance() {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('select * from profile_balance', []).then(
              ([tx, results]) => {
                resolve(results);
              },
            );
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  addProfileBalance(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'INSERT INTO `profile_balance` (balanceReal, balance, point, name, iduser) VALUES(?, ?, ?, ?, ?);',
              [
                data.balanceReal,
                data.balance,
                data.point,
                data.name,
                data.iduser,
              ],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  deleteProfileBalance(id) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('DELETE FROM `profile_balance`', []).then(
              ([tx, results]) => {
                resolve(true);
              },
            );
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  updateProfileBalance(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'UPDATE `profile_balance` set `status` = ? where id = ?',
              [data.qty, data.id_cart],
            ).then(([tx, results]) => {
              resolve(true);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }
  // END profile balance

  //Notification
  viewNotification(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'select * from notification where idReseller = ? group by idReseller',
              [data.idReseller],
            ).then(([tx, results]) => {
              resolve(results);
            });
          })
            .then((result) => {
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  addNotification(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'INSERT INTO `notification` (`idReseller`, `total`) VALUES (?, ?);',
              [data.idReseller, data.total],
            ).then(([tx, results]) => {
              resolve(true);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  updateNotification(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql(
              'UPDATE `notification` set `total` = ? where idReseller = ?',
              [data.total, data.idReseller],
            ).then(([tx, results]) => {
              resolve(true);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }

  deleteNotification(data) {
    return new Promise((resolve) => {
      this.openDatabases()
        .then((db) => {
          db.transaction((tx) => {
            tx.executeSql('DELETE FROM `notification` where idReseller = ?', [
              data.idReseller,
            ]).then(([tx, results]) => {
              resolve(true);
            });
          })
            .then((result) => {
              resolve(true);
              // this.closeDatabase(db);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    });
  }
  // END Notification
}
