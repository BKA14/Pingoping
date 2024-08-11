-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 03 fév. 2024 à 02:26
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
  `email` varchar(350) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `apropos`
--

INSERT INTO `apropos` (`id`, `commentaire`, `contact`, `email`) VALUES
(1, 'Salut', '76604545', 'FER');

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
  `iduser` int(255) NOT NULL,
  `contactuser` varchar(255) NOT NULL,
  `etat` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `etatdelikes`
--

INSERT INTO `etatdelikes` (`id`, `idpub`, `iduser`, `contactuser`, `etat`) VALUES
(571, 8, 6, ' 62023367', ' non'),
(580, 4, 6, ' 62023367', ' oui'),
(581, 1046, 6, '62023367', 'oui'),
(582, 0, 0, '', ''),
(583, 1044, 6, ' 62023367', ' oui'),
(584, 0, 0, '', ''),
(585, 1049, 6, ' 62023367', ' non'),
(586, 0, 0, '', ''),
(587, 8, 83, '56202222', 'oui'),
(588, 0, 0, '', ''),
(589, 1052, 6, ' 62023367', ' non'),
(590, 0, 0, '', ''),
(591, 1054, 6, ' 62023367', ' non'),
(592, 1057, 6, ' 62023367', ' non');

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
  `titre` varchar(2000) NOT NULL,
  `commentaire` mediumtext NOT NULL,
  `photo` varchar(4000) NOT NULL,
  `id` int(255) NOT NULL,
  `likes` mediumtext DEFAULT '0',
  `contact` int(255) NOT NULL,
  `longitude` varchar(2000) NOT NULL,
  `latitude` varchar(2000) NOT NULL,
  `rangpub` varchar(2000) NOT NULL,
  `date` varchar(1000) NOT NULL,
  `datefin` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `pub`
--

