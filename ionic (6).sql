-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 11 août 2024 à 08:55
-- Version du serveur : 10.4.24-MariaDB
-- Version de PHP : 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `ionic`
--

-- --------------------------------------------------------

--
-- Structure de la table `achatalimentation`
--

CREATE TABLE `achatalimentation` (
  `commentaire1` varchar(200) NOT NULL,
  `commentaire2` varchar(200) NOT NULL,
  `id` int(100) NOT NULL,
  `commentaire3` varchar(300) NOT NULL,
  `livraison` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `achatalimentation`
--

INSERT INTO `achatalimentation` (`commentaire1`, `commentaire2`, `id`, `commentaire3`, `livraison`) VALUES
('             Achat en alimentation', '             Acheter en alimentation et faites vous livrer a partir de 1000 fr.', 1, '             Pingoping le multi-service par excellence.', ' ');

-- --------------------------------------------------------

--
-- Structure de la table `achatpoule`
--

CREATE TABLE `achatpoule` (
  `id` int(255) NOT NULL,
  `commentaire1` varchar(600) NOT NULL,
  `commentaire2` varchar(600) NOT NULL,
  `commentaire3` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `achatpoule`
--

INSERT INTO `achatpoule` (`id`, `commentaire1`, `commentaire2`, `commentaire3`) VALUES
(1, ' Achat de poule', 'Achetez des poules et faites vous livrer. ', ' Pingoping le multi-service par excellence.');

-- --------------------------------------------------------

--
-- Structure de la table `apropos`
--

CREATE TABLE `apropos` (
  `id` int(200) NOT NULL,
  `commentaire` varchar(350) NOT NULL,
  `contact` varchar(350) NOT NULL,
  `email` varchar(350) NOT NULL,
  `version` varchar(350) NOT NULL,
  `facebook` varchar(600) NOT NULL,
  `youtube` varchar(1000) NOT NULL,
  `instagram` varchar(1000) NOT NULL,
  `whatsapp` varchar(1000) NOT NULL,
  `tiktok` varchar(1000) NOT NULL,
  `logo` varchar(600) NOT NULL,
  `telegram` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `apropos`
--

INSERT INTO `apropos` (`id`, `commentaire`, `contact`, `email`, `version`, `facebook`, `youtube`, `instagram`, `whatsapp`, `tiktok`, `logo`, `telegram`) VALUES
(1, 'Pingoping, le multi-service prés de chez vous !', 'Contact : 74-44-34-34', 'Email: pingoping@gmail.com', 'Version: 1.0.0', 'https://www.facebook.com/profile.php?id=100063953026273', 'Facebook', 'non', 'Facebook', 'tiktok', 'MNhZgeGEMbK8F2AzmpWe.jpg', 'Facebook');

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id` int(100) NOT NULL,
  `nom_categorie` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `nom_categorie`) VALUES
(23, 'commerce'),
(24, 'service');

-- --------------------------------------------------------

--
-- Structure de la table `climatiseur`
--

CREATE TABLE `climatiseur` (
  `id` int(255) NOT NULL,
  `commentaire1` varchar(5000) NOT NULL,
  `commentaire2` varchar(600) NOT NULL,
  `commentaire3` varchar(300) NOT NULL,
  `prix` varchar(350) NOT NULL,
  `lienphoto` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `climatiseur`
--

INSERT INTO `climatiseur` (`id`, `commentaire1`, `commentaire2`, `commentaire3`, `prix`, `lienphoto`) VALUES
(1, '   ggp', '   ggl', '   ggkghl', '   ggjj', '   http://localhost/img/poulet.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `coiffeur`
--

CREATE TABLE `coiffeur` (
  `id` int(255) NOT NULL,
  `commentaire1` varchar(5000) NOT NULL,
  `commentaire2` varchar(600) NOT NULL,
  `commentaire3` varchar(300) NOT NULL,
  `prix` varchar(350) NOT NULL,
  `lienphoto` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `coiffeur`
--

INSERT INTO `coiffeur` (`id`, `commentaire1`, `commentaire2`, `commentaire3`, `prix`, `lienphoto`) VALUES
(1, '   ggpjj', '   gglk', '   ggkll4', '   ggjjmm', '   http://localhost/img/poulet.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `commentairepub`
--

CREATE TABLE `commentairepub` (
  `id` varchar(100) NOT NULL,
  `pubid` varchar(100) NOT NULL,
  `heure` varchar(100) NOT NULL,
  `commentaire` varchar(8000) NOT NULL,
  `nom` varchar(150) NOT NULL,
  `prenom` varchar(150) NOT NULL,
  `iduser` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `commentairepub`
--

INSERT INTO `commentairepub` (`id`, `pubid`, `heure`, `commentaire`, `nom`, `prenom`, `iduser`) VALUES
('6627e55cef403', '1082', '2024-04-23T16:44:12.721Z', 'Kevinh', 'Bambara', ' Kevin Anderson', '6'),
('6627e571193ee', '1082', '2024-04-23T16:44:33.055Z', 'Ok', 'Bambara', ' Kevin Anderson', '6'),
('6627ed1509fa9', '1082', '2024-04-23T17:17:08.793Z', 'g', 'Bambara', ' Kevin Anderson', '6'),
('6627ed1e7cac0', '1082', '2024-04-23T17:17:18.495Z', 'tr', 'Bambara', ' Kevin Anderson', '6'),
('6627efcf9d1c2', '1070', '2024-04-23T17:28:47.593Z', 'Ok j\'arrive', 'Bambara', ' Kevin Anderson', '6'),
('6627efda401e0', '1070', '2024-04-23T17:28:58.207Z', 'D\'accord', 'Bambara', ' Kevin Anderson', '6'),
('6627efe039ba2', '1070', '2024-04-23T17:29:04.186Z', 'QUOI', 'Bambara', ' Kevin Anderson', '6'),
('6627efeab5ddd', '1070', '2024-04-23T17:29:14.684Z', 'Ou', 'Bambara', ' Kevin Anderson', '6'),
('6627eff2a9dd5', '1070', '2024-04-23T17:29:22.675Z', 'okok', 'Bambara', ' Kevin Anderson', '6'),
('6627f07c27232', '1070', '2024-04-23T17:31:40.131Z', 'Salut choisi', 'Bambara', ' Kevin Anderson', '6'),
('6627f99c9ebc7', '1082', '2024-04-23T18:10:36.584Z', 't', 'Bambara', ' Kevin Anderson', '6'),
('6627f9f9ddf7e', '1082', '2024-04-23T18:12:09.863Z', 'g', 'Bambara', ' Kevin Anderson', '6'),
('6627f9f9dbb03', '1082', '2024-04-23T18:12:09.855Z', 'g', 'Bambara', ' Kevin Anderson', '6'),
('6627f9f9e13da', '1082', '2024-04-23T18:12:09.867Z', 'g', 'Bambara', ' Kevin Anderson', '6'),
('6627fa2cac128', '1082', '2024-04-23T18:13:00.514Z', 'lin', 'Bambara', ' Kevin Anderson', '6'),
('6627fa4012145', '1082', '2024-04-23T18:13:20.045Z', 'j', 'Bambara', ' Kevin Anderson', '6'),
('6627fa62e6c98', '1082', '2024-04-23T18:13:54.909Z', 'ffvyttvvyivyicvtreeerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr this.loadcommentairepub(this.pubid); this.loadcommentairepub(this.pubid); this.loadcommentairepub(this.pubid); this.loadcommentairepub(this.pubid); this.loadcommentairepub(this.pubid); this.loadcommentairepub(this.pubid); this.loadcommentairepub(this.pubid); this.loadcommentairepub(this.pubid); this.loadcommentairepub(this.pubid); this.loadcommentairepub(this.pubid); this.loadcommentairepub(this.pubid);rrrrccccccccccccccccccc', 'Bambara', ' Kevin Anderson', '6'),
('663a26bddc66f', '1070', '2024-05-07T13:03:57.838Z', 'k', 'Bambara', ' Kevin Anderson', '6'),
('663a2d42adfeb', '1070', '2024-05-07T13:31:46.680Z', 'f', 'Bambara', ' Kevin Anderson', '6'),
('663a2e36ef989', '1070', '2024-05-07T13:35:50.927Z', 'sd', 'Bambara', ' Kevin Anderson', '6'),
('663a366ce0386', '1070', '2024-05-07T14:10:52.877Z', 'df', 'Bambara', ' Kevin Anderson', '6'),
('663a36720d68e', '1070', '2024-05-07T14:10:58.026Z', 'dr', 'Bambara', ' Kevin Anderson', '6'),
('663a367bb398e', '1070', '2024-05-07T14:11:07.717Z', 'fr', 'Bambara', ' Kevin Anderson', '6'),
('663a3705df43a', '1070', '2024-05-07T14:13:25.885Z', 'dr', 'Bambara', ' Kevin Anderson', '6'),
('663a370dbce34', '1070', '2024-05-07T14:13:33.744Z', 'kev', 'Bambara', ' Kevin Anderson', '6'),
('663aa35c967ee', '1070', '2024-05-07T21:55:40.511Z', 'gdd', 'Bambara', ' Kevin Anderson', '6'),
('663aa36743f3b', '1070', '2024-05-07T21:55:51.256Z', '', 'Bambara', ' Kevin Anderson', '6'),
('663aa368d8f46', '1070', '2024-05-07T21:55:52.845Z', '', 'Bambara', ' Kevin Anderson', '6'),
('663aa43d3b898', '1070', '2024-05-07T21:59:25.204Z', 'hg', 'Bambara', ' Kevin Anderson', '6'),
('663aa454a89b1', '1070', '2024-05-07T21:59:48.669Z', 'Test Kevin', 'Bambara', ' Kevin Anderson', '6'),
('663aa45c0e6cc', '1070', '2024-05-07T21:59:56.031Z', 'Kevinnzns', 'Bambara', ' Kevin Anderson', '6'),
('663aab8a685f8', '1070', '2024-05-07T22:30:34.375Z', 'ddddd', 'Bambara', ' Kevin Anderson', '6'),
('663aaeaa56f71', '1070', '2024-05-07T22:43:54.296Z', 'ff', 'Bambara', ' Kevin Anderson', '6'),
('663aaf67282bb', '1070', '2024-05-07T22:47:03.140Z', 'Salut super idée', 'Bambara', ' Kevin Anderson', '6'),
('663aaf6ebb00e', '1070', '2024-05-07T22:47:10.703Z', 'ok', 'Bambara', ' Kevin Anderson', '6'),
('663aaf77c37c1', '1070', '2024-05-07T22:47:19.776Z', 'ookk', 'Bambara', ' Kevin Anderson', '6'),
('663ab0c96f288', '1070', '2024-05-07T22:52:57.414Z', 'h', 'Bambara', ' Kevin Anderson', '6'),
('663ab0db75806', '1070', '2024-05-07T22:53:15.460Z', 'dd', 'Bambara', ' Kevin Anderson', '6'),
('663ab0e1f395f', '1070', '2024-05-07T22:53:21.966Z', 'ier', 'Bambara', ' Kevin Anderson', '6'),
('663ab0f045f77', '1070', '2024-05-07T22:53:36.260Z', 'f', 'Bambara', ' Kevin Anderson', '6'),
('663ab1ccbaf2a', '1070', '2024-05-07T22:57:16.747Z', 'gt', 'Bambara', ' Kevin Anderson', '6'),
('663ab5888c67f', '1070', '2024-05-07T23:13:12.541Z', 'ddr', 'Bambara', ' Kevin Anderson', '6'),
('663ab59328c60', '1070', '2024-05-07T23:13:23.144Z', 'rr', 'Bambara', ' Kevin Anderson', '6'),
('663aba90dff2a', '1070', '2024-05-07T23:34:40.892Z', 'dd', 'Bambara', ' Kevin Anderson', '6'),
('663ac3421c8f3', '1070', '2024-05-08T00:11:45.871Z', 'dd', 'Bambara', ' Kevin Anderson', '6'),
('663acefdcd8e7', '1070', '2024-05-08T01:01:49.793Z', 'Salut ', 'Bambara', ' Kevin Anderson', '6'),
('663ad203ee732', '1070', '2024-05-08T01:14:43.950Z', 'Fadini', 'Bambara', ' Kevin Anderson', '6'),
('663bef45eba29', '1070', '2024-05-08T21:31:49.919Z', 'Salut', 'Bambara', ' Kevin Anderson', '6'),
('663bf7b95eb39', '1070', '2024-05-08T22:07:53.362Z', 'ee', 'Bambara', ' Kevin Anderson', '6'),
('663bf7d273793', '1070', '2024-05-08T22:08:18.421Z', 'ff', 'Bambara', ' Kevin Anderson', '6'),
('663c02dacbb7d', '1070', '2024-05-08T22:55:22.792Z', 'f', 'Bambara', ' Kevin Anderson', '6'),
('663c03025abcb', '1070', '2024-05-08T22:56:02.306Z', 'fui', 'Bambara', ' Kevin Anderson', '6'),
('663d430c86660', '1070', '2024-05-09T21:41:32.507Z', 'Giu', 'Bambara', ' Kevin Anderson', '6'),
('663d4bfadba7a', '1070', '2024-05-09T22:19:38.885Z', '', 'Bambara', ' Kevin Anderson', '6'),
('663d5912702ce', '1070', '2024-05-09T23:15:30.445Z', 'Fadinif', 'Bambara', ' Kevin Anderson', '6'),
('663d59180099c', '1070', '2024-05-09T23:15:35.981Z', '', 'Bambara', ' Kevin Anderson', '6'),
('663d594b7bfec', '1070', '2024-05-09T23:16:27.484Z', 'az', 'Bambara', ' Kevin Anderson', '6'),
('663d595c687a6', '1070', '2024-05-09T23:16:44.403Z', 'sik', 'Bambara', ' Kevin Anderson', '6'),
('663d5980a4b62', '1070', '2024-05-09T23:17:20.661Z', 'Run', 'Bambara', ' Kevin Anderson', '6'),
('663d59b027548', '1070', '2024-05-09T23:18:08.149Z', 'h', 'Bambara', ' Kevin Anderson', '6'),
('663d5d828bcd6', '1070', '2024-05-09T23:34:26.526Z', 'gg', 'Bambara', ' Kevin Anderson', '6'),
('663d5d931ff9d', '1070', '2024-05-09T23:34:43.110Z', 'vghy', 'Bambara', ' Kevin Anderson', '6'),
('663d5da09c09d', '1070', '2024-05-09T23:34:56.620Z', '', 'Bambara', ' Kevin Anderson', '6'),
('663d5da3b83ca', '1070', '2024-05-09T23:34:59.740Z', 'v', 'Bambara', ' Kevin Anderson', '6'),
('663d5db5eeba4', '1070', '2024-05-09T23:35:17.960Z', 'g', 'Bambara', ' Kevin Anderson', '6'),
('663d5dfdc5f90', '1070', '2024-05-09T23:36:29.782Z', 'gg', 'Bambara', ' Kevin Anderson', '6'),
('663d66a54e28d', '1070', '2024-05-10T00:13:25.311Z', 'hh', 'Bambara', ' Kevin Anderson', '6'),
('663d6a04795da', '1070', '2024-05-10T00:27:48.465Z', 'QQ', 'Bambara', ' Kevin Anderson', '6'),
('663d6a4ee9106', '1070', '2024-05-10T00:29:02.945Z', 'kini', 'Bambara', ' Kevin Anderson', '6'),
('663d6add172b1', '8', '2024-05-10T00:31:25.039Z', 'bon', 'Bambara', ' Kevin Anderson', '6');

-- --------------------------------------------------------

--
-- Structure de la table `commentaires`
--

CREATE TABLE `commentaires` (
  `id` varchar(200) NOT NULL,
  `pubid` varchar(100) NOT NULL,
  `heure` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `commentaire` varchar(10000) NOT NULL,
  `nom` varchar(150) NOT NULL,
  `prenom` varchar(150) NOT NULL,
  `iduser` varchar(150) NOT NULL,
  `idcommentrepondu` varchar(200) DEFAULT NULL,
  `traitement` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `commentaires`
--

INSERT INTO `commentaires` (`id`, `pubid`, `heure`, `commentaire`, `nom`, `prenom`, `iduser`, `idcommentrepondu`, `traitement`) VALUES
('606653f67ddd2b7', '8', '2024-05-27 02:57:01', 'ok', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('606653f85f2abb0', '1082', '2024-05-27 03:05:03', 'Q', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('606653f86e370e5', '1082', '2024-05-27 03:05:18', 'ok', 'Kevin', 'kevin', '85', NULL, NULL),
('606653f87abe38a', '1082', '2024-05-27 03:05:30', 'f', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('606654032e78fac', '1070', '2024-05-27 03:51:10', ' OlorumER', 'Kevin', 'kevin', '85', NULL, NULL),
('606654844054509', '1070', '2024-05-27 13:01:52', ' essaie', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('6066548eab58c79', '1070', '2024-05-27 13:46:18', 'Ta', 'Kevin', 'kevin', '85', NULL, NULL),
('606659d3c787b69', '1081', '2024-05-31 13:42:31', 'rt', ' Bambara', '  Kevin Anderson', '6', NULL, NULL),
('606659d825b627f', '1061', '2024-05-31 14:01:09', 'salut', ' Bambara', '  Kevin Anderson', '6', NULL, NULL),
('606659d9b423b39', '1054', '2024-05-31 14:07:48', 'rtt', ' Bambara', '  Kevin Anderson', '6', NULL, NULL),
('664e11f1784a0', '1070', '2024-07-08 06:12:47', '  Salut test 90', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e12582082c', '1070', '2024-05-22 15:42:16', ' SalutY', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e126bdbd5c', '1070', '2024-05-22 15:42:35', 'sdsd', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e12a6e41b1', '1070', '2024-05-22 15:43:34', 'rt', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e13aae12b1', '1070', '2024-05-22 15:47:54', 'rt', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e1481a712d', '1070', '2024-05-22 15:51:29', 'd', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e153cc8085', '1070', '2024-05-22 15:54:36', 'fg', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e15632f585', '1070', '2024-05-22 15:55:15', 'rty', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e15b68b648', '1070', '2024-05-22 15:56:38', 'hu', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e1aabb5aa6', '1070', '2024-05-22 16:17:47', 'tu', 'Anderson', 'Kevin', '81', '664e11f1784a0', NULL),
('664e1b71a44db', '1070', '2024-05-22 16:21:05', 'er', 'Anderson', 'Kevin', '81', '664e1aabb5aa6', NULL),
('664e1b7dd9f5a', '1070', '2024-05-22 16:21:17', 'yy', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e1d3fbc25a', '1070', '2024-05-22 16:28:47', 'ok', 'Anderson', 'Kevin', '81', '664e1481a712d', NULL),
('664e1d4ee85fc', '1070', '2024-05-22 16:29:02', 'sakut', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e24b3d6a13', '1070', '2024-05-22 17:00:35', 'd', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e24c2d92f3', '1070', '2024-05-22 17:00:50', 's', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e24f60518f', '1070', '2024-05-22 17:01:41', 'Ok Juste', 'Anderson', 'Kevin', '81', '664e11f1784a0', NULL),
('664e254285c60', '1070', '2024-05-22 17:02:58', 'Ok vue', 'Anderson', 'Kevin', '81', '664e11f1784a0', NULL),
('664e2adfa3553', '1070', '2024-05-22 17:26:55', 'fr', 'Anderson', 'Kevin', '81', '664e11f1784a0', NULL),
('664e366d1ea99', '1070', '2024-05-22 18:16:13', 'okk', 'Anderson', 'Kevin', '81', '664e24b3d6a13', NULL),
('664e80a823844', '1070', '2024-05-22 23:32:56', 'dr', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e80c8da4c5', '1070', '2024-05-22 23:33:28', 'e', 'Anderson', 'Kevin', '81', '664e366d1ea99', NULL),
('664e80d6ec09c', '1070', '2024-05-22 23:33:42', 'ty', 'Anderson', 'Kevin', '81', '664e80c8da4c5', NULL),
('664e827847b96', '1070', '2024-05-22 23:40:40', 'Okay', 'Anderson', 'Kevin', '81', '664e80d6ec09c', NULL),
('664e828dda9e5', '1070', '2024-05-22 23:41:01', 'Salutt', 'Anderson', 'Kevin', '81', '664e827847b96', NULL),
('664e82aee6c1f', '1070', '2024-05-22 23:41:34', 'rien', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e82fabb91e', '1070', '2024-05-22 23:42:50', 'Sut ', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e8309864e3', '1070', '2024-05-22 23:43:05', 'ok', 'Anderson', 'Kevin', '81', '664e82fabb91e', NULL),
('6651d851372c4', '8', '2024-05-25 12:23:45', 'Jolie repas', 'Kevin', 'kevin', '85', NULL, NULL),
('6651db792b24c', '1081', '2024-05-25 12:37:13', 'Kevin', 'Kevin', 'kevin', '85', NULL, NULL),
('6651db87eb182', '1081', '2024-05-25 12:37:27', 'ok', 'Kevin', 'kevin', '85', NULL, NULL),
('6651dba8b47e8', '1081', '2024-05-25 12:38:00', 'ui', 'Kevin', 'kevin', '85', NULL, NULL),
('66526b9048fb5', '1070', '2024-05-25 22:52:00', 'yes', 'Kevin', 'kevin', '85', NULL, NULL),
('665270ece35bc', '1070', '2024-05-25 23:14:52', 's', 'Kevin', 'kevin', '85', NULL, NULL),
('6652719b08e84', '1070', '2024-05-25 23:17:47', 'z', 'Kevin', 'kevin', '85', NULL, NULL),
('66527645944d5', '1070', '2024-05-25 23:37:41', 're', 'Kevin', 'kevin', '85', NULL, NULL),
('6684eb9b61798', '1054', '2024-07-03 06:11:39', 'ok', ' Bambara', '  Kevin Anderson', '6', NULL, NULL),
('6684ebd81bb6e', '1054', '2024-07-03 06:12:40', 'Mr bean', ' Bambara', '  Kevin Anderson', '6', NULL, NULL),
('6684ec1f2c35f', '1070', '2024-05-25 23:37:41', '43434', ' Bambara', '  Kevin Anderson', '6', '664e1b7dd9f5a', NULL),
('6684ec1f2c35fVVD', '1070', '2024-05-25 23:37:41', 'AJOUTER COMMET\r\n', ' Bambara', '  Kevin Anderson', '6', '664e1b7dd9f5a', NULL),
('668c189e82790', '8', '2024-07-08 16:49:34', 'q', ' Bambara', '  Kevin Anderson', '6', NULL, NULL),
('668c5d3fc5c2a', '1070', '2024-07-08 21:42:23', 'dd', ' Bambara', '  Kevin Anderson', '6', NULL, NULL),
('668c5d511e559', '1070', '2024-07-08 21:42:41', 'dd', ' Bambara', '  Kevin Anderson', '6', NULL, NULL),
('669d2f0bb03d3', '668c66e797ce8', '2024-07-21 15:53:47', 'Salut', '   Bambara', '   Kevin Anderson ', '6', NULL, NULL),
('669d2f5da204b', '8', '2024-07-21 15:55:09', 'quoi', '   Bambara', '   Kevin Anderson ', '6', '668c189e82790', NULL),
('669d2f7c08a30', '8', '2024-07-21 15:55:40', 'ok', '   Bambara', '   Kevin Anderson ', '6', NULL, NULL),
('669d302edeb6f', '8', '2024-07-21 15:58:38', 'true', '   Bambara', '   Kevin Anderson ', '6', NULL, NULL),
('66b28a326244a', '8', '2024-08-06 20:40:18', 'Ok', '    Bambara', ' Louis16', '6', NULL, NULL),
('66b3869a3ecf8', '80000P', '2024-08-07 14:37:14', 'ok', '     Bambara', '  Louiszz', '6', NULL, NULL),
('66b85111f2aa0', '8', '2024-08-11 05:50:09', 'zdaz', 'Bambara', 'Kevin', '2065d6f1672677T', NULL, NULL),
('66b851bfa684a', '1044', '2024-08-11 05:53:03', 'ff', 'Bambara', 'Kevin', '2065d6f1672677T', NULL, NULL),
('66b852408603f', '1044', '2024-08-11 06:20:57', ' Ballon', 'Bambara', 'Kevin', '2065d6f1672677T', NULL, NULL);

--
-- Déclencheurs `commentaires`
--
DELIMITER $$
CREATE TRIGGER `after_commentaires_delete` AFTER DELETE ON `commentaires` FOR EACH ROW BEGIN
    INSERT INTO redis_events_commentaires (action, commentaires_id) VALUES ('delete', OLD.id);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_commentaires_insert` AFTER INSERT ON `commentaires` FOR EACH ROW BEGIN
    INSERT INTO redis_events_commentaires (action, commentaires_id) VALUES ('insert', NEW.id);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_commentaires_update` AFTER UPDATE ON `commentaires` FOR EACH ROW BEGIN
    INSERT INTO redis_events_commentaires (action, commentaires_id, old_commentaires_id) VALUES ('update', NEW.id, OLD.id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `commentairesstockage`
--

CREATE TABLE `commentairesstockage` (
  `id` varchar(200) NOT NULL,
  `pubid` varchar(100) NOT NULL,
  `heure` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `commentaire` varchar(10000) NOT NULL,
  `nom` varchar(150) NOT NULL,
  `prenom` varchar(150) NOT NULL,
  `iduser` varchar(150) NOT NULL,
  `idcommentrepondu` varchar(200) DEFAULT NULL,
  `traitement` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `commentairesstockage`
--

INSERT INTO `commentairesstockage` (`id`, `pubid`, `heure`, `commentaire`, `nom`, `prenom`, `iduser`, `idcommentrepondu`, `traitement`) VALUES
('606653f67ddd2b7', '8', '2024-05-27 02:57:01', 'ok', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('606653f77aeb09b', '1070', '2024-05-27 03:01:14', '4', 'Kevin', 'kevin', '85', NULL, NULL),
('606653f85f2abb0', '1082', '2024-05-27 03:05:03', 'Q', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('606653f86e370e5', '1082', '2024-05-27 03:05:18', 'ok', 'Kevin', 'kevin', '85', NULL, NULL),
('606653f87abe38a', '1082', '2024-05-27 03:05:30', 'f', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('6066540154bcefa', '1070', '2024-05-27 03:43:16', 'okkev', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('606654017e6de4d', '1070', '2024-05-27 03:43:58', 'ok', 'Kevin', 'kevin', '85', NULL, NULL),
('60665402067e16d', '1070', '2024-05-27 03:46:14', 'ok', 'Kevin', 'kevin', '85', NULL, NULL),
('60665402fe91509', '1070', '2024-05-27 03:50:22', 'yes', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('606654030f502cc', '1070', '2024-05-27 03:50:39', 'ok', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('606654032086de4', '1070', '2024-05-27 03:50:56', 'ok', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('606654032e78fac', '1070', '2024-05-27 03:51:10', 'Olorum', 'Kevin', 'kevin', '85', NULL, NULL),
('60665403424b869', '1070', '2024-05-27 03:51:30', 'quand', 'Kevin', 'kevin', '85', NULL, NULL),
('60665403bb7c600', '1070', '2024-05-27 03:53:31', 'u', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('60665403c754f3f', '1070', '2024-05-27 03:53:43', 't', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('606654040ebe2f2', '1070', '2024-05-27 03:54:54', 'h', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('606654790142816', '1070', '2024-05-27 12:13:53', 'hu', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('606654792a7c3dc', '1070', '2024-05-27 12:14:34', 'tu', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('606654793dc374e', '1070', '2024-05-27 12:14:53', 'ty', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('60665479c9cfe5d', '1070', '2024-05-27 12:17:13', 'ok', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('60665479da27c91', '1070', '2024-05-27 12:17:30', 'yes', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('60665479e6bc6bd', '1070', '2024-05-27 12:17:42', 'fin', 'Kevin', 'kevin', '85', NULL, NULL),
('606654816c4846a', '1070', '2024-05-27 12:49:48', 'h', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('606654818fd9c2c', '1070', '2024-05-27 12:50:23', 'hh', 'Kevin', 'kevin', '85', NULL, NULL),
('606654844054509', '1070', '2024-05-27 13:01:52', 'essazie', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('6066548eab58c79', '1070', '2024-05-27 13:46:18', 'Ta', 'Kevin', 'kevin', '85', NULL, NULL),
('606659d3c787b69', '1081', '2024-05-31 13:42:31', 'rt', ' Bambara', '  Kevin Anderson', '6', NULL, NULL),
('606659d825b627f', '1061', '2024-05-31 14:01:09', 'salut', ' Bambara', '  Kevin Anderson', '6', NULL, NULL),
('606659d9a7855dc', '1054', '2024-05-31 14:07:35', 't', ' Bambara', '  Kevin Anderson', '6', NULL, NULL),
('606659d9b423b39', '1054', '2024-05-31 14:07:48', 'rtt', ' Bambara', '  Kevin Anderson', '6', NULL, NULL),
('664169d0a326a', '1082', '2024-05-13 01:16:00', 'f', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664169dbc7f67', '1082', '2024-05-13 01:16:11', 'der', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66416acacb281', '1081', '2024-05-13 01:20:10', 'j', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66416af62e10e', '1081', '2024-05-13 01:20:54', 'f', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66416afee7ebf', '1081', '2024-05-13 01:21:02', 'rt', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66416cdc2d73b', '1081', '2024-05-13 01:29:00', 'h', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66416cea3f8a9', '1081', '2024-05-13 01:29:14', 'tu', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66416cf89cbf1', '1081', '2024-05-13 01:29:28', 'yu', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66416ee98e0d6', '8', '2024-05-13 01:37:45', 'd', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66416effb2c0f', '8', '2024-05-13 01:38:07', 'de', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66417040a801c', '8', '2024-05-13 01:43:28', 'Salut', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664170ac0b459', '1070', '2024-05-13 01:45:16', 'd', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664170d0abe80', '1070', '2024-05-13 01:45:52', 'f', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664171d4d4bf9', '1070', '2024-05-13 01:50:12', 'Ras', 'Bambara', ' Kevin Anderson', '6', '', ''),
('6641733ac8564', '1070', '2024-05-13 01:56:10', 'azerty', 'Bambara', ' Kevin Anderson', '6', '', ''),
('6641736cd24fd', '1070', '2024-05-13 01:57:00', 'der', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66417434e5498', '1081', '2024-05-13 02:00:20', 'ok', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664174e425dcf', '1081', '2024-05-13 02:03:16', 'rend', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664175329c577', '1081', '2024-05-13 02:04:34', 'g', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664175e87d5f1', '1070', '2024-05-13 02:07:36', 'fr', 'Bambara', ' Kevin Anderson', '6', '', ''),
('6641768125859', '1070', '2024-05-13 02:10:09', 'f', 'Bambara', ' Kevin Anderson', '6', '', ''),
('6641771a009a7', '1070', '2024-05-13 02:12:41', 'fond', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66417a7110d9a', '1081', '2024-05-13 02:26:57', 're', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66417a93602d6', '1081', '2024-05-13 02:27:31', 'r', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66417af6dc4e1', '1081', '2024-05-13 02:29:10', 'er', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66417b0cbfe83', '1081', '2024-05-13 02:29:32', 'ok test', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66417d5261080', '8', '2024-05-13 02:39:14', 'h', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66417d9b0ce97', '8', '2024-05-13 02:40:27', 're', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66417da6c46c1', '8', '2024-05-13 02:40:38', 'ez', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66417de08c3e3', '8', '2024-05-13 02:41:36', 'gt', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66417f5adb7b7', '8', '2024-05-13 02:47:54', 't', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66417f70ee03f', '8', '2024-05-13 02:48:16', 'rd', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66417f9d307dc', '8', '2024-05-13 02:49:01', 'Kev', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664180147fbbe', '8', '2024-05-13 02:51:00', 'Lind', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66418178c2ac8', '8', '2024-05-13 02:56:56', 'tu dis', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664181a3cf485', '8', '2024-05-13 02:57:39', 'dt', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66418215273b4', '8', '2024-05-13 02:59:33', 'dtt', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664182c5da6ca', '8', '2024-05-13 03:02:29', 'rend', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664182f815f11', '8', '2024-05-13 03:03:20', 'fi', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66418324b23a7', '8', '2024-05-13 03:04:04', 'dert', 'Bambara', ' Kevin Anderson', '6', '', ''),
('6641855e5d575', '8', '2024-05-13 03:13:34', 'f', 'Bambara', ' Kevin Anderson', '6', '', ''),
('6641859f7f9ec', '1061', '2024-05-13 03:14:39', 'fe', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664185b5898d5', '1061', '2024-05-13 03:15:01', 'ert', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664185c40acfd', '1061', '2024-05-13 03:15:16', 'Azeety', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664186265e39f', '1061', '2024-05-13 03:16:54', 'gt', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66418679376eb', '1061', '2024-05-13 03:18:17', 're', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66418804e455b', '1061', '2024-05-13 03:24:52', 'ty', 'Bambara', ' Kevin Anderson', '6', '', ''),
('6641881fdda29', '1061', '2024-05-13 03:25:19', 'Salut', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664188b9592b5', '1061', '2024-05-13 03:27:53', 'Salut test 1 2 ', 'Bambara', ' Kevin Anderson', '6', '', ''),
('6641895b2159a', '1061', '2024-05-13 03:30:35', 'okay ', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664189740dc3f', '1061', '2024-05-13 03:31:00', 'd', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664189eb593af', '1061', '2024-05-13 03:32:59', 's', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66418a6b37be3', '1061', '2024-05-13 03:35:07', 'tu bois', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66418b3e8ba8e', '1061', '2024-05-13 03:38:38', 'frf', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66418b8297178', '1061', '2024-05-13 03:39:46', 'es', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66418c1ee7d55', '1061', '2024-05-13 03:42:22', 'rap', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66418c6233c58', '1061', '2024-05-13 03:43:30', 'rea', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66418c709a80a', '1061', '2024-05-13 03:43:44', 'rea', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66418d41cbaf4', '1061', '2024-05-13 03:47:13', 'Zer', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66418dba63da9', '1061', '2024-05-13 03:49:14', 'ze', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66418e030c19a', '1061', '2024-05-13 03:50:27', 'yul', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66418e165a1bd', '1054', '2024-05-13 03:50:46', 'rt', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66418e1edb8cd', '1054', '2024-05-13 03:50:54', 'ok', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66418e2f76edf', '1054', '2024-05-13 03:51:11', 'k', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66418f4bc97d7', '1054', '2024-05-13 03:55:55', 'f', 'Bambara', ' Kevin Anderson', '6', '', ''),
('6641f4d7b6fdc', '1070', '2024-05-13 11:09:11', 'e', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664209bad942c', '1070', '2024-05-13 12:38:18', ' df', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664237f4aa9eb', '1070', '2024-05-13 15:55:32', 'g', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664244db21f54', '1070', '2024-05-13 16:50:35', 'd', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66426a05cfc5b', '1070', '2024-05-13 19:29:09', ' toggleOptions(commentaire: any) {   commentaire.showOptions = !commentaire.showOptions; }toggleOptions(commentaire: any) {   commentaire.showOptions = !commentaire.showOptions; }  toggleOptions(commentaire: any) {   commentaire.showOptions = !commentaire.showOptions; }toggleOptions(commentaire: any) {   commentaire.showOptions = !commentaire.showOptions; }toggleOptions(commentaire: any) {   commentaire.showOptions = !commentaire.showOptions; } toggleOptions(commentaire: any) {   commentaire.showOptions = !commentaire.showOptions; } toggleOptions(commentaire: any) {   commentaire.showOptions = !commentaire.showOptions; } toggleOptions(commentaire: any) {   commentaire.showOptions = !commentaire.showOptions; } toggleOptions(commentaire: any) {   commentaire.showOptions = !commentaire.showOptions; } toggleOptions(commentaire: any) {   commentaire.showOptions = !commentaire.showOptions; } toggleOptions(commentaire: any) {   commentaire.showOptions = !commentaire.showOptions; } toggleOptions(commentaire: any) {   commentaire.showOptions = !commentaire.showOptions; }toggleOptions(commentaire: any) {   commentaire.showOptions = !commentaire.showOptions; }', 'Bambara', ' Kevin Anderson', '6', '', ''),
('66426a1ca51d8', '1070', '2024-05-13 19:29:32', ' BMW', 'Bambara', ' Kevin Anderson', '6', '', ''),
('664388536c953', '1081', '2024-05-14 15:50:43', 'ok test 2', 'Bambara', ' Kevin Anderson', '6', '66417b0cbfe83', ''),
('66438d958aaea', '1081', '2024-05-14 16:13:09', 'ok test 23', 'Bambara', ' Kevin Anderson', '6', '664388536c953', ''),
('6643c262b6281', '1070', '2024-05-14 19:58:26', 'd', 'Bambara', ' Kevin Anderson', '6', '66426a05cfc5b', ''),
('6645538d85df0', '1070', '2024-05-16 00:30:05', 'd', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('664609df32056', '1070', '2024-05-16 13:27:59', 'f', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('66460a10e1c71', '1070', '2024-05-16 13:28:48', 'd', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('66460a77305df', '1070', '2024-05-16 13:30:31', 'f', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('664688299c95d', '1070', '2024-05-16 22:26:49', 'g', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('66468868464ba', '1070', '2024-05-16 22:27:52', 'f', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('66468ada3e3bc', '1070', '2024-05-16 22:38:18', 'QS', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('66468c77a6fba', '1070', '2024-05-16 22:45:11', 'sde', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('66469a4a5e61d', '1070', '2024-05-16 23:44:10', 'ddd', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('66469a6d74974', '1070', '2024-05-16 23:44:45', 'te', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('66469b1a88617', '1070', '2024-05-16 23:47:38', 'gg', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('6646c19fbea4a', '1070', '2024-05-17 02:31:59', 'Salut essaie 1234567890', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('6646c7c7b9541', '1070', '2024-05-17 02:58:15', 're', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('6646c7d5cf66a', '1070', '2024-05-17 02:58:29', 'vt', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('66490e742afe1', '1070', '2024-05-18 20:24:19', 'Salut', 'user', 'user', '2065d6f16726761', NULL, NULL),
('66490e745b600', '1070', '2024-05-18 20:24:20', 'Salut', 'user', 'user', '2065d6f16726761', NULL, NULL),
('66490fde641d9', '1054', '2024-05-18 20:30:18', 'salut', 'Kevin', 'kevin', '85', NULL, NULL),
('66490ff8867e9', '1054', '2024-05-18 20:30:44', 'Kevin beau goss', 'Kevin', 'kevin', '85', NULL, NULL),
('6649ed8e44cef', '1070', '2024-05-19 12:16:14', 'A', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('6649ee04ab595', '1070', '2024-05-19 12:18:12', 'ftr', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('6649fadeea255', '1070', '2024-05-19 13:13:02', 'f', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('664a0ab45faec', '1070', '2024-05-19 14:20:36', 'r', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('664a0b2b4a8e9', '1070', '2024-05-19 14:22:35', 'okokokokok', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('664a0bc8db6e6', '1070', '2024-05-19 14:25:12', 'tu', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('664a0c4f6afb2', '1081', '2024-05-19 14:27:27', 'g', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('664a0c5c5af72', '1081', '2024-05-19 14:27:40', 'y', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('664a0d5398e3a', '1081', '2024-05-19 14:31:47', 'g', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('664a0d804d506', '1081', '2024-05-19 14:32:32', 'gyt', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('664a0dfbe0809', '1081', '2024-05-19 14:34:35', 'tu as', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('664a1197b9bfd', '1070', '2024-05-19 14:49:59', 'gtr', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('664a11a960b07', '1070', '2024-05-19 14:50:17', 'f', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('664a12b4a57be', '1070', '2024-05-19 14:54:44', 'er', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('664a12c9c3147', '1070', '2024-05-19 14:55:05', 'Ok', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('664a2da2156d6', '1070', '2024-05-19 16:49:38', 'ff', 'Anderson', 'Kevin', '81', NULL, NULL),
('664a2f9b878d5', '1070', '2024-05-19 16:58:03', 'fg', 'Anderson', 'Kevin', '81', NULL, NULL),
('664a2faa270b6', '1070', '2024-05-19 16:58:18', 'ty', 'Anderson', 'Kevin', '81', NULL, NULL),
('664a778c899b7', '1070', '2024-05-19 22:05:00', 'OK merci', 'Anderson', 'Kevin', '81', NULL, NULL),
('664a7adb82119', '1082', '2024-05-19 22:19:07', 'g', 'Anderson', 'Kevin', '81', NULL, NULL),
('664a7aed22da0', '1082', '2024-05-19 22:19:25', 'merci', 'Anderson', 'Kevin', '81', NULL, NULL),
('664a7b6078d04', '1082', '2024-05-19 22:21:20', 'Fais', 'Anderson', 'Kevin', '81', NULL, NULL),
('664a7ddec3498', '1082', '2024-05-19 22:31:58', 'tu la', 'Anderson', 'Kevin', '81', NULL, NULL),
('664a7f40ad173', '1082', '2024-05-19 22:37:52', 'az', 'Anderson', 'Kevin', '81', NULL, NULL),
('664a84ec1debf', '1082', '2024-05-19 23:02:04', 'Salut', 'Anderson', 'Kevin', '81', NULL, NULL),
('664a84fa3d872', '1082', '2024-05-19 23:02:18', 'br', 'Anderson', 'Kevin', '81', NULL, NULL),
('664de5cf99206', '1081', '2024-05-22 12:32:15', 'QZ', 'Anderson', 'Kevin', '81', NULL, NULL),
('664de5e1e83dd', '1081', '2024-05-22 12:32:33', 'ft', 'Anderson', 'Kevin', '81', NULL, NULL),
('664de62b23a57', '1081', '2024-05-22 12:33:47', 'dr', 'Anderson', 'Kevin', '81', NULL, NULL),
('664de68677721', '1081', '2024-05-22 12:35:18', 'trr', 'Anderson', 'Kevin', '81', NULL, NULL),
('664df4cd393e6', '1081', '2024-05-22 13:36:13', 'gr', 'Anderson', 'Kevin', '81', NULL, NULL),
('664df4e05b370', '1081', '2024-05-22 13:36:32', 'rr', 'Anderson', 'Kevin', '81', NULL, NULL),
('664df5f2dfcfb', '1081', '2024-05-22 13:41:06', 'okok', 'Anderson', 'Kevin', '81', NULL, NULL),
('664df6295c7bb', '1081', '2024-05-22 13:42:01', 'er', 'Anderson', 'Kevin', '81', NULL, NULL),
('664df639013f1', '1081', '2024-05-22 13:42:16', 'd', 'Anderson', 'Kevin', '81', NULL, NULL),
('664df6b5205d6', '1081', '2024-05-22 13:44:21', 'de', 'Anderson', 'Kevin', '81', NULL, NULL),
('664df6edf0e93', '1081', '2024-05-22 13:45:17', 'ret', 'Anderson', 'Kevin', '81', NULL, NULL),
('664df6ffb9171', '1081', '2024-05-22 13:45:35', 'ty', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e0ccde4df2', '1081', '2024-05-22 15:18:37', 'quoi', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e0cf2d1f27', '1081', '2024-05-22 15:19:14', 'yuu', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e0da04b438', '1081', '2024-05-22 15:22:08', 'ty', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e11f1784a0', '1070', '2024-05-22 15:40:33', 'Salut test 123', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e12582082c', '1070', '2024-05-22 15:42:16', 'Salut', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e126bdbd5c', '1070', '2024-05-22 15:42:35', 'sdsd', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e12a6e41b1', '1070', '2024-05-22 15:43:34', 'rt', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e13aae12b1', '1070', '2024-05-22 15:47:54', 'rt', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e1481a712d', '1070', '2024-05-22 15:51:29', 'd', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e153cc8085', '1070', '2024-05-22 15:54:36', 'fg', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e15632f585', '1070', '2024-05-22 15:55:15', 'rty', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e15b68b648', '1070', '2024-05-22 15:56:38', 'hu', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e160079982', '1070', '2024-05-22 15:57:52', 'tu es la', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e175625805', '1070', '2024-05-22 16:03:34', 'kevin', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e1773c6420', '1070', '2024-05-22 16:04:03', '5', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e195bec4d6', '1070', '2024-05-22 16:12:11', 'ok', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e1d4ee85fc', '1070', '2024-05-22 16:29:02', 'sakut', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e21649e9f9', '1070', '2024-05-22 16:46:28', 'ft', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e22d41e5b9', '1070', '2024-05-22 16:52:36', 'Azerty', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e24b3d6a13', '1070', '2024-05-22 17:00:35', 'd', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e24c2d92f3', '1070', '2024-05-22 17:00:50', 's', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e25513b310', '1070', '2024-05-22 17:03:13', '2', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e80a823844', '1070', '2024-05-22 23:32:56', 'dr', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e82aee6c1f', '1070', '2024-05-22 23:41:34', 'rien', 'Anderson', 'Kevin', '81', NULL, NULL),
('664e82fabb91e', '1070', '2024-05-22 23:42:50', 'Sut ', 'Anderson', 'Kevin', '81', NULL, NULL),
('664fe074ef3e1', '1070', '2024-05-24 00:33:56', 'yes', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('664fe0eba8f5a', '1070', '2024-05-24 00:35:55', 'ok', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('664fe47ff3951', '1070', '2024-05-24 00:51:11', 'ok', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('66508ab80989a', '1070', '2024-05-24 12:40:24', 'yes', 'Bambara', ' Kevin Anderson', '6', NULL, NULL),
('6651d851372c4', '8', '2024-05-25 12:23:45', 'Jolie repas', 'Kevin', 'kevin', '85', NULL, NULL),
('6651db792b24c', '1081', '2024-05-25 12:37:13', 'Kevin', 'Kevin', 'kevin', '85', NULL, NULL),
('6651db87eb182', '1081', '2024-05-25 12:37:27', 'ok', 'Kevin', 'kevin', '85', NULL, NULL),
('6651dba8b47e8', '1081', '2024-05-25 12:38:00', 'ui', 'Kevin', 'kevin', '85', NULL, NULL),
('66526b9048fb5', '1070', '2024-05-25 22:52:00', 'yes', 'Kevin', 'kevin', '85', NULL, NULL),
('665270ece35bc', '1070', '2024-05-25 23:14:52', 's', 'Kevin', 'kevin', '85', NULL, NULL),
('6652719b08e84', '1070', '2024-05-25 23:17:47', 'z', 'Kevin', 'kevin', '85', NULL, NULL),
('66527645944d5', '1070', '2024-05-25 23:37:41', 're', 'Kevin', 'kevin', '85', NULL, NULL),
('6684eb9b61798', '1054', '2024-07-03 06:11:39', 'ok', ' Bambara', '  Kevin Anderson', '6', NULL, NULL),
('6684ebd81bb6e', '1054', '2024-07-03 06:12:40', 'Mr bean', ' Bambara', '  Kevin Anderson', '6', NULL, NULL),
('668c189e82790', '8', '2024-07-08 16:49:34', 'q', ' Bambara', '  Kevin Anderson', '6', NULL, NULL),
('668c5b829552e', '1070', '2024-07-08 21:34:58', 'd', ' Bambara', '  Kevin Anderson', '6', NULL, NULL),
('668c5d3fc5c2a', '1070', '2024-07-08 21:42:23', 'dd', ' Bambara', '  Kevin Anderson', '6', NULL, NULL),
('668c5d511e559', '1070', '2024-07-08 21:42:41', 'dd', ' Bambara', '  Kevin Anderson', '6', NULL, NULL),
('669d2f0bb03d3', '668c66e797ce8', '2024-07-21 15:53:47', 'Salut', '   Bambara', '   Kevin Anderson ', '6', NULL, NULL),
('669d2f7c08a30', '8', '2024-07-21 15:55:40', 'ok', '   Bambara', '   Kevin Anderson ', '6', NULL, NULL),
('669d302edeb6f', '8', '2024-07-21 15:58:38', 'true', '   Bambara', '   Kevin Anderson ', '6', NULL, NULL),
('66b28a326244a', '8', '2024-08-06 20:40:18', 'Ok', '    Bambara', ' Louis16', '6', NULL, NULL),
('66b3869a3ecf8', '80000P', '2024-08-07 14:37:14', 'ok', '     Bambara', '  Louiszz', '6', NULL, NULL),
('66b85111f2aa0', '8', '2024-08-11 05:50:09', 'zdaz', 'Bambara', 'Kevin', '2065d6f1672677T', NULL, NULL),
('66b851bfa684a', '1044', '2024-08-11 05:53:03', 'ff', 'Bambara', 'Kevin', '2065d6f1672677T', NULL, NULL),
('66b852408603f', '1044', '2024-08-11 05:55:12', 'zz', 'Bambara', 'Kevin', '2065d6f1672677T', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `coupon`
--

CREATE TABLE `coupon` (
  `commentaire1` varchar(600) NOT NULL,
  `betwinner` varchar(600) NOT NULL,
  `xbet` varchar(600) NOT NULL,
  `commentaire2` varchar(300) NOT NULL,
  `id` int(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `coupon`
--

INSERT INTO `coupon` (`commentaire1`, `betwinner`, `xbet`, `commentaire2`, `id`) VALUES
('      Pronostic du 20/10/2023', '     AKKZH', '     AIJHH', '     Jouons de façon Modère !!  ', 3);

-- --------------------------------------------------------

--
-- Structure de la table `depotretrait`
--

CREATE TABLE `depotretrait` (
  `commentaire1` varchar(350) NOT NULL,
  `commentaire2` varchar(350) NOT NULL,
  `commentaire3` varchar(350) NOT NULL,
  `depotmin` varchar(300) NOT NULL,
  `retraitmin` varchar(350) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `depotretrait`
--

INSERT INTO `depotretrait` (`commentaire1`, `commentaire2`, `commentaire3`, `depotmin`, `retraitmin`, `id`) VALUES
('   Achat en alimentation', '   Acheter en alimentation et faites vous livrer.', '   Pingoping le multi-service par excellence.', '   200 fr', '   500 fr', 1);

-- --------------------------------------------------------

--
-- Structure de la table `electricien`
--

CREATE TABLE `electricien` (
  `id` int(255) NOT NULL,
  `commentaire1` varchar(5000) NOT NULL,
  `commentaire2` varchar(600) NOT NULL,
  `commentaire3` varchar(300) NOT NULL,
  `prix` varchar(350) NOT NULL,
  `lienphoto` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `electricien`
--

INSERT INTO `electricien` (`id`, `commentaire1`, `commentaire2`, `commentaire3`, `prix`, `lienphoto`) VALUES
(1, '     ggpjj', '     gglkvin', '     ggkll4sfin', '     ggjjmm', '     http://localhost/img/poulet.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `etatdelikes`
--

CREATE TABLE `etatdelikes` (
  `id` int(255) NOT NULL,
  `idpub` int(255) NOT NULL,
  `iduser` varchar(40) NOT NULL,
  `contactuser` varchar(255) NOT NULL,
  `etat` varchar(20) NOT NULL,
  `heure` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `etatdelikes`
--

INSERT INTO `etatdelikes` (`id`, `idpub`, `iduser`, `contactuser`, `etat`, `heure`) VALUES
(753, 232321, '6', '62023367', 'oui', '2024-07-07 02:28:34'),
(756, 232978, '6', '62023367', 'oui', '2024-07-07 03:12:35'),
(758, 1070, '6', '62023367', 'oui', '2024-07-08 03:04:08'),
(760, 1044, '6', '62023367', 'oui', '2024-08-08 23:15:54'),
(761, 0, '', '', '', '2024-07-07 17:51:04'),
(762, 2329780, '6', '62023367', 'oui', '2024-08-06 05:58:54'),
(763, 0, '', '', '', '2024-07-08 00:25:20'),
(764, 1081, '6', '62023367', 'non', '2024-07-08 04:13:31'),
(765, 0, '', '', '', '2024-07-08 03:18:09'),
(766, 89090, '6', '62023367', 'non', '2024-08-06 05:58:37'),
(767, 0, '', '', '', '2024-07-08 03:46:23'),
(768, 80000, '6', '62023367', 'non', '2024-08-08 23:07:38'),
(769, 8, '6', '62023367', 'non', '2024-08-08 23:07:34'),
(770, 0, '6', '62023367', 'oui', '2024-08-09 00:10:24'),
(771, 0, '', '', '', '2024-07-10 21:29:50'),
(772, 668, '6', '62023367', 'non', '2024-08-08 23:17:38'),
(773, 0, '2065d6f16726761', '74443434', 'non', '2024-07-17 03:41:54'),
(774, 668, '2065d6f16726761', '74443434', 'oui', '2024-07-17 03:35:47'),
(775, 8, '2065d6f16726761', '74443434', 'oui', '2024-07-17 03:35:51'),
(776, 89090, '2065d6f16726761', '74443434', 'oui', '2024-07-17 03:35:54'),
(777, 2329780, '2065d6f16726761', '74443434', 'oui', '2024-07-17 03:35:57'),
(778, 1070, '2065d6f16726761', '74443434', 'non', '2024-07-17 03:38:42'),
(779, 10700, '2065d6f16726761', '74443434', 'oui', '2024-07-17 03:37:33'),
(780, 8, '66b184cfdb637', '74443434', 'non', '2024-08-06 04:21:36'),
(781, 0, '6', 'undefined', 'oui', '2024-08-06 23:34:47'),
(782, 89090, '6', 'undefined', 'non', '2024-08-10 03:09:49'),
(783, 80000, '6', 'undefined', 'oui', '2024-08-10 03:10:32'),
(784, 668, '2065d6f1672677T', 'undefined', 'oui', '2024-08-10 15:09:23');

--
-- Déclencheurs `etatdelikes`
--
DELIMITER $$
CREATE TRIGGER `after_likes_delete` AFTER DELETE ON `etatdelikes` FOR EACH ROW BEGIN
    INSERT INTO redis_events_likes (action, etatdelikes_id, idpub) VALUES ('delete', OLD.id, OLD.idpub);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_likes_insert` AFTER INSERT ON `etatdelikes` FOR EACH ROW BEGIN
    INSERT INTO redis_events_likes (action, etatdelikes_id, idpub) VALUES ('insert', NEW.id, NEW.idpub);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_likes_update` AFTER UPDATE ON `etatdelikes` FOR EACH ROW BEGIN
    INSERT INTO redis_events_likes (action, etatdelikes_id, old_etatdelikes_id, idpub) VALUES ('update', NEW.id, OLD.id, NEW.idpub);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `fastfood`
--

CREATE TABLE `fastfood` (
  `nomplat` varchar(350) NOT NULL,
  `prix` varchar(350) NOT NULL,
  `id` int(11) NOT NULL,
  `lienphoto` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `fastfood`
--

INSERT INTO `fastfood` (`nomplat`, `prix`, `id`, `lienphoto`) VALUES
('chawarma', 'a partir de 1500 fr', 2, 'http://localhost/img/chawarma.jpg'),
('poulet kfc', ' a partir de 1500 fr', 3, 'http://localhost/img/poulet.jpeg'),
('boisson fraiche', 'a partir de 1000 fr', 4, 'http://localhost/img/boisson.jpg'),
('pain anglais', 'a partir de 1000 fr', 5, 'http://localhost/img/panini.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `festival`
--

CREATE TABLE `festival` (
  `id` int(255) NOT NULL,
  `commentaire1` varchar(5000) NOT NULL,
  `commentaire2` varchar(600) NOT NULL,
  `commentaire3` varchar(300) NOT NULL,
  `prix` varchar(350) NOT NULL,
  `lienphoto` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `festival`
--

INSERT INTO `festival` (`id`, `commentaire1`, `commentaire2`, `commentaire3`, `prix`, `lienphoto`) VALUES
(1, '      ggpjj', '      gglkvin', '      ggkll4sfin', '      ggjjmmok', '      http://localhost/img/poulet.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `formationinformatique`
--

CREATE TABLE `formationinformatique` (
  `id` int(200) NOT NULL,
  `commentaire1` varchar(350) NOT NULL,
  `prix` varchar(350) NOT NULL,
  `lienphoto` varchar(300) NOT NULL,
  `commentaire2` varchar(5000) NOT NULL,
  `commentaire3` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `formationinformatique`
--

INSERT INTO `formationinformatique` (`id`, `commentaire1`, `prix`, `lienphoto`, `commentaire2`, `commentaire3`) VALUES
(2, ' ggo', ' ggj', ' http://localhost/img/poulet.jpegf', ' ggh', ' ggh');

-- --------------------------------------------------------

--
-- Structure de la table `gateau`
--

CREATE TABLE `gateau` (
  `id` int(255) NOT NULL,
  `commentaire1` varchar(5000) NOT NULL,
  `commentaire2` varchar(600) NOT NULL,
  `commentaire3` varchar(300) NOT NULL,
  `prix` varchar(350) NOT NULL,
  `lienphoto` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `gateau`
--

INSERT INTO `gateau` (`id`, `commentaire1`, `commentaire2`, `commentaire3`, `prix`, `lienphoto`) VALUES
(1, '     ggpjjkevin', '     gglk', '     ggkll4snfran', '     ggjjmm', '     http://localhost/img/poulet.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `genie-civil`
--

CREATE TABLE `genie-civil` (
  `id` int(255) NOT NULL,
  `commentaire1` varchar(5000) NOT NULL,
  `commentaire2` varchar(600) NOT NULL,
  `commentaire3` varchar(300) NOT NULL,
  `prix` varchar(350) NOT NULL,
  `lienphoto` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `genie-civil`
--

INSERT INTO `genie-civil` (`id`, `commentaire1`, `commentaire2`, `commentaire3`, `prix`, `lienphoto`) VALUES
(1, '     ggpjjkevin', '     gglk', '     ggkll4snfran frank', '     ggjjmm', '     http://localhost/img/poulet.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `grade_utilisateur`
--

CREATE TABLE `grade_utilisateur` (
  `id` int(10) NOT NULL,
  `nom_grade` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `grade_utilisateur`
--

INSERT INTO `grade_utilisateur` (`id`, `nom_grade`) VALUES
(1, 'utilisateur'),
(2, 'admin'),
(3, 'superadmin');

-- --------------------------------------------------------

--
-- Structure de la table `livraison`
--

CREATE TABLE `livraison` (
  `id` int(255) NOT NULL,
  `commentaire1` varchar(5000) NOT NULL,
  `commentaire2` varchar(600) NOT NULL,
  `commentaire3` varchar(300) NOT NULL,
  `prix` varchar(350) NOT NULL,
  `lienphoto` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `livraison`
--

INSERT INTO `livraison` (`id`, `commentaire1`, `commentaire2`, `commentaire3`, `prix`, `lienphoto`) VALUES
(1, '   ggp4', '   gglfffff', '   ggk33', '   ggjj', '   http://localhost/img/poulet.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `management_artiste`
--

CREATE TABLE `management_artiste` (
  `id` int(250) NOT NULL,
  `commentaire1` varchar(5000) NOT NULL,
  `commentaire2` varchar(600) NOT NULL,
  `commentaire3` varchar(600) NOT NULL,
  `lienphoto` varchar(650) NOT NULL,
  `prix` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `management_artiste`
--

INSERT INTO `management_artiste` (`id`, `commentaire1`, `commentaire2`, `commentaire3`, `lienphoto`, `prix`) VALUES
(1, ' Management Artiste', ' okkk', ' Pingoping, le multi-service près de chez vous !', ' http://localhost/img/formation4.jpg', ' fff');

-- --------------------------------------------------------

--
-- Structure de la table `materiel_informatique`
--

CREATE TABLE `materiel_informatique` (
  `id` int(255) NOT NULL,
  `commentaire1` varchar(5000) NOT NULL,
  `commentaire2` varchar(600) NOT NULL,
  `commentaire3` varchar(300) NOT NULL,
  `prix` varchar(350) NOT NULL,
  `lienphoto` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `materiel_informatique`
--

INSERT INTO `materiel_informatique` (`id`, `commentaire1`, `commentaire2`, `commentaire3`, `prix`, `lienphoto`) VALUES
(1, '    ggpjj', '    gglk', '    ggkll4s', '    ggjjmm', '    http://localhost/img/poulet.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `menuisier`
--

CREATE TABLE `menuisier` (
  `id` int(255) NOT NULL,
  `commentaire1` varchar(5000) NOT NULL,
  `commentaire2` varchar(600) NOT NULL,
  `commentaire3` varchar(300) NOT NULL,
  `prix` varchar(350) NOT NULL,
  `lienphoto` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `menuisier`
--

INSERT INTO `menuisier` (`id`, `commentaire1`, `commentaire2`, `commentaire3`, `prix`, `lienphoto`) VALUES
(1, '  ggp', '  ggl', '  ggk', '  ggjj', '  http://localhost/img/poulet.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `message_user`
--

CREATE TABLE `message_user` (
  `id` varchar(30) NOT NULL,
  `iduser` varchar(30) NOT NULL,
  `nom` varchar(35) NOT NULL,
  `prenom` varchar(70) NOT NULL,
  `message` varchar(360) NOT NULL,
  `contact` int(70) NOT NULL,
  `heure_message` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `message_user`
--

INSERT INTO `message_user` (`id`, `iduser`, `nom`, `prenom`, `message`, `contact`, `heure_message`) VALUES
('66b79d7720881', '2065d6f1672677T', 'Bambara', 'Kevin', 'Salut j\'aodre votre application, seulement kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkfezzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', 0, '2024-08-11 04:21:41'),
('66b79dfaf1df4', '2065d6f1672677T', 'Bambara', 'Kevin', 'rzrz', 0, '2024-08-11 04:21:41'),
('66b79e51489bf', '2065d6f1672677T', 'Bambara', 'Kevin', 'rzrz', 0, '2024-08-11 04:21:41'),
('66b79f112c688', '2065d6f1672677T', 'Bambara', 'Kevin', 'rzrz', 0, '2024-08-11 04:21:41'),
('66b79faa1041f', '2065d6f1672677T', 'Bambara', 'Kevin', 'rzrz', 0, '2024-08-11 04:21:41'),
('66b7a0001afeb', '2065d6f1672677T', 'Bambara', 'Kevin', 'rzrz', 0, '2024-08-11 04:21:41'),
('66b7a06606f23', '2065d6f1672677T', 'Bambara', 'Kevin', 'rzrzr', 0, '2024-08-11 04:21:41'),
('66b7a1082796f', '2065d6f1672677T', 'Bambara', 'Kevin', 'rzrzr', 0, '2024-08-11 04:21:41'),
('66b7a7ad30ca3', '2065d6f1672677T', 'Bambara', 'Kevin', 'uhifbh', 0, '2024-08-11 04:21:41'),
('66b7a80153985', '2065d6f1672677T', 'Bambara', 'Kevin', 'errfz', 0, '2024-08-11 04:21:41'),
('66b7a80b35dfd', '2065d6f1672677T', 'Bambara', 'Kevin', 'errfz', 0, '2024-08-11 04:21:41'),
('66b7ab336fef5', '2065d6f1672677T', 'Bambara', 'Kevin', 'e(tet', 62023367, '2024-08-11 04:21:41'),
('66b7ab520e203', '2065d6f1672677T', 'Bambara', 'Kevin', 'e(tet', 0, '2024-08-11 04:21:41'),
('66b833b38a304', '2065d6f1672677T', 'Bambara', 'Kevin', 'Kevin', 6202221, '2024-08-11 04:21:41'),
('66b8341bced38', '2065d6f1672677T', 'Bambara', 'Kevin', 'ekk', 6202221, '2024-08-11 04:21:41'),
('66b834b744617', '2065d6f1672677T', 'Bambara', 'Kevin', 'kk', 6202221, '2024-08-11 04:21:41'),
('66b835b172c54', '2065d6f1672677T', 'Bambara', 'Kevin', 'kk', 6202221, '2024-08-11 04:21:41'),
('66b8360228814', '2065d6f1672677T', 'Bambara', 'Kevin', 'Salut', 6202221, '2024-08-11 04:21:41');

-- --------------------------------------------------------

--
-- Structure de la table `message_userstockage`
--

CREATE TABLE `message_userstockage` (
  `id` varchar(30) NOT NULL,
  `iduser` varchar(30) NOT NULL,
  `nom` varchar(35) NOT NULL,
  `prenom` varchar(70) NOT NULL,
  `message` varchar(350) NOT NULL,
  `contact` int(70) NOT NULL,
  `heure_message` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `message_userstockage`
--

INSERT INTO `message_userstockage` (`id`, `iduser`, `nom`, `prenom`, `message`, `contact`, `heure_message`) VALUES
('66b79d7720881', '2065d6f1672677T', 'Bambara', 'Kevin', 'Salut j\'aodre votre application, seulement kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkfezzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz', 0, '2024-08-11 04:21:57'),
('66b79dfaf1df4', '2065d6f1672677T', 'Bambara', 'Kevin', 'rzrz', 0, '2024-08-11 04:21:57'),
('66b79e51489bf', '2065d6f1672677T', 'Bambara', 'Kevin', 'rzrz', 0, '2024-08-11 04:21:57'),
('66b79f112c688', '2065d6f1672677T', 'Bambara', 'Kevin', 'rzrz', 0, '2024-08-11 04:21:57'),
('66b79faa1041f', '2065d6f1672677T', 'Bambara', 'Kevin', 'rzrz', 0, '2024-08-11 04:21:57'),
('66b7a0001afeb', '2065d6f1672677T', 'Bambara', 'Kevin', 'rzrz', 0, '2024-08-11 04:21:57'),
('66b7a06606f23', '2065d6f1672677T', 'Bambara', 'Kevin', 'rzrzr', 0, '2024-08-11 04:21:57'),
('66b7a1082796f', '2065d6f1672677T', 'Bambara', 'Kevin', 'rzrzr', 0, '2024-08-11 04:21:57'),
('66b7a7ad30ca3', '2065d6f1672677T', 'Bambara', 'Kevin', 'uhifbh', 0, '2024-08-11 04:21:57'),
('66b7a80153985', '2065d6f1672677T', 'Bambara', 'Kevin', 'errfz', 0, '2024-08-11 04:21:57'),
('66b7a80b35dfd', '2065d6f1672677T', 'Bambara', 'Kevin', 'errfz', 0, '2024-08-11 04:21:57'),
('66b7ab336fef5', '2065d6f1672677T', 'Bambara', 'Kevin', 'e(tet', 62023367, '2024-08-11 04:21:57'),
('66b7ab520e203', '2065d6f1672677T', 'Bambara', 'Kevin', 'e(tet', 0, '2024-08-11 04:21:57'),
('66b833b38a304', '2065d6f1672677T', 'Bambara', 'Kevin', 'Kevin', 6202221, '2024-08-11 04:21:57'),
('66b8341bced38', '2065d6f1672677T', 'Bambara', 'Kevin', 'ekk', 6202221, '2024-08-11 04:21:57'),
('66b834b744617', '2065d6f1672677T', 'Bambara', 'Kevin', 'kk', 6202221, '2024-08-11 04:21:57'),
('66b835b172c54', '2065d6f1672677T', 'Bambara', 'Kevin', 'kk', 6202221, '2024-08-11 04:21:57'),
('66b8360228814', '2065d6f1672677T', 'Bambara', 'Kevin', 'Salut', 6202221, '2024-08-11 04:21:57');

-- --------------------------------------------------------

--
-- Structure de la table `numero_service`
--

CREATE TABLE `numero_service` (
  `id` int(200) NOT NULL,
  `nom_service` varchar(200) NOT NULL,
  `numero` int(11) NOT NULL,
  `description` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `numero_service`
--

INSERT INTO `numero_service` (`id`, `nom_service`, `numero`, `description`) VALUES
(1, 'onea', 303022, 'Office National de l\'Eau et de l\'Assainissementt'),
(3, 'RTB', 3030, 'Télévision National'),
(666, 'k', 743434, 'j');

-- --------------------------------------------------------

--
-- Structure de la table `pmu`
--

CREATE TABLE `pmu` (
  `commentaire1` varchar(600) NOT NULL,
  `numdujour` varchar(350) NOT NULL,
  `num2` varchar(350) NOT NULL,
  `commentaire2` varchar(600) NOT NULL,
  `id` int(11) NOT NULL,
  `nbrpartant` varchar(100) NOT NULL,
  `typecourse` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `pmu`
--

INSERT INTO `pmu` (`commentaire1`, `numdujour`, `num2`, `commentaire2`, `id`, `nbrpartant`, `typecourse`) VALUES
('  Pronostic quarté du 20/10/2023', '  Pronostic: 10-12-5-7', '  Belle chance: 5-7-8-9', '  Bonne chance', 1, '  16', '  Plat');

-- --------------------------------------------------------

--
-- Structure de la table `pub`
--

CREATE TABLE `pub` (
  `titre` longtext NOT NULL,
  `commentaire` longtext NOT NULL,
  `photo` varchar(4000) NOT NULL,
  `id` varchar(100) NOT NULL,
  `likes` mediumtext DEFAULT '0',
  `contact` int(255) NOT NULL,
  `longitude` varchar(2000) NOT NULL,
  `latitude` varchar(2000) NOT NULL,
  `rangpub` int(255) NOT NULL,
  `date` varchar(1000) NOT NULL,
  `datefin` varchar(1000) NOT NULL,
  `heure` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `admin` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `pub`
--

INSERT INTO `pub` (`titre`, `commentaire`, `photo`, `id`, `likes`, `contact`, `longitude`, `latitude`, `rangpub`, `date`, `datefin`, `heure`, `admin`) VALUES
('try ', 'Quand je t’ai rencontrer pour la première Quand je t’ai rencontrer pour la première fois je ne pensais pas que tu allais tout changer dans ma vie , sa à commencer par des regards et des échanges de petits SMS , t’es mots doux ont su me faire craquer j’ai essayé de résister à ton charme mais rien à faire mon amour pour est trop grand plus les jours passe plus je m’attache à toi de plus en plus, mon cœur bas plus vite quand je te voie tu es devenue la seule personnes qui compte tu es le seul homme qui me comble, sans toi je suis perdue, tu es ma force mon ange je tiens à toi et je t’aime plus que la vie elle-même.Quand je t’ai rencontrer pour la première fois je ne pensais pas que tu allais tout changer dans ma vie , sa à commencer par des regards et des échanges de petits SMS , t’es mots doux ont su me faire craquer j’ai essayé de résister à ton charme mais rien à faire mon amour pour est trop grand plus les jours passe plus je m’attache à toi de plus en plus, mon cœur bas plus vite quand je te voie tu es devenue la seule personnes qui compte tu es le seul homme qui me comble, sans toi je suis perdue, tu es ma force mon ange je tiens à toi et je t’aime plus que la vie elle-même.fois je ne pensais pas que tu allais tout changer dans ma vie , sa à commencer par des regards et des échanges de petits SMS , t’es mots doux ont su me faire craquer j’ai essayé de résister à ton charme mais rien à faire mon amour pour est trop grand plus les jours passe plus je m’attache à toi de plus en plus, mon cœur bas plus vite quand je te voie tu es devenue la seule personnes qui compte tu es le seul homme qui me comble, sans toi je suis perdue, tu es ma force mon ange je tiens à toi et je t’aime plus que la vie elle-même. Quand je t’ai rencontrer pour la première Quand je t’ai rencontrer pour la première fois je ne pensais pas que tu allais tout changer dans ma vie , sa à commencer par des regards et des échanges de petits SMS , t’es mots doux ont su me faire craquer j’ai essayé de résister à ton charme mais rien à faire mon amour pour est trop grand plus les jours passe plus je m’attache à toi de plus en plus, mon cœur bas plus vite quand je te voie tu es devenue la seule personnes qui compte tu es le seul homme qui me comble, sans toi je suis perdue, tu es ma force mon ange je tiens à toi et je t’aime plus que la vie elle-même.Quand je t’ai rencontrer pour la première fois je ne pensais pas que tu allais tout changer dans ma vie , sa à commencer par des regards et des échanges de petits SMS , t’es mots doux ont su me faire craquer j’ai essayé de résister à ton charme mais rien à faire mon amour pour est trop grand plus les jours passe plus je m’attache à toi de plus en plus, mon cœur bas plus vite quand je te voie tu es devenue la seule personnes qui compte tu es le seul homme qui me comble, sans toi je suis perdue, tu es ma force mon ange je tiens à toi et je t’aime plus que la vie elle-même.fois je ne pensais pas que tu allais tout changer dans ma vie , sa à commencer par des regards et des échanges de petits SMS , t’es mots doux ont su me faire craquer j’ai essayé de résister à ton charme mais rien à faire mon amour pour est trop grand plus les jours passe plus je m’attache à toi de plus en plus, mon cœur bas plus vite quand je te voie tu es devenue la seule personnes qui compte tu es le seul homme qui me comble, sans toi je suis perdue, tu es ma force mon ange je tiens à toi et je t’aime plus que la vie elle-même.', 'QZK7FkaKd3lwXmpKvowG.jpg', '1044', '0', 44, '0', '0', 999, '2024-07-23T22:20:00', '2024-07-24T21:20:00', '2024-07-17 02:11:02', 'admin'),
('tee-short', 'Burkina', '65c2c4e18099b.png', '1070', ' 7', 0, '12', '12', 50, 'non', 'non', '2024-07-17 03:10:04', 'non'),
('tee-short 22', 'Burkina', '65c2c4e18099b.png', '10700', ' 7', 0, '12', '12', 50, 'non', 'non', '2024-07-17 03:14:46', 'non'),
('non', 'Qualité', '65c2339900878.mp4', '232978', ' 0', 7070, 'non', 'non', 50, '2024-12-8T04:52:00', '2024-12-21T04:53:00', '2024-07-17 02:03:12', 'admin'),
('bonbon', '  FF', 'dSBurPZOTWzrDyqfGdSW.jpg', '2329780', ' 0', 0, '0', '0', 8, 'non', 'non', '2024-07-17 01:40:28', 'non'),
('Kevin', 'Anderson', '0rWvK9nvVXLEMjpOFzt6.png', '668c66e797ce8', '0', 70222232, '92355', '045', 1, 'non', 'non', '2024-07-17 03:43:01', 'non'),
('Kevin', 'Anderson', '0rWvK9nvVXLEMjpOFzt6.png', '668efd2d7c3bb', '0', 70222232, '92355', '045', 1, 'non', 'non', '2024-07-17 03:14:04', 'non'),
('joue', '  visité le nouveau site ici https://chat.openai.com', 'p7SMAlqDKCHbFEXDqhb1.jpg', '8', '0', 0, '-1.5197', '12.3714', 2, '2024-8-8T04:53:00', '2024-10-25T04:53:00', '2024-07-17 01:40:35', 'non'),
('Ajout 2024', '  visité le nouveau site ici https://chat.openai.com', 'p7SMAlqDKCHbFEXDqhb1.jpg', '80000P', '0', 0, '-1.5197', '12.3714', 2, 'non', 'non', '2024-07-17 03:14:23', 'admin'),
('Ajout', '  visité le nouveau site ici https://chat.openai.com', 'p7SMAlqDKCHbFEXDqhb1.jpg', '89090', '0', 0, '-1.5197', '12.3714', 2, '2024-12-8T04:52:00', '2024-12-21T04:53:00', '2024-07-17 01:40:40', 'non'),
('non', 'non', '65b691d65b2a2.mp4', 'abcd1', '0', 0, 'non', 'non', 50, 'non', 'non', '2024-07-17 01:40:47', 'non'),
('non', 'non', '65b691d65b2a2.mp4', 'azerty', '0', 0, 'non', 'non', 0, 'non', 'non', '2024-07-17 02:07:31', 'non');

--
-- Déclencheurs `pub`
--
DELIMITER $$
CREATE TRIGGER `after_pub_delete` AFTER DELETE ON `pub` FOR EACH ROW BEGIN
    INSERT INTO redis_events_pub (action, pub_id) VALUES ('delete', OLD.id);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_pub_delete_row` AFTER DELETE ON `pub` FOR EACH ROW BEGIN
    DELETE FROM etatdelikes WHERE idpub = OLD.id;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_pub_insert` AFTER INSERT ON `pub` FOR EACH ROW BEGIN
    INSERT INTO redis_events_pub (action, pub_id) VALUES ('insert', NEW.id);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_pub_update` AFTER UPDATE ON `pub` FOR EACH ROW BEGIN
    INSERT INTO redis_events_pub (action, pub_id, old_pub_id) VALUES ('update', NEW.id, OLD.id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `pubstockage`
--

CREATE TABLE `pubstockage` (
  `titre` longtext NOT NULL,
  `commentaire` longtext NOT NULL,
  `photo` varchar(4000) NOT NULL,
  `id` varchar(100) NOT NULL,
  `likes` mediumtext DEFAULT '0',
  `contact` int(255) NOT NULL,
  `longitude` varchar(2000) NOT NULL,
  `latitude` varchar(2000) NOT NULL,
  `rangpub` varchar(2000) NOT NULL,
  `date` varchar(1000) NOT NULL,
  `datefin` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `pubstockage`
--

INSERT INTO `pubstockage` (`titre`, `commentaire`, `photo`, `id`, `likes`, `contact`, `longitude`, `latitude`, `rangpub`, `date`, `datefin`) VALUES
('try 3', 'Quand je t’ai rencontrer pour la première Quand je t’ai rencontrer pour la première fois je ne pensais pas que tu allais tout changer dans ma vie , sa à commencer par des regards et des échanges de petits SMS , t’es mots doux ont su me faire craquer j’ai essayé de résister à ton charme mais rien à faire mon amour pour est trop grand plus les jours passe plus je m’attache à toi de plus en plus, mon cœur bas plus vite quand je te voie tu es devenue la seule personnes qui compte tu es le seul homme qui me comble, sans toi je suis perdue, tu es ma force mon ange je tiens à toi et je t’aime plus que la vie elle-même.Quand je t’ai rencontrer pour la première fois je ne pensais pas que tu allais tout changer dans ma vie , sa à commencer par des regards et des échanges de petits SMS , t’es mots doux ont su me faire craquer j’ai essayé de résister à ton charme mais rien à faire mon amour pour est trop grand plus les jours passe plus je m’attache à toi de plus en plus, mon cœur bas plus vite quand je te voie tu es devenue la seule personnes qui compte tu es le seul homme qui me comble, sans toi je suis perdue, tu es ma force mon ange je tiens à toi et je t’aime plus que la vie elle-même.fois je ne pensais pas que tu allais tout changer dans ma vie , sa à commencer par des regards et des échanges de petits SMS , t’es mots doux ont su me faire craquer j’ai essayé de résister à ton charme mais rien à faire mon amour pour est trop grand plus les jours passe plus je m’attache à toi de plus en plus, mon cœur bas plus vite quand je te voie tu es devenue la seule personnes qui compte tu es le seul homme qui me comble, sans toi je suis perdue, tu es ma force mon ange je tiens à toi et je t’aime plus que la vie elle-même. Quand je t’ai rencontrer pour la première Quand je t’ai rencontrer pour la première fois je ne pensais pas que tu allais tout changer dans ma vie , sa à commencer par des regards et des échanges de petits SMS , t’es mots doux ont su me faire craquer j’ai essayé de résister à ton charme mais rien à faire mon amour pour est trop grand plus les jours passe plus je m’attache à toi de plus en plus, mon cœur bas plus vite quand je te voie tu es devenue la seule personnes qui compte tu es le seul homme qui me comble, sans toi je suis perdue, tu es ma force mon ange je tiens à toi et je t’aime plus que la vie elle-même.Quand je t’ai rencontrer pour la première fois je ne pensais pas que tu allais tout changer dans ma vie , sa à commencer par des regards et des échanges de petits SMS , t’es mots doux ont su me faire craquer j’ai essayé de résister à ton charme mais rien à faire mon amour pour est trop grand plus les jours passe plus je m’attache à toi de plus en plus, mon cœur bas plus vite quand je te voie tu es devenue la seule personnes qui compte tu es le seul homme qui me comble, sans toi je suis perdue, tu es ma force mon ange je tiens à toi et je t’aime plus que la vie elle-même.fois je ne pensais pas que tu allais tout changer dans ma vie , sa à commencer par des regards et des échanges de petits SMS , t’es mots doux ont su me faire craquer j’ai essayé de résister à ton charme mais rien à faire mon amour pour est trop grand plus les jours passe plus je m’attache à toi de plus en plus, mon cœur bas plus vite quand je te voie tu es devenue la seule personnes qui compte tu es le seul homme qui me comble, sans toi je suis perdue, tu es ma force mon ange je tiens à toi et je t’aime plus que la vie elle-même.', 'QZK7FkaKd3lwXmpKvowG.jpg', '1044', ' 39', 44, '44', '44', '10000000', 'non', 'non'),
('FF', '  FF', 'dSBurPZOTWzrDyqfGdSW.jpg', '1054', ' 1', 0, '0', '0', '0', 'non', 'non'),
('gg', 'gg', '65c2c70c585ad.jpg', '1061', ' 1', 2, '2', '2', '2', 'non', 'non'),
('nonNONO', 'nonNONONO', '65c2c4e18099b.png', '1070', ' 1', 0, '12', '12', '50', 'non', 'non'),
('Serve', 'non', 'wWaH5tgVWpCSAvddOfDU.mp4', '1081', ' 0', 74, 'non', 'non', '50', 'non', 'non'),
('non', 'non', 'fwQJq4aEBERrZeRDYz9V.png', '1082', ' 0', 0, 'non', 'non', '50', 'non', 'non'),
('non', 'non', 'non', '668c66a8eee11', '0', 3434, 'non', 'non', '50', 'non', 'non'),
('non', 'dd', 'non', '668c66e797ce8', '0', 0, 'non', 'non', '50', 'non', 'non'),
('Kevin', 'Anderson', '0rWvK9nvVXLEMjpOFzt6.png', '668efd2d7c3bb', '0', 70222232, '92355', '045', '10000000', '2024-07-23T22:20:00', '2024-07-24T21:20:00'),
('Test', '  visité le nouveau site ici https://chat.openai.com', 'p7SMAlqDKCHbFEXDqhb1.jpg', '8', ' 73', 0, '-1.5197', '12.3714', '2', 'non', 'non');

-- --------------------------------------------------------

--
-- Structure de la table `pubvideo`
--

CREATE TABLE `pubvideo` (
  `titre` varchar(100) NOT NULL,
  `commentaire` varchar(600) NOT NULL,
  `video` varchar(600) NOT NULL,
  `bouton` varchar(300) NOT NULL,
  `id` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `redis_events_commentaires`
--

CREATE TABLE `redis_events_commentaires` (
  `id` int(11) NOT NULL,
  `action` varchar(10) DEFAULT NULL,
  `commentaires_id` varchar(40) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `old_commentaires_id` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `redis_events_likes`
--

CREATE TABLE `redis_events_likes` (
  `id` int(11) NOT NULL,
  `action` varchar(10) DEFAULT NULL,
  `etatdelikes_id` varchar(40) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `old_etatdelikes_id` varchar(40) CHARACTER SET utf8 DEFAULT NULL,
  `idpub` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `redis_events_pub`
--

CREATE TABLE `redis_events_pub` (
  `id` int(11) NOT NULL,
  `action` varchar(10) DEFAULT NULL,
  `pub_id` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `old_pub_id` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `redis_events_signalement`
--

CREATE TABLE `redis_events_signalement` (
  `id` int(11) NOT NULL,
  `action` varchar(10) DEFAULT NULL,
  `signalement_id` varchar(35) DEFAULT NULL,
  `old_signalement_id` varchar(35) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `redis_events_signalisation`
--

CREATE TABLE `redis_events_signalisation` (
  `id` int(11) NOT NULL,
  `action` varchar(10) DEFAULT NULL,
  `signalisation_id` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `old_signalisation_id` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `redis_events_user`
--

CREATE TABLE `redis_events_user` (
  `id` int(11) NOT NULL,
  `action` varchar(10) DEFAULT NULL,
  `user_id` varchar(36) CHARACTER SET utf8 DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `old_user_id` varchar(35) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `residence`
--

CREATE TABLE `residence` (
  `id` int(255) NOT NULL,
  `commentaire1` varchar(5000) NOT NULL,
  `commentaire2` varchar(600) NOT NULL,
  `commentaire3` varchar(300) NOT NULL,
  `prix` varchar(350) NOT NULL,
  `lienphoto` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `residence`
--

INSERT INTO `residence` (`id`, `commentaire1`, `commentaire2`, `commentaire3`, `prix`, `lienphoto`) VALUES
(1, '  ggpresidences', '  ggpresidences', '   ggks', '   ggjjs', '   http://localhost/img/poulet.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `service`
--

CREATE TABLE `service` (
  `id` int(140) NOT NULL,
  `nom_entreprise` varchar(500) NOT NULL,
  `lienmodif` varchar(350) NOT NULL,
  `infoservice` varchar(350) NOT NULL,
  `categorie_entreprise` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `service`
--

INSERT INTO `service` (`id`, `nom_entreprise`, `lienmodif`, `infoservice`, `categorie_entreprise`) VALUES
(1099, '  Pronostic coupon 1XBET/BETWINNER', 'updatecoupon', 'infoentreprise', ''),
(1109, '  Dépot et Retrait 1XBET/ BETWINNER', 'modif-depot-retrait', 'depot-retrait', ''),
(1126, ' Service de Livraison', 'modif-livraison', 'livraison', ''),
(1127, ' Pronostic Pmub du jour', 'modifpmu', 'pmu', ''),
(1130, ' Service de coiffeur a domicile', 'modif-coiffeur', 'coiffeur', ''),
(1131, ' Formation Informatique', 'modif-formation', 'formation-informatique', ''),
(1136, 'Fastfood', 'modiffasfood', 'fastfood', ''),
(1137, ' Vente et /ou livraison de matériel informatique', 'modif-vente-informatique', 'vente-informatique', ''),
(1138, ' Achat en alimentation et livraison', 'modifalimentation', 'achatalimentation', 'commerce'),
(1139, 'Commander un taxi', 'modif-taxi', 'taxi', 'service'),
(1141, ' Management  Artiste', 'modif-artiste', 'artiste', ''),
(1142, 'Commande de gateau anniversaire', 'modif-gateau', 'gateau', ''),
(1143, 'Tailleur à domicile', 'modif-tailleur', 'tailleur', ''),
(1144, ' Ménuisier à domicile', 'modif-menuisier', 'menuisier', ''),
(1145, 'festival / stand Bobo', 'modif-festival', 'festival', ''),
(1146, 'Électricien à domicile', 'modif-electricien', 'electricien', ''),
(1148, ' Achat et Livraison de Poule déplumé et lavé', 'updateachatpoule', 'achatpoule', ''),
(1149, 'Génie-civil et architecture', 'modif-genie-civil', 'genie-civil', ''),
(1150, 'Installation et/ou devis de climatisseur', 'modif-climatiseur', 'climatiseur', ''),
(1151, 'Service de plomberie ', 'modif-plomberie', 'plomberie', ''),
(1152, 'Service de résidence et auberge', 'modif-residence', 'residence', ''),
(1153, 'Vin de bissap', 'modif-vin', 'vin', '');

-- --------------------------------------------------------

--
-- Structure de la table `service_alerte`
--

CREATE TABLE `service_alerte` (
  `id` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `valeur` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `service_alerte`
--

INSERT INTO `service_alerte` (`id`, `nom`, `valeur`) VALUES
(1, 'ONEA', 'ONEA'),
(2, 'SONABEL', 'SONABEL');

-- --------------------------------------------------------

--
-- Structure de la table `service_plomberie`
--

CREATE TABLE `service_plomberie` (
  `id` int(100) NOT NULL,
  `commentaire1` varchar(350) NOT NULL,
  `commentaire2` varchar(350) NOT NULL,
  `commentaire3` varchar(300) NOT NULL,
  `lienphoto` varchar(350) NOT NULL,
  `prix` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `service_plomberie`
--

INSERT INTO `service_plomberie` (`id`, `commentaire1`, `commentaire2`, `commentaire3`, `lienphoto`, `prix`) VALUES
(1, '  hkk', '  hkkplomberier', '  hjj', '  hh', '  kk');

-- --------------------------------------------------------

--
-- Structure de la table `signalement`
--

CREATE TABLE `signalement` (
  `id` varchar(150) NOT NULL,
  `nomsignaleur` varchar(100) NOT NULL,
  `prenomdusignaleur` varchar(100) NOT NULL,
  `iduserdusignaleur` varchar(100) NOT NULL,
  `heuredusignalement` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `nomestsignaler` varchar(100) NOT NULL,
  `prenomestsignaler` varchar(100) NOT NULL,
  `heurecomdusignaler` varchar(100) NOT NULL,
  `commentairesignaler` varchar(100) NOT NULL,
  `pubidcomsignaler` varchar(100) NOT NULL,
  `idcomsignaler` varchar(100) NOT NULL,
  `idusersignaler` varchar(100) NOT NULL,
  `traitement` varchar(25) DEFAULT NULL,
  `admin_nom` varchar(100) NOT NULL DEFAULT 'non',
  `admin_prenom` varchar(70) NOT NULL DEFAULT 'non'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `signalement`
--

INSERT INTO `signalement` (`id`, `nomsignaleur`, `prenomdusignaleur`, `iduserdusignaleur`, `heuredusignalement`, `nomestsignaler`, `prenomestsignaler`, `heurecomdusignaler`, `commentairesignaler`, `pubidcomsignaler`, `idcomsignaler`, `idusersignaler`, `traitement`, `admin_nom`, `admin_prenom`) VALUES
('60665400b83fbd2', 'Bambara', ' Kevin Anderson', '6', '2024-08-10 14:35:53', 'Kevin', 'kevin', '2024-05-25T12:37:27.944Z', 'ok', '1081', '6651db87eb182', '85', 'non', 'non', 'non'),
('606654870394358', 'Bambara', ' Kevin Anderson', '6', '2024-08-10 14:35:58', 'Kevin', 'kevin', '2024-05-27T03:51:10.485Z', ' OlorumER', '1070', '606654032e78fac', '85', 'non', 'non', 'non'),
('606654870db5ea4', 'Bambara', ' Kevin Anderson', '6', '2024-08-10 14:36:00', 'Kevin', 'kevin', '2024-05-25T23:37:41.576Z', 're', '1070', '66527645944d5', '85', 'non', 'non', 'non'),
('6066548ec04d055', 'Kevin', 'kevin', '85', '2024-08-10 14:45:40', 'Bambara', ' Kevin Anderson', '2024-05-27T13:02:55.234Z', 'ok', '1070', '6654847f43260', '6', 'oui', 'Bambara', 'Kevin'),
('6066548ef7ed1bd', 'Kevin', 'kevin', '85', '2024-08-10 14:35:38', 'Anderson', 'Kevin', '2024-05-22T15:56:38.564Z', 'hu', '1070', '664e15b68b648', '81', 'oui', 'non', 'non'),
('606654bd8e9c097', 'Bambara', ' Kevin Anderson', '6', '2024-08-10 14:45:32', 'Kevin', 'kevin', '2024-05-27T13:46:18.605Z', 'Ta', '1070', '6066548eab58c79', '85', 'oui', 'Bambara', 'Kevin'),
('606654bdac62f6d', 'Bambara', ' Kevin Anderson', '6', '2024-08-10 14:35:48', 'Kevin', 'kevin', '2024-05-25T23:17:47.007Z', 'z', '1070', '6652719b08e84', '85', 'oui', 'non', 'non'),
('6643d241d318d', 'Bambara', ' Kevin Anderson', '6', '2024-08-10 14:36:10', 'Bambara', ' Kevin Anderson', '2024-05-13T01:29:52.251Z', 'g', '1070', '', '6', 'oui', 'non', 'non'),
('6643d241d318der', 'Konaté', ' Kevin Anderson', '6', '2024-08-10 14:36:13', 'Bambara', ' Kevin Anderson', '2024-05-13T01:29:52.251Z', 'g', '1070', '', '6', 'oui', 'non', 'non'),
('6643e9b6d713a', 'Bambara', ' Kevin Anderson', '6', '2024-08-10 14:36:15', 'Bambara', ' Kevin Anderson', '2024-05-13T01:44:29.713Z', 'd', '1070', '6641707db5c03', '6', 'oui', 'non', 'non'),
('6643e9ee59177', 'Bambara', ' Kevin Anderson', '6', '2024-08-10 14:36:18', 'Bambara', ' Kevin Anderson', '2024-05-13T01:45:16.036Z', 'd', '1070', '664170ac0b459', '6', 'oui', 'non', 'non'),
('6643ea24a932b', 'Bambara', ' Kevin Anderson', '6', '2024-08-10 14:36:20', 'Bambara', ' Kevin Anderson', '2024-05-13T01:45:52.695Z', 'f', '1070', '664170d0abe80', '6', 'oui', 'non', 'non'),
('66455431598a3', 'Bambara', ' Kevin Anderson', '6', '2024-08-10 14:36:22', 'Bambara', ' Kevin Anderson', '2024-05-16T00:30:05.523Z', 'd', '1070', '6645538d85df0', '6', 'oui', 'non', 'non'),
('664f1d686af05', 'Bambara', 'Linda', '83', '2024-08-10 14:38:53', 'Anderson', 'Kevin', '2024-05-22T23:42:50.753Z', 'Sut ', '1070', '664e82fabb91e', '81', 'oui', 'Bambara', 'Kevin'),
('66534ca5b9dd1', 'Bambara', ' Kevin Anderson', '6', '2024-08-10 14:43:02', 'Anderson', 'Kevin', '2024-05-22T15:40:33.483Z', '  Salut test 123', '1070', '664e11f1784a0', '81', 'oui', 'Bambara', 'Kevin'),
('66534cad8088a', 'Bambara', ' Kevin Anderson', '6', '2024-08-10 14:41:11', 'Anderson', 'Kevin', '2024-05-22T15:42:16.124Z', ' SalutY', '1070', '664e12582082c', '81', 'oui', 'Bambara', 'Kevin'),
('66b85093ec6a1', 'Bambara', 'Kevin', '2065d6f1672677T', '2024-08-11 05:48:03', 'Kevin', 'kevin', '2024-05-25 12:23:45', 'Jolie repas', '8', '6651d851372c4', '85', 'non', 'non', 'non'),
('66b850a7527d9', 'Bambara', 'Kevin', '2065d6f1672677T', '2024-08-11 05:48:23', 'Bambara', ' Kevin Anderson', '2024-05-27 02:57:01', 'ok', '8', '606653f67ddd2b7', '6', 'non', 'non', 'non'),
('66b85108345c8', 'Bambara', 'Kevin', '2065d6f1672677T', '2024-08-11 05:50:00', ' Bambara', '  Kevin Anderson', '2024-07-08 16:49:34', 'q', '8', '668c189e82790', '6', 'non', 'non', 'non'),
('66b8510c19328', 'Bambara', 'Kevin', '2065d6f1672677T', '2024-08-11 05:50:04', '   Bambara', '   Kevin Anderson ', '2024-07-21 15:55:09', 'quoi', '8', '669d2f5da204b', '6', 'non', 'non', 'non');

--
-- Déclencheurs `signalement`
--
DELIMITER $$
CREATE TRIGGER `after_signalement_delete` AFTER DELETE ON `signalement` FOR EACH ROW BEGIN
    INSERT INTO redis_events_signalement (action, signalement_id) VALUES ('delete', OLD.id);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_signalement_insert` AFTER INSERT ON `signalement` FOR EACH ROW BEGIN
    INSERT INTO redis_events_signalement (action, signalement_id) VALUES ('insert', NEW.id);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_signalement_update` AFTER UPDATE ON `signalement` FOR EACH ROW BEGIN
    INSERT INTO redis_events_signalement (action, signalement_id, old_signalement_id) VALUES ('update', NEW.id, OLD.id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `signalement_stockage`
--

CREATE TABLE `signalement_stockage` (
  `id` varchar(150) NOT NULL,
  `nomsignaleur` varchar(100) NOT NULL,
  `prenomdusignaleur` varchar(100) NOT NULL,
  `iduserdusignaleur` varchar(100) NOT NULL,
  `heuredusignalement` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `nomestsignaler` varchar(100) NOT NULL,
  `prenomestsignaler` varchar(100) NOT NULL,
  `heurecomdusignaler` varchar(100) NOT NULL,
  `commentairesignaler` varchar(100) NOT NULL,
  `pubidcomsignaler` varchar(100) NOT NULL,
  `idcomsignaler` varchar(100) NOT NULL,
  `idusersignaler` varchar(100) NOT NULL,
  `traitement` varchar(25) DEFAULT NULL,
  `admin_nom` varchar(100) NOT NULL DEFAULT 'non',
  `admin_prenom` varchar(70) NOT NULL DEFAULT 'non'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `signalement_stockage`
--

INSERT INTO `signalement_stockage` (`id`, `nomsignaleur`, `prenomdusignaleur`, `iduserdusignaleur`, `heuredusignalement`, `nomestsignaler`, `prenomestsignaler`, `heurecomdusignaler`, `commentairesignaler`, `pubidcomsignaler`, `idcomsignaler`, `idusersignaler`, `traitement`, `admin_nom`, `admin_prenom`) VALUES
('66b85108345c8', 'Bambara', 'Kevin', '2065d6f1672677T', '2024-08-11 05:50:00', ' Bambara', '  Kevin Anderson', '2024-07-08 16:49:34', 'q', '8', '668c189e82790', '6', 'non', 'non', 'non'),
('66b8510c19328', 'Bambara', 'Kevin', '2065d6f1672677T', '2024-08-11 05:50:04', '   Bambara', '   Kevin Anderson ', '2024-07-21 15:55:09', 'quoi', '8', '669d2f5da204b', '6', 'non', 'non', 'non');

-- --------------------------------------------------------

--
-- Structure de la table `signalisation`
--

CREATE TABLE `signalisation` (
  `id` varchar(100) NOT NULL,
  `iduser` varchar(100) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `image` mediumtext NOT NULL,
  `description` varchar(100) NOT NULL,
  `longitude` varchar(50) NOT NULL,
  `latitude` varchar(50) NOT NULL,
  `numuser` varchar(50) NOT NULL,
  `heure_signalisation` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `statut` varchar(100) NOT NULL,
  `rapport` varchar(6000) NOT NULL,
  `statut_rapport` varchar(10) NOT NULL,
  `nom_admin` varchar(100) NOT NULL,
  `prenom_admin` varchar(100) NOT NULL,
  `numuser_admin` varchar(100) NOT NULL,
  `iduser_admin` varchar(100) NOT NULL,
  `ville` varchar(40) NOT NULL,
  `service` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `signalisation`
--

INSERT INTO `signalisation` (`id`, `iduser`, `nom`, `prenom`, `image`, `description`, `longitude`, `latitude`, `numuser`, `heure_signalisation`, `statut`, `rapport`, `statut_rapport`, `nom_admin`, `prenom_admin`, `numuser_admin`, `iduser_admin`, `ville`, `service`) VALUES
('2065kd6ssfzqlzsff2f3456', '2065d6f16726761', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-05-27 01:51:10', 'oui', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', '', ''),
('2065kd6ssfzqlzsff2f3F5456', '6', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-05-27 01:51:10', 'oui', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', '', ''),
('2065kd6ssfzqlzsff2f3Fu5456', '6', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-05-27 01:51:10', 'oui', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', '', ''),
('8989', '2065d6f16726761', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-05-27 01:51:10', 'oui', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', '', ''),
('aigle', '2065d6f16726761', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-07-03 08:38:00', 'oui', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', '', ''),
('aigledd', '2065d6f16726761', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-07-03 08:38:00', 'oui', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', '', ''),
('aiglef', '2065d6f16726761', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-07-03 08:38:00', 'oui', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', '', ''),
('aiglefzd', '2065d6f16726761', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-07-03 08:38:00', 'oui', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', '', ''),
('destinyss', '2065d6f16726761', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-07-03 08:06:03', 'oui', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', '', ''),
('destinyssad', '2065d6f16726761', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-07-03 08:06:03', 'oui', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', '', ''),
('destinyssf', '2065d6f16726761', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-07-03 08:06:03', 'oui', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', '', ''),
('destinyssfas', '2065d6f16726761', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-07-03 08:06:03', 'oui', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', '', ''),
('Eau', '2065d6f16726761', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-07-06 01:16:54', 'oui', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', '', ''),
('Eauji', '2065d6f16726761', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-07-06 01:16:54', 'oui', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', '', ''),
('tintin', '2065d6f16726761', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-07-14 02:41:49', 'non', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', 'Bobo-Dioulasso', 'king'),
('tintine', '6', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-07-14 04:23:02', 'non', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', '', 'sonabel'),
('tintinee', '6', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-07-14 04:23:02', 'non', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', '', 'sonabel'),
('tintineeut', '6', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-07-14 04:23:02', 'non', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', '', 'sonabel'),
('tintineu', '6', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-07-14 04:23:02', 'non', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', '', 'sonabel'),
('yui', '6', 'user', 'user', 'HKVJ5ZPncW68ToV5SWIBcu.jpeg', 'Kevin Anderson', '-4.2846346', '11.1426286', '62023367', '2024-05-27 01:51:10', 'oui', 'ok merci', 'oui', 'Angel', 'Andel', '14', '17', '', '');

--
-- Déclencheurs `signalisation`
--
DELIMITER $$
CREATE TRIGGER `after_signalisation_delete` AFTER DELETE ON `signalisation` FOR EACH ROW BEGIN
    INSERT INTO redis_events_signalisation (action, signalisation_id) VALUES ('delete', OLD.id);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_signalisation_insert` AFTER INSERT ON `signalisation` FOR EACH ROW BEGIN
    INSERT INTO redis_events_signalisation (action, signalisation_id) VALUES ('insert', NEW.id);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_signalisation_update` AFTER UPDATE ON `signalisation` FOR EACH ROW BEGIN
    INSERT INTO redis_events_signalisation (action, signalisation_id, old_signalisation_id) VALUES ('update', NEW.id, OLD.id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `signalisation_stockage`
--

CREATE TABLE `signalisation_stockage` (
  `id` varchar(100) NOT NULL,
  `iduser` varchar(100) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `image` mediumtext NOT NULL,
  `description` varchar(100) NOT NULL,
  `longitude` varchar(50) NOT NULL,
  `latitude` varchar(50) NOT NULL,
  `numuser` varchar(50) NOT NULL,
  `heure_signalisation` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `statut` varchar(100) NOT NULL,
  `rapport` varchar(6000) NOT NULL,
  `statut_rapport` varchar(10) NOT NULL,
  `nom_admin` varchar(100) NOT NULL,
  `prenom_admin` varchar(100) NOT NULL,
  `numuser_admin` varchar(100) NOT NULL,
  `iduser_admin` varchar(100) NOT NULL,
  `ville` varchar(40) NOT NULL,
  `service` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `tailleur`
--

CREATE TABLE `tailleur` (
  `id` int(255) NOT NULL,
  `commentaire1` varchar(5000) NOT NULL,
  `commentaire2` varchar(600) NOT NULL,
  `commentaire3` varchar(300) NOT NULL,
  `prix` varchar(350) NOT NULL,
  `lienphoto` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `tailleur`
--

INSERT INTO `tailleur` (`id`, `commentaire1`, `commentaire2`, `commentaire3`, `prix`, `lienphoto`) VALUES
(1, '      ggpjj', '      gglkvin', '      ggkll4sfin', '      ggjjmmjus', '      http://localhost/img/poulet.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `taxi`
--

CREATE TABLE `taxi` (
  `id` int(255) NOT NULL,
  `commentaire1` varchar(5000) NOT NULL,
  `commentaire2` varchar(600) NOT NULL,
  `commentaire3` varchar(300) NOT NULL,
  `prix` varchar(350) NOT NULL,
  `lienphoto` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `taxi`
--

INSERT INTO `taxi` (`id`, `commentaire1`, `commentaire2`, `commentaire3`, `prix`, `lienphoto`) VALUES
(1, '  ggp', '  gglkevines', '  ggk', '  ggjj', '  http://localhost/img/poulet.jpeg');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` varchar(100) NOT NULL,
  `email` varchar(70) NOT NULL,
  `password` varchar(120) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `grade` varchar(100) NOT NULL DEFAULT 'utilisateur',
  `genre` text NOT NULL,
  `contact` int(60) NOT NULL,
  `datefinblocage` varchar(100) DEFAULT NULL,
  `date_inscription` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `access_app` varchar(8) DEFAULT 'oui'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `nom`, `prenom`, `grade`, `genre`, `contact`, `datefinblocage`, `date_inscription`, `access_app`) VALUES
('2065d6f16726761', 'user@gmail.com', 'Kevin0000#', 'user', 'userI', 'utilisateur', 'masculin', 74443434, 'non', '2024-08-10 03:15:07', 'oui'),
('2065d6f1672677T', 'superadmin@gmail.com', '$2y$10$6LPsQGW8Y/P1VCOXGdQaruKi3Sgpom9CuQYvAMoOLZCr2twWiGrDq', 'Bambara', 'Kevin', 'superadmin', 'masculin', 6202221, 'non', '2024-08-10 18:00:18', 'oui'),
('65683bc36355', 'admin@gmail.com', 'Kevin0000#', 'admin', ' admin', 'admin', 'masculin', 55555555, 'non', '2024-08-10 03:09:13', 'oui'),
('667383bc3634522', 'anderson@gmail.com', '$2y$10$6LPsQGW8Y/P1VCOXGdQaruKi3Sgpom9CuQYvAMoOLZCr2twWiGrDq', 'Anderson', 'Kevin', 'admin', 'masculin', 62023367, 'non', '2024-08-10 03:08:29', 'oui'),
('667383bc36355', 'kevinbambara2000@gmail.com', 'Kevin123#', 'KevinE', 'Ander', 'utilisateur', 'masculin', 12345678, 'non', '2024-08-10 03:20:33', 'oui'),
('667383bc36785', 'Linda@gmail.com', 'Kevin2000#', 'Bambara', 'Linda', 'utilisateur', 'féminin', 56202222, 'non', '2024-08-10 03:08:41', 'oui'),
('667383bc38906', 'kevin2000@gmail.com', 'Kevin0000#', 'Kevin', 'kevin', 'utilisateur', 'masculin', 74443434, 'non', '2024-08-10 03:08:54', 'oui'),
('66738555a10a3', 'kevinbambara2000@gmail.com', 'Kevin123#', 'Kevin', 'Ander', 'utilisateur', 'masculin', 56778995, 'non', '2024-08-09 00:08:58', 'oui'),
('66738a6d8ab0a', 'kevinbambara2000@gmail.com', 'Kevin123#', 'KO', 'KO', 'utilisateur', 'masculin', 123456778, 'non', '2024-08-09 00:08:55', 'oui'),
('66b184cfdb637', 'K@gmail.com', '$2y$10$6LPsQGW8Y/P1VCOXGdQaruKi3Sgpom9CuQYvAMoOLZCr2twWiGrDq', 'Kevin Anderson', 'Kevin', 'utilisateur', 'masculin', 74443434, 'non', '2024-08-09 00:09:05', 'oui');

--
-- Déclencheurs `user`
--
DELIMITER $$
CREATE TRIGGER `after_user_delete` AFTER DELETE ON `user` FOR EACH ROW BEGIN
    INSERT INTO redis_events_user (action, user_id) VALUES ('delete', OLD.id);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_user_insert` AFTER INSERT ON `user` FOR EACH ROW BEGIN
    INSERT INTO redis_events_user (action, user_id) VALUES ('insert', NEW.id);
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_user_update` AFTER UPDATE ON `user` FOR EACH ROW BEGIN
    INSERT INTO redis_events_user (action, user_id, old_user_id) VALUES ('update', NEW.id, OLD.id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `userstockage`
--

CREATE TABLE `userstockage` (
  `id` varchar(100) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `grade` varchar(100) NOT NULL DEFAULT 'utilisateur',
  `genre` text NOT NULL,
  `contact` int(60) NOT NULL,
  `datefinblocage` varchar(100) DEFAULT NULL,
  `date_inscription` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `userstockage`
--

INSERT INTO `userstockage` (`id`, `email`, `password`, `nom`, `prenom`, `grade`, `genre`, `contact`, `datefinblocage`, `date_inscription`) VALUES
('2065d6f16726761', 'user@gmail.com', 'Kevin0000#', 'user', 'user', 'utilisateur', 'masculin', 74443434, 'non', '2024-07-03 05:57:44'),
('6', 'superadmin@gmail.com', '00000000', 'Bambara', ' Kevin Anderson', 'superadmin', 'masculin', 62023367, 'non', '2024-07-03 05:57:44'),
('667383bc36355', 'kevinbambara2000@gmail.com', 'Kevin123#', 'Kevin', 'Ander', 'utilisateur', 'masculin', 12345678, 'non', '2024-07-03 05:57:44'),
('66738555a10a3', 'kevinbambara2000@gmail.com', 'Kevin123#', 'Kevin', 'Ander', 'utilisateur', 'masculin', 56778995, 'non', '2024-07-03 05:57:44'),
('66738a6d8ab0a', 'kevinbambara2000@gmail.com', 'Kevin123#', 'KO', 'KO', 'utilisateur', 'masculin', 123456778, 'non', '2024-07-03 05:57:44'),
('66b1841d30a11', 'kevinbambara2000@gmail.com', '$2y$10$2zkFUwdBok9vDRaFb/MPweIYZVuvFOmJM7f26KraseEuGKyHaF4ri', 'kk', 'kk', 'utilisateur', 'masculin', 55555555, 'non', '2024-08-06 02:02:05'),
('66b184cfdb637', 'K@gmail', '$2y$10$6LPsQGW8Y/P1VCOXGdQaruKi3Sgpom9CuQYvAMoOLZCr2twWiGrDq', 'Kevin Anderson', 'Kevin', 'utilisateur', 'masculin', 74443434, 'non', '2024-08-06 02:05:03'),
('66b192d943736', 'hh@gm', '$2y$10$f2O5e15R8ggS05pPW.BPj.71rCg6B0tfZTJSUgLt/nQYH7rYRJHj6', 'ttt', 'tt', 'utilisateur', 'masculin', 2147483647, 'non', '2024-08-06 03:04:57'),
('66b1a19d4c2d1', 'Kevienbambara2000@gmail.com', '$2y$10$/p187EQnWKNi.X2tRvL2ueZO9pBkaWks.6z782umdoNcSsWVOBINC', 'Kevin Anderson Bambara', 'Kevin', 'utilisateur', 'masculin', 74434344, 'non', '2024-08-06 04:07:57'),
('66b1a1c109b44', 'supzeradmin@gmail.com', '$2y$10$F5crsc3q0FXBroa46nI8ZupROjh5KMCm/A8GgvzRmJx9V.NL0wcru', 'kk', 'kk', 'utilisateur', 'masculin', 75555555, 'non', '2024-08-06 04:08:33'),
('66b1a1e08f171', 'supzeeradmin@gmail.com', '$2y$10$ITMYKOrCNpZKoDPYa25h7eVYmKHJBeMOSDf1KkRYnO/LcZJtI.xPq', 'kk', 'kk', 'utilisateur', 'masculin', 755555552, 'non', '2024-08-06 04:09:04'),
('81', 'anderson@gmail.com', 'Ander0000#', 'Anderson', 'Kevin', 'admin', 'masculin', 62023367, 'non', '2024-07-03 05:57:44'),
('83', 'Linda@gmail.com', 'Kevin2000#', 'Bambara', 'Linda', 'utilisateur', 'féminin', 56202222, 'non', '2024-07-03 05:57:44'),
('85', 'kevin2000@gmail.com', 'Kevin0000#', 'Kevin', 'kevin', 'utilisateur', 'masculin', 74443434, 'non', '2024-07-03 05:57:44'),
('87', 'admin@gmail.com', 'Kevin0000#', 'admin', ' admin', 'admin', 'masculin', 55555555, 'non', '2024-07-03 05:57:44');

-- --------------------------------------------------------

--
-- Structure de la table `ville_alerte`
--

CREATE TABLE `ville_alerte` (
  `id` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `valeur` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `ville_alerte`
--

INSERT INTO `ville_alerte` (`id`, `nom`, `valeur`) VALUES
(1, 'Bobo-Dioulasso', 'Bobo'),
(2, 'Ouagadougou', 'Ouagadougou');

-- --------------------------------------------------------

--
-- Structure de la table `vin`
--

CREATE TABLE `vin` (
  `id` int(255) NOT NULL,
  `commentaire1` varchar(5000) NOT NULL,
  `commentaire2` varchar(600) NOT NULL,
  `commentaire3` varchar(300) NOT NULL,
  `prix` varchar(350) NOT NULL,
  `lienphoto` varchar(600) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `vin`
--

INSERT INTO `vin` (`id`, `commentaire1`, `commentaire2`, `commentaire3`, `prix`, `lienphoto`) VALUES
(1, '       ggpjj', '       gglkvin', '       ggkll4sfin', '       ggjjmmjussss', '       http://localhost/img/poulet.jpeg');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `achatalimentation`
--
ALTER TABLE `achatalimentation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `achatpoule`
--
ALTER TABLE `achatpoule`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `apropos`
--
ALTER TABLE `apropos`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `climatiseur`
--
ALTER TABLE `climatiseur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `coiffeur`
--
ALTER TABLE `coiffeur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `commentaires`
--
ALTER TABLE `commentaires`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `commentairesstockage`
--
ALTER TABLE `commentairesstockage`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `coupon`
--
ALTER TABLE `coupon`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `depotretrait`
--
ALTER TABLE `depotretrait`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `electricien`
--
ALTER TABLE `electricien`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `etatdelikes`
--
ALTER TABLE `etatdelikes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_idpub_etat` (`idpub`,`etat`);

--
-- Index pour la table `fastfood`
--
ALTER TABLE `fastfood`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `festival`
--
ALTER TABLE `festival`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `formationinformatique`
--
ALTER TABLE `formationinformatique`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `gateau`
--
ALTER TABLE `gateau`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `genie-civil`
--
ALTER TABLE `genie-civil`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `grade_utilisateur`
--
ALTER TABLE `grade_utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `livraison`
--
ALTER TABLE `livraison`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `management_artiste`
--
ALTER TABLE `management_artiste`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `materiel_informatique`
--
ALTER TABLE `materiel_informatique`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `menuisier`
--
ALTER TABLE `menuisier`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `message_user`
--
ALTER TABLE `message_user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `message_userstockage`
--
ALTER TABLE `message_userstockage`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `numero_service`
--
ALTER TABLE `numero_service`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `pmu`
--
ALTER TABLE `pmu`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `pub`
--
ALTER TABLE `pub`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `pubstockage`
--
ALTER TABLE `pubstockage`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `pubvideo`
--
ALTER TABLE `pubvideo`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `redis_events_commentaires`
--
ALTER TABLE `redis_events_commentaires`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `redis_events_likes`
--
ALTER TABLE `redis_events_likes`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `redis_events_pub`
--
ALTER TABLE `redis_events_pub`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `redis_events_signalement`
--
ALTER TABLE `redis_events_signalement`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `redis_events_signalisation`
--
ALTER TABLE `redis_events_signalisation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `redis_events_user`
--
ALTER TABLE `redis_events_user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `residence`
--
ALTER TABLE `residence`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `service_alerte`
--
ALTER TABLE `service_alerte`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `service_plomberie`
--
ALTER TABLE `service_plomberie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `signalement`
--
ALTER TABLE `signalement`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `signalement_stockage`
--
ALTER TABLE `signalement_stockage`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `signalisation`
--
ALTER TABLE `signalisation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `signalisation_stockage`
--
ALTER TABLE `signalisation_stockage`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tailleur`
--
ALTER TABLE `tailleur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `taxi`
--
ALTER TABLE `taxi`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `userstockage`
--
ALTER TABLE `userstockage`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `ville_alerte`
--
ALTER TABLE `ville_alerte`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `vin`
--
ALTER TABLE `vin`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `achatalimentation`
--
ALTER TABLE `achatalimentation`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `achatpoule`
--
ALTER TABLE `achatpoule`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `apropos`
--
ALTER TABLE `apropos`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `climatiseur`
--
ALTER TABLE `climatiseur`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `coiffeur`
--
ALTER TABLE `coiffeur`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `coupon`
--
ALTER TABLE `coupon`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `depotretrait`
--
ALTER TABLE `depotretrait`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `electricien`
--
ALTER TABLE `electricien`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `etatdelikes`
--
ALTER TABLE `etatdelikes`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=785;

--
-- AUTO_INCREMENT pour la table `fastfood`
--
ALTER TABLE `fastfood`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `festival`
--
ALTER TABLE `festival`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `formationinformatique`
--
ALTER TABLE `formationinformatique`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `gateau`
--
ALTER TABLE `gateau`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `genie-civil`
--
ALTER TABLE `genie-civil`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `grade_utilisateur`
--
ALTER TABLE `grade_utilisateur`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `livraison`
--
ALTER TABLE `livraison`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `management_artiste`
--
ALTER TABLE `management_artiste`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `materiel_informatique`
--
ALTER TABLE `materiel_informatique`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `menuisier`
--
ALTER TABLE `menuisier`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `numero_service`
--
ALTER TABLE `numero_service`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=667;

--
-- AUTO_INCREMENT pour la table `pmu`
--
ALTER TABLE `pmu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `pubvideo`
--
ALTER TABLE `pubvideo`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `redis_events_commentaires`
--
ALTER TABLE `redis_events_commentaires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `redis_events_likes`
--
ALTER TABLE `redis_events_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1119;

--
-- AUTO_INCREMENT pour la table `redis_events_pub`
--
ALTER TABLE `redis_events_pub`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=122;

--
-- AUTO_INCREMENT pour la table `redis_events_signalement`
--
ALTER TABLE `redis_events_signalement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT pour la table `redis_events_signalisation`
--
ALTER TABLE `redis_events_signalisation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=256;

--
-- AUTO_INCREMENT pour la table `redis_events_user`
--
ALTER TABLE `redis_events_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1235;

--
-- AUTO_INCREMENT pour la table `residence`
--
ALTER TABLE `residence`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(140) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1156;

--
-- AUTO_INCREMENT pour la table `service_alerte`
--
ALTER TABLE `service_alerte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `service_plomberie`
--
ALTER TABLE `service_plomberie`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `tailleur`
--
ALTER TABLE `tailleur`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `taxi`
--
ALTER TABLE `taxi`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `ville_alerte`
--
ALTER TABLE `ville_alerte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `vin`
--
ALTER TABLE `vin`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
