from PIL import Image
import random
import json
from pathlib import Path
import copy

skip_generating_individual_metadata = False

background = [
  {
    "Name": "Best Grey",
    "Weight": 10
  },
  {
    "Name": "Bahamas",
    "Weight": 8.5
  },
  {
    "Name": "Fav Green",
    "Weight": 8.5
  },
  {
    "Name": "Pompus",
    "Weight": 7
  },
  {
    "Name": "Matilda",
    "Weight": 7
  },
  {
    "Name": "Bluwu",
    "Weight": 7
  },
  {
    "Name": "Perry Winkle",
    "Weight": 7
  },
  {
    "Name": "That One Blue",
    "Weight": 7
  },
  {
    "Name": "Mint",
    "Weight": 7
  },
  {
    "Name": "Alien Ant Farm",
    "Weight": 7
  },
  {
    "Name": "Rusted Root",
    "Weight": 7
  },
  {
    "Name": "Blowfish",
    "Weight": 7
  },
  {
    "Name": "Candy Red",
    "Weight": 7
  },
  {
    "Name": "Sol",
    "Weight": 3
  }
]
background_names = [m["Name"] for m in background]
background_weights = [w["Weight"] for w in background]

environment = [
    {
        "Name": "None",
        "Weight": 40
    },
    {
        "Name": "Bubbles",
        "Weight": 20
    },
    {
        "Name": "Galaxy",
        "Weight": 20
    },
    {
        "Name": "Snow",
        "Weight": 25
    },
]
environment_names = [m["Name"] for m in environment]
environment_weights = [w["Weight"] for w in environment]


body = [
  {
    "Name": "Robot",
    "Weight": 16
  },
  {
    "Name": "Bear",
    "Weight": 15
  },
  {
    "Name": "Cat",
    "Weight": 14
  },
  {
    "Name": "Monke",
    "Weight": 13
  },
  {
    "Name": "Hoodlum",
    "Weight": 12
  },
  {
    "Name": "Banshee",
    "Weight": 8.7
  },
  {
    "Name": "Satyr",
    "Weight": 9
  },
  {
    "Name": "Punk",
    "Weight": 5
  },
  {
    "Name": "Zombie",
    "Weight": 2.35
  },
  {
    "Name": "Bear Ghost",
    "Weight": 1.75
  },
  {
    "Name": "Ghost",
    "Weight": 1
  },
  {
    "Name": "Robot Gold",
    "Weight": 0.2
  },
  {
    "Name": "Bear Gold",
    "Weight": 0.2
  },
  {
    "Name": "Cat Gold",
    "Weight": 0.2
  },
  {
    "Name": "Brass Monke",
    "Weight": 0.2
  },
  {
    "Name": "Hoodlum Gold",
    "Weight": 0.2
  },
  {
    "Name": "Banshee Gold",
    "Weight": 0.2
  },
  {
    "Name": "Satyr Gold",
    "Weight": 0.2
  },
  {
    "Name": "Punk Gold",
    "Weight": 0.2
  },
  {
    "Name": "Zombie Gold",
    "Weight": 0.2
  },
  {
    "Name": "Bear Rainbow",
    "Weight": 0.05
  },
  {
    "Name": "White Ghost",
    "Weight": 0.1
  },
  {
    "Name": "Bear Sol",
    "Weight": 0.25
  }
]

body_names = [m["Name"] for m in body]
body_weights = [w["Weight"] for w in body]

