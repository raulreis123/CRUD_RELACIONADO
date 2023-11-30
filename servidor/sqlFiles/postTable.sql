CREATE TABLE postagens (
	id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    tipo VARCHAR(255) NOT NULL,
    imagem TEXT NOT NULL,
    conteudo TEXT NOT NULL,
    usuario_id INT,
    FOREIGN KEY (usuario_id) REFERENCES users(id)
);