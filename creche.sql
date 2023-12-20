CREATE DATABASE  IF NOT EXISTS `creche` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `creche`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: creche
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `idAdministrador` int NOT NULL AUTO_INCREMENT,
  `ccPessoa` int unsigned NOT NULL,
  PRIMARY KEY (`idAdministrador`,`ccPessoa`),
  KEY `fk_Administrador_Pessoa1_idx` (`ccPessoa`),
  CONSTRAINT `fk_Administrador_Pessoa1` FOREIGN KEY (`ccPessoa`) REFERENCES `pessoa` (`cartaoCidadao`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (1,117082778);
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anuncio`
--

DROP TABLE IF EXISTS `anuncio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anuncio` (
  `idAnuncio` int NOT NULL AUTO_INCREMENT,
  `idAdministrador` int NOT NULL,
  `descricao` mediumtext NOT NULL,
  `titulo` varchar(100) NOT NULL,
  PRIMARY KEY (`idAnuncio`,`idAdministrador`),
  UNIQUE KEY `idAnuncios_UNIQUE` (`idAnuncio`),
  KEY `fk_Anuncios_Administrador1_idx` (`idAdministrador`),
  CONSTRAINT `fk_Anuncios_Administrador1` FOREIGN KEY (`idAdministrador`) REFERENCES `administrador` (`idAdministrador`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anuncio`
--

LOCK TABLES `anuncio` WRITE;
/*!40000 ALTER TABLE `anuncio` DISABLE KEYS */;
INSERT INTO `anuncio` VALUES (1,1,'Se você procura um ambiente acolhedor e educativo para o seu filho, não procure mais. Estamos aceitando inscrições para todas as idades. Agende uma visita à nossa creche para conhecer nossa equipe, instalações e descobrir como podemos fazer a diferença na vida do seu filho.','Ambiente'),(2,1,'A criatividade é o coração da nossa creche! Proporcionamos atividades educativas e lúdicas que incentivam o desenvolvimento cognitivo e emocional das crianças. Pintura, música, jogos - cada dia é uma oportunidade para aprender e se divertir!','Atividades Criativas'),(3,1,'Ola','Ola');
/*!40000 ALTER TABLE `anuncio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anuncioturma`
--

DROP TABLE IF EXISTS `anuncioturma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anuncioturma` (
  `idanuncioTurma` int NOT NULL AUTO_INCREMENT,
  `idTurma` int NOT NULL,
  `descricao` mediumtext NOT NULL,
  `titulo` varchar(100) NOT NULL,
  PRIMARY KEY (`idanuncioTurma`,`idTurma`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anuncioturma`
--

LOCK TABLES `anuncioturma` WRITE;
/*!40000 ALTER TABLE `anuncioturma` DISABLE KEYS */;
INSERT INTO `anuncioturma` VALUES (1,1,'Queridos Encarregados de Educação,\n\nÉ com grande entusiasmo que partilhamos as novidades empolgantes da nossa jornada educativa! Na qualidade de educadores dedicados, estamos empenhados em proporcionar uma experiência educacional significativa para os vossos queridos filhos.','Anúncio Especial para Encarregados de Educação'),(2,4,'Ola caros Encarregados de Educacao \n\nehehehhasfsodgnosidgnisodmgoismdgoimsdgoisopdgmiopsdmg','Mensagem de boas-vindas'),(3,1,'Bem vindos','Bem vindos'),(4,4,'Aprender brincando: novas atividades lúdicas para as crianças!','Atividades Lúdicas'),(5,4,'Festa temática na creche no próximo sábado. Todos estão convidados!','Festa Temática'),(6,2,'Inscrições abertas para a oficina de arte. Garanta a vaga do seu filho!','Oficina de Arte'),(7,1,'Palestra para pais: Como estimular o desenvolvimento cognitivo em casa.','Palestra Educativa'),(8,3,'Concurso de desenhos: as melhores obras serão premiadas!','Concurso de Desenhos'),(9,4,'Excursão ao zoológico planejada para o mês que vem. Inscreva-se agora!','Excursão ao Zoológico'),(10,2,'Novo parquinho inaugurado. Venha conferir com seus filhos!','Inauguração do Parquinho'),(11,2,'Semana da leitura: atividades especiais para promover o gosto pela leitura.','Semana da Leitura'),(12,1,'Aulas de música agora disponíveis na creche. Inscreva seu filho!','Aulas de Música'),(13,3,'Feira de ciências com as crianças expondo seus projetos. Não perca!','Feira de Ciências'),(14,3,'Novo playground inaugurado. Venha brincar com a gente!','Inauguração do Playground'),(15,4,'Curso de culinária para crianças: uma forma divertida de aprender!','Curso de Culinária'),(16,1,'Dia da família na creche: venham participar de atividades especiais!','Dia da Família'),(17,1,'Apresentação de teatro organizada pelos pequenos artistas da creche.','Apresentação de Teatro');
/*!40000 ALTER TABLE `anuncioturma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atividade`
--

DROP TABLE IF EXISTS `atividade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atividade` (
  `idAtividade` int unsigned NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `duracao` int NOT NULL,
  `descricao` varchar(45) NOT NULL,
  `objetivo` varchar(45) NOT NULL,
  `idTurma` int unsigned NOT NULL,
  `data` date DEFAULT (curdate()),
  PRIMARY KEY (`idAtividade`,`idTurma`),
  UNIQUE KEY `idAtividade_UNIQUE` (`idAtividade`),
  KEY `fk_Atividade_Turma1_idx` (`idTurma`),
  CONSTRAINT `fk_Atividade_Turma1` FOREIGN KEY (`idTurma`) REFERENCES `turma` (`idTurma`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atividade`
--

LOCK TABLES `atividade` WRITE;
/*!40000 ALTER TABLE `atividade` DISABLE KEYS */;
INSERT INTO `atividade` VALUES (1,'Futebolada',98,'Quinta de Sao Roque','Jogarem a bola',1,'2023-12-14'),(6,'Futebol',45,'Campo de jogos','Estimular trabalho em equipe',4,'2023-12-22'),(7,'Dança',60,'Sala de dança','Desenvolver expressão corporal',3,'2023-12-23'),(8,'Pintura',40,'Sala de artes','Estimular criatividade',1,'2023-12-24'),(9,'Jogos de Tabuleiro',30,'Sala de jogos','Promover raciocínio lógico',2,'2023-12-25'),(10,'Yoga para Crianças',45,'Sala de atividades zen','Melhorar equilíbrio e concentração',4,'2023-12-26'),(11,'Teatro Infantil',60,'Auditório','Estimular expressão verbal',2,'2023-12-27'),(12,'Aulas de Música',40,'Sala de música','Desenvolver apreciação musical',4,'2023-12-28'),(13,'Culinária Divertida',50,'Cozinha pedagógica','Promover habilidades culinárias',4,'2023-12-29'),(14,'Circuito de Obstáculos',30,'Pátio da creche','Estimular coordenação motora',1,'2023-12-30'),(15,'Contação de Histórias',45,'Biblioteca infantil','Promover imaginação e linguagem',1,'2023-12-31');
/*!40000 ALTER TABLE `atividade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auxiliareducativo`
--

DROP TABLE IF EXISTS `auxiliareducativo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auxiliareducativo` (
  `idAuxiliar` int NOT NULL AUTO_INCREMENT,
  `salario` float NOT NULL,
  `ccPessoa` int unsigned NOT NULL,
  PRIMARY KEY (`idAuxiliar`,`ccPessoa`),
  KEY `fk_AuxiliarEducativo_Pessoa1_idx` (`ccPessoa`),
  CONSTRAINT `fk_AuxiliarEducativo_Pessoa1` FOREIGN KEY (`ccPessoa`) REFERENCES `pessoa` (`cartaoCidadao`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auxiliareducativo`
--

LOCK TABLES `auxiliareducativo` WRITE;
/*!40000 ALTER TABLE `auxiliareducativo` DISABLE KEYS */;
INSERT INTO `auxiliareducativo` VALUES (1,2106.95,231061319),(2,2677.4,231060989),(3,2066.14,213757233),(4,2000000,256827624);
/*!40000 ALTER TABLE `auxiliareducativo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacao`
--

DROP TABLE IF EXISTS `avaliacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacao` (
  `idAvaliacao` int NOT NULL AUTO_INCREMENT,
  `nota` varchar(45) NOT NULL,
  `observacao` mediumtext,
  `data` datetime NOT NULL,
  `idCrianca` int NOT NULL,
  `idAtividade` int unsigned NOT NULL,
  PRIMARY KEY (`idAvaliacao`,`idCrianca`,`idAtividade`),
  KEY `fk_Avaliacao_Crianca1_idx` (`idCrianca`),
  KEY `fk_Avaliacao_Atividade1_idx` (`idAtividade`),
  CONSTRAINT `fk_Avaliacao_Atividade1` FOREIGN KEY (`idAtividade`) REFERENCES `atividade` (`idAtividade`),
  CONSTRAINT `fk_Avaliacao_Crianca1` FOREIGN KEY (`idCrianca`) REFERENCES `crianca` (`idCrianca`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacao`
--

LOCK TABLES `avaliacao` WRITE;
/*!40000 ALTER TABLE `avaliacao` DISABLE KEYS */;
INSERT INTO `avaliacao` VALUES (1,'4','Muito divertido','2023-12-14 00:00:00',3,1),(2,'4','Distrais-se um pouco','2023-12-20 00:00:00',12,9),(3,'2','Muito bom','2023-12-20 00:00:00',13,9);
/*!40000 ALTER TABLE `avaliacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crianca`
--

DROP TABLE IF EXISTS `crianca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crianca` (
  `idCrianca` int NOT NULL AUTO_INCREMENT,
  `ccPessoa` int unsigned NOT NULL,
  `idTurma` int unsigned NOT NULL,
  PRIMARY KEY (`idCrianca`,`ccPessoa`,`idTurma`),
  KEY `fk_Crianca_Pessoa1_idx` (`ccPessoa`),
  KEY `fk_Crianca_Turma1_idx` (`idTurma`),
  CONSTRAINT `fk_Crianca_Pessoa1` FOREIGN KEY (`ccPessoa`) REFERENCES `pessoa` (`cartaoCidadao`),
  CONSTRAINT `fk_Crianca_Turma1` FOREIGN KEY (`idTurma`) REFERENCES `turma` (`idTurma`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crianca`
--

LOCK TABLES `crianca` WRITE;
/*!40000 ALTER TABLE `crianca` DISABLE KEYS */;
INSERT INTO `crianca` VALUES (1,114937360,2),(2,137498006,2),(11,147370932,2),(3,171812432,1),(4,179168908,3),(5,189648359,2),(6,213508244,4),(14,222222223,1),(7,223056814,1),(13,233333332,2),(12,233333333,2),(8,238714575,1),(9,294388767,2),(10,295807548,2);
/*!40000 ALTER TABLE `crianca` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `crianca_has_encarregadoeducacao`
--

DROP TABLE IF EXISTS `crianca_has_encarregadoeducacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `crianca_has_encarregadoeducacao` (
  `idCrianca` int NOT NULL,
  `idEncarregado` int NOT NULL,
  PRIMARY KEY (`idCrianca`,`idEncarregado`),
  KEY `fk_Crianca_has_EncarregadoEducacao_EncarregadoEducacao1_idx` (`idEncarregado`),
  KEY `fk_Crianca_has_EncarregadoEducacao_Crianca1_idx` (`idCrianca`),
  CONSTRAINT `fk_Crianca_has_EncarregadoEducacao_Crianca1` FOREIGN KEY (`idCrianca`) REFERENCES `crianca` (`idCrianca`),
  CONSTRAINT `fk_Crianca_has_EncarregadoEducacao_EncarregadoEducacao1` FOREIGN KEY (`idEncarregado`) REFERENCES `encarregadoeducacao` (`idEncarregado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crianca_has_encarregadoeducacao`
--

LOCK TABLES `crianca_has_encarregadoeducacao` WRITE;
/*!40000 ALTER TABLE `crianca_has_encarregadoeducacao` DISABLE KEYS */;
INSERT INTO `crianca_has_encarregadoeducacao` VALUES (1,1),(7,2),(10,2),(11,2),(12,5),(13,6);
/*!40000 ALTER TABLE `crianca_has_encarregadoeducacao` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_insert_crianca_has_encarregado` AFTER INSERT ON `crianca_has_encarregadoeducacao` FOR EACH ROW BEGIN
    DECLARE id_sala INT;
    DECLARE ccPessoa_encarregado INT;
    
SELECT ccPessoa INTO ccPessoa_encarregado
    FROM encarregadoeducacao
    WHERE idEncarregado = NEW.idEncarregado;
    -- Check if a room already exists for the child
SELECT 
    idsala
INTO id_sala FROM
    sala_has_pessoa
WHERE
    ccPessoa = ccPessoa_encarregado;

    IF id_sala IS NULL THEN
        -- Create a new room if one doesn't exist
        INSERT INTO sala VALUES (NULL, (SELECT pessoa.nome FROM pessoa, crianca WHERE crianca.ccPessoa = pessoa.cartaoCidadao AND crianca.idCrianca = NEW.idCrianca));
        SET id_sala = LAST_INSERT_ID();

        -- Add encarregadoeducacao to sala_has_pessoa
        INSERT INTO sala_has_pessoa (idsala, ccPessoa)
        VALUES (id_sala, ccPessoa_encarregado);

        -- Add educador to sala_has_pessoa
        INSERT INTO sala_has_pessoa
        SELECT id_sala, educador.ccPessoa
        FROM educador
        WHERE educador.idTurma = (
            SELECT crianca.idTurma
            FROM crianca
            WHERE crianca.idCrianca = NEW.idCrianca
        );

        -- Add auxiliareducativo to sala_has_pessoa
        INSERT INTO sala_has_pessoa
        SELECT id_sala, auxiliareducativo.ccPessoa
        FROM auxiliareducativo;
    ELSE
        -- Add the new encarregadoeducacao to the existing room
        INSERT INTO sala_has_pessoa (idsala, ccPessoa)
        VALUES (id_sala, ccPessoa_encarregado);
    END IF;

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `educador`
--

DROP TABLE IF EXISTS `educador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `educador` (
  `idEducador` int NOT NULL AUTO_INCREMENT,
  `contacto` int unsigned NOT NULL,
  `salario` float unsigned NOT NULL,
  `idTurma` int unsigned NOT NULL,
  `ccPessoa` int unsigned NOT NULL,
  PRIMARY KEY (`idEducador`,`idTurma`,`ccPessoa`),
  UNIQUE KEY `contacto_UNIQUE` (`contacto`),
  KEY `fk_Educador_Turma1_idx` (`idTurma`),
  KEY `fk_Educador_Pessoa1_idx` (`ccPessoa`),
  CONSTRAINT `ccPessoa` FOREIGN KEY (`ccPessoa`) REFERENCES `pessoa` (`cartaoCidadao`),
  CONSTRAINT `idTurma` FOREIGN KEY (`idTurma`) REFERENCES `turma` (`idTurma`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `educador`
--

LOCK TABLES `educador` WRITE;
/*!40000 ALTER TABLE `educador` DISABLE KEYS */;
INSERT INTO `educador` VALUES (1,967883954,1598.5,1,164083702),(2,924866182,1023.88,2,154825342),(3,936249581,4323.89,3,147819490),(4,968232947,2547.81,4,172850580),(5,964783940,7000,1,1),(6,964964782,3400,2,159827647);
/*!40000 ALTER TABLE `educador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encarregadoeducacao`
--

DROP TABLE IF EXISTS `encarregadoeducacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `encarregadoeducacao` (
  `idEncarregado` int NOT NULL AUTO_INCREMENT,
  `contacto` varchar(45) NOT NULL,
  `parentesco` varchar(45) NOT NULL,
  `ccPessoa` int unsigned NOT NULL,
  PRIMARY KEY (`idEncarregado`,`ccPessoa`),
  KEY `fk_EncarregadoEducacao_Pessoa1_idx` (`ccPessoa`),
  CONSTRAINT `fk_EncarregadoEducacao_Pessoa1` FOREIGN KEY (`ccPessoa`) REFERENCES `pessoa` (`cartaoCidadao`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encarregadoeducacao`
--

LOCK TABLES `encarregadoeducacao` WRITE;
/*!40000 ALTER TABLE `encarregadoeducacao` DISABLE KEYS */;
INSERT INTO `encarregadoeducacao` VALUES (1,'936790183','PAI',295313546),(2,'936462943','MAE',281835582),(3,'964964782','PAI',159827628),(4,'964964787','PAI',159827636),(5,'965666574','TIO',211111111),(6,'965666572','TIO',211111112);
/*!40000 ALTER TABLE `encarregadoeducacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensagem`
--

DROP TABLE IF EXISTS `mensagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensagem` (
  `idmensagem` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(3000) NOT NULL,
  `idSala` int NOT NULL,
  `ccPessoa` int unsigned NOT NULL,
  PRIMARY KEY (`idmensagem`),
  KEY `fk_sala_idx` (`idSala`),
  KEY `fk_mensagem_pessoa_idx` (`ccPessoa`),
  CONSTRAINT `fk_mensagem_pessoa` FOREIGN KEY (`ccPessoa`) REFERENCES `pessoa` (`cartaoCidadao`),
  CONSTRAINT `fk_sala` FOREIGN KEY (`idSala`) REFERENCES `sala` (`idsala`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensagem`
--

LOCK TABLES `mensagem` WRITE;
/*!40000 ALTER TABLE `mensagem` DISABLE KEYS */;
INSERT INTO `mensagem` VALUES (1,'Ola, tudo bem? Gostaria de divulgar algumas informações.',7,154825342),(3,'Gostaria de informar que haverão novas atividades esta semana.',7,154825342),(4,'É tudo, muitos cumprimentos.',7,154825342),(5,'Atenciosamente,',7,154825342),(6,'Pedro Martins',7,154825342),(7,'Muito obrigado pelas informações.',7,281835582),(8,'Espero que os meus filhos gostem dessas novas atividades.',7,281835582),(9,'Gostaria de saber em que dia haverá Futebol.',7,281835582),(10,'Será no dia 13 deste mês.',7,154825342),(11,'Olá Tudo bem?',10,211111111),(12,'Gostaria de saber se está tudo bem com a Helena',10,211111111),(13,'Olá, está tudo bem sim!',10,154825342),(14,'Ela está a brincar com os dinossauros :)',10,154825342),(15,'Ela está a brincar com os dinossauros :)',10,154825342),(16,'Está tudo ok!',10,154825342),(17,'Olá',10,213757233);
/*!40000 ALTER TABLE `mensagem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pessoa`
--

DROP TABLE IF EXISTS `pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pessoa` (
  `cartaoCidadao` int unsigned NOT NULL,
  `nome` varchar(45) NOT NULL,
  `idade` int unsigned NOT NULL,
  PRIMARY KEY (`cartaoCidadao`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pessoa`
--

LOCK TABLES `pessoa` WRITE;
/*!40000 ALTER TABLE `pessoa` DISABLE KEYS */;
INSERT INTO `pessoa` VALUES (1,'Horacio Drummond',53),(82123456,'Miguel Silva',2),(83456789,'Ana Oliveira',1),(84567890,'Pedro Santos',3),(85789012,'Beatriz Costa',0),(86890123,'Rui Pereira',35),(87901234,'Carla Fonseca',42),(89012345,'José Martins',50),(90123456,'Sofia Sousa',28),(101866776,'Marta Silva',22),(111306120,'Luís Mendes',34),(114937360,'Mariano Fernandes',2),(117082778,'Rui Oliveira',40),(137498006,'Leonor Mendes',2),(147370932,'Joao Costa',1),(147819490,'José Costa',27),(154825342,'Pedro Martins',29),(159827628,'Jose Fernandes',34),(159827636,'Lubelio Romualdo',38),(159827647,'Jose Fernandes',34),(164083702,'Carlos Pereira',35),(171812432,'Daniel Sousa',0),(172850580,'Ana Santos',28),(175156429,'Beatriz Sousa',26),(179168908,'Mariana Oliveira',0),(179813564,'Catarina Fernandes',32),(189648359,'Tomás Santos',1),(199656762,'Sofia Almeida',31),(204621455,'Tiago Santos',30),(211111111,'Vitor Gouveia',43),(211111112,'Pedro Gouveia',43),(213508244,'Francisco Martins',1),(213757233,'Isabel Pereira',37),(221388237,'Miguel Oliveira',24),(222222223,'Roberto Gouveia',1),(223056814,'Lara Costa',0),(231060989,'Raquel Fernandes',31),(231061319,'Inês Rodrigues',33),(233333332,'Beatriz Gouveia',2),(233333333,'Helena Gouveia',2),(238714575,'Ricardo Silva',2),(248590430,'Joao Silva',57),(253638596,'Cátia Silva',23),(256827624,'Emidio Gomes',42),(260100048,'João Sousa',28),(269364312,'Gonçalo Almeida',35),(281835582,'Ana Costa',29),(294388767,'Carolina Almeida',2),(295313546,'Hugo Martins',26),(295807548,'Luna Costa',1);
/*!40000 ALTER TABLE `pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sala`
--

DROP TABLE IF EXISTS `sala`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sala` (
  `idsala` int NOT NULL AUTO_INCREMENT,
  `tituloSala` varchar(100) NOT NULL,
  PRIMARY KEY (`idsala`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sala`
--

LOCK TABLES `sala` WRITE;
/*!40000 ALTER TABLE `sala` DISABLE KEYS */;
INSERT INTO `sala` VALUES (6,'Mariano Fernandes'),(7,'Ana Pereira'),(8,'Joao Vasconcelos'),(9,'Comunicação Interna'),(10,'Helena Gouveia'),(11,'Beatriz Gouveia');
/*!40000 ALTER TABLE `sala` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sala_has_pessoa`
--

DROP TABLE IF EXISTS `sala_has_pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sala_has_pessoa` (
  `idSala` int NOT NULL,
  `ccPessoa` int unsigned NOT NULL,
  PRIMARY KEY (`idSala`,`ccPessoa`),
  KEY `fk_sala_has_pessoa_sala1_idx` (`idSala`),
  KEY `fk_sala_has_pessoa_pessoa1_idx` (`ccPessoa`),
  CONSTRAINT `fk_sala_has_pessoa_pessoa1` FOREIGN KEY (`ccPessoa`) REFERENCES `pessoa` (`cartaoCidadao`),
  CONSTRAINT `fk_sala_has_pessoa_sala` FOREIGN KEY (`idSala`) REFERENCES `sala` (`idsala`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sala_has_pessoa`
--

LOCK TABLES `sala_has_pessoa` WRITE;
/*!40000 ALTER TABLE `sala_has_pessoa` DISABLE KEYS */;
INSERT INTO `sala_has_pessoa` VALUES (6,172850580),(6,213757233),(6,231060989),(6,231061319),(6,295313546),(7,1),(7,164083702),(7,213757233),(7,231060989),(7,231061319),(7,281835582),(8,154825342),(8,159827636),(8,159827647),(8,213757233),(8,231060989),(8,231061319),(9,1),(9,213757233),(9,231060989),(9,231061319),(9,256827624),(10,154825342),(10,159827647),(10,211111111),(10,213757233),(10,231060989),(10,231061319),(10,256827624),(11,154825342),(11,159827647),(11,211111112),(11,213757233),(11,231060989),(11,231061319),(11,256827624);
/*!40000 ALTER TABLE `sala_has_pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turma`
--

DROP TABLE IF EXISTS `turma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turma` (
  `idTurma` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`idTurma`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turma`
--

LOCK TABLES `turma` WRITE;
/*!40000 ALTER TABLE `turma` DISABLE KEYS */;
INSERT INTO `turma` VALUES (1),(2),(3),(4);
/*!40000 ALTER TABLE `turma` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-20 18:30:03
