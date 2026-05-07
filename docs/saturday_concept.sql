-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-05-2026 a las 16:05:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `saturday_concept`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `addresses`
--

CREATE TABLE `addresses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `door` varchar(255) DEFAULT NULL,
  `pc` varchar(255) NOT NULL,
  `city_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `addresses`
--

INSERT INTO `addresses` (`id`, `name`, `door`, `pc`, `city_id`) VALUES
(1, 'Calle Kiley Trail', '2D', '90769', 1),
(2, 'Calle Camden Square', '10B', '90468', 9),
(3, 'Calle Meredith Row', '4B', '87647', 6),
(4, 'Calle Beth Gateway', '5C', '06854-6583', 8),
(5, 'Calle Angela Trail', '4A', '06499', 5),
(6, 'Calle Katherine Knoll', '9C', '19223-2916', 9),
(7, 'Calle Swaniawski Squares', '2D', '04263-1382', 4),
(8, 'Calle Jeff Greens', '3A', '27248-3055', 6),
(9, 'Calle Lang Loaf', '1D', '49450', 6),
(10, 'Calle Harrison Cliff', '9D', '60615', 1),
(15, 'Carrer Dels Horts', NULL, '07003', 13),
(16, 'Carrer Dels Horts', '4b', '07003', 13);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `brands`
--

CREATE TABLE `brands` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `brands`
--

INSERT INTO `brands` (`name`) VALUES
('Corteiz'),
('Louis Vuitton'),
('New Era'),
('Nike'),
('NWHR'),
('Timberland');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cities`
--

CREATE TABLE `cities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `country_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `cities`
--

INSERT INTO `cities` (`id`, `name`, `country_id`) VALUES
(1, 'Madrid', 1),
(2, 'Barcelona', 1),
(3, 'Palma de Mallorca', 1),
(4, 'Valencia', 1),
(5, 'Sevilla', 1),
(6, 'París', 2),
(7, 'Marsella', 2),
(8, 'Lyon', 2),
(9, 'Roma', 3),
(10, 'Milán', 3),
(13, 'Palma', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `countries`
--

CREATE TABLE `countries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `countries`
--

INSERT INTO `countries` (`id`, `name`) VALUES
(1, 'España'),
(2, 'Francia'),
(3, 'Italia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `surnames` varchar(255) NOT NULL,
  `contact` varchar(255) NOT NULL,
  `address_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `customers`
--

INSERT INTO `customers` (`id`, `name`, `surnames`, `contact`, `address_id`) VALUES
(1, 'Carlos', 'García López', '417-964-2017', 1),
(2, 'María', 'Martínez Ruiz', '928-571-4963', 2),
(3, 'Juan', 'Fernández Sánchez', '+1 (276) 398-2030', 3),
(4, 'Ana', 'González Díaz', '+1.412.381.7194', 4),
(5, 'Pedro', 'Rodríguez Pérez', '480.757.2234', 5),
(6, 'Laura', 'López Moreno', '458.635.7288', 6),
(7, 'Miguel', 'Hernández Gil', '+1.323.905.5670', 7),
(8, 'Sofía', 'Muñoz Navarro', '(346) 523-5965', 8),
(9, 'Pablo', 'Romero Ortiz', '1-321-842-0467', 9),
(10, 'Elena', 'Jiménez Torres', '+1-978-612-5437', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `discount` decimal(5,2) NOT NULL DEFAULT 0.00,
  `order_total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `address_id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id`, `discount`, `order_total`, `address_id`, `customer_id`) VALUES
