import Database from "../Database";
const db = new Database();

export const viewRecapComission = async (data) => {
  return new Promise((resolve) => {
    db.openDatabases()
      .then((db) => {
        db.transaction((tx) => {
          tx.executeSql(
            "select * from recap_comission where date(dateTransaction) between ? and ? and reseller_id = ? order by transactionId desc",
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

export const addRecapComission = async (data) => {
  return new Promise((resolve) => {
    db.openDatabases()
      .then((db) => {
        db.transaction((tx) => {
          for (var i = 0; i < data.length; i++) {
            tx.executeSql(
              "INSERT OR REPLACE INTO `recap_comission` (`transactionId`, `reseller_id`, `dateTransaction`, `description`, `totalAmount`) VALUES (?, ?, ?, ?, ?);",
              [
                data[i].transactionId,
                data[i].reseller_id,
                data[i].dateTransaction,
                data[i].description,
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
