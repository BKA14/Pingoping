-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 16 jan. 2024 à 15:16
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
-- Base de données : `localiser`
--

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
(4, 'Entreprise de Commerce'),
(6, 'Entreprise de service'),
(8, 'Entreprise Industrielle');

-- --------------------------------------------------------

--
-- Structure de la table `entreprise`
--

CREATE TABLE `entreprise` (
  `id` int(140) NOT NULL,
  `nom_entreprise` varchar(500) NOT NULL,
  `responsable_entreprise` varchar(200) NOT NULL,
  `categorie_entreprise` varchar(400) NOT NULL,
  `annee_entreprise` year(4) NOT NULL,
  `contact_entreprise` int(10) NOT NULL,
  `longitude` varchar(500) NOT NULL DEFAULT '0',
  `latitude` varchar(500) NOT NULL DEFAULT '0',
  `heure` int(50) NOT NULL,
  `heure2` int(50) NOT NULL,
  `minute` int(50) NOT NULL,
  `minute2` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `entreprise`
--

INSERT INTO `entreprise` (`id`, `nom_entreprise`, `responsable_entreprise`, `categorie_entreprise`, `annee_entreprise`, `contact_entreprise`, `longitude`, `latitude`, `heure`, `heure2`, `minute`, `minute2`) VALUES
(1090, ' Hotel SISSIMAN', 'Roland Sow', 'Entreprise de service', 2010, 20980108, '-11.1635212', '4.2751852', 7, 19, 30, 0),
(1099, ' CIMASSO', 'Kanazoe Abdoul Rahim', 'Entreprise Industrielle', 2016, 20952500, '-4.323580', '11.1500627', 7, 16, 30, 0),
(1109, ' Pharmacie Sarfalao ', 'Sandwidi Charles Desiré', 'Entreprise de Commerce', 2008, 20970135, '11.1597291', '-4.2811932', 7, 16, 30, 0),
(1110, '  Elitis EXPRESS ', 'Sow Roland', 'Entreprise de service', 2017, 70210521, '-11.1613235', '4.2820189', 6, 18, 0, 0),
(1113, ' SAP Olympic', 'Mahamady Koussoube', 'Entreprise de service', 1974, 20970386, '11.1509874', '-4.3115665', 7, 15, 0, 30),
(1126, '  Alimentation Cap Faso', 'Sando Karim ', 'Entreprise de Commerce', 2020, 74443434, '-4.2834994', '11.1577200', 8, 22, 0, 0),
(1127, ' LONAB', 'Zarani Ben Harouna Ibrahim', 'Entreprise de service', 1984, 20971370, '11.1703334', '-4.2986777', 7, 16, 30, 0),
(1130, '  SONABEL', 'Ouedraogo François de Salles', 'Entreprise de service', 1995, 20984953, '-11.1749548', '4.3032970', 7, 16, 30, 0),
(1131, '  ONEA', 'Ouedraogo Jean', 'Entreprise de service', 1985, 20971111, '-11.1572585', '4.2854264', 7, 16, 30, 0),
(1135, '  BIBAD multi-service', 'KEVIN', 'Entreprise de service', 2009, 74334343, '-23', '23', 12, 12, 12, 14);

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
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(200) NOT NULL,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `password2` varchar(100) NOT NULL,
  `grade` varchar(100) NOT NULL DEFAULT 'utilisateur',
  `genre` text NOT NULL,
  `contact` int(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `nom`, `prenom`, `password2`, `grade`, `genre`, `contact`) VALUES
(6, 'superadmin@gmail.com', 'Kevin0000#', 'Bambara', ' Kevin Anderson', 'Kevin0000#', 'superadmin', 'masculin', 62023367),
(81, 'anderson@gmail.com', 'Ander0000#', 'Anderson', 'Kevin', 'Ander0000#', 'admin', 'masculin', 62023367),
(83, 'Linda@gmail.com', 'Kevin2000#', 'Bambara', ' Linda', 'Kevin2000#', 'superadmin', 'féminin', 56202222),
(85, 'kevin2000@gmail.com', 'Kevin0000#', 'Kevin', 'kevin', 'Kevin0000#', 'utilisateur', 'masculin', 74443434),
(87, 'admin@gmail.com', 'Kevin0000#', 'admin', ' admin', 'Kevin0000#', 'admin', 'masculin', 55555555),
(89, 'Moussa2000@gmail.com', 'Moussa2000#', 'Bambara', 'Moussa', 'Moussa2000#', 'utilisateur', 'masculin', 55252525),
(91, 'jean2000@gmail.com', 'Jean2000#', 'Jean', 'kabore', 'Jean2000#', 'utilisateur', 'masculin', 78787878);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `entreprise`
--
ALTER TABLE `entreprise`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `grade_utilisateur`
--
ALTER TABLE `grade_utilisateur`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT pour la table `entreprise`
--
ALTER TABLE `entreprise`
  MODIFY `id` int(140) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1136;

--
-- AUTO_INCREMENT pour la table `grade_utilisateur`
--
ALTER TABLE `grade_utilisateur`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
