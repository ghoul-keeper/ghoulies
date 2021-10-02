from PIL import Image
import random
import json
from pathlib import Path
import copy

skip_generating_individual_metadata = False

background = [
    {
        "Name": "Best Grey",
        "Weight": 14
    },
    {
        "Name": "Deep Purp",
        "Weight": 12
    },
    {
        "Name": "That One Blue",
        "Weight": 10.5
    },
    {
        "Name": "90s",
        "Weight": 9
    },
    {
        "Name": "Alien Ant Farm",
        "Weight": 8.5
    },
    {
        "Name": "Candy Red",
        "Weight": 8
    },
    {
        "Name": "Bahamas",
        "Weight": 4
    },
    {
        "Name": "Blowfish",
        "Weight": 2
    },
    {
        "Name": "Bluwu",
        "Weight": 0.3
    },
    {
        "Name": "Cantalope",
        "Weight": 7.5
    },
    {
        "Name": "Fav Green",
        "Weight": 6.5
    },
    {
        "Name": "Foam Green",
        "Weight": 4.5
    },
    {
        "Name": "Matilda",
        "Weight": 0.3
    },
    {
        "Name": "Perry Winkle",
        "Weight": 0.2
    },
    {
        "Name": "Pompus",
        "Weight": 7
    },
    {
        "Name": "Real Teal",
        "Weight": 5.5
    },
    {
        "Name": "Mint",
        "Weight": 0.1
    },
    {
        "Name": "Rusted Root",
        "Weight": 0.1
    }
]
background_names = [m["Name"] for m in background]
background_weights = [w["Weight"] for w in background]

environment = [
    {
        "Name": "None",
        "Weight": 20
    },
    {
        "Name": "Bubbles",
        "Weight": 25
    },
    {
        "Name": "Galaxy",
        "Weight": 30
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
        "Name": "Bear",
        "Weight": 20
    },
    {
        "Name": "Monkey",
        "Weight": 16
    },
    {
        "Name": "Street",
        "Weight": 14
    },
    {
        "Name": "Robot",
        "Weight": 13
    },
    {
        "Name": "Punk",
        "Weight": 9
    },
    {
        "Name": "Cat",
        "Weight": 8
    },
    {
        "Name": "Girl",
        "Weight": 7
    },
    {
        "Name": "Zombie",
        "Weight": 6
    },
    {
        "Name": "Goat",
        "Weight": 6
    },
    {
        "Name": "Bear Gold",
        "Weight": 0.25
    },
    {
        "Name": "Robot Gold",
        "Weight": 0.25
    },
    {
        "Name": "Punk Gold",
        "Weight": 0.15
    },
    {
        "Name": "Monkey Gold",
        "Weight": 0.1
    },
    {
        "Name": "Street Gold",
        "Weight": 0.1
    },
    {
        "Name": "Zombie Gold",
        "Weight": 0.1
    },
    {
        "Name": "Bear Rainbow",
        "Weight": 0.05
    }
]

body_names = [m["Name"] for m in body]
body_weights = [w["Weight"] for w in body]

eyes = [
    {
        "Name": "Stare",
        "Weight": 12
    },
    {
        "Name": "Happi",
        "Weight": 10
    },
    {
        "Name": "X",
        "Weight": 9
    },
    {
        "Name": "Derp",
        "Weight": 7
    },
    {
        "Name": "Button Green",
        "Weight": 6
    },
    {
        "Name": "LSD",
        "Weight": 5.5
    },
    {
        "Name": "Bowie",
        "Weight": 4.5
    },
    {
        "Name": "Laser Red",
        "Weight": 4
    },
    {
        "Name": "Fork",
        "Weight": 4
    },
    {
        "Name": "Tired",
        "Weight": 4
    },
    {
        "Name": "Spooky",
        "Weight": 3.5
    },
    {
        "Name": "Hearts",
        "Weight": 3.5
    },
    {
        "Name": "Stoned",
        "Weight": 3.5
    },
    {
        "Name": "Button Red",
        "Weight": 3
    },
    {
        "Name": "Yellow",
        "Weight": 3
    },
    {
        "Name": "Three of Diamonds",
        "Weight": 3
    },
    {
        "Name": "Pain",
        "Weight": 2.5
    },
    {
        "Name": "Sleep",
        "Weight": 2
    },
    {
        "Name": "Squish",
        "Weight": 2
    },
    {
        "Name": "Mad",
        "Weight": 1.5
    },
    {
        "Name": "Money",
        "Weight": 1.5
    },
    {
        "Name": "Snake",
        "Weight": 1.5
    },
    {
        "Name": "Laser Gold",
        "Weight": 1.5
    },
    {
        "Name": "Plant Guys",
        "Weight": 1.5
    },
    {
        "Name": "Yellow Hypno",
        "Weight": 0.5
    }
]
eyes_names = [m["Name"] for m in eyes]
eyes_weights = [w["Weight"] for w in eyes]

