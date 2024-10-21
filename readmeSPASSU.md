# Projeto

## SQL DO PROJETO

CREATE DATABASE spassu;
USE spassu;

-- Tabela Livro
CREATE TABLE Livro (
    cod INT AUTO_INCREMENT PRIMARY KEY,
    Titulo VARCHAR(40) NOT NULL,
    Editora VARCHAR(40) NOT NULL,
    Edicao INT NOT NULL,
    AnoPublicacao VARCHAR(40) NOT NULL
);

-- Tabela Autor
CREATE TABLE Autor (
    CodAu INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(40) NOT NULL
);

-- Tabela Assunto
CREATE TABLE Assunto (
    codAs INT AUTO_INCREMENT PRIMARY KEY,
    Descricao VARCHAR(20) NOT NULL
);

-- Tabela Livro_Autor
CREATE TABLE Livro_Autor (
    Livro_cod INT,
    Autor_cod INT,
    FOREIGN KEY (Livro_cod) REFERENCES Livro(cod),
    FOREIGN KEY (Autor_cod) REFERENCES Autor(CodAu),
    PRIMARY KEY (Livro_cod, Autor_cod)
);

-- Tabela Livro_Assunto
CREATE TABLE Livro_Assunto (
    Livro_cod INT,
    Assunto_cod INT,
    FOREIGN KEY (Livro_cod) REFERENCES Livro(cod),
    FOREIGN KEY (Assunto_cod) REFERENCES Assunto(codAs),
    PRIMARY KEY (Livro_cod, Assunto_cod)
);

View:

CREATE VIEW vw_LivrosPorAutor AS
SELECT 
    a.Nome AS Autor,
    l.Titulo AS Livro,
    l.Editora,
    l.Edicao,
    l.AnoPublicacao,
    GROUP_CONCAT(DISTINCT s.Descricao ORDER BY s.Descricao SEPARATOR ', ') AS Assuntos
FROM 
    Livro l
JOIN 
    Livro_Autor la ON l.cod = la.Livro_cod
JOIN 
    Autor a ON la.Autor_cod = a.CodAu
LEFT JOIN 
    Livro_Assunto las ON l.cod = las.Livro_cod
LEFT JOIN 
    Assunto s ON las.Assunto_cod = s.codAs
GROUP BY 
    a.Nome, l.Titulo, l.Editora, l.Edicao, l.AnoPublicacao;

## TESTES AUTOMATIZADOS

- Comando para realizar teste individual: php artisan test --filter it_can_create_an_autor
- Teste geral: ./vendor/bin/phpunit