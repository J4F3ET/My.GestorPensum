-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-01-2023 a las 03:37:12
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `base_de_datos_pensum`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `color`
--

CREATE TABLE `color` (
  `id` int(11) NOT NULL,
  `nombre` char(6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `color`
--

INSERT INTO `color` (`id`, `nombre`) VALUES
(1, 'B6AD90'),
(2, '936639'),
(3, '656D4A'),
(4, 'A4AC86');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_materia`
--

CREATE TABLE `estado_materia` (
  `id` int(11) NOT NULL,
  `estado` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_materia`
--

INSERT INTO `estado_materia` (`id`, `estado`) VALUES
(1, 'No incrita'),
(2, 'Cursando'),
(3, 'Aprobada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `id` int(11) NOT NULL,
  `id_materia` int(11) NOT NULL,
  `ubicacion` varchar(13) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `semestre` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `creditos` int(11) NOT NULL,
  `HTD` int(11) NOT NULL,
  `HTA` int(11) NOT NULL,
  `HTC` int(11) NOT NULL,
  `color` int(11) NOT NULL,
  `estado` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`id`, `nombre`, `semestre`, `tipo`, `creditos`, `HTD`, `HTA`, `HTC`, `color`, `estado`) VALUES
(2, 'CAL DIFERENCIAL', 1, 1, 4, 3, 3, 6, 1, 1),
(3, 'CAL INTEGRAL', 2, 1, 3, 3, 3, 3, 1, 1),
(4, 'Fisica I Newtoniana', 2, 1, 3, 3, 3, 3, 1, 1),
(5, 'Fisica II Newtoniana', 3, 1, 3, 3, 3, 3, 1, 1),
(6, 'Introduccion Agoritmos', 1, 1, 3, 3, 3, 3, 1, 1),
(7, 'POO', 2, 1, 3, 3, 3, 3, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia_relacion`
--

CREATE TABLE `materia_relacion` (
  `id_usuario` int(11) NOT NULL,
  `id_materia` int(11) NOT NULL,
  `id_relacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `materia_relacion`
--

INSERT INTO `materia_relacion` (`id_usuario`, `id_materia`, `id_relacion`) VALUES
(6, 2, 3),
(6, 2, 4),
(6, 3, 5),
(6, 4, 5),
(6, 6, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_materia`
--

CREATE TABLE `tipo_materia` (
  `id` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_materia`
--

INSERT INTO `tipo_materia` (`id`, `nombre`) VALUES
(1, 'Obligatorios Básicos'),
(2, 'Obligatorios Complementarios'),
(3, 'Electivos Intrínsecos'),
(4, 'Electivos Extrínsecos'),
(5, 'Componente Propedéutico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `password` char(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id`, `nombre`, `password`) VALUES
(6, 'admin', '$2b$10$MFC3jsgd0UpMTy5HBdocy.ofcHpl9UW6iPjc/RC8QsH5JgmC5igyO'),
(14, 'mauricio', '$2b$10$EX46PzT.JzcuiUuQuPjymOm1J0FNo2q6V91CePNFaZy48qgsCAFO2'),
(15, 'lau', '$2b$10$APdYYyuvEuYly.9mArZspO1DsAEs0rZGnrsNv8CBdq0JL0ueM37Ci'),
(16, 'lau1', '$2b$10$rhD4TawMaNTxpfc1caQJAuDEZovFxpp5Xm.mmI0dXVmu0oGBbQ3Wi'),
(18, 'lau2', '$2b$10$qKP0/IPb2yXLDvYZnxEhw.GfTyAh.tM9pb/zf/Kj1ZbhV644I.KUG'),
(19, 'ray', '$2b$10$Soso3VyXUEMgzqK7jZD/0uvpavSWhwus2BbaLT34pPrExkH7h.cQG'),
(20, 'elpito', '$2b$10$f7gkeBtvaV5nD6xxOWq3OOkY9dzC3nUavjw5ogiW0As6yhageKHSS'),
(21, '', '$2b$10$qchR7ZKY8qNQiHYNu3vFm.bwt2wO6pNAgDUlshvR5BP8jfUIS.Dq2'),
(22, 'asd', '$2b$10$2at0UOA.XkC25uN91s.iyOP6gWrOiIwKRbHJoZGBU/kD0Fhp0Sur6'),
(23, 'pepe', '$2b$10$jsrePGTyjdJWXdTjmKc7Y.ROB67OOU9avVoNshCYA1PnDjsNaitsm');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_materia`
--

CREATE TABLE `usuario_materia` (
  `id_usuario` int(11) NOT NULL,
  `id_materia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario_materia`
--

INSERT INTO `usuario_materia` (`id_usuario`, `id_materia`) VALUES
(6, 2),
(6, 3),
(6, 4),
(6, 5),
(6, 6),
(6, 7);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `estado_materia`
--
ALTER TABLE `estado_materia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_materia` (`id_materia`);

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tipo` (`tipo`),
  ADD KEY `color` (`color`),
  ADD KEY `estado` (`estado`);

--
-- Indices de la tabla `materia_relacion`
--
ALTER TABLE `materia_relacion`
  ADD PRIMARY KEY (`id_usuario`,`id_materia`,`id_relacion`),
  ADD KEY `id_materia` (`id_materia`),
  ADD KEY `id_relacion` (`id_relacion`);

--
-- Indices de la tabla `tipo_materia`
--
ALTER TABLE `tipo_materia`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuario_materia`
--
ALTER TABLE `usuario_materia`
  ADD PRIMARY KEY (`id_usuario`,`id_materia`),
  ADD KEY `id_materia` (`id_materia`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `color`
--
ALTER TABLE `color`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `estado_materia`
--
ALTER TABLE `estado_materia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `horario`
--
ALTER TABLE `horario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `materia`
--
ALTER TABLE `materia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tipo_materia`
--
ALTER TABLE `tipo_materia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `horario`
--
ALTER TABLE `horario`
  ADD CONSTRAINT `horario_ibfk_1` FOREIGN KEY (`id_materia`) REFERENCES `materia` (`id`);

--
-- Filtros para la tabla `materia`
--
ALTER TABLE `materia`
  ADD CONSTRAINT `materia_ibfk_1` FOREIGN KEY (`tipo`) REFERENCES `tipo_materia` (`id`),
  ADD CONSTRAINT `materia_ibfk_2` FOREIGN KEY (`color`) REFERENCES `color` (`id`),
  ADD CONSTRAINT `materia_ibfk_3` FOREIGN KEY (`estado`) REFERENCES `estado_materia` (`id`);

--
-- Filtros para la tabla `materia_relacion`
--
ALTER TABLE `materia_relacion`
  ADD CONSTRAINT `materia_relacion_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `materia_relacion_ibfk_2` FOREIGN KEY (`id_materia`) REFERENCES `materia` (`id`),
  ADD CONSTRAINT `materia_relacion_ibfk_3` FOREIGN KEY (`id_relacion`) REFERENCES `materia` (`id`);

--
-- Filtros para la tabla `usuario_materia`
--
ALTER TABLE `usuario_materia`
  ADD CONSTRAINT `usuario_materia_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  ADD CONSTRAINT `usuario_materia_ibfk_2` FOREIGN KEY (`id_materia`) REFERENCES `materia` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
