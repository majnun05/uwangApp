import Database from "../Database";
const db = new Database();

export const viewRekapBalance = async (data) => {
  return new Promise((resolve) => {
    db.openDatabases()
      .then((db) => {
        db.transaction((tx) => {
          tx.executeSql(
            "select * from recap_balance where date(dateTransaction) between ? and ? and reseller_id = ? order by dateTransaction desc",
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

export const addRekapBalance = async (data) => {
  return new Promise((resolve) => {
    db.openDatabases()
      .then((db) => {
        db.transaction((tx) => {
          for (var i = 0; i < data.length; i++) {
            tx.executeSql(
              "INSERT OR REPLACE INTO `recap_balance` (`transactionId`, `dateTransaction`, `reseller_id`, `idReseller`, `nameReseller`, `totalAmount`) VALUES (?, ?, ?, ?, ?, ?);",
              [
                data[i].transactionId,
                data[i].dateTransaction,
                data[i].reseller_id,
                data[i].idReseller,
                data[i].nameReseller,
                data[i].totalAmount,
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
