import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Category from './Category.js'; // Importando o modelo de Categoria

const Books = sequelize.define('Books', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  // Relacionamento com a tabela de categorias
  category_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Category, // Referência ao modelo de Categoria
      key: 'id'
    },
    allowNull: false,
    onDelete: 'CASCADE' // Se a categoria for deletada, os livros relacionados também serão deletados
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  published_date: {
    type: DataTypes.DATE,
    allowNull: false
  }, 
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true // Por padrão, os livros estão disponíveis
  }
}, {
  tableName: 'books',
  timestamps: true
});

export default Books;