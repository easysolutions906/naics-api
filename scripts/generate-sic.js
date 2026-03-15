#!/usr/bin/env node

/**
 * Generates the complete SIC code list as JSON.
 * Run: node scripts/generate-sic.js
 */

import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'src', 'data', 'sic.json');

// SIC codes — Standard Industrial Classification (1987 revision)
// Division > Major Group (2-digit) > Industry Group (3-digit) > Industry (4-digit)
const raw = `01|Agricultural Production-Crops
011|Cash Grains
0111|Wheat
0112|Rice
0115|Corn
0116|Soybeans
0119|Cash Grains, Not Elsewhere Classified
012|Field Crops, Except Cash Grains
0121|Tobacco
0131|Cotton
0132|Tobacco
0133|Sugarcane and Sugar Beets
0134|Irish Potatoes
0139|Field Crops, Except Cash Grains, NEC
013|Field Crops, Except Cash Grains
016|Vegetables and Melons
0161|Vegetables and Melons
017|Fruits and Tree Nuts
0171|Berry Crops
0172|Grapes
0173|Tree Nuts
0174|Citrus Fruits
0175|Deciduous Tree Fruits
0179|Fruits and Tree Nuts, NEC
018|Horticultural Specialties
0181|Ornamental Floriculture and Nursery Products
0182|Food Crops Grown Under Cover
019|General Farms, Primarily Crop
0191|General Farms, Primarily Crop
02|Agricultural Production-Livestock and Animal Specialties
021|Livestock, Except Dairy and Poultry
0211|Beef Cattle Feedlots
0212|Beef Cattle, Except Feedlots
0213|Hogs
0214|Sheep and Goats
0219|General Livestock, Except Dairy and Poultry
024|Dairy Farms
0241|Dairy Farms
025|Poultry and Eggs
0251|Broiler, Fryer, and Roaster Chickens
0252|Chicken Eggs
0253|Turkeys and Turkey Eggs
0254|Poultry Hatcheries
0259|Poultry and Eggs, NEC
027|Animal Specialties
0271|Fur-Bearing Animals and Rabbits
0272|Horses and Other Equines
0273|Animal Aquaculture
0279|Animal Specialties, NEC
029|General Farms, Primarily Livestock and Animal Specialties
0291|General Farms, Primarily Livestock and Animal Specialties
07|Agricultural Services
071|Soil Preparation Services
0711|Soil Preparation Services
072|Crop Services
0721|Crop Planting, Cultivating, and Protecting
0722|Crop Harvesting, Primarily by Machine
0723|Crop Preparation Services for Market, Except Cotton Ginning
0724|Cotton Ginning
074|Veterinary Services
0741|Veterinary Services for Livestock
0742|Veterinary Services for Animal Specialties
075|Animal Services, Except Veterinary
0751|Livestock Services, Except Veterinary
0752|Animal Specialty Services, Except Veterinary
076|Farm Labor Management Services
0761|Farm Labor Contractors and Crew Leaders
0762|Farm Management Services
078|Landscape and Horticultural Services
0781|Landscape Counseling and Planning
0782|Lawn and Garden Services
0783|Ornamental Shrub and Tree Services
08|Forestry
081|Timber Tracts
0811|Timber Tracts
083|Forest Nurseries and Gathering of Forest Products
0831|Forest Nurseries and Gathering of Forest Products
085|Forestry Services
0851|Forestry Services
09|Fishing, Hunting, and Trapping
091|Commercial Fishing
0912|Finfish
0913|Shellfish
0919|Miscellaneous Marine Products
092|Fish Hatcheries and Preserves
0921|Fish Hatcheries and Preserves
097|Hunting and Trapping, and Game Propagation
0971|Hunting, Trapping, and Game Propagation
10|Metal Mining
101|Iron Ores
1011|Iron Ores
102|Copper Ores
1021|Copper Ores
103|Lead and Zinc Ores
1031|Lead and Zinc Ores
104|Gold and Silver Ores
1041|Gold Ores
1044|Silver Ores
106|Ferroalloy Ores, Except Vanadium
1061|Ferroalloy Ores, Except Vanadium
108|Metal Mining Services
1081|Metal Mining Services
109|Miscellaneous Metal Ores
1094|Uranium-Radium-Vanadium Ores
1099|Miscellaneous Metal Ores, NEC
12|Coal Mining
121|Bituminous Coal and Lignite Mining
1221|Bituminous Coal and Lignite Surface Mining
1222|Bituminous Coal Underground Mining
122|Bituminous Coal and Lignite Mining
123|Anthracite Mining
1231|Anthracite Mining
124|Coal Mining Services
1241|Coal Mining Services
13|Oil and Gas Extraction
131|Crude Petroleum and Natural Gas
1311|Crude Petroleum and Natural Gas
132|Natural Gas Liquids
1321|Natural Gas Liquids
138|Oil and Gas Field Services
1381|Drilling Oil and Gas Wells
1382|Oil and Gas Field Services, NEC
1389|Services Allied With Oil and Gas Extraction, NEC
14|Mining and Quarrying of Nonmetallic Minerals, Except Fuels
141|Dimension Stone
1411|Dimension Stone
142|Crushed and Broken Stone, Including Riprap
1422|Crushed and Broken Limestone
1423|Crushed and Broken Granite
1429|Crushed and Broken Stone, NEC
144|Sand and Gravel
1442|Construction Sand and Gravel
1446|Industrial Sand
145|Clay, Ceramic, and Refractory Minerals
1455|Kaolin and Ball Clay
1459|Clay, Ceramic, and Refractory Minerals, NEC
147|Chemical and Fertilizer Mineral Mining
1474|Potash, Soda, and Borate Minerals
1475|Phosphate Rock
1479|Chemical and Fertilizer Mineral Mining, NEC
148|Nonmetallic Minerals Services, Except Fuels
1481|Nonmetallic Minerals Services, Except Fuels
149|Miscellaneous Nonmetallic Minerals, Except Fuels
1499|Miscellaneous Nonmetallic Minerals, Except Fuels
15|Building Construction-General Contractors and Operative Builders
152|General Building Contractors-Residential Buildings
1521|General Contractors-Single-Family Houses
1522|General Contractors-Residential Buildings, Other Than Single-Family
153|Operative Builders
1531|Operative Builders
154|General Building Contractors-Nonresidential Buildings
1541|General Contractors-Industrial Buildings and Warehouses
1542|General Contractors-Nonresidential Buildings, Other Than Industrial Buildings and Warehouses
16|Heavy Construction Other Than Building Construction-Contractors
161|Highway and Street Construction, Except Elevated Highways
1611|Highway and Street Construction, Except Elevated Highways
162|Heavy Construction, Except Highway and Street Construction
1622|Bridge, Tunnel, and Elevated Highway Construction
1623|Water, Sewer, Pipeline, and Communications and Power Line Construction
1629|Heavy Construction, NEC
17|Construction-Special Trade Contractors
171|Plumbing, Heating and Air-Conditioning
1711|Plumbing, Heating and Air-Conditioning
172|Painting and Paper Hanging
1721|Painting and Paper Hanging
173|Electrical Work
1731|Electrical Work
174|Masonry, Stonework, Tile Setting, and Plastering
1741|Masonry, Stone Setting, and Other Stonework
1742|Plastering, Drywall, Acoustical, and Insulation Work
1743|Terrazzo, Tile, Marble, and Mosaic Work
175|Carpentry and Floor Work
1751|Carpentry Work
1752|Floor Laying and Other Floor Work, NEC
176|Roofing, Siding, and Sheet Metal Work
1761|Roofing, Siding, and Sheet Metal Work
177|Concrete Work
1771|Concrete Work
178|Water Well Drilling
1781|Water Well Drilling
179|Miscellaneous Special Trade Contractors
1791|Structural Steel Erection
1793|Glass and Glazing Work
1794|Excavation Work
1795|Wrecking and Demolition Work
1796|Installation or Erection of Building Equipment, NEC
1799|Special Trade Contractors, NEC
20|Food and Kindred Products
201|Meat Products
2011|Meat Packing Plants
2013|Sausages and Other Prepared Meats
2015|Poultry Slaughtering and Processing
202|Dairy Products
2021|Creamery Butter
2022|Natural, Processed, and Imitation Cheese
2023|Dry, Condensed, and Evaporated Dairy Products
2024|Ice Cream and Frozen Desserts
2026|Fluid Milk
203|Canned, Frozen, and Preserved Fruits, Vegetables, and Food Specialties
2032|Canned Specialties
2033|Canned Fruits, Vegetables, Preserves, Jams, and Jellies
2034|Dried and Dehydrated Fruits, Vegetables, and Soup Mixes
2035|Pickled Fruits and Vegetables, Vegetable Sauces and Seasonings, and Salad Dressings
2037|Frozen Fruits, Fruit Juices, and Vegetables
2038|Frozen Specialties, NEC
204|Grain Mill Products
2041|Flour and Other Grain Mill Products
2043|Cereal Breakfast Foods
2044|Rice Milling
2045|Prepared Flour Mixes and Doughs
2046|Wet Corn Milling
2047|Dog and Cat Food
2048|Prepared Feeds and Feed Ingredients for Animals and Fowls, Except Dogs and Cats
205|Bakery Products
2051|Bread and Other Bakery Products, Except Cookies and Crackers
2052|Cookies and Crackers
2053|Frozen Bakery Products, Except Bread
206|Sugar and Confectionery Products
2061|Cane Sugar, Except Refining
2062|Cane Sugar Refining
2063|Beet Sugar
2064|Candy and Other Confectionery Products
2066|Chocolate and Cocoa Products
2067|Chewing Gum
2068|Salted and Roasted Nuts and Seeds
207|Fats and Oils
2074|Cottonseed Oil Mills
2075|Soybean Oil Mills
2076|Vegetable Oil Mills, Except Corn, Cottonseed, and Soybean
2077|Animal and Marine Fats and Oils
2079|Shortening, Table Oils, Margarine, and Other Edible Fats and Oils, NEC
208|Beverages
2082|Malt Beverages
2083|Malt
2084|Wines, Brandy, and Brandy Spirits
2085|Distilled and Blended Liquors
2086|Bottled and Canned Soft Drinks and Carbonated Waters
2087|Flavoring Extracts and Flavoring Syrups, NEC
209|Miscellaneous Food Preparations and Kindred Products
2091|Canned and Cured Fish and Seafoods
2092|Prepared Fresh or Frozen Fish and Seafoods
2095|Roasted Coffee
2096|Potato Chips, Corn Chips, and Similar Snacks
2097|Manufactured Ice
2098|Macaroni, Spaghetti, Vermicelli, and Noodles
2099|Food Preparations, NEC
21|Tobacco Products
211|Cigarettes
2111|Cigarettes
212|Cigars
2121|Cigars
213|Chewing and Smoking Tobacco and Snuff
2131|Chewing and Smoking Tobacco and Snuff
214|Tobacco Stemming and Redrying
2141|Tobacco Stemming and Redrying
22|Textile Mill Products
221|Broadwoven Fabric Mills, Cotton
2211|Broadwoven Fabric Mills, Cotton
222|Broadwoven Fabric Mills, Manmade Fiber and Silk
2221|Broadwoven Fabric Mills, Manmade Fiber and Silk
223|Broadwoven Fabric Mills, Wool
2231|Broadwoven Fabric Mills, Wool (Including Dyeing and Finishing)
224|Narrow Fabric and Other Smallwares Mills
2241|Narrow Fabric and Other Smallwares Mills: Cotton, Wool, Silk, and Manmade Fiber
225|Knitting Mills
2251|Women's Full-Length and Knee-Length Hosiery, Except Socks
2252|Hosiery, NEC
2253|Knit Outerwear Mills
2254|Knit Underwear and Nightwear Mills
2257|Weft Knit Fabric Mills
2258|Lace and Warp Knit Fabric Mills
2259|Knitting Mills, NEC
226|Dyeing and Finishing Textiles, Except Wool Fabrics and Knit Goods
2261|Finishers of Broadwoven Fabrics of Cotton
2262|Finishers of Broadwoven Fabrics of Manmade Fiber and Silk
2269|Finishers of Textiles, NEC
227|Carpets and Rugs
2271|Carpets and Rugs
228|Yarn and Thread Mills
2281|Yarn Throwing and Winding Mills
2282|Yarn Texturizing, Throwing, Twisting, and Winding Mills
2284|Thread Mills
229|Miscellaneous Textile Goods
2295|Coated Fabrics, Not Rubberized
2296|Tire Cord and Fabrics
2297|Nonwoven Fabrics
2298|Cordage and Twine
2299|Textile Goods, NEC
23|Apparel and Other Finished Products Made from Fabrics and Similar Materials
231|Men's and Boys' Suits, Coats, and Overcoats
2311|Men's and Boys' Suits, Coats, and Overcoats
232|Men's and Boys' Furnishings, Work Clothing, and Allied Garments
2321|Men's and Boys' Shirts, Except Work Shirts
2322|Men's and Boys' Underwear and Nightwear
2323|Men's and Boys' Neckwear
2325|Trousers, Work Clothing, and Allied Garments
2326|Men's and Boys' Work Clothing
233|Women's, Misses', and Juniors' Outerwear
2331|Women's, Misses', and Juniors' Blouses and Shirts
2335|Women's, Misses', and Juniors' Dresses
2337|Women's, Misses', and Juniors' Suits, Skirts, and Coats
2339|Women's, Misses', and Juniors' Outerwear, NEC
234|Women's, Misses', Children's, and Infants' Undergarments
2341|Women's, Misses', Children's, and Infants' Underwear and Nightwear
2342|Corsets, Girdles, Garments, and Allied Garments
235|Hats, Caps, and Millinery
2353|Hats, Caps, and Millinery
236|Girls', Children's, and Infants' Outerwear
2361|Girls', Children's, and Infants' Dresses, Blouses, and Shirts
2369|Girls', Children's, and Infants' Outerwear, NEC
237|Fur Goods
2371|Fur Goods
238|Miscellaneous Apparel and Accessories
2381|Dress and Work Gloves, Except Knit and All-Leather
2384|Robes and Dressing Gowns
2385|Waterproof Outerwear
2386|Leather and Sheep-Lined Clothing
2387|Apparel Belts
2389|Apparel and Accessories, NEC
239|Miscellaneous Fabricated Textile Products
2391|Curtains and Draperies
2392|Housefurnishings, Except Curtains and Draperies
2393|Textile Bags
2394|Canvas and Related Products
2395|Pleating, Decorative and Novelty Stitching, and Tucking for the Trade
2396|Automotive Trimmings, Apparel Findings, and Related Products
2397|Schiffli Machine Embroideries
2399|Fabricated Textile Products, NEC
24|Lumber and Wood Products, Except Furniture
241|Logging
2411|Logging
242|Sawmills and Planing Mills
2421|Sawmills and Planing Mills, General
2426|Hardwood Dimension and Flooring Mills
2429|Special Product Sawmills, NEC
243|Millwork, Veneer, Plywood, and Structural Wood Members
2431|Millwork
2434|Wood Kitchen Cabinets
2435|Hardwood Veneer and Plywood
2436|Softwood Veneer and Plywood
2439|Structural Wood Members, NEC
244|Wood Containers
2441|Nailed and Lock Corner Wood Boxes and Shook
2448|Wood Pallets and Skids
2449|Wood Containers, NEC
245|Wood Buildings and Mobile Homes
2451|Mobile Homes
2452|Prefabricated Wood Buildings and Components
249|Miscellaneous Wood Products
2491|Wood Preserving
2493|Reconstituted Wood Products
2499|Wood Products, NEC
25|Furniture and Fixtures
251|Household Furniture
2511|Wood Household Furniture, Except Upholstered
2512|Wood Household Furniture, Upholstered
2514|Metal Household Furniture
2515|Mattresses, Foundations, and Convertible Beds
2517|Wood Television, Radio, Phonograph, and Sewing Machine Cabinets
2519|Household Furniture, NEC
252|Office Furniture
2521|Wood Office Furniture
2522|Office Furniture, Except Wood
253|Public Building and Related Furniture
2531|Public Building and Related Furniture
254|Partitions, Shelving, Lockers, and Office and Store Fixtures
2541|Wood Office and Store Fixtures, Partitions, Shelving, and Lockers
2542|Office and Store Fixtures, Partitions, Shelving, and Lockers, Except Wood
259|Miscellaneous Furniture and Fixtures
2591|Drapery Hardware and Window Blinds and Shades
2599|Furniture and Fixtures, NEC
26|Paper and Allied Products
261|Pulp Mills
2611|Pulp Mills
262|Paper Mills
2621|Paper Mills
263|Paperboard Mills
2631|Paperboard Mills
265|Paperboard Containers and Boxes
2652|Setup Paperboard Boxes
2653|Corrugated and Solid Fiber Boxes
2655|Fiber Cans, Tubes, Drums, and Similar Products
2656|Sanitary Food Containers, Except Folding
2657|Folding Paperboard Boxes, Including Sanitary
267|Converted Paper and Paperboard Products, Except Containers and Boxes
2671|Packaging Paper and Plastics Film, Coated and Laminated
2672|Coated and Laminated Paper, NEC
2673|Plastics, Foil, and Coated Paper Bags
2674|Uncoated Paper and Multiwall Bags
2675|Die-Cut Paper and Paperboard and Cardboard
2676|Sanitary Paper Products
2677|Envelopes
2678|Stationery, Tablets, and Related Products
2679|Converted Paper and Paperboard Products, NEC
27|Printing, Publishing, and Allied Industries
271|Newspapers: Publishing, or Publishing and Printing
2711|Newspapers: Publishing, or Publishing and Printing
272|Periodicals: Publishing, or Publishing and Printing
2721|Periodicals: Publishing, or Publishing and Printing
273|Books
2731|Books: Publishing, or Publishing and Printing
2732|Book Printing
274|Miscellaneous Publishing
2741|Miscellaneous Publishing
275|Commercial Printing
2752|Commercial Printing, Lithographic
2754|Commercial Printing, Gravure
2759|Commercial Printing, NEC
276|Manifold Business Forms
2761|Manifold Business Forms
277|Greeting Cards
2771|Greeting Cards
278|Blankbooks, Looseleaf Binders, and Devices
2782|Blankbooks, Looseleaf Binders and Devices
2789|Bookbinding and Related Work
279|Service Industries for the Printing Trade
2791|Typesetting
2796|Platemaking and Related Services
28|Chemicals and Allied Products
281|Industrial Chemicals and Synthetics
2812|Alkalies and Chlorine
2813|Industrial Gases
2816|Inorganic Pigments
2819|Industrial Inorganic Chemicals, NEC
282|Plastics Materials and Synthetic Resins, Synthetic Rubber, Cellulosic and Other Manmade Fibers, Except Glass
2821|Plastics Materials, Synthetic Resins, and Nonvulcanizable Elastomers
2822|Synthetic Rubber (Vulcanizable Elastomers)
2823|Cellulosic Manmade Fibers
2824|Manmade Organic Fibers, Except Cellulosic
283|Drugs
2833|Pharmaceutical Preparations
2834|Pharmaceutical Preparations
2835|In Vitro and In Vivo Diagnostic Substances
2836|Biological Products, Except Diagnostic Substances
284|Soap, Detergents, and Cleaning Preparations; Perfumes, Cosmetics, and Other Toilet Preparations
2841|Soap and Other Detergents, Except Specialty Cleaners
2842|Specialty Cleaning, Polishing, and Sanitation Preparations
2843|Surface Active Agents, Finishing Agents, Sulfonated Oils, and Assistants
2844|Perfumes, Cosmetics, and Other Toilet Preparations
285|Paints, Varnishes, Lacquers, Enamels, and Allied Products
2851|Paints, Varnishes, Lacquers, Enamels, and Allied Products
286|Industrial Chemicals
2861|Gum and Wood Chemicals
2865|Cyclic Organic Crudes, and Cyclic Intermediates, Dyes, and Organic Pigments
2869|Industrial Organic Chemicals, NEC
287|Agricultural Chemicals
2873|Nitrogenous Fertilizers
2874|Phosphatic Fertilizers
2875|Fertilizers, Mixing Only
2879|Pesticides and Agricultural Chemicals, NEC
289|Miscellaneous Chemical Products
2891|Adhesives and Sealants
2892|Explosives
2893|Printing Ink
2895|Carbon Black
2899|Chemicals and Chemical Preparations, NEC
29|Petroleum Refining and Related Industries
291|Petroleum Refining
2911|Petroleum Refining
295|Asphalt Paving and Roofing Materials
2951|Asphalt Paving Mixtures and Blocks
2952|Asphalt Felts and Coatings
299|Miscellaneous Products of Petroleum and Coal
2992|Lubricating Oils and Greases
2999|Products of Petroleum and Coal, NEC
30|Rubber and Miscellaneous Plastics Products
301|Tires and Inner Tubes
3011|Tires and Inner Tubes
302|Rubber and Plastics Footwear
3021|Rubber and Plastics Footwear
305|Gaskets, Packing, and Sealing Devices and Rubber and Plastics Hose and Belting
3052|Rubber and Plastics Hose and Belting
3053|Gaskets, Packing, and Sealing Devices
306|Fabricated Rubber Products, NEC
3061|Molded, Extruded, and Lathe-Cut Mechanical Rubber Goods
3069|Fabricated Rubber Products, NEC
308|Miscellaneous Plastics Products
3081|Plastics Plumbing Fixtures
3082|Plastics Unsupported Profile Shapes
3083|Laminated Plastics Plate, Sheet, and Profile Shapes
3084|Plastics Pipe
3085|Plastics Bottles
3086|Plastics Foam Products
3087|Custom Compound of Purchased Plastics Resins
3088|Plastics Plumbing Fixtures
3089|Plastics Products Manufacturing, NEC
31|Leather and Leather Products
311|Leather Tanning and Finishing
3111|Leather Tanning and Finishing
313|Boot and Shoe Cut Stock and Findings
3131|Boot and Shoe Cut Stock and Findings
314|Footwear, Except Rubber
3142|House Slippers
3143|Men's Footwear, Except Athletic
3144|Women's Footwear, Except Athletic
3149|Footwear, Except Rubber, NEC
315|Leather Gloves and Mittens
3151|Leather Gloves and Mittens
316|Luggage
3161|Luggage
317|Handbags and Other Personal Leather Goods
3171|Women's Handbags and Purses
3172|Personal Leather Goods, Except Women's Handbags and Purses
319|Leather Goods, NEC
3199|Leather Goods, NEC
32|Stone, Clay, Glass, and Concrete Products
321|Flat Glass
3211|Flat Glass
322|Glass and Glassware, Pressed or Blown
3221|Glass Containers
3229|Pressed and Blown Glass and Glassware, NEC
323|Glass Products, Made of Purchased Glass
3231|Glass Products, Made of Purchased Glass
324|Cement, Hydraulic
3241|Cement, Hydraulic
325|Structural Clay Products
3251|Brick and Structural Clay Tile
3253|Ceramic Wall and Floor Tile
3255|Clay Refractories
3259|Structural Clay Products, NEC
326|Pottery and Related Products
3261|Vitreous China Plumbing Fixtures and China and Earthenware Fittings and Bathroom Accessories
3262|Vitreous China Table and Kitchen Articles
3263|Fine Earthenware (Whiteware) Table and Kitchen Articles
3264|Porcelain Electrical Supplies
3269|Pottery Products, NEC
327|Concrete, Gypsum, and Plaster Products
3271|Concrete Block and Brick
3272|Concrete Products, Except Block and Brick
3273|Ready-Mixed Concrete
3274|Lime
3275|Gypsum Products
328|Cut Stone and Stone Products
3281|Cut Stone and Stone Products
329|Abrasive, Asbestos, and Miscellaneous Nonmetallic Mineral Products
3291|Abrasive Products
3292|Asbestos Products
3295|Minerals and Earths, Ground or Otherwise Treated
3296|Mineral Wool
3297|Nonclay Refractories
3299|Nonmetallic Mineral Products, NEC
33|Primary Metal Industries
331|Steel Works, Blast Furnaces, and Rolling and Finishing Mills
3312|Steel Works, Blast Furnaces (Including Coke Ovens), and Rolling Mills
3313|Electrometallurgical Products, Except Steel
3315|Steel Wiredrawing and Steel Nails and Spikes
3316|Cold-Rolled Steel Sheet, Strip, and Bars
3317|Steel Pipe and Tubes
332|Iron and Steel Foundries
3321|Gray and Ductile Iron Foundries
3322|Malleable Iron Foundries
3324|Steel Investment Foundries
3325|Steel Foundries, NEC
333|Primary Smelting and Refining of Nonferrous Metals
3331|Primary Smelting and Refining of Copper
3334|Primary Production of Aluminum
3339|Primary Smelting and Refining of Nonferrous Metals, Except Copper and Aluminum
334|Secondary Smelting and Refining of Nonferrous Metals
3341|Secondary Smelting and Refining of Nonferrous Metals
335|Rolling, Drawing, and Extruding of Nonferrous Metals
3351|Rolling, Drawing, and Extruding of Copper
3353|Aluminum Sheet, Plate, and Foil
3354|Aluminum Extruded Products
3355|Aluminum Rolling and Drawing, NEC
3356|Rolling, Drawing, and Extruding of Nonferrous Metals, Except Copper and Aluminum
3357|Drawing and Insulating of Nonferrous Metals
336|Nonferrous Foundries (Castings)
3363|Aluminum Die-Castings
3364|Nonferrous Die-Castings, Except Aluminum
3365|Aluminum Foundries
3366|Copper Foundries
3369|Nonferrous Foundries, Except Aluminum and Copper
339|Miscellaneous Primary Metal Products
3398|Metal Heat Treating
3399|Primary Metal Products, NEC
34|Fabricated Metal Products, Except Machinery and Transportation Equipment
341|Metal Cans and Shipping Containers
3411|Metal Cans
3412|Metal Shipping Barrels, Drums, Kegs, and Pails
342|Cutlery, Handtools, and General Hardware
3421|Cutlery
3423|Hand and Edge Tools, Except Machine Tools and Handsaws
3425|Saw Blades and Handsaws
3429|Hardware, NEC
343|Heating Equipment, Except Electric and Warm Air; and Plumbing Fixtures
3431|Enameled Iron and Metal Sanitary Ware
3432|Plumbing Fixture Fittings and Trim
3433|Heating Equipment, Except Electric and Warm Air Furnaces
344|Fabricated Structural Metal Manufacturing
3441|Fabricated Structural Metal
3442|Metal Doors, Sash, Frames, Molding, and Trim Manufacturing
3443|Fabricated Plate Work (Boiler Shops)
3444|Sheet Metal Work
3446|Architectural and Ornamental Metal Work
3448|Prefabricated Metal Buildings and Components
3449|Miscellaneous Structural Metal Work
345|Screw Machine Products, and Bolts, Nuts, Screws, Rivets, and Washers
3451|Screw Machine Products
3452|Bolts, Nuts, Screws, Rivets, and Washers
346|Metal Forgings and Stampings
3462|Iron and Steel Forgings
3463|Nonferrous Forgings
3465|Automotive Stampings
3466|Crowns and Closures
3469|Metal Stampings, NEC
347|Coating, Engraving, and Allied Services
3471|Electroplating, Plating, Polishing, Anodizing, and Coloring
3479|Services to Metal Coating and Allied Services, NEC
348|Ordnance and Accessories, Except Vehicles and Guided Missiles
3482|Small Arms Ammunition
3483|Ammunition, Except for Small Arms, NEC
3484|Small Arms
3489|Ordnance and Accessories, NEC
349|Miscellaneous Fabricated Metal Products
3491|Industrial Valves
3492|Fluid Power Valves and Hose Fittings
3493|Steel Springs, Except Wire
3494|Valves and Pipe Fittings, NEC
3495|Wire Springs
3496|Miscellaneous Fabricated Wire Products
3497|Metal Foil and Leaf
3498|Fabricated Pipe and Pipe Fittings
3499|Miscellaneous Fabricated Metal Products, NEC
35|Industrial and Commercial Machinery and Computer Equipment
351|Engines and Turbines
3511|Steam, Gas, and Hydraulic Turbines, and Turbine Generator Set Units
3519|Internal Combustion Engines, NEC
352|Farm and Garden Machinery and Equipment
3523|Farm Machinery and Equipment
3524|Lawn and Garden Tractors and Home Lawn and Garden Equipment
353|Construction, Mining, and Materials Handling Machinery and Equipment
3531|Construction Machinery and Equipment
3532|Mining Machinery and Equipment, Except Oil and Gas Field Machinery and Equipment
3533|Oil and Gas Field Machinery and Equipment
3534|Elevators and Moving Stairways
3535|Conveyors and Conveying Equipment
3536|Overhead Traveling Cranes, Hoists, and Monorail Systems
3537|Industrial Trucks, Tractors, Trailers, and Stackers
354|Metalworking Machinery and Equipment
3541|Machine Tools, Metal Cutting Types
3542|Machine Tools, Metal Forming Types
3543|Industrial Patterns
3544|Special Dies, Tools, Jigs, and Fixtures
3545|Cutting Tools, Machine Tool Accessories, and Machinists' Precision Measuring Devices
3546|Power-Driven Handtools
3547|Rolling Mill Machinery and Equipment
3548|Welding Apparatus
3549|Metalworking Machinery, NEC
355|Special Industry Machinery, Except Metalworking
3552|Textile Machinery
3553|Woodworking Machinery
3554|Paper Industries Machinery
3555|Printing Trades Machinery and Equipment
3556|Food Products Machinery
3559|Special Industry Machinery, NEC
356|General Industrial Machinery and Equipment
3561|Pumps and Pumping Equipment
3562|Ball and Roller Bearings
3563|Air and Gas Compressors
3564|Industrial and Commercial Machinery and Equipment, NEC
3565|Packaging Machinery
3566|Speed Changers, Industrial High-Speed Drives, and Gears
3567|Industrial Process Furnaces and Ovens
3568|General Industrial Machinery and Equipment, NEC
3569|General Industrial Machinery and Equipment, NEC
357|Computer and Office Equipment
3571|Electronic Computers
3572|Computer Storage Devices
3575|Computer Terminals
3577|Computer Peripheral Equipment, NEC
3578|Calculating and Accounting Machines, Except Electronic Computers
3579|Office Machines, NEC
358|Refrigeration and Service Industry Machinery
3581|Automatic Vending Machines
3582|Commercial Laundry, Drycleaning, and Pressing Machines
3585|Air-Conditioning and Warm Air Heating Equipment and Commercial and Industrial Refrigeration Equipment
3586|Measuring and Dispensing Pumps
3589|Industrial and Commercial Machinery and Equipment, NEC
359|Miscellaneous Industrial and Commercial Machinery and Equipment
3592|Carburetors, Pistons, Piston Rings, and Valves
3593|Fluid Power Cylinders and Actuators
3594|Fluid Power Pumps and Motors
3596|Scales and Balances, Except Laboratory
3599|Industrial and Commercial Machinery and Equipment, NEC
36|Electronic and Other Electrical Equipment and Components, Except Computer Equipment
361|Electric Transmission and Distribution Equipment
3612|Power, Distribution, and Specialty Transformers
3613|Switchgear and Switchboard Apparatus
362|Electrical Industrial Apparatus
3621|Motors and Generators
3624|Carbon and Graphite Products
3625|Relays and Industrial Controls
3629|Electrical Industrial Apparatus, NEC
363|Household Appliances
3631|Household Cooking Equipment
3632|Household Refrigerators and Home and Farm Freezers
3633|Household Laundry Equipment
3634|Housewares and Fans
3635|Household Vacuum Cleaners
3639|Household Appliances, NEC
364|Electric Lighting and Wiring Equipment
3641|Current-Carrying Wiring Devices
3643|Current-Carrying Wiring Devices
3644|Noncurrent-Carrying Wiring Devices
3645|Residential Electric Lighting Fixtures
3646|Commercial, Industrial, and Institutional Electric Lighting Fixtures
3647|Vehicular Lighting Equipment
3648|Lighting Equipment, NEC
365|Household Audio and Video Equipment, and Audio Recordings
3651|Household Audio and Video Equipment
3652|Phonograph Records and Prerecorded Audio Tapes and Disks
366|Communication Equipment
3661|Telephone and Telegraph Apparatus
3663|Radio and Television Broadcasting and Communications Equipment
3669|Communications Equipment, NEC
367|Electronic Components and Accessories
3671|Electron Tubes
3672|Printed Circuit Boards
3674|Semiconductors and Related Devices
3675|Electronic Capacitors
3676|Electronic Resistors
3677|Electronic Coils, Transformers, and Other Inductors
3678|Electronic Connectors
3679|Electronic Components, NEC
369|Miscellaneous Electrical Machinery, Equipment, and Supplies
3691|Storage Batteries
3692|Primary Batteries, Dry and Wet
3694|Electrical Equipment for Internal Combustion Engines
3695|Magnetic and Optical Recording Media
3699|Electronic and Other Electrical Equipment and Components, NEC
37|Transportation Equipment
371|Motor Vehicles and Motor Vehicle Equipment
3711|Motor Vehicles and Passenger Car Bodies
3713|Truck and Bus Bodies
3714|Motor Vehicle Parts and Accessories
3715|Truck Trailers
3716|Motor Homes
372|Aircraft and Parts
3721|Aircraft
3724|Aircraft Engines and Engine Parts
3728|Aircraft Parts and Auxiliary Equipment, NEC
373|Ship and Boat Building and Repairing
3731|Ship Building and Repairing
3732|Boat Building and Repairing
374|Railroad Equipment
3743|Railroad Equipment
375|Motorcycles, Bicycles, and Parts
3751|Motorcycles, Bicycles, and Parts
376|Guided Missiles and Space Vehicles and Parts
3761|Guided Missiles and Space Vehicles
3764|Guided Missile and Space Vehicle Propulsion Units and Propulsion Unit Parts
3769|Guided Missile Space Vehicle Parts and Auxiliary Equipment, NEC
379|Miscellaneous Transportation Equipment
3792|Travel Trailers and Campers
3795|Tanks and Tank Components
3799|Transportation Equipment, NEC
38|Measuring, Analyzing, and Controlling Instruments; Photographic, Medical and Optical Goods; Watches and Clocks
381|Search, Detection, Navigation, Guidance, Aeronautical, and Nautical Systems and Instruments
3812|Search, Detection, Navigation, Guidance, Aeronautical, and Nautical Systems and Instruments
382|Laboratory Apparatus and Analytical, Optical, Measuring, and Controlling Instruments
3821|Laboratory Apparatus and Furniture
3822|Automatic Controls for Regulating Residential and Commercial Environments and Appliances
3823|Industrial Instruments for Measurement, Display, Indicating, Recording, Transmitting, and Controlling
3824|Industrial Process Control Instruments
3825|Instruments for Measuring and Testing of Electricity and Electrical Signals
3826|Laboratory Analytical Instruments
3827|Optical Instruments and Lenses
3829|Measuring and Controlling Devices, NEC
384|Surgical, Medical, and Dental Instruments and Supplies
3841|Surgical and Medical Instruments and Apparatus
3842|Orthopedic, Prosthetic, and Surgical Appliances and Supplies
3843|Dental Equipment and Supplies
3844|X-Ray Apparatus and Tubes and Related Irradiation Apparatus
3845|Electromedical and Electrotherapeutic Apparatus
385|Ophthalmic Goods
3851|Ophthalmic Goods
386|Photographic Equipment and Supplies
3861|Photographic Equipment and Supplies
387|Watches, Clocks, Clockwork Operated Devices, and Parts
3873|Watches, Clocks, Clockwork Operated Devices, and Parts
39|Miscellaneous Manufacturing Industries
391|Jewelry, Silverware, and Plated Ware
3911|Jewelry, Precious Metal
3914|Silverware, Plated Ware, and Stainless Steel Ware
3915|Jewelers' Findings and Materials, and Lapidary Work
393|Musical Instruments
3931|Musical Instruments
394|Dolls, Toys, Games and Sporting and Athletic Goods
3942|Dolls and Stuffed Toys
3944|Games, Toys, and Children's Vehicles, Except Dolls and Bicycles
3949|Sporting and Athletic Goods, NEC
395|Pens, Pencils, and Other Artists' Materials
3951|Pens, Mechanical Pencils, and Parts
3952|Lead Pencils, Crayons, and Artists' Materials
3953|Marking Devices
3955|Carbon Paper and Inked Ribbons
396|Costume Jewelry, Costume Novelties, Buttons, and Miscellaneous Notions, Except Precious Metal
3961|Costume Jewelry and Costume Novelties, Except Precious Metal
3965|Fasteners, Buttons, Needles, and Pins
399|Miscellaneous Manufacturing Industries
3991|Brooms, Brushes, Mops, and Sponges
3993|Signs and Advertising Specialties
3995|Burial Caskets
3996|Linoleum, Asphalted-Felt-Base, and Other Hard Surface Floor Coverings, NEC
3999|Manufacturing Industries, NEC
40|Railroad Transportation
401|Railroads, Line-Haul Operating
4011|Railroads, Line-Haul Operating
402|Railroad Switching and Terminal Establishments
4013|Railroad Switching and Terminal Establishments
41|Local and Suburban Transit and Interurban Highway Passenger Transportation
411|Local and Suburban Transit
4111|Local and Suburban Transit
4119|Local Passenger Transportation, NEC
412|Taxicabs
4121|Taxicabs
413|Intercity and Rural Bus Transportation
4131|Intercity and Rural Bus Transportation
414|Bus Charter Service
4141|Local Bus Charter Service
4142|Bus Charter Service, Except Local
415|School Buses
4151|School Buses
417|Terminal and Service Facilities for Motor Vehicle Passenger Transportation
4173|Terminal and Service Facilities for Motor Vehicle Passenger Transportation
42|Motor Freight Transportation and Warehousing
421|Trucking and Courier Services, Except Air
4212|Local Trucking Without Storage
4213|Trucking, Except Local
4214|Local Trucking With Storage
4215|Courier Services, Except by Air
422|Public Warehousing and Storage
4221|Farm Product Warehousing and Storage
4222|Refrigerated Warehousing and Storage
4225|General Warehousing and Storage
4226|Special Warehousing and Storage, NEC
43|United States Postal Service
431|United States Postal Service
4311|United States Postal Service
44|Water Transportation
441|Deep Sea Foreign Transportation of Freight
4412|Deep Sea Foreign Transportation of Freight
442|Deep Sea Domestic Transportation of Freight
4424|Deep Sea Domestic Transportation of Freight
443|Freight Transportation on the Great Lakes-St. Lawrence Seaway
4432|Freight Transportation on the Great Lakes-St. Lawrence Seaway
444|Water Transportation of Freight, NEC
4449|Services Incidental to Water Transportation, NEC
448|Water Transportation of Passengers
4481|Deep Sea Transportation of Passengers, Except by Ferry
4482|Ferries
4489|Water Transportation of Passengers, NEC
449|Services Incidental to Water Transportation
4491|Marine Cargo Handling
4492|Towing and Tugboat Services
4493|Marinas
4499|Services Incidental to Water Transportation, NEC
45|Transportation by Air
451|Air Transportation, Scheduled, and Air Courier Services
4512|Air Transportation, Scheduled
4513|Air Courier Services
452|Air Transportation, Nonscheduled
4522|Air Transportation, Nonscheduled
458|Airports, Flying Fields, and Airport Terminal Services
4581|Airports, Flying Fields, and Airport Terminal Services
46|Pipelines, Except Natural Gas
461|Pipelines, Except Natural Gas
4612|Crude Petroleum Pipelines
4613|Refined Petroleum Pipelines
4619|Pipelines, NEC
47|Transportation Services
471|Freight Transportation Arrangement
4712|Freight Transportation Arrangement
472|Arrangement of Passenger Transportation
4724|Travel Agencies
4725|Tour Operators
4729|Arrangement of Passenger Transportation, NEC
473|Rental of Railroad Cars
4731|Arrangement of Transportation of Freight and Cargo
474|Rental of Railroad Cars
4741|Rental of Railroad Cars
478|Miscellaneous Services Incidental to Transportation
4783|Packing and Crating
4785|Fixed Facilities and Inspection and Weighing Services for Motor Vehicle Transportation
4789|Services Allied to Transportation, NEC
48|Communications
481|Telephone Communications
4812|Radiotelephone Communications
4813|Telephone Communications, Except Radiotelephone
482|Telegraph and Other Message Communications
4822|Telegraph and Other Message Communications
483|Radio and Television Broadcasting Stations
4832|Radio Broadcasting Stations
4833|Television Broadcasting Stations
484|Cable and Other Pay Television Services
4841|Cable and Other Pay Television Services
489|Communications Services, NEC
4899|Communications Services, NEC
49|Electric, Gas, and Sanitary Services
491|Electric Services
4911|Electric Services
4931|Electric and Other Services Combined
4932|Gas and Other Services Combined
4939|Combination Utilities, NEC
492|Gas Production and Distribution
4922|Natural Gas Transmission
4923|Natural Gas Transmission and Distribution
4924|Natural Gas Distribution
4925|Mixed, Manufactured, or Liquefied Petroleum Gas Production and/or Distribution
493|Combination Electric and Gas, and Other Utility Services
4941|Water Supply
494|Water Supply
4952|Sewerage Systems
4953|Refuse Systems
4959|Services Allied to Motion Picture Production, NEC
495|Sanitary Services
4961|Steam and Air-Conditioning Supply
50|Wholesale Trade-Durable Goods
501|Motor Vehicles and Motor Vehicle Parts and Supplies
5012|Automobiles and Other Motor Vehicles
5013|Motor Vehicle Supplies and New Parts
5014|Tires and Tubes
5015|Motor Vehicle Parts, Used
502|Furniture and Home Furnishings
5021|Furniture
5023|Home Furnishings
503|Lumber and Other Construction Materials
5031|Lumber, Plywood, Millwork, and Wood Panels
5032|Brick, Stone, and Related Construction Materials
5033|Roofing, Siding, and Insulation Materials
5039|Construction Materials, NEC
504|Professional and Commercial Equipment and Supplies
5043|Photographic Equipment and Supplies
5044|Office Equipment
5045|Computers and Computer Peripherals and Software
5046|Commercial Equipment, NEC
5047|Medical and Hospital Equipment and Supplies
5048|Ophthalmic Goods
5049|Professional Equipment and Supplies, NEC
505|Metals and Minerals, Except Petroleum
5051|Metals Service Centers and Offices
5052|Coal and Other Minerals and Ores
506|Electrical Goods
5063|Electrical Apparatus and Equipment, Wiring Supplies, and Construction Materials
5064|Electrical Appliances, Television and Radio Sets
5065|Electronic Parts and Equipment, NEC
507|Hardware, and Plumbing and Heating Equipment and Supplies
5072|Hardware
5074|Plumbing and Heating Equipment and Supplies (Hydronics)
5075|Warm Air Heating and Air-Conditioning Equipment and Supplies
5078|Refrigeration Equipment and Supplies
508|Machinery, Equipment, and Supplies
5082|Construction and Mining (Except Petroleum) Machinery and Equipment
5083|Farm and Garden Machinery and Equipment
5084|Industrial Machinery and Equipment
5085|Industrial and Personal Service Paper
5087|Service Establishment Equipment and Supplies
5088|Transportation Equipment and Supplies, Except Motor Vehicles
509|Miscellaneous Durable Goods
5091|Sporting and Recreational Goods and Supplies
5092|Toys and Hobby Goods and Supplies
5093|Scrap and Waste Materials
5094|Jewelry, Watches, Precious Stones, and Precious Metals
5099|Durable Goods, NEC
51|Wholesale Trade-Nondurable Goods
511|Paper and Paper Products
5111|Printing and Writing Paper
5112|Stationery and Office Supplies
5113|Industrial and Personal Service Paper
512|Drugs, Drug Proprietaries, and Druggists' Sundries
5122|Drugs, Drug Proprietaries, and Druggists' Sundries
513|Apparel, Piece Goods, and Notions
5131|Piece Goods, Notions, and Other Dry Goods
5136|Men's and Boys' Clothing and Furnishings
5137|Women's, Children's, and Infants' Clothing and Accessories
5139|Footwear
514|Groceries and Related Products
5141|Groceries, General Line
5142|Packaged Frozen Foods
5143|Dairy Products, Except Dried or Canned
5144|Poultry and Poultry Products
5145|Confectionery
5146|Fish and Seafoods
5147|Meats and Meat Products
5148|Fresh Fruits and Vegetables
5149|Groceries and Related Products, NEC
515|Farm-Product Raw Materials
5153|Grain and Field Beans
5154|Livestock
5159|Farm-Product Raw Materials, NEC
516|Chemicals and Allied Products
5162|Plastics Materials and Basic Forms and Shapes
5169|Chemicals and Allied Products, NEC
517|Petroleum and Petroleum Products
5171|Petroleum Bulk Stations and Terminals
5172|Petroleum and Petroleum Products Wholesalers, Except Bulk Stations and Terminals
518|Beer, Wine, and Distilled Alcoholic Beverages
5181|Beer and Ale
5182|Wine and Distilled Alcoholic Beverages
519|Miscellaneous Nondurable Goods
5191|Farm Supplies
5192|Books, Periodicals, and Newspapers
5193|Flowers, Nursery Stock, and Florists' Supplies
5194|Tobacco and Tobacco Products
5198|Paints, Varnishes, and Supplies
5199|Nondurable Goods, NEC
52|Building Materials, Hardware, Garden Supply, and Mobile Home Dealers
521|Lumber and Other Building Materials Dealers
5211|Lumber and Other Building Materials Dealers
523|Paint, Glass, and Wallpaper Stores
5231|Paint, Glass, and Wallpaper Stores
525|Hardware Stores
5251|Hardware Stores
526|Retail Nurseries, Lawn and Garden Supply Stores
5261|Retail Nurseries, Lawn and Garden Supply Stores
527|Mobile Home Dealers
5271|Mobile Home Dealers
53|General Merchandise Stores
531|Department Stores
5311|Department Stores
533|Variety Stores
5331|Variety Stores
539|Miscellaneous General Merchandise Stores
5399|Miscellaneous General Merchandise Stores
54|Food Stores
541|Grocery Stores
5411|Grocery Stores
542|Meat and Fish (Seafood) Markets, Including Freezer Provisioners
5421|Meat and Fish (Seafood) Markets, Including Freezer Provisioners
543|Fruit and Vegetable Markets
5431|Fruit and Vegetable Markets
544|Candy, Nut, and Confectionery Stores
5441|Candy, Nut, and Confectionery Stores
545|Dairy Products Stores
5451|Dairy Products Stores
546|Retail Bakeries
5461|Retail Bakeries
549|Miscellaneous Food Stores
5499|Miscellaneous Food Stores
55|Automotive Dealers and Gasoline Service Stations
551|Motor Vehicle Dealers (New and Used)
5511|Motor Vehicle Dealers (New and Used)
5521|Motor Vehicle Dealers (Used Only)
552|Motor Vehicle Dealers (Used Only)
553|Auto and Home Supply Stores
5531|Auto and Home Supply Stores
554|Gasoline Service Stations
5541|Gasoline Service Stations
555|Boat Dealers
5551|Boat Dealers
556|Recreational Vehicle Dealers
5561|Recreational Vehicle Dealers
557|Motorcycle Dealers
5571|Motorcycle Dealers
559|Automotive Dealers, NEC
5599|Automotive Dealers, NEC
56|Apparel and Accessory Stores
561|Men's and Boys' Clothing and Accessory Stores
5611|Men's and Boys' Clothing and Accessory Stores
562|Women's Clothing Stores
5621|Women's Clothing Stores
563|Women's Accessory and Specialty Stores
5632|Women's Accessory and Specialty Stores
564|Children's and Infants' Wear Stores
5641|Children's and Infants' Wear Stores
565|Family Clothing Stores
5651|Family Clothing Stores
566|Shoe Stores
5661|Shoe Stores
569|Miscellaneous Apparel and Accessory Stores
5699|Miscellaneous Apparel and Accessory Stores
57|Home Furniture, Furnishings, and Equipment Stores
571|Home Furniture and Furnishings Stores
5712|Furniture Stores
5713|Floor Covering Stores
5714|Drapery, Curtain, and Upholstery Stores
5719|Miscellaneous Homefurnishings Stores
572|Household Appliance Stores
5722|Household Appliance Stores
573|Radio, Television, Consumer Electronics, and Music Stores
5731|Radio, Television, and Consumer Electronics Stores
5734|Computer and Computer Software Stores
5735|Record and Prerecorded Tape Stores
5736|Musical Instrument Stores
58|Eating and Drinking Places
581|Eating and Drinking Places
5812|Eating Places
5813|Drinking Places (Alcoholic Beverages)
59|Miscellaneous Retail
591|Drug Stores and Proprietary Stores
5912|Drug Stores and Proprietary Stores
592|Liquor Stores
5921|Liquor Stores
593|Used Merchandise Stores
5932|Used Merchandise Stores
594|Miscellaneous Shopping Goods Stores
5941|Sporting Goods Stores and Bicycle Shops
5942|Book Stores
5943|Stationery Stores
5944|Jewelry Stores
5945|Hobby, Toy, and Game Shops
5946|Camera and Photographic Supply Stores
5947|Gift, Novelty, and Souvenir Shops
5948|Luggage Stores and Leather Goods Stores
5949|Sewing, Needlework, and Piece Goods Stores
596|Nonstore Retailers
5961|Catalog and Mail-Order Houses
5962|Automatic Merchandising Machine Operators
5963|Direct Selling Establishments
598|Fuel Dealers
5983|Fuel Oil Dealers
5984|Liquefied Petroleum Gas (Bottled Gas) Dealers
5989|Fuel Dealers, NEC
599|Retail Stores, NEC
5992|Florists
5993|Tobacco Stores and Stands
5994|News Dealers and Newsstands
5995|Optical Goods Stores
5999|Miscellaneous Retail Stores, NEC
60|Depository Institutions
601|Central Reserve Depository Institutions
6011|Federal Reserve Banks
6019|Central Reserve Depository Institutions, NEC
602|Commercial Banks
6021|National Commercial Banks
6022|State Commercial Banks-Federal Reserve Members and State (Insured)
6029|Commercial Banks, NEC
603|Savings Institutions
6035|Savings Institutions, Federally Chartered
6036|Savings Institutions, Not Federally Chartered-State Chartered
606|Credit Unions
6061|Credit Unions, Federally Chartered
6062|Credit Unions, State-Chartered-Federally Insured
609|Functions Related to Depository Banking
6099|Functions Related to Depository Banking, NEC
61|Non-Depository Credit Institutions
611|Federal and Federally-Sponsored Credit Agencies
6111|Federal and Federally-Sponsored Credit Agencies
614|Personal Credit Institutions
6141|Personal Credit Institutions
615|Business Credit Institutions
6153|Short-Term Business Credit Institutions, Except Agencies
6159|Federal and Federally-Sponsored Credit Agencies, NEC
616|Mortgage Bankers, Brokers, and Service
6162|Mortgage Bankers and Loan Correspondents
6163|Loan Brokers
62|Security and Commodity Brokers, Dealers, Exchanges, and Services
621|Security Brokers, Dealers, and Flotation Companies
6211|Security Brokers, Dealers, and Flotation Companies
622|Commodity Contracts Dealers, Brokers, and Services
6221|Commodity Contracts Dealers, Brokers
6231|Security and Commodity Exchanges
623|Security and Commodity Exchanges
628|Services Allied With the Exchange of Securities or Commodities
6282|Investment Advice
6289|Services Allied With the Exchange of Securities or Commodities, NEC
63|Insurance Carriers
631|Life Insurance
6311|Life Insurance
632|Medical Service and Health Insurance
6321|Accident and Health Insurance
6324|Hospital and Medical Service Plans
633|Fire, Marine, and Casualty Insurance
6331|Fire, Marine, and Casualty Insurance
635|Surety Insurance
6351|Surety Insurance
636|Title Insurance
6361|Title Insurance
637|Pension, Health, and Welfare Funds
6371|Pension, Health, and Welfare Funds
639|Insurance Carriers, NEC
6399|Insurance Carriers, NEC
64|Insurance Agents, Brokers, and Service
641|Insurance Agents, Brokers, and Service
6411|Insurance Agents, Brokers, and Service
65|Real Estate
651|Real Estate Operators (Except Developers) and Lessors
6512|Operators of Apartment Buildings
6513|Operators of Real Property, NEC
6514|Operators of Dwellings Other Than Apartment Buildings
6515|Operators of Residential Mobile Home Sites
6517|Lessors of Railroad Property
6519|Lessors of Real Property, NEC
653|Real Estate Agents and Managers
6531|Real Estate Agents and Managers
654|Title Abstract Offices
6541|Title Abstract Offices
655|Land Subdividers and Developers
6552|Land Subdividers and Developers, NEC
6553|Cemetery Subdividers and Developers
67|Holding and Other Investment Offices
671|Holding Offices
6712|State Chartered Banks, Federal Reserve Members and State (Insured)
672|Investment Offices
6722|Management Investment Companies, Open-End
6726|Investment Offices, NEC
673|Trusts
6732|Educational, Religious, and Charitable Trusts
6733|Trusts, Except Educational, Religious, and Charitable
679|Miscellaneous Investing
6792|Oil Royalty Traders
6794|Patent Owners and Lessors
6798|Real Estate Investment Trusts
6799|Investors, NEC
70|Hotels, Rooming Houses, Camps, and Other Lodging Places
701|Hotels and Motels
7011|Hotels and Motels
702|Rooming Houses and Boarding Houses
7021|Rooming and Boarding Houses
703|Camps and Recreational Vehicle Parks
7032|Sporting and Recreational Camps
7033|Recreational Vehicle Parks and Campsites
704|Organization Hotels and Lodging Houses, on Membership Basis
7041|Organization Hotels and Lodging Houses, on Membership Basis
72|Personal Services
721|Laundry, Cleaning, and Garment Services
7211|Power Laundries, Family and Commercial
7212|Garment Pressing, and Agents for Laundries and Drycleaners
7213|Linen Supply
7215|Coin-Operated Laundries and Drycleaning
7216|Drycleaning Plants, Except Rug Cleaning
7217|Carpet and Upholstery Cleaning
7218|Industrial Launderers
7219|Laundry and Garment Services, NEC
722|Photographic Studios, Portrait
7221|Photographic Studios, Portrait
723|Beauty Shops
7231|Beauty Shops
724|Barber Shops
7241|Barber Shops
725|Shoe Repair Shops and Shoeshine Parlors
7251|Shoe Repair Shops and Shoeshine Parlors
726|Funeral Service and Crematories
7261|Funeral Service and Crematories
729|Miscellaneous Personal Services
7291|Tax Return Preparation Services
7299|Services, NEC
73|Business Services
731|Advertising Services
7311|Advertising Agencies
7312|Outdoor Advertising Services
7313|Radio, Television, and Publishers' Advertising Representatives
7319|Services Allied to Advertising, NEC
732|Consumer Credit Reporting, Collection Agencies
7322|Adjustment and Collection Services
7323|Credit Reporting Services
733|Mailing, Reproduction, and Stenographic Services
7331|Mailing, Reproduction, and Stenographic Services
7334|Photocopying and Duplicating Services
7335|Commercial Photography
7336|Commercial Art and Graphic Design
7338|Secretarial and Court Reporting Services
734|Services to Buildings and Dwellings
7342|Disinfecting and Pest Control Services
7349|Building Cleaning and Maintenance Services, NEC
735|Miscellaneous Equipment Rental and Leasing
7352|Medical Equipment Rental and Leasing
7353|Heavy Construction Equipment Rental and Leasing
7359|Equipment Rental and Leasing, NEC
736|Personnel Supply Services
7361|Help Supply Services
7363|Help Supply Services
737|Computer Programming, Data Processing, and Other Computer Related Services
7371|Computer Programming Services
7372|Prepackaged Software
7373|Computer Integrated Systems Design
7374|Computer Processing and Data Preparation and Processing Services
7375|Computer Rental and Leasing
7376|Computer Maintenance and Repair
7377|Computer Rental and Leasing
7378|Computer Maintenance and Repair
7379|Services Allied to Computer Programming, Data Processing, and Other Computer Related Services, NEC
738|Miscellaneous Business Services
7381|Investigation, Guard, and Armored Car Services
7382|Home Health Care Services
7383|News Syndicates
7384|Photofinishing Laboratories
7389|Services Allied to Motion Picture Production
74|Amusement and Recreation Services
791|Dance Studios, Schools, and Halls
7911|Dance Studios, Schools, and Halls
792|Theatrical Producers (Except Motion Picture), Bands, Orchestras, and Entertainers
7922|Theatrical Producers (Except Motion Picture) and Miscellaneous Theatrical Services
7929|Bands, Orchestras, Actors, and Other Entertainers and Entertainment Groups
793|Bowling Centers
7933|Bowling Centers
794|Commercial Sports
7941|Professional Sports Clubs-Except Racing
7948|Racing, Including Track Operation
799|Services, NEC
7991|Physical Fitness Facilities
7992|Public Golf Courses
7993|Coin-Operated Amusement Devices (Except Slot Machines)
7996|Amusement Parks
7997|Membership Sports and Recreation Clubs
7999|Amusement and Recreation Services, NEC
75|Automotive Repair, Services, and Parking
751|Automotive Rental and Leasing, Without Drivers
7513|Truck Rental and Leasing, Without Drivers
7514|Passenger Car Rental
7515|Passenger Car Leasing
752|Automobile Parking
7521|Automobile Parking
753|Automotive Repair Shops
7532|Top, Body, and Upholstery Repair Shops and Paint Shops
7533|Automotive Exhaust System Repair Shops
7534|Tire Retreading and Repair Shops
7536|Automotive Glass Replacement Shops
7537|Automotive Transmission Repair Shops
7538|General Automotive Repair Shops
7539|Automotive Repair Shops, NEC
754|Automotive Services, Except Repair
7542|Carwashes
7549|Automotive Services, Except Repair and Carwashes
76|Miscellaneous Repair Services
762|Electrical Repair Shops
7622|Radio and Television Repair Shops
7623|Refrigeration and Air-Conditioning Service and Repair Shops
7629|Electrical and Electronic Repair Shops, NEC
763|Watch, Clock, and Jewelry Repair
7631|Watch, Clock, and Jewelry Repair
764|Reupholstery and Furniture Repair
7641|Reupholstery and Furniture Repair
769|Miscellaneous Repair Shops and Related Services
7692|Welding Repair
7694|Armature Rewinding Shops
7699|Repair Shops and Related Services, NEC
78|Motion Pictures
781|Motion Picture Production and Allied Services
7812|Motion Picture and Tape Production
7819|Services Allied to Motion Picture Production
782|Motion Picture Distribution and Allied Services
7822|Motion Picture and Tape Distribution
783|Motion Picture Theaters
7832|Motion Picture Theaters, Except Drive-In
7833|Drive-In Motion Picture Theaters
784|Video Tape Rental
7841|Video Tape Rental
79|Amusement and Recreation Services, Except Motion Pictures
80|Health Services
801|Offices and Clinics of Doctors of Medicine
8011|Offices and Clinics of Doctors of Medicine
802|Offices and Clinics of Dentists
8021|Offices and Clinics of Dentists
803|Offices and Clinics of Doctors of Osteopathy
8031|Offices and Clinics of Doctors of Osteopathy
804|Offices and Clinics of Other Health Practitioners
8041|Offices and Clinics of Chiropractors
8042|Offices and Clinics of Optometrists
8043|Offices and Clinics of Podiatrists
8049|Offices and Clinics of Other Health Practitioners, NEC
805|Nursing and Personal Care Facilities
8051|Skilled Nursing Care Facilities
8052|Intermediate Care Facilities
8059|Nursing and Personal Care Facilities, NEC
806|Hospitals
8062|General Medical and Surgical Hospitals
8063|Psychiatric Hospitals
8069|Specialty Hospitals, Except Psychiatric
807|Medical and Dental Laboratories
8071|Medical Laboratories
8072|Dental Laboratories
808|Home Health Care Services
8082|Home Health Care Services
809|Miscellaneous Health and Allied Services, NEC
8092|Kidney Dialysis Centers
8093|Specialty Outpatient Facilities, NEC
8099|Health and Allied Services, NEC
81|Legal Services
811|Legal Services
8111|Legal Services
82|Educational Services
821|Elementary and Secondary Schools
8211|Elementary and Secondary Schools
822|Colleges, Universities, Professional Schools, and Junior Colleges
8221|Colleges, Universities, and Professional Schools
8222|Junior Colleges and Technical Institutes
823|Libraries
8231|Libraries
824|Vocational Schools
8243|Data Processing Schools
8244|Business and Secretarial Schools
8249|Vocational Schools, NEC
829|Schools and Educational Services, NEC
8299|Schools and Educational Services, NEC
83|Social Services
832|Individual and Family Social Services
8322|Individual and Family Social Services
833|Job Training and Vocational Rehabilitation Services
8331|Job Training and Vocational Rehabilitation Services
835|Child Day Care Services
8351|Child Day Care Services
836|Residential Care
8361|Residential Care
839|Services, NEC
8399|Services, NEC
84|Museums, Art Galleries, and Botanical and Zoological Gardens
841|Museums and Art Galleries
8412|Museums and Art Galleries
842|Arboreta and Botanical or Zoological Gardens
8422|Arboreta and Botanical or Zoological Gardens
86|Membership Organizations
861|Business Associations
8611|Business Associations
862|Professional Membership Organizations
8621|Professional Membership Organizations
863|Labor Unions and Similar Labor Organizations
8631|Labor Unions and Similar Labor Organizations
864|Civic, Social, and Fraternal Associations
8641|Civic, Social, and Fraternal Associations
865|Political Organizations
8651|Political Organizations
866|Religious Organizations
8661|Religious Organizations
869|Membership Organizations, NEC
8699|Membership Organizations, NEC
87|Engineering, Accounting, Research, Management, and Related Services
871|Engineering Services
8711|Engineering Services
872|Accounting, Auditing, and Bookkeeping Services
8721|Accounting, Auditing, and Bookkeeping Services
873|Research, Development, and Testing Services
8731|Commercial Physical and Biological Research
8732|Commercial Economic, Sociological, and Educational Research
8733|Noncommercial Research Organizations
8734|Testing Laboratories, Except Medical
874|Management and Public Relations Services
8741|Management Services
8742|Management Consulting Services
8743|Public Relations Services
8744|Facilities Support Management Services
8748|Business Consulting Services, NEC
88|Private Households
881|Private Households
8811|Private Households
89|Services, Not Elsewhere Classified
891|Engineering and Architectural Services
8911|Engineering and Architectural Services, NEC
899|Services, NEC
8999|Services, NEC
91|Executive, Legislative, and General Government, Except Finance
911|Executive Offices
9111|Executive Offices
912|Legislative Bodies
9121|Legislative Bodies
913|Executive and Legislative Offices, Combined
9131|Executive and Legislative Offices, Combined
919|General Government, NEC
9199|General Government, NEC
92|Justice, Public Order, and Safety
921|Courts
9211|Courts
922|Public Order and Safety
9221|Police Protection
9222|Legal Counsel and Prosecution
9223|Correctional Institutions
9224|Fire Protection
9229|Public Order and Safety, NEC
93|Public Finance, Taxation, and Monetary Policy
931|Public Finance, Taxation, and Monetary Policy
9311|Public Finance, Taxation, and Monetary Policy
94|Administration of Human Resource Programs
941|Administration of Educational Programs
9411|Administration of Educational Programs
943|Administration of Public Health Programs
9431|Administration of Public Health Programs
944|Administration of Social, Human Resource and Income Maintenance Programs
9441|Administration of Social, Human Resource and Income Maintenance Programs
945|Administration of Veterans' Affairs, Except Health and Insurance
9451|Administration of Veterans' Affairs, Except Health and Insurance
95|Administration of Environmental Quality and Housing Programs
951|Administration of Environmental Quality Programs
9511|Air and Water Resource and Solid Waste Management
9512|Land, Mineral, Wildlife, and Forest Conservation
953|Administration of Housing and Urban Development Programs
9531|Administration of Housing Programs
9532|Administration of Urban Planning and Community and Rural Development
96|Administration of Economic Programs
961|Administration of General Economic Programs
9611|Administration of General Economic Programs
962|Regulation and Administration of Transportation Programs
9621|Regulation and Administration of Transportation Programs
963|Regulation and Administration of Communications, Electric, Gas, and Other Utilities
9631|Regulation and Administration of Communications, Electric, Gas, and Other Utilities
964|Regulation of Agricultural Marketing and Commodities
9641|Regulation of Agricultural Marketing and Commodities
965|Regulation, Licensing, and Inspection of Miscellaneous Commercial Sectors
9651|Regulation, Licensing, and Inspection of Miscellaneous Commercial Sectors
966|Space Research and Technology
9661|Space Research and Technology
97|National Security and International Affairs
971|National Security
9711|National Security
972|International Affairs
9721|International Affairs
99|Nonclassifiable Establishments
999|Nonclassifiable Establishments
9999|Nonclassifiable Establishments`;

const codes = raw.split('\n').map((line) => {
  const idx = line.indexOf('|');
  const code = line.slice(0, idx);
  const title = line.slice(idx + 1);
  const level = (() => {
    const len = code.length;
    const levels = { 2: 'major_group', 3: 'industry_group', 4: 'industry' };
    return levels[len] || 'division';
  })();
  return { code, title, level };
});

writeFileSync(OUT, JSON.stringify(codes, null, 2) + '\n');
console.log(`Wrote ${codes.length} SIC codes to ${OUT}`);