headgear = [
    {
        "Name": "None",
        "Weight": 45
    },
    {
        "Name": "Headphones",
        "Weight": 6.5
    },
    {
        "Name": "Antennae",
        "Weight": 5
    },
    {
        "Name": "Horns Red",
        "Weight": 4
    },
    {
        "Name": "Plant Pot",
        "Weight": 3.5
    },
    {
        "Name": "Unicorn",
        "Weight": 3.5
    },
    {
        "Name": "Candy Corn",
        "Weight": 3
    },
    {
        "Name": "Party Time",
        "Weight": 3
    },
    {
        "Name": "Idea",
        "Weight": 3
    },
    {
        "Name": "Snaily Boi",
        "Weight": 3
    },
    {
        "Name": "Egg",
        "Weight": 2.75
    },
    {
        "Name": "Flower",
        "Weight": 2.75
    },
    {
        "Name": "Sword",
        "Weight": 2.75
    },
    {
        "Name": "Pot Head",
        "Weight": 2.5
    },
    {
        "Name": "Webbies",
        "Weight": 2.5
    },
    {
        "Name": "Candle",
        "Weight": 1.5
    },
    {
        "Name": "Crown",
        "Weight": 1.5
    },
    {
        "Name": "Turkey Dinner",
        "Weight": 1.5
    },
    {
        "Name": "Halo",
        "Weight": 1
    },
    {
        "Name": "Horns Remastered",
        "Weight": 0.75
    },
    {
        "Name": "Headphones Drip",
        "Weight": 0.25
    },
    {
        "Name": "Horns Gold",
        "Weight": 0.25
    },
    {
        "Name": "Egg N Bacon",
        "Weight": 0.25
    },
    {
        "Name": "Snaily Boi Gold",
        "Weight": 0.25
    }
]

headgear_names = [m["Name"] for m in headgear]
headgear_weights = [w["Weight"] for w in headgear]

accessories = [
    {
        "Name": "None",
        "Weight": 35
    },
    {
        "Name": "Super Cape",
        "Weight": 8
    },
    {
        "Name": "Wings",
        "Weight": 5
    },
    {
        "Name": "Bat",
        "Weight": 4.5
    },
    {
        "Name": "Chef Apron",
        "Weight": 4.5
    },
    {
        "Name": "Dice",
        "Weight": 4
    },
    {
        "Name": "Coffee",
        "Weight": 3.5
    },
    {
        "Name": "Cakey",
        "Weight": 3.5
    },
    {
        "Name": "Whelpling Green",
        "Weight": 3.5
    },
    {
        "Name": "Diamond Sash",
        "Weight": 3.25
    },
    {
        "Name": "UFO",
        "Weight": 3
    },
    {
        "Name": "Balloon",
        "Weight": 2.5
    },
    {
        "Name": "Flying Pig",
        "Weight": 2.5
    },
    {
        "Name": "Kitty Charm",
        "Weight": 2.5
    },
    {
        "Name": "Snake Green",
        "Weight": 2
    },
    {
        "Name": "Staff",
        "Weight": 2
    },
    {
        "Name": "Magic Mirror",
        "Weight": 2
    },
    {
        "Name": "Crow",
        "Weight": 2
    },
    {
        "Name": "Flower Vines",
        "Weight": 2
    },
    {
        "Name": "Vine",
        "Weight": 2
    },
    {
        "Name": "Snake Blue",
        "Weight": 1.5
    },
    {
        "Name": "Balloons",
        "Weight": 0.75
    },
    {
        "Name": "Whelpling Purple",
        "Weight": 0.5
    }
]
accessories_names = [m["Name"] for m in accessories]
accessories_weights = [w["Weight"] for w in accessories]