eyes = [
  {
    "Name": "Stare",
    "Weight": 10
  },
  {
    "Name": "Happi",
    "Weight": 10
  },
  {
    "Name": "Derp",
    "Weight": 8.5
  },
  {
    "Name": "Hero",
    "Weight": 7.5
  },
  {
    "Name": "Shades",
    "Weight": 4
  },
  {
    "Name": "Do Not Press",
    "Weight": 4.5
  },
  {
    "Name": "Bowie",
    "Weight": 4
  },
  {
    "Name": "Key Lime Pie",
    "Weight": 3.5
  },
  {
    "Name": "Spooky",
    "Weight": 3
  },
  {
    "Name": "Jaundice",
    "Weight": 4
  },
  {
    "Name": "X",
    "Weight": 3
  },
  {
    "Name": "Dialated",
    "Weight": 7
  },
  {
    "Name": "Burned Out",
    "Weight": 3
  },
  {
    "Name": "High",
    "Weight": 3
  },
  {
    "Name": "Hung",
    "Weight": 3
  },
  {
    "Name": "Laser Red",
    "Weight": 0.03
  },
  {
    "Name": "Laser Gold",
    "Weight": 3
  },
  {
    "Name": "CrushCrushCrush",
    "Weight": 3
  },
  {
    "Name": "Pain",
    "Weight": 2
  },
  {
    "Name": "Hard Forks",
    "Weight": 1.9
  },
  {
    "Name": "Tranquility",
    "Weight": 3
  },
  {
    "Name": "Piranhas",
    "Weight": 1.4
  },
  {
    "Name": "Vipers",
    "Weight": 1.6
  },
  {
    "Name": "3D Glasses",
    "Weight": 4.74
  },
  {
    "Name": "Snake",
    "Weight": 1
  },
  {
    "Name": "Squish",
    "Weight": 0.17
  },
  {
    "Name": "Three of Diamonds",
    "Weight": 0.06
  },
  {
    "Name": "Filthy Lucre",
    "Weight": 0.1
  }
]
eyes_names = [m["Name"] for m in eyes]
eyes_weights = [w["Weight"] for w in eyes]

headgear = [
  {
    "Name": "None",
    "Weight": 50
  },
  {
    "Name": "Candy Corn",
    "Weight": 5
  },
  {
    "Name": "Diablos",
    "Weight": 5
  },
  {
    "Name": "Einstein",
    "Weight": 4.5
  },
  {
    "Name": "Crown",
    "Weight": 4.5
  },
  {
    "Name": "Webbies",
    "Weight": 3.4
  },
  {
    "Name": "Antennae",
    "Weight": 2.72
  },
  {
    "Name": "Party Animal",
    "Weight": 2
  },
  {
    "Name": "Candle",
    "Weight": 2
  },
  {
    "Name": "Snaily",
    "Weight": 2
  },
  {
    "Name": "Hari-kiri",
    "Weight": 2.75
  },
  {
    "Name": "Audiophile",
    "Weight": 1.75
  },
  {
    "Name": "Gold Horns",
    "Weight": 2
  },
  {
    "Name": "Halo",
    "Weight": 2
  },
  {
    "Name": "Over Easy",
    "Weight": 1.75
  },
  {
    "Name": "Unicorn",
    "Weight": 1.75
  },
  {
    "Name": "Potted",
    "Weight": 1.5
  },
  {
    "Name": "Sailor",
    "Weight": 1.25
  },
  {
    "Name": "Bloody Scream",
    "Weight": 1
  },
  {
    "Name": "Huntress Mask",
    "Weight": 1
  },
  {
    "Name": "Beak Mask",
    "Weight": 1
  },
  {
    "Name": "Ganja",
    "Weight": 0.5
  },
  {
    "Name": "Kabuki",
    "Weight": 0.4
  },
  {
    "Name": "Rainbow Horns",
    "Weight": 0.15
  },
  {
    "Name": "Pumpkin",
    "Weight": 0.08
  }
]

headgear_names = [m["Name"] for m in headgear]
headgear_weights = [w["Weight"] for w in headgear]

accessories = [
    {
        "Name": "None",
        "Weight": 45
    },
    {
        "Name": "Cakey",
        "Weight": 9
    },
    {
        "Name": "Flying Pig",
        "Weight": 8
    },
    {
        "Name": "Crow",
        "Weight": 7
    },
    {
        "Name": "Kitty Charm",
        "Weight": 4
    },
    {
        "Name": "IT",
        "Weight": 4
    },
    {
        "Name": "Coffee",
        "Weight": 3
    },
    {
        "Name": "Super Cape",
        "Weight": 3
    },
    {
        "Name": "Ramsey",
        "Weight": 3
    },
    {
        "Name": "Wings",
        "Weight": 2
    },
    {
        "Name": "UFO",
        "Weight": 2
    },
    {
        "Name": "Dice",
        "Weight": 2
    },
    {
        "Name": "Bat",
        "Weight": 2
    },
    {
        "Name": "Magic Mirror",
        "Weight": 1.72
    },
    {
        "Name": "Whelpling",
        "Weight": 1.5
    },
    {
        "Name": "Vine",
        "Weight": 1.5
    },
    {
        "Name": "Slimy Snek",
        "Weight": 0.75
    },
    {
        "Name": "Flower Vines",
        "Weight": 0.15
    },
    {
        "Name": "Snikkity Snek",
        "Weight": 0.15
    },
    {
        "Name": "Balloons",
        "Weight": 0.1
    },
    {
        "Name": "Mistweaver",
        "Weight": 0.08
    },
    {
        "Name": "Diamond Sash",
        "Weight": 0.05
    }
]
accessories_names = [m["Name"] for m in accessories]
accessories_weights = [w["Weight"] for w in accessories]

