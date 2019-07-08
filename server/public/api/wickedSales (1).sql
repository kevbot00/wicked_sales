-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 08, 2019 at 05:06 AM
-- Server version: 5.7.26-0ubuntu0.18.04.1
-- PHP Version: 7.2.17-0ubuntu0.18.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wickedSales`
--

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(10) UNSIGNED NOT NULL,
  `products_id` mediumint(8) UNSIGNED NOT NULL,
  `quantity` tinyint(3) UNSIGNED NOT NULL,
  `user_id` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `products_id`, `quantity`, `user_id`) VALUES
(359, 1, 1, '5d156e1cd1057'),
(360, 27, 1, '5d156e1cd1057'),
(361, 26, 1, '5d156e1cd1057');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` varchar(20) NOT NULL,
  `carts_user_id` varchar(30) NOT NULL,
  `carts_order` json NOT NULL,
  `fullName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `card` varchar(30) NOT NULL,
  `street` varchar(50) NOT NULL,
  `city` varchar(30) NOT NULL,
  `state` varchar(3) NOT NULL,
  `zip` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `carts_user_id`, `carts_order`, `fullName`, `email`, `card`, `street`, `city`, `state`, `zip`) VALUES
('5d2299f5c4f87', '5d156e1cd1057', '[{\"quantity\": \"1\", \"product_id\": \"1\"}, {\"quantity\": \"1\", \"product_id\": \"2\"}, {\"quantity\": \"1\", \"product_id\": \"3\"}, {\"quantity\": \"1\", \"product_id\": \"4\"}]', 'demo', 'demo', 'demo', 'demo', 'demo', 'CA', 'demo'),
('5d22a308a5713', '5d156e1cd1057', '[{\"quantity\": \"1\", \"product_id\": \"1\"}, {\"quantity\": \"2\", \"product_id\": \"16\"}, {\"quantity\": \"1\", \"product_id\": \"13\"}]', 'demo', 'demo', 'demo', 'demo', 'demo', 'CA', 'demo'),
('5d22a92f09a9b', '5d156e1cd1057', '[{\"quantity\": \"2\", \"product_id\": \"1\"}, {\"quantity\": \"1\", \"product_id\": \"13\"}, {\"quantity\": \"1\", \"product_id\": \"16\"}, {\"quantity\": \"1\", \"product_id\": \"17\"}, {\"quantity\": \"2\", \"product_id\": \"19\"}]', 'demo', 'demo', 'demo', 'demo', 'demo', 'CA', 'demo'),
('5d22cb5642bf6', '5d156e1cd1057', '[{\"quantity\": \"4\", \"product_id\": \"1\"}, {\"quantity\": \"1\", \"product_id\": \"13\"}, {\"quantity\": \"1\", \"product_id\": \"16\"}, {\"quantity\": \"1\", \"product_id\": \"17\"}, {\"quantity\": \"1\", \"product_id\": \"19\"}, {\"quantity\": \"1\", \"product_id\": \"18\"}, {\"quantity\": \"4\", \"product_id\": \"20\"}]', 'demo', 'demo', 'demo', 'demo', 'demo', 'CA', 'demo'),
('5d22cc113c329', '5d156e1cd1057', '[{\"quantity\": \"1\", \"product_id\": \"16\"}]', 'demo', 'demo', 'demo', 'demo', 'demo', 'CA', 'demo'),
('5d22cd3fefed2', '5d156e1cd1057', '[{\"quantity\": \"1\", \"product_id\": \"13\"}]', 'demo', 'demo', 'demo', 'demo', 'demo', 'CA', 'demo');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` mediumint(8) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `price` mediumint(8) UNSIGNED NOT NULL,
  `image` varchar(30) NOT NULL,
  `shortDescription` text NOT NULL,
  `longDescription` text NOT NULL,
  `images` json NOT NULL,
  `specifications` json NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `image`, `shortDescription`, `longDescription`, `images`, `specifications`) VALUES
