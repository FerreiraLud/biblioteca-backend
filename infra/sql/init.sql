CREATE SEQUENCE seq_ra START 1;

CREATE TABLE Aluno (
    id_aluno INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    ra VARCHAR (7) UNIQUE NOT NULL,
    nome VARCHAR (80) NOT NULL,
    sobrenome VARCHAR (80) NOT NULL,
    data_nascimento DATE,
    endereco VARCHAR (200),
    email VARCHAR (80),
    celular VARCHAR (20) NOT NULL
);

-- cria o RA
CREATE OR REPLACE FUNCTION gerar_ra() RETURNS TRIGGER AS $$
BEGIN
    NEW.ra := 'AAA' || TO_CHAR(nextval('seq_ra'), 'FM0000');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_gerar_ra
BEFORE INSERT ON Aluno
FOR EACH ROW EXECUTE FUNCTION gerar_ra();


-- CREATE LIVRO
CREATE TABLE Livro (
    id_livro INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    titulo VARCHAR (200) NOT NULL,
    autor VARCHAR (150) NOT NULL,
    editora VARCHAR (100) NOT NULL,
    ano_publicacao VARCHAR (5),
    isbn VARCHAR (20),
    quant_total INTEGER NOT NULL,
    quant_disponivel INTEGER NOT NULL,
    valor_aquisicao DECIMAL (10,2),
    status_livro_emprestado VARCHAR (20)
);


-- CREATE EMPRESTIMO
CREATE TABLE Emprestimo (
    id_emprestimo INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_aluno INT REFERENCES Aluno(id_aluno),
    id_livro INT REFERENCES Livro(id_livro),
    data_emprestimo DATE NOT NULL,
    data_devolucao DATE,
    status_emprestimo VARCHAR (20)
);


-- ALUNO
INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular) 
VALUES 
('Conor', 'McGregor', '2005-01-15', 'Rua UFC, 123', 'mcgregor@ufc.com', '16998959876'),
('Amanda', 'Nunes', '2004-03-22', 'Rua UFC, 456', 'amanda.nunes@ufc.com', '16995992305'),
('Angelina', 'Jolie', '2003-07-10', 'Rua Hollywood, 789', 'jolie@cinema.com', '16991915502'),
('Natalie', 'Portman', '2002-11-05', 'Rua Hollywood, 101', 'natalie.portman@cinema.com', '16993930703'),
('Shaquille', 'ONeal', '2004-09-18', 'Rua NBA, 202', 'shaquille@gmail.com', '16993937030'),
('Harry', 'Kane', '2000-05-18', 'Rua Futebol, 2024', 'kane@futi.com', '16998951983'),
('Jaqueline', 'Carvalho', '2001-12-10', 'Rua Volei, 456', 'jack@volei.com', '16991993575'),
('Sheilla', 'Castro', '2003-04-25', 'Rua Volei, 2028', 'sheilla.castro@volei.com', '16981974547'),
('Gabriela', 'Guimarães', '2007-08-19', 'Rua Volei, 2028', 'gaby@volei.com', '16983932215'),
('Magic', 'Johnson', '2003-07-08', 'Rua NBA, 1999', 'magic@gmail.com', '16993932020'),
('Hanna', 'Backer', '2003-09-16', 'Rua NBA, 1930', 'HannaBacker@gmail.com', '169998472578'),
('Jhon', 'Silva', '2006-10-26', 'Rua Natal, 129', 'Jhonjhon@gmail.com', '16987423099'),
('Jennifer', 'Aniston', '2003-02-13', 'Rua Natal, 345', 'Jeni@gmail.com', '16999437204'),
('Wandinha', 'Adans', '2002-09-27', 'Rua do medo, 666', 'Wandinha@gmail.com', '1699034984'),
('Dominic', 'Toretto', '1976-08-29', 'Rua veloz, 983', 'Toretto@gmail.com', '16994857204'),
('Brian', 'Conner', '1978-07-14', 'Rua veloz, 125', 'Brian@gmail.com', '16993864532'),
('Edina', 'Modas', '2000-03-15', 'Rua NBA, 456', 'Edina@gmail.com', '16995789015'),
('LaraJean', 'Covei', '2002-03-25', 'Rua Legal, 872', 'Covei@gmail.com', '16983467268'),
('José', 'Bezerra', '2006-04-13', 'Coahb, 765', 'Flyn@gmail.com', '16947532742'),
('Rapunzel', 'Zel', '2003-05-15', 'Rua estrela, 341', 'Rapunzel@gmail.com', '16943876245');