mouths = [
  {
    "Name": "Snaggletooth",
    "Weight": 14
  },
  {
    "Name": "Good Grin",
    "Weight": 13
  },
  {
    "Name": "Cheshire",
    "Weight": 12
  },
  {
    "Name": "D Smile",
    "Weight": 9
  },
  {
    "Name": "King Vamp",
    "Weight": 6
  },
  {
    "Name": "Drippy Purple",
    "Weight": 4
  },
  {
    "Name": "Purple People Eater",
    "Weight": 3.5
  },
  {
    "Name": "Ogre",
    "Weight": 3
  },
  {
    "Name": "Gum",
    "Weight": 2.85
  },
  {
    "Name": "Zim",
    "Weight": 2.5
  },
  {
    "Name": "Stitch",
    "Weight": 2
  },
  {
    "Name": "Buck",
    "Weight": 2
  },
  {
    "Name": "Yellow Smile",
    "Weight": 4.2
  },
  {
    "Name": "Sweet Tooth",
    "Weight": 4
  },
  {
    "Name": "Purp",
    "Weight": 4
  },
  {
    "Name": "Toof",
    "Weight": 3.06
  },
  {
    "Name": "Whimsy",
    "Weight": 3.4
  },
  {
    "Name": 420,
    "Weight": 3
  },
  {
    "Name": "None",
    "Weight": 2
  },
  {
    "Name": "Smokie",
    "Weight": 0.2
  },
  {
    "Name": "Smile Slime",
    "Weight": 0.18
  },
  {
    "Name": "Fish",
    "Weight": 0.17
  },
  {
    "Name": "Drippy Gold",
    "Weight": 0.16
  },
  {
    "Name": "Cookie",
    "Weight": 0.15
  },
  {
    "Name": "One Fang Gold",
    "Weight": 0.15
  },
  {
    "Name": "Sharp Gold",
    "Weight": 0.15
  },
  {
    "Name": "Lick",
    "Weight": 0.14
  },
  {
    "Name": "Buck Gold",
    "Weight": 0.12
  },
  {
    "Name": "Slurp",
    "Weight": 0.1
  },
  {
    "Name": "Yellow Tongue",
    "Weight": 0.1
  },
  {
    "Name": "Pumpkin Bites",
    "Weight": 0.08
  },
  {
    "Name": "Toast",
    "Weight": 0.75
  },
  {
    "Name": "Diamond",
    "Weight": 0.04
  }
]

mouth_names = [m["Name"] for m in mouths]
mouth_weights = [w["Weight"] for w in mouths]

# Make sure weights all add up to 100
bg_weight_counts = sum(i["Weight"] for i in background)
environment_weight_counts = sum(i["Weight"] for i in environment)
body_weight_counts = sum(i["Weight"] for i in body)
eyes_weight_counts = sum(i["Weight"] for i in eyes)
accessories_weight_counts = sum(i["Weight"] for i in accessories)
mouths_weight_counts = sum(i["Weight"] for i in mouths)
headgear_weight_counts = sum(i["Weight"] for i in headgear)


weights_dont_add_up = bg_weight_counts != 100 and body_weight_counts != 100 and eyes_weight_counts != 100 and accessories_weight_counts != 100 and mouths_weight_counts != 100 and headgear_weight_counts != 100 and environment_weight_counts != 100

