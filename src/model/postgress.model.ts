import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = new Sequelize({
  dialect: "postgres",
  username: "victor",
  password: "yungvicky007",
  database: "taskmanager",
  host: "postgres-db",
  port: 5432,
});


export class Task extends Model {
  id!: number;
  title!: string;
  description!: string;
  completed!: boolean;
}

Task.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Task", 
  }
);

sequelize.sync();

export { sequelize };