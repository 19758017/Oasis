const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com o Banco de Dados (MongoDB)
mongoose.connect('mongodb://localhost:27017/oasis', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('Conectado ao MongoDB'))
  .catch((err) => console.error('Erro ao conectar ao MongoDB', err));

// Modelo de Dados
const MessageSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { type: Date, default: Date.now },
});
const Message = mongoose.model('Message', MessageSchema);

// Modelo de Autor
const AuthorSchema = new mongoose.Schema({
    name: String,
    bio: String,
    birthDate: Date,
});
const Author = mongoose.model('Author', AuthorSchema);

// Modelo de Categoria
const CategorySchema = new mongoose.Schema({
    name: String,
});
const Category = mongoose.model('Category', CategorySchema);

// Modelo de Livro
const BookSchema = new mongoose.Schema({
    title: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    publishedDate: Date,
    summary: String,
});
const Book = mongoose.model('Book', BookSchema);

// Rotas
app.post('/api/messages', async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        await newMessage.save();
        res.status(201).json({ success: true, message: 'Mensagem salva com sucesso!' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.get('/api/messages', async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).json(messages);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Iniciar o Servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));

async function fetchMessages() {
    try {
        const response = await fetch('http://localhost:3000/api/messages');
        const messages = await response.json();

        const messageList = document.getElementById('messageList');
        messageList.innerHTML = ''; // Limpa a lista antes de exibir

        messages.forEach(msg => {
            const listItem = document.createElement('li');
            listItem.textContent = `${msg.name} (${msg.email}): ${msg.message}`;
            messageList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao carregar mensagens:', error);
    }
}