if weights_dont_add_up:
    print("bg_weight_counts: " + str(bg_weight_counts))
    print("environment_weight_counts: " + str(environment_weight_counts))
    print("body_weight_counts: " + str(body_weight_counts))
    print("eyes_weight_counts: " + str(eyes_weight_counts))
    print("accessories_weight_counts: " + str(accessories_weight_counts))
    print("mouths_weight_counts: " + str(mouths_weight_counts))
    print("headgear_weight_counts: " + str(headgear_weight_counts))
    print("Weights aren't adding up correctly...Exiting...")
    exit(0)

print("Do all the weights add up correctly? " +
      str(not weights_dont_add_up))

# Trait Generation
total_ghoulies = 7500
traits = []


def createTraitCombo():
    trait = {}
    trait["background"] = random.choices(
        background_names, background_weights)[0]
    trait["environment"] = random.choices(
        environment_names, environment_weights)[0]
    trait["body"] = random.choices(body_names, body_weights)[0]
    trait["eyes"] = random.choices(eyes_names, eyes_weights)[0]
    trait["mouth"] = random.choices(mouth_names, mouth_weights)[0]
    trait["headgear"] = random.choices(headgear_names, headgear_weights)[0]
    trait["accessories"] = random.choices(
        accessories_names, accessories_weights)[0]

    if trait in traits:
        return createTraitCombo()
    else:
        return trait


for i in range(total_ghoulies):
    new_trait_combo = createTraitCombo()

    traits.append(new_trait_combo)

# Are the Ghoulies unique?


def allUnique(x):
    seen = list()
    return not any(i in seen or seen.append(i) for i in x)


print("Are all the Ghoulies unique? " + str(allUnique(traits)))

if not allUnique(traits):
    print("The Ghoulies aren't all unique! Exiting...")
    exit(0)

# Add token ID to traits.
tokenCount = 0
for item in traits:
    item["tokenId"] = tokenCount
    tokenCount = tokenCount + 1

# Trait Counts
background_counts = {}
environment_counts = {}
body_counts = {}
eyes_counts = {}
mouth_counts = {}
headgear_counts = {}
accessories_counts = {}


def setTraitCountsToZilch(main_arr, arr_to_set):
    for item in main_arr:
        arr_to_set[item] = 0


setTraitCountsToZilch(background_names, background_counts)
setTraitCountsToZilch(environment_names, environment_counts)
setTraitCountsToZilch(body_names, body_counts)
setTraitCountsToZilch(eyes_names, eyes_counts)
setTraitCountsToZilch(mouth_names, mouth_counts)
setTraitCountsToZilch(headgear_names, headgear_counts)
setTraitCountsToZilch(accessories_names, accessories_counts)

for ghoulie in traits:
    background_counts[ghoulie["background"]] += 1
    environment_counts[ghoulie["environment"]] += 1
    body_counts[ghoulie["body"]] += 1
    eyes_counts[ghoulie["eyes"]] += 1
    mouth_counts[ghoulie["mouth"]] += 1
    headgear_counts[ghoulie["headgear"]] += 1
    accessories_counts[ghoulie["accessories"]] += 1

all_trait_counts = {"background": background_counts, "environment": environment_counts, "body": body_counts,
                    "eyes": eyes_counts, "mouth": mouth_counts, "headgear": headgear_counts, "accessories": accessories_counts}

# Write trait counts to a file.
with open('trait_counts.json', 'w') as outfile:
    json.dump(all_trait_counts, outfile, indent=4)

print("trait_counts.json created.")

traits_none_redacted = copy.deepcopy(traits)


def possiblyRemoveTraitFromGhoulie(dict, key):
    if(dict[key] == "None"):
        del dict[key]


for ghoulie in traits_none_redacted:
    possiblyRemoveTraitFromGhoulie(ghoulie, "background")
    possiblyRemoveTraitFromGhoulie(ghoulie, "environment")
    possiblyRemoveTraitFromGhoulie(ghoulie, "body")
    possiblyRemoveTraitFromGhoulie(ghoulie, "eyes")
    possiblyRemoveTraitFromGhoulie(ghoulie, "mouth")
    possiblyRemoveTraitFromGhoulie(ghoulie, "headgear")
    possiblyRemoveTraitFromGhoulie(ghoulie, "accessories")

# Write traits to a file.
with open('traits_with_none_removed.json', 'w') as outfile:
    json.dump(traits_none_redacted, outfile, indent=4)
