import Database from "../Database";
const db = new Database();

export const viewTransfer = async (data) => {
  return new Promise((resolve) => {
    db.openDatabases()
      .then((db) => {
        db.transaction((tx) => {
          tx.executeSql(
            "select * from history_transfer where date(waktu) between ? and ? and reseller_id = ? order by waktu desc",
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

export const addTransfer = async (data) => {
  return new Promise((resolve) => {
    db.openDatabases()
      .then((db) => {
        db.transaction((tx) => {
          for (var i = 0; i < data.length; i++) {
            tx.executeSql(
              "INSERT OR REPLACE INTO `history_transfer` (`reseller_id`, `waktu`, `iddownline`, `namareseller`, `dana`) VALUES (?, ?, ?, ?, ?);",
              [
                data[i].reseller_id,
                data[i].waktu,
                data[i].iddownline,
                data[i].namareseller,
                data[i].dana,
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