(1, 'Farley 9.8 - Trek', 514999, 'https://bit.ly/3064zw7', 'It\'s the lightest fat bike we make. A carbon frame, carbon wheels, carbon fork, and top shelf SRAM drivetrain come together in Farley 9.8 to make a high performance ride that won\'t be slowed by foul weather, deep snow, or gnarly terrain.', 'A lightweight OCLV Mountain Carbon frame with Stranglehold dropouts, a Bontrager Haru Pro rigid carbon fork with a carbon steerer, a SRAM GX Eagle 1x12 drivetrain with an extra-wide gear range, SRAM Guide RS hydraulic disc brakes, and Tubeless Ready Bontrager Wampa carbon wheels with a 108-tooth Rapid Drive rear hub for instant engagement paired with 27.5x4.5 Bontrager Barbegazi TLR tires. Plus, a Bontrager Line dropper post and a carbon handlebar. Farley 9.8 is the lightest fat bike we make. It has an OCLV Mountain Carbon frame, a carbon fork, carbon wheels, and a 1x12 SRAM GX Eagle drivetrain with the widest range of gears for varying terrain. This is a mountain bike with no compromises, and it\'s all about going as fast as possible in every season.\n\n', '[\"https://bit.ly/3064zw7\", \"https://bit.ly/2J7YrOr\"]', '{\"size\": \"M\", \"type\": \"Mountain\", \"color\": \"Rage Red\"}'),
(13, 'Marlin 5 - Trek', 54999, 'https://bit.ly/30lINEC', 'Marlin 5 is a trail worthy daily rider that\'s perfectly suited for everyday adventures, on and off the trail. A front suspension fork with 100mm of travel, 21 speeds, and mounts for a rack and kickstand make it an ideal choice for new trail riders or anyone looking for a comfortable, stable commuter with the ruggedness of a real mountain bike. ', 'A lightweight Alpha Silver Aluminum frame with internal routing to protect your cables and add to the bike\'s sleek look, 21 speeds, a wide range of gearing so you always have the right gear for your terrain, hydraulic disc brakes that feel smoother than mechanical disc brakes, and a suspension fork with 100mm of travel that\'s the same amount favored by most cross country racers. \nMarlin 5 is a trail worthy daily rider that\'s perfectly suited for everyday adventures, on and off the trail. A front suspension fork with 100mm of travel, 21 speeds, and mounts for a rack and kickstand make it an ideal choice for new trail riders or anyone looking for a comfortable, stable commuter with the ruggedness of a real mountain bike. \n', '[\"https://bit.ly/30lINEC\", \"https://bit.ly/2FZwkyV\"]', '{\"size\": \"L\", \"type\": \"Road\", \"color\": \"Teal\"}'),
(16, 'Top Fuel 9.9 - Trek', 899999, 'https://bit.ly/2JttCm9', 'Top Fuel 9.9 is our top of the line full suspension mountain bike for endurance racers and multi discipline riders. This down country rig is built with an OCLV Mountain Carbon frame and spec\'d to the hilt with high performance parts, including a Fox Factory 34 Step Cast fork, a SRAM XX1 Eagle drivetrain, carbon wheels, and SRAM Level Ultimate brakes. Top Fuel 9.9 flies through singletrack and rips descents, but it really shines when pushed to its full potential during grueling endurance races.', 'You\'ve set your sights on endurance racing, and want every lightweight and performance advantage. You\'re looking for an efficient yet trail capable rig that\'s fast on flats, soaks up rough terrain, and keeps you going mile after brutal mile.Marlin 5 is a trail-worthy daily rider that\'s perfectly suited for everyday adventures, on and off the trail. A front suspension fork with 100mm of travel, 21 speeds, and mounts for a rack and kickstand make it an ideal choice for new trail riders or anyone looking for a comfortable, stable commuter with the ruggedness of a real mountain bike. \nA full OCLV Mountain Carbon frame, top of the line 120mm Fox Factory 34 Step-Cast Float fork with FIT4 damper, 115mm of rear travel with a Fox Factory Float shock, and a 1x12 SRAM XX1 Eagle drivetrain. Plus, wide carbon Bontrager Kovee Elite 30 wheels with a 108-tooth Rapid Drive hub for instant engagement, TwistLoc dual remote suspension lockout, Bontrager Line Elite Dropper, Bontrager Kovee Pro OCLV Carbon handlebars, and SRAM Level Ultimate brakes with carbon levers. \nThe Top Fuel 9.9 is built for speed and capability on any terrain, but its efficient, short-travel design excels in endurance events. An OCLV Mountain Carbon frame, top of the \nline suspension, and carbon components come together for a nimble and insanely fun ride at any distance.', '[\"https://bit.ly/2JttCm9\", \"https://bit.ly/2xCfv8E\"]', '{\"size\": \"M\", \"type\": \"Road\", \"color\": \"Black To Teal Fade\"}'),
(17, 'Remedy 9.7 - Trek', 449999, 'https://bit.ly/2FXPEMS', 'Remedy 9.7 brings the ride quality of a full OCLV Mountain Carbon frame to our all mountain family. A premium long travel 160mm RockShox fork, 150mm rear suspension, dropper post, and a SRAM 12 speed drivetrain make Remedy 9.7 a high end full carbon mountain bike that\'s built to get rowdy but doesn\'t come with the sticker shock of most carbon trail bikes.\n\n', 'You want the performance of carbon in a trail shredding package. You love the quick handling of 27.5in wheels and the plush ride of a long travel bike, and want a durable parts group and a strong, light OCLV Mountain Carbon frame to handle whatever the trail can dish out.\n\nA lightweight, full OCLV Mountain Carbon frame, a 160mm RockShox Lyrik Select Plus fork with a plush DebonAir spring and Charger 2 RC damper that gives you more adjustment and control, and 150mm rear travel with an ultra responsive REaktiv shock. Plus, a mixed SRAM NX and GX 12 speed drivetrain, SRAM Guide R four piston hydraulic disc brakes for more stopping power, a Bontrager Line Dropper, and Bontrager Line Comp 30 wheels with a 54 tooth Rapid Drive hub for fast engagement.\n\nA stiff full carbon frame that\'s built for rugged riding and gnarly trails, with great suspension and a solid, dependable parts group. It shreds right out of the box, but it\'s also the perfect platform for upgrades down the line should you ever want to customize your trail ride.\n\n', '[\"https://bit.ly/2FXPEMS\", \"https://bit.ly/2XvUg2P\"]', '{\"size\": \"S\", \"type\": \"Road\", \"color\": \"Teal to Volt Fade\"}'),
(18, 'Crockett 5 Disc - Trek', 239999, 'https://bit.ly/2RZ2wXQ', 'Crockett 5 Disc is the perfect high value cyclocross companion. It\'s designed with cross specific details, like a 1x11 drivetrain and a lightweight frame that\'s easy to carry over barriers, but it\'s so much more than just a cyclocross bike. The advanced alloy frame looks and handles like carbon, and it\'s equally at home on gravel and your morning commute as it is on the cross course.', 'You\'re rolling into the cyclocross scene and looking for a ride that\'s everything you need and nothing you don\'t. Or, you\'re looking for a great all around bike with road style bars that\'s perfectly suited for everything from cyclocross races and gravel roads to commutes and rail trails.\nA lightweight and strong 300 Series Alpha Aluminum frame with shaped tubes, Invisible Weld Technology, extra tire clearance, 12mm thru axles, an IsoSpeed Cross full carbon fork, powerful flat mount hydraulic disc brakes, and the simplicity of a 1x11 drivetrain with SRAM Rival shifter and derailleur. \nCrockett 5 Disc is a race ready cyclocross bike with an advanced alloy frame, but it\'s a lot more than that, too. Whether you\'re gearing for a cyclocross season or want a versatile bike that stands up to the rigors of the burliest gravel roads and commutes, Crockett truly does it all.\nMarlin 5 is a trail-worthy daily rider that\'s perfectly suited for everyday adventures, on and off the trail. A front suspension fork with 100mm of travel, 21 speeds, and mounts for a rack and kickstand make it an ideal choice for new trail riders or anyone looking for a comfortable, stable commuter with the ruggedness of a real mountain bike. \n', '[\"https://bit.ly/2RZ2wXQ\", \"https://bit.ly/2XOdc0Z\"]', '{\"size\": \"L\", \"type\": \"Road\", \"color\": \"Magenta\"}'),
(19, 'Roscoe 8 - Trek', 178999, 'https://bit.ly/2XwgpOD', 'Roscoe 8 is a trail hardtail for anyone looking to have some serious fun out in the dirt. Its 27.5 mid fat tires, a wide range 1x12 drivetrain, and 120mm suspension fork make it a blast on every trail, from packed singletrack to the loose stuff. It\'s a laid back trail mountain bike dressed in a high quality spec that\'s ready to party.', 'You want to have fun. You\'re searching for a playful trail bike with high quality parts and plus sized tires so that when you\'re out on the trail, the only thing you have to worry about is your face hurting from smiling too much.\nRoscoe 8 features a strong Alpha Gold Aluminum frame with internal routing for cable protection and a clean look, confidence inspiring 27.5n tires mounted to Tubeless Ready Bontrager Line rims, and a 120mm RockShox 35 Gold fork with Motion Control damper and lockout. Plus, a dropper post, a SRAM NX Eagle 1x12 drivetrain, and Shimano hydraulic disc brakes.\nHigh quality components for high quality trail days. It\'s all about fun, but it\'s also all about performance. With a 12 speed drivetrain, hydraulic disc brakes, wide handlebars, and 27.5in wheels, this bike takes trail riding shenanigans seriously.\nA full OCLV Mountain Carbon frame, top of the line 120mm Fox Factory 34 Step-Cast Float fork with FIT4 damper, 115mm of rear travel with a Fox Factory Float shock, and a 1x12 SRAM XX1 Eagle drivetrain. Plus, wide carbon Bontrager Kovee Elite 30 wheels with a 108 tooth Rapid Drive hub for instant engagement, TwistLoc dual remote suspension lockout, Bontrager Line Elite Dropper, Bontrager Kovee Pro OCLV Carbon handlebars, and SRAM Level Ultimate brakes with carbon levers. \nThe Top Fuel 9.9 is built for speed and capability on any terrain, but its efficient, short travel design excels in endurance events. An OCLV Mountain Carbon frame, top of the \nline suspension, and carbon components come together for a nimble and insanely fun ride at any distance.', '[\"https://bit.ly/2XwgpOD\", \"https://bit.ly/2xxzkh9\"]', '{\"size\": \"M\", \"type\": \"Road\", \"color\": \"Black/Red/Marigold Fade\"}'),
(20, 'Remedy 9.8 - Trek', 549999, 'https://bit.ly/2Xv3VLP', 'Remedy 9.8 is a high end long travel trail bike built for getting rowdy on the most technical mountain bike trails. It offers the versatility and capability to take on everything from epic singletrack to serious air. A stiff OCLV Mountain Carbon frame, carbon wheels, RockShox suspension featuring Trek\'s exclusive RE:aktiv with Thru Shaft, and a 1x12 SRAM GX Eagle drivetrain are perfect for your wildest all mountain adventures.', 'You\'re an all mountain junkie who lives for the fun only a long travel trail bike can deliver. You love carving descents and throwing down style on new lines. You\'re a ride or die kind of mountain biker, and want a bike you can handle not one that handles you.\nA lightweight OCLV Mountain Carbon frame that\'s feathery on the climbs yet stiff and sure footed on the descents, Bontrager Line Carbon 30 wheels with a 54 tooth Rapid Drive rear hub for fast engagement, a SRAM GX Eagle 1x12 drivetrain, RockShox 160mm Lyrik RCT3 fork, and a RockShox Deluxe RT3 RE:aktiv with Thru Shaft shock that responds faster than any other shock on the market.\nRemedy 9.8 is a capable carbon long travel bike that\'s light enough to stay quick on the climbs. It\'s the perfect all around trail bike for riders who seek out big, technical trails and want a quick, capable all mountain bike that can handle them.\nA lightweight OCLV Mountain Carbon frame that\'s feathery on the climbs yet stiff and sure footed on the descents, Bontrager Line Carbon 30 wheels with a 54 tooth Rapid Drive rear hub for fast engagement, a SRAM GX Eagle 1x12 drivetrain, RockShox 160mm Lyrik RCT3 fork, and a RockShox Deluxe RT3 RE:aktiv with Thru Shaft shock that responds faster than any other shock on the market.\nRemedy 9.8 is a capable carbon long travel bike that\'s light enough to stay quick on the climbs. It\'s the perfect all around trail bike for riders who seek out big, technical trails and want a quick, capable all mountain bike that can handle them.\n', '[\"https://bit.ly/2Xv3VLP\", \"https://bit.ly/32daCki\"]', '{\"size\": \"L\", \"type\": \"Mountain\", \"color\": \"Miami Green\"}'),
(21, 'X -Caliber 8 - Trek', 119999, 'https://bit.ly/2XxGb4W', 'X Caliber 8 is a cross country mountain bike made for fast laps and long days on the trail. It\'s built with special attention to value and the parts that make the biggest difference in performance. A Shimano drivetrain, RockShox fork, and hydraulic disc brakes make it a great choice for new mountain bikers and XC racers searching for fast, fun, singletrack adventure.\n', 'You\'re looking for a fast mountain bike for singletrack one that\'s fully capable of taking on races, marathons, and competitive group rides. You want something that is reliable and fun with dependable, lightweight parts.\nA lightweight Alpha Gold Aluminum frame, a RockShox 30 Silver suspension fork with a lockout and an air spring that\'s lighter and more adjustable than a coil spring, Bontrager Kovee Tubeless Ready wheels with Boost141 hub spacing, and a smooth, efficient Shimano DeoreXT 2x10 drivetrain with a Shimano XT Shadow rear derailleur, which stays tucked out of the way to avoid snagging on trail debris.\nWith X Caliber 8, you\'re getting a performance frame paired with performance parts, like a RockShox air fork and a rear derailleur that\'s the gold standard for MTB performance and reliability. Plus, it\'s equipped with durable, lightweight alloy rims that save weight and are easy to upgrade to tubeless.\n', '[\"https://bit.ly/2XxGb4W\", \"https://bit.ly/2L4K9QE\"]', '{\"size\": \"S\", \"type\": \"Mountain\", \"color\": \"Cardinal\"}'),
(22, 'Slash 8 - Trek', 367999, 'https://bit.ly/2FWWeU4', 'Slash 8 is an aluminum enduro mountain bike with fast rolling 29er wheels, a 160mm RockShox fork, and Trek\'s exclusive RE:aktiv with Thru Shaft shock. Smart spec, high end suspension, and the burly Alpha Aluminum frame make Slash 8 a high value ride for enduro racers and all around trail rippers who want to rail sketchy descents faster than anyone else in their crew.', 'You\'re a mountain biker\'s mountain biker, and you want a big bike with big wheels to roll over big things that get between you and the next big hit. This bike is both fully capable of handling enduro races, and a whole lot of fun on rowdy trails.\nA trail tough Alpha Platinum Aluminum frame, a 160mm RockShox Yari RC fork, and 150mm of rear travel with a RockShox Deluxe shock with Trek\'s ultra responsive RE:aktiv with Thru Shaft damper. Plus, a SRAM GX Eagle 1x12 drivetrain, a Bontrager Line dropper post, and Bontrager Line Comp 30 wheels with a 54 tooth Rapid Drive rear hub for fast engagement.\nSlash 8 puts serious enduro performance within reach with smart choices on spec that won\'t empty your wallet. The Alpha Aluminum frame, burly suspension, and 1x12 Eagle drivetrain makes for a ride that\'s equally at home on the race course and on a big, backwoods session.\n', '[\"https://bit.ly/2FWWeU4\", \"https://bit.ly/2JituH8\"]', '{\"size\": \"M\", \"type\": \"Mountain\", \"color\": \"Miami to Volt Fade\"}'),
(25, 'Yukon2 - Giant', 163000, 'https://bit.ly/2NHC3zy', 'The incredible capability of the Yukon series will keep you conquering and grinning in all conditions. This feature packed design offers a modern trail bike experience coupled with maximum control and floatation over the most ridiculous of surfaces. Its lightweight SL Grade frame tube set and Advanced Composite grade fork featuring wide axle spacing and a PressFit 121 bottom bracket, makes this modern fat bike agile and versatile. ', 'Experience the  foot out, flat out  fun of fat bike riding in any season. Whether you are tackling fresh snow pack or drifty sand dunes for days, the new yukon will keep you rallying your favorite terrain in a whole new way. Sloping  low slung  front triangle design provides a low center of gravity for technical maneuvering with ease or countersink control in deep conditions. With a heavily swaged rear triangle including dropouts, seatstays and chainstays, this versatile design allows even warmest of riding boots to be worn, while the narrow Q Factor crank specification provides a more natural feeling cycling experience. The horizontal adjustable drop out system allows for 15mm rear center length adjustment and tire sizing up for maximum floatation and a fun, playful ride.\n', '[\"https://bit.ly/2NHC3zy\"]', '{\"size\": \"M\", \"type\": \"Fat Bike\", \"color\": \"Charcoal\"}'),
(26, 'Roadmachine X - BMC\n', 229900, 'https://bit.ly/30pPHJj', 'Featuring a triple butted, hydroformed frame mated to a carbon flat mount fork, the Roadmachine X is no stranger to responsive handling and great power transfer. It combines these characteristics with wide, low tread 34mm tires, for a bike that smooths out the rough stuff but also is prepared to go the distance. A 1x11 drivetrain in the form of SRAM Rival means you won\'t run out of gearing, and the Rival hydraulic disc brakes are ready with excellent stopping power when you need it. Mavic Allroad Disc wheels round out this incredible build that\'s so much more capable than just a road bike.', 'The Roadmachine X is your new all road companion for ventures into unknown territory. A confident and lightweight all rounder that is at home on endless adventure rides, scenic b road commutes, and light duty touring. The Roadmachine X delivers performance and functionality in a minimal package that renders it a fine demonstration of Swiss design. For tackling long hours of back roads with confidence, this bike is engineered with TCC Endurance, BMCs dedicated compliance technology. The utility of its 1x drivetrain and all road wheelset pair with capable geometry and integrated fender and rack mounts to ensure you can always take the long route home. Every ride begins with a road, let yours begin here and who knows where it could take you. The Roadmachine X is ready for it all.', '[\"https://bit.ly/30pPHJj\"]', '{\"size\": \"L\", \"type\": \"Urban\", \"color\": \"Stealth\"}'),
(27, 'AR FRD - Felt\r\n', 1419900, 'https://bit.ly/2NOeYLw', 'Felt Aero Road UHC Ultimate + TeXtreme carbon fiber, MMC with InsideOut construction, carbon fiber dropouts, 7075 CNC aluminum replaceable rear derailleur hanger, internal electronic specific cable routing', 'The AR FRD is the best performing aero road bike in the world, having delivered countess wins in road races and criteriums at the professional level. Developed using CFD software and perfected in the wind tunnel, this aero road bike is up to 31% faster than typical round tube road frames. With a Felt UHC Ultimate + TeXtreme carbon fiber frame, a Shimano Dura Ace Di2 drivetrain and top of the line Zipp 404 NSW carbon wheels, the AR FRD is a no holds barred speed machine, ready to deliver you to the top step of the podium.', '[\"https://bit.ly/2NOeYLw\"]', '{\"size\": \"M\", \"type\": \"Road\", \"color\": \"White\"}');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD UNIQUE KEY `id` (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=362;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