print("traits_with_none_removed.json created.")

with open('traits_with_none.json', 'w') as outfile:
    json.dump(traits, outfile, indent=4)
print("traits_with_none.json created.")


def createGhoulieMetadata(ghoulie):
    ghoulie_id = ghoulie["tokenId"]

    ghoulie_without_none = traits_none_redacted[ghoulie_id]
    del ghoulie_without_none["tokenId"]
    attributes = []
    # trait_count: Number - if the asset is part of a collection, this number represents the total count of other assets with the same trait type and value
    # If I'm understanding this correctly, then it is the total count minus 1 since it's the "total count of OTHER assets with the same trait"
    for key, value in ghoulie_without_none.items():
        attributes.append({"trait_type": key.capitalize(
        ), "value": value, "trait_count": all_trait_counts[key][value] - 1})

    m = {}
    m["name"] = 'Ghoulie #' + str((ghoulie_id + 1)).zfill(4)
    m["symbol"] = 'GHOULIE'
    m["description"] = 'Ghoulie Gang Season 1: Halloween is a collection of 7,500 algorithmically unique NFTs on the Solana blockchain.'
    m["seller_fee_basis_points"] = 500
    m["image"] = str(ghoulie_id) + '.png'
    m["external_url"] = 'https://ghouliegang.io'
    m["edition"] = "Halloween"
    m["attributes"] = attributes
    m["collection"] = {}
    m["collection"]["name"] = "Ghoulie S01: Halloween"
    m["collection"]["family"] = "Ghoulie Gang"
    m["properties"] = {}
    m["properties"]["category"] = "image"
    # TODO: Update creators
    m["properties"]["creators"] = [
        {"address": "2UsxyCNh7jtRyiQee8qMvvSAEkv36N2HweWnjxtjQQVn", "share": 40},
        {"address": "GUyc6PhhpF6ECLEUiXzadBL3L59suEdytn7oa5ZebTb6", "share": 20},
        {"address": "Gaa5VzVuyrAq4DvkaUtNrpPno5c9UYWceTquG74NCwtk", "share": 20},
        {"address": "DoUBqRCXaHPBjbAcjkqYueQ17hFR5mcx6w8CtXHYWwXA", "share": 20},
    ]
    m["properties"]["files"] = [
        {"uri": str(ghoulie_id) + '.png', "type": "image/png"}]

    return m


# Image Generation
for ghoulie in traits:
    # Order is important here. It's how the images are layered on.
    layer1 = Image.open(
        f'./assets/Background/{ghoulie["background"]}.png').convert('RGBA')
    layer2 = Image.open(
        f'./assets/Environment/{ghoulie["environment"]}.png').convert('RGBA')
    layer3 = Image.open(f'./assets/Body/{ghoulie["body"]}.png').convert('RGBA')
    layer4 = Image.open(f'./assets/Eyes/{ghoulie["eyes"]}.png').convert('RGBA')
    layer5 = Image.open(
        f'./assets/Mouth/{ghoulie["mouth"]}.png').convert('RGBA')
    layer6 = Image.open(
        f'./assets/Headgear/{ghoulie["headgear"]}.png').convert('RGBA')
    layer7 = Image.open(
        f'./assets/Accessory/{ghoulie["accessories"]}.png').convert('RGBA')

    # Create each composite
    com1 = Image.alpha_composite(layer1, layer2)
    com2 = Image.alpha_composite(com1, layer3)
    com3 = Image.alpha_composite(com2, layer4)
    com4 = Image.alpha_composite(com3, layer5)
    com5 = Image.alpha_composite(com4, layer6)
    com6 = Image.alpha_composite(com5, layer7)

    # Convert to RGB
    rgb_im = com6.convert('RGB')

    file_name = str(ghoulie["tokenId"]) + ".png"
    Path("./output").mkdir(parents=True, exist_ok=True)
    rgb_im.save("./output/" + file_name)

    if not skip_generating_individual_metadata:
        metadata = createGhoulieMetadata(ghoulie)
        with open(f'./output/{str(ghoulie["tokenId"])}.json', 'w') as outf:
            json.dump(metadata, outf, indent=4)

    print(f'{str(ghoulie["tokenId"])} done')