-- LIVRO
INSERT INTO Livro (titulo, autor, editora, ano_publicacao, isbn, quant_total, quant_disponivel, valor_aquisicao, status_livro_emprestado) 
VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'HarperCollins', '1954', '978-0007525546', 10, 10, 150.00, 'Disponível'),
('1984', 'George Orwell', 'Companhia das Letras', '1949', '978-8535906770', 8, 8, 90.00, 'Disponível'),
('Dom Quixote', 'Miguel de Cervantes', 'Penguin Classics', '1605', '978-0142437230', 6, 6, 120.00, 'Disponível'),
('O Pequeno Príncipe', 'Antoine de Saint-Exupéry', 'Agir', '1943', '978-8522008731', 12, 12, 50.00, 'Disponível'),
('A Revolução dos Bichos', 'George Orwell', 'Penguin', '1945', '978-0141036137', 7, 7, 80.00, 'Disponível'),
('O Hobbit', 'J.R.R. Tolkien', 'HarperCollins', '1937', '978-0007458424', 9, 9, 140.00, 'Disponível'),
('O Conde de Monte Cristo', 'Alexandre Dumas', 'Penguin Classics', '1844', '978-0140449266', 5, 5, 110.00, 'Disponível'),
('Orgulho e Preconceito', 'Jane Austen', 'Penguin Classics', '1813', '978-0141439518', 7, 7, 90.00, 'Disponível'),
('Moby Dick', 'Herman Melville', 'Penguin Classics', '1851', '978-0142437247', 4, 4, 100.00, 'Disponível'),
('Guerra e Paz', 'Liev Tolstói', 'Companhia das Letras', '1869', '978-8535922343', 3, 3, 130.00, 'Disponível'),
('Herry Potter e a Pedra filosofal', 'J.K. Rowling ', 'Editora Rocca', '1997', '978-8932761475', 8, 8, 32.30, 'Disponível'),
('Coraline', 'Neil Gaiman', 'Intrínseca', '2002', '978-0923476525', 3, 3, 44.51, 'Disponível'),
('É assim que acaba', 'Colen Hoover', 'Grupo Editorial Record', '2016', '978-9735167834', 5, 5, 36.00, 'Disponível'),
('Trono de Vidro', ' Sarah J. Maas', 'Galera Record', '2013', '978-9735461298', 5, 5, 43.00, 'Disponível'),
('Marca de uma lágrima', 'Pedro Bandeira', 'Editora moderna', '1985', '978-7384952353', 4, 3, 70.15, 'Disponível'),
('Para todos os garotos que ja amei', ' Jenny Han', 'Intrínseca', '2015', '978-7456234912', 5, 5, 47.92, 'Disponível'),
('Anne of Green Gables', 'L. M. Montgomery', 'Editora Principis', '1908', '978-1235784561', 3, 3, 26.00, 'Disponível'),
('Aventuras de Alice no País das Maravilhas', 'Lewis Carroll', 'Zahar', '1865', '978-09777161731', 10, 10, 46.00, 'Disponível'),
('IT: A Coisa', ' Stephen King ', 'Suma', '2014', '	978-8560280944', 8, 8, 102.00, 'Disponível'),
('Percy Jackson', ' Rick Riordan', 'Intrínseca', '2005', '978-9743367892', 10, 10, 36.00, 'Disponível');


-- Inserindo Emprestimos
INSERT INTO Emprestimo (id_aluno, id_livro, data_emprestimo, data_devolucao, status_emprestimo) 
VALUES 
(1, 2, '2024-09-01', '2024-09-15', 'Em andamento'),
(2, 1, '2024-09-02', '2024-09-16', 'Em andamento'),
(3, 5, '2024-09-03', '2024-09-17', 'Em andamento'),
(5, 3, '2024-09-04', '2024-09-18', 'Em andamento'),
(4, 6, '2024-09-05', '2024-09-19', 'Em andamento'),
(6, 4, '2024-09-06', '2024-09-20', 'Em andamento'),
(7, 8, '2024-09-07', '2024-09-21', 'Em andamento'),
(8, 7, '2024-09-08', '2024-09-22', 'Em andamento'),
(10, 9, '2024-09-09', '2024-09-23', 'Em andamento'),
(9, 10, '2024-09-10', '2024-09-24', 'Em andamento'),
(1, 10, '2024-09-11', '2024-09-25', 'Em andamento'),
(2, 3, '2024-09-11', '2024-09-25', 'Em andamento'),
(4, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(6, 2, '2024-09-11', '2024-09-25', 'Em andamento'),
(11, 4, '2024-09-11', '2024-09-25', 'Em andamento'),
(10, 9, '2024-09-11', '2024-09-25', 'Em andamento'),
(8, 1, '2024-09-11', '2024-09-25', 'Em andamento'),
(13, 5, '2024-09-11', '2024-09-25', 'Em andamento'),
(17, 15, '2024-09-11', '2024-09-25', 'Em andamento'),
(15, 6, '2024-09-11', '2024-09-25', 'Em andamento'),
(20, 18, '2024-09-11', '2024-09-25', 'Em andamento'),
(5, 16, '2024-09-11', '2024-09-25', 'Em andamento'),
(8, 12, '2024-09-11', '2024-09-25', 'Em andamento'),
(19,7, '2024-09-11', '2024-09-25', 'Em andamento');