(1, 5.00, 912.00, 5, 5),
(2, 15.00, 269.45, 8, 8),
(3, 20.00, 287.20, 2, 2),
(4, 10.00, 1065.60, 5, 5),
(5, 10.00, 1288.80, 7, 7),
(6, 15.00, 69.70, 8, 8),
(7, 0.00, 4807.00, 4, 4),
(8, 5.00, 46.55, 6, 6),
(9, 20.00, 649.60, 7, 7),
(10, 10.00, 1018.80, 5, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `order_items`
--

CREATE TABLE `order_items` (
  `order_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `order_items`
--

INSERT INTO `order_items` (`order_id`, `product_id`, `quantity`) VALUES
(1, 16, 3),
(2, 3, 2),
(2, 6, 3),
(3, 4, 3),
(3, 5, 1),
(3, 9, 2),
(4, 2, 3),
(4, 3, 1),
(4, 9, 2),
(4, 18, 2),
(5, 1, 1),
(5, 4, 1),
(5, 8, 1),
(5, 17, 3),
(6, 4, 1),
(7, 7, 3),
(7, 11, 2),
(7, 12, 3),
(7, 13, 1),
(8, 5, 1),
(9, 9, 1),
(9, 18, 2),
(10, 12, 1),
(10, 15, 1),
(10, 18, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `section_name` varchar(255) NOT NULL,
  `size_name` varchar(255) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `img`, `description`, `section_name`, `size_name`, `stock`) VALUES
(1, 'NWHR In Particular Hoodie', 85.00, 'particular-hoodie.png', 'Descubre la sudadera NWHR In Particular Hoodie de NWHR, una prenda imprescindible para los amantes del streetwear que buscan estilo y comodidad en cada paso. Con la firma de calidad de NWHR, esta sudadera se convierte en un must-have para tu colección de ropa deportiva. Confeccionada con los mejores materiales, la sudadera NWHR In Particular Hoodie garantiza durabilidad y confort en cada uso. Su diseño versátil y moderno la convierte en la elección perfecta para complementar tus outfits urbanos y deportivos. Disponible en una amplia gama de colores, encontrarás la opción que mejor se adapte a tu estilo único. Esta sudadera de NWHR está diseñada para adaptarse a todos los géneros, ofreciendo un ajuste cómodo y favorecedor. Ya sea para completar tu look con unas sneakers a juego o para llevarla en tu día a día, la NWHR In Particular Hoodie es la elección ideal. En Saturday Concept, tu tienda de sneakers y ropa deportiva en Palma de Mallorca, España, podrás encontrar la sudadera NWHR In Particular Hoodie de NWHR y disfrutar de un envío rápido para que puedas lucirla cuanto antes. Aprovecha la oportunidad de añadir este imprescindible de la moda streetwear a tu armario y destacar en cada ocasión. No esperes más y hazte con la sudadera NWHR In Particular Hoodie, un icono de estilo y calidad que no puede faltar en tu colección. Descubre la esencia de NWHR y experimenta el máximo confort con esta sudadera única. ¡Haz tu pedido ahora y marca la diferencia con tu estilo!', 'streetwear', 'S', 1),
(2, 'NWHR In Particular Hoodie', 85.00, 'particular-hoodie.png', 'Descubre la sudadera NWHR In Particular Hoodie de NWHR, una prenda imprescindible para los amantes del streetwear que buscan estilo y comodidad en cada paso. Con la firma de calidad de NWHR, esta sudadera se convierte en un must-have para tu colección de ropa deportiva. Confeccionada con los mejores materiales, la sudadera NWHR In Particular Hoodie garantiza durabilidad y confort en cada uso. Su diseño versátil y moderno la convierte en la elección perfecta para complementar tus outfits urbanos y deportivos. Disponible en una amplia gama de colores, encontrarás la opción que mejor se adapte a tu estilo único. Esta sudadera de NWHR está diseñada para adaptarse a todos los géneros, ofreciendo un ajuste cómodo y favorecedor. Ya sea para completar tu look con unas sneakers a juego o para llevarla en tu día a día, la NWHR In Particular Hoodie es la elección ideal. En Saturday Concept, tu tienda de sneakers y ropa deportiva en Palma de Mallorca, España, podrás encontrar la sudadera NWHR In Particular Hoodie de NWHR y disfrutar de un envío rápido para que puedas lucirla cuanto antes. Aprovecha la oportunidad de añadir este imprescindible de la moda streetwear a tu armario y destacar en cada ocasión. No esperes más y hazte con la sudadera NWHR In Particular Hoodie, un icono de estilo y calidad que no puede faltar en tu colección. Descubre la esencia de NWHR y experimenta el máximo confort con esta sudadera única. ¡Haz tu pedido ahora y marca la diferencia con tu estilo!', 'streetwear', 'M', 2),
(3, 'NWHR In Particular Hoodie', 85.00, 'particular-hoodie.png', 'Descubre la sudadera NWHR In Particular Hoodie de NWHR, una prenda imprescindible para los amantes del streetwear que buscan estilo y comodidad en cada paso. Con la firma de calidad de NWHR, esta sudadera se convierte en un must-have para tu colección de ropa deportiva. Confeccionada con los mejores materiales, la sudadera NWHR In Particular Hoodie garantiza durabilidad y confort en cada uso. Su diseño versátil y moderno la convierte en la elección perfecta para complementar tus outfits urbanos y deportivos. Disponible en una amplia gama de colores, encontrarás la opción que mejor se adapte a tu estilo único. Esta sudadera de NWHR está diseñada para adaptarse a todos los géneros, ofreciendo un ajuste cómodo y favorecedor. Ya sea para completar tu look con unas sneakers a juego o para llevarla en tu día a día, la NWHR In Particular Hoodie es la elección ideal. En Saturday Concept, tu tienda de sneakers y ropa deportiva en Palma de Mallorca, España, podrás encontrar la sudadera NWHR In Particular Hoodie de NWHR y disfrutar de un envío rápido para que puedas lucirla cuanto antes. Aprovecha la oportunidad de añadir este imprescindible de la moda streetwear a tu armario y destacar en cada ocasión. No esperes más y hazte con la sudadera NWHR In Particular Hoodie, un icono de estilo y calidad que no puede faltar en tu colección. Descubre la esencia de NWHR y experimenta el máximo confort con esta sudadera única. ¡Haz tu pedido ahora y marca la diferencia con tu estilo!', 'streetwear', 'L', 1),
(4, 'NWHR Apacheta Hoodie', 82.00, 'apacheta-hoodie.png', '¡Descubre la sudadera NWHR Apacheta Hoodie de la reconocida marca NWHR en nuestra tienda online de sneakers y ropa deportiva! Esta sudadera, diseñada para la vida urbana y el estilo streetwear, es la elección perfecta para aquellos que buscan combinar comodidad y estilo en un solo producto. La NWHR Apacheta Hoodie destaca por su diseño moderno y versátil que se adapta a cualquier ocasión. Fabricada con materiales de alta calidad, garantiza durabilidad y confort en cada uso. Su ajuste perfecto y suavidad al tacto la convierten en una prenda imprescindible en tu armario. Disponible en una variedad de colores que se adaptan a tu estilo personal, esta sudadera es ideal para complementar tus sneakers favoritas y lucir un look urbano y actual. Ya sea para una salida casual o para tus actividades diarias, la NWHR Apacheta Hoodie te acompañará con estilo y funcionalidad. En Saturday Concept, nuestra tienda en Palma de Mallorca, España, encontrarás esta sudadera y una amplia selección de sneakers y ropa deportiva de las mejores marcas. Además, ofrecemos envío rápido para que puedas disfrutar de tu compra en poco tiempo. No pierdas la oportunidad de adquirir la NWHR Apacheta Hoodie y añadir un toque de estilo streetwear a tu outfit. ¡Hazte con la tuya hoy y destaca con un look único y moderno!', 'streetwear', 'XL', 1),
(5, 'NWHR Spray White Tee', 49.00, 'spray-tee.png', '¡Consigue un look urbano y fresco con la NWHR Spray White Tee de NWHR! Esta camiseta de la reconocida marca NWHR es la pieza perfecta para completar tu estilo streetwear con un toque de sofisticación. Confeccionada con materiales de alta calidad, la NWHR Spray White Tee te ofrece comodidad y estilo en cada uso. Su diseño minimalista en color blanco te permite combinarla fácilmente con tus sneakers favoritos, creando un outfit moderno y versátil. Esta camiseta, perteneciente a la categoría streetwear, es ideal para hombres y mujeres que buscan destacar con un look casual y a la moda. Ya sea para salir a pasear por la ciudad o para una quedada con amigos, la NWHR Spray White Tee es la elección perfecta. Disponible exclusivamente en nuestra tienda Saturday Concept en Palma de Mallorca, España, podrás adquirir esta camiseta y recibirla rápidamente en la comodidad de tu hogar. No pierdas la oportunidad de añadir este imprescindible de NWHR a tu colección de ropa deportiva y streetwear. Atrévete a marcar tendencia con la NWHR Spray White Tee y eleva tu estilo a otro nivel. ¡Hazte con la tuya hoy mismo y experimenta la calidad y el diseño único de NWHR!', 'streetwear', 'XS', 2),
(6, 'NWHR Spray White Tee', 49.00, 'spray-tee.png', '¡Consigue un look urbano y fresco con la NWHR Spray White Tee de NWHR! Esta camiseta de la reconocida marca NWHR es la pieza perfecta para completar tu estilo streetwear con un toque de sofisticación. Confeccionada con materiales de alta calidad, la NWHR Spray White Tee te ofrece comodidad y estilo en cada uso. Su diseño minimalista en color blanco te permite combinarla fácilmente con tus sneakers favoritos, creando un outfit moderno y versátil. Esta camiseta, perteneciente a la categoría streetwear, es ideal para hombres y mujeres que buscan destacar con un look casual y a la moda. Ya sea para salir a pasear por la ciudad o para una quedada con amigos, la NWHR Spray White Tee es la elección perfecta. Disponible exclusivamente en nuestra tienda Saturday Concept en Palma de Mallorca, España, podrás adquirir esta camiseta y recibirla rápidamente en la comodidad de tu hogar. No pierdas la oportunidad de añadir este imprescindible de NWHR a tu colección de ropa deportiva y streetwear. Atrévete a marcar tendencia con la NWHR Spray White Tee y eleva tu estilo a otro nivel. ¡Hazte con la tuya hoy mismo y experimenta la calidad y el diseño único de NWHR!', 'streetwear', 'S', 1),
(7, 'NWHR Bomb Tee', 49.00, 'bomb-tee.png', '¡Descubre la camiseta NWHR Bomb Tee de NWHR, una pieza imprescindible para los amantes del streetwear más auténtico! Con un diseño vanguardista y una calidad insuperable, esta camiseta se convierte en el complemento perfecto para tu outfit urbano. La camiseta NWHR Bomb Tee de NWHR destaca por su estilo único y su marcada personalidad, reflejando la esencia de la marca NWHR. Fabricada con materiales de primera calidad, garantiza comodidad y durabilidad en cada uso. Su diseño atrevido y moderno la convierte en una pieza imprescindible para quienes buscan destacar en la multitud. Disponible en nuestra tienda online Saturday Concept en Palma de Mallorca, España, podrás adquirir esta exclusiva camiseta y recibirla en tiempo récord gracias a nuestro envío rápido. ¡No pierdas la oportunidad de añadir esta prenda a tu colección de streetwear y marcar tendencia en cada paso que des! Con la camiseta NWHR Bomb Tee de NWHR, podrás expresar tu estilo único y auténtico, destacando entre la multitud con un look fresco y actual. ¡Hazte con la tuya y sé parte de la comunidad de fashionistas más exigentes! ¡Siente la diferencia con NWHR y eleva tu outfit a otro nivel! No esperes más y adquiere la camiseta NWHR Bomb Tee de NWHR en Saturday Concept, tu tienda de referencia para sneakers, ropa deportiva y streetwear en Palma de Mallorca, España. ¡Haz tu compra ahora y vive la experiencia de vestir con estilo y calidad incomparables!', 'streetwear', NULL, 0),
(8, 'Corteiz Trucker Hat Black White', 95.00, 'corteiz-hat.png', 'Descubre la última tendencia en accesorios deportivos con la Corteiz Trucker Hat Black White. Esta gorra de la reconocida marca Corteiz es el complemento perfecto para tus sneakers y outfits urbanos. Con un diseño moderno y versátil, esta gorra se convertirá en tu accesorio favorito para destacar en cualquier ocasión. El modelo Trucker Hat Black White de Corteiz ha sido diseñado pensando en los amantes de la moda urbana y el estilo deportivo. Su combinación de colores en negro y blanco le confiere un aire contemporáneo y sofisticado que no pasará desapercibido. Tanto si eres un apasionado de las zapatillas como si simplemente buscas un accesorio de calidad, esta gorra es para ti. Fabricada con materiales de alta calidad, la Corteiz Trucker Hat garantiza durabilidad y comodidad. Su ajuste perfecto te permitirá llevarla durante horas sin sacrificar estilo por confort. Ideal tanto para hombres como para mujeres, esta gorra unisex se adapta a cualquier look y personalidad, aportando un toque de elegancia y modernidad a tu outfit diario. En Saturday Concept, tu tienda de confianza en Palma de Mallorca, España, ya puedes hacerte con la Corteiz Trucker Hat Black White y disfrutar de un envío rápido y seguro. Completa tu colección de sneakers y ropa deportiva con este accesorio imprescindible que elevará tu estilo a otro nivel. No pierdas la oportunidad de destacar con un toque de distinción gracias a Corteiz y Saturday Concept. Atrévete a marcar la diferencia con la Corteiz Trucker Hat Black White y sé el centro de todas las miradas. ¡Hazte con la tuya ahora y vive la experiencia de la moda urbana en su máxima expresión!', 'accesorios', '6 7/8', 10),
(9, 'New Era 9FORTY LA Green', 32.00, 'ne-la-green.png', '¡Consigue un estilo único y urbano con la gorra New Era 9FORTY LA Green de New! Esta gorra, perfecta para complementar tu outfit deportivo o casual, es un accesorio imprescindible para los amantes de las zapatillas y la moda streetwear. Confeccionada por la reconocida marca New, la gorra New Era 9FORTY LA Green destaca por su diseño moderno y su calidad excepcional. El color verde vibrante le aporta un toque de frescura y originalidad, haciendo que destaques en cualquier ocasión. Esta gorra es unisex, por lo que tanto hombres como mujeres pueden lucirla con estilo y personalidad. Su modelo ajustable se adapta a diferentes tamaños de cabeza, garantizando un ajuste perfecto y cómodo en todo momento. En Saturday Concept, tu tienda de referencia en Palma de Mallorca, España, ya puedes encontrar la gorra New Era 9FORTY LA Green de New. Además, ofrecemos un envío rápido para que disfrutes de tu compra en tiempo récord. No pierdas la oportunidad de añadir este accesorio de moda a tu colección. Hazte con la gorra New Era 9FORTY LA Green y marca tendencia con un estilo único y auténtico. ¡Atrévete a destacar con Saturday Concept!', 'new era', '7 1/8', 7),
(10, 'New Era 9FORTY NY Green Cream', 32.00, 'ne-ny-greenCream.png', '¡Consigue un look urbano y auténtico con la gorra New Era 9FORTY NY Green Cream de New! Esta gorra, diseñada por la reconocida marca New, es el complemento perfecto para quienes buscan destacar con estilo en cualquier ocasión. El modelo 9FORTY NY Green Cream destaca por su diseño moderno y versátil, ideal para combinar con tus sneakers y ropa deportiva favorita. Confeccionada con materiales de alta calidad, esta gorra ofrece un ajuste cómodo y duradero, perfecto para el día a día y para tus actividades al aire libre. El color verde crema le aporta un toque de frescura y originalidad a tu outfit, convirtiéndola en un accesorio imprescindible para los amantes de la moda urbana. Su estilo clásico con el logo de New en la parte frontal le confiere un aire retro y a la vez contemporáneo que no pasará desapercibido. Disponible en nuestra tienda Saturday Concept en Palma de Mallorca, España, esta gorra puede ser tuya con tan solo un clic. Aprovecha nuestro envío rápido para lucirla cuanto antes y marcar tendencia en las calles. No esperes más para añadir este exclusivo accesorio a tu colección de sneakers y zapatillas. No pierdas la oportunidad de destacar con estilo y personalidad. ¡Hazte ya con la gorra New Era 9FORTY NY Green Cream de New y marca la diferencia en cada paso que des!', 'new era', NULL, 0),
(11, 'New Era 9FORTY NY Flowers', 32.00, 'ne-ny-flowers.png', '¡Descubre el accesorio perfecto para complementar tu estilo urbano y fresco con el New Era 9FORTY NY Flowers de la reconocida marca New! Este gorra esencial es ideal para los amantes de la moda streetwear que buscan destacar con un toque de elegancia y originalidad. El New Era 9FORTY NY Flowers es sin duda una pieza única que no puede faltar en tu colección. Con un diseño floral inspirado en la emblemática ciudad de Nueva York, esta gorra combina a la perfección la sofisticación con la frescura del street style. Su estilo atemporal y versátil te permitirá lucirlo en cualquier ocasión, ya sea para un look casual o para completar un outfit más deportivo. Fabricada con materiales de alta calidad, esta gorra garantiza durabilidad y comodidad en cada uso. Su ajuste perfecto te brinda la confianza de llevar un accesorio que se adapta a ti, mientras que su diseño exclusivo añade un toque de personalidad a tu vestuario. Disponible en nuestra tienda Saturday Concept en Palma de Mallorca, España, el New Era 9FORTY NY Flowers de New está a solo un clic de distancia. Con envío rápido a toda España, podrás disfrutar de este increíble accesorio en poco tiempo y llevar tu estilo al siguiente nivel. No pierdas la oportunidad de adquirir este accesorio único que te hará destacar en cualquier lugar. ¡Hazte con el New Era 9FORTY NY Flowers y añade un toque de originalidad a tu outfit!', 'new era', '7 1/4', 1),
(12, 'New Era 9TWENTY NY', 32.00, 'ne-ny-classic.png', 'Descubre este exclusivo New Era 9FIFTY NY en nuestra tienda en el centro de Palma de Mallorca.\n\nProducto 100% auténtico disponible en nuestra boutique de sneakers y streetwear en las Islas Baleares.\n\nVisítanos o contacta con nosotros para consultar disponibilidad de tallas.', 'new era', '7 1/8', 2),
(13, 'Louis Vuitton Ankle Boot Timberland Wheat', 4500.00, 'LV-Boot.png', 'El diseño de la Louis Vuitton x Timberland Ankle Boot \"Wheat\" nace de la visionaria alianza orquestada por Pharrell Williams, fusionando la histórica casa de lujo francesa con la marca estadounidense que definió para siempre el calzado de trabajo y la cultura hip-hop. Esta silueta coge el histórico diseño original de la clásica bota de seis pulgadas de 1973 y lo inyecta de pura opulencia y artesanía suprema, elevando el símbolo definitivo de las calles de Nueva York a la cima de la alta costura.\n\nPara esta edición, la bota apuesta por una estética robusta, utilitaria y sumamente exclusiva. La base construida en el icónico y resistente nubuck de primera calidad en tono trigo (\"Wheat\") se enriquece de forma magistral con el inconfundible patrón Monogram de Louis Vuitton finamente grabado a lo largo de sus paneles y lengüeta. El diseño eleva su estatus de auténtico lujo incorporando detalles inigualables, como los ojales dorados personalizados, los herrajes exclusivos de la Maison y un exquisito forro interior de cuero premium. Todo esto descansa sobre una imponente y duradera suela de goma dentada, garantizando resistencia absoluta para cualquier terreno y dejando un mensaje claro: es un par para quienes exigen la perfección artesanal sin perder un ápice de actitud callejera.\n\nDescubre este exclusivo Louis Vuitton x Timberland en nuestra tienda en el centro de Palma de Mallorca.\n\nProducto 100% auténtico disponible en nuestra boutique de sneakers y streetwear en las Islas Baleares.\n\nVisítanos o contacta con nosotros para consultar disponibilidad de tallas.', 'sneakers', NULL, 0),
(14, 'SB Dunk Low RIOT', 320.00, 'dunk-riot.png', 'Las Dunk Low Pro SB QS \"Mahogany Dark Beetroot\" de RIOT Skateshop x Nike presentan un diseño colaborativo con colores y detalles inspirados en la sede de la marca en Burdeos, Francia. La parte superior combina una base de nobuk verde oscuro con capas de ante color oporto en la puntera y el talón. Además de un Swoosh burdeos mate con un contorno de TPU brillante, elementos únicos de la marca incluyen las etiquetas de la lengüeta de RIOT Skateshop y el logotipo del perro reclinado de la tienda bordado en el lateral del talón. Las marcas RIOT y Nike, a juego, aparecen en cada lengüeta trasera de nobuk y en la plantilla de corcho. Bajo los pies, una suela exterior de goma translúcida color granate proporciona una tracción excelente.\n\nEn nuestra tienda física en el corazón de Palma de Mallorca, podrás experimentar en persona la calidad y comodidad de estas zapatillas, fabricadas con los mejores materiales para brindarte un ajuste perfecto y un estilo inigualable. La combinación de colores Team Red, Sail y Night Maroon añade un toque de sofisticación a cualquier outfit urbano.\n\nNo pierdas la oportunidad de ser parte de la revolución del streetwear con las Nike C-SB Dunk Low RIOT. ¡Visítanos en Palma de Mallorca y haz tuya esta pieza única que elevará tu estilo a otro nivel!', 'sneakers', '42', 3),
(15, 'SB Dunk Low RIOT', 320.00, 'dunk-riot.png', 'Las Dunk Low Pro SB QS \"Mahogany Dark Beetroot\" de RIOT Skateshop x Nike presentan un diseño colaborativo con colores y detalles inspirados en la sede de la marca en Burdeos, Francia. La parte superior combina una base de nobuk verde oscuro con capas de ante color oporto en la puntera y el talón. Además de un Swoosh burdeos mate con un contorno de TPU brillante, elementos únicos de la marca incluyen las etiquetas de la lengüeta de RIOT Skateshop y el logotipo del perro reclinado de la tienda bordado en el lateral del talón. Las marcas RIOT y Nike, a juego, aparecen en cada lengüeta trasera de nobuk y en la plantilla de corcho. Bajo los pies, una suela exterior de goma translúcida color granate proporciona una tracción excelente.\n\nEn nuestra tienda física en el corazón de Palma de Mallorca, podrás experimentar en persona la calidad y comodidad de estas zapatillas, fabricadas con los mejores materiales para brindarte un ajuste perfecto y un estilo inigualable. La combinación de colores Team Red, Sail y Night Maroon añade un toque de sofisticación a cualquier outfit urbano.\n\nNo pierdas la oportunidad de ser parte de la revolución del streetwear con las Nike C-SB Dunk Low RIOT. ¡Visítanos en Palma de Mallorca y haz tuya esta pieza única que elevará tu estilo a otro nivel!', 'sneakers', '41', 1),
(16, 'SB Dunk Low RIOT', 320.00, 'dunk-riot.png', 'Las Dunk Low Pro SB QS \"Mahogany Dark Beetroot\" de RIOT Skateshop x Nike presentan un diseño colaborativo con colores y detalles inspirados en la sede de la marca en Burdeos, Francia. La parte superior combina una base de nobuk verde oscuro con capas de ante color oporto en la puntera y el talón. Además de un Swoosh burdeos mate con un contorno de TPU brillante, elementos únicos de la marca incluyen las etiquetas de la lengüeta de RIOT Skateshop y el logotipo del perro reclinado de la tienda bordado en el lateral del talón. Las marcas RIOT y Nike, a juego, aparecen en cada lengüeta trasera de nobuk y en la plantilla de corcho. Bajo los pies, una suela exterior de goma translúcida color granate proporciona una tracción excelente.\n\nEn nuestra tienda física en el corazón de Palma de Mallorca, podrás experimentar en persona la calidad y comodidad de estas zapatillas, fabricadas con los mejores materiales para brindarte un ajuste perfecto y un estilo inigualable. La combinación de colores Team Red, Sail y Night Maroon añade un toque de sofisticación a cualquier outfit urbano.\n\nNo pierdas la oportunidad de ser parte de la revolución del streetwear con las Nike C-SB Dunk Low RIOT. ¡Visítanos en Palma de Mallorca y haz tuya esta pieza única que elevará tu estilo a otro nivel!', 'sneakers', '45', 3),
(17, 'Air Max 95 Corteiz Honey Black', 390.00, '95-corteiz-honeyBlack.png', 'El diseño de la Nike Air Max 95 \"Honey Black\" nace de la explosiva alianza entre Nike y Corteiz, la marca londinense que ha revolucionado el streetwear moderno con su actitud rebelde y exclusiva. Esta silueta coge el icónico diseño original de los 90, inspirado en la anatomía humana, y lo inyecta de pura crudeza callejera.\n\nPara esta edición, la zapatilla apuesta por una estética oscura, sigilosa y táctica. La base de paneles completamente negra se rompe de forma magistral con acentos cálidos y vibrantes en tono amarillo (\"Tour Yellow\" o Honey). El diseño eleva su enfoque utilitario incorporando tiradores de estilo militar para los cordones, un práctico cierre ajustable (lace toggle) y, por supuesto, los inconfundibles logotipos de Corteiz bordados en zonas estratégicas. Todo esto descansa sobre una gruesa suela negra con su icónica cámara de aire, garantizando resistencia urbana y dejando un mensaje claro: es un par para quienes entienden y viven la cultura del hype.\n\nEn nuestra tienda física, ubicada en el centro de Palma de Mallorca, podrás encontrar este exclusivo modelo y experimentar la autenticidad de llevar un calzado único. ¡No pierdas la oportunidad de ser parte de la tendencia streetwear con Air Max 95 Corteiz Honey Black!', 'sneakers', '38', 3),
(18, 'Air Max 95 Corteiz Honey Black', 390.00, '95-corteiz-honeyBlack.png', 'El diseño de la Nike Air Max 95 \"Honey Black\" nace de la explosiva alianza entre Nike y Corteiz, la marca londinense que ha revolucionado el streetwear moderno con su actitud rebelde y exclusiva. Esta silueta coge el icónico diseño original de los 90, inspirado en la anatomía humana, y lo inyecta de pura crudeza callejera.\n\nPara esta edición, la zapatilla apuesta por una estética oscura, sigilosa y táctica. La base de paneles completamente negra se rompe de forma magistral con acentos cálidos y vibrantes en tono amarillo (\"Tour Yellow\" o Honey). El diseño eleva su enfoque utilitario incorporando tiradores de estilo militar para los cordones, un práctico cierre ajustable (lace toggle) y, por supuesto, los inconfundibles logotipos de Corteiz bordados en zonas estratégicas. Todo esto descansa sobre una gruesa suela negra con su icónica cámara de aire, garantizando resistencia urbana y dejando un mensaje claro: es un par para quienes entienden y viven la cultura del hype.\n\nEn nuestra tienda física, ubicada en el centro de Palma de Mallorca, podrás encontrar este exclusivo modelo y experimentar la autenticidad de llevar un calzado único. ¡No pierdas la oportunidad de ser parte de la tendencia streetwear con Air Max 95 Corteiz Honey Black!', 'sneakers', '42', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `product_brand`
--

CREATE TABLE `product_brand` (
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `brand_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `product_brand`
--

INSERT INTO `product_brand` (`product_id`, `brand_name`) VALUES
(1, 'NWHR'),
(2, 'NWHR'),
(3, 'NWHR'),
(4, 'NWHR'),
(5, 'NWHR'),
(6, 'NWHR'),
(7, 'NWHR'),
(8, 'Corteiz'),
(9, 'New Era'),
(10, 'New Era'),
(11, 'New Era'),
(12, 'New Era'),
(13, 'Louis Vuitton'),
(13, 'Timberland'),
(14, 'Nike'),
(15, 'Nike'),
(16, 'Nike'),
(17, 'Corteiz'),
(17, 'Nike'),
(18, 'Corteiz'),
(18, 'Nike');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sections`
--

CREATE TABLE `sections` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sections`
--

INSERT INTO `sections` (`name`) VALUES
('accesorios'),
('new era'),
('sneakers'),
('streetwear');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sizes`
--

CREATE TABLE `sizes` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sizes`
--

INSERT INTO `sizes` (`name`) VALUES
('38'),
('41'),
('42'),
('45'),
('6 7/8'),
('7 1/4'),
('7 1/8'),
('L'),
('M'),
('S'),
('XL'),
('XS');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `addresses_city_id_foreign` (`city_id`);

--
-- Indices de la tabla `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`name`);

--
-- Indices de la tabla `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cities_country_id_foreign` (`country_id`);

--
-- Indices de la tabla `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customers_address_id_foreign` (`address_id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_address_id_foreign` (`address_id`),
  ADD KEY `orders_customer_id_foreign` (`customer_id`);

--
-- Indices de la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_id`,`product_id`),
  ADD KEY `order_items_product_id_foreign` (`product_id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_section_name_foreign` (`section_name`),
  ADD KEY `products_size_name_foreign` (`size_name`);

--
-- Indices de la tabla `product_brand`
--
ALTER TABLE `product_brand`
  ADD PRIMARY KEY (`product_id`,`brand_name`),
  ADD KEY `product_brand_brand_name_foreign` (`brand_name`);

--
-- Indices de la tabla `sections`
--
ALTER TABLE `sections`
  ADD PRIMARY KEY (`name`);

--
-- Indices de la tabla `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`name`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `cities`
--
ALTER TABLE `cities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `countries`
--
ALTER TABLE `countries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `addresses_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `cities_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_address_id_foreign` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_section_name_foreign` FOREIGN KEY (`section_name`) REFERENCES `sections` (`name`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_size_name_foreign` FOREIGN KEY (`size_name`) REFERENCES `sizes` (`name`) ON DELETE SET NULL;

--
-- Filtros para la tabla `product_brand`
--
ALTER TABLE `product_brand`
  ADD CONSTRAINT `product_brand_brand_name_foreign` FOREIGN KEY (`brand_name`) REFERENCES `brands` (`name`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_brand_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
