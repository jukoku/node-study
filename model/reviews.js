module.exports = function (sequelize, DataTypes) {
  return sequelize.define('reviews', {
    // review ID 생성시 자동생성 autoIncrement = true
    idx: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allwNull: false
    },
    movie_id: {
      type: DataTypes.STRING(250)
    },
    review: {
      type: DataTypes.TEXT
    }
  })
}