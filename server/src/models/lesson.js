'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Lesson.init({
    lessonName: DataTypes.STRING,
    course_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    risk: DataTypes.TEXT,
    attack: DataTypes.TEXT,
    detect: DataTypes.TEXT,
    recommendation: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Lesson',
  });
  return Lesson;
};