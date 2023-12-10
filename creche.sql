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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anuncio`
--

LOCK TABLES `anuncio` WRITE;
/*!40000 ALTER TABLE `anuncio` DISABLE KEYS */;
INSERT INTO `anuncio` VALUES (1,1,'Se você procura um ambiente acolhedor e educativo para o seu filho, não procure mais. Estamos aceitando inscrições para todas as idades. Agende uma visita à nossa creche para conhecer nossa equipe, instalações e descobrir como podemos fazer a diferença na vida do seu filho.','Ambiente'),(2,1,'A criatividade é o coração da nossa creche! Proporcionamos atividades educativas e lúdicas que incentivam o desenvolvimento cognitivo e emocional das crianças. Pintura, música, jogos - cada dia é uma oportunidade para aprender e se divertir!','Atividades Criativas');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anuncioturma`
--

LOCK TABLES `anuncioturma` WRITE;
/*!40000 ALTER TABLE `anuncioturma` DISABLE KEYS */;
INSERT INTO `anuncioturma` VALUES (1,1,'Queridos Encarregados de Educação,\n\nÉ com grande entusiasmo que partilhamos as novidades empolgantes da nossa jornada educativa! Na qualidade de educadores dedicados, estamos empenhados em proporcionar uma experiência educacional significativa para os vossos queridos filhos.','Anúncio Especial para Encarregados de Educação');
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
  `idEducador` int NOT NULL,
  `idTurma` int unsigned NOT NULL,
  PRIMARY KEY (`idAtividade`,`idEducador`,`idTurma`),
  UNIQUE KEY `idAtividade_UNIQUE` (`idAtividade`),
  KEY `fk_Atividade_Turma1_idx` (`idTurma`),
  KEY `fk_Atividade_Educador1_idx` (`idEducador`),
  CONSTRAINT `fk_Atividade_Educador1` FOREIGN KEY (`idEducador`) REFERENCES `educador` (`idEducador`),
  CONSTRAINT `fk_Atividade_Turma1` FOREIGN KEY (`idTurma`) REFERENCES `turma` (`idTurma`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atividade`
--

LOCK TABLES `atividade` WRITE;
/*!40000 ALTER TABLE `atividade` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auxiliareducativo`
--

LOCK TABLES `auxiliareducativo` WRITE;
/*!40000 ALTER TABLE `auxiliareducativo` DISABLE KEYS */;
INSERT INTO `auxiliareducativo` VALUES (1,2106.95,231061319),(2,2677.4,231060989),(3,2066.14,213757233);
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
  `observacao` varchar(45) DEFAULT NULL,
  `data` datetime NOT NULL,
  `idCrianca` int NOT NULL,
  `idAtividade` int unsigned NOT NULL,
  PRIMARY KEY (`idAvaliacao`,`idCrianca`,`idAtividade`),
  KEY `fk_Avaliacao_Crianca1_idx` (`idCrianca`),
  KEY `fk_Avaliacao_Atividade1_idx` (`idAtividade`),
  CONSTRAINT `fk_Avaliacao_Atividade1` FOREIGN KEY (`idAtividade`) REFERENCES `atividade` (`idAtividade`),
  CONSTRAINT `fk_Avaliacao_Crianca1` FOREIGN KEY (`idCrianca`) REFERENCES `crianca` (`idCrianca`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacao`
--

LOCK TABLES `avaliacao` WRITE;
/*!40000 ALTER TABLE `avaliacao` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `crianca`
--

LOCK TABLES `crianca` WRITE;
/*!40000 ALTER TABLE `crianca` DISABLE KEYS */;
INSERT INTO `crianca` VALUES (1,114937360,4),(2,137498006,4),(3,171812432,1),(4,179168908,4),(5,189648359,2),(6,213508244,4),(7,223056814,1),(8,238714575,1),(9,294388767,4),(10,295807548,2);
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
INSERT INTO `crianca_has_encarregadoeducacao` VALUES (1,1);
/*!40000 ALTER TABLE `crianca_has_encarregadoeducacao` ENABLE KEYS */;
UNLOCK TABLES;

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
  CONSTRAINT `fk_Educador_Pessoa1` FOREIGN KEY (`ccPessoa`) REFERENCES `pessoa` (`cartaoCidadao`),
  CONSTRAINT `fk_Educador_Turma1` FOREIGN KEY (`idTurma`) REFERENCES `turma` (`idTurma`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `educador`
--

LOCK TABLES `educador` WRITE;
/*!40000 ALTER TABLE `educador` DISABLE KEYS */;
INSERT INTO `educador` VALUES (1,967883954,1598.5,1,164083702),(2,924866182,1023.88,2,154825342),(3,936249581,4323.89,3,147819490),(4,968232947,2547.81,3,172850580);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encarregadoeducacao`
--

LOCK TABLES `encarregadoeducacao` WRITE;
/*!40000 ALTER TABLE `encarregadoeducacao` DISABLE KEYS */;
INSERT INTO `encarregadoeducacao` VALUES (1,'936790183','PAI',295313546),(2,'936462943','MAE',281835582);
/*!40000 ALTER TABLE `encarregadoeducacao` ENABLE KEYS */;
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
INSERT INTO `pessoa` VALUES (101866776,'Marta Silva',22),(111306120,'Luís Mendes',34),(114937360,'Mariano Fernandes',2),(117082778,'Rui Oliveira',40),(137498006,'Leonor Mendes',2),(147819490,'José Costa',27),(154825342,'Pedro Martins',29),(164083702,'Carlos Pereira',35),(171812432,'Daniel Sousa',0),(172850580,'Ana Santos',28),(175156429,'Beatriz Sousa',26),(179168908,'Mariana Oliveira',0),(179813564,'Catarina Fernandes',32),(189648359,'Tomás Santos',1),(199656762,'Sofia Almeida',31),(204621455,'Tiago Santos',30),(213508244,'Francisco Martins',1),(213757233,'Isabel Pereira',37),(221388237,'Miguel Oliveira',24),(223056814,'Ana Pereira',0),(231060989,'Raquel Fernandes',31),(231061319,'Inês Rodrigues',33),(238714575,'Ricardo Silva',2),(253638596,'Cátia Silva',23),(260100048,'João Sousa',28),(269364312,'Gonçalo Almeida',35),(281835582,'Ana Costa',29),(294388767,'Carolina Almeida',2),(295313546,'Hugo Martins',26),(295807548,'Lara Costa',1);
/*!40000 ALTER TABLE `pessoa` ENABLE KEYS */;
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

-- Dump completed on 2023-12-10  2:04:29
