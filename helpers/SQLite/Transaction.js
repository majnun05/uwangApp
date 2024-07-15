import Database from "../Database";
const db = new Database();

export const viewTransaction = async (data) => {
  return new Promise((resolve) => {
    db.openDatabases()
      .then((db) => {
        db.transaction((tx) => {
          tx.executeSql(
            "select * from history_transaction where date(dateTransaction) between ? and ? and reseller_id = ? order by transactionId desc",
            [data.dateStart, data.dateEnd, data.id]
            //and reseller_id = ?
            //, data.idreseller
          ).then(([tx, results]) => {
            resolve(results);
          });
        })
          .then((result) => {
            // this.closeDatabase(db);
          })
          .catch((err) => {
            //log
          });
      })
      .catch((err) => {
        //log
      });
  });
};

export const addTransaction = async (data) => {
  return new Promise((resolve) => {
    db.openDatabases()
      .then((db) => {
        db.transaction((tx) => {
          for (var i = 0; i < data.length; i++) {
            tx.executeSql(
              "INSERT OR REPLACE INTO `history_transaction` (`transactionId`, `reseller_id`, `dateTransaction`, `productCode`, `phone`, `price`, `price_real`, `serialNumber`, `imgurl`, `productName`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
              [
                data[i].transactionId,
                data[i].reseller_id,
                data[i].dateTransaction,
                data[i].productCode,
                data[i].phone,
                data[i].price,
                data[i].price_real,
                data[i].serialNumber,
                data[i].imgurl,
                data[i].productName,
                data[i].status,
              ]
            ).then(([tx, results]) => {
              resolve(results);
            });
          }
        })
          .then((result) => {
            // this.closeDatabase(db);
          })
          .catch((err) => {
            //log
          });
      })
      .catch((err) => {
        //log
      });
  });
};
