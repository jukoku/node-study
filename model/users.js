module.exports = function (sequelize, DataTypes) {
  return sequelize.define('users', {
    // user ID 생성시 자동생성 autoIncrement = true
    idx: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allwNull: false
    },
    user_id: {
      type: DataTypes.STRING(250)
    }
  })
}