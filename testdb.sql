
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `test`
--

-- --------------------------------------------------------

--
-- Structure de la table `blog`
--

CREATE TABLE `blog` (
  `num_blog` int(2) NOT NULL,
  `titre` varchar(32) NOT NULL,
  `tags` varchar(32) NOT NULL,
  `image` varchar(255) NOT NULL,
  `alt` varchar(255) NOT NULL,
  `description` varchar(128) NOT NULL,
  `contenu` longtext NOT NULL,
  `date_article` datetime NOT NULL,
  `autheur` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `pictureBanque`
--

CREATE TABLE `pictureBanque` (
  `num_picture` int(2) NOT NULL,
  `link_picture` varchar(255) NOT NULL,
  `title_picture` varchar(32) DEFAULT NULL,
  `description_picture` varchar(128) DEFAULT NULL,
  `data_size` varchar(32) NOT NULL,
  `alt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `complementAdresse`
--

CREATE TABLE `complementAdresse` (
  `nom` varchar(32) DEFAULT NULL,
  `prenom` varchar(32) DEFAULT NULL,
  `adresse` varchar(32) DEFAULT NULL,
  `code_postal` varchar(5) DEFAULT NULL,
  `ville` varchar(15) DEFAULT NULL,
  `telephone` varchar(10) DEFAULT NULL,
  `num_user` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `complementProfil`
--

CREATE TABLE `complementProfil` (
  `civilite` char(1) DEFAULT NULL,
  `mes_infos` varchar(255) DEFAULT NULL,
  `mes_activiters` varchar(255) DEFAULT NULL,
  `num_user` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `rang`
--

CREATE TABLE `rang` (
  `code_rang` char(5) DEFAULT NULL,
  `libelle` varchar(32) DEFAULT NULL,
  `session_date` datetime DEFAULT NULL,
  `num_user` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `num_user` int(2) NOT NULL,
  `email` varchar(32) NOT NULL,
  `avatar` varchar(255) NOT NULL,
  `pseudo` varchar(128) NOT NULL,
  `mot_de_passe` varchar(128) NOT NULL,
  `confirmation_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`num_blog`);

--
-- Index pour la table `pictureBanque`
--
ALTER TABLE `pictureBanque`
  ADD PRIMARY KEY (`num_picture`);

--
-- Index pour la table `complementAdresse`
--
ALTER TABLE `complementAdresse`
  ADD PRIMARY KEY (`num_user`),
  ADD KEY `I_FK_complementAdresse_user` (`num_user`);

--
-- Index pour la table `complementProfil`
--
ALTER TABLE `complementProfil`
  ADD PRIMARY KEY (`num_user`),
  ADD KEY `I_FK_complementProfil_user` (`num_user`);

--
-- Index pour la table `rang`
--
ALTER TABLE `rang`
  ADD PRIMARY KEY (`num_user`),
  ADD KEY `I_FK_rang_user` (`num_user`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`num_user`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `blog`
--
ALTER TABLE `blog`
  MODIFY `num_blog` int(2) NOT NULL AUTO_INCREMENT AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `pictureBanque`
--
ALTER TABLE `pictureBanque`
  MODIFY `num_picture` int(2) NOT NULL AUTO_INCREMENT AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `num_user` int(2) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `complementAdresse`
--
ALTER TABLE `complementAdresse`
  ADD CONSTRAINT `complementAdresse_ibfk_1` FOREIGN KEY (`num_user`) REFERENCES `user` (`num_user`);

--
-- Contraintes pour la table `complementProfil`
--
ALTER TABLE `complementProfil`
  ADD CONSTRAINT `complementProfil_ibfk_1` FOREIGN KEY (`num_user`) REFERENCES `user` (`num_user`);

--
-- Contraintes pour la table `rang`
--
ALTER TABLE `rang`
  ADD CONSTRAINT `rang_ibfk_1` FOREIGN KEY (`num_user`) REFERENCES `user` (`num_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