INSERT INTO `pub` (`titre`, `commentaire`, `photo`, `id`, `likes`, `contact`, `longitude`, `latitude`, `rangpub`, `date`, `datefin`) VALUES
('Test', '  visité le nouveau site ici https://chat.openai.com/c/4aebe5b3-4c11-445b-b44c-11a87a6dab5b', 'https://docs-demo.ionic.io/assets/madison.jpg', 8, ' 72', 0, '-1.5197', '12.3714', '2', 'non', '0'),
('ggAZAZAZAAZ', ' gg', 'http://localhost/videopub/65b691d65b2a22.mp4', 1044, ' 40', 44, '44', '44', '44', 'non', '0'),
('non', '    Bonsoir monsieur, madame vous etes attendddUn texte est une série orale ou écrite de mots perçus comme constituant un ensemble cohérent, porteur de sens et utilisant les structures propres à une langue. Un texte n\'a pas de longueur déterminée sauf dans le cas de poèmes à forme fixe comme le sonnet ou le haïku. WikipédiaUn texte est une série orale ou écrite de mots perçus comme constituant un ensemble cohérent, porteur de sens et utilisant les structures propres à une langue. Un texte n\'a pas de longueur déterminée sauf dans le cas de poèmes à forme fixe comme le sonnet ou le haïku. WikipédiaUn texte est une série orale ou écrite de mots perçus comme constituant un ensemble cohérent, porteur de sens et utilisant les structures propres à une langue. Un texte n\'a pas de longueur déterminée sauf dans le cas de poèmes à forme fixe comme le sonnet ou le haïku. WikipédiaUn texte est une série orale ou écrite de mots perçus comme constituant un ensemble cohérent, porteur de sens et utilisant les structures propres à une langue. Un texte n\'a pas de longueur déterminée sauf dans le cas de poèmes à forme fixe comme le sonnet ou le haïku. WikipédiaUn texte est une série orale ou écrite de mots perçus comme constituant un ensemble cohérent, porteur de sens et utilisant les structures propres à une langue. Un texte n\'a pas de longueur déterminée sauf dans le cas de poèmes à forme fixe comme le sonnet ou le haïku. WikipédiaUn texte est une série orale ou écrite de mots perçus comme constituant un ensemble cohérent, porteur de sens et utilisant les structures propres à une langue. Un texte n\'a pas de longueur déterminée sauf dans le cas de poèmes à forme fixe comme le sonnet ou le haïku. WikipédiafUn texte est une série orale ou écrite de mots perçus comme constituant un ensemble cohérent, porteur de sens et utilisant les structures propres à une langue. Un texte n\'a pas de longueur déterminée sauf dans le cas de poèmes à forme fixe comme le sonnet ou le haïku. WikipédiaUn texte est une série orale ou écrite de mots perçus comme constituant un ensemble cohérent, porteur de sens et utilisant les structures propres à une langue. Un texte n\'a pas de longueur déterminée sauf dans le cas de poèmes à forme fixe comme le sonnet ou le haïku. WikipédiaUn texte est une série orale ou écrite de mots perçus comme constituant un ensemble cohérent, porteur de sens et utilisant les structures propres à une langue. Un texte n\'a pas de longueur déterminée sauf dans le cas de poèmes à forme fixe comme le sonnet ou le haïku. WikipédiaUn texte est une série orale ou écrite de mots perçus comme constituant un ensemble cohérent, porteur de sens et utilisant les structures propres à une langue. Un texte n\'a pas de longueur déterminée sauf dans le cas de poèmes à forme fixe comme le sonnet ou le haïku. WikipédiaUn texte est une série orale ou écrite de mots perçus comme constituant un ensemble cohérent, porteur de sens et utilisant les structures propres à une langue. Un texte n\'a pas de longueur déterminée sauf dans le cas de poèmes à forme fixe comme le sonnet ou le haïku. WikipédiaUn texte est une série orale ou écrite de mots perçus comme constituant un ensemble cohérent, porteur de sens et utilisant les structures propres à une langue. Un texte n\'a pas de longueur déterminée sauf dans le cas de poèmes à forme fixe comme le sonnet ou le haïku. WikipédiaUn texte est une série orale ou écrite de mots perçus comme constituant un ensemble cohérent, porteur de sens et utilisant les structures propres à une langue. Un texte n\'a pas de longueur déterminée sauf dans le cas de poèmes à forme fixe comme le sonnet ou le haïku. WikipédiaUn texte est une série orale ou écrite de mots perçus comme constituant un ensemble cohérent, porteur de sens et utilisant les structures propres à une langue. Un texte n\'a pas de longueur déterminée sauf dans le cas de poèmes à forme fixe comme le sonnet ou le haïku. WikipédiaUn texte est une série orale ou écrite de mots perçus comme constituant un ensemble cohérent, porteur de sens et utilisant les structures propres à une langue. Un texte n\'a pas de longueur déterminée sauf dans le cas de poèmes à forme fixe comme le sonnet ou le haïku. WikipédiaUn texte est une série orale ou écrite de mots perçus comme constituant un ensemble cohérent, porteur de sens et utilisant les structures propres à une langue. Un texte n\'a pas de longueur déterminée sauf dans le cas de poèmes à forme fixe comme le sonnet ou le haïku. Wikipédiaddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddu', 'non', 1052, ' 0', 0, 'non', 'non', '0', 'non', '0'),
('gg', ' ggg', 'http://localhost/videopub/65b7a58c9d589.jpg', 1053, '0', 1, '1', '1', '1', '2024-01-29T18:11:00-00:00', '2024-01-31T18:11:00-00:00'),
('FF', '  FF', 'http://localhost/videopub/kevin2.jpg', 1054, ' 0', 0, '0', '0', '0', 'Non', '0'),
('gg', 'gg', 'C:/Users/HP/OneDrive/Images/65bc3dd38235a.jpg', 1061, '0', 2, '2', '2', '2', 'non', 'non'),
('Courage', 'Courage Courage Courage Courage', 'non', 1062, '0', 12, '12', '12', '0', 'non', 'non'),
('non', 'non', 'non', 1070, '0', 0, 'non', 'non', '50', 'non', 'non'),
('QQ', 'SS', 'C:/Users/HP/OneDrive/Images/65bcd2c745c99.jpg', 1071, '0', 22, '22', '22', '32', '2024-02-10T11:32:00-00:00', '2024-02-17T11:32:00-00:00'),
('Ok', 'Ik', 'C:/Users/HP/OneDrive/Images/65bcd31aedb2e.jpg', 1072, '0', 45, '45', '45', '15', '2024-02-08T11:33:00-00:00', '2024-02-17T11:33:00-00:00'),
('Formation ', 'Formation en infographie', 'C:/Users/HP/OneDrive/Images/65bd080fa8185.jpg', 1073, '0', 62023367, '123', '123', '2', '2024-02-09T15:19:00-00:00', '2024-02-16T15:19:00-00:00');

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
(1153, 'Vin de bissap', 'modif-vin', 'vin', ''),
(1154, '', '', '', ''),
(1155, 'hh', '', '', '');

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
(83, 'Linda@gmail.com', 'Kevin2000#', 'Bambara', 'Linda', 'Kevin2000#', 'utilisateur', 'féminin', 56202222),
(85, 'kevin2000@gmail.com', 'Kevin0000#', 'Kevin', 'kevin', 'Kevin0000#', 'utilisateur', 'masculin', 74443434),
(87, 'admin@gmail.com', 'Kevin0000#', 'admin', ' admin', 'Kevin0000#', 'admin', 'masculin', 55555555),
(89, 'Moussa2000@gmail.com', 'Moussa2000#', 'Bambara', 'Moussa', 'Moussa2000#', 'utilisateur', 'masculin', 55252525);

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
  ADD PRIMARY KEY (`id`);

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
-- Index pour la table `pubvideo`
--
ALTER TABLE `pubvideo`
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
-- Index pour la table `service_plomberie`
--
ALTER TABLE `service_plomberie`
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
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=593;

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
-- AUTO_INCREMENT pour la table `pmu`
--
ALTER TABLE `pmu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `pub`
--
ALTER TABLE `pub`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1074;

--
-- AUTO_INCREMENT pour la table `pubvideo`
--
ALTER TABLE `pubvideo`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT pour la table `vin`
--
ALTER TABLE `vin`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