mouths = [
    {
        "Name": "D Smile",
        "Weight": 7.5
    },
    {
        "Name": "Good Grin",
        "Weight": 6.5
    },
    {
        "Name": "Toof",
        "Weight": 5.5
    },
    {
        "Name": "Sharp",
        "Weight": 5
    },
    {
        "Name": "Buck",
        "Weight": 5
    },
    {
        "Name": "Thinking",
        "Weight": 4.5
    },
    {
        "Name": "Drippy Purple",
        "Weight": 4
    },
    {
        "Name": "One Fang",
        "Weight": 4
    },
    {
        "Name": "Fang Blood",
        "Weight": 3.5
    },
    {
        "Name": "Gum",
        "Weight": 3.5
    },
    {
        "Name": "Fankie Teeth",
        "Weight": 3
    },
    {
        "Name": "Purp",
        "Weight": 3
    },
    {
        "Name": "Buck Gold",
        "Weight": 3
    },
    {
        "Name": "Cookie",
        "Weight": 3
    },
    {
        "Name": "Fang Tongue Spit",
        "Weight": 3
    },
    {
        "Name": "Silly",
        "Weight": 3
    },
    {
        "Name": 420,
        "Weight": 3
    },
    {
        "Name": "Tongue Red",
        "Weight": 3
    },
    {
        "Name": "Smokie",
        "Weight": 3
    },
    {
        "Name": "Smile Slime",
        "Weight": 3
    },
    {
        "Name": "Tongue Yellow",
        "Weight": 3
    },
    {
        "Name": "Teeth Yellow",
        "Weight": 3
    },
    {
        "Name": "Candy Corn",
        "Weight": 2.5
    },
    {
        "Name": "Toastmouth",
        "Weight": 2
    },
    {
        "Name": "Candy Cane",
        "Weight": 1.75
    },
    {
        "Name": "Sharp Gold",
        "Weight": 1.5
    },
    {
        "Name": "Fish",
        "Weight": 1.5
    },
    {
        "Name": "Zim",
        "Weight": 1.5
    },
    {
        "Name": "One Fang Gold",
        "Weight": 1
    },
    {
        "Name": "Diamond",
        "Weight": 1
    },
    {
        "Name": "Drippy Gold",
        "Weight": 1
    },
    {
        "Name": "Spooky Month",
        "Weight": 0.75
    },
    {
        "Name": "None",
        "Weight": 0.5
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
total_ghoulies = 1000
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
mouth_counts = {}
eyes_counts = {}
headgear_counts = {}
accessories_counts = {}


def setTraitCountsToZilch(main_arr, arr_to_set):
    for item in main_arr:
        arr_to_set[item] = 0


setTraitCountsToZilch(background_names, background_counts)
setTraitCountsToZilch(environment_names, environment_counts)
setTraitCountsToZilch(body_names, body_counts)
setTraitCountsToZilch(mouth_names, mouth_counts)
setTraitCountsToZilch(eyes_names, eyes_counts)
setTraitCountsToZilch(headgear_names, headgear_counts)
setTraitCountsToZilch(accessories_names, accessories_counts)

for ghoulie in traits:
    background_counts[ghoulie["background"]] += 1
    environment_counts[ghoulie["environment"]] += 1
    body_counts[ghoulie["body"]] += 1
    mouth_counts[ghoulie["mouth"]] += 1
    eyes_counts[ghoulie["eyes"]] += 1
    headgear_counts[ghoulie["headgear"]] += 1
    accessories_counts[ghoulie["accessories"]] += 1

all_trait_counts = {"background": background_counts, "environment": environment_counts, "body": body_counts,
                    "mouth": mouth_counts, "eyes": eyes_counts, "headgear": headgear_counts, "accessories": accessories_counts}

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
    m["name"] = 'Ghoulie #' + str(ghoulie_id).zfill(4)
    m["symbol"] = 'GHOULIE'
    m["description"] = 'Ghoulies.Space is a collection of 10,000 algorithmically unique NFTs on the Solana blockchain.'
    m["seller_fee_basis_points"] = 690
    m["image"] = str(ghoulie_id) + '.png'
    m["external_url"] = 'https://www.ghoulies.space'
    m["edition"] = "Space"
    m["attributes"] = attributes
    m["collection"] = {}
    m["collection"]["name"] = "Ghoulies in Space"
    m["collection"]["family"] = "Ghoulies"
    m["properties"] = {}
    m["properties"]["category"] = "image"
    # TODO: Update creators
    m["properties"]["creators"] = [
        {"address": "BSPcExiygEBPgpiSFq6hena1qtcGLytyR6AzkpByctEa", "share": 100}]
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
    layer4 = Image.open(
        f'./assets/Accessory/{ghoulie["accessories"]}.png').convert('RGBA')
    layer5 = Image.open(
        f'./assets/Mouth/{ghoulie["mouth"]}.png').convert('RGBA')
    layer6 = Image.open(
        f'./assets/Headgear/{ghoulie["headgear"]}.png').convert('RGBA')
    layer7 = Image.open(f'./assets/Eyes/{ghoulie["eyes"]}.png').convert('RGBA')

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
